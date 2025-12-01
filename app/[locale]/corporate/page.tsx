"use client";

import Link from "next/link";
import { useState } from "react";
import { useTranslations } from "next-intl";

export default function MeetingPage() {
  const t = useTranslations("meeting");

  const [loading, setLoading] = useState(false);
  const [ok, setOk] = useState<null | "ok" | "err">(null);

  // localized arrays
  const bullets = t.raw("bullets") as string[];
  const chips = t.raw("chips") as string[];
  const topicOptions = t.raw("form.topicOptions") as string[];
  const sizeOptions = t.raw("form.sizeOptions") as string[];

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    if (!String(data.email || "").includes("@") || !data.name) {
      setOk("err");
      return;
    }

    setLoading(true);
    setOk(null);

    try {
      const response = await fetch("/api/corporate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
      });

      const result = await response.json();

      if (response.ok) {
        setOk("ok");
        form.reset();
      } else {
        console.error("Corporate form error:", result);
        setOk("err");
      }
    } catch (error) {
      console.error("Corporate form submission error:", error);
      setOk("err");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="relative overflow-hidden bg-[radial-gradient(1600px_800px_at_10%_-10%,#eaf3ff_0%,#d9ebff_60%,#cfe4ff_100%)] pt-16">
      {/* texture + brand glow */}
      <div
        className="pointer-events-none absolute inset-0 mix-blend-multiply opacity-20"
        style={{
          backgroundImage: "url('/textures/speckles.png')",
          backgroundSize: "900px",
        }}
      />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(1200px_600px_at_75%_-5%,rgba(6,110,176,0.10),transparent_65%)]" />

      {/* top wave */}
      <Wave className="text-[#d9ebff]" />

      <section className="relative z-10 mx-auto max-w-7xl px-4 pb-16 pt-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12">
          {/* LEFT – Copy + bullets + logos */}
          <div className="lg:col-span-5">
            <Badge>{t("badge")}</Badge>

            <h1 className="mt-3 text-balance text-4xl font-extrabold leading-tight text-slate-900 sm:text-5xl">
              {t("title")}
            </h1>

            <p className="mt-4 text-lg text-slate-600">
              {t.rich("intro", {
                strong: (chunks) => (
                  <span className="font-semibold text-slate-800">{chunks}</span>
                ),
              })}
            </p>

            <ul className="mt-6 space-y-3 text-slate-700">
              {bullets.map((text) => (
                <li key={text} className="flex items-start gap-3">
                  <span className="mt-1 inline-block h-2 w-2 rounded-full bg-[#066eb0]" />
                  {text}
                </li>
              ))}
            </ul>

            {/* quick highlights */}
            <div className="mt-8 flex flex-wrap gap-3">
              {chips.map((c) => (
                <Chip key={c}>{c}</Chip>
              ))}
            </div>
          </div>

          {/* RIGHT – Form */}
          <div className="lg:col-span-7">
            <div className="rounded-[28px] border border-white/60 bg-white/70 p-5 shadow-xl backdrop-blur sm:p-6 md:p-8">
              <form
                onSubmit={onSubmit}
                className="grid grid-cols-1 gap-4 md:grid-cols-2"
              >
                <Input
                  label={t("form.fullName")}
                  name="name"
                  autoComplete="name"
                  required
                />
                <Input
                  label={t("form.email")}
                  type="email"
                  name="email"
                  autoComplete="email"
                  required
                />
                <Input label={t("form.company")} name="company" />
                <Input
                  label={t("form.phone")}
                  name="phone"
                  autoComplete="tel"
                />
                <Select
                  label={t("form.topic")}
                  name="topic"
                  options={topicOptions}
                />
                <Select
                  label={t("form.size")}
                  name="size"
                  options={sizeOptions}
                />
                <Input label={t("form.date")} type="date" name="date" />
                <Input label={t("form.time")} type="time" name="time" />
                <Textarea
                  className="md:col-span-2"
                  label={t("form.message")}
                  name="message"
                  rows={4}
                />

                <div className="md:col-span-2 flex items-start gap-3 pt-1">
                  <input
                    type="checkbox"
                    name="consent"
                    required
                    className="mt-1 h-4 w-4 rounded border-slate-300 text-[#066eb0] focus:ring-[#066eb0]"
                  />
                  <p className="text-sm text-slate-600">
                    {t.rich("form.consentHtml", {
                      link: (chunks) => (
                        <Link
                          href="/privacy"
                          className="underline underline-offset-2"
                        >
                          {chunks}
                        </Link>
                      ),
                    })}
                  </p>
                </div>

                <div className="md:col-span-2 mt-2 flex items-center gap-3">
                  <button
                    disabled={loading}
                    className="inline-flex items-center justify-center rounded-full bg-[#066eb0] px-5 py-3 text-sm font-semibold text-white shadow-[0_10px_30px_rgba(6,110,176,0.35)] transition hover:-translate-y-0.5 disabled:opacity-60"
                  >
                    {loading ? t("form.sending") : t("form.submit")}
                  </button>

                  {ok === "ok" && (
                    <span className="text-sm font-medium text-emerald-700">
                      {t("form.ok")}
                    </span>
                  )}
                  {ok === "err" && (
                    <span className="text-sm font-medium text-rose-700">
                      {t("form.err")}
                    </span>
                  )}
                </div>
              </form>
            </div>

            {/* micro-note */}
            <p className="mt-3 text-xs text-slate-500">
              {t.rich("noteHtml", {
                link: (chunks) => (
                  <a
                    href="mailto:support@hbc-engineering.com"
                    className="underline"
                  >
                    {chunks}
                  </a>
                ),
              })}
            </p>
          </div>
        </div>
      </section>

      {/* bottom CTA band */}
      <section className="relative pb-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-[28px] bg-gradient-to-br from-[#066eb0] to-[#3da2dc] p-6 text-white shadow-xl sm:p-8 md:p-10">
            <div className="grid grid-cols-1 items-center gap-6 md:grid-cols-12">
              <div className="md:col-span-8">
                <h3 className="text-2xl font-extrabold sm:text-3xl">
                  {t("cta.title")}
                </h3>
                <p className="mt-2 text-white/90">{t("cta.desc")}</p>
              </div>
              <div className="md:col-span-4 md:justify-self-end">
                <Link
                  href="/contact"
                  className="inline-flex items-center rounded-full bg-white px-5 py-3 text-sm font-semibold text-[#0b2a3a] shadow-[0_10px_30px_rgba(255,255,255,0.20)] transition hover:-translate-y-0.5"
                >
                  {t("cta.button")}
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    className="ml-2 opacity-80"
                    fill="none"
                  >
                    <path
                      d="M5 12h14M13 5l7 7-7 7"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* bottom wave */}
      <Wave className="text-[#cfe4ff] rotate-180" />
    </main>
  );
}

/* ---------------------- tiny UI helpers ---------------------- */

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full bg-[#066eb0]/10 px-3 py-1 text-sm font-semibold text-[#066eb0]">
      <span className="h-1.5 w-1.5 rounded-full bg-[#066eb0]" />
      {children}
    </span>
  );
}

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-slate-300/70 bg-white/60 px-3 py-1 text-sm text-slate-800 backdrop-blur">
      <span className="h-1.5 w-1.5 rounded-full bg-[#066eb0]" />
      {children}
    </span>
  );
}

function Input({
  label,
  className,
  ...rest
}: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <label className={`block ${className ?? ""}`}>
      <span className="mb-1 block text-sm font-medium text-slate-700">
        {label}
      </span>
      <input
        {...rest}
        className="w-full rounded-xl border border-slate-300/80 bg-white/70 px-3 py-2 text-slate-900 outline-none ring-0 transition placeholder:text-slate-400 focus:border-[#066eb0] focus:bg-white"
      />
    </label>
  );
}

import { useTranslations as useTForSelect } from "next-intl";
function Select({
  label,
  name,
  options,
  className,
}: {
  label: string;
  name: string;
  options: string[];
  className?: string;
}) {
  const t = useTForSelect("meeting");
  return (
    <label className={`block ${className ?? ""}`}>
      <span className="mb-1 block text-sm font-medium text-slate-700">
        {label}
      </span>
      <select
        name={name}
        className="w-full rounded-xl border border-slate-300/80 bg-white/70 px-3 py-2 text-slate-900 outline-none transition focus:border-[#066eb0] focus:bg-white"
        defaultValue=""
      >
        <option value="" disabled>
          {t("form.selectPlaceholder")}
        </option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </label>
  );
}

function Textarea({
  label,
  className,
  ...rest
}: React.TextareaHTMLAttributes<HTMLTextAreaElement> & { label: string }) {
  return (
    <label className={`block ${className ?? ""}`}>
      <span className="mb-1 block text-sm font-medium text-slate-700">
        {label}
      </span>
      <textarea
        {...rest}
        className="w-full rounded-xl border border-slate-300/80 bg-white/70 px-3 py-2 text-slate-900 outline-none ring-0 transition placeholder:text-slate-400 focus:border-[#066eb0] focus:bg-white"
      />
    </label>
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
