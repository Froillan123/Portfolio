export const navigationItems = [
  {
    id: "home",
    label: "Home",
    path: "/",
  },
  {
    id: "about",
    label: "About",
    path: "/about",
  },
  {
    id: "platform",
    label: "Platform",
    path: "/platform",
  },
  {
    id: "security",
    label: "Security",
    path: "/security",
  },
  {
    id: "contact",
    label: "Contact",
    path: "/contact",
  },
] as const;

export const sectionIds = navigationItems.map((item) => item.id);
