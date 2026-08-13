import { Head, Link } from "@inertiajs/react";
import { useEffect, useMemo, useState } from "react";

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

const MAX_LIVES = 8;

function shuffle(items) {
  return [...items].sort(() => Math.random() - 0.5);
}

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);

  return `${String(minutes).padStart(2, "0")}:${String(seconds % 60).padStart(
    2,
    "0",
  )}`;
}

export default function Matching({ pairs = [] }) {
  const spanishItems = useMemo(() => shuffle(pairs), []);

  const nahuatlItems = useMemo(() => shuffle(pairs), []);

  const [selectedSpanish, setSelectedSpanish] = useState(null);

  const [selectedNahuatl, setSelectedNahuatl] = useState(null);

  const [matched, setMatched] = useState([]);
  const [mistakes, setMistakes] = useState(0);
  const [score, setScore] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [status, setStatus] = useState("playing");

  const lives = Math.max(0, MAX_LIVES - mistakes);

  useEffect(() => {
    if (status !== "playing") {
      return;
    }

    const timer = setInterval(() => {
      setSeconds((value) => value + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [status]);

  useEffect(() => {
    if (matched.length === pairs.length && pairs.length > 0) {
      setStatus("won");
    }
  }, [matched, pairs.length]);

  const verify = (spanishId, nahuatlId) => {
    if (spanishId === nahuatlId) {
      setMatched((current) => [...current, spanishId]);

      setScore((current) => current + 100);
    } else {
      setMistakes((current) => {
        const next = current + 1;

        if (next >= MAX_LIVES) {
          setStatus("lost");
        }

        return next;
      });

      setScore((current) => Math.max(0, current - 20));
    }

    setTimeout(() => {
      setSelectedSpanish(null);
      setSelectedNahuatl(null);
    }, 400);
  };

  const chooseSpanish = (pair) => {
    if (matched.includes(pair.id) || status !== "playing") {
      return;
    }

    setSelectedSpanish(pair.id);

    if (selectedNahuatl !== null) {
      verify(pair.id, selectedNahuatl);
    }
  };

  const chooseNahuatl = (pair) => {
    if (matched.includes(pair.id) || status !== "playing") {
      return;
    }

    setSelectedNahuatl(pair.id);

    if (selectedSpanish !== null) {
      verify(selectedSpanish, pair.id);
    }
  };

  return (
    <AuthenticatedLayout>
      <Head title="Relacionar - Raíces Vivas" />

      <div className="min-h-screen bg-surface px-5 py-8">
        <div className="max-w-5xl mx-auto">
          <GameHeader
            title="Relaciona las Palabras"
            lives={lives}
            score={score}
            seconds={seconds}
          />

          <p className="text-center text-on-surface-variant mb-8">
            Selecciona una palabra en español y encuentra su equivalente en
            Náhuatl.
          </p>

          <div className="grid grid-cols-2 gap-5 md:gap-10">
            <section>
              <h2 className="text-center bg-primary-fixed text-primary font-bold rounded-xl py-3 mb-4">
                Español
              </h2>

              <div className="space-y-3">
                {spanishItems.map((pair) => (
                  <button
                    key={pair.id}
                    onClick={() => chooseSpanish(pair)}
                    disabled={matched.includes(pair.id)}
                    className={`
                      w-full
                      p-4
                      rounded-xl
                      border-2
                      text-left
                      font-semibold
                      transition-all

                      ${
                        matched.includes(pair.id)
                          ? "bg-secondary-container border-secondary opacity-60"
                          : selectedSpanish === pair.id
                            ? "bg-primary-fixed border-primary"
                            : "bg-white border-outline-variant hover:border-primary"
                      }
                    `}
                  >
                    <span className="mr-2">{pair.emoji}</span>

                    {pair.spanish}
                  </button>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-center bg-secondary-container text-secondary font-bold rounded-xl py-3 mb-4">
                Náhuatl
              </h2>

              <div className="space-y-3">
                {nahuatlItems.map((pair) => (
                  <button
                    key={pair.id}
                    onClick={() => chooseNahuatl(pair)}
                    disabled={matched.includes(pair.id)}
                    className={`
                      w-full
                      p-4
                      rounded-xl
                      border-2
                      text-left
                      font-semibold
                      transition-all

                      ${
                        matched.includes(pair.id)
                          ? "bg-secondary-container border-secondary opacity-60"
                          : selectedNahuatl === pair.id
                            ? "bg-secondary-fixed border-secondary"
                            : "bg-white border-outline-variant hover:border-secondary"
                      }
                    `}
                  >
                    {pair.nahuatl}
                  </button>
                ))}
              </div>
            </section>
          </div>

          <div className="text-center mt-8">
            <Link
              href={route("games.index")}
              className="inline-flex items-center gap-2 border-2 border-primary text-primary px-6 py-3 rounded-xl font-semibold"
            >
              <span className="material-symbols-outlined">arrow_back</span>
              Volver al catálogo
            </Link>
          </div>
        </div>

        <ResultModal status={status} score={score} seconds={seconds} />
      </div>
    </AuthenticatedLayout>
  );
}

function GameHeader({ title, lives, score, seconds }) {
  return (
    <>
      <h1
        className="text-3xl font-bold text-primary text-center mb-5"
        style={{
          fontFamily: "Bricolage Grotesque",
        }}
      >
        {title}
      </h1>

      <div className="flex justify-between bg-white p-4 rounded-2xl shadow-sm mb-5">
        <span>
          ❤️ {lives}/{MAX_LIVES}
        </span>

        <span>⏱ {formatTime(seconds)}</span>

        <span>⭐ {score}</span>
      </div>
    </>
  );
}

function ResultModal({ status, score, seconds }) {
  if (status === "playing") {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black/40 z-[100] flex items-center justify-center p-5">
      <div className="bg-white rounded-3xl p-8 max-w-md w-full text-center">
        <span className="material-symbols-outlined text-6xl text-primary">
          {status === "won" ? "emoji_events" : "sentiment_dissatisfied"}
        </span>

        <h2 className="text-3xl font-bold mt-3">
          {status === "won" ? "¡Excelente!" : "¡Inténtalo otra vez!"}
        </h2>

        <p className="mt-3">⭐ {score} puntos</p>

        <p>⏱ {formatTime(seconds)}</p>

        <div className="flex gap-3 mt-6">
          <button
            onClick={() => window.location.reload()}
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
