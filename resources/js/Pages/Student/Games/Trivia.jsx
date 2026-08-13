import { Head, Link } from "@inertiajs/react";
import { useState } from "react";

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

const MAX_LIVES = 8;

export default function Trivia({ questions = [] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const [selected, setSelected] = useState(null);

  const [answered, setAnswered] = useState(false);

  const [mistakes, setMistakes] = useState(0);

  const [score, setScore] = useState(0);

  const [status, setStatus] = useState("playing");

  const current = questions[currentIndex];

  const lives = Math.max(0, MAX_LIVES - mistakes);

  const choose = (option) => {
    if (answered) {
      return;
    }

    setSelected(option);
    setAnswered(true);

    if (option === current.answer) {
      setScore((value) => value + 100);
    } else {
      setMistakes((value) => {
        const next = value + 1;

        if (next >= MAX_LIVES) {
          setStatus("lost");
        }

        return next;
      });
    }
  };

  const next = () => {
    if (currentIndex === questions.length - 1) {
      setStatus("won");
      return;
    }

    setCurrentIndex((value) => value + 1);

    setSelected(null);
    setAnswered(false);
  };

  return (
    <AuthenticatedLayout>
      <Head title="Trivia Cultural - Raíces Vivas" />

      <div className="min-h-screen bg-surface px-5 py-8">
        <div className="max-w-2xl mx-auto">
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

          <div className="flex justify-between bg-white rounded-2xl p-4 my-6">
            <span>
              ❤️ {lives}/{MAX_LIVES}
            </span>

            <span>
              ❓ {currentIndex + 1}/{questions.length}
            </span>

            <span>⭐ {score}</span>
          </div>

          {current && (
            <section className="bg-white rounded-3xl border border-outline-variant p-7 shadow-sm">
              <div className="w-16 h-16 bg-tertiary-fixed rounded-2xl flex items-center justify-center mx-auto mb-5">
                <span className="material-symbols-outlined text-tertiary text-4xl">
                  quiz
                </span>
              </div>

              <h2 className="text-2xl font-bold text-center mb-7">
                {current.question}
              </h2>

              <div className="grid gap-3">
                {current.options.map((option) => {
                  const correct = answered && option === current.answer;

                  const incorrect =
                    answered &&
                    option === selected &&
                    option !== current.answer;

                  return (
                    <button
                      key={option}
                      onClick={() => choose(option)}
                      disabled={answered}
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
                                : "bg-surface-container-lowest border-outline-variant hover:border-primary"
                          }
                        `}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>

              {answered && (
                <div className="mt-6 bg-surface-container rounded-xl p-4">
                  <p className="font-bold">
                    {selected === current.answer
                      ? "✅ ¡Correcto!"
                      : "❌ Respuesta incorrecta"}
                  </p>

                  <p className="text-sm text-on-surface-variant mt-1">
                    {current.explanation}
                  </p>
                </div>
              )}

              {answered && status === "playing" && (
                <button
                  onClick={next}
                  className="w-full mt-6 bg-primary text-white py-3 rounded-xl font-bold"
                >
                  {currentIndex === questions.length - 1
                    ? "Ver resultado"
                    : "Siguiente pregunta"}
                </button>
              )}
            </section>
          )}

          <div className="text-center mt-7">
            <Link
              href={route("games.index")}
              className="inline-block border-2 border-primary text-primary px-6 py-3 rounded-xl font-bold"
            >
              Volver al catálogo
            </Link>
          </div>
        </div>

        {status !== "playing" && (
          <div className="fixed inset-0 bg-black/40 z-[100] flex items-center justify-center p-5">
            <div className="bg-white rounded-3xl p-8 max-w-md w-full text-center">
              <span className="material-symbols-outlined text-primary text-6xl">
                {status === "won" ? "emoji_events" : "sentiment_dissatisfied"}
              </span>

              <h2 className="text-3xl font-bold mt-3">
                {status === "won"
                  ? "¡Trivia completada!"
                  : "¡Inténtalo de nuevo!"}
              </h2>

              <p className="mt-3 text-xl">⭐ {score} puntos</p>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => window.location.reload()}
                  className="flex-1 bg-primary text-white py-3 rounded-xl font-bold"
                >
                  Reiniciar
                </button>

                <Link
                  href={route("games.index")}
                  className="flex-1 border-2 border-primary text-primary py-3 rounded-xl font-bold"
                >
                  Catálogo
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </AuthenticatedLayout>
  );
}
