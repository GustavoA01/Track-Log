export const playTimerEndSound = () => {
  if (typeof window === "undefined") return;

  try {
    const AudioContextClass =
      window.AudioContext ||
      (window as typeof window & { webkitAudioContext?: typeof AudioContext })
        .webkitAudioContext;

    if (!AudioContextClass) return;

    const context = new AudioContextClass();
    const now = context.currentTime;
    const volume = 3;
    const beepDuration = 0.3;
    const gap = 0.5;
    const times = 3;

    for (let i = 0; i < times; i++) {
      const start = now + i * (beepDuration + gap);
      const oscillator = context.createOscillator();
      const gain = context.createGain();

      oscillator.type = "sine";
      oscillator.frequency.value = 880;

      gain.gain.setValueAtTime(volume, start);
      gain.gain.exponentialRampToValueAtTime(0.001, start + beepDuration);

      oscillator.connect(gain);
      gain.connect(context.destination);

      oscillator.start(start);
      oscillator.stop(start + beepDuration);

      if (i === times - 1) {
        oscillator.onended = () => {
          context.close();
        };
      }
    }
  } catch {
    // Navegador pode bloquear áudio sem interação prévia.
  }
};
