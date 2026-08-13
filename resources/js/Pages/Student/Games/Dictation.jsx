import { Head, Link } from "@inertiajs/react";
import { useEffect, useMemo, useState } from "react";

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

const MAX_LIVES = 8;

function shuffle(items) {
  return [...items].sort(() => Math.random() - 0.5);
}

function normalize(text) {
  return text
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

export default function Dictation({ words = [] }) {
  const orderedWords = useMemo(() => shuffle(words), []);

  const [currentIndex, setCurrentIndex] = useState(0);

  const [answer, setAnswer] = useState("");

  const [mistakes, setMistakes] = useState(0);

  const [score, setScore] = useState(0);

  const [status, setStatus] = useState("playing");

  const [message, setMessage] = useState("");

  const [showHint, setShowHint] = useState(false);

  const current = orderedWords[currentIndex];

  const lives = Math.max(0, MAX_LIVES - mistakes);

  const speak = () => {
    if (!current || !("speechSynthesis" in window)) {
      return;
      // Si existe audio real grabado,
      // usarlo primero.
      if (current.audioUrl) {
        const audio = new Audio(current.audioUrl);

        audio.play();

        return;
      }

      // Fallback temporal mientras no haya
      // grabación de pronunciación.
      if (!("speechSynthesis" in window)) {
        return;
      }

      window.speechSynthesis.cancel();

      const voice = new SpeechSynthesisUtterance(current.nahuatl);

      voice.lang = "es-MX";
      voice.rate = 0.7;

      window.speechSynthesis.speak(voice);
    }

    window.speechSynthesis.cancel();

    const voice = new SpeechSynthesisUtterance(current.nahuatl);

    voice.lang = "es-MX";
    voice.rate = 0.7;

    window.speechSynthesis.speak(voice);
  };

  useEffect(() => {
    return () => {
      if ("speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const nextWord = () => {
    setAnswer("");
    setMessage("");
    setShowHint(false);

    if (currentIndex === orderedWords.length - 1) {
      setStatus("won");
    } else {
      setCurrentIndex((value) => value + 1);
    }
  };

  const check = () => {
    if (!answer.trim()) {
      return;
    }

    if (normalize(answer) === normalize(current.nahuatl)) {
      setScore((value) => value + 100);

      setMessage(`¡Correcto! ${current.nahuatl} significa ${current.spanish}.`);

      setTimeout(nextWord, 1000);

      return;
    }

    setMessage("No es correcto. Escucha nuevamente e inténtalo.");

    setMistakes((value) => {
      const next = value + 1;

      if (next >= MAX_LIVES) {
        setStatus("lost");
      }

      return next;
    });
  };

  return (
    <AuthenticatedLayout>
      <Head title="Dictado - Raíces Vivas" />

      <div className="min-h-screen bg-surface px-5 py-8">
        <div className="max-w-2xl mx-auto">
          <h1
            className="text-4xl font-bold text-primary text-center"
            style={{
              fontFamily: "Bricolage Grotesque",
            }}
          >
            Dictado Digital
          </h1>

          <p className="text-center text-on-surface-variant mt-2">
            Escucha la palabra y escríbela correctamente.
          </p>

          <div className="flex justify-between bg-white rounded-2xl p-4 my-6">
            <span>
              ❤️ {lives}/{MAX_LIVES}
            </span>

            <span>
              🎤 {currentIndex + 1}/{orderedWords.length}
            </span>

            <span>⭐ {score}</span>
          </div>

          {current && (
            <section className="bg-white rounded-3xl border border-outline-variant p-8 text-center shadow-sm">
              <div className="w-28 h-28 rounded-full bg-primary-fixed mx-auto flex items-center justify-center">
                <button
                  onClick={speak}
                  className="w-20 h-20 bg-primary text-white rounded-full flex items-center justify-center hover:scale-105 transition-transform"
                >
                  <span className="material-symbols-outlined text-5xl">
                    volume_up
                  </span>
                </button>
              </div>

              <p className="mt-4 text-on-surface-variant">
                Pulsa el botón para escuchar la palabra.
              </p>

              {showHint && (
                <div className="bg-tertiary-fixed rounded-xl p-4 mt-5">
                  <p className="font-semibold">Pista</p>

                  <p>
                    Significa: <strong>{current.spanish}</strong>
                  </p>

                  <p className="text-sm">
                    Empieza con: <strong>{current.nahuatl[0]}</strong>
                  </p>
                </div>
              )}

              <input
                value={answer}
                onChange={(event) => setAnswer(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    check();
                  }
                }}
                placeholder="Escribe lo que escuchaste..."
                className="w-full mt-7 rounded-xl border-2 border-outline-variant px-5 py-4 text-center text-xl focus:border-primary focus:ring-0"
              />

              {message && (
                <p className="mt-4 font-semibold text-primary">{message}</p>
              )}

              <div className="grid sm:grid-cols-2 gap-3 mt-6">
                <button
                  onClick={() => setShowHint(true)}
                  className="border-2 border-secondary text-secondary rounded-xl py-3 font-bold"
                >
                  Mostrar pista
                </button>

                <button
                  onClick={check}
                  className="bg-primary text-white rounded-xl py-3 font-bold"
                >
                  Comprobar
                </button>
              </div>
            </section>
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
                  ? "¡Terminaste el dictado!"
                  : "Se terminaron tus vidas"}
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
