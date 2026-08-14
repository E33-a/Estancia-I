import { Head, Link, router } from "@inertiajs/react";

import { useState } from "react";

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

import PronounceButton from "@/Components/Games/PronounceButton";

export default function Show({ lesson, items = [], progress }) {
  const [currentIndex, setCurrentIndex] = useState(
    progress?.currentPosition ?? 0,
  );

  const current = items[currentIndex];

  const percentage =
    items.length > 0
      ? Math.round(((currentIndex + 1) / items.length) * 100)
      : 0;

  const saveProgress = (position) => {
    router.post(
      route("lessons.progress", lesson.slug),
      {
        current_position: position,
      },
      {
        preserveScroll: true,
        preserveState: true,
      },
    );
  };

  const previous = () => {
    if (currentIndex <= 0) {
      return;
    }

    const nextIndex = currentIndex - 1;

    setCurrentIndex(nextIndex);

    saveProgress(nextIndex);
  };

  const next = () => {
    if (currentIndex >= items.length - 1) {
      return;
    }

    const nextIndex = currentIndex + 1;

    setCurrentIndex(nextIndex);

    saveProgress(nextIndex);
  };

  const complete = () => {
    router.post(route("lessons.complete", lesson.slug));
  };

  if (!current) {
    return (
      <AuthenticatedLayout>
        <div className="p-10 text-center">
          Esta lección no contiene vocabulario.
        </div>
      </AuthenticatedLayout>
    );
  }

  return (
    <AuthenticatedLayout>
      <Head title={`${lesson.title} - Raíces Vivas`} />

      <div className="min-h-screen bg-surface px-5 py-8">
        <div className="max-w-3xl mx-auto">
          <Link
            href={route("lessons.index")}
            className="inline-flex items-center gap-2 text-primary font-bold"
          >
            <span className="material-symbols-outlined">arrow_back</span>
            Lecciones
          </Link>

          <div className="text-center mt-5">
            <p className="text-secondary font-bold">{lesson.category}</p>

            <h1
              className="text-3xl md:text-4xl font-bold text-primary"
              style={{
                fontFamily: "Bricolage Grotesque",
              }}
            >
              {lesson.title}
            </h1>
          </div>

          {/* Progreso */}
          <div className="bg-white border border-outline-variant rounded-2xl p-4 my-6">
            <div className="flex justify-between">
              <span>
                Palabra {currentIndex + 1} de {items.length}
              </span>

              <strong className="text-secondary">{percentage}%</strong>
            </div>

            <div className="h-2 bg-surface-variant rounded-full overflow-hidden mt-3">
              <div
                className="h-full bg-secondary transition-all"
                style={{
                  width: `${percentage}%`,
                }}
              />
            </div>
          </div>

          {/* Tarjeta */}
          <section className="bg-white border border-outline-variant rounded-3xl shadow-sm p-8 md:p-12 text-center">
            <span className="text-8xl">{current.emoji}</span>

            <p className="text-on-surface-variant mt-7">En español</p>

            <h2 className="text-3xl font-bold">{current.spanish}</h2>

            <div className="my-7 border-t border-outline-variant" />

            <p className="text-on-surface-variant">En Náhuatl</p>

            <p
              className="text-5xl font-bold text-primary mt-2"
              style={{
                fontFamily: "Bricolage Grotesque",
              }}
            >
              {current.nahuatl}
            </p>

            <div className="mt-6 flex justify-center">
              <PronounceButton
                text={current.nahuatl}
                audioUrl={current.audioUrl ?? null}
                label="Escuchar pronunciación"
              />
            </div>
          </section>

          {/* Navegación */}
          <div className="grid grid-cols-2 gap-3 mt-6">
            <button
              type="button"
              onClick={previous}
              disabled={currentIndex === 0}
              className="border-2 border-primary text-primary rounded-xl py-3 font-bold disabled:opacity-40"
            >
              ← Anterior
            </button>

            {currentIndex < items.length - 1 ? (
              <button
                type="button"
                onClick={next}
                className="bg-primary text-white rounded-xl py-3 font-bold"
              >
                Siguiente →
              </button>
            ) : (
              <button
                type="button"
                onClick={complete}
                className="bg-secondary text-white rounded-xl py-3 font-bold"
              >
                Completar lección
              </button>
            )}
          </div>

          {currentIndex === items.length - 1 && (
            <p className="text-center text-on-surface-variant mt-4">
              Al completar recibirás <strong>⭐ {lesson.starsReward}</strong>.
            </p>
          )}
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
