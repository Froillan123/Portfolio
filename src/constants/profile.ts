export const profile = {
  name: "Froillan Kim B. Edem",
  shortName: "Froillan Edem",
  imageUrl: "/lovable-uploads/21db6910-0c88-42aa-8fa7-db9f3111b50f.png",
  title: "Platform & Cloud Systems Engineer",
  badgeSubtitle: "Self-Taught · University of Cebu (2026)",
  tagline: "Self-taught engineer who built a production-grade Internal Developer Platform on Google Cloud. Seeking Platform Engineer, Cloud Infrastructure, or DevOps roles.",
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
