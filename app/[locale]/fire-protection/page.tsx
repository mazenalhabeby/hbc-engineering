"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { PageContainser } from "@/components/PageContainser";
import { paths } from "@/lib/urls";
import HeroAnimated from "@/components/HeroAnimated";
import FAQ from "@/components/FAQ";
import FinalCTA from "@/components/FinalCTA";
import Wave from "@/components/Wave";
import { useTranslations } from "next-intl";

/* ---------------------------------------------------------------- */
/* ASSETS — replace with your real image paths in /public            */
/* ---------------------------------------------------------------- */
const ASSETS = {
  hero: "/images/fire-hero.jpg",
  wood: "/images/person-varnishing.jpg",
  film: "/images/fire-protection1.jpg",
  facade: "/images/facades2.jpeg",
  system: "/images/fire-system.png",
  controlRoom: "/images/control-room.jpg",
  maintenance: "/images/maintenance.jpg",
  cta: "/images/Consultation.jpg",
  textile: "/images/textile-fire-protection.jpg",

  textile_vehicle: "/images/textile-vehicle.webp",
  g_vehicle_1: "/images/vehicle-1.jpg",
  g_vehicle_2: "/images/vehicle-2.jpg",
  g_vehicle_3: "/images/vehicle-3.jpg",
  g_emobility_1: "/images/em-1.webp",
  g_emobility_2: "/images/em-2.webp",
  g_emobility_3: "/images/em-3.webp",
  textile_bag: "/images/textile_bag.webp",
  g_bag_1: "/images/bag-1.webp",
  g_bag_2: "/images/bag-2.webp",
  g_pallet_1: "/images/pallet-1.jpg",
  g_pallet_2: "/images/pallet-2.jpg",
};

/* ---------------------------------------------------------------- */
/* Page                                                             */
/* ---------------------------------------------------------------- */
export default function FireProtectionPage() {
  const t = useTranslations("fire");

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
  ];

  return (
    <PageContainser>
      <HeroAnimated
        badge={t("hero.badge")}
        title={t("hero.title")}
        highlight={t("hero.highlight")}
        description={t("hero.description")}
        chips={[
          t("hero.chips.wood"),
          t("hero.chips.film"),
          t("hero.chips.facades"),
          t("hero.chips.systemDesign"),
          t("hero.chips.maintenance"),
        ]}
        cta={{ label: t("hero.cta"), href: paths.contact.href }}
        heroImage={ASSETS.hero}
      />

      <CoreServices />
      <SystemsDeepDive />
      <TextileCatalogSection />
      <WhyChooseUs />
      <CaseStudies />

      <FAQ title={t("faq.title")} faqItems={faqItems} />

      <FinalCTA
        title={t("cta.title")}
        description={t("cta.description")}
        primaryLabel={paths.contact.label}
        primaryHref={paths.contact.href}
        imageSrc={ASSETS.cta}
      />
    </PageContainser>
  );
}

/* ---------------------------------------------------------------- */
/* Core Services — wood, film, facade                                */
/* ---------------------------------------------------------------- */
function CoreServices() {
  const t = useTranslations("fire.core");

  const services = [
    {
      key: "wood",
      title: t("wood.title"),
      desc: t("wood.desc"),
      img: ASSETS.wood,
      bullets: [t("wood.bullets.0"), t("wood.bullets.1"), t("wood.bullets.2")],
    },
    {
      key: "film",
      title: t("film.title"),
      desc: t("film.desc"),
      img: ASSETS.film,
      bullets: [t("film.bullets.0"), t("film.bullets.1"), t("film.bullets.2")],
    },
    {
      key: "facade",
      title: t("facade.title"),
      desc: t("facade.desc"),
      img: ASSETS.facade,
      bullets: [
        t("facade.bullets.0"),
        t("facade.bullets.1"),
        t("facade.bullets.2"),
      ],
    },
    {
      key: "textile",
      title: t("textile.title"),
      desc: t("textile.desc"),
      img: ASSETS.textile,
      bullets: [
        t("textile.bullets.0"),
        t("textile.bullets.1"),
        t("textile.bullets.2"),
      ],
    },
  ];

  return (
    <section className="relative bg-white/80 pb-16 pt-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-extrabold text-slate-900 sm:text-4xl"
        >
          {t("heading")}
        </motion.h2>

        <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3justify-center max-w-6xl mx-auto">
          {services.map((s, i) => (
            <motion.article
              key={s.key}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="rounded-3xl border border-white/60 bg-white/70 shadow-sm backdrop-blur p-5"
            >
              <div className="relative h-40 w-full overflow-hidden rounded-lg">
                <Image
                  src={s.img}
                  alt={s.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover"
                />
              </div>
              <div className="mt-4">
                <h3 className="text-xl font-semibold text-slate-900">
                  {s.title}
                </h3>
                <p className="mt-2 text-slate-600">{s.desc}</p>
                <ul className="mt-3 list-inside list-disc text-slate-600">
                  {s.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
      <Wave className="text-[#f0f8ff]" />
    </section>
  );
}

/* ---------------------------------------------------------------- */
/* Systems Deep Dive — how we integrate fire-safety systems         */
/* ---------------------------------------------------------------- */
function SystemsDeepDive() {
  const t = useTranslations("fire.systems");

  const subsystems = [
    {
      name: t("suppression.name"),
      desc: t("suppression.desc"),
      img: ASSETS.system,
    },
    {
      name: t("alarm.name"),
      desc: t("alarm.desc"),
      img: ASSETS.controlRoom,
    },
    {
      name: t("maintenance.name"),
      desc: t("maintenance.desc"),
      img: ASSETS.maintenance,
    },
  ];

  return (
    <section id="systems" className="relative pb-16 pt-16 bg-white/90">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-extrabold text-slate-900 sm:text-4xl"
        >
          {t("heading")}
        </motion.h2>

        <div className="mt-8 space-y-16">
          {subsystems.map((sub, idx) => (
            <motion.div
              key={sub.name}
              initial={{ opacity: 0, x: idx % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 * idx }}
              className="grid grid-cols-1 gap-8 md:grid-cols-2 items-center"
            >
              <div className={idx % 2 === 0 ? "md:order-1" : "md:order-2"}>
                <div className="relative h-64 w-full overflow-hidden rounded-2xl bg-white/60 shadow">
                  <Image
                    src={sub.img}
                    alt={sub.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                  />
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-900">
                  {sub.name}
                </h3>
                <p className="mt-3 text-slate-600">{sub.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <Wave className="text-[#eef8ff]" />
    </section>
  );
}

/* ---------------------------------------------------------------- */
/* Why Choose Us — strengths & differentiators                       */
/* ---------------------------------------------------------------- */
function WhyChooseUs() {
  const t = useTranslations("fire.why");

  const features = [
    { t: t("items.0.title"), d: t("items.0.desc") },
    { t: t("items.1.title"), d: t("items.1.desc") },
    { t: t("items.2.title"), d: t("items.2.desc") },
    { t: t("items.3.title"), d: t("items.3.desc") },
  ];
  return (
    <section className="relative bg-white/80 pb-16 pt-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-extrabold text-slate-900 sm:text-4xl"
        >
          {t("heading")}
        </motion.h2>
        <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2">
          {features.map((f, i) => (
            <motion.div
              key={f.t}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="rounded-2xl border border-white/60 bg-white/70 p-6 shadow-sm backdrop-blur"
            >
              <h3 className="text-xl font-semibold text-slate-900">{f.t}</h3>
              <p className="mt-2 text-slate-600">{f.d}</p>
            </motion.div>
          ))}
        </div>
      </div>
      <Wave className="text-[#edf9ff]" />
    </section>
  );
}

/* ---------------------------------------------------------------- */
/* Case Studies (testimonials / projects)                            */
/* ---------------------------------------------------------------- */
function CaseStudies() {
  const t = useTranslations("fire.cases");

  const projects = [
    { name: t("items.0.name"), desc: t("items.0.desc"), img: ASSETS.wood },
    { name: t("items.1.name"), desc: t("items.1.desc"), img: ASSETS.facade },
  ];
  return (
    <section className="relative pb-16 pt-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-extrabold text-slate-900 sm:text-4xl"
        >
          {t("heading")}
        </motion.h2>
        <div className="mt-8 grid grid-cols-1 gap-10 sm:grid-cols-2">
          {projects.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="rounded-3xl overflow-hidden border border-white/60 shadow-lg bg-white/70 backdrop-blur"
            >
              <div className="relative h-48 w-full">
                <Image src={p.img} alt={p.name} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" />
              </div>
              <div className="p-6">
                <div className="text-xl font-semibold text-slate-900">
                  {p.name}
                </div>
                <p className="mt-2 text-slate-600">{p.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <Wave className="text-[#eef8ff]" />
    </section>
  );
}

/* ---------------------------------------------------------------- */
/* Textile Catalog — multiple products with gallery & specs          */
/* ---------------------------------------------------------------- */
function TextileCatalogSection() {
  const t = useTranslations("fire.textileCatalog");

  type Product = {
    key: string;
    title: string;
    summary: string;
    hero: string;
    bullets: string[];
    specs: { k: string; v: string }[];
    gallery: string[];
  };

  const items: Product[] = [
    {
      key: "vehicle",
      title: t("vehicle.title"),
      summary: t("vehicle.summary"),
      hero: ASSETS.textile_vehicle,
      bullets: [
        t("vehicle.bullets.0"),
        t("vehicle.bullets.1"),
        t("vehicle.bullets.2"),
      ],
      specs: [
        { k: t("specs.size"), v: t("vehicle.specs.size") },
        { k: t("specs.temp"), v: t("vehicle.specs.temp") },
        { k: t("specs.weight"), v: t("vehicle.specs.weight") },
      ],
      gallery: [ASSETS.g_vehicle_1, ASSETS.g_vehicle_2, ASSETS.g_vehicle_3],
    },
    {
      key: "emobility",
      title: t("emobility.title"),
      summary: t("emobility.summary"),
      hero: ASSETS.g_emobility_1,
      bullets: [
        t("emobility.bullets.0"),
        t("emobility.bullets.1"),
        t("emobility.bullets.2"),
      ],
      specs: [
        { k: t("specs.size"), v: t("emobility.specs.size") },
        { k: t("specs.temp"), v: t("emobility.specs.temp") },
        { k: t("specs.weight"), v: t("emobility.specs.weight") },
      ],
      gallery: [ASSETS.g_emobility_1, ASSETS.g_emobility_2],
    },
    {
      key: "bag",
      title: t("bag.title"),
      summary: t("bag.summary"),
      hero: ASSETS.textile_bag,
      bullets: [t("bag.bullets.0"), t("bag.bullets.1"), t("bag.bullets.2")],
      specs: [
        { k: t("specs.size"), v: t("bag.specs.size") },
        { k: t("specs.temp"), v: t("bag.specs.temp") },
        { k: t("specs.closure"), v: t("bag.specs.closure") },
      ],
      gallery: [ASSETS.g_bag_1, ASSETS.g_bag_2],
    },
  ];

  return (
    <section id="textile-catalog" className="relative bg-white/90 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          <span className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700 ring-1 ring-blue-100">
            {t("badge")}
          </span>
          <h2 className="mt-4 text-3xl font-extrabold text-slate-900 sm:text-4xl">
            {t("heading")}
          </h2>
          <p className="mt-3 text-slate-600">{t("intro")}</p>
        </motion.div>

        <div className="mt-10 space-y-16">
          {items.map((p, idx) => (
            <motion.article
              key={p.key}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.05 * idx }}
              className="rounded-3xl border border-white/60 bg-white/70 p-6 shadow-sm backdrop-blur"
            >
              {/* top row: hero + text */}
              <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2">
                <div className={idx % 2 ? "md:order-2" : ""}>
                  <div className="relative h-72 w-full overflow-hidden rounded-2xl bg-white/60 shadow flex items-center justify-center">
                    <Image
                      src={p.hero}
                      alt={p.title}
                      width={900}
                      height={600}
                      className="object-cover max-h-[22rem] w-auto rounded-2xl"
                    />
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-slate-900">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-slate-600">{p.summary}</p>

                  <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {p.bullets.map((b) => (
                      <li
                        key={b}
                        className="flex items-start gap-2 rounded-xl border border-white/60 bg-white/70 p-3 text-slate-700 shadow-sm"
                      >
                        <span className="mt-1 inline-block h-2 w-2 shrink-0 rounded-full bg-blue-500" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>

                  {/* specs chips */}
                  <div className="mt-4 flex flex-wrap gap-3">
                    {p.specs.map((s) => (
                      <div
                        key={s.k + s.v}
                        className="rounded-xl border border-white/60 bg-white/80 px-3 py-2 text-sm text-slate-700 shadow-sm"
                      >
                        <span className="font-medium text-slate-900">
                          {s.k}:
                        </span>{" "}
                        {s.v}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* gallery */}
              {!!p.gallery.length && (
                <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                  {p.gallery.map((g) => (
                    <div
                      key={g}
                      className="relative h-32 w-full overflow-hidden rounded-xl border border-white/60 bg-white/60 shadow"
                    >
                      <Image
                        src={g}
                        alt={`${p.title} image`}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}

              {/* learn more CTA */}
              <div className="mt-6 flex items-center justify-end">
                <a
                  href={paths.contact.href}
                  className="inline-flex items-center rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow hover:bg-blue-700"
                >
                  {t("cta")}
                </a>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
      <Wave className="text-[#eef8ff]" />
    </section>
  );
}
