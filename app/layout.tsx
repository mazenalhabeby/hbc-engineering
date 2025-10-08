import type { Metadata } from "next";
import { Geist, Geist_Mono, Manrope, Orbitron } from "next/font/google";
import "./globals.css";
import GlassyNavbar from "@/components/navbar/Navbar";

import CinematicFooter from "@/components/Footer";
import LenisProvider from "@/providers/LenisProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const orbitron = Orbitron({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-orbitron",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"], // pick what you need
  display: "swap",
  variable: "--font-manrope", // exposes as CSS variable
});

const description =
  "HBC Engineering delivers industrial maintenance, fire protection, smart building systems, and modern IT—software, cloud/DevOps & AI—engineered for uptime and safety.";

export const metadata: Metadata = {
  title: "HBC Engineering",
  description,
  keywords: [
    "industrial maintenance",
    "fire protection",
    "intelligent building",
    "IT solutions",
    "security",
  ],
  openGraph: {
    title: "HBC Engineering",
    description,
    url: "https://hbc-engineering.com",
    siteName: "HBC Engineering",
    images: [
      {
        url: "/hbc-logo.svg",
        width: 1200,
        height: 630,
        alt: "HBC Engineering",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "HBC Engineering — Industrial & IT Solutions",
    description,
    images: ["/hbc-logo.svg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${orbitron.variable} ${manrope.variable} antialiased`}
      >
        <LenisProvider>
          <GlassyNavbar />
          {children}
          <CinematicFooter />
        </LenisProvider>
      </body>
    </html>
  );
}
