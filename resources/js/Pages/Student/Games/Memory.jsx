import { Head, Link } from "@inertiajs/react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

import GameStatusBar from "@/Components/Games/GameStatusBar";
import GameResultModal from "@/Components/Games/GameResultModal";
import PronounceButton from "@/Components/Games/PronounceButton";

import { saveGameResult } from "@/Utils/gameResults";

const MAX_LIVES = 8;

function shuffleCards(pairs) {
  const cards = pairs.flatMap((pair) => [
    {
      id: `${pair.id}-image`,
      pairId: pair.id,
      type: "image",
      spanish: pair.spanish,
      nahuatl: pair.nahuatl,
      emoji: pair.emoji,

      audioUrl: pair.audioUrl ?? null,
    },

    {
      id: `${pair.id}-word`,
      pairId: pair.id,
      type: "word",
      spanish: pair.spanish,
      nahuatl: pair.nahuatl,
      emoji: pair.emoji,

      audioUrl: pair.audioUrl ?? null,
    },
  ]);

  for (let i = cards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [cards[i], cards[j]] = [cards[j], cards[i]];
  }

  return cards;
}

export default function Memory({ pairs = [] }) {
  const initialCards = useMemo(() => shuffleCards(pairs), [pairs]);

  const [cards, setCards] = useState(initialCards);

  const [flipped, setFlipped] = useState([]);

  const [matched, setMatched] = useState([]);

  const [mistakes, setMistakes] = useState(0);

  const [score, setScore] = useState(0);

  const [seconds, setSeconds] = useState(0);

  const [locked, setLocked] = useState(false);

  const [message, setMessage] = useState("");

  const [status, setStatus] = useState("playing");

  /*
   * Información que responde Laravel
   * después de guardar la partida.
   */
  const [resultData, setResultData] = useState({
    stars: 0,
    newBadges: [],
  });

  const timeoutRef = useRef(null);

  /*
   * UUID único de esta partida.
   *
   * Si por cualquier motivo se repite
   * la petición HTTP, Laravel no
   * registrará dos veces la partida.
   */
  const resultUuidRef = useRef(crypto.randomUUID());

  /*
   * Evita enviar dos veces el
   * resultado durante el mismo juego.
   */
  const resultSentRef = useRef(false);

  const lives = Math.max(0, MAX_LIVES - mistakes);

  /*
  |--------------------------------------------------------------------------
  | Reiniciar
  |--------------------------------------------------------------------------
  */

  const resetGame = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    setCards(shuffleCards(pairs));

    setFlipped([]);
    setMatched([]);
    setMistakes(0);

    setScore(0);
    setSeconds(0);

    setLocked(false);
    setMessage("");

    setStatus("playing");

    setResultData({
      stars: 0,
      newBadges: [],
    });

    /*
     * Nueva partida =
     * nuevo identificador.
     */
    resultUuidRef.current = crypto.randomUUID();

    resultSentRef.current = false;
  }, [pairs]);

  /*
  |--------------------------------------------------------------------------
  | Cronómetro
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    if (status !== "playing") {
      return;
    }

    const timer = window.setInterval(() => {
      setSeconds((current) => current + 1);
    }, 1000);

    return () => window.clearInterval(timer);
  }, [status]);

  /*
  |--------------------------------------------------------------------------
  | Limpiar timeout al abandonar
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  /*
  |--------------------------------------------------------------------------
  | Detectar victoria
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    if (
      pairs.length > 0 &&
      matched.length === pairs.length &&
      status === "playing"
    ) {
      /*
       * Bono final dependiendo de
       * las vidas conservadas.
       */
      setScore((current) => current + lives * 25);

      setStatus("won");
    }
  }, [matched, pairs.length, lives, status]);

  /*
  |--------------------------------------------------------------------------
  | Guardar resultado
  |--------------------------------------------------------------------------
  |
  | Se ejecuta tanto al ganar como
  | al quedarse sin vidas.
  |
  */

  useEffect(() => {
    if (status === "playing" || resultSentRef.current) {
      return;
    }

    resultSentRef.current = true;

    let cancelled = false;

    const persistResult = async () => {
      try {
        const response = await saveGameResult({
          resultUuid: resultUuidRef.current,

          gameKey: "memory",

          score,

          livesRemaining: lives,

          elapsedSeconds: seconds,

          won: status === "won",
        });

        if (cancelled) {
          return;
        }

        setResultData({
          stars: response.result?.stars ?? 0,

          newBadges: response.newBadges ?? [],
        });
      } catch (error) {
        console.error("No se pudo guardar el resultado del Memorama:", error);

        /*
         * Permitimos intentar
         * enviar nuevamente si
         * ocurre un error real.
         */
        if (!cancelled) {
          resultSentRef.current = false;
        }
      }
    };

    persistResult();

    return () => {
      cancelled = true;
    };
  }, [status, score, lives, seconds]);

  /*
  |--------------------------------------------------------------------------
  | Seleccionar cartas
  |--------------------------------------------------------------------------
  */

  const handleCardClick = (card) => {
    if (
      locked ||
      status !== "playing" ||
      flipped.includes(card.id) ||
      matched.includes(card.pairId)
    ) {
      return;
    }

    const newFlipped = [...flipped, card.id];

    setFlipped(newFlipped);

    if (newFlipped.length < 2) {
      return;
    }

    setLocked(true);

    const firstCard = cards.find((item) => item.id === newFlipped[0]);

    const secondCard = cards.find((item) => item.id === newFlipped[1]);

    /*
     * Pareja correcta
     */
    if (firstCard && secondCard && firstCard.pairId === secondCard.pairId) {
      setMatched((current) => [...current, firstCard.pairId]);

      setScore((current) => current + 100);

      setMessage(`¡Excelente! ${firstCard.nahuatl} es ${firstCard.spanish}`);

      setFlipped([]);
      setLocked(false);

      timeoutRef.current = window.setTimeout(() => {
        setMessage("");
      }, 2200);

      return;
    }

    /*
     * Pareja incorrecta
     */
    timeoutRef.current = window.setTimeout(() => {
      setFlipped([]);
      setLocked(false);

      setMistakes((current) => {
        const next = current + 1;

        if (next >= MAX_LIVES) {
          setStatus("lost");
        }

        return next;
      });
    }, 900);
  };

  const isCardVisible = (card) =>
    flipped.includes(card.id) || matched.includes(card.pairId);

  return (
    <AuthenticatedLayout>
      <Head title="Memorama - Raíces Vivas" />

      <style>{`
        .memory-pattern {
          background-color: #9a4028;
          background-image:
            url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 5l3 8h-6l3-8zm0 30l-3-8h6l-3 8zm15-15l-8-3v6l8-3zM5 20l8 3v-6l-8 3zm25-10l-4 6 6-4-2-2zm-20 0l2 2-6 4 4-6zm0 20l-4 6 6-4-2-2zm20 0l2 2-6 4 4-6z' fill='%23b9573e' fill-opacity='0.4' fill-rule='evenodd'/%3E%3C/svg%3E");
        }

        .memory-card {
          perspective: 900px;
        }

        .memory-card-inner {
          position: relative;
          width: 100%;
          height: 100%;
          transition:
            transform 0.45s;

          transform-style:
            preserve-3d;
        }

        .memory-card-visible
        .memory-card-inner {
          transform:
            rotateY(180deg);
        }

        .memory-card-back,
        .memory-card-front {
          position: absolute;
          inset: 0;

          backface-visibility:
            hidden;

          -webkit-backface-visibility:
            hidden;
        }

        .memory-card-front {
          transform:
            rotateY(180deg);
        }

        @keyframes matchPulse {
          0% {
            transform: scale(1);
          }

          50% {
            transform:
              scale(1.04);
          }

          100% {
            transform: scale(1);
          }
        }

        .matched-card {
          animation:
            matchPulse
            0.8s
            ease;

          box-shadow:
            0 0 0 3px #36693e,
            0 8px 20px
              rgba(
                54,
                105,
                62,
                0.2
              );
        }
      `}</style>

      <div className="min-h-screen bg-surface-bright flex flex-col">
        {/* Barra de estado común */}
        <header className="bg-surface-bright shadow-sm border-b border-outline-variant sticky top-[80px] z-40">
          <div className="max-w-5xl mx-auto px-5 md:px-10 py-3">
            <GameStatusBar
              lives={lives}
              maxLives={MAX_LIVES}
              score={score}
              elapsedSeconds={seconds}
            />
          </div>
        </header>

        <main className="flex-grow flex flex-col items-center px-5 py-8 relative">
          {/* Mensaje de pareja correcta */}
          <div
            className={`
              fixed
              top-28
              left-1/2
              -translate-x-1/2
              bg-secondary
              text-on-secondary
              px-6
              py-3
              rounded-full
              flex
              items-center
              gap-2
              shadow-lg
              z-[100]
              transition-all
              duration-300

              ${
                message
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 -translate-y-8 pointer-events-none"
              }
            `}
          >
            <span
              className="material-symbols-outlined"
              style={{
                fontVariationSettings: "'FILL' 1",
              }}
            >
              check_circle
            </span>

            <span className="font-semibold">{message}</span>
          </div>

          {/* Encabezado */}
          <div className="mb-6 text-center">
            <h1
              className="text-3xl md:text-4xl font-bold text-primary-container"
              style={{
                fontFamily: "Bricolage Grotesque",
              }}
            >
              Encuentra los Pares
            </h1>

            <p className="text-on-surface-variant mt-1">
              Animales del México Antiguo
            </p>

            <p className="text-sm text-on-surface-variant mt-2">
              Encuentra la imagen que corresponde con su palabra en Náhuatl.
            </p>
          </div>

          {/* Tablero */}
          <div className="grid grid-cols-4 gap-2 sm:gap-3 max-w-[560px] w-full">
            {cards.map((card) => {
              const visible = isCardVisible(card);

              const isMatched = matched.includes(card.pairId);

              const disabled = locked || isMatched || status !== "playing";

              return (
                <div
                  key={card.id}
                  role="button"
                  tabIndex={disabled ? -1 : 0}
                  aria-disabled={disabled}
                  onClick={() => handleCardClick(card)}
                  onKeyDown={(event) => {
                    /*
                     * Si el evento viene
                     * del botón de audio,
                     * no voltea la carta.
                     */
                    if (event.target !== event.currentTarget) {
                      return;
                    }

                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();

                      handleCardClick(card);
                    }
                  }}
                  className={`
                      memory-card
                      relative
                      aspect-square
                      rounded-xl
                      outline-none
                      transition-transform

                      ${!disabled ? "cursor-pointer" : "cursor-default"}

                      ${
                        !visible && status === "playing"
                          ? "hover:scale-105"
                          : ""
                      }

                      ${visible ? "memory-card-visible" : ""}
                    `}
                >
                  <div
                    className={`
                        memory-card-inner
                        rounded-xl
                        shadow-md

                        ${isMatched ? "matched-card" : ""}
                      `}
                  >
                    {/* Reverso */}
                    <div className="memory-card-back memory-pattern rounded-xl border-2 border-primary-container flex items-center justify-center">
                      <span className="material-symbols-outlined text-primary-fixed text-4xl md:text-5xl opacity-40">
                        eco
                      </span>
                    </div>

                    {/* Frente */}
                    <div className="memory-card-front bg-white rounded-xl border-2 border-secondary flex flex-col items-center justify-center p-1 sm:p-2 overflow-hidden">
                      {card.type === "image" ? (
                        <>
                          <span className="text-4xl sm:text-5xl md:text-6xl leading-none mb-1">
                            {card.emoji}
                          </span>

                          <span className="text-[10px] sm:text-xs font-semibold bg-secondary text-white px-2 py-1 rounded-full">
                            {card.spanish}
                          </span>
                        </>
                      ) : (
                        <>
                          <span
                            className="text-sm sm:text-lg md:text-xl font-bold text-secondary leading-tight break-words"
                            style={{
                              fontFamily: "Bricolage Grotesque",
                            }}
                          >
                            {card.nahuatl}
                          </span>

                          <p className="text-[9px] sm:text-xs text-on-surface-variant mt-1">
                            Náhuatl
                          </p>

                          <div className="mt-2">
                            <PronounceButton
                              text={card.nahuatl}
                              audioUrl={card.audioUrl}
                              compact
                            />
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Controles */}
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href={route("games.index")}
              className="flex items-center gap-2 px-6 py-3 border-2 border-primary text-primary rounded-xl font-semibold hover:bg-primary-fixed transition-colors"
            >
              <span className="material-symbols-outlined">arrow_back</span>
              Volver al Catálogo
            </Link>

            <button
              type="button"
              onClick={resetGame}
              className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl font-semibold shadow-md hover:bg-primary-container transition-colors"
            >
              <span className="material-symbols-outlined">refresh</span>
              Reiniciar
            </button>
          </div>
        </main>

        {/* Modal común */}
        <GameResultModal
          open={status !== "playing"}
          won={status === "won"}
          score={score}
          elapsedSeconds={seconds}
          stars={resultData.stars}
          newBadges={resultData.newBadges}
          onRetry={resetGame}
        />
      </div>
    </AuthenticatedLayout>
  );
}
