---
name: Flat 2D Scene Pivot
overview: Pivot from complex 3D perspective walls to a simpler flat 2D scene. Single back wall with color zones, flat chess floor, all objects facing frontally. Depth achieved through shadows, layering, and subtle scale changes as the character moves closer/farther.
todos:
  - id: rewrite-background
    content: Rewrite LobbyBackground.tsx/css with flat wall structure and texture-rich color zones
    status: completed
  - id: flat-floor
    content: Implement flat checkered floor with depth gradient overlay
    status: completed
  - id: simplify-scene-css
    content: Remove all skewY transforms and simplify object positioning in Scene.css
    status: completed
  - id: update-desk-door
    content: Remove perspective transforms from DeskObject and DoorObject
    status: completed
  - id: verify-objects
    content: Verify all objects and ambient elements render correctly without skew
    status: completed
  - id: character-y-movement
    content: Set up character container for free X/Y movement with optional scale
    status: completed
isProject: false
---

# Flat 2D Scene Pivot (COMPLETED)

**Status**: Complete - This plan has been fully implemented.

**Parent Plan**: [DotT Portfolio MVP](dott_portfolio_mvp_c984f26b.plan.md)

This was a mid-project pivot to simplify the visual approach. The original 3D perspective walls proved too complex to align properly. This plan documents the flat 2D approach that replaced it.

---

## Problem Statement

The original Phase 0 approach used:

- Skewed side walls (`skewY(-16deg)` and `skewY(16deg)`)
- Perspective floor (`rotateX(70deg)`)
- Objects had to match wall angles with individual skew transforms

This created cascading alignment issues - small changes to one element required adjustments to many others.

## Solution: Flat 2D with Depth Illusion

Inspired by the reference `example-scene.png`, the scene is now essentially **flat** - all objects face the viewer frontally. Depth is achieved through:

- **Layered color zones** on the back wall (orange/gold/blue sections)
- **Drop shadows** on all objects
- **Y-position = depth**: objects higher on screen appear farther away
- **Subtle scale** changes: character slightly smaller when "deeper" in scene
- **Gradient overlay** on floor: darker at back, lighter at front

## Implementation Summary

### Background Structure

```
+------------------------------------------------------------------+
|  CEILING (dark purple gradient with beams)                       |
+------------------------------------------------------------------+
|        |                                    |                    |
| ORANGE |         GOLD/MUSTARD              |       BLUE          |
|  ZONE  |         (center wall)             |       ZONE          |
| (left) |         [WELCOME BANNER]          |      (right)        |
+------------------------------------------------------------------+
|  BASEBOARD (simple horizontal strip)                             |
+------------------------------------------------------------------+
|  FLOOR: Flat checkered pattern with depth gradient overlay       |
+------------------------------------------------------------------+
```

### Files Modified

| File | Changes |

| --------------------------------------------------------- | ---------------------------------------------------- |

| `src/components/renderers/background/LobbyBackground.tsx` | Simplified to flat wall with 3 color zones |

| `src/components/renderers/background/LobbyBackground.css` | Complete rewrite - no skew/perspective |

| `src/components/game/Scene.css` | Removed all skewY transforms, simplified positioning |

| `src/components/game/Scene.tsx` | Added `getScaleForY()` for depth illusion |

| `src/components/renderers/objects/DeskObject.css` | Removed perspective transform |

| `src/styles/variables.css` | Added z-index layer variables |

### Key CSS Techniques

**Flat floor with depth gradient:**

```css
.lobby__floor {
  background-image: repeating-conic-gradient(
    from 0deg,
    #c86830 0deg 90deg,
    #a85020 90deg 180deg
  );
  background-size: 48px 48px;
}

.lobby__floor::after {
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.35) 0%,
    /* darker at back */ rgba(0, 0, 0, 0) 100% /* lighter at front */
  );
}
```

**Character scale based on Y position:**

```typescript
function getScaleForY(bottomY: number): number {
  const minY = 20; // Front (largest)
  const maxY = 64; // Back (smallest)
  const minScale = 0.85;
  const maxScale = 1.1;
  const t = (clampedY - minY) / (maxY - minY);
  return maxScale - t * (maxScale - minScale);
}
```

## Results

- Scene now renders correctly with consistent visual style
- Objects are easy to position with simple coordinates
- No cascading alignment issues
- Character can move freely on the floor area
- Depth illusion maintained through shadows and layering

---

**Next Steps**: Return to [DotT Portfolio MVP](dott_portfolio_mvp_c984f26b.plan.md) Phase 1 for interactivity implementation.
