import { Head, Link } from "@inertiajs/react";

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function Index({ lessons = [] }) {
  return (
    <AuthenticatedLayout>
      <Head title="Lecciones - Raíces Vivas" />

      <div className="min-h-screen bg-surface px-5 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <Link
              href={route("student.dashboard")}
              className="w-12 h-12 flex-shrink-0 flex items-center justify-center rounded-full bg-surface-container-high text-primary hover:bg-primary-fixed transition-colors"
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
                Mis Lecciones
              </h1>

              <p className="text-on-surface-variant">
                Aprende nuevas palabras antes de ponerlas en práctica.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {lessons.map((lesson) => (
              <article
                key={lesson.id}
                className="bg-white border border-outline-variant rounded-3xl p-6 shadow-sm flex flex-col"
              >
                <div className="w-14 h-14 rounded-2xl bg-primary-fixed flex items-center justify-center">
                  <span className="material-symbols-outlined text-primary text-3xl">
                    school
                  </span>
                </div>

                <p className="text-sm text-secondary font-bold mt-5">
                  {lesson.category}
                </p>

                <h2
                  className="text-2xl font-bold mt-1"
                  style={{
                    fontFamily: "Bricolage Grotesque",
                  }}
                >
                  {lesson.title}
                </h2>

                <p className="text-on-surface-variant mt-2 flex-grow">
                  {lesson.description}
                </p>

                <div className="grid grid-cols-3 gap-2 my-5 text-sm">
                  <div className="bg-surface-container rounded-xl p-2 text-center">
                    <strong>{lesson.itemsCount}</strong>
                    <br />
                    palabras
                  </div>

                  <div className="bg-surface-container rounded-xl p-2 text-center">
                    <strong>{lesson.level}</strong>
                    <br />
                    nivel
                  </div>

                  <div className="bg-surface-container rounded-xl p-2 text-center">
                    <strong>⭐ {lesson.starsReward}</strong>
                    <br />
                    premio
                  </div>
                </div>

                {lesson.completed && (
                  <div className="bg-secondary-container text-secondary rounded-xl p-3 mb-4 font-bold flex items-center gap-2">
                    <span className="material-symbols-outlined">
                      check_circle
                    </span>
                    Lección completada
                  </div>
                )}

                <Link
                  href={route("lessons.show", lesson.slug)}
                  className="w-full text-center bg-primary text-white py-3 rounded-xl font-bold"
                >
                  {lesson.completed ? "Repasar" : "Comenzar lección"}
                </Link>
              </article>
            ))}
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
