import "./LobbyBackground.css";

/**
 * Lobby background - Flat 2D approach
 * Single back wall with color zones, flat floor
 * Depth achieved through shadows and layering, not geometry
 */
export function LobbyBackground() {
  return (
    <div className="lobby" aria-hidden="true">
      {/* Ceiling with beam */}
      <div className="lobby__ceiling">
        <div className="lobby__ceiling-beam" />
      </div>

      {/* Back wall - three color zones */}
      <div className="lobby__wall">
        <div className="lobby__wall-zone lobby__wall-zone--left" />
        <div className="lobby__wall-zone lobby__wall-zone--center">
          <div className="lobby__banner">
            <span>WELCOME TO MY PORTFOLIO</span>
          </div>
        </div>
        <div className="lobby__wall-zone lobby__wall-zone--right" />
      </div>

      {/* Baseboard - simple horizontal strip */}
      <div className="lobby__baseboard" />

      {/* Floor - flat checkered pattern */}
      <div className="lobby__floor" />
    </div>
  );
}
