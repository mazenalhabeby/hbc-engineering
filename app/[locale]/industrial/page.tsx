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
import Link from "next/link";
import { useTranslations } from "next-intl";

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

/**
 * =========================
 *   PAGE
 * =========================
 */
export default function IndustrialPage() {
  const t = useTranslations("industrial");

  // FAQ with translations (includes a rich translation for the Link)
  const faqItems = [
    {
      value: "faq-1",
      question: t("faq.q1"),
      answer: t("faq.a1"),
    },
    {
      value: "faq-2",
      question: t("faq.q2"),
      answer: t("faq.a2"),
    },
    {
      value: "faq-3",
      question: t("faq.q3"),
      answer: t("faq.a3"),
    },
    {
      value: "faq-4",
      question: t("faq.q4"),
      answer: t.rich("faq.a4Rich", {
        link: (chunks) => (
          <Link
            href="/corporate"
            className="text-[#066eb0] underline hover:text-[#044f80]"
          >
            {chunks}
          </Link>
        ),
      }),
    },
  ];

  return (
    <PageContainser>
      <HeroAnimated
        badge={t("hero.badge")}
        title={t("hero.title")}
        highlight={t("hero.highlight")}
        description={t("hero.description")}
        chips={[
          t("hero.chips.hydraulics"),
          t("hero.chips.electrical"),
          t("hero.chips.mechanical"),
          t("hero.chips.programming"),
          t("hero.chips.fireProtection"),
        ]}
        cta={{ label: paths.corporate.label, href: paths.corporate.href }}
        heroImage={ASSETS.hero}
      />
      <PinnedShowcase />
      <Capabilities />
      <SecuritySuite />
      <OtherServices />
      <ProcessAndAssurance />
      <FAQ title={t("faq.title")} faqItems={faqItems} />
      <FinalCTA
        title={t("cta.title")}
        description={t("cta.description")}
        primaryLabel={paths.corporate.label}
        primaryHref={paths.corporate.href}
        imageSrc={ASSETS.cta}
      />
    </PageContainser>
  );
}

/* =========================================================
 * PINNED SHOWCASE (Lenis-safe)
 * ========================================================= */
function PinnedShowcase() {
  const t = useTranslations("industrial.slides");

  const slides = useMemo(
    () => [
      {
        key: "hydraulics",
        tag: t("common.tag"),
        title: t("hydraulics.title"),
        text: t("hydraulics.text"),
        img: Hydraulics,
        bullets: [
          t("hydraulics.bullets.0"),
          t("hydraulics.bullets.1"),
          t("hydraulics.bullets.2"),
          t("hydraulics.bullets.3"),
          t("hydraulics.bullets.4"),
        ],
      },
      {
        key: "electrical",
        tag: t("common.tag"),
        title: t("electrical.title"),
        text: t("electrical.text"),
        img: Electrical,
        bullets: [
          t("electrical.bullets.0"),
          t("electrical.bullets.1"),
          t("electrical.bullets.2"),
          t("electrical.bullets.3"),
          t("electrical.bullets.4"),
        ],
      },
      {
        key: "mechanical",
        tag: t("common.tag"),
        title: t("mechanical.title"),
        text: t("mechanical.text"),
        img: Mechanical,
        bullets: [
          t("mechanical.bullets.0"),
          t("mechanical.bullets.1"),
          t("mechanical.bullets.2"),
          t("mechanical.bullets.3"),
          t("mechanical.bullets.4"),
        ],
      },
      {
        key: "welding",
        tag: t("common.tag"),
        title: t("welding.title"),
        text: t("welding.text"),
        img: Welding,
        bullets: [
          t("welding.bullets.0"),
          t("welding.bullets.1"),
          t("welding.bullets.2"),
          t("welding.bullets.3"),
          t("welding.bullets.4"),
        ],
      },
      {
        key: "programming",
        tag: t("common.tag"),
        title: t("programming.title"),
        text: t("programming.text"),
        img: Programming,
        bullets: [
          t("programming.bullets.0"),
          t("programming.bullets.1"),
          t("programming.bullets.2"),
          t("programming.bullets.3"),
          t("programming.bullets.4"),
        ],
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
          {t("common.heading")}
        </motion.h2>

        <div className="mt-10 grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
          {/* LEFT: anchor column */}
          <div className="lg:col-span-6 lg:self-start">
            <div className="fixed-anchor-left hidden lg:block h-[56vh] min-h-[360px]" />
            {/* Mobile visual */}
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

          {/* RIGHT: scrolling cards */}
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
        setBox({
          left: r.left + window.scrollX,
          width: r.width,
        });
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
 * CAPABILITIES GRID (quick overview)
 * ========================================================= */
function Capabilities() {
  const t = useTranslations("industrial.capabilities");

  const items = [
    {
      t: t("items.0.title"),
      d: t("items.0.desc"),
    },
    {
      t: t("items.1.title"),
      d: t("items.1.desc"),
    },
    {
      t: t("items.2.title"),
      d: t("items.2.desc"),
    },
    {
      t: t("items.3.title"),
      d: t("items.3.desc"),
    },
    {
      t: t("items.4.title"),
      d: t("items.4.desc"),
    },
    {
      t: t("items.5.title"),
      d: t("items.5.desc"),
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
  const t = useTranslations("industrial.security");

  const blocks = [
    {
      tag: t("tag"),
      title: t("fire.title"),
      img: ASSETS.fire,
      brief: t("fire.brief"),
      bullets: [
        t("fire.bullets.0"),
        t("fire.bullets.1"),
        t("fire.bullets.2"),
        t("fire.bullets.3"),
      ],
      sub: [
        {
          label: t("fire.sub.wood.label"),
          img: ASSETS.wood,
          d: t("fire.sub.wood.desc"),
        },
        {
          label: t("fire.sub.film.label"),
          img: ASSETS.film,
          d: t("fire.sub.film.desc"),
        },
        {
          label: t("fire.sub.facades.label"),
          img: ASSETS.facades,
          d: t("fire.sub.facades.desc"),
        },
      ],
    },
    {
      tag: t("tag"),
      title: t("cameras.title"),
      img: ASSETS.cameras,
      brief: t("cameras.brief"),
      bullets: [
        t("cameras.bullets.0"),
        t("cameras.bullets.1"),
        t("cameras.bullets.2"),
        t("cameras.bullets.3"),
      ],
    },
    {
      tag: t("tag"),
      title: t("servers.title"),
      img: ASSETS.servers,
      brief: t("servers.brief"),
      bullets: [
        t("servers.bullets.0"),
        t("servers.bullets.1"),
        t("servers.bullets.2"),
        t("servers.bullets.3"),
      ],
    },
    {
      tag: t("tag"),
      title: t("entry.title"),
      img: ASSETS.entry,
      brief: t("entry.brief"),
      bullets: [
        t("entry.bullets.0"),
        t("entry.bullets.1"),
        t("entry.bullets.2"),
        t("entry.bullets.3"),
      ],
      extra: { img: ASSETS.alarms, label: t("entry.extraLabel") },
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
          {t("heading")}
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
  const t = useTranslations("industrial.other");

  const items = [
    {
      t: t("items.0.title"),
      d: t("items.0.desc"),
    },
    {
      t: t("items.1.title"),
      d: t("items.1.desc"),
    },
  ];
  return (
    <section className="relative">
      <div className="mx-auto max-w-7xl px-4 pb-8 pt-4 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-[28px] bg-gradient-to-br from-[#066eb0] to-[#3da2dc] text-white shadow-xl">
          <div className="grid grid-cols-1 items-center gap-6 p-6 sm:p-8 md:grid-cols-12">
            <div className="md:col-span-7">
              <h3 className="text-2xl font-extrabold sm:text-3xl">
                {t("heading")}
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
  const t = useTranslations("industrial.process");

  const steps = [
    {
      n: 1,
      t: t("steps.0.title"),
      d: t("steps.0.desc"),
    },
    { n: 2, t: t("steps.1.title"), d: t("steps.1.desc") },
    { n: 3, t: t("steps.2.title"), d: t("steps.2.desc") },
    { n: 4, t: t("steps.3.title"), d: t("steps.3.desc") },
  ];
  const badges = [
    t("badges.0"),
    t("badges.1"),
    t("badges.2"),
    t("badges.3"),
    t("badges.4"),
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
              {t("howHeading")}
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
              {t("assuranceHeading")}
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
