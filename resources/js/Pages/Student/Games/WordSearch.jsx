import { Head, Link } from "@inertiajs/react";
import { useEffect, useRef, useState } from "react";

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

import GameStatusBar from "@/Components/Games/GameStatusBar";
import GameResultModal from "@/Components/Games/GameResultModal";
import PronounceButton from "@/Components/Games/PronounceButton";

import useGameTimer from "@/Hooks/useGameTimer";

import { saveGameResult } from "@/Utils/gameResults";

const SIZE = 12;
const MAX_LIVES = 8;

const LETTERS = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ";

/*
|--------------------------------------------------------------------------
| Generar una letra aleatoria
|--------------------------------------------------------------------------
*/

function randomLetter() {
  return LETTERS[Math.floor(Math.random() * LETTERS.length)];
}

/*
|--------------------------------------------------------------------------
| Construir tablero
|--------------------------------------------------------------------------
*/

function buildBoard(words = []) {
  const board = Array.from(
    {
      length: SIZE,
    },
    () =>
      Array.from(
        {
          length: SIZE,
        },
        () => "",
      ),
  );

  const directions = [
    [0, 1],
    [1, 0],
    [1, 1],
    [1, -1],
  ];

  words.forEach((item) => {
    const word = String(item.word ?? "").toUpperCase();

    if (!word) {
      return;
    }

    let placed = false;

    for (let attempt = 0; attempt < 500 && !placed; attempt++) {
      const [dr, dc] =
        directions[Math.floor(Math.random() * directions.length)];

      const row = Math.floor(Math.random() * SIZE);

      const col = Math.floor(Math.random() * SIZE);

      const endRow = row + dr * (word.length - 1);

      const endCol = col + dc * (word.length - 1);

      if (endRow < 0 || endRow >= SIZE || endCol < 0 || endCol >= SIZE) {
        continue;
      }

      let valid = true;

      for (let i = 0; i < word.length; i++) {
        const current = board[row + dr * i][col + dc * i];

        if (current && current !== word[i]) {
          valid = false;
          break;
        }
      }

      if (!valid) {
        continue;
      }

      for (let i = 0; i < word.length; i++) {
        board[row + dr * i][col + dc * i] = word[i];
      }

      placed = true;
    }
  });

  return board.map((row) => row.map((cell) => cell || randomLetter()));
}

/*
|--------------------------------------------------------------------------
| Obtener recorrido entre dos celdas
|--------------------------------------------------------------------------
*/

function getLine(start, end) {
  const rowDiff = end.row - start.row;

  const colDiff = end.col - start.col;

  /*
   * Solo permitimos:
   *
   * horizontal
   * vertical
   * diagonal
   */
  if (
    rowDiff !== 0 &&
    colDiff !== 0 &&
    Math.abs(rowDiff) !== Math.abs(colDiff)
  ) {
    return null;
  }

  const rowStep = Math.sign(rowDiff);

  const colStep = Math.sign(colDiff);

  const steps = Math.max(Math.abs(rowDiff), Math.abs(colDiff));

  return Array.from(
    {
      length: steps + 1,
    },
    (_, index) => ({
      row: start.row + rowStep * index,

      col: start.col + colStep * index,
    }),
  );
}

/*
|--------------------------------------------------------------------------
| Clave de celda
|--------------------------------------------------------------------------
*/

function cellKey(row, col) {
  return `${row}-${col}`;
}

export default function WordSearch({ words = [] }) {
  /*
  |--------------------------------------------------------------------------
  | Estado principal
  |--------------------------------------------------------------------------
  */

  const [board, setBoard] = useState(() => buildBoard(words));

  const [start, setStart] = useState(null);

  const [found, setFound] = useState([]);

  const [foundCells, setFoundCells] = useState([]);

  const [mistakes, setMistakes] = useState(0);

  const [score, setScore] = useState(0);

  const [status, setStatus] = useState("playing");

  const [message, setMessage] = useState("");

  /*
  |--------------------------------------------------------------------------
  | Resultado de Laravel
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

  const messageTimeoutRef = useRef(null);

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
  | Actualizar tablero si Laravel manda palabras nuevas
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    setBoard(buildBoard(words));

    setStart(null);
    setFound([]);
    setFoundCells([]);

    setMistakes(0);
    setScore(0);

    setMessage("");

    resetTimer();

    setStatus("playing");

    setResultData({
      stars: 0,
      newBadges: [],
    });

    resultUuidRef.current = crypto.randomUUID();

    resultSentRef.current = false;
  }, [words]);

  /*
  |--------------------------------------------------------------------------
  | Limpiar timeouts
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    return () => {
      if (messageTimeoutRef.current) {
        clearTimeout(messageTimeoutRef.current);
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
      words.length > 0 &&
      found.length === words.length &&
      status === "playing"
    ) {
      /*
       * Bono por vidas
       * conservadas.
       */
      setScore((current) => current + lives * 20);

      setStatus("won");
    }
  }, [found, words.length, lives, status]);

  /*
  |--------------------------------------------------------------------------
  | Registrar error
  |--------------------------------------------------------------------------
  */

  const registerMistake = () => {
    setMessage(
      "Esa selección no corresponde a una palabra. Inténtalo nuevamente.",
    );

    if (messageTimeoutRef.current) {
      clearTimeout(messageTimeoutRef.current);
    }

    messageTimeoutRef.current = window.setTimeout(() => {
      setMessage("");
    }, 1500);

    setMistakes((current) => {
      const next = current + 1;

      if (next >= MAX_LIVES) {
        setStatus("lost");
      }

      return next;
    });
  };

  /*
  |--------------------------------------------------------------------------
  | Seleccionar celda
  |--------------------------------------------------------------------------
  */

  const selectCell = (row, col) => {
    if (status !== "playing") {
      return;
    }

    /*
     * Primera celda.
     */
    if (!start) {
      setStart({
        row,
        col,
      });

      return;
    }

    /*
     * Segunda celda.
     */
    const path = getLine(start, {
      row,
      col,
    });

    if (!path) {
      registerMistake();

      setStart(null);

      return;
    }

    const text = path.map((cell) => board[cell.row][cell.col]).join("");

    const reverse = [...text].reverse().join("");

    const match = words.find((item) => {
      if (found.includes(item.id)) {
        return false;
      }

      const target = String(item.word ?? "").toUpperCase();

      return target === text || target === reverse;
    });

    /*
     * Palabra encontrada.
     */
    if (match) {
      setFound((current) => [...current, match.id]);

      setFoundCells((current) => [
        ...new Set([
          ...current,

          ...path.map((cell) => cellKey(cell.row, cell.col)),
        ]),
      ]);

      setScore((current) => current + 120);

      setMessage(`¡Encontraste ${match.word}! ${match.meaning ?? ""}`);

      if (messageTimeoutRef.current) {
        clearTimeout(messageTimeoutRef.current);
      }

      messageTimeoutRef.current = window.setTimeout(() => {
        setMessage("");
      }, 1800);
    } else {
      registerMistake();
    }

    setStart(null);
  };

  /*
  |--------------------------------------------------------------------------
  | Reiniciar
  |--------------------------------------------------------------------------
  */

  const resetGame = () => {
    if (messageTimeoutRef.current) {
      clearTimeout(messageTimeoutRef.current);
    }

    setBoard(buildBoard(words));

    setStart(null);

    setFound([]);

    setFoundCells([]);

    setMistakes(0);

    setScore(0);

    setMessage("");

    resetTimer();

    setStatus("playing");

    setResultData({
      stars: 0,
      newBadges: [],
    });

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

          gameKey: "wordsearch",

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
          "No se pudo guardar el resultado de Sopa de Letras:",
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
  | Sin palabras
  |--------------------------------------------------------------------------
  */

  if (words.length === 0) {
    return (
      <AuthenticatedLayout>
        <Head title="Sopa de Letras - Raíces Vivas" />

        <div className="min-h-screen bg-surface px-5 py-10">
          <div className="max-w-2xl mx-auto bg-white border border-outline-variant rounded-3xl p-10 text-center">
            <span className="material-symbols-outlined text-6xl text-outline">
              search_off
            </span>

            <h1
              className="text-3xl font-bold mt-4"
              style={{
                fontFamily: "Bricolage Grotesque",
              }}
            >
              Sopa de Letras no disponible
            </h1>

            <p className="text-on-surface-variant mt-2">
              No hay palabras disponibles para crear esta partida.
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
      <Head title="Sopa de Letras - Raíces Vivas" />

      <div className="min-h-screen bg-surface flex flex-col">
        {/* Barra común */}
        <header className="bg-surface-bright border-b border-outline-variant shadow-sm sticky top-[80px] z-40">
          <div className="max-w-5xl mx-auto px-5 py-3">
            <GameStatusBar
              lives={lives}
              maxLives={MAX_LIVES}
              score={score}
              elapsedSeconds={elapsedSeconds}
            />
          </div>
        </header>

        <main className="flex-grow p-5">
          <div className="max-w-5xl mx-auto">
            {/* Título */}
            <h1
              className="text-3xl md:text-4xl font-bold text-primary text-center"
              style={{
                fontFamily: "Bricolage Grotesque",
              }}
            >
              Sopa de Letras
            </h1>

            <p className="text-center text-on-surface-variant mt-2">
              Haz clic en la primera y última letra de una palabra.
            </p>

            {/* Progreso */}
            <div className="max-w-xl mx-auto bg-white border border-outline-variant rounded-2xl p-4 my-6 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="font-semibold">Palabras encontradas</span>

                <span className="font-bold text-secondary">
                  {found.length}/{words.length}
                </span>
              </div>

              <div className="w-full bg-surface-variant h-2 rounded-full overflow-hidden mt-3">
                <div
                  className="h-full bg-secondary transition-all duration-500"
                  style={{
                    width: `${
                      words.length > 0 ? (found.length / words.length) * 100 : 0
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
                  message.startsWith("¡Encontraste")
                    ? "bg-secondary-container text-secondary"
                    : "bg-error-container text-error"
                }
              `}
            >
              {message || "Mensaje"}
            </div>

            <div className="grid lg:grid-cols-[1fr_260px] gap-6">
              {/* Tablero */}
              <div
                className="grid gap-1 bg-primary-fixed p-3 rounded-2xl shadow-md"
                style={{
                  gridTemplateColumns: `repeat(${SIZE}, minmax(0, 1fr))`,
                }}
              >
                {board.map((row, rowIndex) =>
                  row.map((letter, colIndex) => {
                    const key = cellKey(rowIndex, colIndex);

                    const selected =
                      start?.row === rowIndex && start?.col === colIndex;

                    const completed = foundCells.includes(key);

                    return (
                      <button
                        type="button"
                        key={key}
                        disabled={status !== "playing"}
                        onClick={() => selectCell(rowIndex, colIndex)}
                        className={`
                              aspect-square
                              rounded
                              text-[10px]
                              sm:text-sm
                              md:text-base
                              font-bold
                              transition-all
                              disabled:cursor-default

                              ${
                                completed
                                  ? "bg-secondary text-white"
                                  : selected
                                    ? "bg-tertiary text-white scale-110"
                                    : "bg-white text-on-surface hover:bg-surface-container-high hover:scale-105"
                              }
                            `}
                      >
                        {letter}
                      </button>
                    );
                  }),
                )}
              </div>

              {/* Lista de palabras */}
              <aside className="bg-white rounded-2xl border border-outline-variant p-5 shadow-sm">
                <h2
                  className="font-bold text-xl mb-1"
                  style={{
                    fontFamily: "Bricolage Grotesque",
                  }}
                >
                  Palabras
                </h2>

                <p className="text-xs text-on-surface-variant mb-4">
                  Encuentra las palabras en Náhuatl.
                </p>

                <div className="space-y-3">
                  {words.map((item) => {
                    const completed = found.includes(item.id);

                    return (
                      <div
                        key={item.id}
                        className={`
                            p-3
                            rounded-xl
                            border
                            transition-all

                            ${
                              completed
                                ? "bg-secondary-container border-secondary opacity-70"
                                : "bg-white border-outline-variant"
                            }
                          `}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <p
                            className={`
                                font-bold
                                break-words

                                ${completed ? "line-through" : ""}
                              `}
                          >
                            {item.word}
                          </p>

                          {!completed && (
                            <PronounceButton
                              text={item.word}
                              audioUrl={item.audioUrl ?? null}
                              compact
                            />
                          )}
                        </div>

                        <p className="text-xs text-on-surface-variant mt-1">
                          {item.meaning}
                        </p>

                        {completed && (
                          <div className="flex items-center gap-1 text-secondary text-xs font-bold mt-2">
                            <span className="material-symbols-outlined text-base">
                              check_circle
                            </span>
                            Encontrada
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </aside>
            </div>

            {/* Controles */}
            <div className="flex flex-wrap justify-center gap-3 mt-8">
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
