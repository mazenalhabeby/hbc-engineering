"use client";

import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { paths } from "@/lib/urls";
import { useTranslations } from "next-intl";

const LanguageDialog = dynamic(
  () => import("../../components/LanguageDialog").then((m) => m.LanguageDialog),
  { ssr: false }
);

function ShopButton() {
  return (
    <a
      href="https://shop.hbc-engineering.com"
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex items-center justify-center h-9 w-9 rounded-xl border border-white/25 bg-white/10 backdrop-blur-2xl shadow-sm hover:shadow-md hover:bg-white/20 transition-all duration-300 overflow-hidden"
      aria-label="HBC Shop"
    >
      {/* Gradient hover effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-400/0 via-amber-500/0 to-orange-500/0 group-hover:from-amber-400/20 group-hover:via-amber-500/10 group-hover:to-orange-500/20 transition-all duration-300" />

      {/* Icon */}
      <svg
        viewBox="0 0 24 24"
        className="h-4 w-4 text-slate-700 group-hover:text-amber-600 transition-colors duration-300 relative z-10"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <path d="M16 10a4 4 0 0 1-8 0" />
      </svg>

      {/* Shine effect on hover */}
      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12" />
    </a>
  );
}

export type NavItem = {
  label: string;
  href?: string;
  external?: boolean;
  children?: { label: string; href: string }[];
};

const NOISE_BG =
  'url("data:image/svg+xml;utf8,\
<svg xmlns=\\"http://www.w3.org/2000/svg\\" viewBox=\\"0 0 100 100\\">\
<filter id=\\"n\\"><feTurbulence type=\\"fractalNoise\\" baseFrequency=\\"1.2\\" numOctaves=\\"2\\" stitchTiles=\\"stitch\\"/></filter>\
<rect width=\\"100%\\" height=\\"100%\\" filter=\\"url(%23n)\\" opacity=\\"0.9\\"/>\
</svg>")';

const NAV: NavItem[] = [
  { label: paths.industrial.label, href: paths.industrial.href },
  { label: paths.fireProtection.label, href: paths.fireProtection.href, external: paths.fireProtection.external },
  {
    label: paths.intelligentBuilding.label,
    href: paths.intelligentBuilding.href,
  },
  { label: paths.itSolutions.label, href: paths.itSolutions.href },
  { label: paths.careers.label, href: paths.careers.href },
  { label: paths.contact.label, href: paths.contact.href },
];

function cn(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function useIsScrolled(offset = 8) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > offset);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [offset]);
  return scrolled;
}

export default function Navbar() {
  const t = useTranslations("navbar");

  const pathname = usePathname();
  const scrolled = useIsScrolled(10);

  const activeRoot = useMemo(() => {
    const found = NAV.find((item) => {
      if (item.href) {
        if (item.href === "/") return pathname === "/";
        return pathname?.startsWith(item.href);
      }
      if (item.children) {
        return item.children.some((c) => {
          if (c.href === "/") return pathname === "/";
          return pathname?.startsWith(c.href);
        });
      }
      return false;
    });
    return found?.label;
  }, [pathname]);

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-40 transition-all", // lowered so the drawer (z-[100]) sits above it
        scrolled
          ? "backdrop-blur-xl bg-[rgb(246_249_255/0.55)] border-b border-white/20"
          : "bg-transparent"
      )}
    >
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-24 flex items-center gap-4 justify-around">
        <Link href="/">
          <Image
            src="/hbc-logo.svg"
            alt="HBC Engineering"
            width={260}
            height={80}
            priority
          />
        </Link>

        <div className="ml-auto flex items-center gap-2">
          {/* desktop menu */}
          <div
            className={cn(
              "hidden md:flex items-center gap-1 rounded-full border px-2 py-1",
              "border-white/25 bg-white/10 backdrop-blur-2xl",
              "shadow-[inset_0_1px_0_rgba(255,255,255,.25),0_8px_24px_rgba(31,38,135,.15)]"
            )}
            role="menubar"
            aria-label="Primary"
          >
            {NAV.map((item) => (
              <MenuItem key={item.label} item={item} activeRoot={activeRoot} />
            ))}
          </div>
          <ShopButton />
          <LanguageDialog />
          {/* CTA */}
          <Link
            href={paths.corporate.href}
            className="rounded-full px-4 py-2 text-sm font-semibold text-white shadow-lg transition focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 hidden md:inline-block"
            style={{
              background:
                "linear-gradient(90deg, rgba(6,110,176,1) 0%, rgba(0,118,192,1) 35%, rgba(0,121,196,1) 100%)",
            }}
          >
            {t(paths.corporate.label)}
          </Link>

          {/* mobile drawer */}
          <MobileMenu />
        </div>
      </nav>
    </header>
  );
}

function MenuItem({
  item,
  activeRoot,
}: {
  item: NavItem;
  activeRoot?: string;
}) {
  const t = useTranslations("navbar");
  const isActive = activeRoot === item.label;

  if (!item.children) {
    const linkClasses = cn(
      "px-3 py-1.5 text-sm rounded-full transition",
      "hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400",
      isActive
        ? "bg-white/25 font-semibold text-slate-900"
        : "text-slate-800"
    );

    if (item.external) {
      return (
        <a
          href={item.href || "/"}
          role="menuitem"
          className={linkClasses}
          target="_blank"
          rel="noopener noreferrer"
        >
          {t(item.label)}
        </a>
      );
    }

    return (
      <Link
        href={item.href || "/"}
        role="menuitem"
        className={linkClasses}
      >
        {t(item.label)}
      </Link>
    );
  }

  return (
    <div className="relative group" role="presentation">
      <button
        className={cn(
          "px-3 py-1.5 text-sm rounded-full inline-flex items-center gap-1 transition",
          "hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400",
          isActive
            ? "bg-white/25 font-semibold text-slate-900"
            : "text-slate-800"
        )}
        aria-haspopup="menu"
        aria-expanded="false"
      >
        {item.label}
        <svg viewBox="0 0 20 20" className="h-4 w-4" aria-hidden>
          <path d="M5 7l5 6 5-6H5z" fill="currentColor" />
        </svg>
      </button>

      {/* hover dropdown (desktop) */}
      <div
        className={cn(
          "invisible absolute left-1/2 z-40 w-56 -translate-x-1/2 pt-2 opacity-0 transition",
          "group-hover:visible group-hover:opacity-100"
        )}
        role="menu"
      >
        <div className="overflow-hidden rounded-2xl border border-white/25 bg-white/60 backdrop-blur-2xl shadow-xl">
          <ul className="py-1">
            {item.children.map((child) => (
              <li key={child.href}>
                <Link
                  href={child.href}
                  className="block px-3 py-2 text-sm text-slate-800 hover:bg-white/30"
                  role="menuitem"
                >
                  {child.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

/* ---------- Mobile Drawer in a portal (glass only on mobile) ---------- */
function MobileMenu() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  // lock page scroll when open
  useEffect(() => {
    const root = document.documentElement;
    if (open) {
      root.style.overflow = "hidden";
      root.style.touchAction = "none";
      root.style.overscrollBehavior = "none";
    } else {
      root.style.overflow = "";
      root.style.touchAction = "";
      root.style.overscrollBehavior = "";
    }
    return () => {
      root.style.overflow = "";
      root.style.touchAction = "";
      root.style.overscrollBehavior = "";
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <>
      <button
        className="md:hidden inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/25 bg-white/15 supports-[backdrop-filter]:backdrop-blur-2xl shadow-[inset_0_1px_0_rgba(255,255,255,.35)]"
        aria-label="Open menu"
        onClick={() => setOpen(true)}
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
          <path
            d="M4 7h16M4 12h16M4 17h16"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </button>

      {mounted &&
        open &&
        createPortal(
          <div
            className="fixed inset-0 z-[100] md:hidden"
            role="dialog"
            aria-modal="true"
          >
            {/* backdrop */}
            <div className="absolute inset-0 bg-black/45" onClick={close} />

            {/* drawer (glassmorphism) */}
            <aside
              className="
                absolute inset-y-0 right-0 w-[86%] max-w-sm
                p-4 pt-[max(16px,env(safe-area-inset-top))] pb-[max(16px,env(safe-area-inset-bottom))]
                overflow-y-auto border-l border-white/25
                bg-white/25 supports-[backdrop-filter]:backdrop-blur-3xl backdrop-saturate-150
                shadow-[0_20px_50px_rgba(0,0,0,.25)]
                transition-transform duration-300 will-change-transform
              "
              style={{
                backgroundImage:
                  "linear-gradient(180deg, rgba(255,255,255,0.66) 0%, rgba(255,255,255,0.18) 100%), radial-gradient(70% 120% at 0% 0%, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0) 60%)",
              }}
            >
              {/* subtle glass grain */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0"
                style={{
                  backgroundImage: NOISE_BG,
                  opacity: 0.06,
                  mixBlendMode: "overlay",
                  backgroundSize: "200px 200px",
                }}
              />
              {/* hairlines */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/50"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-black/5"
              />

              <div className="relative flex items-center justify-between gap-2">
                <span className="text-base font-semibold">Menu</span>
                <button
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/25 bg-white/20 supports-[backdrop-filter]:backdrop-blur-xl"
                  aria-label="Close menu"
                  onClick={close}
                >
                  <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
                    <path
                      d="M6 6l12 12M18 6l-12 12"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
              </div>

              <div className="relative mt-6 space-y-4 pb-8">
                {NAV.map((item) => (
                  <div key={item.label}>
                    {item.href ? (
                      item.external ? (
                        <a
                          href={item.href}
                          onClick={close}
                          className="block rounded-xl border border-white/25 bg-white/55 supports-[backdrop-filter]:backdrop-blur-2xl px-4 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,.45)]"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {item.label}
                        </a>
                      ) : (
                        <Link
                          href={item.href}
                          onClick={close}
                          className="block rounded-xl border border-white/25 bg-white/55 supports-[backdrop-filter]:backdrop-blur-2xl px-4 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,.45)]"
                        >
                          {item.label}
                        </Link>
                      )
                    ) : (
                      <details className="rounded-xl border border-white/25 bg-white/55 supports-[backdrop-filter]:backdrop-blur-2xl shadow-[inset_0_1px_0_rgba(255,255,255,.45)]">
                        <summary className="cursor-pointer list-none px-4 py-3 font-medium">
                          {item.label}
                        </summary>
                        <ul className="px-2 pb-2">
                          {item.children?.map((c) => (
                            <li key={c.href}>
                              <Link
                                href={c.href}
                                onClick={close}
                                className="block rounded-lg px-3 py-2 hover:bg-white/50"
                              >
                                {c.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </details>
                    )}
                  </div>
                ))}

                <div className="pt-2 flex gap-2">
                  <a
                    href="https://shop.hbc-engineering.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={close}
                    className="flex items-center justify-center gap-2 rounded-full px-4 py-2 font-semibold text-slate-800 shadow-lg border border-amber-400/30 bg-gradient-to-r from-amber-50 to-orange-50"
                  >
                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                      <line x1="3" y1="6" x2="21" y2="6" />
                      <path d="M16 10a4 4 0 0 1-8 0" />
                    </svg>
                    Shop
                  </a>
                  <Link
                    href={paths.corporate.href}
                    onClick={close}
                    className="flex-1 rounded-full px-4 py-2 text-center font-semibold text-white shadow-xl border border-white/20 supports-[backdrop-filter]:backdrop-blur-2xl"
                    style={{
                      background:
                        "linear-gradient(90deg, rgba(6,110,176,0.98) 0%, rgba(0,118,192,0.98) 35%, rgba(0,121,196,0.98) 100%)",
                    }}
                  >
                    {paths.corporate.label}
                  </Link>
                </div>
              </div>
            </aside>
          </div>,
          document.body
        )}
    </>
  );
}
