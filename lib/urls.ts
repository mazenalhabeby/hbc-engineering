type PathEntry = { label: string; href: `/${string}` };

export const paths: Record<string, PathEntry> = {
  home: { label: "Home", href: "/" },
  company: { label: "Company", href: "/company" },
  industrial: { label: "Industrial", href: "/industrial" },
  fireProtection: { label: "Fire Protection", href: "/fire-protection" },
  intelligentBuilding: { label: "Intelligent Building", href: "/intelligent-building" },
  contact: { label: "Contact", href: "/contact" },
  careers: { label: "Careers", href: "/careers" },
  corporate: { label: "Request a Corporate Meeting", href: "/corporate" },
};