export default function PronounceButton({
  text,
  audioUrl = null,
  label = "Escuchar",
  compact = false,
}) {
  const playAudio = (event) => {
    event?.stopPropagation();

    /*
     * Si posteriormente tenemos un MP3/WAV
     * grabado por un hablante, se utiliza primero.
     */
    if (audioUrl) {
      const audio = new Audio(audioUrl);

      audio.play();

      return;
    }

    /*
     * Fallback temporal utilizando
     * síntesis de voz del navegador.
     */
    if (!text || !("speechSynthesis" in window)) {
      return;
    }

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);

    utterance.lang = "es-MX";
    utterance.rate = 0.7;

    window.speechSynthesis.speak(utterance);
  };

  return (
    <button
      type="button"
      onClick={playAudio}
      title={`Escuchar ${text}`}
      className={`
        inline-flex
        items-center
        justify-center
        gap-2
        text-secondary
        hover:text-primary
        transition-colors

        ${
          compact
            ? `
                w-9
                h-9
                rounded-full
                bg-white
                shadow
              `
            : `
                px-4
                py-2
                rounded-full
                bg-secondary-container
                font-semibold
              `
        }
      `}
    >
      <span className="material-symbols-outlined">volume_up</span>

      {!compact && label}
    </button>
  );
}
