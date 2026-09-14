export type SkillGroup = {
  category: string;
  skills: string;
};

export const skillsData: SkillGroup[] = [
  {
    category: "Cloud",
    skills: "GCP (Cloud Run, Cloud Build, KMS, IAM, VPC, Secret Manager)",
  },
  {
    category: "DevOps",
    skills: "Docker, GitHub Actions, GitOps, CI/CD, dynamic matrix builds",
  },
  {
    category: "Architecture",
    skills: "Microservices, API gateway design, reverse proxy, gRPC/HTTP2, WebSockets, SSE",
  },
  {
    category: "Security",
    skills: "Zero-trust IAM, OIDC token exchange, RSA/JWT, AES-256-GCM, KMS, SOC 2-aligned",
  },
  {
    category: "Languages",
    skills: "Go (Golang), Python, C# (.NET Core), SQL, Dart, TypeScript",
  },
  {
    category: "Databases",
    skills: "PostgreSQL, Redis, MongoDB, AWS S3",
  },
];
