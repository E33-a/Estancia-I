import { Head, Link } from "@inertiajs/react";
import { useEffect, useRef, useState } from "react";

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

import GameStatusBar from "@/Components/Games/GameStatusBar";
import GameResultModal from "@/Components/Games/GameResultModal";
import PronounceButton from "@/Components/Games/PronounceButton";

import useGameTimer from "@/Hooks/useGameTimer";

import { saveGameResult } from "@/Utils/gameResults";

const MAX_LIVES = 8;

function shuffle(items) {
  const copy = [...items];

  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [copy[i], copy[j]] = [copy[j], copy[i]];
  }

  return copy;
}

export default function Matching({ pairs = [] }) {
  /*
  |--------------------------------------------------------------------------
  | Palabras de esta partida
  |--------------------------------------------------------------------------
  */

  const [spanishItems, setSpanishItems] = useState(() => shuffle(pairs));

  const [nahuatlItems, setNahuatlItems] = useState(() => shuffle(pairs));

  /*
  |--------------------------------------------------------------------------
  | Selecciones
  |--------------------------------------------------------------------------
  */

  const [selectedSpanish, setSelectedSpanish] = useState(null);

  const [selectedNahuatl, setSelectedNahuatl] = useState(null);

  const [matched, setMatched] = useState([]);

  const [mistakes, setMistakes] = useState(0);

  const [score, setScore] = useState(0);

  const [status, setStatus] = useState("playing");

  const [locked, setLocked] = useState(false);

  const [message, setMessage] = useState("");

  /*
  |--------------------------------------------------------------------------
  | Información que devuelve Laravel
  |--------------------------------------------------------------------------
  */

  const [resultData, setResultData] = useState({
    stars: 0,
    newBadges: [],
  });

  /*
  |--------------------------------------------------------------------------
  | Referencias
  |--------------------------------------------------------------------------
  */

  const resultUuidRef = useRef(crypto.randomUUID());

  const resultSentRef = useRef(false);

  const timeoutRef = useRef(null);

  /*
  |--------------------------------------------------------------------------
  | Vidas
  |--------------------------------------------------------------------------
  */

  const lives = Math.max(0, MAX_LIVES - mistakes);

  /*
  |--------------------------------------------------------------------------
  | Cronómetro común
  |--------------------------------------------------------------------------
  */

  const { elapsedSeconds, resetTimer } = useGameTimer(status === "playing");

  /*
  |--------------------------------------------------------------------------
  | Si Laravel manda nuevas parejas
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    setSpanishItems(shuffle(pairs));

    setNahuatlItems(shuffle(pairs));

    setMatched([]);
    setSelectedSpanish(null);
    setSelectedNahuatl(null);
  }, [pairs]);

  /*
  |--------------------------------------------------------------------------
  | Limpiar temporizadores
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      if ("speechSynthesis" in window) {
        window.speechSynthesis.cancel();
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
       * Bono final según vidas restantes.
       */
      setScore((current) => current + lives * 20);

      setStatus("won");
    }
  }, [matched, pairs.length, lives, status]);

  /*
  |--------------------------------------------------------------------------
  | Reiniciar partida
  |--------------------------------------------------------------------------
  */

  const resetGame = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    setSpanishItems(shuffle(pairs));

    setNahuatlItems(shuffle(pairs));

    setSelectedSpanish(null);
    setSelectedNahuatl(null);

    setMatched([]);

    setMistakes(0);
    setScore(0);

    setMessage("");
    setLocked(false);

    resetTimer();

    setStatus("playing");

    setResultData({
      stars: 0,
      newBadges: [],
    });

    /*
     * Una partida nueva necesita
     * un UUID nuevo.
     */
    resultUuidRef.current = crypto.randomUUID();

    resultSentRef.current = false;
  };

  /*
  |--------------------------------------------------------------------------
  | Verificar pareja
  |--------------------------------------------------------------------------
  */

  const verify = (spanishId, nahuatlId) => {
    if (locked || status !== "playing") {
      return;
    }

    setLocked(true);

    /*
     * Pareja correcta
     */
    if (spanishId === nahuatlId) {
      const pair = pairs.find((item) => item.id === spanishId);

      setMatched((current) => [...current, spanishId]);

      setScore((current) => current + 100);

      if (pair) {
        setMessage(`¡Correcto! ${pair.spanish} corresponde a ${pair.nahuatl}.`);
      } else {
        setMessage("¡Pareja correcta!");
      }

      timeoutRef.current = window.setTimeout(() => {
        setSelectedSpanish(null);

        setSelectedNahuatl(null);

        setMessage("");
        setLocked(false);
      }, 600);

      return;
    }

    /*
     * Pareja incorrecta
     */
    setMessage("Esa pareja no corresponde. Inténtalo nuevamente.");

    setScore((current) => Math.max(0, current - 20));

    setMistakes((current) => {
      const next = current + 1;

      if (next >= MAX_LIVES) {
        setStatus("lost");
      }

      return next;
    });

    timeoutRef.current = window.setTimeout(() => {
      setSelectedSpanish(null);

      setSelectedNahuatl(null);

      setMessage("");
      setLocked(false);
    }, 700);
  };

  /*
  |--------------------------------------------------------------------------
  | Elegir palabra en español
  |--------------------------------------------------------------------------
  */

  const chooseSpanish = (pair) => {
    if (locked || matched.includes(pair.id) || status !== "playing") {
      return;
    }

    setSelectedSpanish(pair.id);

    if (selectedNahuatl !== null) {
      verify(pair.id, selectedNahuatl);
    }
  };

  /*
  |--------------------------------------------------------------------------
  | Elegir palabra Náhuatl
  |--------------------------------------------------------------------------
  */

  const chooseNahuatl = (pair) => {
    if (locked || matched.includes(pair.id) || status !== "playing") {
      return;
    }

    setSelectedNahuatl(pair.id);

    if (selectedSpanish !== null) {
      verify(selectedSpanish, pair.id);
    }
  };

  /*
  |--------------------------------------------------------------------------
  | Guardar resultado
  |--------------------------------------------------------------------------
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

          gameKey: "matching",

          score,

          livesRemaining: lives,

          elapsedSeconds,

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
        console.error("No se pudo guardar el resultado de Relacionar:", error);

        if (!cancelled) {
          resultSentRef.current = false;
        }
      }
    };

    persistResult();

    return () => {
      cancelled = true;
    };
  }, [status, score, lives, elapsedSeconds]);

  /*
  |--------------------------------------------------------------------------
  | Sin vocabulario
  |--------------------------------------------------------------------------
  */

  if (pairs.length === 0) {
    return (
      <AuthenticatedLayout>
        <Head title="Relacionar - Raíces Vivas" />

        <div className="min-h-screen bg-surface px-5 py-10">
          <div className="max-w-2xl mx-auto bg-white border border-outline-variant rounded-3xl p-10 text-center">
            <span className="material-symbols-outlined text-6xl text-outline">
              link_off
            </span>

            <h1
              className="text-3xl font-bold mt-4"
              style={{
                fontFamily: "Bricolage Grotesque",
              }}
            >
              Actividad no disponible
            </h1>

            <p className="text-on-surface-variant mt-2">
              No hay vocabulario disponible para crear esta partida.
            </p>

            <Link
              href={route("games.index")}
              className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-xl font-bold mt-6"
            >
              <span className="material-symbols-outlined">arrow_back</span>
              Volver al catálogo
            </Link>
          </div>
        </div>
      </AuthenticatedLayout>
    );
  }

  return (
    <AuthenticatedLayout>
      <Head title="Relacionar - Raíces Vivas" />

      <div className="min-h-screen bg-surface flex flex-col">
        {/* Barra común */}
        <header className="bg-surface-bright border-b border-outline-variant shadow-sm sticky top-[80px] z-40">
          <div className="max-w-5xl mx-auto px-5 md:px-10 py-3">
            <GameStatusBar
              lives={lives}
              maxLives={MAX_LIVES}
              score={score}
              elapsedSeconds={elapsedSeconds}
            />
          </div>
        </header>

        <main className="flex-grow px-5 py-8">
          <div className="max-w-5xl mx-auto">
            {/* Título */}
            <h1
              className="text-3xl md:text-4xl font-bold text-primary text-center"
              style={{
                fontFamily: "Bricolage Grotesque",
              }}
            >
              Relaciona las Palabras
            </h1>

            <p className="text-center text-on-surface-variant mt-2 mb-5">
              Selecciona una palabra en español y encuentra su equivalente en
              Náhuatl.
            </p>

            {/* Progreso */}
            <div className="max-w-xl mx-auto bg-white border border-outline-variant rounded-2xl p-4 mb-7 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="font-semibold">Parejas encontradas</span>

                <span className="font-bold text-secondary">
                  {matched.length}/{pairs.length}
                </span>
              </div>

              <div className="w-full h-2 bg-surface-variant rounded-full overflow-hidden mt-3">
                <div
                  className="h-full bg-secondary transition-all duration-500"
                  style={{
                    width: `${
                      pairs.length > 0
                        ? (matched.length / pairs.length) * 100
                        : 0
                    }%`,
                  }}
                />
              </div>
            </div>

            {/* Feedback */}
            <div
              className={`
                max-w-xl
                mx-auto
                mb-5
                rounded-xl
                px-4
                py-3
                text-center
                font-semibold
                transition-all

                ${message ? "opacity-100" : "opacity-0 pointer-events-none"}

                ${
                  message.startsWith("¡Correcto!") ||
                  message === "¡Pareja correcta!"
                    ? "bg-secondary-container text-secondary"
                    : "bg-error-container text-error"
                }
              `}
            >
              {message || "Mensaje"}
            </div>

            {/* Columnas */}
            <div className="grid grid-cols-2 gap-4 md:gap-10">
              {/* Español */}
              <section>
                <h2 className="text-center bg-primary-fixed text-primary font-bold rounded-xl py-3 mb-4">
                  Español
                </h2>

                <div className="space-y-3">
                  {spanishItems.map((pair) => {
                    const isMatched = matched.includes(pair.id);

                    const isSelected = selectedSpanish === pair.id;

                    return (
                      <button
                        type="button"
                        key={pair.id}
                        onClick={() => chooseSpanish(pair)}
                        disabled={isMatched || status !== "playing"}
                        className={`
                            w-full
                            h-[72px]
                            p-4
                            rounded-xl
                            border-2
                            text-left
                            font-semibold
                            transition-all

                            ${
                              isMatched
                                ? "bg-secondary-container border-secondary opacity-60"
                                : isSelected
                                  ? "bg-primary-fixed border-primary scale-[0.98]"
                                  : "bg-white border-outline-variant hover:border-primary hover:-translate-y-0.5"
                            }
                          `}
                      >
                        <span className="inline-flex items-center gap-2">
                          <span className="text-xl">{pair.emoji}</span>

                          <span>{pair.spanish}</span>

                          {isMatched && (
                            <span className="material-symbols-outlined text-secondary ml-auto">
                              check_circle
                            </span>
                          )}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </section>

              {/* Náhuatl */}
              <section>
                <h2 className="text-center bg-secondary-container text-secondary font-bold rounded-xl py-3 mb-4">
                  Náhuatl
                </h2>

                <div className="space-y-3">
                  {nahuatlItems.map((pair) => {
                    const isMatched = matched.includes(pair.id);

                    const isSelected = selectedNahuatl === pair.id;

                    return (
                      <div
                        key={pair.id}
                        className={`
                            flex
                            items-center
                            h-[72px]
                            gap-2
                            rounded-xl
                            border-2
                            p-2
                            transition-all

                            ${
                              isMatched
                                ? "bg-secondary-container border-secondary opacity-60"
                                : isSelected
                                  ? "bg-secondary-fixed border-secondary scale-[0.98]"
                                  : "bg-white border-outline-variant hover:border-secondary"
                            }
                          `}
                      >
                        {/* Selección */}
                        <button
                          type="button"
                          onClick={() => chooseNahuatl(pair)}
                          disabled={isMatched || status !== "playing"}
                          className="flex-grow text-left font-semibold px-2 py-2 disabled:cursor-default"
                        >
                          <span className="flex items-center gap-2">
                            <span>{pair.nahuatl}</span>

                            {isMatched && (
                              <span className="material-symbols-outlined text-secondary">
                                check_circle
                              </span>
                            )}
                          </span>
                        </button>

                        {/* Pronunciación */}
                        {!isMatched && (
                          <PronounceButton
                            text={pair.nahuatl}
                            audioUrl={pair.audioUrl ?? null}
                            compact
                          />
                        )}
                      </div>
                    );
                  })}
                </div>
              </section>
            </div>

            {/* Controles */}
            <div className="flex flex-wrap justify-center gap-3 mt-8">
              <Link
                href={route("games.index")}
                className="inline-flex items-center gap-2 border-2 border-primary text-primary px-6 py-3 rounded-xl font-semibold hover:bg-primary-fixed transition-colors"
              >
                <span className="material-symbols-outlined">arrow_back</span>
                Volver al catálogo
              </Link>

              <button
                type="button"
                onClick={resetGame}
                className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-xl font-semibold hover:bg-primary-container transition-colors"
              >
                <span className="material-symbols-outlined">refresh</span>
                Reiniciar
              </button>
            </div>
          </div>
        </main>

        {/* Modal común */}
        <GameResultModal
          open={status !== "playing"}
          won={status === "won"}
          score={score}
          elapsedSeconds={elapsedSeconds}
          stars={resultData.stars}
          newBadges={resultData.newBadges}
          onRetry={resetGame}
        />
      </div>
    </AuthenticatedLayout>
  );
}
