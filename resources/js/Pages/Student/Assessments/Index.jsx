import { Head, Link, usePage } from "@inertiajs/react";

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Footer from "@/Components/Footer";

export default function Index({ assessments = [] }) {
  const { flash } = usePage().props;

  return (
    <AuthenticatedLayout>
      <Head title="Mis Evaluaciones - Raíces Vivas" />

      <div className="min-h-screen bg-surface flex flex-col">
        <main className="flex-grow max-w-6xl mx-auto w-full px-5 md:px-10 py-8">
          <div className="flex items-center gap-4 mb-8">
            <Link
              href={route("student.dashboard")}
              className="w-12 h-12 flex items-center justify-center rounded-full bg-surface-container-high text-primary hover:bg-primary-fixed"
            >
              <span className="material-symbols-outlined">arrow_back</span>
            </Link>

            <div>
              <h1
                className="text-4xl font-bold text-primary"
                style={{
                  fontFamily: "Bricolage Grotesque",
                }}
              >
                Mis Evaluaciones
              </h1>

              <p className="text-on-surface-variant">
                Comprueba todo lo que has aprendido.
              </p>
            </div>
          </div>

          {flash?.error && (
            <div className="bg-error-container text-on-error-container p-4 rounded-xl mb-6">
              {flash.error}
            </div>
          )}

          {assessments.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-6">
              {assessments.map((assessment) => {
                const exhausted =
                  assessment.attemptsUsed >= assessment.maxAttempts;

                return (
                  <article
                    key={assessment.id}
                    className="bg-white border border-outline-variant rounded-3xl p-6 shadow-sm"
                  >
                    <div className="flex justify-between gap-4 mb-4">
                      <div className="w-16 h-16 bg-primary-fixed text-primary rounded-2xl flex items-center justify-center">
                        <span className="material-symbols-outlined text-4xl">
                          assignment
                        </span>
                      </div>

                      <div className="text-right">
                        <span className="inline-block bg-secondary-container text-secondary px-3 py-1 rounded-full text-xs font-bold">
                          {assessment.language}
                        </span>

                        <p className="text-xs text-on-surface-variant mt-2">
                          {assessment.questionLimit} preguntas ·{" "}
                          {assessment.timeLimit} min
                        </p>
                      </div>
                    </div>

                    <h2
                      className="text-2xl font-bold"
                      style={{
                        fontFamily: "Bricolage Grotesque",
                      }}
                    >
                      {assessment.title}
                    </h2>

                    <p className="text-on-surface-variant mt-2 mb-6">
                      {assessment.description}
                    </p>

                    <div className="grid grid-cols-3 gap-3 mb-6">
                      <div className="bg-surface-container rounded-xl p-3 text-center">
                        <p className="font-bold">
                          {assessment.attemptsUsed}/{assessment.maxAttempts}
                        </p>

                        <p className="text-xs text-on-surface-variant">
                          Intentos
                        </p>
                      </div>

                      <div className="bg-surface-container rounded-xl p-3 text-center">
                        <p className="font-bold">
                          {assessment.bestScore ?? "—"}
                          {assessment.bestScore !== null ? "%" : ""}
                        </p>

                        <p className="text-xs text-on-surface-variant">
                          Mejor nota
                        </p>
                      </div>

                      <div className="bg-surface-container rounded-xl p-3 text-center">
                        <p className="font-bold">{assessment.passingScore}%</p>

                        <p className="text-xs text-on-surface-variant">
                          Para aprobar
                        </p>
                      </div>
                    </div>

                    {assessment.inProgressAttempt ? (
                      <Link
                        href={route(
                          "assessments.take",
                          assessment.inProgressAttempt,
                        )}
                        className="block w-full bg-primary text-white text-center py-4 rounded-xl font-bold"
                      >
                        Continuar evaluación
                      </Link>
                    ) : !exhausted ? (
                      <Link
                        method="post"
                        as="button"
                        href={route("assessments.start", assessment.slug)}
                        className="w-full bg-primary text-white py-4 rounded-xl font-bold"
                      >
                        Comenzar evaluación
                      </Link>
                    ) : assessment.lastCompletedAttempt ? (
                      <Link
                        href={route(
                          "assessments.result",
                          assessment.lastCompletedAttempt,
                        )}
                        className="block w-full border-2 border-primary text-primary text-center py-4 rounded-xl font-bold"
                      >
                        Ver último resultado
                      </Link>
                    ) : null}
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="bg-white rounded-3xl border border-outline-variant p-12 text-center">
              <span className="material-symbols-outlined text-6xl text-outline">
                assignment
              </span>

              <h2 className="text-2xl font-bold mt-4">
                No tienes evaluaciones disponibles
              </h2>

              <p className="text-on-surface-variant mt-2">
                Cuando tu profesor publique una evaluación aparecerá aquí.
              </p>
            </div>
          )}
        </main>

        <Footer />
      </div>
    </AuthenticatedLayout>
  );
}
