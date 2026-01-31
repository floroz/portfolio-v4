import { useEffect, useCallback } from "react";
import { DialogPortrait } from "./DialogPortrait";
import { useGameStore } from "../../store/gameStore";
import "./WelcomeScreen.css";

interface WelcomeScreenProps {
  onDismiss: () => void;
}

/**
 * Full-screen welcome intro featuring large portrait
 * Displays once per session, dismisses on any key press or click
 */
export function WelcomeScreen({ onDismiss }: WelcomeScreenProps) {
  const soundEnabled = useGameStore((state) => state.soundEnabled);
  const toggleSound = useGameStore((state) => state.toggleSound);

  // Handle any key press or click to dismiss
  const handleDismiss = useCallback(() => {
    onDismiss();
  }, [onDismiss]);

  // Handle sound toggle without dismissing the screen
  const handleSoundToggle = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      toggleSound();
    },
    [toggleSound],
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Dismiss on any key
      e.preventDefault();
      handleDismiss();
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleDismiss]);

  return (
    <div
      className="welcome-screen"
      onClick={handleDismiss}
      role="button"
      tabIndex={0}
      aria-label="Welcome screen - press any key or click to continue"
    >
      {/* CRT scanline overlay */}
      <div className="welcome-screen__scanlines" aria-hidden="true" />

      {/* Content container */}
      <div className="welcome-screen__content">
        {/* Large portrait with frame */}
        <div className="welcome-screen__portrait-wrapper">
          <DialogPortrait size="large" />
        </div>

        {/* Name and title */}
        <h1 className="welcome-screen__name">DANIELE TORTORA</h1>
        <p className="welcome-screen__title">Senior Software Engineer</p>

        {/* Sound toggle */}
        <div className="welcome-screen__sound-section">
          <button
            className={`welcome-screen__sound-toggle ${soundEnabled ? "welcome-screen__sound-toggle--on" : ""}`}
            onClick={handleSoundToggle}
            aria-pressed={soundEnabled}
            aria-label={soundEnabled ? "Sound enabled" : "Sound disabled"}
          >
            <span className="welcome-screen__sound-icon" aria-hidden="true">
              {soundEnabled ? "🔊" : "🔇"}
            </span>
            <span className="welcome-screen__sound-label">
              SOUND: {soundEnabled ? "ON" : "OFF"}
            </span>
          </button>
          <p className="welcome-screen__sound-hint">
            ★ Enable sound for a better experience ★
          </p>
        </div>

        {/* Press any key prompt */}
        <p className="welcome-screen__prompt">[ Press any key to start ]</p>
      </div>

      {/* Decorative corner elements */}
      <div className="welcome-screen__corner welcome-screen__corner--tl" />
      <div className="welcome-screen__corner welcome-screen__corner--tr" />
      <div className="welcome-screen__corner welcome-screen__corner--bl" />
      <div className="welcome-screen__corner welcome-screen__corner--br" />
    </div>
  );
}
