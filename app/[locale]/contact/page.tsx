import React from "react";
import Section from "@/components/Section";
import MapCard from "@/components/map/MapCard";
import Hero from "@/components/ui/Hero";
import ContactForm from "@/components/ContactForm";
import FaqAccordion from "@/components/ui/FaqAccordion";
import InfoGrid from "@/components/InfoGrid";
import ButtonsRow from "@/components/ButtonsRow";
import { siteConfig } from "@/config/site";
import { useTranslations } from "next-intl";

export default function Contact() {
  const t = useTranslations("contact");

  // localized chunks
  const whyPoints = (t.raw("whyPoints") ?? []) as string[];
  const faqItems = (t.raw("faq.items") ?? []) as { q: string; a: string }[];

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white text-slate-900 space-y-12 py-16">
      <Hero
        eyebrow={t("hero.eyebrow")}
        kicker={t("hero.kicker")}
        title={t("hero.title")}
        description={<>{t("hero.description")}</>}
        right={
          <div className="space-y-6">
            <InfoGrid
              items={[
                {
                  label: t("info.address"),
                  value: siteConfig.address1,
                },
                {
                  label: t("info.hours"),
                  value: (
                    <div className="space-y-0.5">
                      <div>{t("info.hoursWeek")}</div>
                      <div>{t("info.hoursFri")}</div>
                    </div>
                  ),
                },
                { label: t("info.regions"), value: t("info.regionUSA") },
                {
                  label: t("info.response"),
                  value: (
                    <span className="tabular-nums">
                      {t("info.responseSla")}
                    </span>
                  ),
                },
              ]}
              cols={{ base: 1, sm: 2, lg: 4 }}
            />
            <InfoGrid
              items={[
                {
                  label: t("info.address"),
                  value: siteConfig.address2,
                },
                {
                  label: t("info.hours"),
                  value: (
                    <div className="space-y-0.5">
                      <div>{t("info.hoursWeek")}</div>
                      <div>{t("info.hoursFri")}</div>
                    </div>
                  ),
                },
                { label: t("info.regions"), value: t("info.regionEU") },
                {
                  label: t("info.response"),
                  value: (
                    <span className="tabular-nums">
                      {t("info.responseSla")}
                    </span>
                  ),
                },
              ]}
              cols={{ base: 1, sm: 2, lg: 4 }}
            />
          </div>
        }
      >
        <ButtonsRow
          primary={t("buttons.call", { phone: siteConfig.phone })}
          primaryHref={`tel:${siteConfig.phone}`}
          secondary={siteConfig.officeEmail as string}
          secondaryHref={`mailto:${siteConfig.officeEmail}`}
        />
      </Hero>

      <Section>
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              {t("lead.title")}
            </h2>
            <p className="mt-2 max-w-prose text-slate-600">
              {t("lead.subtitle")}
            </p>
            <ContactForm />
          </div>
          <div className="space-y-6">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold">{t("direct.title")}</h3>
              <p className="mt-2 text-sm text-slate-600">
                {t("direct.subtitle")}
              </p>
              <ul className="mt-4 space-y-2 text-sm text-slate-700">
                <li>
                  <strong>{t("direct.phone")}:</strong> {siteConfig.phone}
                </li>
                <li>
                  <strong>{t("direct.email")}:</strong> {siteConfig.officeEmail}
                </li>
                <li>
                  <strong>{t("direct.hq")}:</strong> {siteConfig.address1}
                </li>
              </ul>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold">{t("why.title")}</h3>
              <ul className="mt-3 space-y-2 text-sm text-slate-700">
                {whyPoints.map((point) => (
                  <li key={point} className="flex items-start gap-2">
                    <svg
                      className="mt-1 h-4 w-4 flex-none"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-7.25 7.25a1 1 0 01-1.414 0l-3-3a1 1 0 011.414-1.414l2.293 2.293 6.543-6.543a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Section>

      <Section className="bg-slate-50/60" id="contact"></Section>

      <Section>
        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
          {t("map.title")}
        </h2>
        <p className="mt-2 max-w-prose text-slate-600">{t("map.subtitle")}</p>
        <MapCard />
      </Section>

      <Section className="py-0 pb-16">
        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
          {t("faq.title")}
        </h2>
        <FaqAccordion items={faqItems} />
      </Section>
    </main>
  );
}
