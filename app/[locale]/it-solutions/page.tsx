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
import { useTranslations } from "next-intl";

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

export default function ITSolutionsPage() {
  const t = useTranslations("it");

  const faqItems = [
    { value: "faq-1", question: t("faq.q1"), answer: t("faq.a1") },
    { value: "faq-2", question: t("faq.q2"), answer: t("faq.a2") },
    { value: "faq-3", question: t("faq.q3"), answer: t("faq.a3") },
    { value: "faq-4", question: t("faq.q4"), answer: t("faq.a4") },
    { value: "faq-5", question: t("faq.q5"), answer: t("faq.a5") },
  ];

  return (
    <PageContainser>
      {" "}
      <HeroAnimated
        badge={t("hero.badge")}
        title={t("hero.title")}
        highlight={t("hero.highlight")}
        description={t("hero.description")}
        chips={t.raw("hero.chips")}
        heroImage={ASSETS.hero}
      />
      <PinnedShowcase /> {/* Services spotlight (your pinned pattern) */}
      <Capabilities /> {/* Quick capability grid */}
      <ProcessAndAssurance /> {/* Timeline + badges */}
      <FAQ title={t("faq.title")} faqItems={faqItems} />
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
  const t = useTranslations("it.pinned");

  const slides = useMemo(
    () => [
      {
        key: "software",
        tag: t("software.tag"),
        title: t("software.title"),
        text: t("software.text"),
        img: ASSETS.dev,
        bullets: t.raw("software.bullets"),
      },
      {
        key: "cloud",
        tag: t("cloud.tag"),
        title: t("cloud.title"),
        text: t("cloud.text"),
        img: ASSETS.cloud,
        bullets: t.raw("cloud.bullets"),
      },
      {
        key: "ai",
        tag: t("ai.tag"),
        title: t("ai.title"),
        text: t("ai.text"),
        img: ASSETS.ai,
        bullets: t.raw("ai.bullets"),
      },
      {
        key: "web3",
        tag: t("web3.tag"),
        title: t("web3.title"),
        text: t("web3.text"),
        img: ASSETS.web3,
        bullets: t.raw("web3.bullets"),
      },
      {
        key: "security",
        tag: t("security.tag"),
        title: t("security.title"),
        text: t("security.text"),
        img: ASSETS.security,
        bullets: t.raw("security.bullets"),
      },
    ],
    [t]
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
          {t("title")}
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
                    <Image src={s.img} alt="" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
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
                    {s.bullets.map((b: string) => (
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
  const t = useTranslations("it.capabilities");
  const items = [
    { t: t("api.title"), d: t("api.desc") },
    { t: t("devops.title"), d: t("devops.desc") },
    { t: t("security.title"), d: t("security.desc") },
    { t: t("performance.title"), d: t("performance.desc") },
    { t: t("scalability.title"), d: t("scalability.desc") },
    { t: t("docs.title"), d: t("docs.desc") },
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
  const t = useTranslations("it.process");

  const steps = [
    { n: 1, t: t("steps.discover.title"), d: t("steps.discover.desc") },
    { n: 2, t: t("steps.design.title"), d: t("steps.design.desc") },
    { n: 3, t: t("steps.build.title"), d: t("steps.build.desc") },
    { n: 4, t: t("steps.deploy.title"), d: t("steps.deploy.desc") },
    { n: 5, t: t("steps.scale.title"), d: t("steps.scale.desc") },
  ];
  const badges: string[] = t.raw("badges");

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
              {t("title")}
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
              {t("assurance")}
            </motion.h3>
            <div className="mt-6 flex flex-wrap gap-3">
              {badges.map((b, i) => (
                <ChipKinetic key={`${b}-${i}`} delay={i * 0.05}>
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
