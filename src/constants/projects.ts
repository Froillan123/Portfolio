import { GitBranch, Server, Lock, Brain } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type ArchitectureStep = {
  label: string;
  sublabel?: string;
  protocol?: string;
};

export type Project = {
  id: string;
  title: string;
  tier: string;
  subtitle: string;
  bullets: string[];
  technologies: string[];
  link?: string;
  linkLabel?: string;
  icon: LucideIcon;
  mermaidChart: string;
  architectureFlow: string[];
  architectureSteps: ArchitectureStep[];
  architectureSummary: string;
  securityGuarantees: string[];
  problemSolved: {
    problem: string;
    solution: string;
    impact: string;
  };
};

export const ecosystemOverview = {
  title: "FaceOfMind Cloud Infrastructure Ecosystem",
  subtitle: "A unified, production-grade cloud ecosystem architected from scratch on Google Cloud.",
  description:
    "Rather than a monolithic application, FaceOfMind was engineered as an enterprise-grade cloud ecosystem. Built with dedicated modular tiers for ingress routing, cryptographic secret management, declarative GitOps automation, and containerized microservices on Google Cloud Run.",
  mermaidChart: `flowchart TD
    subgraph IngressTier["Ingress & Clients"]
        Clients["Flutter & React Clients"] -->|HTTPS / WSS| Gateway["Custom Go API Gateway"]
        Git["Developer Git Push"] -->|Matrix Diff Filter| GitOps["GitOps CI/CD Pipeline"]
    end

    subgraph WorkloadTier["Cloud Run Workloads"]
        GitOps -->|Parallel Deploy| Workloads["Microservices: FastAPI & .NET Core"]
        Gateway -->|OIDC Token Exchange| Workloads
    end

    subgraph DataSecurity["Data & Security Tier"]
        Workloads -->|Runtime Secrets| Vault["KMS-Backed Secret Vault"]
        Vault -->|Decrypted Scopes| Workloads
        Workloads -->|Encrypted Relational Data| DB["Managed Cloud SQL PostgreSQL"]
    end`,
  subsystems: [
    { name: "Custom Go API Gateway", role: "Ingress & Routing Tier", icon: Server },
    { name: "KMS-Backed Secret Vault", role: "Cryptographic & Security Tier", icon: Lock },
    { name: "GitOps Internal Developer Platform", role: "Deployment & CI/CD Tier", icon: GitBranch },
    { name: "FaceOfMind Multi-Service Core", role: "Application & Workloads Tier", icon: Brain },
  ],
  topology: [
    "Clients (Flutter / React)",
    "Go API Gateway",
    "Cloud Run Microservices",
    "KMS Secret Vault",
    "PostgreSQL & Cloud SQL",
  ],
};

export const projects: Project[] = [
  {
    id: "gitops-idp",
    title: "GitOps Internal Developer Platform",
    tier: "CI/CD & Deployment Tier",
    subtitle: "Automated multi-service deployment pipeline for the FaceOfMind ecosystem.",
    icon: GitBranch,
    mermaidChart: `flowchart TD
    subgraph CI["1. CI/CD Matrix Engine (GitHub Actions)"]
        Git["Developer Git Push"] --> Matrix["Matrix Diff Filter<br/>Build Only Modified Services"]
        Matrix --> Build["Cloud Build<br/>Parallel OCI Containers"]
        Build --> Registry["Google Artifact Registry"]
    end

    subgraph CD["2. Serverless Runtime (Google Cloud)"]
        Registry --> Deploy["Cloud Run Workload"]
        Deploy --> IAM["Auto IAM Least Privilege<br/>roles/run.invoker"]
        Deploy --> RegDB["PostgreSQL Service Registry"]
    end

    subgraph Routing["3. Ingress Routing"]
        RegDB -->|Dynamic Route Sync| Gateway["Custom Go API Gateway"]
    end`,
    bullets: [
      "Reduced unnecessary CI/CD work by dynamically building only modified services",
      "Automated least-privilege IAM bindings (roles/run.invoker) for every deployed service",
      "PostgreSQL-backed service registry enabling dynamic route updates without gateway restarts",
    ],
    technologies: ["GCP", "Cloud Run", "GitHub Actions", "Docker", "PostgreSQL", "IAM"],
    link: "https://github.com/Froillan123",
    linkLabel: "GitHub",
    architectureFlow: [
      "GitHub Push",
      "Actions Matrix Filter",
      "Cloud Build",
      "Artifact Registry",
      "Cloud Run",
      "Service Registry",
      "API Gateway",
    ],
    architectureSteps: [
      { label: "Git Push / PR", sublabel: "Developer Commit", protocol: "Git Hook" },
      { label: "Matrix Diff Engine", sublabel: "Filters Changed Services", protocol: "GitHub Actions" },
      { label: "Container Build", sublabel: "Parallel OCI Images", protocol: "Cloud Build" },
      { label: "Image Registry", sublabel: "Vulnerability Scanned", protocol: "Artifact Registry" },
      { label: "Cloud Run Workload", sublabel: "Isolated Microservice", protocol: "Serverless Container" },
      { label: "Service Registry", sublabel: "Dynamic Route Registration", protocol: "PostgreSQL" },
      { label: "Go API Gateway", sublabel: "Dynamic Hot-Reload", protocol: "Reverse Proxy" },
    ],
    architectureSummary:
      "The deployment subsystem for the FaceOfMind ecosystem. Parses multi-service repositories, executes dynamic matrix build filters, provisions containerized workloads to Cloud Run, binds least-privilege IAM invoker permissions, and updates the central routing registry without downtime or gateway restarts.",
    securityGuarantees: [
      "Zero public direct service exposure (all microservice traffic gated via API Gateway)",
      "Strict roles/run.invoker service-account binding per container",
      "Immutable container image tags stored in Artifact Registry",
      "Dynamic matrix ensures isolated deployment scopes per commit",
    ],
    problemSolved: {
      problem: "Deploying multi-service codebases triggered slow, redundant builds for unmodified services and required manual route reconfigurations.",
      solution: "Implemented an automated Git diff matrix engine paired with a dynamic PostgreSQL service registry.",
      impact: "Eliminated unnecessary CI/CD execution time and allowed zero-restart route updates.",
    },
  },
  {
    id: "go-api-gateway",
    title: "Custom Go API Gateway",
    tier: "Ingress & Routing Tier",
    subtitle: "High-performance reverse proxy & OIDC token exchange for internal microservices.",
    icon: Server,
    mermaidChart: `flowchart TD
    subgraph Ingress["1. Ingress Tier"]
        Client["Client HTTPS / WSS / gRPC"] --> Gateway["Go Reverse Proxy Core"]
        Gateway --> Telemetry["Inject Latency Headers<br/>X-Gateway, X-Upstream, X-Total"]
    end

    subgraph RoutingAuth["2. Routing & Authentication Tier"]
        Gateway --> Trie["Longest-Prefix Route Trie"]
        Trie -->|Sync Config| DB["PostgreSQL Route Registry"]
        DB -->|Cached Routes| Trie
        Gateway --> OIDC["Google OIDC Token Exchange<br/>RSA PKCS8 Signing"]
    end

    subgraph Upstream["3. Zero-Buffer Streaming Tier"]
        Telemetry --> Stream["HTTP/2 & gRPC Trailer Streaming"]
        Stream --> CloudRun["Cloud Run Microservices"]
    end`,
    bullets: [
      "Longest-prefix dynamic routing from PostgreSQL, hot reloads without restarts",
      "OIDC token exchange with RSA PKCS8 signing and in-memory caching",
      "HTTP/2, gRPC trailers, WebSocket upgrades, zero-buffer streaming",
      "End-to-end latency headers (X-Gateway, X-Upstream, X-Total) on every request",
    ],
    technologies: ["Go (Golang)", "OIDC", "HTTP/2", "gRPC", "WebSockets", "PostgreSQL"],
    link: "https://github.com/Froillan123",
    linkLabel: "GitHub",
    architectureFlow: [
      "Client Request",
      "Go Gateway",
      "OIDC Token Exchange",
      "Route Registry Cache",
      "Upstream Microservice",
    ],
    architectureSteps: [
      { label: "Client Request", sublabel: "HTTPS / WSS / gRPC", protocol: "TLS 1.3" },
      { label: "Go API Gateway", sublabel: "Custom Reverse Proxy", protocol: "Go stdlib / fasthttp" },
      { label: "OIDC Token Engine", sublabel: "RSA PKCS8 Signing & Cache", protocol: "Google OIDC" },
      { label: "Route Matcher", sublabel: "Longest-Prefix Trie", protocol: "PostgreSQL Cache" },
      { label: "Upstream Microservice", sublabel: "Zero-Buffer Streaming", protocol: "HTTP/2 & gRPC" },
    ],
    architectureSummary:
      "The ingress subsystem of FaceOfMind. A lightweight, high-concurrency Go reverse proxy acting as the single secure entry point. Features longest-prefix dynamic route matching, automatic Google OIDC token exchange with RSA PKCS8 signing, trailer preservation for gRPC, and per-request latency telemetry injection.",
    securityGuarantees: [
      "Centralized authentication boundary stripping client headers before proxying",
      "Automated OIDC token generation ensuring microservices only accept authenticated calls",
      "Dynamic hot-reloads avoid dropped client connections during route table updates",
      "Comprehensive telemetry with X-Gateway, X-Upstream, and X-Total latency headers",
    ],
    problemSolved: {
      problem: "Managing separate authentication, CORS, rate limits, and routing across heterogeneous microservices created configuration sprawl and inconsistent security.",
      solution: "Engineered a centralized Go reverse proxy with longest-prefix route matching and automated OIDC token exchange.",
      impact: "Unified ingress security and enabled real-time route registration without dropping connections or restarting processes.",
    },
  },
  {
    id: "kms-secret-vault",
    title: "KMS-Backed Secret Vault",
    tier: "Cryptographic & Security Tier",
    subtitle: "Centralized envelope encryption secret management across all services.",
    icon: Lock,
    mermaidChart: `flowchart TD
    subgraph AppTier["1. Microservice Ingress"]
        App["Cloud Run Microservice"] -->|Scoped Key Request| VaultAPI["Secret Vault API"]
    end

    subgraph StorageCrypt["2. Envelope Cryptography & Cache"]
        VaultAPI -->|Fast Path ~2ms| Redis["Redis In-Memory Cache"]
        VaultAPI -->|Cache Miss: Fetch Ciphertext| EncDB["PostgreSQL Encrypted DB"]
        EncDB --> KMS["Google Cloud KMS<br/>DEK Unwrap Request"]
        KMS --> Decrypt["In-Memory AES-256-GCM Decrypt"]
    end

    subgraph AuditTier["3. Telemetry & Response"]
        Decrypt --> Audit["Structured Audit Trail"]
        Decrypt -->|Decrypted Secret| App
    end`,
    bullets: [
      "AES-256-GCM envelope encryption with GCP KMS DEK wrapping at rest",
      "Reduced developer bootstrap from 30+ .env keys to 2 environment variables",
      "Service-isolated secret scoping and IAM-based access control",
      "90-day cryptographic key rotation and structured security audit logging",
    ],
    technologies: ["GCP KMS", "AES-256-GCM", "PostgreSQL", "Redis", "IAM"],
    link: "https://github.com/Froillan123",
    linkLabel: "GitHub",
    architectureFlow: [
      "Microservice App",
      "Redis Cache (~2ms)",
      "Secret Service API",
      "GCP KMS (DEK Wrap)",
      "Encrypted PostgreSQL",
    ],
    architectureSteps: [
      { label: "Microservice Request", sublabel: "Needs Scoped Secrets", protocol: "mTLS / IAM Auth" },
      { label: "Redis Cache Layer", sublabel: "In-Memory Decrypted Cache", protocol: "~2ms Latency" },
      { label: "Vault Engine", sublabel: "Envelope Decryption Broker", protocol: "Go / REST" },
      { label: "Google Cloud KMS", sublabel: "DEK Unwrap & Key Rotation", protocol: "KMS API" },
      { label: "Encrypted PostgreSQL", sublabel: "AES-256-GCM Ciphertext", protocol: "Encrypted at Rest" },
    ],
    architectureSummary:
      "The cryptographic secret subsystem of FaceOfMind. Employs AES-256-GCM envelope encryption where Data Encryption Keys (DEKs) are wrapped by Google Cloud KMS Key Encryption Keys (KEKs). Cached in Redis with tight TTLs to deliver ~2ms retrieval latencies with structured audit logging.",
    securityGuarantees: [
      "Envelope encryption ensures plaintext secrets and DEKs never persist unencrypted to disk",
      "Service-isolated scoping prevents cross-tenant secret leakage across microservices",
      "Automated 90-day cryptographic key rotation policy with legacy DEK re-wrap capability",
      "Structured audit trails logging every access, rotation, and decryption event",
    ],
    problemSolved: {
      problem: "Developers managed over 30+ scattered plaintext .env keys across services, leading to credential leaks, inconsistent rotation, and slow onboarding.",
      solution: "Built a centralized envelope encryption service utilizing GCP KMS and Redis caching.",
      impact: "Reduced developer bootstrap configuration from 30+ keys to 2 environment variables while maintaining ~2ms secret access latency.",
    },
  },
  {
    id: "faceofmind-platform",
    title: "FaceOfMind Multi-Service Core",
    tier: "Application & Workloads Tier",
    subtitle: "Containerized microservices (FastAPI & .NET Core) with Flutter and React clients.",
    icon: Brain,
    mermaidChart: `flowchart TD
    subgraph Clients["Frontend Clients"]
        Mobile["Flutter Mobile App"]
        Web["React Clinician Portal"]
    end

    subgraph IngressTier["Ingress & Cryptography"]
        Gateway["Custom Go API Gateway"]
        KMSVault["KMS-Backed Secret Vault"]
    end

    subgraph Workloads["Cloud Run Container Workloads"]
        FastAPI["Python FastAPI<br/>AI & Mood Analysis"]
        DotNet[".NET Core API<br/>Clinical & Auth Logic"]
    end

    subgraph DataTier["Data & Cloud Storage"]
        CloudSQL["Cloud SQL PostgreSQL"]
    end

    Mobile --> Gateway
    Web --> Gateway
    Gateway -->|OIDC Auth| FastAPI
    Gateway -->|OIDC Auth| DotNet
    FastAPI -->|Runtime Secrets| KMSVault
    DotNet -->|Runtime Secrets| KMSVault
    FastAPI --> CloudSQL
    DotNet --> CloudSQL`,
    bullets: [
      "Architected a multi-service platform using Flutter, React, FastAPI, and .NET Core",
      "Deployed backend services on Google Cloud with containerized workloads and managed PostgreSQL",
      "Implemented service-to-service authentication, encrypted data handling, and centralized API routing",
    ],
    technologies: ["GCP", "Cloud Run", "Python (FastAPI)", ".NET Core", "PostgreSQL", "Flutter", "React"],
    link: "https://www.faceofmind.com/",
    linkLabel: "Live Site",
    architectureFlow: [
      "Flutter / React Clients",
      "Go API Gateway",
      "Cloud Run Microservices",
      "KMS Secret Vault",
      "Managed PostgreSQL",
    ],
    architectureSteps: [
      { label: "Client Applications", sublabel: "Flutter Mobile & React Web", protocol: "HTTPS / WSS" },
      { label: "Central API Gateway", sublabel: "Ingress & OIDC Token Exchange", protocol: "Reverse Proxy" },
      { label: "FastAPI (.NET Core)", sublabel: "Stateless Microservices", protocol: "GCP Cloud Run" },
      { label: "KMS Secret Vault", sublabel: "Runtime Secret Scoping", protocol: "Redis Cache" },
      { label: "Managed PostgreSQL", sublabel: "Encrypted Relational Data", protocol: "Cloud SQL" },
    ],
    architectureSummary:
      "The application workload tier of FaceOfMind. Hosts specialized backend services (FastAPI for AI workloads, .NET Core for business logic) on Google Cloud Run behind the Go API Gateway with centralized secret management and managed PostgreSQL.",
    securityGuarantees: [
      "Microservices isolated in private network contexts behind the API Gateway",
      "Encrypted data handling at rest and in transit for sensitive health records",
      "Dynamic secret injection at container startup with automated key rotation",
      "Automated CI/CD build matrix deploying container images to Cloud Run",
    ],
    problemSolved: {
      problem: "Coordinating multiple frontend clients (mobile & web) with distinct backend stacks (FastAPI for AI workloads, .NET Core for business logic) without architectural fragmentation.",
      solution: "Designed a clean microservices architecture on Cloud Run tied together by a custom Go API Gateway and centralized secret management.",
      impact: "Delivered a reliable, scalable multi-service production architecture with unified authentication and zero-restart routing.",
    },
  },
];
