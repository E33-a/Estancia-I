import { Link } from "@inertiajs/react";

import { formatGameTime } from "@/Hooks/useGameTimer";

export default function GameResultModal({
  open,
  won,
  score,
  elapsedSeconds,
  stars = 0,
  newBadges = [],
  onRetry,
}) {
  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[150] bg-black/50 backdrop-blur-sm flex items-center justify-center p-5">
      <div className="bg-white rounded-3xl max-w-lg w-full p-8 text-center border-4 border-secondary-container shadow-2xl">
        {/* Icono principal */}
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
              won
                ? "bg-secondary-container text-secondary"
                : "bg-error-container text-error"
            }
          `}
        >
          <span className="material-symbols-outlined text-6xl">
            {won ? "emoji_events" : "refresh"}
          </span>
        </div>

        {/* Mensaje */}
        <h2
          className="text-3xl font-bold mt-5"
          style={{
            fontFamily: "Bricolage Grotesque",
          }}
        >
          {won ? "¡Excelente trabajo!" : "¡Sigue practicando!"}
        </h2>

        <p className="text-on-surface-variant mt-2">
          {won
            ? "Completaste correctamente la actividad."
            : "Te quedaste sin intentos, pero puedes volver a intentarlo."}
        </p>

        {/* Resultados */}
        <div className="grid grid-cols-3 gap-3 mt-6">
          {/* Puntos */}
          <div className="bg-surface-container rounded-xl p-3">
            <span className="material-symbols-outlined text-tertiary">
              star
            </span>

            <p className="font-bold text-xl">{score}</p>

            <p className="text-xs text-on-surface-variant">Puntos</p>
          </div>

          {/* Tiempo */}
          <div className="bg-surface-container rounded-xl p-3">
            <span className="material-symbols-outlined text-secondary">
              timer
            </span>

            <p className="font-bold text-xl">
              {formatGameTime(elapsedSeconds)}
            </p>

            <p className="text-xs text-on-surface-variant">Tiempo</p>
          </div>

          {/* Estrellas */}
          <div className="bg-surface-container rounded-xl p-3">
            <span
              className="material-symbols-outlined text-primary"
              style={{
                fontVariationSettings: "'FILL' 1",
              }}
            >
              stars
            </span>

            <p className="font-bold text-xl">+{stars}</p>

            <p className="text-xs text-on-surface-variant">Estrellas</p>
          </div>
        </div>

        {/* Nuevas insignias */}
        {newBadges.length > 0 && (
          <div className="mt-6 bg-tertiary-fixed rounded-2xl p-5">
            <p className="font-bold text-tertiary flex items-center justify-center gap-2">
              <span className="material-symbols-outlined">
                workspace_premium
              </span>

              {newBadges.length === 1
                ? "¡Nueva insignia!"
                : "¡Nuevas insignias!"}
            </p>

            <div className="mt-3 space-y-2">
              {newBadges.map((badge) => (
                <div
                  key={badge.id}
                  className="bg-white/70 rounded-xl p-3 flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-outlined text-primary">
                    {badge.icon ?? "workspace_premium"}
                  </span>

                  <strong>{badge.name}</strong>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Navegación */}
        <div className="grid sm:grid-cols-2 gap-3 mt-7">
          <Link
            href={route("achievements.index")}
            className="bg-secondary text-white rounded-xl py-4 font-bold flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined">workspace_premium</span>
            Ver Mis Logros
          </Link>

          <Link
            href={route("games.index")}
            className="bg-primary text-white rounded-xl py-4 font-bold flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined">sports_esports</span>
            Volver a Juegos
          </Link>
        </div>

        {/* Reintentar solamente si perdió */}
        {!won && (
          <button
            type="button"
            onClick={onRetry}
            className="w-full mt-3 border-2 border-primary text-primary rounded-xl py-3 font-bold hover:bg-primary-fixed transition-colors"
          >
            Intentar otra vez
          </button>
        )}

        {/* También permitimos volver a jugar si ganó */}
        {won && (
          <button
            type="button"
            onClick={onRetry}
            className="w-full mt-3 border-2 border-primary text-primary rounded-xl py-3 font-bold hover:bg-primary-fixed transition-colors"
          >
            Jugar otra vez
          </button>
        )}
      </div>
    </div>
  );
}
