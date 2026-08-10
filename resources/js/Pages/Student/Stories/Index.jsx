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

                .story-button:active {
                    transform: translateY(2px);
                }
            `}</style>

      <div
        className="
                    min-h-screen
                    flex
                    flex-col
                    bg-surface
                    text-on-surface
                    story-catalog-pattern
                "
      >
        <main
          className="
                        flex-grow
                        max-w-7xl
                        mx-auto
                        w-full
                        px-5
                        md:px-10
                        py-8
                    "
        >
          {/* Título y filtros */}
          <section
            className="
                            flex
                            flex-col
                            md:flex-row
                            md:items-center
                            justify-between
                            mb-8
                            gap-6
                        "
          >
            <div className="flex items-center gap-4">
              <Link
                href={route("student.dashboard")}
                className="
                                    w-12
                                    h-12
                                    flex
                                    items-center
                                    justify-center
                                    rounded-full
                                    bg-surface-container-high
                                    text-primary
                                    hover:bg-primary-fixed
                                    transition-colors
                                    active:scale-90
                                "
              >
                <span
                  className="
                                        material-symbols-outlined
                                    "
                  style={{
                    fontVariationSettings: "'wght' 700",
                  }}
                >
                  arrow_back
                </span>
              </Link>

              <div>
                <h1
                  className="
                                        font-display-lg
                                        text-display-lg
                                        text-primary
                                    "
                  style={{
                    fontFamily: "Bricolage Grotesque",
                  }}
                >
                  Cuentos y Lecturas
                </h1>

                <p
                  className="
                                        text-on-surface-variant
                                        mt-1
                                    "
                >
                  Explora historias y aprende nuevas palabras mientras lees.
                </p>
              </div>
            </div>

            {/* Filtros */}
            <div
              className="
                                flex
                                overflow-x-auto
                                pb-2
                                md:pb-0
                                gap-3
                            "
            >
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
                                            font-label-lg
                                            transition-all

                                            ${
                                              active
                                                ? `
                                                        bg-secondary
                                                        text-on-secondary
                                                        story-shadow
                                                    `
                                                : `
                                                        bg-secondary-container
                                                        text-on-secondary-container
                                                        hover:bg-secondary-fixed
                                                    `
                                            }
                                        `}
                  >
                    {category}
                  </button>
                );
              })}
            </div>
          </section>

          {/* Historia destacada */}
          {featuredStory && (
            <section
              className="
                                relative
                                overflow-hidden
                                rounded-3xl
                                mb-8
                                bg-primary-container
                                p-8
                                flex
                                flex-col
                                md:flex-row
                                items-center
                                gap-8
                                story-shadow
                                border-b-4
                                border-primary
                            "
            >
              <div className="z-10 flex-1">
                <span
                  className="
                                        bg-tertiary-fixed
                                        text-on-tertiary-fixed
                                        px-4
                                        py-1
                                        rounded-full
                                        font-label-sm
                                        uppercase
                                        mb-4
                                        inline-block
                                    "
                >
                  Destacado de la semana
                </span>

                <h2
                  className="
                                        font-headline-lg
                                        text-headline-lg
                                        text-on-primary-container
                                        mb-4
                                    "
                  style={{
                    fontFamily: "Bricolage Grotesque",
                  }}
                >
                  {featuredStory.title}
                </h2>

                <p
                  className="
                                        font-body-lg
                                        text-white
                                        opacity-90
                                        mb-6
                                        max-w-lg
                                    "
                >
                  {featuredStory.description}
                </p>

                <button
                  type="button"
                  className="
                                        bg-surface
                                        text-primary
                                        font-label-lg
                                        px-8
                                        py-4
                                        rounded-xl
                                        story-shadow
                                        story-button
                                        border-b-4
                                        border-outline-variant
                                    "
                >
                  Comenzar Aventura
                </button>
              </div>

              <div
                className="
                                    w-full
                                    md:w-1/3
                                    aspect-square
                                    rounded-2xl
                                    overflow-hidden
                                    shadow-xl
                                    z-10
                                "
              >
                <img
                  src={featuredStory.image}
                  alt={featuredStory.title}
                  className="
                                        w-full
                                        h-full
                                        object-cover
                                    "
                />
              </div>

              <div
                className="
                                    absolute
                                    top-0
                                    right-0
                                    w-64
                                    h-64
                                    opacity-10
                                    pointer-events-none
                                    translate-x-16
                                    -translate-y-16
                                "
              >
                <span
                  className="
                                        material-symbols-outlined
                                        text-[200px]
                                    "
                  style={{
                    fontVariationSettings: "'FILL' 1",
                  }}
                >
                  eco
                </span>
              </div>
            </section>
          )}

          {/* Grid */}
          {filteredStories.length > 0 ? (
            <section
              className="
                                grid
                                grid-cols-1
                                sm:grid-cols-2
                                lg:grid-cols-3
                                gap-8
                            "
            >
              {filteredStories.map((story) => (
                <article
                  key={story.id}
                  className="
                                        story-card
                                        bg-surface-container-lowest
                                        rounded-3xl
                                        overflow-hidden
                                        border
                                        border-outline-variant
                                        flex
                                        flex-col
                                        story-shadow
                                    "
                >
                  <div
                    className="
                                            relative
                                            h-56
                                        "
                  >
                    <img
                      src={story.image}
                      alt={story.title}
                      className="
                                                w-full
                                                h-full
                                                object-cover
                                            "
                    />

                    <div
                      className="
                                                absolute
                                                top-3
                                                right-3
                                                flex
                                                flex-col
                                                gap-1
                                                items-end
                                            "
                    >
                      <span
                        className="
                                                    bg-surface/90
                                                    text-primary
                                                    font-label-sm
                                                    px-4
                                                    py-1
                                                    rounded-full
                                                    backdrop-blur-sm
                                                "
                      >
                        {story.language}
                      </span>

                      <span
                        className={`
                                                    font-label-sm
                                                    px-4
                                                    py-1
                                                    rounded-full
                                                    backdrop-blur-sm

                                                    ${getLevelClass(
                                                      story.level,
                                                    )}
                                                `}
                      >
                        {story.level}
                      </span>
                    </div>
                  </div>

                  <div
                    className="
                                            p-6
                                            flex
                                            flex-col
                                            flex-grow
                                        "
                  >
                    <div className="mb-2">
                      <span
                        className="
                                                    text-xs
                                                    uppercase
                                                    tracking-wider
                                                    font-semibold
                                                    text-secondary
                                                "
                      >
                        {story.category}
                      </span>
                    </div>

                    <h3
                      className="
                                                font-headline-md
                                                text-headline-md
                                                text-on-surface
                                                mb-3
                                            "
                      style={{
                        fontFamily: "Bricolage Grotesque",
                      }}
                    >
                      {story.title}
                    </h3>

                    <p
                      className="
                                                font-body-md
                                                text-on-surface-variant
                                                mb-6
                                                flex-grow
                                            "
                    >
                      {story.description}
                    </p>

                    <div
                      className="
                                                mt-auto
                                                pt-4
                                                flex
                                                items-center
                                                justify-between
                                                gap-3
                                                border-t
                                                border-outline-variant
                                            "
                    >
                      <div
                        className="
                                                    flex
                                                    items-center
                                                    gap-1
                                                    text-on-surface-variant
                                                "
                      >
                        <span
                          className="
                                                        material-symbols-outlined
                                                        text-xl
                                                    "
                        >
                          menu_book
                        </span>

                        <span
                          className="
                                                        font-label-sm
                                                    "
                        >
                          {story.duration} min
                        </span>
                      </div>

                      {/* Se conectará al lector */}
                      <button
                        type="button"
                        className="
                                                    bg-primary
                                                    text-on-primary
                                                    font-label-lg
                                                    px-5
                                                    py-3
                                                    rounded-xl
                                                    story-button
                                                    border-b-4
                                                    border-on-primary-fixed-variant
                                                "
                      >
                        Leer ahora
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </section>
          ) : (
            <section
              className="
                                bg-white
                                border
                                border-outline-variant
                                rounded-3xl
                                p-12
                                text-center
                                story-shadow
                            "
            >
              <span
                className="
                                    material-symbols-outlined
                                    text-6xl
                                    text-outline
                                    mb-4
                                "
              >
                auto_stories
              </span>

              <h3
                className="
                                    text-xl
                                    font-bold
                                    text-on-surface
                                    mb-2
                                "
              >
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
