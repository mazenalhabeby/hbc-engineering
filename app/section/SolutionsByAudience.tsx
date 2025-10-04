"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

/* replace these with your real images */
const industrialImgs = [
  "/images/Hydraulics.jpg",
  "/images/Electrical.jpg",
  "/images/Mechanical.jpg",
  "/images/Programming.jpg",
];

const fireImgs = [
  "/images/house.jpg", // protected house / facade
  "/images/house2.jpg", // wood preservation close-up
  "/images/fire1.jpeg", // film protection on facade/glass
  "/images/fire2.jpeg", // abstract tech / lab visual
];

const intelligentBuildingImgs = [
  "/images/SmartAutomation.jpg",
  "/images/Security.jpg",
  "/images/Energy.jpg",
  "/images/Soil.jpg",
];

const chip = (t: string) => (
  <span
    key={t}
    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/70 text-slate-800 border border-white/60 shadow-sm backdrop-blur"
  >
    <span className="h-1.5 w-1.5 rounded-full bg-[#066eb0]" />
    {t}
  </span>
);

function Marquee({
  items,
  reverse = false,
}: {
  items: string[];
  reverse?: boolean;
}) {
  return (
    <div className="relative overflow-hidden py-3">
      <div
        className={`flex gap-3 whitespace-nowrap will-change-transform animate-marquee ${
          reverse ? "animate-marquee-rev" : ""
        }`}
      >
        {[...items, ...items].map((t, i) => (
          <span key={i} className="mx-1">
            {chip(t)}
          </span>
        ))}
      </div>
      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        @keyframes marqueeRev {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0%);
          }
        }
        .animate-marquee {
          animation: marquee 18s linear infinite;
        }
        .animate-marquee-rev {
          animation: marqueeRev 18s linear infinite;
        }
      `}</style>
    </div>
  );
}

function ImageStack({ images }: { images: string[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y1 = useTransform(scrollYProgress, [0, 1], [20, -20]);
  const y2 = useTransform(scrollYProgress, [0, 1], [-10, 10]);
  const y3 = useTransform(scrollYProgress, [0, 1], [30, -30]);

  return (
    <div ref={ref} className="relative h-[520px] w-full">
      <motion.div style={{ y: y1 }} className="absolute right-6 top-0">
        <div className="relative h-64 w-44 overflow-hidden rounded-2xl shadow-2xl ring-1 ring-black/5">
          <Image src={images[0]} alt="" fill className="object-cover" />
        </div>
      </motion.div>

      <motion.div style={{ y: y2 }} className="absolute right-56 top-16">
        <div className="relative h-72 w-52 overflow-hidden rounded-2xl shadow-2xl ring-1 ring-black/5">
          <Image src={images[1]} alt="" fill className="object-cover" />
        </div>
      </motion.div>

      <motion.div style={{ y: y3 }} className="absolute right-10 bottom-2">
        <div className="relative h-52 w-40 overflow-hidden rounded-2xl shadow-2xl ring-1 ring-black/5">
          <Image src={images[2]} alt="" fill className="object-cover" />
        </div>
      </motion.div>

      <motion.div style={{ y: y2 }} className="absolute right-64 bottom-6">
        <div className="relative h-40 w-40 overflow-hidden rounded-2xl shadow-2xl ring-1 ring-black/5">
          <Image src={images[3]} alt="" fill className="object-cover" />
        </div>
      </motion.div>

      {/* brand glow */}
      <div className="pointer-events-none absolute -inset-8 rounded-[36px] bg-[#066eb0]/10 blur-3xl" />
    </div>
  );
}

function Band({
  label,
  title,
  desc,
  chipsTop,
  chipsBottom,
  images,
  flip = false,
}: {
  label: string;
  title: string;
  desc: string;
  chipsTop: string[];
  chipsBottom: string[];
  images: string[];
  flip?: boolean;
}) {
  return (
    <section className="relative py-16 mt-32 mb-16">
      <div className="absolute inset-0 bg-[radial-gradient(1200px_400px_at_10%_0%,#e1f1fd_0%,transparent_60%)]" />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div
          className={`grid grid-cols-1 items-center gap-10 lg:grid-cols-12 ${
            flip ? "lg:[&>div:first-child]:order-2" : ""
          }`}
        >
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6"
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-[#066eb0]/10 px-3 py-1 text-sm font-semibold text-[#066eb0]">
              <span className="h-1.5 w-1.5 rounded-full bg-green-600" />
              {label}
            </span>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
              {title}
            </h2>
            <p className="mt-4 whitespace-pre-line text-lg text-slate-600">
              {desc}
            </p>

            <div className="mt-8">
              <Marquee items={chipsTop} />
              <Marquee items={chipsBottom} reverse />
            </div>
          </motion.div>

          {/* Images */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-6"
          >
            <ImageStack images={images} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default function SolutionsShowcaseAnimated() {
  return (
    <div className="relative isolate">
      {/* top wave */}
      <svg
        className="absolute -top-24 left-0 w-full opacity-30"
        viewBox="0 0 1440 150"
        aria-hidden
      >
        <path
          fill="#066eb0"
          d="M0,128L60,122.7C120,117,240,107,360,101.3C480,96,600,96,720,85.3C840,75,960,53,1080,64C1200,75,1320,117,1380,138.7L1440,160V0H0Z"
        />
      </svg>

      {/* INDUSTRIAL */}
      <Band
        label="Industrial"
        title="From Uptime to Upgrades — We’ve Got You Covered"
        desc={`Precision maintenance, integrated security, and complex relocations engineered for uptime.
At HBC Group, we go beyond simple repairs — we deliver complete lifecycle care for heavy industries. From hydraulic and electrical systems to mechanical structures, welding, and programming, our expertise ensures every machine runs at peak performance.

We also safeguard operations with advanced fire protection, camera networks, servers, entry systems, and alarms, tailored for industrial scale. And when it comes to growth, our teams handle dismantling, relocation, rebuilding, and new construction projects — seamlessly and with minimal downtime.

Our promise: less disruption, more productivity, and reliability without compromise.`}
        chipsTop={[
          "Hydraulics",
          "Electrical",
          "Mechanical",
          "Welding",
          "Programming",
        ]}
        chipsBottom={[
          "Fire Protection",
          "Wood Preservation",
          "Film Protection",
          "Facades",
          "Cameras",
          "Servers",
          "Entry Systems",
          "Alarms",
        ]}
        images={industrialImgs}
      />

      {/* FIRE PROTECTION (NEW) */}
      <Band
        label="Fire Protection"
        title="Advanced Fire Protection"
        desc={`Engineered coatings and treatments that shield structures against extreme fire conditions.
          
Our solutions form a protective barrier that resists ignition, slows spread, and preserves structural integrity. From wood preservation for natural materials to film technologies that protect facades and exteriors, we deliver long-lasting defense with minimal maintenance — a new standard in resilience, safety, and sustainability.`}
        chipsTop={["Wood Preservation", "Film Protection"]}
        chipsBottom={[
          "Facade Shielding",
          "Exterior Coatings",
          "Compliance & Testing",
        ]}
        images={fireImgs}
        flip
      />

      {/* intelligent Building */}
      <Band
        label="Intelligent Building"
        title="Smarter Homes, Greener Living"
        desc={`Comfort, security, and energy intelligence — beautifully connected.
At HBC Group, we transform houses into smart living spaces that think ahead. From automation systems that adapt to your daily routines, to solar integration, energy monitoring, and home security, we make modern living effortless and secure.

But our vision doesn’t stop at homes. With our Shop Green Products, individuals and small businesses can access sustainable solutions across accessories, agriculture, concrete, construction, energy, and soil management. Every product is designed to be durable, eco-conscious, and future-ready.

Our mission: smarter homes, greener choices, and a lifestyle built for tomorrow.`}
        chipsTop={["Smart Automation", "PV & Energy", "Security"]}
        chipsBottom={[
          "Accessories",
          "Agro",
          "Concrete",
          "Construction",
          "Energy",
          "Soil",
        ]}
        images={intelligentBuildingImgs}
      />

      {/* bottom wave */}
      <svg
        className="absolute -bottom-24 left-0 w-full opacity-30 rotate-180"
        viewBox="0 0 1440 150"
        aria-hidden
      >
        <path
          fill="#066eb0"
          d="M0,128L60,122.7C120,117,240,107,360,101.3C480,96,600,96,720,85.3C840,75,960,53,1080,64C1200,75,1320,117,1380,138.7L1440,160V0H0Z"
        />
      </svg>
    </div>
  );
}
