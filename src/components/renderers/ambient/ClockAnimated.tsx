import "./ClockAnimated.css";

/**
 * Animated wall clock
 * Ticking second hand animation
 */
export function ClockAnimated() {
  return (
    <div className="clock" aria-hidden="true">
      {/* Clock frame */}
      <div className="clock__frame">
        {/* Clock face */}
        <div className="clock__face">
          {/* Hour markers */}
          <div className="clock__marker clock__marker--12" />
          <div className="clock__marker clock__marker--3" />
          <div className="clock__marker clock__marker--6" />
          <div className="clock__marker clock__marker--9" />

          {/* Hands */}
          <div className="clock__hand clock__hand--hour" />
          <div className="clock__hand clock__hand--minute" />
          <div className="clock__hand clock__hand--second" />

          {/* Center dot */}
          <div className="clock__center" />
        </div>
      </div>
    </div>
  );
}
