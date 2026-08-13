import { Head, Link } from "@inertiajs/react";
import { useMemo, useState } from "react";

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Footer from "@/Components/Footer";

export default function Index({ stories = [], featuredStory = null }) {
  const categories = [
    "Todos",
    "Mitos",
    "Leyendas",
    "Naturaleza",
    "Vida Diaria",
  ];

  const [selectedCategory, setSelectedCategory] = useState("Todos");

  const filteredStories = useMemo(() => {
    if (selectedCategory === "Todos") {
      return stories;
    }

    return stories.filter((story) => story.category === selectedCategory);
  }, [stories, selectedCategory]);

  const getLevelClass = (level) => {
    if (level === "Intermedio") {
      return "bg-tertiary-fixed text-on-tertiary-fixed";
    }

    if (level === "Avanzado") {
      return "bg-primary-fixed text-on-primary-fixed";
    }

    return "bg-secondary-container text-on-secondary-container";
  };

  const StoryCover = ({ story, featured = false }) => {
    if (story.image) {
      return (
        <img
          src={story.image}
          alt={story.title}
          className="w-full h-full object-cover"
        />
      );
    }

    return (
      <div
        className={`
          w-full
          h-full
          flex
          items-center
          justify-center
          bg-gradient-to-br
          from-primary-fixed
          via-surface-container-high
          to-secondary-container

          ${featured ? "text-8xl" : "text-7xl"}
        `}
      >
        {story.coverEmoji ?? "📖"}
      </div>
    );
  };

  return (
    <AuthenticatedLayout>
      <Head title="Cuentos y Lecturas - Raíces Vivas" />

      <style>{`
        .story-catalog-pattern {
          background-image:
            radial-gradient(
              circle at 2px 2px,
              rgba(154, 64, 40, 0.05) 1px,
              transparent 0
            );

          background-size: 24px 24px;
        }

        .story-shadow {
          box-shadow:
            0 4px 20px -4px
            rgba(154, 64, 40, 0.15);
        }

        .story-card {
          transition:
            transform 0.3s ease,
            box-shadow 0.3s ease;
        }

        .story-card:hover {
          transform: translateY(-4px);

          box-shadow:
            0 12px 24px -8px
            rgba(154, 64, 40, 0.20);
        }
      `}</style>

      <div className="min-h-screen flex flex-col bg-surface text-on-surface story-catalog-pattern">
        <main className="flex-grow max-w-7xl mx-auto w-full px-5 md:px-10 py-8">
          {/* Encabezado */}
          <section className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-6">
            <div className="flex items-center gap-4">
              <Link
                href={route("student.dashboard")}
                className="w-12 h-12 flex items-center justify-center rounded-full bg-surface-container-high text-primary hover:bg-primary-fixed transition-colors active:scale-90"
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
                  Cuentos y Lecturas
                </h1>

                <p className="text-on-surface-variant mt-1">
                  Explora historias y aprende nuevas palabras mientras lees.
                </p>
              </div>
            </div>

            {/* Categorías */}
            <div className="flex overflow-x-auto pb-2 md:pb-0 gap-3">
              {categories.map((category) => {
                const active = selectedCategory === category;

                return (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setSelectedCategory(category)}
                    className={`
                        whitespace-nowrap
                        px-6
                        py-3
                        rounded-full
                        font-semibold
                        transition-all

                        ${
                          active
                            ? "bg-secondary text-white story-shadow"
                            : "bg-secondary-container text-on-secondary-container hover:bg-secondary-fixed"
                        }
                      `}
                  >
                    {category}
                  </button>
                );
              })}
            </div>
          </section>

          {/* Destacado */}
          {featuredStory && (
            <section className="relative overflow-hidden rounded-3xl mb-8 bg-primary-container p-8 flex flex-col md:flex-row items-center gap-8 story-shadow border-b-4 border-primary">
              <div className="z-10 flex-1">
                <span className="bg-tertiary-fixed text-on-tertiary-fixed px-4 py-1 rounded-full text-xs uppercase font-bold mb-4 inline-block">
                  Destacado de la semana
                </span>

                <h2
                  className="text-3xl font-bold text-white mb-4"
                  style={{
                    fontFamily: "Bricolage Grotesque",
                  }}
                >
                  {featuredStory.title}
                </h2>

                <p className="text-white opacity-90 mb-6 max-w-lg">
                  {featuredStory.description}
                </p>

                <Link
                  href={route("stories.show", featuredStory.slug)}
                  className="inline-flex items-center gap-2 bg-surface text-primary font-bold px-8 py-4 rounded-xl story-shadow border-b-4 border-outline-variant"
                >
                  <span className="material-symbols-outlined">
                    auto_stories
                  </span>
                  Comenzar Aventura
                </Link>
              </div>

              <div className="w-full md:w-1/3 aspect-square rounded-2xl overflow-hidden shadow-xl z-10">
                <StoryCover story={featuredStory} featured />
              </div>
            </section>
          )}

          {/* Cuentos */}
          {filteredStories.length > 0 ? (
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredStories.map((story) => (
                <article
                  key={story.id}
                  className="story-card bg-surface-container-lowest rounded-3xl overflow-hidden border border-outline-variant flex flex-col story-shadow"
                >
                  <div className="relative h-56">
                    <StoryCover story={story} />

                    <div className="absolute top-3 right-3 flex flex-col gap-1 items-end">
                      <span className="bg-surface/90 text-primary text-xs font-semibold px-4 py-1 rounded-full backdrop-blur-sm">
                        {story.language}
                      </span>

                      <span
                        className={`
                            text-xs
                            font-semibold
                            px-4
                            py-1
                            rounded-full

                            ${getLevelClass(story.level)}
                          `}
                      >
                        {story.level}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 flex flex-col flex-grow">
                    <span className="text-xs uppercase tracking-wider font-semibold text-secondary">
                      {story.category}
                    </span>

                    <h3
                      className="text-2xl font-semibold text-on-surface mt-2 mb-3"
                      style={{
                        fontFamily: "Bricolage Grotesque",
                      }}
                    >
                      {story.title}
                    </h3>

                    <p className="text-on-surface-variant mb-6 flex-grow">
                      {story.description}
                    </p>

                    <div className="mt-auto pt-4 flex items-center justify-between gap-3 border-t border-outline-variant">
                      <div className="flex items-center gap-1 text-on-surface-variant">
                        <span className="material-symbols-outlined">
                          menu_book
                        </span>

                        <span className="text-xs">{story.duration} min</span>
                      </div>

                      <Link
                        href={route("stories.show", story.slug)}
                        className="bg-primary text-white font-semibold px-5 py-3 rounded-xl border-b-4 border-on-primary-fixed-variant active:translate-y-[2px]"
                      >
                        Leer ahora
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </section>
          ) : (
            <section className="bg-white border border-outline-variant rounded-3xl p-12 text-center story-shadow">
              <span className="material-symbols-outlined text-6xl text-outline mb-4">
                auto_stories
              </span>

              <h3 className="text-xl font-bold mb-2">
                No hay cuentos en esta categoría
              </h3>

              <p className="text-on-surface-variant">
                Selecciona otra categoría para continuar explorando.
              </p>
            </section>
          )}
        </main>

        <Footer />
      </div>
    </AuthenticatedLayout>
  );
}
