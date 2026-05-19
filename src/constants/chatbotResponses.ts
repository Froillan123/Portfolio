export const chatbotResponses: { [key: string]: string } = {
  hi: "Hello! How can I help you today?",
  hello: "Hi there! What would you like to know?",
  hey: "Hey! What can I help you with?",
  about:
    "I'm Froillan Kim B. Edem — B.S. IT graduate (University of Cebu, 2026) and software engineer. I build FaceofMind, a live wellness app (mobile, web, backend). Open to junior SWE roles.",
  skills:
    "Strong (from FaceofMind): Python, TypeScript, React, Flutter, FastAPI, C#/.NET, GCP, PostgreSQL, Docker, Redis, Tailwind, GitHub Actions. Familiar: Gemini, LangChain, RAG, AWS Rekognition. Exposed: K8s, Terraform, AWS, MongoDB, Firebase.",
  projects:
    "My main project is FaceofMind — a mental wellness app I founded and still build. Public info is at https://www.faceofmind.it.com/ (no internal architecture on this portfolio).",
  faceofmind:
    "FaceofMind is the wellness app I founded. It's live at https://www.faceofmind.it.com/. I don't share proprietary architecture here — ask me in an interview about what I can discuss.",
  experience:
    "Fresh graduate (2026) with hands-on work since 2023 — coursework, capstone, and founding FaceofMind. Open to junior software engineering roles.",
  contact:
    "Email: froillan.edem@gmail.com · LinkedIn: https://www.linkedin.com/in/froillan-kim-b-edem-5b591b252/",
  email: "froillan.edem@gmail.com — happy to hear from you.",
  github: "https://github.com/Froillan123",
  resume: "Download my resume from the Resume button in the hero or contact section.",
  help: "Ask about skills, projects, FaceofMind, experience, contact, or resume.",
  default:
    "I can share info about skills, projects, FaceofMind, experience, or contact. Try asking about one of those!",
};

export function getChatbotResponse(message: string): string {
  const lowerMessage = message.toLowerCase().trim();

  if (chatbotResponses[lowerMessage]) {
    return chatbotResponses[lowerMessage];
  }

  if (lowerMessage.includes("faceofmind") || lowerMessage.includes("face of mind")) {
    return chatbotResponses["faceofmind"];
  }
  if (lowerMessage.includes("skill") || lowerMessage.includes("tech")) {
    return chatbotResponses["skills"];
  }
  if (lowerMessage.includes("project")) {
    return chatbotResponses["projects"];
  }
  if (lowerMessage.includes("about") || lowerMessage.includes("who")) {
    return chatbotResponses["about"];
  }
  if (lowerMessage.includes("experience") || lowerMessage.includes("year") || lowerMessage.includes("grad")) {
    return chatbotResponses["experience"];
  }
  if (lowerMessage.includes("contact") || lowerMessage.includes("email") || lowerMessage.includes("reach")) {
    return chatbotResponses["contact"];
  }
  if (lowerMessage.includes("github") || lowerMessage.includes("code")) {
    return chatbotResponses["github"];
  }
  if (lowerMessage.includes("resume") || lowerMessage.includes("cv")) {
    return chatbotResponses["resume"];
  }
  if (lowerMessage.includes("help")) {
    return chatbotResponses["help"];
  }

  return chatbotResponses["default"];
}
