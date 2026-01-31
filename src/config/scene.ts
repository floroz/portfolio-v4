import type { SceneConfig, InteractiveObjectConfig } from "../types/game";

/**
 * Scene dimensions - classic SCUMM game ratio
 * Total viewport: 640x400
 * Scene area: 640x320 (top)
 * Toolbar area: 640x80 (bottom)
 */
export const VIEWPORT = {
  width: 640,
  height: 400,
  sceneHeight: 320,
  toolbarHeight: 80,
} as const;

/**
 * Walkable floor area bounds
 * Y values are "bottom" positions (distance from bottom of scene)
 * Lower Y = closer to viewer = larger character
 * Higher Y = farther from viewer = smaller character
 */
export const WALKABLE_AREA = {
  minY: 20, // Front of floor (closest to viewer)
  maxY: 64, // Back of floor (farthest from viewer)
  minX: 40, // Left edge
  maxX: 600, // Right edge
} as const;

/**
 * Interactive objects configuration
 * Positions are based on visual placement in LobbyBackground
 */
export const OBJECTS: InteractiveObjectConfig[] = [
  {
    id: "experience",
    position: { x: 540, y: 70 },
    size: { width: 60, height: 120 },
    action: "experience",
    label: "Office Door",
    interactionPoint: { x: 500, y: 50 },
  },
  {
    id: "projects",
    position: { x: 340, y: 45 },
    size: { width: 100, height: 60 },
    action: "projects",
    label: "Desk",
    interactionPoint: { x: 360, y: 35 },
  },
  {
    id: "skills",
    position: { x: 130, y: 30 },
    size: { width: 60, height: 100 },
    action: "skills",
    label: "Vending Machine",
    interactionPoint: { x: 170, y: 28 },
  },
  {
    id: "contact",
    position: { x: 445, y: 115 },
    size: { width: 30, height: 50 },
    action: "contact",
    label: "Phone",
    interactionPoint: { x: 420, y: 40 },
  },
  {
    id: "resume",
    position: { x: 50, y: 145 },
    size: { width: 50, height: 70 },
    action: "resume",
    label: "Resume",
    interactionPoint: { x: 80, y: 45 },
  },
  {
    id: "about",
    position: { x: 28, y: 85 },
    size: { width: 70, height: 30 },
    action: "about",
    label: "About Sign",
    interactionPoint: { x: 80, y: 50 },
  },
];

/**
 * Full scene configuration
 */
export const SCENE_CONFIG: SceneConfig = {
  width: VIEWPORT.width,
  height: VIEWPORT.sceneHeight,
  characterStart: { x: 300, y: 40 },
  walkableArea: WALKABLE_AREA,
  objects: OBJECTS,
};

/**
 * Character movement speed (pixels per second)
 * Base speed for free movement
 */
export const CHARACTER_SPEED = 100;

/**
 * Character movement speed when moving to an interactive object (2x faster)
 */
export const CHARACTER_INTERACTION_SPEED = 200;

/**
 * Calculate scale based on Y position for depth illusion
 * Higher Y (closer to floor line) = farther away = smaller
 * Lower Y (closer to screen bottom) = nearer = larger
 */
export function getScaleForY(bottomY: number): number {
  const { minY, maxY } = WALKABLE_AREA;
  const minScale = 0.85;
  const maxScale = 1.1;

  // Clamp Y to valid range
  const clampedY = Math.max(minY, Math.min(maxY, bottomY));

  // Linear interpolation: higher Y = smaller scale
  const t = (clampedY - minY) / (maxY - minY);
  return maxScale - t * (maxScale - minScale);
}

/**
 * Calculate z-index based on Y position
 * Lower Y = closer to viewer = higher z-index
 */
export function getZIndexForY(bottomY: number): number {
  const { minY, maxY } = WALKABLE_AREA;
  const clampedY = Math.max(minY, Math.min(maxY, bottomY));
  // Invert: lower Y gets higher z-index
  return Math.round(100 - clampedY);
}

/**
 * Clamp position to walkable area
 */
export function clampToWalkableArea(
  x: number,
  y: number,
): { x: number; y: number } {
  return {
    x: Math.max(WALKABLE_AREA.minX, Math.min(WALKABLE_AREA.maxX, x)),
    y: Math.max(WALKABLE_AREA.minY, Math.min(WALKABLE_AREA.maxY, y)),
  };
}

/**
 * Check if a position is within the walkable area
 */
export function isInWalkableArea(x: number, y: number): boolean {
  return (
    x >= WALKABLE_AREA.minX &&
    x <= WALKABLE_AREA.maxX &&
    y >= WALKABLE_AREA.minY &&
    y <= WALKABLE_AREA.maxY
  );
}
