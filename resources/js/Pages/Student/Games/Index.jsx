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
      `}</style>

      <div className="min-h-screen flex flex-col bg-surface text-on-surface games-background">
        <main className="flex-grow max-w-7xl mx-auto w-full px-5 md:px-10 py-8">
          <div className="mb-6"></div>

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
                Juegos Educativos
              </h1>

              <p className="text-on-surface-variant">
                Practica lo aprendido de una forma divertida.
              </p>
            </div>
          </div>

          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {games.map((game) => {
              const iconClasses = getIconClasses(game);

              return (
                <article
                  key={game.id}
                  className="game-card bg-surface-container-lowest rounded-xl p-6 border border-outline-variant flex flex-col h-full shadow-sm"
                >
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

                  <div className="flex justify-between items-start gap-3 mb-3">
                    <h3
                      className="text-2xl font-semibold text-on-surface"
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
                        text-xs
                        font-semibold
                        rounded-full
                        whitespace-nowrap

                        ${getDifficultyClass(game.difficulty)}
                      `}
                    >
                      {game.difficulty}
                    </span>
                  </div>

                  <p className="text-on-surface-variant mb-6 flex-grow">
                    {game.description}
                  </p>

                  {game.route ? (
                    <Link
                      href={route(game.route)}
                      className="w-full py-4 bg-primary text-white rounded-lg font-semibold text-center hover:bg-primary-container transition-colors shadow-[0_4px_0_#7e2b16] active:translate-y-[2px] active:shadow-none"
                    >
                      Jugar ahora
                    </Link>
                  ) : (
                    <button
                      type="button"
                      disabled
                      className="w-full py-4 bg-surface-container-high text-on-surface-variant rounded-lg font-semibold opacity-70 cursor-not-allowed"
                    >
                      Próximamente
                    </button>
                  )}
                </article>
              );
            })}
          </section>

          <div className="mt-12 lesson-border w-full py-8 text-center">
            <span className="font-semibold text-on-surface-variant italic opacity-60">
              Sigue explorando tus raíces
            </span>
          </div>
        </main>

        <Footer />

        <nav className="md:hidden fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-1 py-3 bg-surface-container shadow-md rounded-t-xl">
          <Link
            href={route("student.dashboard")}
            className="flex flex-col items-center text-on-surface-variant px-4 py-1"
          >
            <span className="material-symbols-outlined">home</span>

            <span className="text-xs">Inicio</span>
          </Link>

          <Link
            href={route("stories.index")}
            className="flex flex-col items-center text-on-surface-variant px-4 py-1"
          >
            <span className="material-symbols-outlined">auto_stories</span>

            <span className="text-xs">Historias</span>
          </Link>

          <div className="flex flex-col items-center bg-primary-container text-white rounded-full px-4 py-1 -translate-y-[2px]">
            <span
              className="material-symbols-outlined"
              style={{
                fontVariationSettings: "'FILL' 1",
              }}
            >
              sports_esports
            </span>

            <span className="text-xs">Juegos</span>
          </div>

          <Link
            href={route("profile.edit")}
            className="flex flex-col items-center text-on-surface-variant px-4 py-1"
          >
            <span className="material-symbols-outlined">person</span>

            <span className="text-xs">Perfil</span>
          </Link>
        </nav>

        <div className="md:hidden h-20" />
      </div>
    </AuthenticatedLayout>
  );
}
