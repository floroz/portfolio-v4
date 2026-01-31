import { Github, Linkedin, Terminal } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import "./IconGrid.css";
import { useGameStore } from "../../store/gameStore";
import { PROFILE } from "../../config/profile";

interface IconButton {
  id: string;
  label: string;
  icon: LucideIcon;
  href?: string;
  onClick?: () => void;
}

/**
 * Row of icon buttons (external links + terminal toggle)
 */
export function IconGrid() {
  const { toggleTerminal } = useGameStore();

  const icons: IconButton[] = [
    {
      id: "github",
      label: "GitHub",
      icon: Github,
      href: PROFILE.social.github,
    },
    {
      id: "linkedin",
      label: "LinkedIn",
      icon: Linkedin,
      href: PROFILE.social.linkedin,
    },
    {
      id: "terminal",
      label: "Terminal",
      icon: Terminal,
      onClick: toggleTerminal,
    },
  ];

  return (
    <div className="icon-grid">
      {icons.map(({ id, label, icon: Icon, href, onClick }) =>
        href ? (
          <a
            key={id}
            className="icon-grid__button"
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            title={label}
          >
            <Icon className="icon-grid__icon" size={16} strokeWidth={2} />
          </a>
        ) : (
          <button
            key={id}
            className="icon-grid__button"
            onClick={onClick}
            type="button"
            aria-label={label}
            title={label}
          >
            <Icon className="icon-grid__icon" size={16} strokeWidth={2} />
          </button>
        ),
      )}
    </div>
  );
}
