/**
 * Single source of truth for all personal/professional details
 * Update this file to change information across the entire portfolio
 */

export const PROFILE = {
  // Personal
  name: "Daniele Tortora",
  title: "Senior Software Engineer",
  location: "London, UK",

  // Contact
  email: "hello@danieletortora.dev",

  // Social links
  social: {
    github: "https://github.com/danieletortora",
    linkedin: "https://linkedin.com/in/danieletortora",
  },

  // Portfolio metadata
  portfolio: {
    version: "1.0",
    title: "DANIELE TORTORA",
  },

  // Bio/About summary
  bio: `Hello! I'm a passionate software engineer who loves creating 
engaging user experiences and solving complex problems.

When I'm not coding, you can find me:
• Playing retro video games (hence this portfolio!)
• Contributing to open source
• Learning new technologies
• Exploring the outdoors`,

  // Skills categories
  skills: {
    frontend: [
      "React",
      "TypeScript",
      "JavaScript",
      "CSS",
      "Tailwind",
      "Styled Components",
      "Testing: Jest, React Testing Library, Cypress",
    ],
    backend: [
      "Node.js",
      "Express",
      "NestJS",
      "PostgreSQL",
      "MongoDB",
      "Redis",
      "GraphQL",
      "REST APIs",
    ],
    tools: ["Git", "CI/CD", "Docker", "Agile", "TDD", "Code Review"],
  },

  // Experience summary
  experienceSummary: `Senior Software Engineer with 8+ years of experience building web applications.

• Lead Frontend Developer at Tech Company
• Full-stack development with React, TypeScript, Node.js
• Mentoring junior developers
• Architecting scalable frontend solutions`,

  // Resume link (if available)
  resumeUrl: "/resume.pdf",
} as const;

export type Profile = typeof PROFILE;
