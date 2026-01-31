import { useCallback } from "react";
import { useGameStore } from "../store/gameStore";
import { OBJECTS } from "../config/scene";
import type { ActionType } from "../types/game";

/**
 * Hook to handle clicks on interactive objects in the scene
 */
export function useSceneClick() {
  const {
    triggerAction,
    setHoveredObject,
    hoveredObject,
    modalOpen,
    terminalOpen,
  } = useGameStore();

  const handleObjectClick = useCallback(
    (objectId: string) => {
      if (modalOpen || terminalOpen) return;

      const object = OBJECTS.find((obj) => obj.id === objectId);
      if (!object) return;

      triggerAction(object.action, object.interactionPoint);
    },
    [triggerAction, modalOpen, terminalOpen],
  );

  const handleObjectHover = useCallback(
    (objectId: string | null) => {
      setHoveredObject(objectId);
    },
    [setHoveredObject],
  );

  const handleActionClick = useCallback(
    (action: ActionType) => {
      if (modalOpen || terminalOpen) return;

      const object = OBJECTS.find((obj) => obj.action === action);
      if (!object) return;

      triggerAction(action, object.interactionPoint);
    },
    [triggerAction, modalOpen, terminalOpen],
  );

  return {
    hoveredObject,
    handleObjectClick,
    handleObjectHover,
    handleActionClick,
  };
}
