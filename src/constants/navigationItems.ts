export const navigationItems = [
  { id: "home", label: "Home" },
  { id: "projects", label: "Projects" },
  { id: "philosophy", label: "Engineering Focus" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
] as const;

export const sectionIds = navigationItems.map((item) => item.id);
