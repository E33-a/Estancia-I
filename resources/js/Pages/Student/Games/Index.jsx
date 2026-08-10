import { Head, Link } from "@inertiajs/react";

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Footer from "@/Components/Footer";

export default function Index({ games = [] }) {
  const getDifficultyClass = (difficulty) => {
    switch (difficulty) {
      case "Avanzado":
        return "bg-error-container text-on-error-container";

      case "Intermedio":
        return "bg-tertiary-fixed-dim text-on-tertiary-fixed-variant";

      default:
        return "bg-secondary-fixed text-on-secondary-fixed-variant";
    }
  };

  const getIconClasses = (game) => {
    const backgrounds = {
      "primary-fixed": "bg-primary-fixed",
      "tertiary-fixed": "bg-tertiary-fixed",
      "secondary-fixed": "bg-secondary-fixed",
      "surface-container-high": "bg-surface-container-high",
    };

    const colors = {
      primary: "text-primary",
      tertiary: "text-tertiary",
      secondary: "text-secondary",
      "on-surface-variant": "text-on-surface-variant",
    };

    return {
      background:
        backgrounds[game.iconBackground] ?? "bg-surface-container-high",

      color: colors[game.iconColor] ?? "text-on-surface-variant",
    };
  };

  return (
    <AuthenticatedLayout>
      <Head title="Juegos Educativos - Raíces Vivas" />

      <style>{`
                .games-background {
                    background-image:
                        radial-gradient(
                            #dcc0ba 0.5px,
                            transparent 0.5px
                        );

                    background-size: 24px 24px;
                }

                .game-card {
                    transition:
                        transform 0.3s ease,
                        box-shadow 0.3s ease;
                }

                .game-card:hover {
                    transform: translateY(-8px);

                    box-shadow:
                        0 12px 24px -10px
                        rgba(154, 64, 40, 0.15);
                }

                .game-card .game-icon {
                    transition: transform 0.3s ease;
                }

                .game-card:hover .game-icon {
                    transform: scale(1.2) rotate(5deg);
                }

                .lesson-border {
                    border-top: 4px double #9a4028;
                    position: relative;
                }

                .lesson-border::after {
                    content: '';
                    position: absolute;
                    top: -10px;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 40px;
                    height: 10px;
                    background-color: #fdf7ff;
                    background-image:
                        repeating-linear-gradient(
                            45deg,
                            #9a4028,
                            #9a4028 2px,
                            transparent 2px,
                            transparent 4px
                        );
                }

                .game-button:active {
                    transform: translateY(2px);
                    box-shadow: none;
                }
            `}</style>

      <div
        className="
                    min-h-screen
                    flex
                    flex-col
                    bg-surface
                    text-on-surface
                    games-background
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
                        relative
                    "
        >
          {/* Regresar */}
          <div className="relative z-10 mb-6">
            <Link
              href={route("student.dashboard")}
              className="
                                inline-flex
                                items-center
                                gap-1
                                font-label-lg
                                text-on-surface-variant
                                hover:text-primary
                                transition-colors
                                active:scale-95
                            "
            >
              <span className="material-symbols-outlined">arrow_back</span>
              Regresar al Menú Principal
            </Link>
          </div>

          {/* Encabezado */}
          <section className="relative z-10 mb-8">
            <h1
              className="
                                text-[28px]
                                md:text-headline-lg
                                font-bold
                                text-primary
                                mb-2
                            "
              style={{
                fontFamily: "Bricolage Grotesque",
              }}
            >
              Juegos Educativos
            </h1>

            <p
              className="
                                font-body-md
                                text-on-surface-variant
                                max-w-2xl
                            "
            >
              ¡Aprende jugando! Pon a prueba tus conocimientos sobre lenguas y
              cultura mexicana con retos divertidos diseñados especialmente para
              ti.
            </p>
          </section>

          {/* Juegos */}
          <section
            className="
                            relative
                            z-10
                            grid
                            grid-cols-1
                            md:grid-cols-2
                            lg:grid-cols-3
                            gap-6
                        "
          >
            {games.map((game) => {
              const iconClasses = getIconClasses(game);

              return (
                <article
                  key={game.id}
                  className="
                                        game-card
                                        bg-surface-container-lowest
                                        rounded-xl
                                        p-6
                                        border
                                        border-outline-variant
                                        flex
                                        flex-col
                                        h-full
                                        shadow-sm
                                    "
                >
                  {/* Icono */}
                  <div
                    className={`
                                            w-16
                                            h-16
                                            rounded-xl
                                            flex
                                            items-center
                                            justify-center
                                            mb-4

                                            ${iconClasses.background}
                                        `}
                  >
                    <span
                      className={`
                                                material-symbols-outlined
                                                text-4xl
                                                game-icon

                                                ${iconClasses.color}
                                            `}
                      style={{
                        fontVariationSettings: "'FILL' 1",
                      }}
                    >
                      {game.icon}
                    </span>
                  </div>

                  {/* Título y dificultad */}
                  <div
                    className="
                                            flex
                                            justify-between
                                            items-start
                                            gap-3
                                            mb-3
                                        "
                  >
                    <h3
                      className="
                                                font-headline-md
                                                text-headline-md
                                                text-on-surface
                                            "
                      style={{
                        fontFamily: "Bricolage Grotesque",
                      }}
                    >
                      {game.title}
                    </h3>

                    <span
                      className={`
                                                px-3
                                                py-1
                                                font-label-sm
                                                rounded-full
                                                whitespace-nowrap

                                                ${getDifficultyClass(
                                                  game.difficulty,
                                                )}
                                            `}
                    >
                      {game.difficulty}
                    </span>
                  </div>

                  {/* Descripción */}
                  <p
                    className="
                                            font-body-md
                                            text-on-surface-variant
                                            mb-6
                                            flex-grow
                                        "
                  >
                    {game.description}
                  </p>

                  {/*
                                        Por ahora no enlazamos las
                                        pantallas individuales porque
                                        todavía no están creadas.
                                    */}
                  <button
                    type="button"
                    disabled
                    className="
                                            game-button
                                            w-full
                                            py-4
                                            bg-primary
                                            text-on-primary
                                            rounded-lg
                                            font-label-lg
                                            transition-colors
                                            shadow-[0_4px_0_#7e2b16]
                                            opacity-80
                                            cursor-default
                                        "
                  >
                    Jugar ahora
                  </button>
                </article>
              );
            })}
          </section>

          {/* Separador decorativo */}
          <div
            className="
                            mt-12
                            lesson-border
                            w-full
                            py-8
                            text-center
                        "
          >
            <span
              className="
                                font-label-lg
                                text-on-surface-variant
                                italic
                                opacity-60
                            "
            >
              Sigue explorando tus raíces
            </span>
          </div>
        </main>

        <Footer />

        {/* Navegación móvil */}
        <nav
          className="
                        md:hidden
                        fixed
                        bottom-0
                        left-0
                        w-full
                        z-50
                        flex
                        justify-around
                        items-center
                        px-1
                        py-3
                        bg-surface-container
                        shadow-md
                        rounded-t-xl
                    "
        >
          <Link
            href={route("student.dashboard")}
            className="
                            flex
                            flex-col
                            items-center
                            justify-center
                            text-on-surface-variant
                            px-4
                            py-1
                        "
          >
            <span className="material-symbols-outlined">home</span>

            <span className="font-label-sm">Inicio</span>
          </Link>

          <Link
            href={route("stories.index")}
            className="
                            flex
                            flex-col
                            items-center
                            justify-center
                            text-on-surface-variant
                            px-4
                            py-1
                        "
          >
            <span className="material-symbols-outlined">auto_stories</span>

            <span className="font-label-sm">Historias</span>
          </Link>

          <div
            className="
                            flex
                            flex-col
                            items-center
                            justify-center
                            bg-primary-container
                            text-on-primary-container
                            rounded-full
                            px-4
                            py-1
                            -translate-y-[2px]
                        "
          >
            <span
              className="material-symbols-outlined"
              style={{
                fontVariationSettings: "'FILL' 1",
              }}
            >
              sports_esports
            </span>

            <span className="font-label-sm">Juegos</span>
          </div>

          <Link
            href={route("profile.edit")}
            className="
                            flex
                            flex-col
                            items-center
                            justify-center
                            text-on-surface-variant
                            px-4
                            py-1
                        "
          >
            <span className="material-symbols-outlined">person</span>

            <span className="font-label-sm">Perfil</span>
          </Link>
        </nav>

        {/* Espacio para que el menú móvil no tape contenido */}
        <div className="md:hidden h-20" />
      </div>
    </AuthenticatedLayout>
  );
}
