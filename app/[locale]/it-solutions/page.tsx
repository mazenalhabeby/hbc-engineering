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
import FAQ from "@/components/FAQ";
import ChipGhost from "@/components/ChipGhost";
import TiltCard from "@/components/TiltCard";
import Wave from "@/components/Wave";
import ChipKinetic from "@/components/ChipKinetic";
import MultiStepProjectForm from "./ClientForm";
import GradientBackdrop from "@/components/GradientBackdrop";

/**
 * =========================
 *   ASSETS (reuse your existing)
 * =========================
 */
const ASSETS = {
  hero: "/images/it-solution.jpg", // replace with your preferred hero
  dev: "/images/Software-Development.jpg",
  cloud: "/images/DevOps.jpg",
  ai: "/images/Automation2.jpg",
  security: "/images/Security-Integration.jpg",
  web3: "/images/Blockchain.jpg",
  cta: "/images/Consultation.jpg",
};

const faqItems = [
  {
    value: "faq-1",
    question: "How soon can your team begin a project?",
    answer:
      "Our team typically responds within one business day. A discovery meeting can be scheduled within 48–72 hours to define scope, priorities, and expected milestones. Once aligned, onboarding and kickoff begin immediately.",
  },
  {
    value: "faq-2",
    question: "Do you provide complete frontend and backend development?",
    answer:
      "Yes. We deliver full-stack solutions covering frontend, backend, and infrastructure. Our teams specialize in modern web frameworks, scalable APIs, databases, and CI/CD pipelines—ensuring consistent quality across the entire product lifecycle.",
  },
  {
    value: "faq-3",
    question:
      "Can you integrate emerging technologies such as AI or Web3 into existing platforms?",
    answer:
      "Absolutely. We design secure, standards-compliant integrations that extend your current systems with AI automation, data intelligence, or blockchain functionality. Each integration includes documentation, testing, and rollback strategies to ensure stability.",
  },
  {
    value: "faq-4",
    question: "How do you manage project communication and progress tracking?",
    answer:
      "Each client receives a dedicated project manager and access to our collaboration workspace. We provide transparent weekly updates, milestone reviews, and real-time dashboards for progress, risks, and deliverables.",
  },
  {
    value: "faq-5",
    question: "What industries do you serve?",
    answer:
      "We work with clients across finance, manufacturing, e-commerce, education, and technology. Our flexible architecture approach allows us to adapt quickly to any regulated or data-sensitive environment.",
  },
];

/**
 * =========================
 *   PAGE
 * =========================
 */
export default function ITSolutionsPage() {
  return (
    <PageContainser>
      {" "}
      <HeroAnimated
        badge="HBC IT Solutions"
        title="Build,Scale & Secure"
        highlight="Your Digital Product"
        description={`We design and ship high-performance software, Web3 payments, and cloud infrastructure—engineered for uptime, security, and growth.

From SaaS platforms and e-commerce to AI automation and blockchain, we deliver end-to-end solutions with measurable impact.`}
        chips={[
          "Software",
          "APIs/GraphQL",
          "E-commerce",
          "UI/UX",
          "Cloud/DevOps",
          "CI/CD",
          "Observability",
          "Security",
          "SSO/IAM",
          "AI/Automation",
          "Data & Analytics",
          "Web3",
        ]}
        heroImage={ASSETS.hero}
      />
      <PinnedShowcase /> {/* Services spotlight (your pinned pattern) */}
      <Capabilities /> {/* Quick capability grid */}
      <ProcessAndAssurance /> {/* Timeline + badges */}
      <FAQ title="Frequently Asked Questions" faqItems={faqItems} />
      <GradientBackdrop>
        <div className="mx-auto w-full max-w-5xl px-4 py-10 sm:py-14">
          <MultiStepProjectForm />
        </div>
      </GradientBackdrop>
    </PageContainser>
  );
}

/* =========================================================
 * PINNED SHOWCASE — IT Services (reusing your pattern)
 * ========================================================= */
function PinnedShowcase() {
  const slides = useMemo(
    () => [
      {
        key: "software",
        tag: "Services",
        title: "Software Development",
        text: `We engineer end-to-end digital products — from concept to global rollout. 
Our team builds scalable, secure, and high-performance applications for web, mobile, and desktop, 
using modern technologies and clean architecture principles. We ensure every solution is modular, maintainable, 
and ready for future integrations.`,
        img: ASSETS.dev,
        bullets: [
          "Custom enterprise systems",
          "Cross-platform mobile apps",
          "Web applications & portals",
          "API & SDK development",
          "Microservices & event-driven architecture",
          "DevSecOps integration",
        ],
      },
      {
        key: "cloud",
        tag: "Services",
        title: "Cloud & DevOps",
        text: `We design, deploy, and maintain cloud infrastructures built for high availability, resilience, 
and compliance. Our DevOps approach ensures smooth delivery pipelines, continuous monitoring, and cost-efficient scaling 
across major global providers such as AWS, Google Cloud, and Microsoft Azure.`,
        img: ASSETS.cloud,
        bullets: [
          "Infrastructure as Code (IaC)",
          "Kubernetes orchestration",
          "Multi-cloud architecture (AWS, GCP, Azure)",
          "CI/CD automation",
          "Monitoring, logging, and alerting",
          "Zero-downtime deployments",
        ],
      },
      {
        key: "ai",
        tag: "Services",
        title: "AI & Automation",
        text: `We transform data into intelligent action. From natural-language chatbots to predictive analytics and automated workflows, 
our AI solutions help organizations make smarter decisions, reduce human error, and enhance customer experiences.`,
        img: ASSETS.ai,
        bullets: [
          "Conversational AI & chatbots",
          "Predictive analytics & forecasting",
          "Business process automation",
          "Custom ML model deployment",
          "AI data pipelines & ETL",
          "LLM integration & RAG systems",
        ],
      },
      {
        key: "web3",
        tag: "Services",
        title: "Blockchain & Web3",
        text: `We build secure, compliant, and scalable decentralized systems across the strongest blockchain networks — 
including Ethereum, BNB Chain, Polygon, and Avalanche. Our Web3 expertise spans token ecosystems, smart contracts, 
and payment infrastructures that merge blockchain innovation with real-world utility.`,
        img: ASSETS.web3,
        bullets: [
          "Smart contract architecture & audits",
          "Token ecosystems & staking systems",
          "Cross-chain interoperability",
          "P2P payment rails & on-chain settlement",
          "DeFi & NFT marketplace development",
          "Compliance-ready blockchain solutions",
        ],
      },
      {
        key: "security",
        tag: "Services",
        title: "Security & Integration",
        text: `Security is built into every layer of our process — from application design to production operations. 
We implement advanced identity management, data encryption, and compliance frameworks to protect both users and infrastructure, 
while seamlessly integrating your systems for operational clarity and trust.`,
        img: ASSETS.security,
        bullets: [
          "Identity & Access Management (IAM/SSO)",
          "Penetration testing & vulnerability scans",
          "Zero-Trust architecture",
          "Regulatory compliance (GDPR, ISO, SOC 2)",
          "Secure API & system integration",
          "Continuous security monitoring",
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
          IT Services
        </motion.h2>

        <div className="mt-10 grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
          {/* LEFT anchor (desktop fixed visual aligns here) */}
          <div className="lg:col-span-6 lg:self-start">
            <div className="fixed-anchor-left hidden lg:block h-[56vh] min-h-[360px]" />
            {/* Mobile fallback visual */}
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

          {/* RIGHT cards drive the active slide */}
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
                <div className="flex flex-1 items-end">
                  <div className="flex flex-row flex-wrap gap-2">
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

      {/* FIXED visual to emulate sticky (desktop) */}
      <FixedVisualizer
        slides={slides as unknown as { img: StaticImageData; title: string }[]}
        active={active}
        sectionRef={sectionRef}
        topOffset={112}
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

/** ------- Fixed visual aligned to left column while section is in view ------- */
function FixedVisualizer({
  slides,
  active,
  sectionRef,
  topOffset = 112,
  insetTop = 120,
  insetBottom = 45,
}: {
  slides: { img: StaticImageData; title: string }[];
  active: number;
  sectionRef: React.RefObject<HTMLElement | null>;
  topOffset?: number;
  insetTop?: number;
  insetBottom?: number;
}) {
  const [box, setBox] = useState<{ left: number; width: number } | null>(null);
  const [fixedTop, setFixedTop] = useState<number>(topOffset);
  const [visible, setVisible] = useState(false);

  const anchorRef = useRef<HTMLDivElement | null>(null);
  const probeRef = useRef<HTMLDivElement | null>(null);
  const boundsRef = useRef<{ top: number; bottom: number } | null>(null);
  const cardHRef = useRef<number>(0);

  useLayoutEffect(() => {
    const measure = () => {
      if (!sectionRef.current) return;

      const anchor = sectionRef.current.querySelector(
        ".fixed-anchor-left"
      ) as HTMLDivElement | null;
      if (anchor) {
        anchorRef.current = anchor;
        const r = anchor.getBoundingClientRect();
        setBox({ left: r.left + window.scrollX, width: r.width });
      }

      const sr = sectionRef.current.getBoundingClientRect();
      boundsRef.current = {
        top: sr.top + window.scrollY,
        bottom: sr.bottom + window.scrollY,
      };

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

  useEffect(() => {
    const update = () => {
      if (!boundsRef.current) return;
      const { top: sectionTopAbs, bottom: sectionBottomAbs } =
        boundsRef.current;
      const scrollY = window.scrollY;
      const boxH = cardHRef.current || 0;

      const desiredViewportTop = topOffset;
      const sectionTopInViewport = sectionTopAbs - scrollY;
      const sectionBottomInViewport = sectionBottomAbs - scrollY;

      const minTop = sectionTopInViewport + insetTop;
      const maxTop = sectionBottomInViewport - insetBottom - boxH;

      const clampedTop = Math.min(
        Math.max(desiredViewportTop, minTop),
        Math.max(minTop, maxTop)
      );
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
 * CAPABILITIES — quick overview
 * ========================================================= */
function Capabilities() {
  const items = [
    {
      t: "API-first Delivery",
      d: "Clean GraphQL/REST contracts, SDKs, and docs for partners.",
    },
    {
      t: "DevOps by Default",
      d: "CI/CD, monitoring, logs/metrics/traces from day one.",
    },
    {
      t: "Security Mindset",
      d: "SSO/IAM, secrets hygiene, dependency checks, audits.",
    },
    {
      t: "Performance",
      d: "Edge-ready caching, DB tuning, and Lighthouse-friendly UX.",
    },
    {
      t: "Scalability",
      d: "Event-driven microservices and message queues where they matter.",
    },
    {
      t: "Documentation",
      d: "Playbooks, runbooks, ADRs, and handover guides.",
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
 * PROCESS + ASSURANCE (timeline + badges)
 * ========================================================= */
function ProcessAndAssurance() {
  const steps = [
    {
      n: 1,
      t: "Discover",
      d: "We begin with stakeholder workshops, success metrics, and risk mapping. Every engagement starts with a deep understanding of your business objectives, technical landscape, and compliance boundaries.",
    },
    {
      n: 2,
      t: "Design",
      d: "Our architects and designers translate goals into scalable architectures, UX flows, and technical proofs of concept. We emphasize performance, security, and usability from day one.",
    },
    {
      n: 3,
      t: "Build",
      d: "We execute through agile sprints with continuous integration, test automation, and observability. Each iteration delivers measurable outcomes and production-ready increments.",
    },
    {
      n: 4,
      t: "Deploy",
      d: "Blue/green and canary strategies ensure safe, zero-downtime releases. Every deployment includes rollback policies, monitoring dashboards, and documentation.",
    },
    {
      n: 5,
      t: "Scale & Optimize",
      d: "After go-live, we refine performance, cost, and reliability. Proactive monitoring, incident response, and SLA adherence guarantee long-term operational excellence.",
    },
  ];
  const badges = [
    "ISO 27001 / GDPR Compliance",
    "99.9% Uptime SLA",
    "Security-First Architecture",
    "24/7 Global Support",
    "Continuous Delivery & Monitoring",
    "Transparent Reporting",
    "Dedicated Account Management",
    "Full Documentation & Knowledge Transfer",
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
