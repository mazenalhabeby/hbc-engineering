"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export type ServiceItem = {
  title: string;
  description: string;
  image: string;
  accent?: string;
  href?: string;
};

const DEFAULT_ITEMS: ServiceItem[] = [
  {
    title: "Fire Protection",
    description:
      "From wood preservation to architectural facades and system integration — we bring safety, beauty, and compliance together.",
    image: "/images/fire1.jpeg",
    accent: "#ef4444",
    href: "/fire-protection",
  },
  {
    title: "Industrial Maintenance and Services",
    description:
      "From preventive or recurring maintenance and diagnostic to  fast responds trouble-shooting or complex relocation of assembly lines.",
    image: "/images/Electrical.jpg",
    accent: "#0ea5e9",
    href: "/industrial",
  },
  {
    title: "Intelligent Building",
    description:
      "Connect comfort, security and energy intelligence. Control, monitor and optimize your space — reliably and effortlessly.",
    image: "/images/Security.jpg",
    accent: "#22c55e",
    href: "/intelligent-building",
  },
];

export default function ServicesSection({
  items = DEFAULT_ITEMS,
  heading = "Our Core Services",
  subheading = "Reliable Maintenance, Fire Safety, and Intelligent Building Solutions You Can Trust",
}: {
  items?: ServiceItem[];
  heading?: string;
  subheading?: string;
}) {
  const palette = useMemo(
    () => items.map((i) => i.accent ?? "#60a5fa"),
    [items]
  );

  // Ensure Industrial is visually centered and larger on desktop (lg+)
  const desktopOrder = (title: string) => {
    if (/industrial/i.test(title)) return "lg:order-2 lg:scale-110 lg:z-10";
    if (/fire protection/i.test(title)) return "lg:order-1";
    if (/intelligent building/i.test(title)) return "lg:order-3";
    return ""; // fallback
  };

  return (
    <section className="relative py-20 md:py-28">
      {/* Soft background grid + glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(50%_50%_at_50%_0%,black,transparent)]"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-slate-50 to-white dark:from-slate-900/40 dark:to-slate-950" />
        <div className="absolute inset-0 opacity-20 [background:radial-gradient(circle_at_1px_1px,#94a3b8_1px,transparent_1px)] [background-size:18px_18px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="mx-auto mb-12 md:mb-16 max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-slate-200/70 bg-white/70 px-3 py-1 text-xs font-medium text-slate-600 shadow-sm backdrop-blur dark:border-slate-700/60 dark:bg-slate-900/40 dark:text-slate-300">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-sky-500" />
            What we do
          </span>
          <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-900 md:text-4xl dark:text-slate-50">
            {heading}
          </h2>
          <p className="mt-3 text-base text-slate-600 md:text-lg dark:text-slate-300">
            {subheading}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:gap-7 md:grid-cols-2 lg:grid-cols-3 place-items-stretch">
          {items.map((item, idx) => (
            <ServiceCard
              key={item.title + idx}
              item={item}
              accent={palette[idx]}
              index={idx}
              className={desktopOrder(item.title)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceCard({
  item,
  accent,
  index,
  className = "",
}: {
  item: ServiceItem;
  accent: string;
  index: number;
  className?: string;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{
        duration: 0.6,
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={`group relative ${className}`}
    >
      {/* Gradient frame */}
      <div
        className="relative rounded-3xl p-[2px] shadow-[0_10px_30px_-10px_rgba(0,0,0,0.35)] transition-transform duration-300 group-hover:scale-[1.02]"
        style={{
          background:
            "linear-gradient(135deg, rgba(255,255,255,.7), rgba(255,255,255,.1))",
        }}
      >
        {/* Accent glow */}
        <div
          className="absolute -inset-0.5 rounded-3xl opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-60"
          style={{
            background: `radial-gradient(120px 80px at 10% 10%, ${accent}55, transparent)`,
          }}
          aria-hidden
        />

        {/* Card inner */}
        <div className="relative overflow-hidden rounded-[calc(1.5rem-2px)] bg-white/80 backdrop-blur-xl ring-1 ring-slate-200/60 dark:bg-slate-900/50 dark:ring-slate-700/50">
          {/* Media */}
          <div className="relative h-44 w-full overflow-hidden md:h-48">
            <Image
              src={item.image}
              alt={item.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-[1.06]"
              priority={/industrial/i.test(item.title)} // prioritize the center one
            />
            {/* top gradient fade */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-transparent" />

            {/* Floating chip */}
            <div className="absolute left-4 top-4">
              <span
                className="inline-flex items-center rounded-full px-3 py-1 text-[11px] font-semibold text-white/90 shadow-lg"
                style={{ background: accent }}
              >
                {item.title}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-3 p-5 md:p-6">
            <h3 className="text-xl font-bold text-slate-900 dark:text-slate-50">
              {item.title}
            </h3>
            <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              {item.description}
            </p>

            {/* CTAs */}
            <div className="pt-2">
              <a
                href={item.href ?? "#"}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200/70 bg-white px-3 py-2 text-sm font-semibold text-slate-800 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md dark:border-slate-700/60 dark:bg-slate-800/70 dark:text-slate-100"
                style={{ boxShadow: `0 6px 20px -10px ${accent}80` }}
              >
                Learn more
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-4 w-4"
                >
                  <path d="M13.5 4.5a1 1 0 10-2 0v9.586l-3.293-3.293a1 1 0 10-1.414 1.414l5 5a1 1 0 001.414 0l5-5a1 1 0 10-1.414-1.414L13.5 14.086V4.5z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Hover ring accent */}
        <div
          className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ boxShadow: `inset 0 0 0 1.5px ${accent}50` }}
        />
      </div>

      {/* Subtle parallax hover (no JS libs) */}
      <div
        className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(400px 120px at 80% -10%, rgba(255,255,255,0.5), transparent)",
        }}
        aria-hidden
      />
    </motion.article>
  );
}
