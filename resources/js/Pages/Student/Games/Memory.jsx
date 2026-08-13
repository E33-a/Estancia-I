import { Head, Link } from "@inertiajs/react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

// Cambia solamente este número si quieres más o menos vidas.
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
    },
    {
      id: `${pair.id}-word`,
      pairId: pair.id,
      type: "word",
      spanish: pair.spanish,
      nahuatl: pair.nahuatl,
      emoji: pair.emoji,
    },
  ]);

  for (let i = cards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [cards[i], cards[j]] = [cards[j], cards[i]];
  }

  return cards;
}

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  return `${String(minutes).padStart(2, "0")}:${String(
    remainingSeconds,
  ).padStart(2, "0")}`;
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

  const timeoutRef = useRef(null);

  const lives = Math.max(0, MAX_LIVES - mistakes);

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
  }, [pairs]);

  useEffect(() => {
    if (status !== "playing") {
      return;
    }

    const timer = setInterval(() => {
      setSeconds((current) => current + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [status]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (
      pairs.length > 0 &&
      matched.length === pairs.length &&
      status === "playing"
    ) {
      setStatus("won");

      setScore((current) => current + lives * 25);
    }
  }, [matched, pairs.length, lives, status]);

  const speakWord = (word) => {
    if (!("speechSynthesis" in window)) {
      return;
    }

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(word);

    utterance.lang = "es-MX";
    utterance.rate = 0.75;

    window.speechSynthesis.speak(utterance);
  };

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

    if (firstCard && secondCard && firstCard.pairId === secondCard.pairId) {
      setMatched((current) => [...current, firstCard.pairId]);

      setScore((current) => current + 100);

      setMessage(`¡Excelente! ${firstCard.nahuatl} es ${firstCard.spanish}`);

      setFlipped([]);
      setLocked(false);

      timeoutRef.current = setTimeout(() => {
        setMessage("");
      }, 2200);

      return;
    }

    timeoutRef.current = setTimeout(() => {
      setFlipped([]);
      setLocked(false);

      setMistakes((current) => {
        const nextMistakes = current + 1;

        if (nextMistakes >= MAX_LIVES) {
          setStatus("lost");
        }

        return nextMistakes;
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
          transition: transform 0.45s;
          transform-style: preserve-3d;
        }

        .memory-card-visible .memory-card-inner {
          transform: rotateY(180deg);
        }

        .memory-card-back,
        .memory-card-front {
          position: absolute;
          inset: 0;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }

        .memory-card-front {
          transform: rotateY(180deg);
        }

        @keyframes matchPulse {
          0% {
            transform: scale(1);
          }

          50% {
            transform: scale(1.04);
          }

          100% {
            transform: scale(1);
          }
        }

        .matched-card {
          animation: matchPulse 0.8s ease;
          box-shadow:
            0 0 0 3px #36693e,
            0 8px 20px rgba(54, 105, 62, 0.2);
        }
      `}</style>

      <div className="min-h-screen bg-surface-bright flex flex-col">
        {/* Barra superior del juego */}
        <header className="bg-surface-bright shadow-sm border-b border-outline-variant sticky top-[80px] z-40">
          <div className="max-w-5xl mx-auto px-5 md:px-10 py-3 flex justify-between items-center">
            {/* Vidas */}
            <div className="flex items-center gap-1 flex-wrap">
              {Array.from({ length: MAX_LIVES }, (_, index) => index + 1).map(
                (heart) => (
                  <span
                    key={heart}
                    className={`material-symbols-outlined ${
                      heart <= lives ? "text-primary" : "text-outline-variant"
                    }`}
                    style={{
                      fontVariationSettings:
                        heart <= lives ? "'FILL' 1" : "'FILL' 0",
                    }}
                  >
                    favorite
                  </span>
                ),
              )}

              <span className="ml-1 font-label-lg text-on-surface-variant">
                {lives}/{MAX_LIVES}
              </span>
            </div>

            {/* Tiempo */}
            <div className="flex items-center bg-surface-container-high px-4 py-2 rounded-full shadow-inner">
              <span className="material-symbols-outlined text-primary mr-2">
                timer
              </span>

              <span className="font-bold text-xl text-primary tabular-nums">
                {formatTime(seconds)}
              </span>
            </div>

            {/* Puntuación */}
            <div className="flex items-center gap-1">
              <span
                className="material-symbols-outlined text-tertiary"
                style={{
                  fontVariationSettings: "'FILL' 1",
                }}
              >
                star
              </span>

              <span className="font-bold text-on-surface">{score}</span>
            </div>
          </div>
        </header>

        <main className="flex-grow flex flex-col items-center px-5 py-8 relative">
          {/* Mensaje cuando encuentra una pareja */}
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
              Vocabulario en Náhuatl
            </p>

            <p className="text-sm text-on-surface-variant mt-2">
              Relaciona cada concepto en español con su palabra correspondiente
              en Náhuatl.
            </p>
          </div>

          {/* Tablero */}
          <div className="grid grid-cols-4 gap-2 sm:gap-3 max-w-[560px] w-full">
            {cards.map((card) => {
              const visible = isCardVisible(card);

              const isMatched = matched.includes(card.pairId);

              return (
                <button
                  key={card.id}
                  type="button"
                  onClick={() => handleCardClick(card)}
                  disabled={locked || isMatched || status !== "playing"}
                  className={`
                    memory-card
                    relative
                    aspect-square
                    rounded-xl
                    outline-none
                    transition-transform

                    ${!visible && status === "playing" ? "hover:scale-105" : ""}

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

                          <span
                            role="button"
                            tabIndex={0}
                            onClick={(event) => {
                              event.stopPropagation();

                              speakWord(card.nahuatl);
                            }}
                            className="mt-1 bg-surface-container-high rounded-full p-1 text-primary hover:bg-primary hover:text-white transition-colors"
                          >
                            <span className="material-symbols-outlined text-base">
                              volume_up
                            </span>
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </button>
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

        {/* Modal de resultado */}
        {status !== "playing" && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[120] flex items-center justify-center p-5">
            <div className="bg-white rounded-3xl p-8 max-w-md w-full text-center shadow-2xl border border-outline-variant">
              <div
                className={`
                  w-20
                  h-20
                  rounded-full
                  mx-auto
                  mb-5
                  flex
                  items-center
                  justify-center

                  ${
                    status === "won"
                      ? "bg-secondary-container text-secondary"
                      : "bg-error-container text-error"
                  }
                `}
              >
                <span className="material-symbols-outlined text-5xl">
                  {status === "won" ? "emoji_events" : "sentiment_dissatisfied"}
                </span>
              </div>

              <h2
                className="text-3xl font-bold text-on-surface mb-2"
                style={{
                  fontFamily: "Bricolage Grotesque",
                }}
              >
                {status === "won"
                  ? "¡Excelente trabajo!"
                  : "¡Inténtalo de nuevo!"}
              </h2>

              <p className="text-on-surface-variant mb-6">
                {status === "won"
                  ? "Encontraste todas las parejas del memorama."
                  : "Se terminaron tus intentos, pero puedes volver a intentarlo."}
              </p>

              <div className="grid grid-cols-3 gap-3 mb-7">
                <div className="bg-surface-container rounded-xl p-3">
                  <span className="material-symbols-outlined text-tertiary">
                    star
                  </span>

                  <p className="font-bold">{score}</p>

                  <p className="text-xs text-on-surface-variant">Puntos</p>
                </div>

                <div className="bg-surface-container rounded-xl p-3">
                  <span className="material-symbols-outlined text-primary">
                    timer
                  </span>

                  <p className="font-bold">{formatTime(seconds)}</p>

                  <p className="text-xs text-on-surface-variant">Tiempo</p>
                </div>

                <div className="bg-surface-container rounded-xl p-3">
                  <span className="material-symbols-outlined text-secondary">
                    check_circle
                  </span>

                  <p className="font-bold">
                    {matched.length}/{pairs.length}
                  </p>

                  <p className="text-xs text-on-surface-variant">Pares</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={resetGame}
                  className="flex-1 bg-primary text-white py-3 rounded-xl font-bold hover:bg-primary-container transition-colors"
                >
                  Jugar de nuevo
                </button>

                <Link
                  href={route("games.index")}
                  className="flex-1 border-2 border-primary text-primary py-3 rounded-xl font-bold hover:bg-primary-fixed transition-colors"
                >
                  Catálogo
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </AuthenticatedLayout>
  );
}
