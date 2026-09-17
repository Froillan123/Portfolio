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
  title: "FaceOfMind Platform & Cloud Architecture",
  subtitle: "A distributed, serverless developer platform architected from scratch on Google Cloud.",
  description:
    "Built as a self-taught, end-to-end platform engineering project by a 2026 graduate. FaceOfMind decomposes complex multi-service infrastructure into modular tiers: a custom Go Radix Trie API gateway, a declarative GitOps matrix control plane, zero-disk envelope encryption vaults, and private Cloud Run workloads.",
  mermaidChart: `flowchart TD
    subgraph IngressTier["1. Ingress & Gateway Control Plane"]
        Clients["Flutter & React Clients"] -->|HTTPS / WSS| Gateway["Go API Gateway - Radix Trie"]
        Git["Git Push / PR"] -->|service.yaml Matrix Filter| GitOps["Declarative GitOps Engine"]
    end

    subgraph WorkloadTier["2. Private Serverless Workloads"]
        GitOps -->|Async Cloud Build Deploy| Workloads["Private Cloud Run: FastAPI & .NET Core"]
        Gateway -->|Google IAM OIDC Token Exchange| Workloads
    end

    subgraph SecurityTier["3. Cryptography & Memory Sandboxing"]
        Workloads -->|In-Memory Scoped DEK| KMSVault["Cloud KMS Secret Vault"]
        KMSVault -->|AES-256-GCM in RAM: RLIMIT_CORE=0| Workloads
    end

    subgraph DataTier["4. Database Control Plane"]
        Gateway -->|LISTEN / NOTIFY Route Cache| DB["Neon / Cloud SQL PostgreSQL"]
        GitOps -->|ACID Route Upsert & Audit Trigger| DB
    end`,
  subsystems: [
    { name: "GitOps Internal Developer Platform", role: "CI/CD & Control Plane Tier", icon: GitBranch },
    { name: "Zero-Trust Go API Gateway", role: "Ingress & Routing Tier", icon: Server },
    { name: "Zero-Disk KMS Secret Vault", role: "Security & Cryptography Tier", icon: Lock },
    { name: "FaceOfMind Multi-Service Core", role: "Application & Workloads Tier", icon: Brain },
  ],
  topology: [
    "Clients (Flutter / React)",
    "Go Radix Trie Gateway",
    "Private Cloud Run Workloads",
    "Cloud KMS Secret Vault",
    "PostgreSQL & LISTEN/NOTIFY",
  ],
};

export const projects: Project[] = [
  {
    id: "gitops-idp",
    title: "GitOps Internal Developer Platform",
    tier: "CI/CD & Control Plane Tier",
    subtitle: "Declarative, metadata-driven deployment engine for multi-service repositories.",
    icon: GitBranch,
    mermaidChart: `flowchart TD
    subgraph Manifest["1. Declarative Contract"]
        Dev["Developer Git Push"] --> ManifestFile["service.yaml and client.yaml<br/>Location-Derived Manifests"]
        ManifestFile --> Diff["discover_changed_services.py<br/>Git Commit Range Diff"]
    end

    subgraph CI["2. Asynchronous Build Matrix"]
        Diff --> Matrix["Parallel Matrix Runner"]
        Matrix --> CloudBuild["Google Cloud Build Async<br/>Quota-Safe Polling"]
        CloudBuild --> Registry["Artifact Registry"]
    end

    subgraph CD["3. Reconcile & Control Plane Sync"]
        Registry --> Deploy["Cloud Run Rollout<br/>Private Ingress Only"]
        Deploy --> IAM["Auto-Bind IAM Service Account"]
        Deploy --> ACID["ACID Route Upsert<br/>Append-Only Audit Trigger"]
    end`,
    bullets: [
      "Replaced bespoke CI/CD scripts with declarative manifests (service.yaml & client.yaml) using location-derived dynamic path discovery",
      "Calculated Git diffs per commit range in Python to build and deploy only modified microservices in parallel GitHub Actions matrix runners",
      "Automated least-privilege IAM service account bindings and ACID route synchronization with PostgreSQL row-level locks",
    ],
    technologies: ["Google Cloud", "Cloud Run", "Cloud Build", "GitHub Actions", "Python", "Docker", "PostgreSQL"],
    link: "https://github.com/Froillan123",
    linkLabel: "GitHub",
    architectureFlow: [
      "Developer Git Push",
      "Manifest Diff Scanner",
      "Cloud Build Matrix",
      "Artifact Registry",
      "Private Cloud Run",
      "ACID Route Registry",
      "Go Gateway NOTIFY",
    ],
    architectureSteps: [
      { label: "Git Commit / PR", sublabel: "Monorepo Code Push", protocol: "Git Hook" },
      { label: "Manifest Discovery", sublabel: "service.yaml Location-Derived", protocol: "Python script" },
      { label: "Async Cloud Build", sublabel: "Parallel Container Images", protocol: "Cloud Build API" },
      { label: "Artifact Registry", sublabel: "Vulnerability Scanned", protocol: "OCI Image" },
      { label: "Cloud Run Workload", sublabel: "Private --no-allow-unauthenticated", protocol: "Serverless Container" },
      { label: "ACID Route Sync", sublabel: "Row-Level Locked Upsert", protocol: "PostgreSQL" },
      { label: "Gateway Cache Sync", sublabel: "Instant Invalidation", protocol: "pg_notify Bus" },
    ],
    architectureSummary:
      "The GitOps deployment control plane of FaceOfMind. Rather than writing duplicate GitHub Actions YAML per service, developers define compute, routing, and secrets in a declarative service.yaml manifest. The engine computes commit-range diffs, builds modified services asynchronously on Google Cloud Build, provisions private Cloud Run instances, and atomically updates the route table.",
    securityGuarantees: [
      "Zero public direct service exposure (all microservices deploy with --no-allow-unauthenticated)",
      "Strict dedicated IAM service accounts attached per container workload",
      "Tamper-proof audit trigger blocking UPDATE, DELETE, and TRUNCATE on deployment logs",
      "Atomic route-ownership checks preventing accidental route prefix collisions or hijacking",
    ],
    problemSolved: {
      problem: "Managing dozens of microservices created fragile, sprawling CI/CD YAML files where renaming a folder broke deployment scripts, and unmodified services were wastefully rebuilt.",
      solution: "Engineered a declarative manifest standard (service.yaml / client.yaml) paired with a location-derived Python Git diff engine and asynchronous Cloud Build runner.",
      impact: "Reduced CI execution time by skipping unchanged services and eliminated manual pipeline scripting across all microservices.",
    },
  },
  {
    id: "go-api-gateway",
    title: "Zero-Trust Go API Gateway Proxy",
    tier: "Ingress & Routing Tier",
    subtitle: "High-performance reverse proxy with Radix Trie routing, Circuit Breakers, and IAM OIDC signing.",
    icon: Server,
    mermaidChart: `flowchart TD
    subgraph Ingress["1. Ingress & Traffic Routing"]
        Client["Client HTTPS / WSS"] --> Gateway["Go API Gateway - Under 25MB RAM"]
        Gateway --> RadixTrie["Lock-Free Radix Trie<br/>O(k) Path Matching"]
    end

    subgraph Resiliency["2. Fault Tolerance & Telemetry"]
        RadixTrie --> CircuitBreaker["3-State Circuit Breaker<br/>CLOSED / HALF-OPEN / OPEN"]
        CircuitBreaker --> LatencyHeaders["Inject Telemetry<br/>X-Gateway & X-Upstream Latency"]
    end

    subgraph ZeroTrust["3. IAM Identity Assertion"]
        LatencyHeaders --> OIDC["Google Cloud Metadata Server<br/>Mint Signed IAM OIDC Token"]
        OIDC -->|Bearer Token Auth| CloudRun["Private Cloud Run Backend"]
    end`,
    bullets: [
      "Lock-free Radix Trie router delivering sub-millisecond O(k) path matching with zero heap allocations during lookup",
      "3-State in-memory Circuit Breaker (CLOSED, HALF-OPEN, OPEN) with exponential backoff to prevent cascading microservice failures",
      "Automated Google IAM OIDC token minting via Cloud Metadata server, allowing public gateway to securely invoke private Cloud Run backends",
      "Zero-redeploy route table synchronization via PostgreSQL LISTEN/NOTIFY with local atomic pointer swaps (sync.Map / Radix tree)",
    ],
    technologies: ["Go (Golang 1.22)", "Google Cloud IAM", "Cloud Run", "Radix Trie", "HTTP/2", "gRPC", "PostgreSQL"],
    link: "https://github.com/Froillan123",
    linkLabel: "GitHub",
    architectureFlow: [
      "Client Request",
      "Radix Trie Match",
      "Circuit Breaker Guard",
      "IAM OIDC Token Mint",
      "Private Cloud Run",
    ],
    architectureSteps: [
      { label: "Client HTTPS / WSS", sublabel: "Public Traffic Ingress", protocol: "TLS 1.3" },
      { label: "Radix Trie Lookup", sublabel: "O(k) Path Matching in RAM", protocol: "Go / Lock-Free" },
      { label: "Circuit Breaker Check", sublabel: "3-State Failure Protection", protocol: "In-Memory State" },
      { label: "IAM OIDC Token Mint", sublabel: "Google Metadata Server Auth", protocol: "RS256 JWT" },
      { label: "Upstream Proxying", sublabel: "Zero-Buffer HTTP/2 & gRPC", protocol: "Cloud Run Mesh" },
    ],
    architectureSummary:
      "A lightweight, custom Go reverse proxy acting as the single secure public entry point for FaceOfMind. Built with an in-memory Radix Trie router, a 3-state circuit breaker, and automatic Google IAM OIDC token minting. Consumes less than 25MB RAM on Cloud Run, booting in sub-second time without the resource tax or cold-start latency of heavy service meshes like Istio.",
    securityGuarantees: [
      "Centralized ingress boundary stripping untrusted client headers before proxying",
      "Mints short-lived Google IAM OIDC tokens on-the-fly for private backend access",
      "Zero-redeploy route updates without dropped connections using atomic pointer swaps",
      "End-to-end latency telemetry injection (X-Gateway-Latency, X-Upstream-Latency)",
    ],
    problemSolved: {
      problem: "Exposing microservices directly to the internet is unsafe, while heavy service meshes like Istio add 100MB+ RAM per container and 30s cold starts that violate serverless economics.",
      solution: "Engineered a custom Go proxy combining Radix Trie routing, circuit breaking, Google IAM token exchange, and PostgreSQL LISTEN/NOTIFY invalidation in a <25MB binary.",
      impact: "Delivered sub-millisecond routing overhead, zero-redeploy route sync, and robust cascading failure protection on serverless compute.",
    },
  },
  {
    id: "kms-secret-vault",
    title: "Zero-Disk KMS Secret Vault & Memory Sandbox",
    tier: "Security & Cryptography Tier",
    subtitle: "In-memory envelope encryption with Google Cloud KMS and Linux crash dump prevention.",
    icon: Lock,
    mermaidChart: `flowchart TD
    subgraph Request["1. Microservice Boot"]
        App["Cloud Run Container"] --> ConfigBoot["In-Memory Bootstrap"]
    end

    subgraph Crypto["2. In-Memory Envelope Decryption"]
        ConfigBoot --> KMS["Google Cloud KMS<br/>DEK Unwrap Request"]
        KMS --> AESGCM["AES-256-GCM In-Memory Decrypt<br/>Zero Disk I/O"]
        AESGCM --> Settings["Ingest Directly into RAM Settings"]
    end

    subgraph Sandboxing["3. Linux Memory Sandboxing"]
        Settings --> RLimit["RLIMIT_CORE = 0<br/>Disable Crash Memory Dumps"]
        Settings --> MLock["POSIX mlockall()<br/>Prevent Disk Swap Leakage"]
        Settings --> AuditLog["Append-Only Audit Vault<br/>Tamper-Proof Trigger"]
    end`,
    bullets: [
      "Zero-disk AES-256-GCM envelope encryption: Data Encryption Keys (DEKs) decrypted via Cloud KMS strictly in volatile RAM with zero file persistence",
      "Enforced Linux OS memory sandboxing: set RLIMIT_CORE=0 to prevent sensitive memory keys from being dumped to disk during application crashes",
      "Implemented POSIX mlockall memory page locking to prevent secrets in RAM from being swapped to unencrypted virtual memory",
      "Built tamper-proof PostgreSQL audit vault protected by database triggers that reject all UPDATE, DELETE, and TRUNCATE attempts",
    ],
    technologies: ["Google Cloud KMS", "AES-256-GCM", "Python (Pydantic)", "Linux (POSIX)", "PostgreSQL", "Redis"],
    link: "https://github.com/Froillan123",
    linkLabel: "GitHub",
    architectureFlow: [
      "Container Boot",
      "KMS DEK Unwrap",
      "In-Memory AES-256-GCM",
      "RLIMIT_CORE=0 Lock",
      "RAM Settings Injection",
    ],
    architectureSteps: [
      { label: "Container Startup", sublabel: "Pydantic Settings Init", protocol: "Python / Go" },
      { label: "Cloud KMS Decrypt", sublabel: "Unwrap 32-Byte DEK", protocol: "Google KMS API" },
      { label: "AES-256-GCM Decrypt", sublabel: "Payload Decrypted in RAM", protocol: "Volatile Memory" },
      { label: "RLIMIT_CORE = 0", sublabel: "Disable Crash Core Dumps", protocol: "Linux resource" },
      { label: "POSIX mlockall", sublabel: "Lock Memory Pages in RAM", protocol: "ctypes / libc" },
    ],
    architectureSummary:
      "The cryptographic secret and memory sandboxing subsystem of FaceOfMind. Eliminates plaintext .env and disk cache files by decrypting Data Encryption Keys (DEKs) via Google Cloud KMS directly in volatile RAM. Combines Linux OS-level defenses (RLIMIT_CORE=0 to block crash memory dumps) with an append-only PostgreSQL audit vault.",
    securityGuarantees: [
      "Zero disk I/O for plaintext secrets or decrypted Data Encryption Keys",
      "Crash dump suppression (RLIMIT_CORE=0) prevents memory extraction on container failure",
      "POSIX memory page locking (mlockall) prevents unencrypted paging to virtual disk swap",
      "Database trigger trg_prevent_audit_log_tampering enforces strict append-only audit trail",
    ],
    problemSolved: {
      problem: "Writing decrypted API keys and database credentials to disk or .env files exposes them to local file inclusion, accidental commits, and forensic crash dump inspection.",
      solution: "Implemented an in-memory envelope encryption bootstrap paired with Linux RLIMIT_CORE=0 and mlockall memory locking in container initialization.",
      impact: "Guaranteed 100% zero-disk secret persistence with <2ms p50 decryption access and complete crash memory dump protection.",
    },
  },
  {
    id: "faceofmind-platform",
    title: "FaceOfMind Multi-Service Core",
    tier: "Application & Workloads Tier",
    subtitle: "Distributed clinical ecosystem (FastAPI & .NET Core) running on private Cloud Run workloads.",
    icon: Brain,
    mermaidChart: `flowchart TD
    subgraph Portals["1. Frontend Portals"]
        Landing["Next.js Documentation & Landing"]
        Mobile["Flutter Mobile Client"]
        Web["React Clinician Portals"]
    end

    subgraph Ingress["2. Gateway Ingress"]
        Portals --> Gateway["Go API Gateway Proxy"]
    end

    subgraph PrivateMesh["3. Private Cloud Run Microservices"]
        Gateway -->|IAM Token| Wellness["Wellness Seeker Service: FastAPI"]
        Gateway -->|IAM Token| Auth["Auth & Identity Service: FastAPI"]
        Gateway -->|IAM Token| Admin["Admin & Metrics Service: FastAPI"]
        Gateway -->|IAM Token| Clinical["Clinical Core: .NET Core"]
    end

    subgraph Data["4. Relational & Caching Tier"]
        PrivateMesh --> CloudSQL["PostgreSQL: Cloud SQL / Neon"]
        PrivateMesh --> Redis["Redis In-Memory Cache"]
    end`,
    bullets: [
      "Engineered a distributed clinical ecosystem spanning 10+ microservices and multiple frontend portals (Next.js, React, Flutter)",
      "Isolated all backend microservices inside private Google Cloud Run containers without public IP addresses, accessible only via the Go gateway",
      "Enforced service-isolated database schemas, Argon2id password hashing, and RS256 JWT authentication across all service boundaries",
    ],
    technologies: ["Google Cloud", "Cloud Run", "Python (FastAPI)", "C# (.NET Core)", "PostgreSQL", "Next.js", "Flutter", "React"],
    link: "https://www.faceofmind.com/",
    linkLabel: "Live Site",
    architectureFlow: [
      "Frontend Clients",
      "Go Radix Gateway",
      "IAM Authenticated Hop",
      "Private Cloud Run",
      "Encrypted PostgreSQL",
    ],
    architectureSteps: [
      { label: "Frontend Portals", sublabel: "Next.js, Flutter, React", protocol: "HTTPS / WSS" },
      { label: "Go API Gateway", sublabel: "Radix Trie Route Resolution", protocol: "TLS 1.3" },
      { label: "IAM OIDC Injection", sublabel: "Workload Identity Token", protocol: "Google IAM" },
      { label: "Private Microservice", sublabel: "Stateless Container Workload", protocol: "Cloud Run" },
      { label: "Relational Persistence", sublabel: "Encrypted Relational Data", protocol: "PostgreSQL" },
    ],
    architectureSummary:
      "The application and workloads tier of FaceOfMind. Connects multiple frontend portals to isolated backend microservices (FastAPI for AI workloads and auth, .NET Core for clinical workflows) on private Google Cloud Run instances. Unifies authentication, encryption, and routing behind the Go API Gateway.",
    securityGuarantees: [
      "Microservices deployed with internal ingress only, eliminating public IP attack surfaces",
      "Service-to-service calls authenticated using Google-signed IAM OIDC identity tokens",
      "Strict data isolation across clinical records and authentication stores",
      "Zero-downtime routing and hot reloads without container restarts",
    ],
    problemSolved: {
      problem: "Coordinating heterogeneous frontend clients (mobile & web) with distinct backend stacks (FastAPI for AI, .NET Core for business logic) without architectural fragmentation or public microservice exposure.",
      solution: "Designed a clean serverless microservice architecture on Cloud Run gated entirely behind a zero-trust Go API Gateway.",
      impact: "Delivered a scalable, secure multi-service production architecture with unified authentication and sub-millisecond route resolution.",
    },
  },
];
