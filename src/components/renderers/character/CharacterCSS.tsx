import "./CharacterCSS.css";
import danieleStatic from "../../../assets/daniele-static.png";
import danieleMoving from "../../../assets/daniele-moving-1.png";

interface CharacterCSSProps {
  direction?: "left" | "right";
  state?: "idle" | "walking" | "interacting";
}

/**
 * Daniele character using PNG sprite images
 * Uses daniele-static.png for idle, daniele-moving-1.png for walking
 * Flips horizontally when facing left
 */
export function CharacterCSS({
  direction = "right",
  state = "idle",
}: CharacterCSSProps) {
  const isWalking = state === "walking";
  const sprite = isWalking ? danieleMoving : danieleStatic;

  return (
    <div
      className={`character character--${direction} character--${state}`}
      aria-label="Portfolio character"
    >
      <img
        src={sprite}
        alt="Daniele"
        className="character__sprite"
        draggable={false}
      />
    </div>
  );
}
