"use client";

import Image, { StaticImageData } from "next/image";
import React, {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { motion, useInView } from "framer-motion";
import { PageContainser } from "@/components/PageContainser";
import HeroAnimated from "@/components/HeroAnimated";
import { paths } from "@/lib/urls";
import FAQ from "@/components/FAQ";
import FinalCTA from "@/components/FinalCTA";
import ChipGhost from "@/components/ChipGhost";
import TiltCard from "@/components/TiltCard";
import Wave from "@/components/Wave";
import ChipKinetic from "@/components/ChipKinetic";
import {
  Electrical,
  Hydraulics,
  Mechanical,
  Programming,
  Welding,
} from "@/assets";

/**
 * =========================
 *   ASSETS
 * =========================
 */
const ASSETS = {
  hero: "/images/factory.png",
  maintain: "/images/maintenance.png",
  cta: "/images/Consultation.jpg",

  security: "/images/industrial/fire-protection.jpg",
  fire: "/images/fire-protection.jpg",
  wood: "/images/person-varnishing.jpg",
  film: "/images/film-protection.jpg",
  facades: "/images/Facades.jpg",
  cameras: "/images/cameras.jpg",
  servers: "/images/Industrial-server.jpg",
  entry: "/images/entry-systems.jpg",
  alarms: "/images/alarms.jpg",

  other: "/images/other-services.png", // dismantle/rebuild/relocation/new-construction
};

const faqItems = [
  {
    value: "faq-1",
    question: "Can you work alongside our in-house engineers?",
    answer:
      "Yes. We frequently co-deliver with plant teams and adapt to your maintenance windows and standards.",
  },
  {
    value: "faq-2",
    question: "Do you provide as-built documentation?",
    answer:
      "Always. We hand over wiring diagrams, naming standards, PLC/HMI backups, test reports, and photos.",
  },
  {
    value: "faq-3",
    question: "How do you ensure safety?",
    answer:
      "Permits, isolation/LOTO, tooling checks, and trained personnel. We plan safety from day zero.",
  },
  {
    value: "faq-4",
    question: "How can I schedule a consultation?",
    answer: (
      <p>
        You can easily schedule a meeting through our{" "}
        <a
          href="/corporate"
          className="text-[#066eb0] underline hover:text-[#044f80]"
        >
          Corporate Meeting Request
        </a>{" "}
        page.
      </p>
    ),
  },
];

/**
 * =========================
 *   PAGE
 * =========================
 */
export default function IndustrialPage() {
  return (
    <PageContainser>
      <HeroAnimated
        badge="HBC Industrial"
        title="Our Service,"
        highlight="Your Peace of Mind"
        description="HBC Group is your fast, reliable and quality oriented partner for industrial maintenance and machinery service. 

We help you with your most demanding challenges. 

From preventive or recurring maintenance and diagnostic to  fast responds trouble-shooting or complex relocation of assembly lines.
"
        chips={[
          "Hydraulics",
          "Electrical",
          "Mechanical",
          "Programming",
          "Fire Protection",
        ]}
        cta={{ label: paths.corporate.label, href: paths.corporate.href }}
        heroImage={ASSETS.hero}
      />
      <PinnedShowcase />
      <Capabilities />
      <SecuritySuite />
      <OtherServices />
      <ProcessAndAssurance />
      <FAQ title="Frequently Asked Questions" faqItems={faqItems} />
      <FinalCTA
        title="Let’s keep your plant moving."
        description="Book time with our industrial team to map the quickest path to uptime, safety, and performance."
        primaryLabel={paths.corporate.label}
        primaryHref={paths.corporate.href}
        imageSrc={ASSETS.cta}
      />
    </PageContainser>
  );
}

/* =========================================================
 * PINNED SHOWCASE (Lenis-safe)
 * =========================================================
 * Left column is "pinned" without relying on CSS sticky. We use a section
 * taller than viewport and interpolate the current slide by tracking card
 * intersections on the right. This works with Lenis because there’s no
 * `position: sticky` (which Lenis can mis-handle).
 */

function PinnedShowcase() {
  const slides = useMemo(
    () => [
      {
        key: "hydraulics",
        tag: "Maintenance",
        title: "Hydraulics",
        text: "Diagnostics, pump/valve service, hoses, sealing, filtration, and contamination control. We restore force and motion with micron-level precision.",
        img: Hydraulics,
        bullets: [
          "Power units",
          "Manifolds",
          "Cylinders",
          "Accumulator charging",
          "Flushing",
        ],
      },
      {
        key: "electrical",
        tag: "Maintenance",
        title: "Electrical",
        text: "Control panels, drives, PLCs, sensors, power routing. We do clean installs and retrofit wiring with safety and clarity.",
        img: Electrical,
        bullets: [
          "PLC/Drive tuning",
          "Switchgear",
          "SCADA I/O",
          "Thermal scans",
          "Code & labels",
        ],
      },
      {
        key: "mechanical",
        tag: "Maintenance",
        title: "Mechanical",
        text: "Gearboxes, conveyors, bearings, shaft alignment, structural fabrication—built to take industrial punishment.",
        img: Mechanical,
        bullets: [
          "Precision alignment",
          "Conveyors",
          "Gear & chain",
          "Laser metrology",
          "Fabrication",
        ],
      },
      {
        key: "welding",
        tag: "Maintenance",
        title: "Welding",
        text: "Certified welding and on-site fabrication for production lines and heavy assets. Strong, clean, inspected.",
        img: Welding,
        bullets: [
          "Steel & SS",
          "Pipe welding",
          "Repair & build",
          "Fixtures",
          "NDT-ready",
        ],
      },
      {
        key: "programming",
        tag: "Maintenance",
        title: "Programming",
        text: "Commissioning and optimization of PLC/HMI code. We make machines think smarter and operators work faster.",
        img: Programming,
        bullets: [
          "Siemens/TIA",
          "Rockwell",
          "Safety PLC",
          "HMI/UX",
          "Data logging",
        ],
      },
    ],
    []
  );

  const [active, setActive] = useState(0);
  const onActive = (idx: number) => setActive(idx);

  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section ref={sectionRef} className="relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          className="text-3xl font-extrabold text-slate-900 sm:text-4xl"
        >
          Industrial Maintenance
        </motion.h2>

        <div className="mt-10 grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
          {/* LEFT: anchor column (used for alignment); mobile shows a simple visual */}
          <div className="lg:col-span-6 lg:self-start">
            {/* 👇 This is the measurable anchor for the fixed visual (desktop only) */}
            <div className="fixed-anchor-left hidden lg:block h-[56vh] min-h-[360px]" />

            {/* Mobile visual (non-fixed) */}
            <div className="relative block lg:hidden">
              <div className="relative mb-6 h-[240px] overflow-hidden rounded-2xl bg-white/60 shadow-md ring-1 ring-black/5">
                {slides.map((s, i) => (
                  <motion.div
                    key={s.title}
                    initial={false}
                    animate={{
                      opacity: i === active ? 1 : 0,
                      scale: i === active ? 1 : 0.98,
                    }}
                    transition={{ duration: 0.35 }}
                    className="absolute inset-0"
                  >
                    <Image src={s.img} alt="" fill className="object-cover" />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT: scrolling cards (drives active) */}
          <div className="lg:col-span-6 space-y-8">
            {slides.map((s, i) => (
              <TrackCard key={s.key} index={i} onActive={onActive}>
                <span className="text-sm font-semibold uppercase tracking-wide text-[#066eb0]">
                  {s.tag}
                </span>
                <h3 className="mt-1 text-2xl font-bold text-slate-900">
                  {s.title}
                </h3>
                <p className="mt-2 text-slate-600">{s.text}</p>
                <div className="flex flex-1 items-end ">
                  <div className="flex flex-row flex-wrap gap-2 ">
                    {" "}
                    {s.bullets.map((b) => (
                      <ChipGhost key={b}>{b}</ChipGhost>
                    ))}
                  </div>
                </div>
              </TrackCard>
            ))}
          </div>
        </div>
      </div>

      {/* FIXED visual that fakes sticky on desktop */}
      <FixedVisualizer
        slides={slides}
        active={active}
        sectionRef={sectionRef}
        topOffset={112} // adjust if your navbar height differs
      />
    </section>
  );
}

function TrackCard({
  children,
  index,
  onActive,
}: {
  children: React.ReactNode;
  index: number;
  onActive: (i: number) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-30% 0px -50% 0px", amount: 0.3 });

  useEffect(() => {
    if (inView) onActive(index);
  }, [inView, index, onActive]);

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.5 }}
      transition={{ duration: 0.5 }}
      className="rounded-3xl border border-white/60 bg-white/70 p-6 shadow-sm backdrop-blur min-h-96 flex flex-col"
    >
      {children}
    </motion.article>
  );
}

/** ------- FIXED visual that aligns to the left grid column while section is in view ------- */
function FixedVisualizer({
  slides,
  active,
  sectionRef,
  topOffset = 112, // where the box wants to sit while scrolling
  insetTop = 120, // keep this many px below the section top
  insetBottom = 45, // keep this many px above the section bottom
}: {
  slides: { img: StaticImageData; title: string }[];
  active: number;
  sectionRef: React.RefObject<HTMLElement | null>;
  topOffset?: number;
  insetTop?: number;
  insetBottom?: number;
}) {
  const [box, setBox] = useState<{ left: number; width: number } | null>(null);
  const [fixedTop, setFixedTop] = useState<number>(topOffset); // computed top in px
  const [visible, setVisible] = useState(false);

  // refs for measurements
  const anchorRef = useRef<HTMLDivElement | null>(null);
  const probeRef = useRef<HTMLDivElement | null>(null); // inside the fixed card to measure its height
  const boundsRef = useRef<{ top: number; bottom: number } | null>(null);
  const cardHRef = useRef<number>(0);

  // Re-measure everything on layout/resize
  useLayoutEffect(() => {
    const measure = () => {
      if (!sectionRef.current) return;

      // left-align using the anchor in the left column
      const anchor = sectionRef.current.querySelector(
        ".fixed-anchor-left"
      ) as HTMLDivElement | null;

      if (anchor) {
        anchorRef.current = anchor;
        const r = anchor.getBoundingClientRect();
        setBox({
          left: r.left + window.scrollX,
          width: r.width,
        });
      }

      // section bounds
      const sr = sectionRef.current.getBoundingClientRect();
      boundsRef.current = {
        top: sr.top + window.scrollY,
        bottom: sr.bottom + window.scrollY,
      };

      // measure card height
      if (probeRef.current) {
        cardHRef.current = probeRef.current.getBoundingClientRect().height;
      }
    };

    measure();
    const on = () => requestAnimationFrame(measure);
    window.addEventListener("resize", on);
    window.addEventListener("scroll", on, { passive: true });

    return () => {
      window.removeEventListener("resize", on);
      window.removeEventListener("scroll", on);
    };
  }, [sectionRef]);

  // Compute visibility + clamped top each scroll
  useEffect(() => {
    const update = () => {
      if (!boundsRef.current) return;

      const { top: sectionTopAbs, bottom: sectionBottomAbs } =
        boundsRef.current;
      const scrollY = window.scrollY;
      const boxH = cardHRef.current || 0;

      // Desired viewport top for the box while we are within the section
      const desiredViewportTop = topOffset;

      // Convert section bounds to viewport coordinates:
      const sectionTopInViewport = sectionTopAbs - scrollY;
      const sectionBottomInViewport = sectionBottomAbs - scrollY;

      // The box must stay within the section with insets:
      const minTop = sectionTopInViewport + insetTop;
      const maxTop = sectionBottomInViewport - insetBottom - boxH;

      // If section is smaller than box (edge case), just stick to minTop
      const clampedTop = Math.min(
        Math.max(desiredViewportTop, minTop),
        Math.max(minTop, maxTop)
      );

      // visible when box would intersect the section
      const willShow = clampedTop >= minTop - 1 && clampedTop <= maxTop + 1;
      setVisible(willShow);
      setFixedTop(clampedTop);
    };

    update();
    const on = () => requestAnimationFrame(update);
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);

    return () => {
      window.removeEventListener("scroll", on);
      window.removeEventListener("resize", on);
    };
  }, [topOffset, insetTop, insetBottom]);

  // Desktop only
  return (
    <div className="pointer-events-none hidden lg:block">
      {box && (
        <motion.div
          style={{
            position: "fixed",
            top: fixedTop,
            left: box.left,
            width: box.width,
            opacity: visible ? 1 : 0,
            zIndex: 10,
          }}
          transition={{ duration: 0.25 }}
        >
          {/* Probe to measure height */}
          <div
            ref={probeRef}
            className="relative h-[56vh] min-h-[360px] overflow-hidden rounded-3xl bg-white/60 shadow-xl ring-1 ring-black/5"
          >
            {slides.map((s, i) => (
              <motion.div
                key={s.title}
                initial={false}
                animate={{
                  opacity: i === active ? 1 : 0,
                  scale: i === active ? 1 : 0.98,
                }}
                transition={{ duration: 0.45, ease: "easeOut" }}
                className="absolute inset-0"
              >
                <Image
                  src={s.img}
                  alt=""
                  fill
                  sizes="(max-width:1024px) 90vw, 640px"
                  className="object-cover"
                  priority={i === 0}
                />
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(160px_160px_at_0%_0%,rgba(255,255,255,0.45),transparent_60%)]" />
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}

/* =========================================================
 * CAPABILITIES GRID (quick overview)
 * ========================================================= */
function Capabilities() {
  const items = [
    {
      t: "Preventive & Predictive",
      d: "Programs that turn unplanned downtime into scheduled optimization.",
    },
    {
      t: "Rapid Response",
      d: "On-call engineers and techs with parts, tools, and checklists.",
    },
    {
      t: "Retrofits & Upgrades",
      d: "Make old assets compete like new—mechanical, electrical, controls.",
    },
    {
      t: "Data Visibility",
      d: "From sensor to dashboard: we surface signals that matter.",
    },
    {
      t: "Safety First",
      d: "Certified procedures and tooling for plant & personnel safety.",
    },
    {
      t: "Documentation",
      d: "As-builts, wiring, naming standards—clarity for the next decade.",
    },
  ];

  return (
    <section className="relative">
      <div className="mx-auto max-w-7xl px-4 pb-8 pt-4 sm:px-6 lg:px-8">
        <div className="mt-2 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((x, i) => (
            <TiltCard key={x.t} delay={i * 0.03}>
              <h3 className="text-lg font-semibold text-slate-900">{x.t}</h3>
              <p className="mt-1 text-slate-600">{x.d}</p>
            </TiltCard>
          ))}
        </div>
      </div>
      <Wave className="text-[#d9ebff]" />
    </section>
  );
}

/* =========================================================
 * SECURITY SUITE (deep-dive cards)
 * ========================================================= */
function SecuritySuite() {
  const blocks = [
    {
      tag: "Security",
      title: "Fire Protection",
      img: ASSETS.fire,
      brief:
        "Design, install, and maintain robust fire systems for industrial risk categories with traceability and standards compliance.",
      bullets: [
        "Risk analysis",
        "Suppression systems",
        "Routine testing",
        "Compliance reports",
      ],
      sub: [
        {
          label: "Wood Preservation",
          img: ASSETS.wood,
          d: "Treatments and coatings for durability.",
        },
        {
          label: "Film Protection",
          img: ASSETS.film,
          d: "High-performance protective films.",
        },
        {
          label: "Facades",
          img: ASSETS.facades,
          d: "Exterior systems for resistance and longevity.",
        },
      ],
    },
    {
      tag: "Security",
      title: "Cameras & Analytics",
      img: ASSETS.cameras,
      brief:
        "From harsh-environment cameras to smart detection. Gain visual certainty across plants, yards, and warehouses.",
      bullets: [
        "Thermal & PTZ",
        "AI analytics",
        "NVR/Retention",
        "Remote access",
      ],
    },
    {
      tag: "Security",
      title: "Server & Storage",
      img: ASSETS.servers,
      brief:
        "Hardened, scalable infrastructure for security and industrial data—designed for write-heavy workloads.",
      bullets: [
        "RAID strategies",
        "Redundant power",
        "Encrypted backups",
        "Monitoring",
      ],
    },
    {
      tag: "Security",
      title: "Entry & Alarm Systems",
      img: ASSETS.entry,
      brief:
        "Card, PIN, biometric, and vehicle entry solutions. Unified alarms with clear playbooks and escalation.",
      bullets: ["Access control", "Perimeter", "Intercom", "24/7 alerting"],
      extra: { img: ASSETS.alarms, label: "Alarm Systems" },
    },
  ];

  return (
    <section className="relative">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          className="text-3xl font-extrabold text-slate-900 sm:text-4xl"
        >
          Security Systems
        </motion.h2>

        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {blocks.map((b, i) => (
            <motion.article
              key={b.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.45, delay: i * 0.05 }}
              className="overflow-hidden rounded-3xl border border-white/60 bg-white/70 shadow-sm backdrop-blur"
            >
              <div className="relative h-56 w-full overflow-hidden">
                <Image src={b.img} alt="" fill className="object-cover" />
              </div>
              <div className="p-6">
                <span className="text-sm font-semibold uppercase tracking-wide text-[#066eb0]">
                  {b.tag}
                </span>
                <h3 className="mt-1 text-2xl font-bold text-slate-900">
                  {b.title}
                </h3>
                <p className="mt-2 text-slate-600">{b.brief}</p>
                {b.bullets && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {b.bullets.map((x) => (
                      <ChipGhost key={x}>{x}</ChipGhost>
                    ))}
                  </div>
                )}

                {b.sub && (
                  <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
                    {b.sub.map((s) => (
                      <div
                        key={s.label}
                        className="overflow-hidden rounded-2xl border border-white/60 bg-white/70 shadow-sm"
                      >
                        <div className="relative h-28 w-full">
                          <Image
                            src={s.img}
                            alt=""
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="p-3">
                          <div className="text-sm font-semibold text-slate-900">
                            {s.label}
                          </div>
                          <p className="text-xs text-slate-600">{s.d}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {b.extra && (
                  <div className="mt-6 overflow-hidden rounded-2xl border border-white/60 bg-white/70 shadow-sm">
                    <div className="relative h-28 w-full">
                      <Image
                        src={b.extra.img}
                        alt=""
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-3 text-sm font-semibold text-slate-900">
                      {b.extra.label}
                    </div>
                  </div>
                )}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
      <Wave className="text-[#cfe4ff]" />
    </section>
  );
}

/* =========================================================
 * OTHER SERVICES
 * ========================================================= */
function OtherServices() {
  const items = [
    {
      t: "Machines dismantled, relocated, rebuilt",
      d: "We move production assets safely: labeling, disassembly, transport, alignment, recommissioning.",
    },
    {
      t: "New Construction",
      d: "From utilities to final commissioning—MEP routing, cable trays, controls, safety systems.",
    },
  ];
  return (
    <section className="relative">
      <div className="mx-auto max-w-7xl px-4 pb-8 pt-4 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-[28px] bg-gradient-to-br from-[#066eb0] to-[#3da2dc] text-white shadow-xl">
          <div className="grid grid-cols-1 items-center gap-6 p-6 sm:p-8 md:grid-cols-12">
            <div className="md:col-span-7">
              <h3 className="text-2xl font-extrabold sm:text-3xl">
                Other Services
              </h3>
              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                {items.map((x) => (
                  <div
                    key={x.t}
                    className="rounded-2xl bg-white/10 p-4 ring-1 ring-white/20"
                  >
                    <div className="text-base font-semibold">{x.t}</div>
                    <p className="mt-1 text-white/90">{x.d}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative md:col-span-5">
              <div className="relative h-48 overflow-hidden rounded-2xl bg-white/10 ring-1 ring-white/20">
                <Image
                  src={ASSETS.other}
                  alt=""
                  fill
                  className="object-cover opacity-90"
                />
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120px_120px_at_0%_0%,rgba(255,255,255,0.5),transparent_60%)]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
 * PROCESS + ASSURANCE (timeline + badges)
 * ========================================================= */
function ProcessAndAssurance() {
  const steps = [
    {
      n: 1,
      t: "Assess",
      d: "Site study, risk review, and performance targets.",
    },
    { n: 2, t: "Plan", d: "Scope, phases, access, safety, and spares." },
    { n: 3, t: "Execute", d: "Qualified teams, QA checks, and reporting." },
    { n: 4, t: "Optimize", d: "Tuning, training, documentation, support." },
  ];
  const badges = [
    "24/7 Support",
    "Certified Techs",
    "Safety First",
    "Warranty",
    "As-built Docs",
  ];

  return (
    <section className="relative">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
          <div className="md:col-span-6">
            <motion.h3
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              className="text-3xl font-extrabold text-slate-900"
            >
              How We Deliver
            </motion.h3>
            <ul className="mt-6 space-y-4">
              {steps.map((s, i) => (
                <motion.li
                  key={s.t}
                  initial={{ opacity: 0, x: 16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.45, delay: i * 0.04 }}
                  className="relative pl-8"
                >
                  <span className="absolute left-0 top-1.5 grid h-6 w-6 place-items-center rounded-full border border-slate-300 bg-white text-xs font-bold text-[#066eb0] shadow-sm">
                    {s.n}
                  </span>
                  <div className="text-base font-semibold text-slate-900">
                    {s.t}
                  </div>
                  <p className="text-slate-600">{s.d}</p>
                </motion.li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-6">
            <motion.h3
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              className="text-3xl font-extrabold text-slate-900"
            >
              Assurance
            </motion.h3>
            <div className="mt-6 flex flex-wrap gap-3">
              {badges.map((b, i) => (
                <ChipKinetic key={b} delay={i * 0.05}>
                  {b}
                </ChipKinetic>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Wave className="text-[#d9ebff]" />
    </section>
  );
}
