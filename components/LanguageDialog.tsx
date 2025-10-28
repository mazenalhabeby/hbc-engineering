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

const LOCALES = [
  { code: "en", label: "English", sub: "International", flag: "🇬🇧" },
  {
    code: "de",
    label: "Deutsch",
    sub: "Deutschland • Österreich • Schweiz",
    flag: "🇩🇪",
  },
  {
    code: "fr",
    label: "Français",
    sub: "France • Belgique • Suisse",
    flag: "🇫🇷",
  },
  {
    code: "it",
    label: "Italiano",
    sub: "Italia • Svizzera • San Marino",
    flag: "🇮🇹",
  },
  {
    code: "da",
    label: "Dansk",
    sub: "Danmark • Grønland • Færøerne",
    flag: "🇩🇰",
  },
  {
    code: "no",
    label: "Norsk",
    sub: "Norge • Svalbard • Jan Mayen",
    flag: "🇳🇴",
  },
  {
    code: "nl",
    label: "Nederlands",
    sub: "Nederland • België • Suriname",
    flag: "🇳🇱",
  },
] as const;

type Locale = (typeof LOCALES)[number]["code"];
const DEFAULT_LOCALE: Locale = "en";

const LOCALE_SET = new Set<Locale>(LOCALES.map((l) => l.code));

function parsePathLocale(pathname: string): {
  locale: Locale;
  barePath: string;
} {
  const path = pathname.startsWith("/") ? pathname : `/${pathname}`;
  const [, firstSegment = ""] = path.split("/");
  const candidate = firstSegment as Locale;
  if (LOCALE_SET.has(candidate)) {
    const bare = path.replace(new RegExp(`^/${candidate}(?=/|$)`), "") || "/";
    return { locale: candidate, barePath: bare };
  }
  return { locale: DEFAULT_LOCALE, barePath: path || "/" };
}

function buildLocaleHref(currentPath: string, next: Locale): string {
  const { barePath } = parsePathLocale(currentPath);
  if (next === DEFAULT_LOCALE) return barePath === "" ? "/" : barePath;
  return barePath === "/" ? `/${next}` : `/${next}${barePath}`;
}

function getLocaleMeta(code: Locale) {
  return LOCALES.find((l) => l.code === code)!;
}

export function LanguageDialog() {
  const t = useTranslations("translatorBn");
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname() || "/";

  const currentLocale: Locale = useMemo(
    () => parsePathLocale(pathname).locale,
    [pathname]
  );
  const currentLocaleLabel = getLocaleMeta(currentLocale).label;

  useEffect(() => setMounted(true), []);

  const onPick = (next: Locale) => {
    if (next === currentLocale) {
      flushSync(() => setOpen(false));
      return;
    }
    flushSync(() => setOpen(false));
    document.cookie = `NEXT_LOCALE=${next}; Path=/; Max-Age=${
      60 * 60 * 24 * 365
    }; SameSite=Lax`;
    const baseHref = buildLocaleHref(pathname, next);
    const qs = typeof window !== "undefined" ? window.location.search : "";
    const hash = typeof window !== "undefined" ? window.location.hash : "";
    if (typeof window !== "undefined")
      window.location.replace(`${baseHref}${qs}${hash}`);
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
          <span suppressHydrationWarning className="hidden sm:inline">
            {mounted ? currentLocaleLabel : ""}
          </span>
        </Button>
      </DialogTrigger>

      {/* GRID LAYOUT so the list can scroll; row 3 gets minmax(0,1fr) + min-h-0 */}
      <DialogContent
        className="
          sm:max-w-[520px] max-h-[85vh] rounded-3xl p-0 overflow-hidden
          grid grid-rows-[auto_auto_minmax(0,1fr)]
        "
        onCloseAutoFocus={(e) => e.preventDefault()}
      >
        <div className="h-1 w-full bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-500" />
        <DialogHeader className="px-5 pt-5">
          <DialogTitle className="text-xl">{t("switchL")}</DialogTitle>
          <p className="text-sm text-muted-foreground">{t("langSubTitle")}</p>
        </DialogHeader>

        {/* Row 3: scroll container MUST have min-h-0 so the child can overflow */}
        <div className="px-5 pb-5 min-h-0">
          <div className="rounded-2xl border min-h-0 overflow-hidden">
            {/* Make the list itself scrollable */}
            <Command shouldFilter className="h-full">
              <div className="p-3">
                <CommandInput placeholder={t("placholder")} />
              </div>
              <Separator />
              {/* This is the scrollable element */}
              <CommandList className="max-h-[60vh] h-full overflow-y-auto overscroll-contain">
                <CommandEmpty>{t("notFound")}</CommandEmpty>
                <CommandGroup heading="Available">
                  {LOCALES.map((loc) => (
                    <CommandItem
                      key={loc.code}
                      value={`${loc.code} ${loc.label}`}
                      onSelect={() => onPick(loc.code)}
                      className="cursor-pointer"
                    >
                      <span className="mr-3 text-xl leading-none">
                        {loc.flag}
                      </span>
                      <div className="flex flex-col">
                        <span className="font-medium">
                          {loc.label}
                          {currentLocale === loc.code && (
                            <span className="ml-2 text-xs rounded-full bg-primary/10 px-2 py-0.5">
                              {t("current")}
                            </span>
                          )}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {loc.sub}
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
