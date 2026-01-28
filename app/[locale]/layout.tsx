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
import FireProtectionBadge from "@/components/FireProtectionBadge";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
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
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-manrope",
});

const description =
  "HBC Engineering delivers industrial maintenance, fire protection, smart building systems, and modern IT—software, cloud/DevOps & AI—engineered for uptime and safety.";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
  ),
  title: "HBC Engineering",
  description,
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
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${orbitron.variable} ${manrope.variable} antialiased`}
      >
        <NextIntlClientProvider>
          <HBCGrandLoaderFull
            minShowMs={3000}
            revealFrom="bottom-right" // "top-left" | "top-right" | "bottom-left" | "bottom-right"
            title="HBC Engineering"
            subtitle="Preparing your experience…"
          />
          <LenisProvider>
            <GlassyNavbar />
            {children}
            <CinematicFooter />
          </LenisProvider>
          <FireProtectionBadge />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
