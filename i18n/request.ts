// i18n/request.ts
import {getRequestConfig} from 'next-intl/server';
import {hasLocale} from 'next-intl';
import {routing} from './routing';

export default getRequestConfig(async ({requestLocale}) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  // ✅ Works on Edge: bundle-time dynamic import of a single JSON file
  // Make sure you have: /messages/en.json and /messages/de.json
  const messages = (await import(`../messages/${locale}.json`)).default;

  return {locale, messages};
});
