import { Head, Link } from "@inertiajs/react";
import { useEffect, useState } from "react";

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

const MAX_LIVES = 8;

function shuffle(items) {
  return [...items]
    .map((text, index) => ({
      id: `${index}-${text}`,
      text,
    }))
    .sort(() => Math.random() - 0.5);
}

export default function Puzzle({ puzzles = [] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const [available, setAvailable] = useState([]);

  const [selected, setSelected] = useState([]);

  const [mistakes, setMistakes] = useState(0);

  const [score, setScore] = useState(0);

  const [status, setStatus] = useState("playing");

  const [message, setMessage] = useState("");

  const current = puzzles[currentIndex];

  const lives = Math.max(0, MAX_LIVES - mistakes);

  useEffect(() => {
    if (current) {
      setAvailable(shuffle(current.pieces));

      setSelected([]);
    }
  }, [currentIndex]);

  const addPiece = (piece) => {
    setAvailable((items) => items.filter((item) => item.id !== piece.id));

    setSelected((items) => [...items, piece]);
  };

  const undo = () => {
    if (!selected.length) {
      return;
    }

    const last = selected[selected.length - 1];

    setSelected(selected.slice(0, -1));

    setAvailable((items) => [...items, last]);
  };

  const checkAnswer = () => {
    const answer = selected.map((item) => item.text);

    const correct = JSON.stringify(answer) === JSON.stringify(current.pieces);

    if (correct) {
      setScore((value) => value + 150);

      setMessage("¡Historia ordenada correctamente!");

      setTimeout(() => {
        setMessage("");

        if (currentIndex === puzzles.length - 1) {
          setStatus("won");
        } else {
          setCurrentIndex((value) => value + 1);
        }
      }, 900);

      return;
    }

    setMessage("El orden todavía no es correcto.");

    setMistakes((currentMistakes) => {
      const next = currentMistakes + 1;

      if (next >= MAX_LIVES) {
        setStatus("lost");
      }

      return next;
    });

    setTimeout(() => {
      setMessage("");
      setAvailable(shuffle(current.pieces));

      setSelected([]);
    }, 900);
  };

  return (
    <AuthenticatedLayout>
      <Head title="Rompecabezas - Raíces Vivas" />

      <div className="min-h-screen bg-surface px-5 py-8">
        <div className="max-w-3xl mx-auto">
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

          <div className="flex justify-between bg-white rounded-2xl p-4 my-6 shadow-sm">
            <span>
              ❤️ {lives}/{MAX_LIVES}
            </span>

            <span>
              🧩 {currentIndex + 1}/{puzzles.length}
            </span>

            <span>⭐ {score}</span>
          </div>

          {current && (
            <>
              <section className="bg-white border border-outline-variant rounded-3xl p-6 shadow-sm">
                <div className="text-center mb-6">
                  <span className="text-6xl">{current.emoji}</span>

                  <h2 className="text-xl text-on-surface-variant mt-3">
                    ¿Cómo se dice?
                  </h2>

                  <p className="text-3xl font-bold text-primary mt-1">
                    {current.clue}
                  </p>

                  <p className="text-sm text-on-surface-variant mt-2">
                    Forma la palabra en Náhuatl
                  </p>
                </div>

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

                <h3 className="font-bold mt-7 mb-3">Fragmentos disponibles</h3>

                <div className="flex flex-wrap gap-3">
                  {available.map((piece) => (
                    <button
                      key={piece.id}
                      onClick={() => addPiece(piece)}
                      className="bg-primary-fixed text-primary border-2 border-primary-container px-4 py-3 rounded-xl font-semibold hover:scale-105 transition-transform"
                    >
                      {piece.text}
                    </button>
                  ))}
                </div>

                {message && (
                  <div className="mt-5 bg-surface-container-high rounded-xl p-3 text-center font-semibold">
                    {message}
                  </div>
                )}

                <div className="grid sm:grid-cols-2 gap-3 mt-7">
                  <button
                    onClick={undo}
                    disabled={selected.length === 0}
                    className="border-2 border-primary text-primary py-3 rounded-xl font-bold disabled:opacity-40"
                  >
                    Deshacer último
                  </button>

                  <button
                    onClick={checkAnswer}
                    disabled={selected.length !== current.pieces.length}
                    className="bg-primary text-white py-3 rounded-xl font-bold disabled:opacity-40"
                  >
                    Comprobar
                  </button>
                </div>
              </section>
            </>
          )}

          <div className="text-center mt-7">
            <Link
              href={route("games.index")}
              className="inline-block border-2 border-primary text-primary px-6 py-3 rounded-xl font-bold"
            >
              Volver al catálogo
            </Link>
          </div>
        </div>

        {status !== "playing" && (
          <div className="fixed inset-0 bg-black/40 z-[100] flex items-center justify-center p-5">
            <div className="bg-white rounded-3xl p-8 max-w-md w-full text-center">
              <span className="material-symbols-outlined text-primary text-6xl">
                {status === "won" ? "emoji_events" : "sentiment_dissatisfied"}
              </span>

              <h2 className="text-3xl font-bold mt-3">
                {status === "won"
                  ? "¡Completaste las historias!"
                  : "¡Inténtalo nuevamente!"}
              </h2>

              <p className="mt-3">⭐ {score} puntos</p>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => window.location.reload()}
                  className="flex-1 bg-primary text-white py-3 rounded-xl font-bold"
                >
                  Reiniciar
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
        )}
      </div>
    </AuthenticatedLayout>
  );
}
