export async function triggerConfetti(reducedMotion: boolean) {
  if (reducedMotion || typeof window === 'undefined') return;

  try {
    const confettiModule = await import('canvas-confetti');
    const confetti = (confettiModule.default || confettiModule) as any;

    const mainThreadConfetti = confetti.create(undefined, {
      useWorker: false,
      resize: true
    });

    // Fire standard celebratory burst
    mainThreadConfetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#2563eb', '#8b5cf6', '#f59e0b', '#dc2626', '#10b981'],
    });
  } catch (error) {
    console.warn('Failed to load canvas-confetti:', error);
  }
}
