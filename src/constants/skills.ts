export type SkillGroup = {
  category: string;
  skills: string;
};

export const skillsData: SkillGroup[] = [
  {
    category: "Cloud",
    skills: "GCP (Cloud Run, Cloud Build, KMS, IAM, VPC, Secret Manager, Cloud SQL)",
  },
  {
    category: "DevOps",
    skills: "Docker, GitHub Actions, GitOps, CI/CD, dynamic matrix builds, containerization",
  },
  {
    category: "Architecture",
    skills: "Microservices, API gateway design, reverse proxy, gRPC/HTTP2, WebSockets, SSE",
  },
  {
    category: "Security",
    skills: "IAM least privilege, OIDC token exchange, RSA/JWT, AES-256-GCM, GCP KMS, structured audit logging",
  },
  {
    category: "Languages",
    skills: "Go (Golang), Python, C# (.NET Core), SQL, Dart, TypeScript, Bash",
  },
  {
    category: "Databases",
    skills: "PostgreSQL, Redis, MongoDB, AWS S3",
  },
];
