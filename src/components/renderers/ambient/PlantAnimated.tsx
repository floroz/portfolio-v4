import "./PlantAnimated.css";

/**
 * Animated potted plant/cactus
 * Subtle swaying animation to make scene feel alive
 */
export function PlantAnimated() {
  return (
    <div className="plant" aria-hidden="true">
      {/* Pot */}
      <div className="plant__pot">
        <div className="plant__pot-rim" />
        <div className="plant__pot-body" />
        <div className="plant__soil" />
      </div>

      {/* Plant body - cactus style */}
      <div className="plant__body">
        {/* Main trunk */}
        <div className="plant__trunk" />

        {/* Arms */}
        <div className="plant__arm plant__arm--left" />
        <div className="plant__arm plant__arm--right" />

        {/* Spikes/details */}
        <div className="plant__spikes" />
      </div>
    </div>
  );
}
