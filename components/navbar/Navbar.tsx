"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import React from "react";
import { paths } from "@/lib/urls";

export type NavItem = {
  label: string;
  href?: string;
  children?: { label: string; href: string }[];
};

const NAV: NavItem[] = [
  // { label: paths.company.label, href: paths.company.href },
  { label: paths.industrial.label, href: paths.industrial.href },
  { label: paths.fireProtection.label, href: paths.fireProtection.href },
  {
    label: paths.intelligentBuilding.label,
    href: paths.intelligentBuilding.href,
  },
  { label: paths.careers.label, href: paths.careers.href },
  { label: paths.contact.label, href: paths.contact.href },
  // {
  //   label: "Solutions",
  //   children: [
  //     { label: "Property Managers", href: "/solutions/property-managers" },
  //     { label: "Owners", href: "/solutions/owners" },
  //     { label: "Service Providers", href: "/solutions/service-providers" },
  //   ],
  // },
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
        "fixed top-0 inset-x-0 z-50 transition-all",
        scrolled
          ? "backdrop-blur-xl bg-[rgb(246_249_255/0.55)] border-b border-white/20"
          : "bg-transparent"
      )}
    >
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-24 flex items-center gap-4 justify-around">
        <Link href={"/"}>
          <Image
            src="/hbc-logo.svg"
            alt="Brand logo"
            className="h-20 w-20"
            width={80}
            height={80}
            priority
          />
        </Link>

        <div className="ml-auto flex items-center gap-2">
          <div
            className={cn(
              "hidden md:flex items-center gap-1 rounded-full border px-2 py-1",
              "border-white/25 bg-white/10 backdrop-blur-2xl shadow-[inset_0_1px_0_rgba(255,255,255,.25),0_8px_24px_rgba(31,38,135,.15)]"
            )}
            role="menubar"
            aria-label="Primary"
          >
            {NAV.map((item) => (
              <MenuItem key={item.label} item={item} activeRoot={activeRoot} />
            ))}
          </div>
          {/* <button
            className="hidden sm:inline-flex items-center gap-1 rounded-full border border-white/25 bg-white/10 px-3 py-1.5 text-sm backdrop-blur-2xl hover:bg-white/20 transition"
            aria-label="Language"
          >
            EN
            <svg viewBox="0 0 20 20" className="h-4 w-4" aria-hidden>
              <path d="M5 7l5 6 5-6H5z" fill="currentColor" />
            </svg>
          </button> */}
          <Link
            href={paths.corporate.href}
            className="rounded-full px-4 py-2 text-sm font-semibold text-white shadow-lg transition focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2"
            style={{
              background:
                "linear-gradient(90deg, rgba(6, 110, 176, 1) 0%, rgba(0, 118, 192, 1) 35%, rgba(0, 121, 196, 1) 100%)",
            }}
          >
            {paths.corporate.label}
          </Link>
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
  const isActive = activeRoot === item.label;

  if (!item.children) {
    return (
      <Link
        href={item.href || "/"}
        role="menuitem"
        className={cn(
          "px-3 py-1.5 text-sm rounded-full transition",
          "hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400",
          isActive
            ? "bg-white/25 font-semibold text-slate-900"
            : "text-slate-800"
        )}
      >
        {item.label}
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

      {/* Dropdown */}
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

function MobileMenu() {
  const [open, setOpen] = useState(false);
  return (
    <React.Fragment>
      <button
        className="md:hidden inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/25 bg-white/10 backdrop-blur-2xl"
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

      {open && (
        <div
          className="fixed inset-0 z-50 md:hidden"
          role="dialog"
          aria-modal="true"
        >
          <div
            className="absolute inset-0 bg-black/30"
            onClick={() => setOpen(false)}
          />
          <div className="absolute inset-y-0 right-0 w-[82%] max-w-sm p-4 overflow-y-auto border-l border-white/20 bg-[rgb(246_249_255/0.75)] backdrop-blur-2xl shadow-2xl">
            <div className="flex items-center justify-between">
              <span className="text-base font-semibold">Menu</span>
              <button
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/25 bg-white/10 backdrop-blur-2xl"
                aria-label="Close menu"
                onClick={() => setOpen(false)}
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

            <div className="mt-6 space-y-4">
              {NAV.map((item) => (
                <div key={item.label}>
                  {item.href ? (
                    <Link
                      href={item.href}
                      className="block rounded-xl border border-white/25 bg-white/50 px-4 py-3 backdrop-blur-2xl"
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <details className="rounded-xl border border-white/25 bg-white/50 backdrop-blur-2xl">
                      <summary className="cursor-pointer list-none px-4 py-3 font-medium">
                        {item.label}
                      </summary>
                      <ul className="px-2 pb-2">
                        {item.children?.map((c) => (
                          <li key={c.href}>
                            <Link
                              href={c.href}
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
                <Link
                  href={paths.corporate.href}
                  className="flex-1 rounded-full px-4 py-2 text-center font-semibold text-white shadow-lg"
                  style={{
                    background:
                      "linear-gradient(90deg, rgba(86,60,255,1) 0%, rgba(93,74,255,1) 35%, rgba(116,86,255,1) 100%)",
                  }}
                >
                  {paths.corporate.label}
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
}
