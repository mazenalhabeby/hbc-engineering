import { NextIntlClientProvider, hasLocale } from "next-intl";
import { ReactNode } from "react";
import type { Metadata } from "next";
import { Geist, Geist_Mono, Manrope, Orbitron } from "next/font/google";
import "@/styles/globals.css";
import GlassyNavbar from "@/components/navbar/Navbar";
import CinematicFooter from "@/components/Footer";
import { notFound } from "next/navigation";
import LenisProvider from "@/providers/LenisProvider";
import { routing } from "@/i18n/routing";
import { setRequestLocale } from "next-intl/server";
import HBCGrandLoaderFull from "@/components/HBCGrandLoaderFull";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"], display: "swap" });
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});
const orbitron = Orbitron({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  display: "swap",
  variable: "--font-orbitron",
});
const manrope = Manrope({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-manrope",
});

const description =
  "HBC Engineering delivers industrial maintenance, fire protection, smart building systems, and modern IT—software, cloud/DevOps & AI—engineered for uptime and safety.";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
  ),
  title: {
    default: "HBC Engineering",
    template: "%s | HBC Engineering",
  },
  description,
  keywords: [
    "industrial maintenance",
    "fire protection",
    "smart building",
    "IT solutions",
    "cloud infrastructure",
    "DevOps",
    "AI automation",
  ],
  authors: [{ name: "HBC Engineering" }],
  creator: "HBC Engineering",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "HBC Engineering",
    title: "HBC Engineering",
    description,
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "HBC Engineering - Industrial Maintenance & Smart Solutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "HBC Engineering",
    description,
    images: ["/images/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

interface Props {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function RootLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return (
    <html lang={locale} data-locale={locale} dir="ltr" suppressHydrationWarning>
      <head>
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
        <link rel="preload" href="/hbc-logo.glb" as="fetch" crossOrigin="anonymous" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${orbitron.variable} ${manrope.variable} antialiased`}
        suppressHydrationWarning
      >
        <NextIntlClientProvider>
          <HBCGrandLoaderFull
            minShowMs={500}
            revealFrom="bottom-right" // "top-left" | "top-right" | "bottom-left" | "bottom-right"
            title="HBC Engineering"
            subtitle="Preparing your experience…"
          />
          <LenisProvider>
            <GlassyNavbar />
            {children}
            <CinematicFooter />
          </LenisProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
