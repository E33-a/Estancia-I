import { Head, Link } from "@inertiajs/react";
import { useEffect, useRef, useState } from "react";

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

import GameStatusBar from "@/Components/Games/GameStatusBar";
import GameResultModal from "@/Components/Games/GameResultModal";
import PronounceButton from "@/Components/Games/PronounceButton";

import useGameTimer from "@/Hooks/useGameTimer";

import { saveGameResult } from "@/Utils/gameResults";

const MAX_LIVES = 8;

export default function Trivia({ questions = [] }) {
  /*
  |--------------------------------------------------------------------------
  | Estado principal
  |--------------------------------------------------------------------------
  */

  const [currentIndex, setCurrentIndex] = useState(0);

  const [selected, setSelected] = useState(null);

  const [answered, setAnswered] = useState(false);

  const [mistakes, setMistakes] = useState(0);

  const [score, setScore] = useState(0);

  const [status, setStatus] = useState("playing");

  /*
  |--------------------------------------------------------------------------
  | Resultado devuelto por Laravel
  |--------------------------------------------------------------------------
  */

  const [resultData, setResultData] = useState({
    stars: 0,
    newBadges: [],
  });

  /*
  |--------------------------------------------------------------------------
  | Referencias
  |--------------------------------------------------------------------------
  */

  const resultUuidRef = useRef(crypto.randomUUID());

  const resultSentRef = useRef(false);

  /*
  |--------------------------------------------------------------------------
  | Datos calculados
  |--------------------------------------------------------------------------
  */

  const current = questions[currentIndex];

  const lives = Math.max(0, MAX_LIVES - mistakes);

  /*
  |--------------------------------------------------------------------------
  | Cronómetro
  |--------------------------------------------------------------------------
  */

  const { elapsedSeconds, resetTimer } = useGameTimer(status === "playing");

  /*
  |--------------------------------------------------------------------------
  | Seleccionar respuesta
  |--------------------------------------------------------------------------
  */

  const choose = (option) => {
    if (answered || status !== "playing" || !current) {
      return;
    }

    setSelected(option);
    setAnswered(true);

    /*
     * Respuesta correcta
     */
    if (option === current.answer) {
      setScore((value) => value + 100);

      return;
    }

    /*
     * Respuesta incorrecta
     */
    setMistakes((value) => {
      const next = value + 1;

      if (next >= MAX_LIVES) {
        setStatus("lost");
      }

      return next;
    });
  };

  /*
  |--------------------------------------------------------------------------
  | Siguiente pregunta
  |--------------------------------------------------------------------------
  */

  const next = () => {
    if (!answered || status !== "playing") {
      return;
    }

    /*
     * Última pregunta.
     */
    if (currentIndex >= questions.length - 1) {
      setStatus("won");

      return;
    }

    setCurrentIndex((value) => value + 1);

    setSelected(null);
    setAnswered(false);
  };

  /*
  |--------------------------------------------------------------------------
  | Reiniciar
  |--------------------------------------------------------------------------
  */

  const resetGame = () => {
    setCurrentIndex(0);

    setSelected(null);
    setAnswered(false);

    setMistakes(0);
    setScore(0);

    resetTimer();

    setStatus("playing");

    setResultData({
      stars: 0,
      newBadges: [],
    });

    /*
     * Nueva partida =
     * nuevo UUID.
     */
    resultUuidRef.current = crypto.randomUUID();

    resultSentRef.current = false;

    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
  };

  /*
  |--------------------------------------------------------------------------
  | Limpieza de audio
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    return () => {
      if ("speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  /*
  |--------------------------------------------------------------------------
  | Guardar resultado
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    if (status === "playing" || resultSentRef.current) {
      return;
    }

    resultSentRef.current = true;

    let cancelled = false;

    const persistResult = async () => {
      try {
        const response = await saveGameResult({
          resultUuid: resultUuidRef.current,

          gameKey: "trivia",

          score,

          livesRemaining: lives,

          elapsedSeconds,

          won: status === "won",
        });

        if (cancelled) {
          return;
        }

        setResultData({
          stars: response.result?.stars ?? 0,

          newBadges: response.newBadges ?? [],
        });
      } catch (error) {
        console.error("No se pudo guardar el resultado de Trivia:", error);

        if (!cancelled) {
          resultSentRef.current = false;
        }
      }
    };

    persistResult();

    return () => {
      cancelled = true;
    };
  }, [status, score, lives, elapsedSeconds]);

  /*
  |--------------------------------------------------------------------------
  | Sin preguntas
  |--------------------------------------------------------------------------
  */

  if (questions.length === 0) {
    return (
      <AuthenticatedLayout>
        <Head title="Trivia Cultural - Raíces Vivas" />

        <div className="min-h-screen bg-surface px-5 py-10">
          <div className="max-w-2xl mx-auto bg-white border border-outline-variant rounded-3xl p-10 text-center">
            <span className="material-symbols-outlined text-6xl text-outline">
              quiz
            </span>

            <h1
              className="text-3xl font-bold mt-4"
              style={{
                fontFamily: "Bricolage Grotesque",
              }}
            >
              Trivia no disponible
            </h1>

            <p className="text-on-surface-variant mt-2">
              No hay preguntas disponibles para esta partida.
            </p>

            <Link
              href={route("games.index")}
              className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-xl font-bold mt-6"
            >
              <span className="material-symbols-outlined">arrow_back</span>
              Volver al catálogo
            </Link>
          </div>
        </div>
      </AuthenticatedLayout>
    );
  }

  /*
  |--------------------------------------------------------------------------
  | Texto que podemos pronunciar
  |--------------------------------------------------------------------------
  |
  | Si GameController envía audioText o una palabra Náhuatl,
  | PronounceButton la reproducirá.
  |
  */

  const pronunciationText =
    current?.audioText ?? current?.nahuatl ?? current?.target ?? null;

  return (
    <AuthenticatedLayout>
      <Head title="Trivia Cultural - Raíces Vivas" />

      <div className="min-h-screen bg-surface flex flex-col">
        {/* Barra común */}
        <header className="bg-surface-bright border-b border-outline-variant shadow-sm sticky top-[80px] z-40">
          <div className="max-w-3xl mx-auto px-5 py-3">
            <GameStatusBar
              lives={lives}
              maxLives={MAX_LIVES}
              score={score}
              elapsedSeconds={elapsedSeconds}
            />
          </div>
        </header>

        <main className="flex-grow px-5 py-8">
          <div className="max-w-2xl mx-auto">
            {/* Título */}
            <h1
              className="text-4xl font-bold text-primary text-center"
              style={{
                fontFamily: "Bricolage Grotesque",
              }}
            >
              Trivia Cultural
            </h1>

            <p className="text-center text-on-surface-variant mt-2">
              Pon a prueba lo que has aprendido.
            </p>

            {/* Progreso */}
            <div className="bg-white border border-outline-variant rounded-2xl p-4 my-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">
                    quiz
                  </span>

                  <span className="font-semibold">
                    Pregunta {currentIndex + 1} de {questions.length}
                  </span>
                </div>

                <span className="font-bold text-secondary">
                  {Math.round(((currentIndex + 1) / questions.length) * 100)}%
                </span>
              </div>

              <div className="w-full bg-surface-variant h-2 rounded-full overflow-hidden mt-3">
                <div
                  className="h-full bg-secondary transition-all duration-500"
                  style={{
                    width: `${((currentIndex + 1) / questions.length) * 100}%`,
                  }}
                />
              </div>
            </div>

            {current && (
              <section className="bg-white rounded-3xl border border-outline-variant p-7 shadow-sm">
                {/* Icono */}
                <div className="w-16 h-16 bg-tertiary-fixed rounded-2xl flex items-center justify-center mx-auto mb-5">
                  <span className="material-symbols-outlined text-tertiary text-4xl">
                    quiz
                  </span>
                </div>

                {/* Pregunta */}
                <h2
                  className="text-2xl font-bold text-center"
                  style={{
                    fontFamily: "Bricolage Grotesque",
                  }}
                >
                  {current.question}
                </h2>

                {/* Pronunciación */}
                {pronunciationText && (
                  <div className="flex justify-center mt-4">
                    <PronounceButton
                      text={pronunciationText}
                      audioUrl={current.audioUrl ?? null}
                      label="Escuchar pronunciación"
                    />
                  </div>
                )}

                {/* Respuestas */}
                <div className="grid gap-3 mt-7">
                  {current.options.map((option) => {
                    const correct = answered && option === current.answer;

                    const incorrect =
                      answered &&
                      option === selected &&
                      option !== current.answer;

                    return (
                      <button
                        type="button"
                        key={option}
                        onClick={() => choose(option)}
                        disabled={answered || status !== "playing"}
                        className={`
                            w-full
                            px-5
                            py-4
                            rounded-xl
                            border-2
                            font-semibold
                            text-left
                            transition-all

                            ${
                              correct
                                ? "bg-secondary-container border-secondary text-secondary"
                                : incorrect
                                  ? "bg-error-container border-error text-error"
                                  : "bg-surface-container-lowest border-outline-variant hover:border-primary hover:-translate-y-0.5"
                            }
                          `}
                      >
                        <span className="flex items-center justify-between gap-3">
                          <span>{option}</span>

                          {correct && (
                            <span className="material-symbols-outlined">
                              check_circle
                            </span>
                          )}

                          {incorrect && (
                            <span className="material-symbols-outlined">
                              cancel
                            </span>
                          )}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Feedback */}
                {answered && (
                  <div
                    className={`
                      mt-6
                      rounded-xl
                      p-4
                      border

                      ${
                        selected === current.answer
                          ? "bg-secondary-container border-secondary text-secondary"
                          : "bg-error-container border-error text-error"
                      }
                    `}
                  >
                    <p className="font-bold flex items-center gap-2">
                      <span className="material-symbols-outlined">
                        {selected === current.answer
                          ? "check_circle"
                          : "cancel"}
                      </span>

                      {selected === current.answer
                        ? "¡Correcto!"
                        : "Respuesta incorrecta"}
                    </p>

                    {current.explanation && (
                      <p className="text-sm mt-2 text-on-surface-variant">
                        {current.explanation}
                      </p>
                    )}

                    {selected !== current.answer && (
                      <p className="text-sm mt-2">
                        Respuesta correcta: <strong>{current.answer}</strong>
                      </p>
                    )}
                  </div>
                )}

                {/* Siguiente */}
                {answered && status === "playing" && (
                  <button
                    type="button"
                    onClick={next}
                    className="w-full mt-6 bg-primary text-white py-3 rounded-xl font-bold hover:bg-primary-container transition-colors"
                  >
                    <span className="inline-flex items-center justify-center gap-2">
                      {currentIndex === questions.length - 1
                        ? "Ver resultado"
                        : "Siguiente pregunta"}

                      <span className="material-symbols-outlined">
                        {currentIndex === questions.length - 1
                          ? "emoji_events"
                          : "arrow_forward"}
                      </span>
                    </span>
                  </button>
                )}
              </section>
            )}

            {/* Controles */}
            <div className="flex flex-wrap justify-center gap-3 mt-7">
              <Link
                href={route("games.index")}
                className="inline-flex items-center gap-2 border-2 border-primary text-primary px-6 py-3 rounded-xl font-bold hover:bg-primary-fixed transition-colors"
              >
                <span className="material-symbols-outlined">arrow_back</span>
                Volver al catálogo
              </Link>

              <button
                type="button"
                onClick={resetGame}
                className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-xl font-bold hover:bg-primary-container transition-colors"
              >
                <span className="material-symbols-outlined">refresh</span>
                Reiniciar
              </button>
            </div>
          </div>
        </main>

        {/* Modal común */}
        <GameResultModal
          open={status !== "playing"}
          won={status === "won"}
          score={score}
          elapsedSeconds={elapsedSeconds}
          stars={resultData.stars}
          newBadges={resultData.newBadges}
          onRetry={resetGame}
        />
      </div>
    </AuthenticatedLayout>
  );
}
