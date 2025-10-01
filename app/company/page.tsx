"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef, useState } from "react";

/* ------------------------------------------------------------------ */
/* CONFIG — replace with your real assets                              */
/* ------------------------------------------------------------------ */
const ASSETS = {
  hero: "/images/about/hero-collage.jpg",
  stackA: "/images/about/industrial.jpg",
  stackB: "/images/about/security.jpg",
  stackC: "/images/about/smarthome.jpg",
  stackD: "/images/about/green.jpg",
  map: "/images/about/world-map-light.svg",
  ceo: "/images/about/ceo.jpg",
  cto: "/images/about/cto.jpg",
  ops: "/images/about/ops.jpg",
  cta: "/images/about/cta-card.jpg",
};

/* ------------------------------------------------------------------ */
/* PAGE                                                                */
/* ------------------------------------------------------------------ */
export default function AboutPage() {
  return (
    <main className="relative overflow-hidden bg-[radial-gradient(1600px_800px_at_10%_-10%,#eaf3ff_0%,#d9ebff_60%,#cfe4ff_100%)]">
      {/* speckles + brand glow */}
      <div
        className="pointer-events-none absolute inset-0 mix-blend-multiply opacity-20"
        style={{
          backgroundImage: "url('/textures/speckles.png')",
          backgroundSize: "900px",
        }}
      />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(1200px_600px_at_75%_-5%,rgba(6,110,176,0.10),transparent_65%)]" />

      <HeroAnimated />
      <StoryHorizontal />
      <ValuesInteractive />
      <PresenceParallax />
      <LeadersReveal />
      <StickyShowcase />
      <FinalCTA />
    </main>
  );
}

/* ------------------------------------------------------------------ */
/* HERO — marquee background, parallax stack, kinetic chips            */
/* ------------------------------------------------------------------ */
function HeroAnimated() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const yA = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const yB = useTransform(scrollYProgress, [0, 1], [0, -30]);
  const rot = useTransform(scrollYProgress, [0, 1], [0, -6]);

  return (
    <section ref={ref} className="relative pt-32">
      {/* BIG moving word */}
      <div className="absolute inset-x-0 top-8 z-0 select-none">
        <Marquee word="HBC • ENGINEERING • RELIABILITY • " />
      </div>

      <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-4 sm:px-6 md:grid-cols-12 lg:px-8">
        {/* Copy */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
          className="md:col-span-6"
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-[#066eb0]/10 px-3 py-1 text-sm font-semibold text-[#066eb0]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#066eb0]" />
            About HBC Group
          </span>

          <h1 className="mt-4 text-balance text-4xl font-extrabold leading-tight text-slate-900 sm:text-5xl md:text-6xl">
            Engineering Strength.
            <br />
            <span className="text-[#066eb0]">Delivering Trust.</span>
          </h1>

          <p className="mt-5 max-w-2xl text-lg text-slate-600">
            We keep industries moving, homes smarter, and resources used wisely
            — with reliability at the core.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            {[
              "Industrial Maintenance",
              "Security & Fire",
              "Smart Homes",
              "Green Products",
            ].map((t, i) => (
              <ChipKinetic key={t} delay={i * 0.04}>
                {t}
              </ChipKinetic>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <CTA href="/contact/consultation">Schedule Consultation</CTA>
            <Ghost href="/#work">See Our Work</Ghost>
          </div>
        </motion.div>

        {/* Parallax image stack */}
        <div className="relative md:col-span-6">
          <motion.div
            style={{ y: yA, rotate: rot }}
            className="relative mx-auto h-[420px] max-w-[560px]"
          >
            <GlassCard src={ASSETS.hero} priority />
          </motion.div>

          <motion.div
            style={{ y: yB }}
            className="pointer-events-none absolute -bottom-6 right-2 hidden rotate-3 sm:block"
          >
            <MiniStack />
          </motion.div>
        </div>
      </div>

      <Wave className="text-[#cfe4ff]" />
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* STORY — horizontal scroll (mobile), stepped reveal (desktop)       */
/* ------------------------------------------------------------------ */
function StoryHorizontal() {
  const items = [
    {
      year: "2015",
      title: "Foundation",
      text: "HBC is established in Europe, focused on precision industrial service.",
    },
    {
      year: "2017",
      title: "Safety & Fire",
      text: "Integrated security and advanced fire protection at industrial scale.",
    },
    {
      year: "2019",
      title: "Smart & Green",
      text: "Smart living and sustainable products launch for individuals & SMEs.",
    },
    {
      year: "2023",
      title: "Transatlantic",
      text: "Teams support clients across Europe and the USA, 24/7.",
    },
    {
      year: "Today",
      title: "Trusted Partner",
      text: "A single partner for performance, safety, smart living & sustainability.",
    },
  ];

  return (
    <section className="relative bg-[radial-gradient(1100px_380px_at_80%_0%,#e6f1ff_0%,transparent_60%)]">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          className="text-3xl font-extrabold text-slate-900 sm:text-4xl"
        >
          Our Story
        </motion.h2>

        {/* Mobile: horizontal scroll-snap */}
        <div className="mt-8 grid gap-6 md:hidden">
          <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-3">
            {items.map((it, i) => (
              <motion.div
                key={it.year}
                initial={{ opacity: 0, x: 12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="snap-center shrink-0 w-[84%] rounded-2xl border border-white/60 bg-white/70 p-5 shadow-sm backdrop-blur"
              >
                <div className="text-xs font-semibold uppercase tracking-wide text-[#066eb0]">
                  {it.year}
                </div>
                <div className="text-xl font-bold text-slate-900">
                  {it.title}
                </div>
                <p className="mt-1 text-slate-600">{it.text}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Desktop: stepped reveal left rail */}
        <div className="mt-8 hidden md:grid md:grid-cols-12 md:gap-8">
          <div className="md:col-span-4">
            <p className="text-lg text-slate-600">
              Growth powered by one promise:{" "}
              <span className="font-semibold text-slate-800">
                reliability without compromise.
              </span>
            </p>
            <div className="mt-6 h-1 w-24 rounded-full bg-[#066eb0]" />
          </div>
          <div className="relative md:col-span-8">
            <div className="absolute left-3 top-0 h-full w-px bg-slate-200" />
            <ul className="space-y-6">
              {items.map((it, i) => (
                <motion.li
                  key={it.year}
                  initial={{ opacity: 0, x: 12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.45, delay: i * 0.05 }}
                  className="relative pl-10"
                >
                  <span className="absolute left-0 top-1.5 grid h-6 w-6 place-items-center rounded-full border border-slate-300 bg-white text-xs font-bold text-[#066eb0] shadow-sm">
                    {i + 1}
                  </span>
                  <div className="text-sm font-semibold uppercase tracking-wide text-[#066eb0]">
                    {it.year}
                  </div>
                  <div className="text-xl font-bold text-slate-900">
                    {it.title}
                  </div>
                  <p className="mt-1 text-slate-600">{it.text}</p>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
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
    { city: "Munich, DE", x: 58, y: 38 },
    { city: "Prague, CZ", x: 60, y: 40.5 },
    { city: "Lyon, FR", x: 56, y: 42.5 },
    { city: "Chicago, USA", x: 27, y: 39 },
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
                alt="World map"
                fill
                className="object-cover"
              />
              {offices.map((o, i) => (
                <Pin
                  key={o.city}
                  city={o.city}
                  x={o.x}
                  y={o.y}
                  delay={i * 0.06}
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
/* STICKY SHOWCASE — scroll-driven slideshow                           */
/* ------------------------------------------------------------------ */
function StickyShowcase() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end center"],
  });
  const idx = useTransform(scrollYProgress, [0, 0.33, 0.66, 1], [0, 1, 2, 3]); // 4 slides

  const slides = [
    {
      tag: "Industrial",
      title: "Precision Maintenance",
      text: "Hydraulics, electrical, mechanical, programming, welding.",
      img: ASSETS.stackA,
    },
    {
      tag: "Security",
      title: "Integrated Safety",
      text: "Fire protection, cameras, servers, entry and alarm systems.",
      img: ASSETS.stackB,
    },
    {
      tag: "Individual",
      title: "Smarter Homes",
      text: "Automation, PV & energy, security — effortless and secure.",
      img: ASSETS.stackC,
    },
    {
      tag: "Green",
      title: "Sustainable Products",
      text: "Durable, eco-conscious solutions for a future-ready world.",
      img: ASSETS.stackD,
    },
  ];

  return (
    <section ref={ref} className="relative">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          className="text-3xl font-extrabold text-slate-900 sm:text-4xl"
        >
          What We Do
        </motion.h2>

        <div className="mt-10 grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
          {/* Sticky visuals */}
          <div className="relative lg:col-span-6">
            <div className="sticky top-24">
              <div className="relative h-[420px] overflow-hidden rounded-3xl bg-white/60 shadow-xl ring-1 ring-black/5">
                {slides.map((s, i) => (
                  <SlideImage
                    key={s.title}
                    src={s.img}
                    idx={i}
                    activeIdx={idx}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Scroll text (drives active slide) */}
          <div className="lg:col-span-6 space-y-10">
            {slides.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="rounded-3xl border border-white/60 bg-white/70 p-6 shadow-sm backdrop-blur"
              >
                <span className="text-sm font-semibold uppercase tracking-wide text-[#066eb0]">
                  {s.tag}
                </span>
                <h3 className="mt-1 text-2xl font-bold text-slate-900">
                  {s.title}
                </h3>
                <p className="mt-2 text-slate-600">{s.text}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {s.title.includes("Maintenance") &&
                    [
                      "Hydraulics",
                      "Electrical",
                      "Mechanical",
                      "Programming",
                      "Welding",
                    ].map((c) => <ChipGhost key={c}>{c}</ChipGhost>)}
                  {s.title.includes("Safety") &&
                    [
                      "Fire Protection",
                      "Cameras",
                      "Servers",
                      "Entry Systems",
                      "Alarms",
                    ].map((c) => <ChipGhost key={c}>{c}</ChipGhost>)}
                  {s.title.includes("Homes") &&
                    ["Automation", "PV & Energy", "Security", "Monitoring"].map(
                      (c) => <ChipGhost key={c}>{c}</ChipGhost>
                    )}
                  {s.title.includes("Sustainable") &&
                    [
                      "Accessories",
                      "Agro",
                      "Concrete",
                      "Construction",
                      "Energy",
                      "Soil",
                    ].map((c) => <ChipGhost key={c}>{c}</ChipGhost>)}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      <Wave className="text-[#cfe4ff]" />
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* CTA                                                                 */
/* ------------------------------------------------------------------ */
function FinalCTA() {
  return (
    <section className="relative pb-20">
      <div className="mx-auto max-w-7xl px-4 pt-10 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-[32px] bg-gradient-to-br from-[#066eb0] to-[#3da2dc] p-8 sm:p-10 text-white shadow-xl">
          <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-12">
            <div className="md:col-span-8">
              <h3 className="text-3xl font-extrabold sm:text-4xl">
                Let’s Engineer the Future — Together.
              </h3>
              <p className="mt-3 max-w-2xl text-white/90">
                Plan your project with our specialists. We map the best path for
                performance, safety, and sustainability.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <CTA href="/contact/consultation" light>
                  Schedule Consultation
                </CTA>
                <Ghost href="/contact">Contact Sales</Ghost>
              </div>
            </div>
            <div className="relative md:col-span-4">
              <div className="relative h-48 overflow-hidden rounded-2xl bg-white/10 ring-1 ring-white/20">
                <Image
                  src={ASSETS.cta}
                  alt="Consultation"
                  fill
                  className="object-cover opacity-90"
                />
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120px_120px_at_0%_0%,rgba(255,255,255,0.6),transparent_60%)]" />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 text-center text-sm text-slate-500">
          © {new Date().getFullYear()} HBC Group — All rights reserved.
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* COMPONENTS                                                          */
/* ------------------------------------------------------------------ */

function Marquee({ word }: { word: string }) {
  return (
    <div className="relative">
      <div className="pointer-events-none absolute inset-y-0 left-0 w-12 sm:w-24 bg-gradient-to-r from-[#eaf3ff] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-12 sm:w-24 bg-gradient-to-l from-[#eaf3ff] to-transparent" />
      <div className="mx-auto max-w-[2000px] overflow-hidden">
        <div className="marquee-row">
          {[...Array(8)].map((_, i) => (
            <span key={i} className="marquee-word">
              {word}
            </span>
          ))}
        </div>
      </div>

      <style jsx>{`
        .marquee-row {
          display: flex;
          gap: 8vw;
          padding: 0 2vw;
          white-space: nowrap;
          will-change: transform;
          animation: marqueeX 32s linear infinite;
        }
        .marquee-word {
          font-weight: 900;
          letter-spacing: -0.02em;
          font-size: min(20vw, 120px);
          line-height: 0.9;
          color: rgba(6, 110, 176, 0.08);
          user-select: none;
        }
        @media (min-width: 640px) {
          .marquee-word {
            font-size: min(16vw, 220px);
          }
        }
        @keyframes marqueeX {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  );
}

function GlassCard({
  src,
  priority = false,
}: {
  src: string;
  priority?: boolean;
}) {
  return (
    <div className="relative h-full overflow-hidden rounded-[32px] bg-white/50 shadow-[0_30px_80px_-20px_rgba(6,110,176,0.25)] ring-1 ring-black/5 py-16">
      <Image
        src={src}
        alt=""
        fill
        className="object-cover"
        priority={priority}
      />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(160px_160px_at_0%_0%,rgba(255,255,255,0.5),transparent_60%)]" />
    </div>
  );
}

function MiniStack() {
  return (
    <div className="flex gap-3">
      {[ASSETS.stackA, ASSETS.stackB, ASSETS.stackC].map((s) => (
        <div
          key={s}
          className="relative h-28 w-20 overflow-hidden rounded-2xl shadow-xl ring-1 ring-black/5"
        >
          <Image src={s} alt="" fill className="object-cover" />
        </div>
      ))}
    </div>
  );
}

function ChipKinetic({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  const [h, setH] = useState(false);
  return (
    <motion.span
      initial={{ y: 12, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay }}
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      className="inline-flex items-center gap-2 rounded-full border border-white/60 bg-white/70 px-3 py-1 text-sm text-slate-800 shadow-sm backdrop-blur"
    >
      <motion.span
        animate={{ scale: h ? 1.4 : 1 }}
        transition={{ type: "spring", stiffness: 500, damping: 20 }}
        className="h-1.5 w-1.5 rounded-full bg-[#066eb0]"
      />
      {children}
    </motion.span>
  );
}

function ChipGhost({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-slate-300/70 bg-white/60 px-3 py-1 text-sm text-slate-800 backdrop-blur">
      <span className="h-1.5 w-1.5 rounded-full bg-[#066eb0]" />
      {children}
    </span>
  );
}

function CTA({
  href,
  children,
  light = false,
}: {
  href: string;
  children?: React.ReactNode;
  light?: boolean;
}) {
  const base =
    "group relative inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60";
  return (
    <Link
      href={href}
      className={
        light
          ? `${base} text-[#0b2a3a] bg-white shadow-[0_10px_30px_rgba(255,255,255,0.20)] hover:-translate-y-0.5`
          : `${base} text-white bg-[#066eb0] shadow-[0_10px_30px_rgba(6,110,176,0.35)] hover:-translate-y-0.5`
      }
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        className={light ? "text-[#066eb0]" : "text-white"}
      >
        <rect
          x="3"
          y="4"
          width="18"
          height="18"
          rx="4"
          stroke="currentColor"
          strokeWidth="2"
        />
        <path
          d="M8 2v4M16 2v4M3 10h18"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
      <span>{children ?? "Schedule Consultation"}</span>
      <span className="pointer-events-none absolute inset-0 overflow-hidden rounded-full">
        <span className="absolute -inset-y-8 -left-24 w-24 rotate-12 bg-white/30 blur-[8px] transition-transform duration-700 group-hover:translate-x-[160%]" />
      </span>
    </Link>
  );
}

function Ghost({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-2 rounded-full border border-slate-300/70 bg-white/40 px-5 py-3 text-sm font-semibold text-slate-800 backdrop-blur transition hover:border-slate-500/80"
    >
      {children}
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        className="opacity-70"
      >
        <path
          d="M5 12h14M13 5l7 7-7 7"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </Link>
  );
}

function Wave({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1440 120"
      className={`block h-[90px] w-full ${className}`}
      preserveAspectRatio="none"
      aria-hidden
    >
      <path
        fill="currentColor"
        d="M0,96L60,85.3C120,75,240,53,360,58.7C480,64,600,96,720,101.3C840,107,960,85,1080,85.3C1200,85,1320,107,1380,117.3L1440,128L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"
      />
    </svg>
  );
}

/* Icons */
function IconRibbon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
      <path
        d="M12 2l2.4 4.86L20 8l-4 3.9L17 18l-5-2.6L7 18l1-6.1L4 8l5.6-1.14L12 2z"
        stroke="currentColor"
        strokeWidth="1.6"
      />
    </svg>
  );
}
function IconHandshake() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
      <path
        d="M8 12l3 3 5-5M2 8l6-4 4 4 4-4 6 4M3 18l5-2"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}
function IconSpark() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
      <path
        d="M12 2v5M12 17v5M2 12h5M17 12h5M5 5l3.5 3.5M15.5 15.5L19 19M5 19l3.5-3.5M15.5 8.5L19 5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}
function IconShield() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
      <path
        d="M12 2l8 4v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6l8-4z"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path
        d="M9 12l2 2 4-4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}
function IconPuzzle() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
      <path
        d="M9 3h6v6H9V3zM3 9h6v6H3V9zm12 0h6v6h-6V9zM9 15h6v6H9v-6z"
        stroke="currentColor"
        strokeWidth="1.6"
      />
    </svg>
  );
}
function IconTarget() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M12 2v3M12 19v3M2 12h3M19 12h3"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

/* Tilt card */
function TiltCard({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  const [xy, setXY] = useState({ x: 0, y: 0 });
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.5, delay }}
      onMouseMove={(e) => {
        const r = (e.currentTarget as HTMLElement).getBoundingClientRect();
        const x = ((e.clientX - r.left) / r.width - 0.5) * 8;
        const y = ((e.clientY - r.top) / r.height - 0.5) * 8;
        setXY({ x, y });
      }}
      onMouseLeave={() => setXY({ x: 0, y: 0 })}
      style={{
        rotateX: -xy.y,
        rotateY: xy.x,
        transformStyle: "preserve-3d",
      }}
      className="rounded-2xl border border-white/60 bg-white/70 p-5 shadow-sm backdrop-blur will-change-transform"
    >
      {children}
    </motion.div>
  );
}

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

/* Sticky slides */
function SlideImage({
  src,
  idx,
  activeIdx,
}: {
  src: string;
  idx: number;
  activeIdx: import("framer-motion").MotionValue<number>;
}) {
  // compute visibility from activeIdx
  const opacity = useTransform(
    activeIdx,
    [idx - 0.5, idx, idx + 0.5],
    [0, 1, 0]
  );
  const scale = useTransform(
    activeIdx,
    [idx - 0.5, idx, idx + 0.5],
    [0.95, 1, 0.95]
  );
  return (
    <motion.div style={{ opacity, scale }} className="absolute inset-0">
      <Image src={src} alt="" fill className="object-cover" />
    </motion.div>
  );
}
