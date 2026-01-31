import { useEffect, useCallback, useRef } from "react";
import { useGameStore } from "../store/gameStore";
import {
  CHARACTER_SPEED,
  CHARACTER_INTERACTION_SPEED,
  clampToWalkableArea,
  VIEWPORT,
} from "../config/scene";

const ARRIVAL_THRESHOLD = 5; // Distance in pixels to consider "arrived"

/**
 * Hook to handle character movement animation and input
 */
export function useCharacterMovement() {
  const animationFrameRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(0);

  const {
    characterPosition,
    targetPosition,
    setCharacterDirection,
    moveTo,
    stopMovement,
    modalOpen,
    terminalOpen,
  } = useGameStore();

  // Animation loop for smooth movement
  useEffect(() => {
    if (!targetPosition) {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
      return;
    }

    const animate = (currentTime: number) => {
      if (!lastTimeRef.current) {
        lastTimeRef.current = currentTime;
      }

      const deltaTime = (currentTime - lastTimeRef.current) / 1000; // Convert to seconds
      lastTimeRef.current = currentTime;

      const store = useGameStore.getState();
      const {
        characterPosition: pos,
        targetPosition: target,
        pendingAction,
      } = store;

      if (!target) return;

      // Calculate direction and distance
      const dx = target.x - pos.x;
      const dy = target.y - pos.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      // Check if arrived
      if (distance < ARRIVAL_THRESHOLD) {
        store.setCharacterPosition(target);
        store.onArrival();
        lastTimeRef.current = 0;
        return;
      }

      // Use faster speed when moving to an interactive object
      const speed = pendingAction
        ? CHARACTER_INTERACTION_SPEED
        : CHARACTER_SPEED;
      const moveDistance = speed * deltaTime;
      const ratio = Math.min(moveDistance / distance, 1);

      const newX = pos.x + dx * ratio;
      const newY = pos.y + dy * ratio;

      store.setCharacterPosition({ x: newX, y: newY });

      // Continue animation
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    lastTimeRef.current = 0;
    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [targetPosition]);

  // Handle scene click to move character
  const handleSceneClick = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      // Don't handle clicks if modal or terminal is open
      if (modalOpen || terminalOpen) return;

      const rect = event.currentTarget.getBoundingClientRect();
      const scaleX = VIEWPORT.width / rect.width;
      const scaleY = VIEWPORT.sceneHeight / rect.height;

      // Convert click position to scene coordinates
      const clickX = (event.clientX - rect.left) * scaleX;
      const clickY = (event.clientY - rect.top) * scaleY;

      // Convert to "bottom" Y coordinate (scene uses bottom positioning)
      const bottomY = VIEWPORT.sceneHeight - clickY;

      // Clamp to walkable area
      const clamped = clampToWalkableArea(clickX, bottomY);

      moveTo(clamped);
    },
    [moveTo, modalOpen, terminalOpen],
  );

  // Handle keyboard input for character movement
  useEffect(() => {
    const MOVE_STEP = 20; // Pixels per key press

    const handleKeyDown = (event: KeyboardEvent) => {
      // Don't handle keyboard movement if modal or terminal is open
      if (modalOpen || terminalOpen) return;

      // Ignore if typing in an input
      if (
        event.target instanceof HTMLInputElement ||
        event.target instanceof HTMLTextAreaElement
      ) {
        return;
      }

      const { characterPosition: pos } = useGameStore.getState();
      let newX = pos.x;
      let newY = pos.y;
      let moved = false;

      switch (event.key) {
        case "ArrowLeft":
        case "a":
          newX = pos.x - MOVE_STEP;
          setCharacterDirection("left");
          moved = true;
          break;
        case "ArrowRight":
        case "d":
          newX = pos.x + MOVE_STEP;
          setCharacterDirection("right");
          moved = true;
          break;
        case "ArrowUp":
        case "w":
          newY = pos.y + MOVE_STEP; // Up increases bottom Y
          moved = true;
          break;
        case "ArrowDown":
        case "s":
          newY = pos.y - MOVE_STEP; // Down decreases bottom Y
          moved = true;
          break;
        case "Escape":
          stopMovement();
          break;
      }

      if (moved) {
        event.preventDefault();
        const clamped = clampToWalkableArea(newX, newY);
        moveTo(clamped);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [modalOpen, terminalOpen, setCharacterDirection, moveTo, stopMovement]);

  return {
    characterPosition,
    targetPosition,
    handleSceneClick,
  };
}
