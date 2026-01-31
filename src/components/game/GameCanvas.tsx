import { useEffect, useState, useCallback, type ReactNode } from "react";
import { VIEWPORT } from "../../config/scene";
import "./GameCanvas.css";

interface GameCanvasProps {
  children: ReactNode;
}

/**
 * Scaled viewport container for the game
 * Fixed internal resolution: 640x400 (classic SCUMM ratio)
 * CSS transform scales to fit the viewport while maintaining aspect ratio
 */
export function GameCanvas({ children }: GameCanvasProps) {
  const [scale, setScale] = useState(1);

  const calculateScale = useCallback(() => {
    const padding = 48; // Margin around the game
    const availableWidth = window.innerWidth - padding * 2;
    const availableHeight = window.innerHeight - padding * 2;

    const scaleX = availableWidth / VIEWPORT.width;
    const scaleY = availableHeight / VIEWPORT.height;

    // Use the smaller scale to fit both dimensions
    // Minimum scale of 0.5 to keep it readable
    return Math.max(0.5, Math.min(scaleX, scaleY, 2));
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setScale(calculateScale());
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [calculateScale]);

  // Calculate the actual scaled dimensions for the wrapper
  const scaledWidth = VIEWPORT.width * scale;
  const scaledHeight = VIEWPORT.height * scale;

  return (
    <div className="game-canvas-wrapper">
      {/* Sizer div to make the wrapper respect the scaled size */}
      <div
        className="game-canvas-sizer"
        style={{
          width: scaledWidth,
          height: scaledHeight,
        }}
      >
        <div
          className="game-canvas"
          style={{
            width: VIEWPORT.width,
            height: VIEWPORT.height,
            transform: `scale(${scale})`,
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
