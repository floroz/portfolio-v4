import { useEffect } from "react";
import { useGameStore } from "../store/gameStore";

/**
 * Global keyboard shortcuts for the game
 */
export function useKeyboardShortcuts() {
  const { toggleTerminal, closeModal, modalOpen, terminalOpen } =
    useGameStore();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if typing in an input (except for terminal which handles its own)
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return;
      }

      switch (e.key) {
        case "`":
          // Toggle terminal with backtick
          e.preventDefault();
          toggleTerminal();
          break;

        case "Escape":
          // Close modal or terminal
          if (modalOpen) {
            closeModal();
          } else if (terminalOpen) {
            toggleTerminal();
          }
          break;

        case "?":
          // Show help (open terminal if closed)
          if (!terminalOpen && !modalOpen) {
            toggleTerminal();
          }
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [toggleTerminal, closeModal, modalOpen, terminalOpen]);
}
