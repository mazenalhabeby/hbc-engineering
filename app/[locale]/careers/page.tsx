// app/careers/page.tsx
import { jobs } from "./jobsData";
import Link from "next/link";

export default function Careers() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white text-slate-900 py-16">
      {/* Hero */}
      <section className="relative overflow-hidden pt-8">
        <div className="absolute inset-0 pointer-events-none" aria-hidden>
          <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full blur-3xl opacity-20 bg-blue-300" />
          <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full blur-3xl opacity-20 bg-emerald-300" />
        </div>

        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="mb-3 inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700 ring-1 ring-blue-200">
              Careers
            </p>
            <div>
              <span className="text-xl font-bold tracking-wider">
                Join the team
              </span>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                Build, service, and innovate with HBC Group
              </h1>
            </div>
            <p className="mt-4 max-w-prose text-slate-600">
              We’re growing across electrical, mechanical, and automation roles.
              Explore open positions and apply in minutes.
            </p>
          </div>
        </div>
      </section>

      {/* Jobs */}
      <section className="bg-slate-50/60">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {jobs.map((job) => (
              <article
                key={job.slug}
                className="group relative rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md"
              >
                <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-slate-50 px-3 py-1 text-xs font-medium text-slate-700 ring-1 ring-slate-200">
                  <span className="inline-block h-2 w-2 rounded-full bg-emerald-500" />
                  {job.type}
                </div>

                <h2 className="text-lg font-semibold">{job.title}</h2>
                <p className="mt-2 line-clamp-3 text-sm text-slate-600">
                  {job.summary}
                </p>

                <div className="mt-4 flex flex-wrap gap-2 text-xs text-slate-600">
                  <span className="rounded-full border border-slate-200 bg-white px-2 py-0.5">
                    {job.location}
                  </span>
                  {job.hours && (
                    <span className="rounded-full border border-slate-200 bg-white px-2 py-0.5">
                      {job.hours}
                    </span>
                  )}
                  {job.travel && (
                    <span className="rounded-full border border-slate-200 bg-white px-2 py-0.5">
                      Travel: {job.travel}
                    </span>
                  )}
                  {job.tags?.slice(0, 3).map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-slate-200 bg-white px-2 py-0.5"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="mt-6 flex items-center justify-between">
                  <Link
                    href={`/careers/${job.slug}`}
                    className="inline-flex items-center rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-slate-700"
                  >
                    View details
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
