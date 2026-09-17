export const chatbotResponses: { [key: string]: string } = {
  hi: "Hello! I'm Froillan's portfolio assistant. Feel free to ask about his platform engineering projects, custom Go API gateway, zero-disk KMS vault, GitOps pipelines, or open roles!",
  hello: "Hi there! How can I help you explore Froillan's platform engineering and cloud architecture work?",
  hey: "Hey! What would you like to know about Froillan's self-taught platform engineering journey, Go gateway, or cloud security audit?",
  about:
    "Froillan Kim B. Edem is a self-taught Platform & Cloud Systems Engineer and fresh graduate (B.S. IT, University of Cebu, 2026). He built the FaceOfMind platform infrastructure from scratch: engineering a custom Go Radix Trie API gateway, declarative GitOps deployment manifests, and zero-disk envelope encryption on Google Cloud.",
  roles:
    "Froillan is open to entry-level to mid roles:\n• Junior / Associate Platform Engineer\n• Cloud & Infrastructure Engineer\n• DevOps / SRE Engineer\n• Backend Systems Engineer (Go/Python)",
  skills:
    "Core Platform Capabilities:\n• Ingress & Systems: Go (Golang 1.22), Lock-free Radix Trie (O(k) routing), 3-State Circuit Breakers, Reverse Proxies, HTTP/2 & gRPC, FastAPI, .NET Core\n• Cloud & Compute: Google Cloud Run (Private Ingress), Cloud Build, Docker OCI images, VPC Networks, Linux OS\n• Declarative GitOps: Location-derived service.yaml & client.yaml, Python commit-diff matrix engines, GitHub Actions\n• Security & Crypto: Google Cloud KMS (DEK/KEK), in-memory AES-256-GCM, Linux RLIMIT_CORE=0, mlockall, Google IAM OIDC token minting, tamper-proof audit triggers\n• Control Plane & Data: PostgreSQL (Row-Level Locking, LISTEN/NOTIFY), Redis (<2ms caching), Neon Serverless",
  istio:
    "Why custom Go Gateway instead of Istio?\n1. Sidecar Tax: Istio Envoy sidecars consume 50-150MB RAM per container. For 20 microservices with replicas, that's 10GB+ RAM. Froillan's Go Gateway runs as a single <25MB binary for the whole ingress tier.\n2. Serverless Cold Starts: Istio control planes take 15-30s to initialize, incompatible with Cloud Run's sub-second scale-to-zero model.\n3. Istio-Parity in Go: Froillan implemented the critical features in Go: Radix Trie routing, circuit breaking, Google IAM OIDC tokens, and PostgreSQL LISTEN/NOTIFY zero-redeploy invalidation.",
  security:
    "During an OJT internship at a Philippine real estate platform, what began as a routine AWS cost optimization audit evolved into an authorized security assessment after discovering public S3 buckets exposing sensitive documents (PRC licenses, financial records). Froillan identified 15+ vulnerabilities across cloud storage, IAM policies, and VPC routing, authoring a remediation plan aligned with RA 10173 (client name confidential per NDA).",
  experience:
    "1. Platform Engineer & Creator at FaceOfMind Infrastructure (2025 - 2026): Self-taught distributed systems deep dive: built custom Go Radix Trie API gateway, declarative GitOps control plane, and zero-disk KMS vault on GCP.\n2. Cloud Security Assessment (Internship Side-Project) at Philippine Real Estate Platform (Jan 2026 - Mar 2026): Discovered 15+ vulnerabilities during an AWS cost audit and authored RA 10173 remediation report.",
  assessment:
    "During an OJT internship at a Philippine real estate platform, Froillan discovered public S3 buckets exposing sensitive customer documents while auditing AWS infrastructure costs. He identified 15+ vulnerabilities across storage permissions, IAM wildcard policies, and VPC configs, authoring a remediation report aligned with RA 10173 presented directly to leadership (under NDA).",
  projects:
    "FaceOfMind Platform Infrastructure Architecture:\n1. Ingress & Routing: Zero-Trust Go API Gateway (Radix Trie router with O(k) path matching, 3-state circuit breaker, Google IAM OIDC token minting)\n2. CI/CD & Control Plane: GitOps Internal Developer Platform (declarative service.yaml / client.yaml, dynamic matrix diff, async Cloud Build)\n3. Security & Cryptography: Zero-Disk KMS Vault (AES-256-GCM in-memory decrypt, Linux RLIMIT_CORE=0 crash dump suppression, append-only PostgreSQL audit trigger)\n4. Application Workloads: Multi-Service Core (Private Cloud Run microservices in FastAPI and .NET Core behind the Go gateway)",
  gateway:
    "The Go API Gateway is the public ingress proxy for FaceOfMind: a custom Go reverse proxy with an in-memory Radix Trie router delivering O(k) path matching. It features a 3-state circuit breaker (CLOSED/HALF-OPEN/OPEN), automatic Google IAM OIDC token minting for private Cloud Run backends, and sub-5ms zero-redeploy route synchronization via PostgreSQL LISTEN/NOTIFY.",
  vault:
    "The Zero-Disk KMS Secret Vault decrypts Data Encryption Keys (DEKs) via Google Cloud KMS directly in volatile RAM using AES-256-GCM. Plaintext keys are never written to disk or .env files. On Linux, it enforces RLIMIT_CORE=0 to prevent memory dumps during crashes and mlockall to stop memory paging to unencrypted swap, with an append-only PostgreSQL audit trigger.",
  gitops:
    "The GitOps IDP is a declarative deployment engine: microservices declare CPU, memory, secrets, and routes in a service.yaml manifest. A Python engine calculates commit-range diffs using location-derived paths to build only modified services in parallel GitHub Actions matrix runners, deploying to private Cloud Run with automated IAM bindings.",
  faceofmind:
    "FaceOfMind is Froillan's self-taught platform engineering project and university capstone (University of Cebu, 2026). It demonstrates full-stack platform architecture: custom Go reverse proxy, declarative GitOps manifest engine, zero-disk KMS envelope encryption, and private serverless microservices.",
  philosophy:
    "Engineering Focus:\n1. Declarative Metadata-Driven Automation (service.yaml manifests, dynamic matrix)\n2. Zero-Trust Service Isolation (Private Cloud Run, IAM OIDC tokens)\n3. Zero-Disk In-Memory Secret Lifecycle (Cloud KMS, Linux RLIMIT_CORE=0)\n4. Simplicity Over Bloat (Lightweight Go Gateway instead of heavy Istio sidecars)\n5. ACID State Synchronization & Immutability (PostgreSQL row-level locking, append-only audit triggers)",
  contact:
    "Email: froillan.edem@gmail.com · Phone: +63 9910522445 · LinkedIn: https://linkedin.com/in/froillan-kim-b-edem-5b591b252 · GitHub: https://github.com/Froillan123",
  email: "froillan.edem@gmail.com - feel free to reach out directly!",
  github: "GitHub profile: https://github.com/Froillan123",
  resume: "You can view and download Froillan's resume via the Resume button in the navigation bar or hero section.",
  help: "You can ask about: platform engineering, Go API gateway, Istio comparison, KMS secret vault, GitOps IDP, security audit, open roles, or contact info.",
  default:
    "I can share details on Froillan's platform engineering projects, custom Go API gateway, zero-disk KMS vault, GitOps IDP, security audit, open roles, or skills. What would you like to explore?",
};

export function getChatbotResponse(message: string): string {
  const lower = message.toLowerCase().trim();

  if (chatbotResponses[lower]) {
    return chatbotResponses[lower];
  }

  if (lower.includes("istio") || lower.includes("mesh") || lower.includes("sidecar") || lower.includes("envoy")) {
    return chatbotResponses["istio"];
  }
  if (lower.includes("role") || lower.includes("hire") || lower.includes("job") || lower.includes("open") || lower.includes("position") || lower.includes("grad")) {
    return chatbotResponses["roles"];
  }
  if (lower.includes("assessment") || lower.includes("real estate") || lower.includes("audit") || lower.includes("vuln")) {
    return chatbotResponses["assessment"];
  }
  if (lower.includes("security") || lower.includes("privacy") || lower.includes("10173") || lower.includes("rlimit")) {
    return chatbotResponses["security"];
  }
  if (lower.includes("gateway") || lower.includes("golang") || lower.includes("proxy") || lower.includes("radix") || lower.includes("circuit") || lower.includes("trie")) {
    return chatbotResponses["gateway"];
  }
  if (lower.includes("vault") || lower.includes("kms") || lower.includes("secret") || lower.includes("encrypt") || lower.includes("zero-disk")) {
    return chatbotResponses["vault"];
  }
  if (lower.includes("gitops") || lower.includes("pipeline") || lower.includes("matrix") || lower.includes("ci/cd") || lower.includes("manifest") || lower.includes("service.yaml")) {
    return chatbotResponses["gitops"];
  }
  if (lower.includes("faceofmind") || lower.includes("face of mind") || lower.includes("capstone") || lower.includes("platform")) {
    return chatbotResponses["faceofmind"];
  }
  if (lower.includes("philosophy") || lower.includes("focus") || lower.includes("principle") || lower.includes("pattern")) {
    return chatbotResponses["philosophy"];
  }
  if (lower.includes("skill") || lower.includes("tech") || lower.includes("stack") || lower.includes("language")) {
    return chatbotResponses["skills"];
  }
  if (lower.includes("project") || lower.includes("portfolio")) {
    return chatbotResponses["projects"];
  }
  if (lower.includes("about") || lower.includes("who") || lower.includes("background")) {
    return chatbotResponses["about"];
  }
  if (lower.includes("experience") || lower.includes("work") || lower.includes("history")) {
    return chatbotResponses["experience"];
  }
  if (lower.includes("contact") || lower.includes("email") || lower.includes("reach") || lower.includes("phone")) {
    return chatbotResponses["contact"];
  }
  if (lower.includes("github") || lower.includes("code") || lower.includes("repo")) {
    return chatbotResponses["github"];
  }
  if (lower.includes("resume") || lower.includes("cv")) {
    return chatbotResponses["resume"];
  }
  if (lower.includes("help")) {
    return chatbotResponses["help"];
  }

  return chatbotResponses["default"];
}
