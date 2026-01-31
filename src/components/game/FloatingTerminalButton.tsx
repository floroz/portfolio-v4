import { useGameStore } from "../../store/gameStore";
import "./FloatingTerminalButton.css";

/**
 * Floating terminal toggle button - always visible in bottom right
 * Provides quick access to terminal regardless of viewport size
 */
export function FloatingTerminalButton() {
  const { toggleTerminal, terminalOpen, modalOpen } = useGameStore();

  // Hide when terminal or modal is open
  if (terminalOpen || modalOpen) {
    return null;
  }

  return (
    <button
      className="floating-terminal-btn"
      onClick={toggleTerminal}
      aria-label="Open terminal (press ` key)"
      title="Open Terminal (`)"
      type="button"
    >
      <span className="floating-terminal-btn__icon">&gt;_</span>
      <span className="floating-terminal-btn__hint">Press `</span>
    </button>
  );
}
