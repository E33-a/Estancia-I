import { Head, router } from "@inertiajs/react";

import { useEffect, useMemo, useRef, useState } from "react";

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

function formatTime(seconds) {
  const totalSeconds = Math.max(0, Math.floor(Number(seconds) || 0));

  const minutes = Math.floor(totalSeconds / 60);

  const remainingSeconds = totalSeconds % 60;

  return `${String(minutes).padStart(2, "0")}:${String(
    remainingSeconds,
  ).padStart(2, "0")}`;
}

export default function Take({ assessment, attempt, questions = [] }) {
  const storageKey = `assessment-attempt-${attempt.id}`;

  const storedAnswers = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem(storageKey) ?? "{}");
    } catch {
      return {};
    }
  }, []);

  const [currentIndex, setCurrentIndex] = useState(0);

  const [answers, setAnswers] = useState(storedAnswers);

  const [timeLeft, setTimeLeft] = useState(attempt.remainingSeconds);

  const [submitting, setSubmitting] = useState(false);

  const startedTimeRef = useRef(Date.now());

  const current = questions[currentIndex];

  const progress =
    questions.length > 0 ? ((currentIndex + 1) / questions.length) * 100 : 0;

  const answeredCount = Object.values(answers).filter(
    (value) => String(value ?? "").trim() !== "",
  ).length;

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(answers));
  }, [answers]);

  useEffect(() => {
    if (timeLeft <= 0) {
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((value) => Math.max(0, value - 1));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (timeLeft === 0 && !submitting) {
      submitAssessment();
    }
  }, [timeLeft]);

  const selectAnswer = (value) => {
    if (!current) {
      return;
    }

    setAnswers((existing) => ({
      ...existing,

      [current.id]: value,
    }));
  };

  const playAudio = (text, audioUrl = null) => {
    if (audioUrl) {
      const audio = new Audio(audioUrl);

      audio.play();
      return;
    }

    if (!text || !("speechSynthesis" in window)) {
      return;
    }

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);

    utterance.lang = "es-MX";
    utterance.rate = 0.75;

    window.speechSynthesis.speak(utterance);
  };

  const submitAssessment = () => {
    if (submitting) {
      return;
    }

    setSubmitting(true);

    const elapsed = Math.floor((Date.now() - startedTimeRef.current) / 1000);

    router.post(
      route("assessments.submit", attempt.id),
      {
        answers,
        elapsed_seconds: elapsed,
      },
      {
        preserveScroll: true,

        onSuccess: () => {
          localStorage.removeItem(storageKey);
        },

        onError: () => {
          setSubmitting(false);
        },
      },
    );
  };

  if (!current) {
    return null;
  }

  const selected = answers[current.id] ?? "";

  return (
    <AuthenticatedLayout>
      <Head title={`${assessment.title} - Evaluación`} />

      <style>{`
        .assessment-pattern {
          background-image:
            radial-gradient(
              #9a4028 0.5px,
              transparent 0.5px
            ),
            radial-gradient(
              #36693e 0.5px,
              #fdf7ff 0.5px
            );

          background-size:
            20px 20px;

          background-position:
            0 0,
            10px 10px;
        }

        .assessment-card {
          box-shadow:
            0 4px 20px -2px
            rgba(154, 64, 40, 0.10);
        }
      `}</style>

      <div className="min-h-screen bg-background assessment-pattern pb-32">
        {/* Barra superior */}
        <header className="bg-background border-b-2 border-outline-variant sticky top-[80px] z-40">
          <div className="max-w-7xl mx-auto px-5 md:px-10 py-4 flex justify-between items-center gap-5">
            <div className="flex-1">
              <h1
                className="text-xl md:text-2xl font-bold text-primary"
                style={{
                  fontFamily: "Bricolage Grotesque",
                }}
              >
                Evaluación: {assessment.title}
              </h1>

              <div className="flex items-center gap-4 mt-2">
                <span className="text-sm font-semibold text-on-surface-variant whitespace-nowrap">
                  Pregunta {currentIndex + 1} de {questions.length}
                </span>

                <div className="w-48 max-w-[40vw] h-3 bg-surface-variant rounded-full overflow-hidden">
                  <div
                    className="h-full bg-secondary transition-all duration-500"
                    style={{
                      width: `${progress}%`,
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div
                className={`
                  px-4
                  py-2
                  rounded-full
                  font-bold
                  flex
                  items-center
                  gap-2

                  ${
                    timeLeft <= 60
                      ? "bg-error-container text-error"
                      : "bg-surface-container-high text-primary"
                  }
                `}
              >
                <span className="material-symbols-outlined">timer</span>

                {formatTime(timeLeft)}
              </div>

              <div className="hidden md:flex items-center gap-1 bg-secondary-container text-secondary px-4 py-2 rounded-full">
                <span className="material-symbols-outlined">task_alt</span>
                {answeredCount}/{questions.length}
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-5 md:px-10 py-8">
          {/* Pregunta */}
          <section className="w-full max-w-4xl mx-auto text-center">
            <div className="bg-white rounded-2xl border-t-4 border-primary p-6 md:p-8 assessment-card">
              <span className="inline-block bg-secondary-container text-secondary rounded-full px-4 py-1 text-xs font-bold uppercase mb-4">
                {assessment.language}
              </span>

              <h2
                className="text-2xl md:text-3xl font-bold text-primary"
                style={{
                  fontFamily: "Bricolage Grotesque",
                }}
              >
                {current.prompt}
              </h2>

              {current.instructions && (
                <p className="text-on-surface-variant mt-3">
                  {current.instructions}
                </p>
              )}

              {current.audioText && (
                <button
                  type="button"
                  onClick={() => playAudio(current.audioText, current.audioUrl)}
                  className="inline-flex items-center gap-2 px-6 py-3 mt-5 bg-secondary text-white rounded-full font-bold shadow-lg hover:scale-105 transition-transform"
                >
                  <span className="material-symbols-outlined">volume_up</span>
                  Reproducir pregunta
                </button>
              )}
            </div>
          </section>

          {/* Completar espacio */}
          {current.type === "fill_blank" && (
            <section className="max-w-2xl mx-auto mt-8">
              <div className="bg-white rounded-2xl border border-outline-variant p-7 assessment-card">
                <label className="block font-bold text-on-surface mb-3">
                  Tu respuesta
                </label>

                <input
                  autoFocus
                  type="text"
                  value={selected}
                  onChange={(event) => selectAnswer(event.target.value)}
                  placeholder="Escribe aquí..."
                  className="w-full rounded-xl border-2 border-outline-variant px-5 py-4 text-xl focus:border-primary focus:ring-0"
                />

                <p className="text-sm text-on-surface-variant mt-3">
                  Puedes escribir con mayúsculas o minúsculas.
                </p>
              </div>
            </section>
          )}

          {/* Opciones */}
          {current.type !== "fill_blank" && (
            <section
              className={`
                w-full
                max-w-5xl
                mx-auto
                grid
                gap-5
                mt-8

                ${
                  current.type === "image_choice"
                    ? "grid-cols-2 lg:grid-cols-4"
                    : "grid-cols-1 md:grid-cols-2"
                }
              `}
            >
              {current.options.map((option) => {
                const active = selected === option.value;

                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => selectAnswer(option.value)}
                    className={`
                        relative
                        bg-white
                        rounded-2xl
                        border-2
                        p-4
                        transition-all
                        assessment-card
                        text-left

                        ${
                          active
                            ? "border-primary bg-primary-fixed scale-[0.98]"
                            : "border-outline-variant hover:border-primary hover:-translate-y-1"
                        }
                      `}
                  >
                    {current.type === "image_choice" && (
                      <div className="aspect-square rounded-xl bg-surface-container-low flex items-center justify-center mb-4 overflow-hidden">
                        {option.image ? (
                          <img
                            src={option.image}
                            alt={option.label}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <span className="text-7xl md:text-8xl">
                            {option.emoji ?? "❓"}
                          </span>
                        )}
                      </div>
                    )}

                    <div className="flex items-center gap-3">
                      {current.type !== "image_choice" && option.emoji && (
                        <span className="text-3xl">{option.emoji}</span>
                      )}

                      <span className="font-bold flex-grow">
                        {option.label}
                      </span>

                      <div
                        className={`
                            w-6
                            h-6
                            rounded-full
                            border-2
                            flex
                            items-center
                            justify-center

                            ${
                              active
                                ? "border-primary bg-primary"
                                : "border-outline-variant"
                            }
                          `}
                      >
                        {active && (
                          <span className="material-symbols-outlined text-white text-sm">
                            check
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Audio de opción */}
                    <span
                      role="button"
                      tabIndex={0}
                      onClick={(event) => {
                        event.stopPropagation();

                        playAudio(option.audio ?? option.label);
                      }}
                      className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 text-secondary shadow flex items-center justify-center hover:text-primary"
                    >
                      <span className="material-symbols-outlined text-lg">
                        volume_up
                      </span>
                    </span>
                  </button>
                );
              })}
            </section>
          )}

          {/* Indicador respondida */}
          <div className="max-w-5xl mx-auto mt-6 text-center">
            {String(selected ?? "").trim() ? (
              <span className="inline-flex items-center gap-2 bg-secondary-container text-secondary px-4 py-2 rounded-full font-semibold">
                <span className="material-symbols-outlined">check_circle</span>
                Respuesta guardada
              </span>
            ) : (
              <span className="text-on-surface-variant">
                Selecciona o escribe una respuesta para continuar.
              </span>
            )}
          </div>
        </main>

        {/* Navegación */}
        <footer className="fixed bottom-0 left-0 w-full z-50 bg-surface shadow-[0_-4px_12px_rgba(154,64,40,0.1)] rounded-t-2xl">
          <div className="max-w-7xl mx-auto flex justify-between items-center px-5 md:px-10 py-3">
            <button
              type="button"
              disabled={currentIndex === 0}
              onClick={() => setCurrentIndex((value) => Math.max(0, value - 1))}
              className="flex items-center gap-2 px-5 py-3 text-on-surface-variant rounded-xl hover:bg-surface-container-high disabled:opacity-30"
            >
              <span className="material-symbols-outlined">arrow_back</span>

              <span className="hidden sm:inline font-semibold">Anterior</span>
            </button>

            <span className="text-xs sm:text-sm text-on-surface-variant">
              {answeredCount} de {questions.length} respondidas
            </span>

            {currentIndex < questions.length - 1 ? (
              <button
                type="button"
                onClick={() =>
                  setCurrentIndex((value) =>
                    Math.min(questions.length - 1, value + 1),
                  )
                }
                className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-full font-bold shadow-md"
              >
                Siguiente
                <span className="material-symbols-outlined">arrow_forward</span>
              </button>
            ) : (
              <button
                type="button"
                disabled={submitting}
                onClick={submitAssessment}
                className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-full font-bold shadow-md disabled:opacity-50"
              >
                <span className="material-symbols-outlined">check_circle</span>

                {submitting ? "Enviando..." : "Enviar respuestas"}
              </button>
            )}
          </div>
        </footer>
      </div>
    </AuthenticatedLayout>
  );
}
