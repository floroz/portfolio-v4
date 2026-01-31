import { useCallback, useRef, useReducer, useEffect } from "react";

interface UseTypewriterOptions {
  /** Characters per second */
  speed?: number;
  /** Callback fired for each character typed */
  onType?: () => void;
  /** Callback fired when typing completes */
  onComplete?: () => void;
}

interface UseTypewriterReturn {
  /** Currently displayed text */
  displayedText: string;
  /** Whether typing is in progress */
  isTyping: boolean;
  /** Skip to show full text immediately */
  skip: () => void;
  /** Reset and start typing new text */
  reset: (newText: string) => void;
  /** Stop typing immediately without completing */
  stop: () => void;
}

interface TypewriterState {
  displayedText: string;
  isTyping: boolean;
  targetText: string;
  charIndex: number;
}

type TypewriterAction =
  | { type: "RESET"; payload: string }
  | { type: "TYPE_CHAR"; payload: string }
  | { type: "COMPLETE" }
  | { type: "SKIP" };

function typewriterReducer(
  state: TypewriterState,
  action: TypewriterAction,
): TypewriterState {
  switch (action.type) {
    case "RESET":
      return {
        displayedText: "",
        isTyping: action.payload.length > 0,
        targetText: action.payload,
        charIndex: 0,
      };
    case "TYPE_CHAR":
      return {
        ...state,
        displayedText: state.displayedText + action.payload,
        charIndex: state.charIndex + 1,
      };
    case "COMPLETE":
      return {
        ...state,
        isTyping: false,
      };
    case "SKIP":
      return {
        ...state,
        displayedText: state.targetText,
        isTyping: false,
        charIndex: state.targetText.length,
      };
    default:
      return state;
  }
}

function createInitialState(text: string): TypewriterState {
  return {
    displayedText: "",
    isTyping: text.length > 0,
    targetText: text,
    charIndex: 0,
  };
}

/**
 * Typewriter effect hook for adventure game dialog
 * Types out text character by character with configurable speed
 */
export function useTypewriter(
  text: string,
  options: UseTypewriterOptions = {},
): UseTypewriterReturn {
  const { speed = 40, onType, onComplete } = options;

  const [state, dispatch] = useReducer(
    typewriterReducer,
    text,
    createInitialState,
  );

  // Use refs for interval and callbacks
  const intervalRef = useRef<number | null>(null);
  const onTypeRef = useRef(onType);
  const onCompleteRef = useRef(onComplete);
  const prevTextRef = useRef(text);

  // Keep callback refs updated in effect
  useEffect(() => {
    onTypeRef.current = onType;
    onCompleteRef.current = onComplete;
  });

  // Clear any existing interval
  const clearTypingInterval = useCallback(() => {
    if (intervalRef.current !== null) {
      window.clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  // Reset when text prop changes
  useEffect(() => {
    if (prevTextRef.current !== text) {
      prevTextRef.current = text;
      clearTypingInterval();
      dispatch({ type: "RESET", payload: text });
    }
  }, [text, clearTypingInterval]);

  // Handle typing animation
  useEffect(() => {
    if (!state.isTyping || !state.targetText) {
      return;
    }

    const delay = 1000 / speed;

    intervalRef.current = window.setInterval(() => {
      if (state.charIndex < state.targetText.length) {
        const nextChar = state.targetText[state.charIndex];
        dispatch({ type: "TYPE_CHAR", payload: nextChar });
        onTypeRef.current?.();
      } else {
        clearTypingInterval();
        dispatch({ type: "COMPLETE" });
        onCompleteRef.current?.();
      }
    }, delay);

    return clearTypingInterval;
  }, [
    state.isTyping,
    state.targetText,
    state.charIndex,
    speed,
    clearTypingInterval,
  ]);

  // Skip to full text
  const skip = useCallback(() => {
    clearTypingInterval();
    dispatch({ type: "SKIP" });
    onCompleteRef.current?.();
  }, [clearTypingInterval]);

  // Reset with new text
  const reset = useCallback(
    (newText: string) => {
      clearTypingInterval();
      dispatch({ type: "RESET", payload: newText });
    },
    [clearTypingInterval],
  );

  // Stop typing immediately without completing (for cleanup)
  const stop = useCallback(() => {
    clearTypingInterval();
    dispatch({ type: "COMPLETE" });
  }, [clearTypingInterval]);

  return {
    displayedText: state.displayedText,
    isTyping: state.isTyping,
    skip,
    reset,
    stop,
  };
}
