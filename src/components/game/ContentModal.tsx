import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { ActionType } from "../../types/game";
import { PROFILE } from "../../config/profile";
import "./ContentModal.css";

interface ContentModalProps {
  isOpen: boolean;
  action: ActionType | null;
  onClose: () => void;
}

// Generate content from PROFILE config
function getContent(action: ActionType): { title: string; content: string } {
  switch (action) {
    case "experience":
      return {
        title: "Work Experience",
        content: PROFILE.experienceSummary,
      };
    case "projects":
      return {
        title: "Projects",
        content: `Featured Projects:

🎮 This Portfolio - Day of the Tentacle inspired interactive portfolio
📱 Project Alpha - Mobile-first web application
🔧 Project Beta - Developer tooling and automation
📊 Project Gamma - Data visualization dashboard

[Detailed project cards with links will go here]`,
      };
    case "skills":
      return {
        title: "Technical Skills",
        content: `Frontend:
${PROFILE.skills.frontend.map((s) => `• ${s}`).join("\n")}

Backend:
${PROFILE.skills.backend.map((s) => `• ${s}`).join("\n")}

Tools & Practices:
${PROFILE.skills.tools.map((s) => `• ${s}`).join("\n")}`,
      };
    case "about":
      return {
        title: `About ${PROFILE.name.split(" ")[0]}`,
        content: PROFILE.bio,
      };
    case "contact":
      return {
        title: "Contact",
        content: `Let's connect!

📧 Email: ${PROFILE.email}
💼 LinkedIn: ${PROFILE.social.linkedin}
🐙 GitHub: ${PROFILE.social.github}

I'm always open to discussing:
• New opportunities
• Collaboration on projects
• Tech conversations
• Coffee chats ☕`,
      };
    case "resume":
      return {
        title: "Resume",
        content: `Download my resume to learn more about my experience and qualifications.

${PROFILE.name}
${PROFILE.title}
${PROFILE.location}

[PDF Download Button]

Or view the online version with interactive elements.

[Online Resume Link]`,
      };
  }
}

/**
 * Full-screen content overlay styled like a new "room"
 * Slides in from right with retro border styling
 */
export function ContentModal({ isOpen, action, onClose }: ContentModalProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Focus trap
  useEffect(() => {
    if (isOpen && contentRef.current) {
      contentRef.current.focus();
    }
  }, [isOpen]);

  const content = action ? getContent(action) : null;

  return (
    <AnimatePresence>
      {isOpen && content && (
        <>
          {/* Backdrop */}
          <motion.div
            className="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal content - centered with fade animation */}
          <motion.div
            className="modal"
            ref={contentRef}
            tabIndex={-1}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="modal__header">
              <h2 className="modal__title">{content.title}</h2>
              <button
                className="modal__close"
                onClick={onClose}
                aria-label="Close"
                type="button"
              >
                [X]
              </button>
            </div>

            <div className="modal__body">
              <pre className="modal__content">{content.content}</pre>
            </div>

            <div className="modal__footer">
              <button className="modal__button" onClick={onClose} type="button">
                Close
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
