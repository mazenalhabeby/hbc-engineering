"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { PageContainser } from "@/components/PageContainser";
import HeroAnimated from "@/components/HeroAnimated";
import FAQ from "@/components/FAQ";
import FinalCTA from "@/components/FinalCTA";
import {
  IconEnergy,
  IconRibbon,
  IconSavings,
  IconShield,
  IconSpark,
  IconTarget,
} from "@/components/Icons";
import TiltCard from "@/components/TiltCard";
import LiveControl from "@/components/LiveControl";
import { useTranslations } from "next-intl";

/* --------------------------------------------------------------- */
/* Assets (replace with your real images in /public)               */
/* --------------------------------------------------------------- */
const ASSETS = {
  hero: "/images/hero-smart-home.png",
  automation: "/images/automation.jpg",
  energy: "/images/energy1.jpg",
  security: "/images/security1.jpg",
  monitoring: "/images/monitoring.jpg",
  comfort: "/images/comfort.jpg",
  savings: "/images/savings.jpg",

  // Shop categories
  accessories: "/images/green/accessories.jpg",
  agro: "/images/green/agro.jpg",
  concrete: "/images/green/concrete.jpg",
  construction: "/images/green/construction.jpg",
  energyCat: "/images/green/energy.jpg",
  soil: "/images/green/soil.jpg",

  cta: "/images/Consultation.jpg",
};

/* If you already have a shared 'paths' helper, swap these */
const paths = {
  contact: { href: "/contact", label: "Contact" },
  corporate: { href: "/corporate", label: "Schedule Meeting" },
  shop: { href: "/shop", label: "Shop Green" },
};

/* --------------------------------------------------------------- */
/* Page                                                            */
/* --------------------------------------------------------------- */
export default function IntelligentBuildingPage() {
  const t = useTranslations("smart");

  const faqItems = [
    { value: "faq-1", question: t("faq.q1"), answer: t("faq.a1") },
    { value: "faq-2", question: t("faq.q2"), answer: t("faq.a2") },
    { value: "faq-3", question: t("faq.q3"), answer: t("faq.a3") },
  ];

  return (
    <PageContainser>
      <HeroAnimated
        badge={t("hero.badge")}
        title={t("hero.title")}
        highlight={t("hero.highlight")}
        description={t("hero.description")}
        chips={[
          t("hero.chips.automation"),
          t("hero.chips.pv"),
          t("hero.chips.security"),
          t("hero.chips.monitoring"),
        ]}
        cta={{ label: t("hero.cta"), href: paths.contact.href }}
        heroImage={ASSETS.hero}
      />

      <SmartHomeFeatureGrid />
      <LiveControl />
      <BadgesMarquee />

      <FAQ title={t("faq.title")} faqItems={faqItems} />

      <FinalCTA
        title={t("cta.title")}
        description={t("cta.description")}
        imageSrc={ASSETS.cta}
        secondaryHref={paths.contact.href}
        secondaryLabel={t("cta.secondaryLabel")}
      />
    </PageContainser>
  );
}

/* --------------------------------------------------------------- */
/* Smart Home – Feature Grid                                       */
/* --------------------------------------------------------------- */
function SmartHomeFeatureGrid() {
  const t = useTranslations("smart.grid");

  const items = [
    {
      t: t("items.0.title"),
      d: t("items.0.desc"),
      img: ASSETS.automation,
      I: IconSpark,
    },
    {
      t: t("items.1.title"),
      d: t("items.1.desc"),
      img: ASSETS.energy,
      I: IconEnergy,
    },
    {
      t: t("items.2.title"),
      d: t("items.2.desc"),
      img: ASSETS.security,
      I: IconShield,
    },
    {
      t: t("items.3.title"),
      d: t("items.3.desc"),
      img: ASSETS.monitoring,
      I: IconTarget,
    },
    {
      t: t("items.4.title"),
      d: t("items.4.desc"),
      img: ASSETS.comfort,
      I: IconRibbon,
    },
    {
      t: t("items.5.title"),
      d: t("items.5.desc"),
      img: ASSETS.savings,
      I: IconSavings,
    },
  ];

  return (
    <section className="relative">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          className="text-3xl font-extrabold text-slate-900 sm:text-4xl"
        >
          {t("heading")}
        </motion.h2>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map(({ t, d, img, I }, i) => (
            <TiltCard key={t} delay={i * 0.04}>
              <div className="relative h-40 w-full overflow-hidden rounded-2xl">
                <Image
                  src={img}
                  alt={t}
                  fill
                  sizes="(max-width:1024px) 100vw, 33vw"
                  className="object-cover"
                />
              </div>
              <div className="mt-4 flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-[#066eb0]/10 text-[#066eb0]">
                  <I />
                </div>
                <h3 className="text-lg font-semibold text-slate-900">{t}</h3>
              </div>
              <p className="mt-2 text-slate-600">{d}</p>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------- */
/* Badges marquee                                                   */
/* --------------------------------------------------------------- */
function BadgesMarquee() {
  const t = useTranslations("smart.tags");
  const tags = [
    t("0"),
    t("1"),
    t("2"),
    t("3"),
    t("4"),
    t("5"),
    t("6"),
    t("7"),
    t("8"),
    t("9"),
    t("10"),
    t("11"),
    t("12"),
  ];

  return (
    <section className="relative py-10">
      <div className="pointer-events-none absolute inset-y-0 left-0 w-12 sm:w-24 bg-gradient-to-r from-[#eaf3ff] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-12 sm:w-24 bg-gradient-to-l from-[#eaf3ff] to-transparent" />
      <div className="mx-auto max-w-[2000px] overflow-hidden">
        <div className="marquee-row-2">
          {tags.concat(tags).map((t, i) => (
            <span
              key={`${t}-${i}`}
              className="inline-flex items-center gap-2 rounded-full border border-slate-300/70 bg-white/60 px-3 py-1 text-sm text-slate-800 backdrop-blur"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[#066eb0]" />
              {t}
            </span>
          ))}
        </div>
      </div>

      <style jsx>{`
        .marquee-row-2 {
          display: flex;
          gap: 16px;
          padding: 0 16px;
          white-space: nowrap;
          will-change: transform;
          animation: marqueeX2 28s linear infinite;
        }
        @keyframes marqueeX2 {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </section>
  );
}
