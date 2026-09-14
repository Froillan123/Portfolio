export const profile = {
  name: "Froillan Kim B. Edem",
  shortName: "Froillan Edem",
  imageUrl: "/lovable-uploads/21db6910-0c88-42aa-8fa7-db9f3111b50f.png",
  title: "Cloud / Platform & Security Engineer",
  tagline: "I build secure, automated cloud platforms and infrastructure for modern applications.",
  coreTech: ["Go", "GCP", "Docker", "GitHub Actions", "PostgreSQL", "IAM", "KMS"],
  education: "B.S. Information Technology, University of Cebu (2026)",
  school: "University of Cebu",
  schoolDates: "2022 – 2026",
  educationDetail: "Bachelor of Science in Information Technology",
  email: "froillan.edem@gmail.com",
  phone: "+63 9910522445",
  location: "Cebu City, Philippines",
  linkedin: "https://tinyurl.com/yc6hd2nx",
  github: "https://github.com/Froillan123",
  website: "https://www.faceofmind.com/",
  resumePath: "/resume/Edem, Froillan Kim B. Resume.pdf",
  stats: [
    { label: "Cloud Vulnerabilities Identified", value: "15+" },
    { label: "Secret Decrypt Latency (Redis)", value: "~2ms" },
    { label: "Config Keys Reduced", value: "30+ → 2" },
  ],
} as const;

export const aboutJourney = [
  "2026: Authorized Cloud Security Assessment — Uncovered 15+ cloud storage and IAM exposures for a Philippine real estate platform.",
  "2025 – 2026: Architected GitOps developer pipelines on GCP Cloud Run with automated matrix builds and custom Go API gateways.",
  "2024 – 2025: Implemented envelope encryption secret vaults utilizing GCP KMS, Redis caching (~2ms), and AES-256-GCM.",
  "2022 – 2026: B.S. Information Technology at University of Cebu.",
];

export const workExperiences = [
  {
    role: "Cloud Security Intern",
    company: "Philippine Real Estate Platform",
    period: "Jan 2026 – Mar 2026",
    summary:
      "Conducted authorized security audit identifying 15+ cloud vulnerabilities across storage permissions, IAM, and VPC networks.",
  },
  {
    role: "Platform & Security Engineer (Capstone Lead)",
    company: "FaceOfMind Infrastructure",
    period: "2025 – 2026",
    summary:
      "Architected multi-service container platform on Google Cloud with custom Go API gateway and KMS-backed secret management.",
  },
];

export const engineeringPrinciples = [
  {
    title: "Automate Repetitive Workflows",
    description:
      "Eliminate manual operational toil with GitOps pipelines, dynamic matrix builds, and declarative infrastructure that builds only what changed.",
    badge: "Automation & GitOps",
  },
  {
    title: "Least-Privilege & Service Isolation",
    description:
      "Enforce granular IAM roles (e.g., roles/run.invoker), envelope encryption with KMS, and scoped access control across every microservice boundary.",
    badge: "Zero-Toil Security",
  },
  {
    title: "Scale Without Operational Complexity",
    description:
      "Design distributed systems that handle high throughput and dynamic routing without introducing unnecessary layers or complex cluster management.",
    badge: "System Simplicity",
  },
  {
    title: "Observability & Failure as First-Class Design",
    description:
      "Embed end-to-end latency tracing headers (X-Gateway, X-Upstream, X-Total), structured audit trails, and graceful failovers into every layer.",
    badge: "Telemetry & Resiliency",
  },
  {
    title: "Leverage Managed Cloud Primitives",
    description:
      "Prefer managed cloud services (Cloud Run, Cloud KMS, Cloud SQL) to drastically reduce maintenance overhead while maintaining full data control.",
    badge: "Cloud Efficiency",
  },
] as const;

export const securityAssessment = {
  title: "Cloud Security Intern",
  roleContext: "Authorized Cloud Security Assessment",
  company: "Philippine Real Estate Platform",
  period: "Jan 2026 – Mar 2026",
  ojtNote: "Client name available upon request. Completed as part of OJT internship through University of Cebu.",
  bullets: [
    "Identified 15+ vulnerabilities across cloud storage permissions, IAM policies, network exposure, and database configuration",
    "Audited public cloud storage and discovered unauthorized exposure of sensitive business and customer documents",
    "Recommended VPC private subnet architecture and bastion host design for database isolation",
    "Authored comprehensive remediation report aligned with RA 10173 (Philippine Data Privacy Act)",
  ],
  tags: ["Cloud Security Audit", "Cloud Storage Hardening", "VPC Architecture", "RA 10173 DPA", "IAM Least Privilege"],
} as const;
