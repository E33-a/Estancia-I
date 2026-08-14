import { formatGameTime } from "@/Hooks/useGameTimer";

export default function GameStatusBar({
  lives = 8,
  maxLives = 8,
  score = 0,
  elapsedSeconds = 0,
}) {
  return (
    <div className="grid grid-cols-3 gap-3 w-full">
      {/* Vidas */}
      <div className="bg-white border border-outline-variant rounded-2xl p-3 text-center shadow-sm">
        <div className="flex items-center justify-center gap-1 text-error">
          <span className="material-symbols-outlined">favorite</span>

          <span className="font-bold text-xl">
            {lives}/{maxLives}
          </span>
        </div>

        <p className="text-xs text-on-surface-variant">Vidas</p>
      </div>

      {/* Tiempo */}
      <div className="bg-white border border-outline-variant rounded-2xl p-3 text-center shadow-sm">
        <div className="flex items-center justify-center gap-1 text-secondary">
          <span className="material-symbols-outlined">timer</span>

          <span className="font-bold text-xl">
            {formatGameTime(elapsedSeconds)}
          </span>
        </div>

        <p className="text-xs text-on-surface-variant">Tiempo</p>
      </div>

      {/* Puntos */}
      <div className="bg-white border border-outline-variant rounded-2xl p-3 text-center shadow-sm">
        <div className="flex items-center justify-center gap-1 text-tertiary">
          <span
            className="material-symbols-outlined"
            style={{
              fontVariationSettings: "'FILL' 1",
            }}
          >
            star
          </span>

          <span className="font-bold text-xl">{score}</span>
        </div>

        <p className="text-xs text-on-surface-variant">Puntos</p>
      </div>
    </div>
  );
}
