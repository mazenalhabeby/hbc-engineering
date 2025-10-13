// src/i18n/request.ts (or wherever your file lives)
import {getRequestConfig} from "next-intl/server";
import {hasLocale} from "next-intl";
import {routing} from "./routing";
import fs from "node:fs";
import path from "node:path";

export default getRequestConfig(async ({requestLocale}) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;
  const filePath = path.join(process.cwd(), "messages", `${locale}.json`);

  let messages: Record<string, unknown>;
  try {
    messages = JSON.parse(fs.readFileSync(filePath, "utf8"));
  } catch  {
    const fallbackPath = path.join(process.cwd(), "messages", `${routing.defaultLocale}.json`);
    messages = JSON.parse(fs.readFileSync(fallbackPath, "utf8"));
  }

  return { locale, messages };
});
