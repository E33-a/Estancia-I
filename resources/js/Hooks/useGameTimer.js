import { useEffect, useState } from "react";

export default function useGameTimer(running = true) {
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  useEffect(() => {
    if (!running) {
      return;
    }

    const timer = window.setInterval(() => {
      setElapsedSeconds((value) => value + 1);
    }, 1000);

    return () => window.clearInterval(timer);
  }, [running]);

  const resetTimer = () => {
    setElapsedSeconds(0);
  };

  return {
    elapsedSeconds,
    resetTimer,
  };
}

export function formatGameTime(seconds) {
  const total = Math.max(0, Math.floor(Number(seconds) || 0));

  const minutes = Math.floor(total / 60);

  const remaining = total % 60;

  return `${String(minutes).padStart(2, "0")}:${String(remaining).padStart(
    2,
    "0",
  )}`;
}
