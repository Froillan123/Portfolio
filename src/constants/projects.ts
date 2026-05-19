import { Brain } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import faceofmindImage from "@/assets/faceofmind-project.jpg";

export type Project = {
  title: string;
  subtitle: string;
  description: string;
  image: string;
  link: string;
  icon: LucideIcon;
  /** Proprietary work — no source repo, stack breakdown, or architecture details */
  proprietary?: boolean;
  /** Public-facing highlights only (marketing-level) */
  highlights?: string[];
  /** Generic capability tags — never internal service names */
  technologies?: string[];
  github?: string;
};

export const projects: Project[] = [
  {
    title: "FaceofMind",
    subtitle: "Mental wellness platform · proprietary",
    description:
      "Founder-led product for AI-assisted mental wellness, mood support, and professional care pathways. Live in production — implementation and architecture are confidential.",
    image: faceofmindImage,
    link: "https://www.faceofmind.it.com/",
    icon: Brain,
    proprietary: true,
    highlights: [
      "User-facing wellness companion (mobile & web)",
      "Mood tracking and guided wellness experiences",
      "Connections to licensed mental health professionals",
      "Live online and still maintained",
    ],
    technologies: ["Mobile", "Web", "Cloud", "AI"],
  },
];
