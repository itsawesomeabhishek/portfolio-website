import type { Service } from "./types";

export const services: readonly Service[] = [
  {
    title: "WEB DEVELOPMENT",
    summary: "Fast, responsive websites built with modern tooling.",
    points: ["Next.js & React", "Responsive layouts", "SEO-friendly"],
  },
  {
    title: "FULL-STACK APPS",
    summary: "End-to-end applications, from database to interface.",
    points: ["Node.js & TypeScript", "PostgreSQL / MongoDB", "Auth & APIs"],
  },
  {
    title: "FRONTEND / UI BUILD",
    summary: "Pixel-accurate interfaces turned into clean components.",
    points: ["Tailwind CSS", "Accessible markup", "Design to code"],
  },
];
