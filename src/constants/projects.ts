import { GitBranch, Server, Lock, Brain } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type Project = {
  title: string;
  subtitle: string;
  bullets: string[];
  technologies: string[];
  link?: string;
  linkLabel?: string;
  icon: LucideIcon;
};

export const projects: Project[] = [
  {
    title: "GitOps Internal Developer Platform",
    subtitle: "Automated multi-service deployment on GCP.",
    icon: GitBranch,
    bullets: [
      "Dynamic matrix CI/CD across modified services only to prevent redundant builds",
      "Automated zero-trust IAM binding (roles/run.invoker) for every deployed service",
      "PostgreSQL service registry for zero-downtime dynamic route updates",
    ],
    technologies: ["GCP", "Cloud Run", "GitHub Actions", "Docker", "PostgreSQL"],
    link: "https://github.com/Froillan123",
    linkLabel: "GitHub",
  },
  {
    title: "Custom Go API Gateway",
    subtitle: "Single secure entry point for all internal microservices.",
    icon: Server,
    bullets: [
      "Longest-prefix dynamic routing from PostgreSQL, hot reloads without restarts",
      "OIDC token exchange with RSA PKCS8 signing and in-memory caching",
      "HTTP/2, gRPC trailers, WebSocket upgrades, zero-buffer streaming",
      "End-to-end latency headers (X-Gateway, X-Upstream, X-Total) on every request",
    ],
    technologies: ["Go", "OIDC", "HTTP/2", "gRPC", "WebSockets", "PostgreSQL"],
    link: "https://github.com/Froillan123",
    linkLabel: "GitHub",
  },
  {
    title: "Zero-Trust KMS Secret Vault",
    subtitle: "Centralized envelope encryption secret management.",
    icon: Lock,
    bullets: [
      "AES-256-GCM envelope encryption with GCP KMS DEK wrapping at rest",
      "Reduced developer bootstrap from 30+ .env keys to 2 environment variables",
      "Service-isolated secret scoping and ~2ms Redis caching for high throughput",
      "90-day cryptographic key rotation and SOC 2-aligned audit logging",
    ],
    technologies: ["GCP KMS", "AES-256-GCM", "PostgreSQL", "Redis", "SOC 2"],
    link: "https://github.com/Froillan123",
    linkLabel: "GitHub",
  },
  {
    title: "FaceOfMind Platform",
    subtitle: "AI-powered mental health & emotional wellness ecosystem.",
    icon: Brain,
    bullets: [
      "Cross-platform mobile app in Flutter with daily mood tracking and check-ins",
      "Clinician dashboard in React for licensed psychologists to monitor patient trends",
      "Microservice APIs in Python (FastAPI) and .NET Core deployed on Google Cloud",
    ],
    technologies: ["Flutter", "React", "Python (FastAPI)", ".NET Core", "GCP", "PostgreSQL"],
    link: "https://www.faceofmind.it.com/",
    linkLabel: "Live Site",
  },
];
