"use client";

import * as React from "react";
import { useEffect, useMemo, useState } from "react";
import { flushSync } from "react-dom";
import { usePathname } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Separator } from "@/components/ui/separator";
import { Globe } from "lucide-react";
import { useTranslations } from "next-intl";

type Locale = "en" | "de";

const LOCALES: Array<{
  code: Locale;
  label: string;
  sub: string;
  flag: string;
}> = [
  { code: "en", label: "English", sub: "International", flag: "🇬🇧" },
  {
    code: "de",
    label: "Deutsch",
    sub: "Deutschland • Österreich • Schweiz",
    flag: "🇩🇪",
  },
];

/** localePrefix: 'as-needed' */
function buildLocaleHref(currentPath: string, next: Locale): string {
  const path = currentPath.startsWith("/") ? currentPath : `/${currentPath}`;
  const isDe = path === "/de" || path.startsWith("/de/");
  const base = isDe ? path.replace(/^\/de(\/|$)/, "/") : path;
  if (next === "en") return base === "" ? "/" : base;
  return base === "/" ? "/de" : `/de${base}`;
}

export function LanguageDialog() {
  const t = useTranslations("translatorBn");
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false); // ⭐ client-only label guard
  const pathname = usePathname() || "/";

  // Infer locale from path
  const currentLocale: Locale = useMemo(
    () => (pathname === "/de" || pathname.startsWith("/de/") ? "de" : "en"),
    [pathname]
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  const onPick = (next: Locale) => {
    if (next === currentLocale) {
      flushSync(() => setOpen(false));
      return;
    }
    flushSync(() => setOpen(false));
    document.cookie = `NEXT_LOCALE=${next}; Path=/; Max-Age=${
      60 * 60 * 24 * 365
    }; SameSite=Lax`;

    // Hard refresh to the new locale (prevents any reopen flicker)
    const baseHref = buildLocaleHref(pathname, next);
    const qs = typeof window !== "undefined" ? window.location.search : "";
    const hash = typeof window !== "undefined" ? window.location.hash : "";
    const href = `${baseHref}${qs}${hash}`;
    if (typeof window !== "undefined") window.location.replace(href);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="gap-2 rounded-2xl px-3 shadow-sm hover:shadow transition-all"
          aria-label="Change language"
        >
          <Globe className="h-4 w-4" />
          {/* ⭐ Client-only text; avoid hydration mismatch */}
          <span suppressHydrationWarning className="hidden sm:inline">
            {mounted ? (currentLocale === "en" ? "English" : "Deutsch") : ""}
          </span>
        </Button>
      </DialogTrigger>

      <DialogContent
        className="sm:max-w-[520px] rounded-3xl p-0 overflow-hidden"
        onCloseAutoFocus={(e) => e.preventDefault()}
      >
        <div className="h-1 w-full bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-500" />
        <DialogHeader className="px-5 pt-5">
          <DialogTitle className="text-xl">{t("switchL")}</DialogTitle>
          <p className="text-sm text-muted-foreground">{t("langSubTitle")}</p>
        </DialogHeader>

        <div className="px-5 pb-5">
          <div className="rounded-2xl border">
            <Command shouldFilter>
              <div className="p-3">
                <CommandInput placeholder={t("placholder")} />
              </div>
              <Separator />
              <CommandList>
                <CommandEmpty>{t("notFound")}</CommandEmpty>
                <CommandGroup heading="Available">
                  {LOCALES.map((it) => (
                    <CommandItem
                      key={it.code}
                      value={`${it.code} ${it.label}`}
                      onSelect={() => onPick(it.code)}
                      className="cursor-pointer"
                    >
                      <span className="mr-3 text-xl leading-none">
                        {it.flag}
                      </span>
                      <div className="flex flex-col">
                        <span className="font-medium">
                          {it.label}
                          {currentLocale === it.code && (
                            <span className="ml-2 text-xs rounded-full bg-primary/10 px-2 py-0.5">
                              {t("current")}
                            </span>
                          )}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {it.sub}
                        </span>
                      </div>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
