import React from "react";
import Section from "@/components/Section";
import MapCard from "@/components/map/MapCard";
import Hero from "@/components/ui/Hero";
import ContactForm from "@/components/ContactForm";
import FaqAccordion from "@/components/ui/FaqAccordion";
import InfoGrid from "@/components/InfoGrid";
import ButtonsRow from "@/components/ButtonsRow";
import { siteConfig } from "@/config/site";

export default function Contact() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white text-slate-900 space-y-12 py-16">
      <Hero
        eyebrow="Contact HBC Group"
        kicker="We’re here to help"
        title="Contact us"
        description={
          <>
            Sales • Support • Partnerships — share a few details and we’ll get
            back within one business day.
          </>
        }
        right={
          <div className="space-y-6">
            <InfoGrid
              items={[
                {
                  label: "Address",
                  value: siteConfig.address1,
                },
                {
                  label: "Hours",
                  value: (
                    <div className="space-y-0.5">
                      <div>Mon–Thu · 8:00–17:00</div>
                      <div>Fri · 8:00–12:00</div>
                    </div>
                  ),
                },
                { label: "Regions", value: "USA" },
                {
                  label: "Response",
                  value: (
                    <span className="tabular-nums">&lt; 1 business day</span>
                  ),
                },
              ]}
              cols={{ base: 1, sm: 2, lg: 4 }} // 1 col on mobile, 2 on small, 4 on large
            />
            <InfoGrid
              items={[
                {
                  label: "Address",
                  value: siteConfig.address2,
                },
                {
                  label: "Hours",
                  value: (
                    <div className="space-y-0.5">
                      <div>Mon–Thu · 8:00–17:00</div>
                      <div>Fri · 8:00–12:00</div>
                    </div>
                  ),
                },
                { label: "Regions", value: "EU" },
                {
                  label: "Response",
                  value: (
                    <span className="tabular-nums">&lt; 1 business day</span>
                  ),
                },
              ]}
              cols={{ base: 1, sm: 2, lg: 4 }} // 1 col on mobile, 2 on small, 4 on large
            />
          </div>
        }
      >
        <ButtonsRow
          primary={`call ${siteConfig.phone}`}
          primaryHref={`tel:${siteConfig.phone}`}
          secondary={siteConfig.officeEmail as string}
          secondaryHref={`mailto:${siteConfig.officeEmail}`}
        />
      </Hero>

      <Section>
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Tell us about your project
            </h2>
            <p className="mt-2 max-w-prose text-slate-600">
              Choose a service below and share a few details. We’ll follow up
              with the next steps.
            </p>
            <ContactForm />
          </div>
          <div className="space-y-6">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold">Direct contact</h3>
              <p className="mt-2 text-sm text-slate-600">
                Prefer to talk now? Reach us anytime.
              </p>
              <ul className="mt-4 space-y-2 text-sm text-slate-700">
                <li>
                  <strong>Phone:</strong> {siteConfig.phone}
                </li>
                <li>
                  <strong>Email:</strong> {siteConfig.officeEmail}
                </li>
                <li>
                  <strong>HQ:</strong> {siteConfig.address1}
                </li>
              </ul>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold">Why HBC</h3>
              <ul className="mt-3 space-y-2 text-sm text-slate-700">
                {[
                  "Certified multi-OEM technicians",
                  "Rapid spare part sourcing",
                  "Digital checklists & reports",
                  "EU & USA coverage",
                ].map((point) => (
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
          Find us
        </h2>
        <p className="mt-2 max-w-prose text-slate-600">
          Visit our headquarters or schedule a site visit—we’ll come to you.
        </p>
        <MapCard />
      </Section>

      <Section className="py-0 pb-16">
        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">FAQs</h2>
        <FaqAccordion
          items={[
            {
              q: "Can you use my existing devices?",
              a: "In many cases yes. We audit current gear and integrate compatible devices via KNX, Matter, Zigbee or bridges.",
            },
            {
              q: "Do I need wiring or can it be wireless?",
              a: "Both are possible. New builds favor wired backbones; renovations can use secure, reliable wireless where suitable.",
            },
            {
              q: "Is there an app?",
              a: "Yes—wall panel and mobile app with remote access, notifications, scenes and user roles.",
            },
            {
              q: "What about privacy?",
              a: "Local-first control where possible, strong encryption for remote access, and clear data retention settings.",
            },
          ]}
        />
      </Section>
    </main>
  );
}
