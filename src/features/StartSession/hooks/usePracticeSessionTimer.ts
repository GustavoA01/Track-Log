import { useEffect, useRef, useState } from "react";
import { playTimerEndSound } from "../utils/playTimerEndSound";

export const usePracticeSessionTimer = () => {
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isEndSessionOpen, setIsEndSessionOpen] = useState(false);
  const [sessionDurationSeconds, setSessionDurationSeconds] = useState(0);
  const [remainingSeconds, setRemainingSeconds] = useState(0);
  const remainingSecondsRef = useRef(0);

  const formatRemainingTime = (totalSeconds: number) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  };

  const elapsedSeconds = sessionDurationSeconds - remainingSeconds;

  const getElapsedMinutes = () => Math.max(1, Math.ceil(elapsedSeconds / 60));

  useEffect(() => {
    if (!isTimerActive || isPaused || isEndSessionOpen) return;

    const interval = setInterval(() => {
      const nextRemaining = remainingSecondsRef.current - 1;

      if (nextRemaining <= 0) {
        remainingSecondsRef.current = 0;
        setRemainingSeconds(0);
        setIsTimerActive(false);
        setIsPaused(false);
        setIsEndSessionOpen(true);
        playTimerEndSound();
        return;
      }

      remainingSecondsRef.current = nextRemaining;
      setRemainingSeconds(nextRemaining);
    }, 1000);

    return () => clearInterval(interval);
  }, [isTimerActive, isPaused, isEndSessionOpen]);

  const handleStartSession = (minutes: number) => {
    const totalSeconds = minutes * 60;

    remainingSecondsRef.current = totalSeconds;
    setSessionDurationSeconds(totalSeconds);
    setRemainingSeconds(totalSeconds);
    setIsPaused(false);
    setIsEndSessionOpen(false);
    setIsTimerActive(true);
  };

  const handleRequestStop = () => {
    setIsPaused(true);
    setIsEndSessionOpen(true);
  };

  const handleEndSession = () => {
    remainingSecondsRef.current = 0;
    setIsEndSessionOpen(false);
    setIsTimerActive(false);
    setIsPaused(false);
    setRemainingSeconds(0);
    setSessionDurationSeconds(0);
  };

  const handleTogglePause = () => {
    if (isEndSessionOpen) return;
    setIsPaused((current) => !current);
  };

  const sessionProgress =
    sessionDurationSeconds > 0
      ? (elapsedSeconds / sessionDurationSeconds) * 100
      : 0;

  return {
    handleStartSession,
    handleRequestStop,
    handleEndSession,
    handleTogglePause,
    getElapsedMinutes,
    isTimerActive,
    isPaused,
    isEndSessionOpen,
    remainingTime: formatRemainingTime(remainingSeconds),
    sessionProgress,
  };
};
