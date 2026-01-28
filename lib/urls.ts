type PathEntry = { label: string; href: string; external?: boolean };

export const paths: Record<string, PathEntry> = {
    home: { label: "home", href: "/" },
    company: { label: "company", href: "/company" },
    industrial: { label: "industrial", href: "/industrial" },
    fireProtection: { label: "fireProtection", href: "/fire-protection" },
    intelligentBuilding: {
      label: "intelligent",
      href: "/intelligent-building",
    },
    contact: { label: "contact", href: "/contact" },
    careers: { label: "careers", href: "/careers" },
    corporate: { label: "scheduleMeeting", href: "/corporate" },
    itSolutions: { label: "itSolutions", href: "/it-solutions" },
  };