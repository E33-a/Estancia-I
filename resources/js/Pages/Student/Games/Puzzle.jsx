import { Head, Link } from "@inertiajs/react";
import { useEffect, useRef, useState } from "react";

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

import GameStatusBar from "@/Components/Games/GameStatusBar";
import GameResultModal from "@/Components/Games/GameResultModal";
import PronounceButton from "@/Components/Games/PronounceButton";

import useGameTimer from "@/Hooks/useGameTimer";

import { saveGameResult } from "@/Utils/gameResults";

const MAX_LIVES = 8;

/*
|--------------------------------------------------------------------------
| Mezclar fragmentos
|--------------------------------------------------------------------------
*/

function shuffle(items = []) {
  const pieces = items.map((text, index) => ({
    id: `${index}-${text}-${crypto.randomUUID()}`,
    text,
  }));

  for (let i = pieces.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [pieces[i], pieces[j]] = [pieces[j], pieces[i]];
  }

  return pieces;
}

export default function Puzzle({ puzzles = [] }) {
  /*
  |--------------------------------------------------------------------------
  | Estado principal
  |--------------------------------------------------------------------------
  */

  const [currentIndex, setCurrentIndex] = useState(0);

  const [available, setAvailable] = useState([]);

  const [selected, setSelected] = useState([]);

  const [mistakes, setMistakes] = useState(0);

  const [score, setScore] = useState(0);

  const [status, setStatus] = useState("playing");

  const [message, setMessage] = useState("");

  const [locked, setLocked] = useState(false);

  /*
  |--------------------------------------------------------------------------
  | Resultado devuelto por Laravel
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
  | Datos actuales
  |--------------------------------------------------------------------------
  */

  const current = puzzles[currentIndex];

  const lives = Math.max(0, MAX_LIVES - mistakes);

  /*
  |--------------------------------------------------------------------------
  | Cronómetro
  |--------------------------------------------------------------------------
  */

  const { elapsedSeconds, resetTimer } = useGameTimer(status === "playing");

  /*
  |--------------------------------------------------------------------------
  | Preparar los fragmentos
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    if (!current) {
      return;
    }

    setAvailable(shuffle(current.pieces ?? []));

    setSelected([]);
    setMessage("");
    setLocked(false);
  }, [currentIndex, current]);

  /*
  |--------------------------------------------------------------------------
  | Limpieza
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
  | Añadir fragmento
  |--------------------------------------------------------------------------
  */

  const addPiece = (piece) => {
    if (locked || status !== "playing") {
      return;
    }

    setAvailable((items) => items.filter((item) => item.id !== piece.id));

    setSelected((items) => [...items, piece]);
  };

  /*
  |--------------------------------------------------------------------------
  | Deshacer
  |--------------------------------------------------------------------------
  */

  const undo = () => {
    if (locked || status !== "playing" || selected.length === 0) {
      return;
    }

    const last = selected[selected.length - 1];

    setSelected((items) => items.slice(0, -1));

    setAvailable((items) => [...items, last]);
  };

  /*
  |--------------------------------------------------------------------------
  | Comprobar respuesta
  |--------------------------------------------------------------------------
  */

  const checkAnswer = () => {
    if (
      !current ||
      locked ||
      status !== "playing" ||
      selected.length !== current.pieces.length
    ) {
      return;
    }

    const answer = selected.map((item) => item.text);

    const correct = JSON.stringify(answer) === JSON.stringify(current.pieces);

    /*
     * Respuesta correcta
     */
    if (correct) {
      setLocked(true);

      setScore((value) => value + 150);

      setMessage(`¡Correcto! Formaste ${current.answer}.`);

      timeoutRef.current = window.setTimeout(() => {
        setMessage("");

        /*
         * Último rompecabezas.
         */
        if (currentIndex >= puzzles.length - 1) {
          setStatus("won");

          return;
        }

        setCurrentIndex((value) => value + 1);
      }, 1000);

      return;
    }

    /*
     * Respuesta incorrecta
     */
    setMessage("El orden todavía no es correcto.");

    const isLastLife = lives <= 1;

    setMistakes((value) => Math.min(MAX_LIVES, value + 1));

    if (isLastLife) {
      setLocked(true);
      setStatus("lost");

      return;
    }

    setLocked(true);

    timeoutRef.current = window.setTimeout(() => {
      setMessage("");

      setAvailable(shuffle(current.pieces));

      setSelected([]);
      setLocked(false);
    }, 900);
  };

  /*
  |--------------------------------------------------------------------------
  | Reiniciar juego
  |--------------------------------------------------------------------------
  */

  const resetGame = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    setCurrentIndex(0);

    setAvailable(shuffle(puzzles[0]?.pieces ?? []));

    setSelected([]);

    setMistakes(0);
    setScore(0);

    setMessage("");
    setLocked(false);

    /*
     * Reiniciar cronómetro.
     */
    resetTimer();

    setStatus("playing");

    /*
     * Limpiar información del
     * resultado anterior.
     */
    setResultData({
      stars: 0,
      newBadges: [],
    });

    /*
     * Nueva partida.
     */
    resultUuidRef.current = crypto.randomUUID();

    resultSentRef.current = false;
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

          gameKey: "puzzle",

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
        console.error(
          "No se pudo guardar el resultado del Rompecabezas:",
          error,
        );

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
  | Sin rompecabezas
  |--------------------------------------------------------------------------
  */

  if (puzzles.length === 0) {
    return (
      <AuthenticatedLayout>
        <Head title="Rompecabezas - Raíces Vivas" />

        <div className="min-h-screen bg-surface px-5 py-10">
          <div className="max-w-2xl mx-auto bg-white border border-outline-variant rounded-3xl p-10 text-center">
            <span className="material-symbols-outlined text-6xl text-outline">
              extension_off
            </span>

            <h1
              className="text-3xl font-bold mt-4"
              style={{
                fontFamily: "Bricolage Grotesque",
              }}
            >
              Rompecabezas no disponible
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
      <Head title="Rompecabezas - Raíces Vivas" />

      <div className="min-h-screen bg-surface flex flex-col">
        {/* Barra común */}
        <header className="bg-surface-bright border-b border-outline-variant shadow-sm sticky top-[80px] z-40">
          <div className="max-w-3xl mx-auto px-5 py-3">
            <GameStatusBar
              lives={lives}
              maxLives={MAX_LIVES}
              score={score}
              elapsedSeconds={elapsedSeconds}
            />
          </div>
        </header>

        <main className="flex-grow px-5 py-8">
          <div className="max-w-3xl mx-auto">
            {/* Título */}
            <h1
              className="text-3xl md:text-4xl font-bold text-primary text-center"
              style={{
                fontFamily: "Bricolage Grotesque",
              }}
            >
              Rompecabezas de Palabras
            </h1>

            <p className="text-center text-on-surface-variant mt-2">
              Ordena los fragmentos para formar correctamente la palabra en
              Náhuatl.
            </p>

            {/* Progreso */}
            <div className="bg-white border border-outline-variant rounded-2xl p-4 my-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">
                    extension
                  </span>

                  <span className="font-semibold">
                    Palabra {currentIndex + 1} de {puzzles.length}
                  </span>
                </div>

                <span className="font-bold text-secondary">
                  {Math.round(((currentIndex + 1) / puzzles.length) * 100)}%
                </span>
              </div>

              <div className="w-full bg-surface-variant h-2 rounded-full overflow-hidden mt-3">
                <div
                  className="h-full bg-secondary transition-all duration-500"
                  style={{
                    width: `${((currentIndex + 1) / puzzles.length) * 100}%`,
                  }}
                />
              </div>
            </div>

            {current && (
              <section className="bg-white border border-outline-variant rounded-3xl p-6 shadow-sm">
                {/* Pista */}
                <div className="text-center mb-6">
                  <span className="text-6xl">{current.emoji}</span>

                  <h2 className="text-xl text-on-surface-variant mt-3">
                    ¿Cómo se dice?
                  </h2>

                  <p
                    className="text-3xl font-bold text-primary mt-1"
                    style={{
                      fontFamily: "Bricolage Grotesque",
                    }}
                  >
                    {current.clue}
                  </p>

                  <p className="text-sm text-on-surface-variant mt-2">
                    Forma la palabra en Náhuatl.
                  </p>

                  {/* Audio */}
                  <div className="mt-4">
                    <PronounceButton
                      text={current.answer}
                      audioUrl={current.audioUrl ?? null}
                      label="Escuchar pronunciación"
                    />
                  </div>
                </div>

                {/* Zona de respuesta */}
                <div className="min-h-[130px] bg-surface-container rounded-2xl p-4 flex flex-wrap gap-3 content-start">
                  {selected.length === 0 ? (
                    <p className="text-on-surface-variant">
                      Selecciona los fragmentos en el orden correcto.
                    </p>
                  ) : (
                    selected.map((piece, index) => (
                      <span
                        key={piece.id}
                        className="bg-secondary-container border border-secondary px-4 py-3 rounded-xl font-semibold"
                      >
                        {index + 1}. {piece.text}
                      </span>
                    ))
                  )}
                </div>

                {/* Fragmentos */}
                <h3 className="font-bold mt-7 mb-3 flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">
                    widgets
                  </span>
                  Fragmentos disponibles
                </h3>

                <div className="flex flex-wrap gap-3">
                  {available.map((piece) => (
                    <button
                      type="button"
                      key={piece.id}
                      disabled={locked || status !== "playing"}
                      onClick={() => addPiece(piece)}
                      className="bg-primary-fixed text-primary border-2 border-primary-container px-4 py-3 rounded-xl font-semibold hover:scale-105 transition-transform disabled:opacity-50"
                    >
                      {piece.text}
                    </button>
                  ))}
                </div>

                {/* Feedback */}
                {message && (
                  <div
                    className={`
                      mt-5
                      rounded-xl
                      p-3
                      text-center
                      font-semibold

                      ${
                        message.startsWith("¡Correcto!")
                          ? "bg-secondary-container text-secondary"
                          : "bg-error-container text-error"
                      }
                    `}
                  >
                    {message}
                  </div>
                )}

                {/* Acciones */}
                <div className="grid sm:grid-cols-2 gap-3 mt-7">
                  <button
                    type="button"
                    onClick={undo}
                    disabled={
                      locked || selected.length === 0 || status !== "playing"
                    }
                    className="border-2 border-primary text-primary py-3 rounded-xl font-bold hover:bg-primary-fixed transition-colors disabled:opacity-40"
                  >
                    <span className="inline-flex items-center justify-center gap-2">
                      <span className="material-symbols-outlined">undo</span>
                      Deshacer último
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={checkAnswer}
                    disabled={
                      locked ||
                      status !== "playing" ||
                      selected.length !== current.pieces.length
                    }
                    className="bg-primary text-white py-3 rounded-xl font-bold hover:bg-primary-container transition-colors disabled:opacity-40"
                  >
                    <span className="inline-flex items-center justify-center gap-2">
                      <span className="material-symbols-outlined">
                        check_circle
                      </span>
                      Comprobar
                    </span>
                  </button>
                </div>
              </section>
            )}

            {/* Navegación */}
            <div className="flex flex-wrap justify-center gap-3 mt-7">
              <Link
                href={route("games.index")}
                className="inline-flex items-center gap-2 border-2 border-primary text-primary px-6 py-3 rounded-xl font-bold hover:bg-primary-fixed transition-colors"
              >
                <span className="material-symbols-outlined">arrow_back</span>
                Volver al catálogo
              </Link>

              <button
                type="button"
                onClick={resetGame}
                className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-xl font-bold hover:bg-primary-container transition-colors"
              >
                <span className="material-symbols-outlined">refresh</span>
                Reiniciar
              </button>
            </div>
          </div>
        </main>

        {/* Resultado */}
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
