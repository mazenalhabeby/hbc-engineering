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

const faqItems = [
  {
    value: "faq-1",
    question: "Do I need an existing smart-home hub?",
    answer:
      "Not necessarily. We can integrate with your current ecosystem or deploy a robust, secure HBC stack — whichever delivers reliability with the least friction.",
  },
  {
    value: "faq-2",
    question: "Can I start small and expand later?",
    answer:
      "Yes. Begin with one priority (e.g., energy monitoring). We design for modular growth, so features can be added as your needs evolve.",
  },
  {
    value: "faq-3",
    question: "How do you protect my data?",
    answer:
      "We design with privacy-by-default, secure server systems, and least-privilege access. Your data stays yours, encrypted in motion and at rest.",
  },
];

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
  return (
    <PageContainser>
      <HeroAnimated
        badge="HBC Intelligent Building"
        title="Smarter Homes."
        highlight="Greener Living."
        description="Connect comfort, security and energy intelligence. Control, monitor and optimize your space — reliably and effortlessly."
        chips={["Automation", "PV & Energy", "Security", "Monitoring"]}
        cta={{ label: "Conect Us", href: paths.contact.href }}
        heroImage={ASSETS.hero}
      />
      <SmartHomeFeatureGrid />
      <LiveControl />
      <BadgesMarquee />
      <FAQ title="Frequently Asked Questions" faqItems={faqItems} />
      <FinalCTA
        title="Let’s make your building intelligent — and efficient."
        description="We’ll map the best path for comfort, safety and savings with a focus on reliability."
        imageSrc={ASSETS.cta}
        secondaryHref={paths.contact.href}
        secondaryLabel={"Contact Sales"}
      />
    </PageContainser>
  );
}

/* --------------------------------------------------------------- */
/* Smart Home – Feature Grid                                       */
/* --------------------------------------------------------------- */
function SmartHomeFeatureGrid() {
  const items = [
    {
      t: "Automation",
      d: "Scenes, schedules, voice control — your home, orchestrated.",
      img: ASSETS.automation,
      I: IconSpark,
    },
    {
      t: "PV & Energy",
      d: "Monitor usage, store intelligently, shave peaks & save.",
      img: ASSETS.energy,
      I: IconEnergy,
    },
    {
      t: "Security",
      d: "Alarms, entry, cameras & server systems — integrated.",
      img: ASSETS.security,
      I: IconShield,
    },
    {
      t: "Monitoring",
      d: "Real-time health of devices, rooms and subsystems.",
      img: ASSETS.monitoring,
      I: IconTarget,
    },
    {
      t: "Comfort",
      d: "Lighting, climate and shading that adapts to you.",
      img: ASSETS.comfort,
      I: IconRibbon,
    },
    {
      t: "Savings",
      d: "Data-driven optimization that cuts waste, not comfort.",
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
          Smart Home, the HBC Way
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
  const tags = [
    "Hydraulics",
    "Electrical",
    "Mechanical",
    "Programming",
    "PV & Energy",
    "Security",
    "Monitoring",
    "Accessories",
    "Agro",
    "Concrete",
    "Construction",
    "Energy",
    "Soil",
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
