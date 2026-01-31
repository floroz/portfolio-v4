/**
 * Dialog tree content for the adventure game dialog system
 * Inspired by classic point-and-click adventures (Monkey Island, Day of the Tentacle)
 */

import type { DialogNode } from "../types/game";

export const DIALOG_TREE: Record<string, DialogNode> = {
  // Welcome / Entry point
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

  // About branch
  "about-intro": {
    speaker: "daniele",
    text: "Ah, you want to know about me? How flattering! I'm Daniele, a Senior Software Engineer who loves building web applications.",
    options: [
      {
        id: "about-more",
        label: "What else should I know?",
        nextNode: "about-details",
      },
      {
        id: "about-hobbies",
        label: "Any hobbies?",
        nextNode: "about-hobbies",
      },
      {
        id: "back",
        label: "Let's talk about something else",
        nextNode: "welcome",
      },
    ],
  },

  "about-details": {
    speaker: "daniele",
    text: "I've been coding for over a decade, starting with Java and eventually falling in love with JavaScript and TypeScript. These days I focus on React, Node.js, and building great user experiences.",
    options: [
      {
        id: "about-philosophy",
        label: "What's your development philosophy?",
        nextNode: "about-philosophy",
      },
      {
        id: "back",
        label: "Let's talk about something else",
        nextNode: "welcome",
      },
    ],
  },

  "about-philosophy": {
    speaker: "daniele",
    text: "I believe code should be clean, maintainable, and serve the user first. Tests aren't optional - they're how we sleep at night. And never, ever use 'any' in TypeScript unless you have a really good reason!",
    options: [
      {
        id: "back",
        label: "Wise words! Back to the main topics",
        nextNode: "welcome",
      },
    ],
  },

  "about-hobbies": {
    speaker: "daniele",
    text: "When I'm not coding, you might find me playing retro video games - as you can probably tell from this portfolio! I'm also into music, reading sci-fi, and exploring new places.",
    options: [
      {
        id: "about-games",
        label: "What retro games?",
        nextNode: "about-games",
      },
      {
        id: "back",
        label: "Cool! Let's talk about something else",
        nextNode: "welcome",
      },
    ],
  },

  "about-games": {
    speaker: "daniele",
    text: "LucasArts adventures are my favorites - Monkey Island, Day of the Tentacle, Grim Fandango... This portfolio is my love letter to that era. I also enjoy classic RPGs and platformers.",
    options: [
      {
        id: "back",
        label: "I can tell! Back to the main topics",
        nextNode: "welcome",
      },
    ],
  },

  // Work branch
  "work-intro": {
    speaker: "daniele",
    text: "I build web applications! Frontend, backend, you name it. Currently I specialize in React and TypeScript on the frontend, with Node.js powering the backend.",
    options: [
      {
        id: "work-stack",
        label: "What's your tech stack?",
        nextNode: "work-stack",
      },
      {
        id: "work-experience",
        label: "Where have you worked?",
        nextNode: "work-experience",
      },
      {
        id: "back",
        label: "Let's talk about something else",
        nextNode: "welcome",
      },
    ],
  },

  "work-stack": {
    speaker: "daniele",
    text: "React, TypeScript, and Node.js are my bread and butter. I also work with Next.js, GraphQL, PostgreSQL, and various cloud services. CSS is secretly one of my favorite things - hence all the pixel art!",
    options: [
      {
        id: "work-projects",
        label: "Any cool projects?",
        nextNode: "work-projects",
      },
      {
        id: "back",
        label: "Impressive! Back to the main topics",
        nextNode: "welcome",
      },
    ],
  },

  "work-projects": {
    speaker: "daniele",
    text: "Check out the Projects section for details! I've built everything from enterprise applications to interactive experiences like this portfolio. Each project taught me something new.",
    options: [
      {
        id: "back",
        label: "I'll check them out! Back to the main topics",
        nextNode: "welcome",
      },
    ],
  },

  "work-experience": {
    speaker: "daniele",
    text: "I've worked at startups and larger companies across different industries. The Experience section has the full timeline, but the short version: I love building products that make people's lives easier.",
    options: [
      {
        id: "back",
        label: "Nice! Back to the main topics",
        nextNode: "welcome",
      },
    ],
  },

  // Hire branch
  "hire-info": {
    speaker: "daniele",
    text: "Great question! I'm always interested in hearing about exciting opportunities. Whether it's a full-time role or an interesting project, I'd love to chat.",
    options: [
      {
        id: "hire-contact",
        label: "How can I reach you?",
        nextNode: "hire-contact",
      },
      {
        id: "hire-remote",
        label: "Do you work remotely?",
        nextNode: "hire-remote",
      },
      {
        id: "back",
        label: "Good to know! Back to the main topics",
        nextNode: "welcome",
      },
    ],
  },

  "hire-contact": {
    speaker: "daniele",
    text: "The Contact section has all my details - email, LinkedIn, GitHub. Or you can use the terminal in this portfolio to run 'contact' for quick links!",
    options: [
      {
        id: "back",
        label: "Perfect! Back to the main topics",
        nextNode: "welcome",
      },
    ],
  },

  "hire-remote": {
    speaker: "daniele",
    text: "Absolutely! I've been working remotely for years and I'm comfortable with async communication, video calls, and all the tools that make distributed teams work well.",
    options: [
      {
        id: "back",
        label: "Remote work is great! Back to the main topics",
        nextNode: "welcome",
      },
    ],
  },

  // Goodbye
  bye: {
    speaker: "daniele",
    text: "No problem! Feel free to explore the portfolio. Click on things, open the terminal, have fun! Come back anytime you want to chat.",
    options: [{ id: "close", label: "[Close dialog]", nextNode: "__close__" }],
  },

  // Easter eggs
  "easter-egg-click": {
    speaker: "daniele",
    text: "You're still clicking? I admire your persistence! Did you know you can also use keyboard shortcuts? Try pressing T to open the terminal!",
    options: [{ id: "back", label: "Good tip!", nextNode: "welcome" }],
  },
};

/** Starting node for the welcome dialog */
export const WELCOME_START_NODE = "welcome";

/** Starting node for the about dialog (triggered from About action) */
export const ABOUT_START_NODE = "about-intro";
