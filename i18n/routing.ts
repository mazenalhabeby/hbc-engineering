// i18n/routing.ts
import {createNavigation} from 'next-intl/navigation';

export const locales = ['en', 'de'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'en';
export const localePrefix = 'as-needed' as const;

// (optional) if you use localized pathnames:
// export const pathnames = {
//   '/': '/',
//   '/about': '/about'
// } satisfies Pathnames<typeof locales>;

// Bundle config in a typed object so defaultLocale is NOT widened to string
export const routing = {
  locales,
  defaultLocale,
  localePrefix,
  // pathnames
  // localeDetection: true,         // optional
  // alternateLinks: true           // optional
} as const;

// Create typed navigation helpers
export const {Link, redirect, usePathname, useRouter, getPathname} =
  createNavigation(routing);
