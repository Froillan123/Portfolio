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
    subtitle: "Mental Wellness & Daily Mood Companion · Live",
    description:
      "Founder and software architect of FaceofMind, a personal self-care and emotional wellness companion app. The platform brings emotional wellness tools and structured mood check-ins together in a delightful, engaging space, bridging the gap between daily self-care and professional care.",
    image: faceofmindImage,
    link: "https://www.faceofmind.it.com/",
    icon: Brain,
    proprietary: true,
    highlights: [
      "Patient App: Multi-platform mobile app featuring daily mood logs, virtual pet progression, and milestone quests to make self-care fun.",
      "Clinician Portal: Dashboard for licensed psychologists to review patient self-reported emotional trends between sessions.",
      "Interactive Care: Integrated video, chat, and appointment scheduling designed to keep check-ins seamless and convenient.",
      "Full-Stack Architecture: Programmed in Flutter and React, supported by Python (FastAPI) and C#/.NET Core backends on Google Cloud.",
    ],
    technologies: ["Flutter", "React", "Python (FastAPI)", ".NET Core", "GCP", "PostgreSQL"],
  },
];
