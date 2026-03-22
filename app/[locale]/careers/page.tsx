// app/careers/page.tsx
import { jobs } from "./jobsData";
import Link from "next/link";
import { useTranslations } from "next-intl";
import CareersHero from "@/components/CareersHero";

export default function Careers() {
  const t = useTranslations("careers");

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white text-slate-900">
      {/* Hero */}
      <CareersHero
        badge={t("hero.badge")}
        kicker={t("hero.kicker")}
        title={t("hero.title")}
        subtitle={t("hero.subtitle")}
      />

      {/* Jobs */}
      <section className="bg-slate-50/60">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {jobs.map((job) => {
              // per-job translation helper
              const tj = (key: string) => t(`jobs.${job.slug}.${key}`);
              const showHours = Boolean(job.hours);
              const showTravel = Boolean(job.travel);

              // translate up to 3 visible tags (matching your UI)
              const translatedTags =
                job.tags?.slice(0, 3).map((_, i) => tj(`tags.${i}`)) ?? [];

              return (
                <article
                  key={job.slug}
                  className="group relative rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md"
                >
                  <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-slate-50 px-3 py-1 text-xs font-medium text-slate-700 ring-1 ring-slate-200">
                    <span className="inline-block h-2 w-2 rounded-full bg-emerald-500" />
                    {tj("type")}
                  </div>

                  <h2 className="text-lg font-semibold">{tj("title")}</h2>
                  <p className="mt-2 line-clamp-3 text-sm text-slate-600">
                    {tj("summary")}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2 text-xs text-slate-600">
                    <span className="rounded-full border border-slate-200 bg-white px-2 py-0.5">
                      {tj("location")}
                    </span>
                    {showHours && (
                      <span className="rounded-full border border-slate-200 bg-white px-2 py-0.5">
                        {tj("hours")}
                      </span>
                    )}
                    {showTravel && (
                      <span className="rounded-full border border-slate-200 bg-white px-2 py-0.5">
                        {t("labels.travel")}: {tj("travel")}
                      </span>
                    )}
                    {translatedTags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-slate-200 bg-white px-2 py-0.5"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="mt-6 flex items-center justify-between">
                    <Link
                      href={`/careers/${job.slug}`}
                      className="inline-flex items-center rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-slate-700"
                    >
                      {t("cta.viewDetails")}
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
