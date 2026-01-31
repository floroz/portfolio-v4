import "./Scene.css";

// Hooks
import { useCharacterMovement } from "../../hooks/useCharacterMovement";
import { useSceneClick } from "../../hooks/useSceneClick";
import { useGameStore } from "../../store/gameStore";
import { getScaleForY, getZIndexForY } from "../../config/scene";

// Character
import { CharacterCSS } from "../renderers/character/CharacterCSS";

// Background
import { LobbyBackground } from "../renderers/background/LobbyBackground";

// Interactive Objects
import { DoorObject } from "../renderers/objects/DoorObject";
import { PhoneObject } from "../renderers/objects/PhoneObject";
import { VendingMachineObject } from "../renderers/objects/VendingMachineObject";
import { DeskObject } from "../renderers/objects/DeskObject";
import { FramedSignObject } from "../renderers/objects/FramedSignObject";

// Ambient Elements
import { ClockAnimated } from "../renderers/ambient/ClockAnimated";
import { FlickeringSign } from "../renderers/ambient/FlickeringSign";

/**
 * Main scene composition - Flat 2D with depth illusion
 * Character can move freely on the floor area
 * Depth achieved through Y-position, scale, and shadows
 */
export function Scene() {
  // Character state from store
  const { characterPosition, characterDirection, characterState } =
    useGameStore();

  // Movement handling
  const { handleSceneClick } = useCharacterMovement();

  // Object interaction
  const { handleObjectClick, handleObjectHover, hoveredObject } =
    useSceneClick();

  const characterScale = getScaleForY(characterPosition.y);
  const characterZIndex = getZIndexForY(characterPosition.y);

  return (
    <div className="scene" onClick={handleSceneClick}>
      {/* Background layer */}
      <LobbyBackground />

      {/* Ambient decorations (non-interactive) */}
      <div className="scene__ambient">
        {/* Clock on right wall */}
        <div className="scene__element scene__element--clock">
          <ClockAnimated />
        </div>

        {/* Flickering sign on left */}
        <div className="scene__element scene__element--sign">
          <FlickeringSign text="ABOUT" />
        </div>
      </div>

      {/* Interactive objects layer */}
      <div className="scene__objects">
        {/* Vending machine (Skills) - left side */}
        <div
          className={`scene__element scene__element--vending ${hoveredObject === "skills" ? "scene__element--hovered" : ""}`}
          onClick={(e) => {
            e.stopPropagation();
            handleObjectClick("skills");
          }}
          onMouseEnter={() => handleObjectHover("skills")}
          onMouseLeave={() => handleObjectHover(null)}
          role="button"
          tabIndex={0}
          aria-label="Vending Machine - Skills"
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              handleObjectClick("skills");
            }
          }}
        >
          <VendingMachineObject />
        </div>

        {/* Door (Experience) - right side */}
        <div
          className={`scene__element scene__element--door ${hoveredObject === "experience" ? "scene__element--hovered" : ""}`}
          onClick={(e) => {
            e.stopPropagation();
            handleObjectClick("experience");
          }}
          onMouseEnter={() => handleObjectHover("experience")}
          onMouseLeave={() => handleObjectHover(null)}
          role="button"
          tabIndex={0}
          aria-label="Office Door - Experience"
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              handleObjectClick("experience");
            }
          }}
        >
          <DoorObject label="Experience" variant="office" />
        </div>

        {/* Phone (Contact) - right wall */}
        <div
          className={`scene__element scene__element--phone ${hoveredObject === "contact" ? "scene__element--hovered" : ""}`}
          onClick={(e) => {
            e.stopPropagation();
            handleObjectClick("contact");
          }}
          onMouseEnter={() => handleObjectHover("contact")}
          onMouseLeave={() => handleObjectHover(null)}
          role="button"
          tabIndex={0}
          aria-label="Phone - Contact"
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              handleObjectClick("contact");
            }
          }}
        >
          <PhoneObject />
        </div>

        {/* Desk (Projects) - right front */}
        <div
          className={`scene__element scene__element--desk ${hoveredObject === "projects" ? "scene__element--hovered" : ""}`}
          onClick={(e) => {
            e.stopPropagation();
            handleObjectClick("projects");
          }}
          onMouseEnter={() => handleObjectHover("projects")}
          onMouseLeave={() => handleObjectHover(null)}
          role="button"
          tabIndex={0}
          aria-label="Desk - Projects"
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              handleObjectClick("projects");
            }
          }}
        >
          <DeskObject />
        </div>

        {/* Framed sign (Resume) - left wall */}
        <div
          className={`scene__element scene__element--resume ${hoveredObject === "resume" ? "scene__element--hovered" : ""}`}
          onClick={(e) => {
            e.stopPropagation();
            handleObjectClick("resume");
          }}
          onMouseEnter={() => handleObjectHover("resume")}
          onMouseLeave={() => handleObjectHover(null)}
          role="button"
          tabIndex={0}
          aria-label="Framed Sign - Resume"
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              handleObjectClick("resume");
            }
          }}
        >
          <FramedSignObject />
        </div>

        {/* About sign (clickable version) */}
        <div
          className={`scene__element scene__element--about-click ${hoveredObject === "about" ? "scene__element--hovered" : ""}`}
          onClick={(e) => {
            e.stopPropagation();
            handleObjectClick("about");
          }}
          onMouseEnter={() => handleObjectHover("about")}
          onMouseLeave={() => handleObjectHover(null)}
          role="button"
          tabIndex={0}
          aria-label="About Sign"
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              handleObjectClick("about");
            }
          }}
          style={{
            position: "absolute",
            left: "28px",
            top: "85px",
            width: "70px",
            height: "30px",
            cursor: "pointer",
            zIndex: 4,
          }}
        />
      </div>

      {/* Character layer - positioned with X/Y and scale for depth */}
      <div
        className="scene__character"
        style={{
          left: `${characterPosition.x}px`,
          bottom: `${characterPosition.y}px`,
          transform: `scale(${characterScale})`,
          zIndex: characterZIndex,
        }}
      >
        <CharacterCSS direction={characterDirection} state={characterState} />
      </div>
    </div>
  );
}
