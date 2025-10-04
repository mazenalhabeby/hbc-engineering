
export type ContactInfo = {
  company: string;
  domain?: string;
  phone: string;
  email: string;
  supportEmail?: string;
  salesEmail?: string;
  officeEmail?: string;
  address?: string;
  address1?: string;
  address2?: string;
  socials?: Partial<{
    whatsapp: string;
    telegram: string;
    linkedin: string;
    twitter: string;
  }>;
};

export const siteConfig: ContactInfo = {
    company: "HBC Engineering",
    domain: "hbc-engineering.com",
    phone: "+1 (252) 557-6443",

    email: "hello@hbc-engineering.com",
    supportEmail: "support@hbc-engineering.com",
    salesEmail: "sales@hbc-engineering.com",
    officeEmail: "office@hbc-engineering.com",
    address1: "260 Peachtree Street,30303 Atlanta,Georgia, USA",
    address2: "Kapellenstraße 30, 4664 Laakirchen, Austria",
    address: "Vienna, Austria",
    socials: {
        whatsapp: "https://wa.me/436601234567",
        linkedin: "https://www.linkedin.com/company/hbc-engineering",
    },
};
