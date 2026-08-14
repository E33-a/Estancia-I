import { Head, Link } from "@inertiajs/react";

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

function formatTime(seconds) {
  const totalSeconds = Math.max(0, Math.floor(Number(seconds) || 0));

  const minutes = Math.floor(totalSeconds / 60);

  const remainingSeconds = totalSeconds % 60;

  return `${String(minutes).padStart(2, "0")}:${String(
    remainingSeconds,
  ).padStart(2, "0")}`;
}

export default function Result({ result }) {
  return (
    <AuthenticatedLayout>
      <Head title="Resultado de Evaluación - Raíces Vivas" />

      <div className="min-h-screen bg-surface px-5 py-10">
        <div className="max-w-4xl mx-auto">
          {/* Resultado principal */}
          <section className="bg-white rounded-3xl border border-outline-variant p-8 text-center shadow-lg">
            <div
              className={`
                w-24
                h-24
                mx-auto
                rounded-full
                flex
                items-center
                justify-center

                ${
                  result.passed
                    ? "bg-secondary-container text-secondary"
                    : "bg-error-container text-error"
                }
              `}
            >
              <span className="material-symbols-outlined text-6xl">
                {result.passed ? "workspace_premium" : "school"}
              </span>
            </div>

            <h1
              className="text-4xl font-bold mt-5"
              style={{
                fontFamily: "Bricolage Grotesque",
              }}
            >
              {result.passed ? "¡Evaluación aprobada!" : "Sigue practicando"}
            </h1>

            <p className="text-on-surface-variant mt-2">
              {result.assessmentTitle}
            </p>

            <div className="text-6xl font-bold text-primary mt-6">
              {Math.round(result.percentage)}%
            </div>

            <p className="text-on-surface-variant">Calificación final</p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-8">
              <div className="bg-surface-container rounded-xl p-4">
                <span className="material-symbols-outlined text-secondary">
                  check_circle
                </span>

                <p className="font-bold text-xl">
                  {result.correctCount}/{result.totalQuestions}
                </p>

                <p className="text-xs text-on-surface-variant">Correctas</p>
              </div>

              <div className="bg-surface-container rounded-xl p-4">
                <span className="material-symbols-outlined text-tertiary">
                  star
                </span>

                <p className="font-bold text-xl">
                  {result.score}/{result.maxScore}
                </p>

                <p className="text-xs text-on-surface-variant">Puntos</p>
              </div>

              <div className="bg-surface-container rounded-xl p-4">
                <span className="material-symbols-outlined text-primary">
                  timer
                </span>

                <p className="font-bold text-xl">
                  {formatTime(result.elapsedSeconds)}
                </p>

                <p className="text-xs text-on-surface-variant">Tiempo</p>
              </div>

              <div className="bg-surface-container rounded-xl p-4">
                <span className="material-symbols-outlined text-primary">
                  flag
                </span>

                <p className="font-bold text-xl">{result.passingScore}%</p>

                <p className="text-xs text-on-surface-variant">Mínimo</p>
              </div>
            </div>
          </section>

          {/* Revisión */}
          <section className="mt-8">
            <h2
              className="text-2xl font-bold mb-5"
              style={{
                fontFamily: "Bricolage Grotesque",
              }}
            >
              Revisión de respuestas
            </h2>

            <div className="space-y-4">
              {result.answers.map((answer, index) => (
                <article
                  key={answer.id}
                  className={`
                      bg-white
                      rounded-2xl
                      border-2
                      p-5

                      ${answer.isCorrect ? "border-secondary" : "border-error"}
                    `}
                >
                  <div className="flex gap-3">
                    <div
                      className={`
                          w-10
                          h-10
                          rounded-full
                          flex
                          items-center
                          justify-center
                          flex-shrink-0

                          ${
                            answer.isCorrect
                              ? "bg-secondary-container text-secondary"
                              : "bg-error-container text-error"
                          }
                        `}
                    >
                      <span className="material-symbols-outlined">
                        {answer.isCorrect ? "check" : "close"}
                      </span>
                    </div>

                    <div className="flex-grow">
                      <p className="font-bold">Pregunta {index + 1}</p>

                      <p className="mt-1">{answer.question}</p>

                      <div className="mt-4 text-sm">
                        <p>
                          <strong>Tu respuesta:</strong>{" "}
                          {answer.answer || "Sin responder"}
                        </p>

                        {!answer.isCorrect && (
                          <p className="text-secondary mt-1">
                            <strong>Respuesta correcta:</strong>{" "}
                            {answer.correctAnswer}
                          </p>
                        )}
                      </div>

                      {answer.explanation && (
                        <p className="mt-3 bg-surface-container p-3 rounded-xl text-sm text-on-surface-variant">
                          {answer.explanation}
                        </p>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <div className="grid sm:grid-cols-2 gap-3 mt-8">
            <Link
              href={route("assessments.index")}
              className="border-2 border-primary text-primary rounded-xl py-4 text-center font-bold"
            >
              Mis evaluaciones
            </Link>

            <Link
              href={route("student.dashboard")}
              className="bg-primary text-white rounded-xl py-4 text-center font-bold"
            >
              Volver al inicio
            </Link>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
