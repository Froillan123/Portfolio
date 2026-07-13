export const chatbotResponses: { [key: string]: string } = {
  hi: "Hello! How can I help you today?",
  hello: "Hi there! What would you like to know?",
  hey: "Hey! What can I help you with?",
  about:
    "I'm Froillan Kim B. Edem, B.S. IT graduate (University of Cebu, 2026), Founder and Software Architect of FaceofMind. I design and build full-stack architectures, mobile apps, web dashboards, and backend services.",
  skills:
    "Strong (from FaceofMind): Flutter, React, Python (FastAPI), C#/.NET Core, TypeScript, PostgreSQL, Google Cloud, Docker, Redis, Tailwind CSS. Familiar: Gemini API, LangChain. Exposed: AWS, MongoDB, Firebase.",
  projects:
    "My main project is FaceofMind, an emotional wellness and daily mood companion app. Check out the live platform at https://www.faceofmind.it.com/.",
  faceofmind:
    "FaceofMind is a personal emotional wellness and daily self-care companion app that I founded and developed. It features emotional tracking loggers, gamified check-ins (virtual pets and gardens), and connections to licensed psychologists.",
  experience:
    "I have been writing software since 2023, and I founded FaceofMind in 2025. I design and build full-stack architectures using Flutter, React, Python, and C#.",
  contact:
    "Email: froillan.edem@gmail.com · LinkedIn: https://www.linkedin.com/in/froillan-kim-b-edem-5b591b252/",
  email: "froillan.edem@gmail.com, feel free to reach out.",
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
