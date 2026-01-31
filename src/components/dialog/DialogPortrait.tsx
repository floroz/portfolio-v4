import retroDaniele from "../../assets/retro-daniele.png";
import "./DialogPortrait.css";

interface DialogPortraitProps {
  /** Size variant for different contexts */
  size?: "small" | "medium" | "large";
  /** Optional additional class name */
  className?: string;
}

/**
 * Reusable portrait component displaying the retro pixel art portrait
 * Used in WelcomeScreen and AdventureDialog
 */
export function DialogPortrait({
  size = "medium",
  className = "",
}: DialogPortraitProps) {
  return (
    <div className={`dialog-portrait dialog-portrait--${size} ${className}`}>
      <div className="dialog-portrait__frame">
        <img
          src={retroDaniele}
          alt="Daniele - Pixel art portrait"
          className="dialog-portrait__image"
          draggable={false}
        />
      </div>
    </div>
  );
}
