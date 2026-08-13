import { Head, Link } from "@inertiajs/react";
import axios from "axios";
import { useEffect, useRef, useState } from "react";

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function Reader({ story, progress }) {
  const totalChapters = story.chapters.length;

  const initialChapter = Math.max(
    0,
    Math.min((progress?.lastChapter ?? 1) - 1, totalChapters - 1),
  );

  const [chapterIndex, setChapterIndex] = useState(initialChapter);

  const [mode, setMode] = useState("bilingual");

  const [showDictionary, setShowDictionary] = useState(false);

  const [showCompletion, setShowCompletion] = useState(
    progress?.completed ?? false,
  );

  const [playing, setPlaying] = useState(false);

  const [speed, setSpeed] = useState(1);

  const audioRef = useRef(null);

  const chapter = story.chapters[chapterIndex];

  const progressPercentage =
    totalChapters > 0
      ? Math.round(((chapterIndex + 1) / totalChapters) * 100)
      : 0;

  const stopNarration = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }

    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }

    setPlaying(false);
  };

  useEffect(() => {
    return () => {
      stopNarration();
    };
  }, []);

  useEffect(() => {
    stopNarration();
  }, [chapterIndex]);

  const saveProgress = async (chapterNumber, completed = false) => {
    try {
      await axios.post(route("stories.progress", story.slug), {
        chapter_number: chapterNumber,

        completed,
      });
    } catch (error) {
      console.error("No se pudo guardar el progreso", error);
    }
  };

  const goToChapter = (index) => {
    if (index < 0 || index >= totalChapters) {
      return;
    }

    setChapterIndex(index);

    saveProgress(index + 1);
  };

  const finishStory = () => {
    saveProgress(totalChapters, true);

    setShowCompletion(true);
  };

  const nextChapter = () => {
    if (chapterIndex === totalChapters - 1) {
      finishStory();

      return;
    }

    goToChapter(chapterIndex + 1);
  };

  const previousChapter = () => {
    goToChapter(chapterIndex - 1);
  };

  const playNarration = () => {
    if (playing) {
      stopNarration();
      return;
    }

    /*
     * Si el CMS tiene un audio MP3/WAV
     * real, tendrá prioridad.
     */
    if (chapter.audioUrl) {
      const audio = new Audio(chapter.audioUrl);

      audio.playbackRate = speed;

      audio.onended = () => {
        setPlaying(false);
      };

      audioRef.current = audio;

      audio.play();

      setPlaying(true);

      return;
    }

    /*
     * Fallback temporal:
     * síntesis del navegador.
     */
    if (!("speechSynthesis" in window)) {
      return;
    }

    let text = chapter.spanishText;

    if (mode === "target" && chapter.targetText) {
      text = chapter.targetText;
    }

    const utterance = new SpeechSynthesisUtterance(text);

    utterance.lang = mode === "target" ? "es-MX" : "es-MX";

    utterance.rate = speed;

    utterance.onend = () => {
      setPlaying(false);
    };

    window.speechSynthesis.speak(utterance);

    setPlaying(true);
  };

  if (!chapter) {
    return null;
  }

  return (
    <AuthenticatedLayout>
      <Head title={`${story.title} - Raíces Vivas`} />

      <style>{`
        .reader-pattern {
          background-image:
            radial-gradient(
              circle at 2px 2px,
              rgba(154, 64, 40, 0.05) 1px,
              transparent 0
            );

          background-size: 24px 24px;
        }

        .reader-shadow {
          box-shadow:
            0 10px 30px -10px
            rgba(154, 64, 40, 0.15);
        }

        .story-serif {
          font-family:
            Georgia,
            "Times New Roman",
            serif;
        }
      `}</style>

      <div className="min-h-screen bg-surface reader-pattern pb-40">
        {/* Barra del lector */}
        <header className="sticky top-[80px] z-40 bg-surface/95 backdrop-blur-md border-b border-outline-variant shadow-sm">
          <div className="max-w-7xl mx-auto px-5 md:px-10 py-3 grid grid-cols-[auto_1fr_auto] items-center gap-4">
            <Link
              href={route("stories.index")}
              className="flex items-center gap-2 text-primary font-semibold hover:bg-primary-fixed px-3 py-2 rounded-xl transition-colors"
            >
              <span className="material-symbols-outlined">arrow_back</span>

              <span className="hidden md:inline">Catálogo</span>
            </Link>

            <div className="text-center">
              <h1
                className="font-bold text-primary text-lg md:text-2xl"
                style={{
                  fontFamily: "Bricolage Grotesque",
                }}
              >
                {story.title}
              </h1>

              <p className="text-xs text-outline uppercase tracking-wider">
                Capítulo {chapterIndex + 1} de {totalChapters}
              </p>
            </div>

            <div className="hidden sm:block w-28">
              <p className="text-xs font-bold text-secondary text-right">
                {progressPercentage}%
              </p>

              <div className="h-2 bg-surface-variant rounded-full overflow-hidden mt-1">
                <div
                  className="h-full bg-secondary transition-all duration-500"
                  style={{
                    width: `${progressPercentage}%`,
                  }}
                />
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-5 md:px-10 py-8">
          <div className="grid lg:grid-cols-[70px_1fr_70px] gap-6 items-center">
            {/* Anterior desktop */}
            <div className="hidden lg:flex justify-center">
              <button
                type="button"
                onClick={previousChapter}
                disabled={chapterIndex === 0}
                className="w-14 h-14 rounded-full bg-white border border-outline-variant text-primary flex items-center justify-center shadow-lg disabled:opacity-30"
              >
                <span className="material-symbols-outlined text-3xl">
                  chevron_left
                </span>
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Ilustración */}
              <section className="rounded-3xl overflow-hidden reader-shadow border-4 border-white min-h-[420px]">
                {chapter.image ? (
                  <img
                    src={chapter.image}
                    alt={story.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full min-h-[420px] bg-gradient-to-br from-primary-fixed via-surface-container-high to-secondary-container flex flex-col items-center justify-center p-8 text-center">
                    <div className="text-8xl md:text-9xl">
                      {story.coverEmoji ?? "📖"}
                    </div>

                    <h2
                      className="text-3xl font-bold text-primary mt-6"
                      style={{
                        fontFamily: "Bricolage Grotesque",
                      }}
                    >
                      {chapter.title}
                    </h2>

                    <p className="text-on-surface-variant mt-3">
                      {story.category} · {story.language}
                    </p>
                  </div>
                )}
              </section>

              {/* Texto */}
              <section className="bg-white rounded-3xl border border-outline-variant reader-shadow p-6 md:p-8 max-h-[620px] overflow-y-auto">
                {/* Modos */}
                <div className="flex flex-wrap gap-2 bg-surface-variant p-1 rounded-xl mb-7">
                  <button
                    type="button"
                    onClick={() => setMode("bilingual")}
                    className={`px-4 py-2 rounded-lg font-semibold ${
                      mode === "bilingual"
                        ? "bg-primary text-white shadow"
                        : "text-on-surface-variant"
                    }`}
                  >
                    Bilingüe
                  </button>

                  <button
                    type="button"
                    onClick={() => setMode("target")}
                    className={`px-4 py-2 rounded-lg font-semibold ${
                      mode === "target"
                        ? "bg-primary text-white shadow"
                        : "text-on-surface-variant"
                    }`}
                  >
                    Sólo {story.language}
                  </button>

                  <button
                    type="button"
                    onClick={() => setMode("spanish")}
                    className={`px-4 py-2 rounded-lg font-semibold ${
                      mode === "spanish"
                        ? "bg-primary text-white shadow"
                        : "text-on-surface-variant"
                    }`}
                  >
                    Sólo Español
                  </button>
                </div>

                <h2
                  className="text-2xl font-bold text-on-surface mb-6"
                  style={{
                    fontFamily: "Bricolage Grotesque",
                  }}
                >
                  {chapter.title}
                </h2>

                <div className="story-serif space-y-8">
                  {/* Idioma objetivo */}
                  {(mode === "bilingual" || mode === "target") && (
                    <section>
                      <span className="inline-block bg-secondary-container text-on-secondary-container px-3 py-1 rounded text-xs font-bold uppercase tracking-wider mb-4">
                        {story.language}
                      </span>

                      {chapter.targetText ? (
                        <p className="text-xl md:text-2xl leading-relaxed italic font-semibold">
                          {chapter.targetText}
                        </p>
                      ) : (
                        <div className="bg-surface-container-low rounded-2xl p-4">
                          <p className="text-sm text-on-surface-variant mb-3">
                            La traducción completa de este capítulo está
                            pendiente de validación lingüística. Mientras tanto,
                            practica este vocabulario:
                          </p>

                          <div className="flex flex-wrap gap-2">
                            {chapter.vocabulary.map((word, index) => (
                              <span
                                key={index}
                                className="bg-secondary-container text-on-secondary-container px-3 py-2 rounded-xl font-semibold"
                              >
                                {word.target}
                                {" = "}
                                {word.spanish}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </section>
                  )}

                  {mode === "bilingual" && (
                    <div className="flex items-center gap-4">
                      <div className="h-px bg-outline-variant flex-grow" />

                      <span className="material-symbols-outlined text-primary/40">
                        eco
                      </span>

                      <div className="h-px bg-outline-variant flex-grow" />
                    </div>
                  )}

                  {/* Español */}
                  {(mode === "bilingual" || mode === "spanish") && (
                    <section>
                      <span className="inline-block bg-primary-fixed text-on-primary-fixed-variant px-3 py-1 rounded text-xs font-bold uppercase tracking-wider mb-4">
                        Español
                      </span>

                      <p className="text-lg md:text-xl leading-relaxed text-on-surface-variant">
                        {chapter.spanishText}
                      </p>
                    </section>
                  )}
                </div>

                {/* Diccionario */}
                {showDictionary && (
                  <div className="mt-8 pt-6 border-t border-outline-variant">
                    <h3 className="font-bold text-primary flex items-center gap-2 mb-4">
                      <span className="material-symbols-outlined">
                        translate
                      </span>
                      Diccionario del capítulo
                    </h3>

                    <div className="grid sm:grid-cols-2 gap-3">
                      {chapter.vocabulary.map((word, index) => (
                        <div
                          key={index}
                          className="bg-surface-container p-3 rounded-xl"
                        >
                          <p className="font-bold text-secondary">
                            {word.target}
                          </p>

                          <p className="text-sm text-on-surface-variant">
                            {word.spanish}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </section>
            </div>

            {/* Siguiente desktop */}
            <div className="hidden lg:flex justify-center">
              <button
                type="button"
                onClick={nextChapter}
                className="w-14 h-14 rounded-full bg-primary text-white flex items-center justify-center shadow-lg hover:bg-primary-container"
              >
                <span className="material-symbols-outlined text-3xl">
                  {chapterIndex === totalChapters - 1
                    ? "check"
                    : "chevron_right"}
                </span>
              </button>
            </div>
          </div>

          {/* Navegación móvil */}
          <div className="lg:hidden flex justify-between gap-3 mt-8">
            <button
              type="button"
              onClick={previousChapter}
              disabled={chapterIndex === 0}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl border-2 border-primary text-primary font-bold disabled:opacity-30"
            >
              <span className="material-symbols-outlined">chevron_left</span>
              Anterior
            </button>

            <button
              type="button"
              onClick={nextChapter}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-primary text-white font-bold"
            >
              {chapterIndex === totalChapters - 1 ? "Terminar" : "Siguiente"}

              <span className="material-symbols-outlined">
                {chapterIndex === totalChapters - 1 ? "check" : "chevron_right"}
              </span>
            </button>
          </div>
        </main>

        {/* Controles multimedia */}
        <div className="fixed bottom-5 left-1/2 -translate-x-1/2 w-[92%] max-w-4xl bg-white/95 backdrop-blur-xl border-2 border-primary/20 rounded-2xl shadow-2xl p-4 z-50">
          <div className="flex flex-col md:flex-row items-center gap-5">
            <div className="flex items-center gap-3 flex-1 w-full">
              <button
                type="button"
                onClick={playNarration}
                className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center"
              >
                <span className="material-symbols-outlined text-3xl">
                  {playing ? "pause" : "play_arrow"}
                </span>
              </button>

              <div>
                <p className="text-xs uppercase font-bold text-outline">
                  Narración
                </p>

                <p className="text-sm text-on-surface-variant">
                  {playing ? "Reproduciendo..." : "Escuchar capítulo"}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-around gap-5 w-full md:w-auto">
              <div className="flex items-center gap-1">
                <span className="material-symbols-outlined">speed</span>

                <select
                  value={speed}
                  onChange={(event) => setSpeed(Number(event.target.value))}
                  className="border-none bg-transparent focus:ring-0"
                >
                  <option value={0.5}>0.5x</option>

                  <option value={1}>1.0x</option>

                  <option value={1.5}>1.5x</option>

                  <option value={2}>2.0x</option>
                </select>
              </div>

              <button
                type="button"
                onClick={() => setShowDictionary((value) => !value)}
                className={`flex flex-col items-center text-xs ${
                  showDictionary ? "text-primary" : "text-on-surface-variant"
                }`}
              >
                <span className="material-symbols-outlined">translate</span>
                Diccionario
              </button>
            </div>
          </div>
        </div>

        {/* Completado */}
        {showCompletion && (
          <div className="fixed inset-0 z-[120] bg-black/50 backdrop-blur-sm flex items-center justify-center p-5">
            <div className="bg-white rounded-3xl max-w-lg w-full p-8 text-center border-4 border-secondary-container shadow-2xl">
              <div className="w-24 h-24 bg-secondary-container text-secondary rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="material-symbols-outlined text-6xl">
                  auto_awesome
                </span>
              </div>

              <h2
                className="text-3xl font-bold mb-3"
                style={{
                  fontFamily: "Bricolage Grotesque",
                }}
              >
                ¡Felicidades!
              </h2>

              <p className="text-on-surface-variant mb-7">
                Terminaste de leer <strong>{story.title}</strong>.
              </p>

              <div className="grid sm:grid-cols-2 gap-3">
                <Link
                  href={route("games.memory")}
                  className="bg-secondary text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-outlined">style</span>
                  Jugar Memorama
                </Link>

                <Link
                  href={route("stories.index")}
                  className="bg-primary text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-outlined">
                    auto_stories
                  </span>
                  Más cuentos
                </Link>
              </div>

              <button
                type="button"
                onClick={() => setShowCompletion(false)}
                className="mt-5 text-outline hover:text-primary font-semibold"
              >
                Cerrar
              </button>
            </div>
          </div>
        )}
      </div>
    </AuthenticatedLayout>
  );
}
