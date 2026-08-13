import { Head, Link } from "@inertiajs/react";
import { useEffect, useState } from "react";

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

const SIZE = 12;
const MAX_LIVES = 8;

const LETTERS = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ";

function randomLetter() {
  return LETTERS[Math.floor(Math.random() * LETTERS.length)];
}

function buildBoard(words) {
  const board = Array.from({ length: SIZE }, () =>
    Array.from({ length: SIZE }, () => ""),
  );

  const directions = [
    [0, 1],
    [1, 0],
    [1, 1],
    [1, -1],
  ];

  words.forEach((item) => {
    const word = item.word.toUpperCase();

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

function getLine(start, end) {
  const rowDiff = end.row - start.row;

  const colDiff = end.col - start.col;

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

  return Array.from({ length: steps + 1 }, (_, index) => ({
    row: start.row + rowStep * index,

    col: start.col + colStep * index,
  }));
}

function cellKey(row, col) {
  return `${row}-${col}`;
}

export default function WordSearch({ words = [] }) {
  const [board, setBoard] = useState(() => buildBoard(words));

  const [start, setStart] = useState(null);

  const [found, setFound] = useState([]);

  const [foundCells, setFoundCells] = useState([]);

  const [mistakes, setMistakes] = useState(0);

  const [score, setScore] = useState(0);

  const [seconds, setSeconds] = useState(0);

  const [status, setStatus] = useState("playing");

  const lives = Math.max(0, MAX_LIVES - mistakes);

  useEffect(() => {
    if (status !== "playing") {
      return;
    }

    const timer = setInterval(() => setSeconds((value) => value + 1), 1000);

    return () => clearInterval(timer);
  }, [status]);

  useEffect(() => {
    if (words.length > 0 && found.length === words.length) {
      setStatus("won");
    }
  }, [found, words.length]);

  const selectCell = (row, col) => {
    if (status !== "playing") {
      return;
    }

    if (!start) {
      setStart({ row, col });
      return;
    }

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

    const match = words.find(
      (item) =>
        !found.includes(item.id) &&
        (item.word.toUpperCase() === text ||
          item.word.toUpperCase() === reverse),
    );

    if (match) {
      setFound((current) => [...current, match.id]);

      setFoundCells((current) => [
        ...new Set([
          ...current,
          ...path.map((cell) => cellKey(cell.row, cell.col)),
        ]),
      ]);

      setScore((current) => current + 120);
    } else {
      registerMistake();
    }

    setStart(null);
  };

  const registerMistake = () => {
    setMistakes((current) => {
      const next = current + 1;

      if (next >= MAX_LIVES) {
        setStatus("lost");
      }

      return next;
    });
  };

  const resetGame = () => {
    setBoard(buildBoard(words));
    setStart(null);
    setFound([]);
    setFoundCells([]);
    setMistakes(0);
    setScore(0);
    setSeconds(0);
    setStatus("playing");
  };

  return (
    <AuthenticatedLayout>
      <Head title="Sopa de Letras - Raíces Vivas" />

      <div className="min-h-screen bg-surface p-5">
        <div className="max-w-5xl mx-auto">
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

          <div className="flex justify-between bg-white rounded-2xl p-4 my-6 shadow-sm">
            <span>
              ❤️ {lives}/{MAX_LIVES}
            </span>

            <span>
              ⏱ {Math.floor(seconds / 60)}:
              {String(seconds % 60).padStart(2, "0")}
            </span>

            <span>⭐ {score}</span>
          </div>

          <div className="grid lg:grid-cols-[1fr_240px] gap-6">
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
                      key={key}
                      onClick={() => selectCell(rowIndex, colIndex)}
                      className={`
                            aspect-square
                            rounded
                            text-[10px]
                            sm:text-sm
                            md:text-base
                            font-bold

                            ${
                              completed
                                ? "bg-secondary text-white"
                                : selected
                                  ? "bg-tertiary text-white"
                                  : "bg-white text-on-surface hover:bg-surface-container-high"
                            }
                          `}
                    >
                      {letter}
                    </button>
                  );
                }),
              )}
            </div>

            <aside className="bg-white rounded-2xl border border-outline-variant p-5">
              <h2 className="font-bold text-xl mb-4">Palabras</h2>

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

                        ${
                          completed
                            ? "bg-secondary-container border-secondary"
                            : "border-outline-variant"
                        }
                      `}
                    >
                      <p className="font-bold">{item.word}</p>

                      <p className="text-xs text-on-surface-variant">
                        {item.meaning}
                      </p>
                    </div>
                  );
                })}
              </div>
            </aside>
          </div>

          <div className="flex flex-wrap justify-center gap-3 mt-8">
            <Link
              href={route("games.index")}
              className="border-2 border-primary text-primary px-6 py-3 rounded-xl font-bold"
            >
              Volver al catálogo
            </Link>

            <button
              onClick={resetGame}
              className="bg-primary text-white px-6 py-3 rounded-xl font-bold"
            >
              Reiniciar
            </button>
          </div>
        </div>

        {status !== "playing" && (
          <Result status={status} score={score} resetGame={resetGame} />
        )}
      </div>
    </AuthenticatedLayout>
  );
}

function Result({ status, score, resetGame }) {
  return (
    <div className="fixed inset-0 bg-black/40 z-[100] flex items-center justify-center p-5">
      <div className="bg-white rounded-3xl p-8 max-w-md w-full text-center">
        <span className="material-symbols-outlined text-primary text-6xl">
          {status === "won" ? "emoji_events" : "sentiment_dissatisfied"}
        </span>

        <h2 className="text-3xl font-bold mt-3">
          {status === "won" ? "¡Encontraste todas!" : "Se terminaron tus vidas"}
        </h2>

        <p className="mt-3">⭐ {score} puntos</p>

        <div className="flex gap-3 mt-6">
          <button
            onClick={resetGame}
            className="flex-1 bg-primary text-white py-3 rounded-xl font-bold"
          >
            Jugar otra vez
          </button>

          <Link
            href={route("games.index")}
            className="flex-1 border-2 border-primary text-primary py-3 rounded-xl font-bold"
          >
            Catálogo
          </Link>
        </div>
      </div>
    </div>
  );
}
