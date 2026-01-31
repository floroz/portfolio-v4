import "./ImageBackground.css";
import backgroundImage from "../../../assets/background.png";

/**
 * Image-based background component
 * Displays the custom pixel art background as a single image
 */
export function ImageBackground() {
  return (
    <div className="image-background" aria-hidden="true">
      <img
        src={backgroundImage}
        alt=""
        className="image-background__image"
        draggable={false}
      />
    </div>
  );
}
