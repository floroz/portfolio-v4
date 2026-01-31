import { useCallback, useRef, useEffect } from "react";
import { useGameStore } from "../store/gameStore";

// Audio context singleton
let audioContext: AudioContext | null = null;

const getAudioContext = (): AudioContext | null => {
  if (typeof window === "undefined") return null;

  if (!audioContext) {
    try {
      audioContext = new (
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext
      )();
    } catch {
      console.warn("Web Audio API not supported");
      return null;
    }
  }
  return audioContext;
};

interface UseDialogSoundReturn {
  /** Play typing blip sound */
  playTypingSound: () => void;
  /** Play selection hover sound */
  playSelectSound: () => void;
  /** Play confirm/enter sound */
  playConfirmSound: () => void;
}

/**
 * Sound effects hook for adventure dialog
 * Uses Web Audio API for low-latency playback
 * Respects user's sound preference from store
 */
export function useDialogSound(): UseDialogSoundReturn {
  const soundEnabled = useGameStore((state) => state.soundEnabled);
  const lastTypeSoundRef = useRef(0);

  // Resume audio context on user interaction
  useEffect(() => {
    const resumeContext = () => {
      const ctx = getAudioContext();
      if (ctx?.state === "suspended") {
        ctx.resume();
      }
    };

    window.addEventListener("click", resumeContext, { once: true });
    window.addEventListener("keydown", resumeContext, { once: true });

    return () => {
      window.removeEventListener("click", resumeContext);
      window.removeEventListener("keydown", resumeContext);
    };
  }, []);

  // Generate a simple beep sound
  const playBeep = useCallback(
    (frequency: number, duration: number, volume: number = 0.1) => {
      if (!soundEnabled) return;

      // Check for prefers-reduced-motion
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
      }

      const ctx = getAudioContext();
      if (!ctx) return;

      try {
        const oscillator = ctx.createOscillator();
        const gainNode = ctx.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(ctx.destination);

        oscillator.type = "square";
        oscillator.frequency.value = frequency;

        // Quick attack and decay for retro feel
        const now = ctx.currentTime;
        gainNode.gain.setValueAtTime(0, now);
        gainNode.gain.linearRampToValueAtTime(volume, now + 0.005);
        gainNode.gain.linearRampToValueAtTime(0, now + duration);

        oscillator.start(now);
        oscillator.stop(now + duration);
      } catch {
        // Ignore audio errors
      }
    },
    [soundEnabled],
  );

  // Typing sound - matches dialogueBlip from reference project
  // Square wave, 440Hz, 0.04s duration, 0.08 volume
  const playTypingSound = useCallback(() => {
    const now = Date.now();
    // Throttle to avoid too many sounds
    if (now - lastTypeSoundRef.current < 30) {
      return;
    }
    lastTypeSoundRef.current = now;

    if (!soundEnabled) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = getAudioContext();
    if (!ctx) return;

    try {
      const currentTime = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.type = "square";
      osc.frequency.setValueAtTime(440, currentTime);

      // Quick attack, quick decay for 8-bit feel
      gain.gain.setValueAtTime(0, currentTime);
      gain.gain.linearRampToValueAtTime(0.08, currentTime + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.001, currentTime + 0.04);

      osc.start(currentTime);
      osc.stop(currentTime + 0.04);
    } catch {
      // Ignore audio errors
    }
  }, [soundEnabled]);

  // Selection sound - slightly lower tone
  const playSelectSound = useCallback(() => {
    playBeep(440, 0.05, 0.08);
  }, [playBeep]);

  // Confirm sound - two-tone beep
  const playConfirmSound = useCallback(() => {
    if (!soundEnabled) return;

    const ctx = getAudioContext();
    if (!ctx) return;

    // Check for prefers-reduced-motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    try {
      const now = ctx.currentTime;

      // First tone
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.connect(gain1);
      gain1.connect(ctx.destination);
      osc1.type = "square";
      osc1.frequency.value = 523; // C5
      gain1.gain.setValueAtTime(0.1, now);
      gain1.gain.linearRampToValueAtTime(0, now + 0.08);
      osc1.start(now);
      osc1.stop(now + 0.08);

      // Second tone (higher)
      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.connect(gain2);
      gain2.connect(ctx.destination);
      osc2.type = "square";
      osc2.frequency.value = 659; // E5
      gain2.gain.setValueAtTime(0.1, now + 0.06);
      gain2.gain.linearRampToValueAtTime(0, now + 0.14);
      osc2.start(now + 0.06);
      osc2.stop(now + 0.14);
    } catch {
      // Ignore audio errors
    }
  }, [soundEnabled]);

  return {
    playTypingSound,
    playSelectSound,
    playConfirmSound,
  };
}
