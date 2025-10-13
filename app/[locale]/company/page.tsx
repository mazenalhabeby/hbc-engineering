"use client";

import Image from "next/image";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";
import { TimelineComponent } from "@/components/TimeLineCompanyStore";
import { paths } from "@/lib/urls";
import { ServicesCarousel } from "@/components/ServicesCarousel";
import { PageContainser } from "@/components/PageContainser";
import Wave from "@/components/Wave";
import {
  IconHandshake,
  IconPuzzle,
  IconRibbon,
  IconShield,
  IconSpark,
  IconTarget,
} from "@/components/Icons";
import TiltCard from "@/components/TiltCard";
import ChipGhost from "@/components/ChipGhost";
import HeroAnimated from "@/components/HeroAnimated";
import FinalCTA from "@/components/FinalCTA";

/* ------------------------------------------------------------------ */
/* CONFIG — update with your own assets                                */
/* ------------------------------------------------------------------ */
const ASSETS = {
  hero: "/images/comapnyHeroSection.png",
  stackA: "/images/house.jpg",
  stackB: "/images/Energy.jpg",
  stackC: "/images/mechanical.jpg",
  stackD: "/images/about/green.jpg",
  map: "/images/world-map-hbc.png",
  ceo: "/images/about/ceo.jpg",
  cto: "/images/about/cto.jpg",
  ops: "/images/about/ops.jpg",
  cta: "/images/Consultation.jpg",
};

/* ------------------------------------------------------------------ */
/* PAGE                                                                */
/* ------------------------------------------------------------------ */
export default function CompanyPage() {
  return (
    <PageContainser>
      <HeroAnimated
        badge="HBC Engineering"
        title="Engineering Strength."
        highlight="Delivering Trust."
        description="We keep industries moving, homes smarter, and resources used wisely — with reliability at the core."
        chips={[
          "Industrial Maintenance",
          "Security & Fire Safety",
          "Smart Homes & Buildings",
          "Green Products & Solutions",
          "Fire Protection",
        ]}
        cta={{ label: paths.corporate.label, href: paths.corporate.href }}
        heroImage={ASSETS.hero}
      />
      <TimelineComponent />
      <ValuesInteractive />
      <PresenceParallax />
      <LeadersReveal />
      <ServicesCarousel />
      <FinalCTA
        title="Let’s Engineer the Future — Together."
        description="Plan your project with our specialists. We map the best path for performance, safety, and sustainability."
        primaryLabel={paths.corporate.label}
        primaryHref={paths.corporate.href}
        secondaryLabel="Get in Touch"
        secondaryHref={paths.contact.href}
        imageSrc={ASSETS.cta}
      />
    </PageContainser>
  );
}

/* ------------------------------------------------------------------ */
/* VALUES — hover-tilt, subtle pop, icon micro-animation              */
/* ------------------------------------------------------------------ */
function ValuesInteractive() {
  const values = [
    {
      t: "Proven Experience",
      d: "Hydraulics, electrical, mechanical, programming, welding — at scale.",
      I: IconRibbon,
    },
    {
      t: "Trusted Partnership",
      d: "Long-term relationships built on clarity and delivery.",
      I: IconHandshake,
    },
    {
      t: "Innovation-Driven",
      d: "Smart systems and green tech that keep you ahead.",
      I: IconSpark,
    },
    {
      t: "End-to-End Reliability",
      d: "Diagnostics to relocations — uptime guaranteed.",
      I: IconShield,
    },
    {
      t: "Tailored Flexibility",
      d: "Strategies for industrial giants and individuals alike.",
      I: IconPuzzle,
    },
    {
      t: "Unwavering Commitment",
      d: "We stand with you from start to finish.",
      I: IconTarget,
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
          What Drives Us
        </motion.h2>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {values.map(({ t, d, I }, i) => (
            <TiltCard key={t} delay={i * 0.03}>
              <div className="flex items-center gap-3">
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
      <Wave className="text-[#d9ebff]" />
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* PRESENCE — parallax map, pulsing pins                              */
/* ------------------------------------------------------------------ */
function PresenceParallax() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const s = useSpring(y, { stiffness: 90, damping: 20 });

  const offices = [
    {
      city: "Austria",
      address: "Kapellenstraße 30, 4664 Laakirchen, Austria",
      x: 48,
      y: 41,
    },
    {
      city: "USA",
      address: "260 Peachtree Street, 30303 Atlanta, Georgia, USA",
      x: 18,
      y: 47,
    },
  ];

  return (
    <section ref={ref} className="relative">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-12">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            className="md:col-span-6"
          >
            <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
              Global Presence
            </h2>
            <p className="mt-3 text-lg text-slate-600">
              From Europe to the USA, our engineers provide 24/7 service —
              wherever reliability matters most.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <ChipGhost>24/7 Service</ChipGhost>
              <ChipGhost>EU & USA</ChipGhost>
              <ChipGhost>International Partners</ChipGhost>
            </div>
          </motion.div>

          <div className="relative md:col-span-6">
            <motion.div
              style={{ y: s }}
              className="relative mx-auto aspect-[16/10] max-w-[640px] overflow-hidden rounded-3xl bg-white/60 shadow-lg ring-1 ring-black/5"
            >
              <Image
                src={ASSETS.map}
                alt="World map with HBC offices"
                fill
                sizes="(max-width: 1024px) 90vw, 640px"
                className="object-contain"
              />
              {offices.map((o, i) => (
                <Pin
                  key={o.city}
                  city={o.city}
                  x={o.x}
                  y={o.y}
                  delay={i * 0.08}
                />
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* LEADERSHIP — hover reveal cards                                     */
/* ------------------------------------------------------------------ */
function LeadersReveal() {
  const people = [
    {
      name: "Adrian Novak",
      role: "Chief Executive Officer",
      quote: "Reliability without compromise.",
      img: ASSETS.ceo,
    },
    {
      name: "Lena Kovacs",
      role: "Chief Technology Officer",
      quote: "Engineering meets intelligence.",
      img: ASSETS.cto,
    },
    {
      name: "Marco Steiner",
      role: "Head of Operations",
      quote: "Uptime is everything.",
      img: ASSETS.ops,
    },
  ];

  return (
    <section className="relative bg-[radial-gradient(1100px_380px_at_15%_-5%,#e6f1ff_0%,transparent_60%)]">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          className="text-3xl font-extrabold text-slate-900 sm:text-4xl"
        >
          Leadership
        </motion.h2>

        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {people.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.45, delay: i * 0.05 }}
              className="group overflow-hidden rounded-3xl border border-white/60 bg-white/70 shadow-sm backdrop-blur"
            >
              <div className="relative h-64 w-full overflow-hidden">
                <Image
                  src={p.img}
                  alt={p.name}
                  fill
                  sizes="(max-width:1024px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.06]"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-black/0 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </div>
              <div className="p-6">
                <div className="text-lg font-semibold text-slate-900">
                  {p.name}
                </div>
                <div className="text-sm text-slate-600">{p.role}</div>
                <p className="mt-3 text-slate-700">
                  <span className="text-[#066eb0]">“</span>
                  {p.quote}
                  <span className="text-[#066eb0]">”</span>
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* REUSABLE UI                                                         */
/* ------------------------------------------------------------------ */

/* Map pin */
function Pin({
  city,
  x,
  y,
  delay = 0,
}: {
  city: string;
  x: number;
  y: number;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 0.4, delay }}
      className="absolute"
      style={{ left: `${x}%`, top: `${y}%` }}
    >
      <div className="relative">
        <span className="absolute -left-4 -top-6 rounded-full bg-[#066eb0] px-2 py-0.5 text-xs font-semibold text-white shadow-md">
          {city}
        </span>
        <span className="relative block h-3 w-3 rounded-full bg-[#066eb0] ring-4 ring-[#066eb0]/20">
          <span className="absolute inset-[-6px] rounded-full border border-[#066eb0]/30 animate-ping" />
        </span>
      </div>
    </motion.div>
  );
}
