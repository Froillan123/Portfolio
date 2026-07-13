/** Devicon CDN — reliable fallbacks when simple-icons CDN misses a slug */
const DEVICON = "https://cdn.jsdelivr.net/gh/devicons/devicon/icons";

export type SkillItem = {
  name: string;
  icon?: string;
  iconUrl?: string;
};

const LOGO_COLOR = "64748b";

export function getSkillIconSrc(item: SkillItem): string | undefined {
  if (item.iconUrl) return item.iconUrl;
  if (item.icon) return `https://cdn.simpleicons.org/${item.icon}/${LOGO_COLOR}`;
  return undefined;
}

export type SkillDepthId = "strong" | "familiar" | "exposed";

export type SkillDepthTier = {
  id: SkillDepthId;
  title: string;
  description: string;
  items: SkillItem[];
};

/**
 * Tiers aligned to FaceofMind repo usage (Client/, Server/, infrastructure/, .github/).
 * One entry per skill — no duplicates across tiers.
 */
export const skillDepthTiers: SkillDepthTier[] = [
  {
    id: "strong",
    title: "Strong",
    description:
      "Daily drivers on FaceofMind: mobile app, web portals, Python APIs, .NET services, GCP, and CI.",
    items: [
      { name: "Python", icon: "python" },
      { name: "TypeScript / JavaScript", icon: "typescript" },
      { name: "React", icon: "react" },
      { name: "Flutter", icon: "flutter" },
      { name: "FastAPI", icon: "fastapi" },
      { name: "C# / .NET", iconUrl: `${DEVICON}/csharp/csharp-original.svg` },
      { name: "Google Cloud", icon: "googlecloud" },
      { name: "PostgreSQL", icon: "postgresql" },
      { name: "Docker", icon: "docker" },
      { name: "Redis", icon: "redis" },
      { name: "Tailwind CSS", icon: "tailwindcss" },
      { name: "GitHub Actions", icon: "githubactions" },
    ],
  },
  {
    id: "familiar",
    title: "Familiar",
    description: "Production features I’ve shipped: AI/RAG and targeted AWS APIs.",
    items: [
      { name: "Gemini API", icon: "googlegemini" },
      { name: "LangChain", icon: "langchain" },
      { name: "RAG pipelines" },
      {
        name: "AWS Rekognition",
        iconUrl: `${DEVICON}/amazonwebservices/amazonwebservices-plain-wordmark.svg`,
      },
    ],
  },
  {
    id: "exposed",
    title: "Exposed",
    description: "Present in the stack; not my main day-to-day depth yet.",
    items: [
      { name: "Kubernetes", icon: "kubernetes" },
      { name: "Terraform", icon: "terraform" },
      {
        name: "AWS",
        iconUrl: `${DEVICON}/amazonwebservices/amazonwebservices-plain-wordmark.svg`,
      },
      { name: "MongoDB", icon: "mongodb" },
      { name: "Firebase / Firestore", icon: "firebase" },
    ],
  },
];
