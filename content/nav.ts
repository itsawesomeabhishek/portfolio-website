import type { NavLink } from "./types";

export const navLinks: readonly NavLink[] = [
  { label: "/ABOUT", href: "#about" },
  { label: "/SKILLS", href: "#skills" },
  { label: "/LOGS", href: "#logs" },
  { label: "/WORK", href: "#projects" },
];

export const hireMe: NavLink = { label: "HIRE ME", href: "#contact" };
