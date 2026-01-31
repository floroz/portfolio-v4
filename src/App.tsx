import "./App.css";
import { GameCanvas } from "./components/game/GameCanvas";
import { Scene } from "./components/game/Scene";
import { Toolbar } from "./components/toolbar/Toolbar";
import { ContentModal } from "./components/game/ContentModal";
import { RetroTerminal } from "./components/game/RetroTerminal";
import { FloatingTerminalButton } from "./components/game/FloatingTerminalButton";
import { WelcomeScreen } from "./components/dialog/WelcomeScreen";
import { AdventureDialog } from "./components/dialog/AdventureDialog";
import { useGameStore } from "./store/gameStore";
import { useKeyboardShortcuts } from "./hooks/useKeyboardShortcuts";

/**
 * Day of the Tentacle inspired portfolio
 * Interactive point-and-click adventure game UI
 */
function App() {
  // Global keyboard shortcuts
  useKeyboardShortcuts();

  const {
    modalOpen,
    activeAction,
    closeModal,
    terminalOpen,
    closeTerminal,
    welcomeShown,
    dismissWelcome,
    dialogOpen,
    closeDialog,
    openDialog,
  } = useGameStore();

  return (
    <div className="app">
      <GameCanvas>
        {/* Scene area - 640x320 */}
        <div className="game-canvas__scene">
          <Scene />
        </div>

        {/* Toolbar area - 640x80 */}
        <div className="game-canvas__toolbar">
          <Toolbar />
        </div>
      </GameCanvas>

      {/* Floating terminal button - always visible */}
      <FloatingTerminalButton />

      {/* Content modal overlay */}
      <ContentModal
        isOpen={modalOpen}
        action={activeAction}
        onClose={closeModal}
      />

      {/* Retro terminal overlay */}
      <RetroTerminal isOpen={terminalOpen} onClose={closeTerminal} />

      {/* Adventure dialog overlay */}
      <AdventureDialog isOpen={dialogOpen} onClose={closeDialog} />

      {/* Welcome screen - shown once per session */}
      {!welcomeShown && (
        <WelcomeScreen
          onDismiss={() => {
            dismissWelcome();
            // Optionally open welcome dialog after dismissing welcome screen
            openDialog("welcome");
          }}
        />
      )}
    </div>
  );
}

export default App;
