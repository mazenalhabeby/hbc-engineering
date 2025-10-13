"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { PageContainser } from "@/components/PageContainser";
import { paths } from "@/lib/urls";
import HeroAnimated from "@/components/HeroAnimated";
import FAQ from "@/components/FAQ";
import FinalCTA from "@/components/FinalCTA";
import Wave from "@/components/Wave";

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
};

const faqItems = [
  {
    value: "faq-1",
    question: "Do fire-retardant coatings affect wood aesthetics?",
    answer:
      "Modern coatings are transparent or tinted lightly and minimally alter texture. We test before applying in-situ.",
  },
  {
    value: "faq-2",
    question: "How often must systems be maintained?",
    answer:
      "Typical inspection cycles are monthly to annually depending on system type. We support full audit logs and reminders.",
  },
  {
    value: "faq-3",
    question: "Can I integrate fire systems with building automation?",
    answer:
      "Yes. We build interfaces so suppression, alarms, and sensors talk to your smart building or BMS.",
  },
];

/* ---------------------------------------------------------------- */
/* Page                                                             */
/* ---------------------------------------------------------------- */
export default function FireProtectionPage() {
  return (
    <PageContainser>
      <HeroAnimated
        badge="HBC Fire Protection"
        title="Fire Protection"
        highlight="That Guards & Lasts."
        description="From wood preservation to architectural facades and system integration — we bring safety, beauty, and compliance together."
        chips={[
          "Wood Preservation",
          "Film Protection",
          "Façades",
          "System Design",
          "Maintenance",
        ]}
        cta={{ label: "Contact Us", href: paths.contact.href }}
        heroImage={ASSETS.hero}
      />
      <CoreServices />
      <SystemsDeepDive />
      <WhyChooseUs />
      <CaseStudies />
      <FAQ title="Frequently Asked Questions" faqItems={faqItems} />
      <FinalCTA
        title="Elevate Your Safety. Protect What Matters."
        description="Contact HBC to design or upgrade your fire protection systems with intelligence, compliance, and durability built in."
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
  const services = [
    {
      key: "wood",
      title: "Wood Preservation",
      desc: "Special coatings and treatments to reduce flammability of structural wood elements, increasing fire resistance and extending lifespan.",
      img: ASSETS.wood,
      bullets: [
        "Char retardant coatings",
        "Fire-retardant impregnation",
        "Compliance to NFPA & EN",
      ],
    },
    {
      key: "film",
      title: "Film Protection",
      desc: "Transparent films for windows, walls and doors that slow flame spread and limit heat transfer, while preserving aesthetics.",
      img: ASSETS.film,
      bullets: [
        "Heat-reflective film",
        "Smoke barrier film",
        "Custom form factors",
      ],
    },
    {
      key: "façade",
      title: "Façade Systems",
      desc: "Architectural fire-safe façade materials and designs that prevent flame and smoke propagation across building exteriors.",
      img: ASSETS.facade,
      bullets: [
        "Refractory panels",
        "Compartmentation design",
        "Regulatory compliance",
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
          Core Fire-Protection Services
        </motion.h2>

        <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
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
  const subsystems = [
    {
      name: "Suppression & Extinguishers",
      desc: "Design and install automatic sprinkler, gas, or foam suppression systems tailored to use-case and hazard.",
      img: ASSETS.system,
    },
    {
      name: "Alarm & Detection",
      desc: "Smoke, heat, and flame sensors, wired and wireless, integrated with control panels and remote alerts.",
      img: ASSETS.controlRoom,
    },
    {
      name: "Maintenance & Audits",
      desc: "Regular testing, inspection and certification of fire systems to ensure compliance and readiness.",
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
          System Integration & Lifecycle
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
  const features = [
    {
      t: "Code & Standards Expertise",
      d: "We navigate NFPA, EN, UL standards so your system passes inspection, not just installation.",
    },
    {
      t: "Holistic Safety Design",
      d: "We guard structure, contents, egress and systems — not just fire suppression.",
    },
    {
      t: "Predictive Health Monitoring",
      d: "Sensors detect early faults (leaks, pressure drops, tampering) before failure happens.",
    },
    {
      t: "Emergency Response Integration",
      d: "We tie systems into panels, security, and building operations to act fast when every second counts.",
    },
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
          Why Choose HBC Fire Protection
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
  const projects = [
    {
      name: "Wood-Frame Housing Complex",
      desc: "Applied fire-retardant coatings to all timber structural elements. Passed regulatory inspection with margin.",
      img: ASSETS.wood,
    },
    {
      name: "Commercial Façade Retrofit",
      desc: "Replaced aging cladding with fire-safe façade system while maintaining aesthetic transparency.",
      img: ASSETS.facade,
    },
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
          Project Highlights
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
                <Image src={p.img} alt={p.name} fill className="object-cover" />
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
