export const navigationItems = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "platform", label: "Platform" },
  { id: "security", label: "Security" },
  { id: "contact", label: "Contact" },
] as const;

export const sectionIds = navigationItems.map((item) => item.id);

