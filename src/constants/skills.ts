export type SkillGroup = {
  category: string;
  iconName: "cloud" | "server" | "shield" | "database" | "code";
  description: string;
  items: string[];
  skills: string;
};

export const skillsData: SkillGroup[] = [
  {
    category: "Cloud & Compute",
    iconName: "cloud",
    description: "Serverless container platforms, automated build pools, and declarative cloud primitives.",
    items: [
      "Google Cloud Platform (GCP)",
      "Cloud Run (Serverless)",
      "Cloud Build (Async Pools)",
      "Docker & OCI Images",
      "GitHub Actions (Matrix CI/CD)",
      "Linux Systems",
      "VPC Private Networks",
    ],
    skills: "GCP (Cloud Run, Cloud Build, KMS, IAM, VPC), Docker, GitHub Actions, Linux",
  },
  {
    category: "Ingress & Systems",
    iconName: "server",
    description: "Low-latency reverse proxies, lock-free routing tries, circuit breakers, and streaming protocols.",
    items: [
      "Go (Golang 1.22)",
      "Radix Trie Routing (O(k))",
      "3-State Circuit Breaker",
      "Reverse Proxies",
      "HTTP/2 & gRPC Streaming",
      "WebSockets",
      "Python (FastAPI)",
      "C# (.NET Core)",
    ],
    skills: "Go (Golang), Radix Trie, Circuit Breaker, Reverse Proxies, HTTP/2, gRPC, FastAPI, .NET Core",
  },
  {
    category: "Security & Cryptography",
    iconName: "shield",
    description: "Zero-disk envelope encryption, Linux memory sandboxing, and tamper-proof audit trails.",
    items: [
      "Google Cloud KMS (DEK/KEK)",
      "AES-256-GCM In-Memory Decrypt",
      "RLIMIT_CORE = 0 (No Core Dumps)",
      "POSIX mlockall Memory Lock",
      "Google IAM OIDC Token Minting",
      "Tamper-Proof Audit Triggers",
      "RA 10173 Compliance",
    ],
    skills: "Cloud KMS, AES-256-GCM, RLIMIT_CORE=0, mlockall, IAM OIDC Token Minting, Audit Triggers, RA 10173",
  },
  {
    category: "Control Plane & Data",
    iconName: "database",
    description: "Relational routing registries, real-time invalidation buses, and sub-millisecond caching.",
    items: [
      "PostgreSQL (Row-Level Locks)",
      "LISTEN / NOTIFY Event Bus",
      "Neon Serverless Postgres",
      "Redis (<2ms In-Memory Cache)",
      "AWS S3",
      "MongoDB",
    ],
    skills: "PostgreSQL (Row-Level Locks, LISTEN/NOTIFY), Redis (<2ms In-Memory Caching), Neon, AWS S3",
  },
  {
    category: "Languages & Scripting",
    iconName: "code",
    description: "Core systems languages, backend frameworks, and infrastructure scripting.",
    items: ["Go (Golang)", "Python", "C#", "SQL", "Bash", "TypeScript", "Dart"],
    skills: "Go (Golang), Python, C#, SQL, Bash, TypeScript, Dart",
  },
];
