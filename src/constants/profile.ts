export const profile = {
  name: "Froillan Kim B. Edem",
  shortName: "F.K. Edem",
  imageUrl: "/lovable-uploads/21db6910-0c88-42aa-8fa7-db9f3111b50f.png",
  title: "Software Engineer",
  /** One line under the name in the hero */
  tagline: "B.S. IT · University of Cebu · 2026",
  /** Hero supporting paragraph — keep factual, no meta jokes */
  bio: "I build mobile and web software. Most of my experience comes from FaceofMind, a live wellness app I founded and still develop—Flutter, React, Python, and .NET on Google Cloud.",
  education: "B.S. Information Technology — University of Cebu (2026)",
  educationDetail: "Bachelor of Science in Information Technology, Software Engineering",
  school: "University of Cebu",
  schoolDates: "Aug 2022 – Mar 2026",
  email: "froillan.edem@gmail.com",
  linkedin: "https://www.linkedin.com/in/froillan-kim-b-edem-5b591b252/",
  github: "https://github.com/Froillan123",
  website: "https://www.faceofmind.it.com/",
  resumePath: "/resume/Froillan_Kim_B_Edem_resume.pdf",
  stats: [
    { label: "Education", value: "B.S. IT · 2026" },
    { label: "Current work", value: "FaceofMind" },
    { label: "Looking for", value: "Junior SWE roles" },
  ],
} as const;

/** Hero checkmarks — each line adds something new */
export const heroHighlights = [
  "Full-stack: mobile (Flutter), web (React), APIs (Python / .NET)",
  "Founder of FaceofMind — live product",
  "Open to junior software engineering roles",
] as const;

export const aboutJourney = [
  "Graduated 2026 with a software engineering focus at the University of Cebu.",
  "Built FaceofMind from coursework into a production app I still maintain.",
  "Interested in teams where I can grow on real products and code reviews.",
] as const;

export const aboutExperience = {
  role: "Founder & Software Engineer",
  company: "FaceofMind",
  period: "Jul 2025 – Present",
  summary:
    "Mental wellness app — product direction, mobile, web portals, and backend services.",
} as const;
