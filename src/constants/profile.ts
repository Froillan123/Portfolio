export const profile = {
  name: "Froillan Kim B. Edem",
  shortName: "F.K. Edem",
  imageUrl: "/lovable-uploads/21db6910-0c88-42aa-8fa7-db9f3111b50f.png",
  title: "Cloud / Platform & Security Engineer",
  tagline: "I build secure, automated developer platforms on Google Cloud.",
  education: "B.S. Information Technology, University of Cebu (2026)",
  email: "froillan.edem@gmail.com",
  phone: "+63 9910522445",
  location: "Cebu City, Philippines",
  linkedin: "https://tinyurl.com/yc6hd2nx",
  github: "https://github.com/Froillan123",
  resumePath: "/resume/Edem, Froillan Kim B. Resume.pdf",
  stats: [
    { label: "Cloud Vulnerabilities Identified", value: "15+" },
    { label: "Secret Decrypt Latency (Redis)", value: "~2ms" },
    { label: "Config Keys Reduced", value: "30+ → 2" },
  ],
} as const;

export const securityAssessment = {
  title: "Cloud Security Intern (Authorized Assessment)",
  company: "Philippine Real Estate Platform",
  period: "Jan 2026 – Mar 2026",
  ojtNote: "Client name available upon request. Completed as part of OJT internship through University of Cebu.",
  bullets: [
    "Identified 15+ vulnerabilities across storage permissions, IAM policies, network exposure, and database configuration",
    "Audited public cloud storage and discovered unauthorized exposure of sensitive business and customer documents",
    "Recommended VPC private subnet architecture and bastion host design",
    "Authored remediation report aligned with RA 10173 (Philippine Data Privacy Act)",
  ],
  tags: ["Cloud Security Audit", "Cloud Storage Hardening", "VPC Architecture", "RA 10173 DPA", "IAM Least Privilege"],
} as const;
