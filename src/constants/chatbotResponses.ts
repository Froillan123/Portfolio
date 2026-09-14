export const chatbotResponses: { [key: string]: string } = {
  hi: "Hello! How can I help you today? Feel free to ask about my cloud platform experience, security assessments, Go API gateway, or technical projects!",
  hello: "Hi there! What would you like to know about Froillan's cloud, platform, or security engineering work?",
  hey: "Hey! What can I help you with regarding cloud infrastructure, security assessments, or DevOps pipelines?",
  about:
    "Froillan Kim B. Edem is a Cloud/Platform and Cloud Security Engineer (B.S. IT graduate from University of Cebu, 2026). He specializes in Google Cloud, GitOps dynamic matrix deployments, custom Go API gateways, IAM least privilege, and KMS envelope-encryption secret vaults. He also conducts authorized cloud security assessments.",
  skills:
    "Core Technical Stack:\n• Cloud: Google Cloud Platform (Cloud Run, Cloud Build, KMS, IAM, VPC, Secret Manager, Cloud SQL)\n• DevOps: Docker, GitHub Actions, GitOps, CI/CD, dynamic matrix builds\n• Architecture: Microservices, API gateway design, reverse proxy, gRPC/HTTP2, WebSockets, SSE\n• Security: IAM least privilege, OIDC token exchange, RSA/JWT, AES-256-GCM, GCP KMS, structured audit logging\n• Languages: Go (Golang), Python, C# (.NET Core), SQL, Dart, TypeScript\n• Databases: PostgreSQL, Redis, MongoDB, AWS S3",
  security:
    "Froillan was engaged by a Philippine real estate platform to perform an authorized cloud security assessment. He identified 15+ vulnerabilities across cloud storage permissions, IAM policies, network exposure, and database configuration, audited public cloud storage exposures, authored RA 10173 compliance remediation reports, and designed VPC private subnet & bastion host architectures (client name withheld per confidentiality agreement).",
  experience:
    "1. Cloud Security Intern – Authorized Cloud Security Assessment (Jan 2026 – Mar 2026): Engaged by a Philippine real estate platform to audit cloud infrastructure, identifying 15+ vulnerabilities and evaluating remediations against RA 10173.\n2. Platform & Cloud Security Engineer (Capstone Lead) at FaceOfMind Infrastructure (2025 – 2026): Architected GitOps CI/CD on GCP, custom Go API gateway, and KMS envelope encryption vault.",
  assessment:
    "Froillan was engaged by a Philippine real estate platform to perform an authorized security assessment of their cloud infrastructure. He identified 15+ vulnerabilities across storage permissions, IAM policies, network exposure, and database configuration, and authored remediation reports aligned with RA 10173 (client name withheld per confidentiality agreement).",
  projects:
    "FaceOfMind Cloud Infrastructure Ecosystem:\nRather than a simple app, FaceOfMind was engineered as a 4-tier cloud ecosystem on GCP:\n1. Ingress Tier: Custom Go API Gateway (dynamic routing & OIDC exchange)\n2. Security Tier: KMS-Backed Secret Vault (AES-256-GCM envelope encryption & ~2ms Redis cache)\n3. CI/CD Tier: GitOps Internal Developer Platform (dynamic matrix diff builds & Cloud Run)\n4. Workloads Tier: Multi-Service Core (FastAPI + .NET Core + Flutter/React)\n+ External Authorized Cloud Security Assessment (15+ findings)",
  gateway:
    "The Go API Gateway is the Ingress Subsystem of the FaceOfMind ecosystem: a custom reverse proxy serving as the single secure entry point for all microservices. It features longest-prefix dynamic routing from PostgreSQL, hot reloads without gateway restarts, automated Google OIDC token exchange (RSA PKCS8 signing), HTTP/2 & gRPC streaming, and latency telemetry injection.",
  vault:
    "The KMS-Backed Secret Vault is the Cryptographic Subsystem of FaceOfMind: built on PostgreSQL with AES-256-GCM envelope encryption. Data Encryption Keys (DEKs) are dynamically wrapped by GCP KMS to ensure no plaintext keys exist at rest. It features ~2ms Redis caching, service-isolated secret scoping, and structured audit trails.",
  gitops:
    "The GitOps IDP is the Deployment Subsystem of FaceOfMind: uses GitHub Actions to parse service manifests, calculate a dynamic matrix diff filter to build only modified microservices, and trigger asynchronous Cloud Build jobs—enforcing least-privilege IAM bindings (roles/run.invoker) automatically.",
  faceofmind:
    "FaceOfMind was Froillan's flagship Capstone project at the University of Cebu: an enterprise-grade cloud ecosystem on Google Cloud Platform decomposed into specialized tiers: Go Ingress Gateway, KMS Secret Vault, GitOps CI/CD, and containerized FastAPI / .NET Core microservices on Cloud Run.",
  philosophy:
    "Engineering Focus:\n1. Automate repetitive infrastructure and deployment workflows.\n2. Prefer least-privilege IAM and service isolation.\n3. Design systems that scale without unnecessary operational complexity.\n4. Treat observability, security, and failure handling as part of the architecture.\n5. Prefer managed cloud infrastructure where it reduces operational overhead.",
  contact:
    "Email: froillan.edem@gmail.com · Phone: +63 9910522445 · LinkedIn: https://tinyurl.com/yc6hd2nx · GitHub: https://github.com/Froillan123",
  email: "froillan.edem@gmail.com — feel free to reach out directly!",
  github: "GitHub profile: https://github.com/Froillan123",
  resume: "You can view and download Froillan's resume via the Resume button in the navigation bar or hero section.",
  help: "You can ask about: cloud skills, security assessment, Go API Gateway, KMS secret vault, GitOps pipelines, engineering focus, experience, or contact info.",
  default:
    "I can share details on Froillan's cloud platform projects, authorized security assessment, Go API gateway, engineering focus, skills, or contact info. What would you like to explore?",
};

export function getChatbotResponse(message: string): string {
  const lower = message.toLowerCase().trim();

  if (chatbotResponses[lower]) {
    return chatbotResponses[lower];
  }

  if (lower.includes("assessment") || lower.includes("real estate") || lower.includes("audit") || lower.includes("vuln")) {
    return chatbotResponses["assessment"];
  }
  if (lower.includes("security") || lower.includes("privacy") || lower.includes("10173")) {
    return chatbotResponses["security"];
  }
  if (lower.includes("gateway") || lower.includes("golang") || lower.includes("proxy") || lower.includes("routing")) {
    return chatbotResponses["gateway"];
  }
  if (lower.includes("vault") || lower.includes("kms") || lower.includes("secret") || lower.includes("encrypt")) {
    return chatbotResponses["vault"];
  }
  if (lower.includes("gitops") || lower.includes("pipeline") || lower.includes("matrix") || lower.includes("ci/cd") || lower.includes("cloud run")) {
    return chatbotResponses["gitops"];
  }
  if (lower.includes("faceofmind") || lower.includes("face of mind") || lower.includes("capstone")) {
    return chatbotResponses["faceofmind"];
  }
  if (lower.includes("philosophy") || lower.includes("focus") || lower.includes("principle")) {
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
  if (lower.includes("experience") || lower.includes("work") || lower.includes("history") || lower.includes("job")) {
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
