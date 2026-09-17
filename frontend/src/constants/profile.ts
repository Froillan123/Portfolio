export const profile = {
  name: "Froillan Kim B. Edem",
  shortName: "Froillan Edem",
  imageUrl: "/images/profile.png",
  title: "Platform & Cloud Systems Engineer",
  badgeSubtitle: "University of Cebu (2026) · Self-Taught",
  tagline: "Self-taught engineer who built an Internal Developer Platform architecture on Google Cloud. Seeking Platform Engineer, Cloud Infrastructure, or DevOps roles.",
  coreTech: ["Go (Golang)", "GCP (Cloud Run)", "Docker", "GitHub Actions", "PostgreSQL", "Linux", "Cloud KMS"],
  education: "B.S. Information Technology, University of Cebu (2026)",
  school: "University of Cebu",
  schoolDates: "2022 - 2026",
  educationDetail: "Bachelor of Science in Information Technology",
  capstoneDetail: "Capstone & Self-Directed Platform: FaceOfMind",
  email: "froillan.edem@gmail.com",
  phone: "+63 9910522445",
  location: "Cebu City, Philippines",
  linkedin: "https://linkedin.com/in/froillan-kim-b-edem-5b591b252",
  github: "https://github.com/Froillan123",
  website: "https://www.faceofmind.com/",
  resumePath: "/resume/Edem, Froillan Kim B. Resume.pdf",
  openRoles: [
    "Platform Engineer (Associate / Mid)",
    "Cloud & Infrastructure Engineer",
    "DevOps / SRE Engineer",
    "Backend Systems Engineer (Go/Python)",
  ],
  stats: [
    { label: "Sub-millisecond route lookup at scale", value: "<1ms" },
    { label: "Secret retrieval 5x faster than DB", value: "<2ms" },
    { label: "Cloud vulnerabilities found & mitigated", value: "15+" },
    { label: "Production microservices orchestrated", value: "10+" },
  ],
} as const;

export const aboutJourney = [
  "2026: Fresh Graduate (B.S. IT, University of Cebu) & Cloud Security Audit: Discovered 15+ cloud storage and IAM exposures during an authorized AWS cost audit.",
  "2025 - 2026: Self-Taught Platform Architecture (FaceOfMind): Engineered a custom Go Radix Trie API gateway, declarative GitOps matrix pipelines, and private Cloud Run microservices.",
  "2024 - 2025: Cryptographic Vault & Linux Sandboxing: Implemented in-memory AES-256-GCM envelope encryption with Cloud KMS and RLIMIT_CORE=0 crash dump prevention.",
  "2022 - 2026: B.S. in Information Technology at University of Cebu (Self-Directed Capstone: FaceOfMind).",
];

export const workExperiences = [
  {
    role: "Cloud Security Assessment (Internship Side-Project)",
    company: "Philippine Real Estate Platform (NDA)",
    period: "Jan 2026 - Mar 2026",
    summary:
      "Initiated as an AWS cost audit and evolved into an authorized security assessment discovering 15+ vulnerabilities across cloud storage, IAM, and VPC networks.",
  },
  {
    role: "Platform Engineer & Creator (Self-Taught Capstone)",
    company: "FaceOfMind Infrastructure",
    period: "2025 - 2026",
    summary:
      "Designed and implemented an Internal Developer Platform with custom Go reverse proxy, declarative GitOps deployment manifests, and zero-disk envelope encryption on GCP.",
  },
];

export const originStory = {
  heroWhy:
    "I survived depression during COVID-19 and experienced firsthand how difficult it is to voice emotional pain when no one around you understands. In the Philippines, there is an estimated 1 practicing psychologist per 125,000 people (DOH/WHO estimates). I built FaceOfMind to bridge the gap between daily patient mood logging and clinical session preparation. I engineered the custom Go gateway, KMS secret vault, and zero-trust infrastructure because sensitive mental health data demands uncompromising privacy and architectural rigor.",
  headline: "Why I Built FaceOfMind",
  subheadline: "From Personal Survival to Platform Engineering",
  personalIntro:
    "During COVID-19, I experienced severe depression and initially built FaceOfMind as a personal mood tracker and journaling companion. What began as a personal project evolved into a much larger engineering challenge: building secure infrastructure capable of handling sensitive mental-health data.",
  quote:
    "Behind every smile is unspoken pain. I engineered FaceOfMind to surface what might otherwise remain unseen, while giving psychologists secure, structured context between sessions.",
  pillars: [
    {
      stat: "1 : 125,000",
      label: "01 — Clinical Access",
      title: "Clinical Access Gap",
      description:
        "Approximate licensed-psychologist availability relative to the Philippine population (DOH/WHO estimates).",
    },
    {
      stat: "Between Sessions",
      label: "02 — Continuity",
      title: "Structured Context",
      description:
        "FaceOfMind turns ongoing reflections into concise signals and context for licensed practitioners.",
    },
    {
      stat: "RA 10173",
      label: "03 — Privacy",
      title: "Privacy by Design",
      description:
        "The platform treats mental-health data as sensitive personal information requiring strict access controls and protection.",
    },
  ],
  progression: [
    { step: "01", label: "Personal Mood Tracker", detail: "Single-user recovery logging" },
    { step: "02", label: "Clinical Application", detail: "Practitioner-patient context bridge" },
    { step: "03", label: "Multi-Service Platform", detail: "FastAPI & .NET Core services" },
    { step: "04", label: "Zero-Trust Infrastructure", detail: "Cloud Run IAM & KMS envelope vault" },
    { step: "05", label: "Platform Engineering", detail: "Custom Go Gateway & GitOps control plane" },
  ],
  progressionStack: ["Go Gateway", "GitOps", "Cloud KMS", "Cloud Run", "PostgreSQL", "Redis"],
  journeyTimeline: [
    {
      year: "2025",
      title: "FaceOfMind Begins",
      subtitle: "Personal Mood Tracker → Clinical Platform",
      description:
        "Started as personal recovery journaling, then evolved into a clinical tool bridging daily mood reflections with therapist decision support.",
      badge: "Origin",
    },
    {
      year: "2025–2026",
      title: "Infrastructure Rebuild",
      subtitle: "Go Gateway · GitOps · Cloud Run · KMS",
      description:
        "Decomposed the monolithic app into decoupled microservices, authoring a custom Go Radix Trie proxy (<1ms) and declarative GitOps pipelines.",
      badge: "Platform",
    },
    {
      year: "Jan–Mar 2026",
      title: "Cloud Security Assessment",
      subtitle: "15+ Findings Across Storage, IAM & VPC",
      description:
        "Discovered exposures in public S3 buckets during an authorized internship audit; authored RA 10173 remediation report for executive leadership.",
      badge: "Security Audit",
    },
    {
      year: "2026 — Present",
      title: "Platform Engineering",
      subtitle: "End-to-End Cloud Infrastructure",
      description:
        "Managing zero-trust IAM service authentication, in-memory cryptographic sandboxing, and event-driven configuration synchronization.",
      badge: "Platform",
    },
  ],
  evidence: [
    {
      id: "security-audit",
      title: "Cloud Security Assessment",
      period: "Jan–Mar 2026",
      badge: "Authorized Audit (NDA)",
      metric: "15+ Findings",
      summary:
        "Discovered exposures across cloud storage permissions, IAM wildcards, and VPC routing during an OJT infrastructure cost audit. Authored RA 10173 compliance remediation report.",
      tags: ["IAM Least Privilege", "S3 Storage Hardening", "VPC Private Subnets", "RA 10173 DPA"],
      actionLabel: "Read Security Findings",
      actionHref: "/security",
    },
    {
      id: "faceofmind-platform",
      title: "FaceOfMind Cloud Platform",
      period: "2025–2026",
      badge: "Self-Directed Capstone & IDP",
      metric: "4-Tier Architecture",
      summary:
        "Custom Go Radix Trie gateway (<1ms), declarative GitOps matrix deployment system, Cloud KMS envelope vault, and private Cloud Run serverless workloads.",
      tags: ["Go Gateway", "GitOps IDP", "Cloud KMS", "Cloud Run IAM"],
      actionLabel: "Explore Architecture",
      actionHref: "/platform",
    },
  ],
} as const;

export const securityAssessment = {
  title: "Cloud Security Assessment (Internship Side-Project)",
  roleContext: "AWS Infrastructure Cost Audit & Vulnerability Assessment",
  company: "Philippine Real Estate Platform",
  period: "Jan 2026 - Mar 2026",
  narrative:
    "During my OJT internship, I was tasked with analyzing AWS compute spend for cost optimization. While auditing infrastructure, I discovered public S3 buckets exposing sensitive customer documents (PRC licenses, government IDs, and financial records). This evolved into an authorized security audit uncovering 15+ vulnerabilities across storage permissions, IAM wildcards, and VPC database exposure. I authored a remediation report aligned with RA 10173 (Philippine Data Privacy Act) and presented findings directly to senior leadership under NDA.",
  ojtNote: "Completed during my OJT internship at a Philippine real estate platform (NDA). Client name available upon request.",
  bullets: [
    "Identified 15+ vulnerabilities across cloud storage permissions, IAM policies, network exposure, and database configuration",
    "Audited public cloud storage and discovered unauthorized exposure of sensitive business and customer documents",
    "Recommended VPC private subnet architecture and bastion host design for database isolation",
    "Authored comprehensive remediation report aligned with RA 10173 (Philippine Data Privacy Act)",
    "Presented findings and recommendations directly to senior leadership",
  ],
  tags: ["Cloud Security Audit", "AWS S3 Hardening", "VPC Architecture", "RA 10173 DPA", "IAM Least Privilege", "Cost Optimization"],
} as const;

export const engineeringPrinciples = [
  {
    title: "Zero-Trust Infrastructure & IAM Identity",
    badge: "Security",
    description:
      "No microservice is exposed directly to the public internet. All internal workloads enforce OIDC identity-based authentication through Cloud Run IAM with zero-allow-unauthenticated policies.",
    appliedIn: "Go API Gateway -> Google Cloud Run IAM OIDC Minting",
    quote: "Every internal service request must be authenticated, authorized, and cryptographically verified.",
  },
  {
    title: "Declarative GitOps & Matrix Automation",
    badge: "Automation",
    description:
      "Infrastructure state and service definitions live as declarative YAML contracts. Commit-range diffing ensures zero wasteful rebuilds for unmodified services.",
    appliedIn: "service.yaml & Python diff engine with Google Cloud Build",
    quote: "Treat infrastructure and deployment pipelines as version-controlled code, not manual runbooks.",
  },
  {
    title: "Volatile Memory Sandboxing & Zero-Disk Key Handling",
    badge: "Cryptography",
    description:
      "Sensitive platform secrets are protected via Cloud KMS envelope encryption. Decrypted key material remains strictly in process memory and core dumps are disabled (RLIMIT_CORE=0) to reduce the risk of sensitive key material being persisted in crash dumps.",
    appliedIn: "Cloud KMS Vault with RLIMIT_CORE=0 in Linux containers",
    quote: "Never persist unencrypted secrets or sensitive keys to disk or long-term storage.",
  },
  {
    title: "High-Throughput Ingress & O(k) Routing",
    badge: "Performance",
    description:
      "Lock-free Radix Trie route matching delivers deterministic O(k) path lookups with low-overhead in-memory routing.",
    appliedIn: "Go Radix Trie Reverse Proxy with pg_notify cache invalidation",
    quote: "High-performance platform routing should introduce negligible latency overhead.",
  },
  {
    title: "Circuit Breakers & Graceful Degradation",
    badge: "Reliability",
    description:
      "3-state circuit breakers isolate failing downstream microservices with exponential backoff, designed to prevent cascading failures across downstream services.",
    appliedIn: "Go in-memory Circuit Breaker (CLOSED / HALF-OPEN / OPEN)",
    quote: "Build systems that anticipate failure and isolate blast radiuses automatically.",
  },
  {
    title: "Event-Driven State Synchronization & Cache Invalidation",
    badge: "State Sync",
    description:
      "Non-blocking PostgreSQL LISTEN/NOTIFY channels propagate live route configuration changes and platform events to edge proxies, while Redis provides fast state caching and invalidation without periodic polling.",
    appliedIn: "PostgreSQL LISTEN/NOTIFY Subscriptions + Redis Cache Invalidation",
    quote: "Live state synchronization should react to changes, not repeatedly poll for them.",
  },
] as const;

