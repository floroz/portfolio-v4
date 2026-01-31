import "./CharacterCSS.css";

interface CharacterCSSProps {
  direction?: "left" | "right";
  state?: "idle" | "walking" | "interacting";
}

/**
 * Daniele-style character rendered entirely in CSS
 * Pixel art aesthetic with friendly smile, navy sweater (matches retro-daniele.png)
 */
export function CharacterCSS({
  direction = "right",
  state = "idle",
}: CharacterCSSProps) {
  return (
    <div
      className={`character character--${direction} character--${state}`}
      aria-label="Portfolio character"
    >
      {/* Head */}
      <div className="character__head">
        {/* Hair */}
        <div className="character__hair" />

        {/* Face */}
        <div className="character__face">
          {/* Eyebrows */}
          <div className="character__eyebrows">
            <div className="character__eyebrow character__eyebrow--left" />
            <div className="character__eyebrow character__eyebrow--right" />
          </div>

          {/* Eyes */}
          <div className="character__eyes">
            <div className="character__eye character__eye--left" />
            <div className="character__eye character__eye--right" />
          </div>

          {/* Nose */}
          <div className="character__nose" />

          {/* Stubble */}
          <div className="character__stubble" />

          {/* Smile */}
          <div className="character__mouth" />
        </div>

        {/* Ears */}
        <div className="character__ear character__ear--left" />
        <div className="character__ear character__ear--right" />
      </div>

      {/* Body */}
      <div className="character__body">
        {/* Neck */}
        <div className="character__neck" />

        {/* Sweater collar (crew neck) */}
        <div className="character__collar" />

        {/* Torso/Sweater */}
        <div className="character__torso" />

        {/* Arms */}
        <div className="character__arm character__arm--left" />
        <div className="character__arm character__arm--right" />

        {/* Hands */}
        <div className="character__hand character__hand--left" />
        <div className="character__hand character__hand--right" />
      </div>

      {/* Legs */}
      <div className="character__legs">
        <div className="character__leg character__leg--left" />
        <div className="character__leg character__leg--right" />
      </div>

      {/* Feet */}
      <div className="character__feet">
        <div className="character__foot character__foot--left" />
        <div className="character__foot character__foot--right" />
      </div>
    </div>
  );
}
