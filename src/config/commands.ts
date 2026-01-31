import type { TerminalCommands } from "../types/game";
import { PROFILE } from "./profile";

/**
 * Terminal command definitions
 * Commands can open modals, perform actions, or show text output
 */
export const TERMINAL_COMMANDS: TerminalCommands = {
  help: {
    description: "Show available commands",
    action: "showHelp",
  },
  about: {
    description: "About me",
    action: "openModal",
    payload: "about",
  },
  experience: {
    description: "Work experience",
    action: "openModal",
    payload: "experience",
  },
  projects: {
    description: "View projects",
    action: "openModal",
    payload: "projects",
  },
  skills: {
    description: "Technical skills",
    action: "openModal",
    payload: "skills",
  },
  contact: {
    description: "Contact info",
    action: "openModal",
    payload: "contact",
  },
  talk: {
    description: "Chat with Daniele",
    action: "openDialog",
    payload: "welcome",
  },
  chat: {
    description: "Chat with Daniele",
    action: "openDialog",
    payload: "welcome",
    hidden: true, // Alias for talk
  },
  resume: {
    description: "Download resume",
    action: "downloadResume",
  },
  clear: {
    description: "Clear terminal",
    action: "clearTerminal",
  },
  ls: {
    description: "List sections",
    action: "listSections",
  },
  cd: {
    description: "Navigate to section",
    action: "navigate",
  },
  whoami: {
    description: "Show user info",
    action: "showWhoami",
  },
  exit: {
    description: "Close terminal",
    action: "closeTerminal",
  },
  // Easter eggs (hidden from help)
  sudo: {
    description: "Admin access",
    action: "showSudoJoke",
    hidden: true,
  },
  matrix: {
    description: "Enter the matrix",
    action: "showMatrixEffect",
    hidden: true,
  },
};

/**
 * Generate help text from commands
 */
export function getHelpText(): string {
  const lines = ["", "Available commands:", ""];

  Object.entries(TERMINAL_COMMANDS)
    .filter(([, cmd]) => !cmd.hidden)
    .forEach(([name, cmd]) => {
      const padding = " ".repeat(12 - name.length);
      lines.push(`  ${name}${padding}- ${cmd.description}`);
    });

  lines.push("");
  lines.push("Tip: Use arrow keys to navigate command history");
  lines.push("");

  return lines.join("\n");
}

/**
 * Get list of available sections
 */
export function getListSections(): string {
  return `
Available sections:
  about/      - About me
  experience/ - Work experience  
  projects/   - Project showcase
  skills/     - Technical skills
  contact/    - Contact information

Use 'cd <section>' or type the section name directly.
`;
}

/**
 * Whoami output - uses PROFILE config
 */
export function getWhoamiText(): string {
  return `
visitor@${PROFILE.name.toLowerCase().replace(/\s+/g, "-")}-portfolio
------------------------
Role: Curious Explorer
Permissions: read, explore, interact
Session: guest
Status: Welcome! Feel free to look around.
`;
}

/**
 * Sudo joke response
 */
export function getSudoJoke(): string {
  return `
[sudo] password for visitor: 
Sorry, user visitor is not in the sudoers file.
This incident will be reported... just kidding! 😄

Try 'help' to see what you can do.
`;
}

/**
 * Matrix effect (simplified)
 */
export function getMatrixEffect(): string {
  const chars = "01アイウエオカキクケコサシスセソ";
  const lines: string[] = [];

  for (let i = 0; i < 8; i++) {
    let line = "";
    for (let j = 0; j < 40; j++) {
      line += chars[Math.floor(Math.random() * chars.length)];
    }
    lines.push(line);
  }

  lines.push("");
  lines.push("Wake up, Neo...");
  lines.push("The Matrix has you...");
  lines.push("");

  return lines.join("\n");
}
