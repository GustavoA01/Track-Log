export const getElapsedMinutes = (elapsedSeconds: number) =>
  Math.max(1, Math.ceil(elapsedSeconds / 60));

export const formatRemainingTime = (totalSeconds: number) => {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
};
