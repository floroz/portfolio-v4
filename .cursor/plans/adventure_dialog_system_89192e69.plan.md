---
name: Adventure Dialog System
overview: Integrate an 80s point-and-click adventure game dialog system featuring your pixelated portrait as an NPC, typewriter text effects, multiple-choice dialog options, and retro sound effects.
todos:
  - id: welcome-screen
    content: Create WelcomeScreen component featuring large portrait with fade-in animation
    status: pending
  - id: dialog-component
    content: Create AdventureDialog component with prominent portrait, text area, and options
    status: pending
  - id: dialog-styling
    content: Style dialog box with 80s adventure game aesthetic (larger portrait ~160-200px)
    status: pending
  - id: dialog-state
    content: Extend gameStore with dialog state and actions
    status: pending
  - id: dialog-content
    content: Create dialogTrees.ts with branching conversation content
    status: pending
  - id: typewriter-effect
    content: Implement typewriter text animation with configurable speed
    status: pending
  - id: keyboard-nav
    content: Add arrow keys + Enter navigation for dialog options
    status: pending
  - id: sound-system
    content: Create useDialogSound hook with typing/selection sounds
    status: pending
  - id: character-css-update
    content: Update CharacterCSS to remove glasses and better match retro-daniele.png
    status: pending
  - id: integration
    content: Wire up dialog triggers (initial load, About action, terminal command)
    status: pending
isProject: false
---

# Adventure Dialog System Integration

## Overview

Add an interactive dialog system inspired by classic 80s/90s point-and-click adventures (Monkey Island, Day of the Tentacle, Maniac Mansion). The dialog features your pixelated portrait, typewriter text effects, branching conversation options, and retro sound effects.

## Integration Strategy

**Recommended Approach: Dual Trigger**

1. **Initial Welcome Dialog** - On first page load, show a greeting dialog introducing yourself and the portfolio
2. **Replace ContentModal for "About"** - The "About" action opens the adventure dialog instead of the plain modal, offering a more engaging way to learn about you

This keeps the existing modal for technical content (Projects, Skills, Experience) while using the adventure dialog for personality-driven content.

### Welcome Screen (Initial Load)

A full-screen welcome featuring the large portrait prominently:

```
+----------------------------------------------------------------------+
|                                                                       |
|                     +-------------------------+                       |
|                     |                         |                       |
|                     |   retro-daniele.png     |                       |
|                     |      (200x200+)         |                       |
|                     |   Pixel art portrait    |                       |
|                     |                         |                       |
|                     +-------------------------+                       |
|                                                                       |
|                        DANIELE TORTORA                                |
|                    Senior Software Engineer                           |
|                                                                       |
|                     [ Press any key to start ]                        |
|                                                                       |
+----------------------------------------------------------------------+
```

### Adventure Dialog (Conversations)

```
+----------------------------------------------------------------------+
|  DANIELE                                           [NOW PLAYING: OFF] |
+----------------------------------------------------------------------+
|  +---------------+                                                    |
|  |               |   Welcome to my portfolio, traveler!               |
|  |   Portrait    |                                                    |
|  |   160x160     |   I'm a Senior Software Engineer who builds       |
|  |   (cropped    |   web applications and loves retro games.          |
|  |    face)      |   ____________________________________________     |
|  +---------------+                                                    |
|                      > Tell me about yourself                         |
|                        What technologies do you work with?            |
|                        Are you available for work?                    |
|                        Just browsing, thanks                          |
|                                                                       |
+----------------------------------------------------------------------+
|                                           Press ESC to close          |
+----------------------------------------------------------------------+
```

## File Structure

```
src/
├── components/
│   └── dialog/
│       ├── WelcomeScreen.tsx        # Full-screen intro with large portrait
│       ├── WelcomeScreen.css        # Welcome screen styling
│       ├── AdventureDialog.tsx      # Main dialog component
│       ├── AdventureDialog.css      # Retro styling
│       ├── DialogPortrait.tsx       # Portrait component (reusable)
│       └── DialogOptions.tsx        # Selectable options list
│
├── config/
│   └── dialogTrees.ts               # Dialog content and branching
│
├── hooks/
│   └── useDialogSound.ts            # Sound effects hook
│
├── store/
│   └── gameStore.ts                 # (extend) Add dialog state
│
└── assets/
    └── retro-daniele.png            # EXISTING - Pixel art portrait
```

## Key Components

### 1. WelcomeScreen Component

Full-screen intro displayed once per session:

- Large portrait display (~200-250px) with retro frame
- Name and title text with pixel font
- "Press any key to start" prompt with blinking animation
- CRT scanline overlay effect
- Fade-in animation on load
- Dismisses on any key press or click
- Stores `welcomeShown` in sessionStorage to show only once

```typescript
// src/components/dialog/WelcomeScreen.tsx
interface WelcomeScreenProps {
  onDismiss: () => void;
}
```

### 2. AdventureDialog Component

Main features:

- Prominent portrait (~160px) on the left
- Typewriter text animation (characters appear sequentially)
- Keyboard navigation (arrow keys + Enter for options)
- Sound toggle button ("NOW PLAYING")
- ESC to close
- Framer Motion for open/close animations

### 3. Dialog State (extend `gameStore.ts`)

```typescript
// New state in gameStore
welcomeShown: boolean;       // Has welcome screen been dismissed?
dialogOpen: boolean;
dialogNode: string;          // Current position in dialog tree
visitedNodes: Set<string>;   // Track visited branches
soundEnabled: boolean;       // Sound on/off toggle

// New actions
dismissWelcome: () => void;
openDialog: (startNode?: string) => void;
closeDialog: () => void;
selectDialogOption: (nodeId: string) => void;
toggleSound: () => void;
```

### 4. Dialog Content Structure (`dialogTrees.ts`)

```typescript
interface DialogNode {
  speaker: "daniele" | "narrator";
  text: string;
  options?: DialogOption[];
  autoAdvance?: string; // Next node ID for linear dialog
}

interface DialogOption {
  id: string;
  label: string;
  nextNode: string;
  visited?: boolean; // Track if option was selected
}

export const DIALOG_TREE: Record<string, DialogNode> = {
  welcome: {
    speaker: "daniele",
    text: "Welcome to my portfolio, traveler! I see you've found my little corner of the web.",
    options: [
      { id: "about", label: "Tell me about yourself", nextNode: "about-intro" },
      {
        id: "work",
        label: "What kind of work do you do?",
        nextNode: "work-intro",
      },
      {
        id: "hire",
        label: "Are you available for hire?",
        nextNode: "hire-info",
      },
      { id: "bye", label: "Just browsing, thanks", nextNode: "bye" },
    ],
  },
  // ... more nodes
};
```

### 5. Sound System (`useDialogSound.ts`)

- **Typing beep** - Short blip for each character (classic adventure style)
- **Selection sound** - When hovering/selecting options
- **Confirm sound** - When choosing an option
- Use Web Audio API for low-latency playback
- Respect `prefers-reduced-motion` and provide mute toggle

### 6. Portrait Asset (EXISTING)

The portrait is already created at `src/assets/retro-daniele.png`:

- High-quality pixel art showing Daniele in navy sweater with retro office background
- Use full size for Welcome Screen (~200-250px display)
- Use cropped/scaled version for dialog portrait (~160px, focused on face)
- CSS `image-rendering: pixelated` for crisp scaling
- Styled frame matching the 80s aesthetic (double border, subtle glow)

### 7. CharacterCSS Update

Update the in-game character to better match `retro-daniele.png`:

**Changes needed in [`CharacterCSS.css`](src/components/renderers/character/CharacterCSS.css):**

- Remove glasses (the portrait doesn't have them)
- Adjust skin tone to warmer palette (#f5c6a5 -> closer to portrait tones)
- Keep navy sweater (already matches!)
- Keep stubble/beard (already present)
- Keep friendly smile with teeth (matches portrait)

## Styling Approach

The dialog box style from your screenshot uses:

- Dark background with subtle border styling
- Cyan/teal accent color for the speaker name
- Green highlight for selected option
- Monospace or pixel font for text
- Double-line border effect

```css
.adventure-dialog {
  background: #0a0f14;
  border: 2px solid #2a3a4a;
  box-shadow:
    inset 0 0 0 1px #1a2a3a,
    0 0 20px rgba(0, 0, 0, 0.8);
  font-family: "Press Start 2P", monospace;
}

.adventure-dialog__speaker {
  color: #00d4aa;
  text-transform: uppercase;
  letter-spacing: 2px;
}

.adventure-dialog__option--selected {
  color: #4ade80;
}
```

## Trigger Points

| Trigger | Action |

|---------|--------|

| Initial page load | Show WelcomeScreen (once per session, dismisses on key/click) |

| After WelcomeScreen dismisses | Optionally show welcome dialog |

| Click "About" object/button | Open dialog at "about" branch |

| Terminal command `talk` | Open dialog |

| (Optional) Click NPC in scene | Open dialog |

## Dialog Content Themes

Write dialog in the style of classic adventure games:

- Self-aware humor ("You want to know about me? How flattering!")
- Fourth-wall breaks ("Well, you did click on my portfolio...")
- Easter eggs for persistent clicking
- Personality-driven responses about your work, skills, and interests

## Implementation Order

1. **Update CharacterCSS** - Remove glasses to match `retro-daniele.png`
2. **Create WelcomeScreen** - Full-screen intro featuring large portrait with fade-in/scanline effects
3. **Add dialog state to `gameStore.ts`** - welcomeShown, dialogOpen, dialogNode, etc.
4. **Create `AdventureDialog.tsx`** - Dialog component with prominent portrait (160px)
5. **Style dialog** - 80s adventure aesthetic with proper portrait sizing
6. **Create `dialogTrees.ts`** - Branching conversation content
7. **Implement typewriter effect** - Characters appear sequentially with optional sound
8. **Add keyboard navigation** - Arrow keys + Enter for dialog options
9. **Integrate sound effects** - `useDialogSound.ts` with typing/selection sounds
10. **Wire up triggers** - Welcome on load, About action, terminal `talk` command
11. **Polish** - Animations, transitions, "NOW PLAYING" toggle
