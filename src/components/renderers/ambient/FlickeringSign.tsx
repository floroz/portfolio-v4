import "./FlickeringSign.css";

interface FlickeringSignProps {
  text?: string;
}

/**
 * Painted wooden sign - diner/motel style
 * Retro hand-painted look, no neon effects
 */
export function FlickeringSign({ text = "ABOUT" }: FlickeringSignProps) {
  return (
    <div className="painted-sign" aria-hidden="true">
      {/* Mounting bracket */}
      <div className="painted-sign__bracket" />

      {/* Wooden sign board */}
      <div className="painted-sign__board">
        {/* Wood grain effect */}
        <div className="painted-sign__grain" />

        {/* Painted text */}
        <div className="painted-sign__text">{text}</div>

        {/* Wear/aging marks */}
        <div className="painted-sign__wear" />
      </div>

      {/* Shadow on wall */}
      <div className="painted-sign__shadow" />
    </div>
  );
}
