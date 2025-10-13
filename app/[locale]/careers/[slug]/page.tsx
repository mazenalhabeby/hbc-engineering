"use client";

import React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { jobs } from "../jobsData";

export default function JobPage() {
  const { slug } = useParams<{ slug: string }>();

  // Handle potential array type (should be string in this route)
  const slugStr = Array.isArray(slug) ? slug[0] : slug;

  // Simple guard while params hydrate on the client
  if (!slugStr) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white text-slate-900 py-16">
        <section className="mx-auto max-w-7xl px-4 py-32 sm:px-6 lg:px-8">
          <div className="h-6 w-48 animate-pulse rounded bg-slate-200" />
          <div className="mt-4 h-10 w-80 animate-pulse rounded bg-slate-200" />
          <div className="mt-6 h-20 w-full max-w-2xl animate-pulse rounded bg-slate-100" />
        </section>
      </main>
    );
  }

  const job = jobs.find((j) => j.slug === slugStr);

  if (!job) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white text-slate-900">
        <section className="mx-auto max-w-7xl px-4 py-28 sm:px-6 lg:px-8">
          <div className="max-w-2xl rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Job not found
            </h1>
            <p className="mt-2 text-slate-600">
              The position you’re looking for doesn’t exist or may have been
              closed.
            </p>
            <Link
              href="/careers"
              className="mt-6 inline-flex items-center rounded-xl bg-slate-900 px-5 py-3 text-white shadow-sm transition hover:bg-slate-700"
            >
              Back to Careers
            </Link>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white text-slate-900">
      {/* Hero */}
      <section className="relative overflow-hidden py-8">
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
                Now hiring
              </span>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                {job.title}
              </h1>
            </div>
            <p className="mt-4 max-w-prose text-slate-600">{job.summary}</p>

            <div className="mt-4 flex flex-wrap gap-2 text-sm text-slate-700">
              <span className="rounded-full border border-slate-300 bg-white px-3 py-1">
                {job.location}
              </span>
              <span className="rounded-full border border-slate-300 bg-white px-3 py-1">
                {job.type}
                {job.hours ? ` • ${job.hours}` : ""}
              </span>
              {job.travel && (
                <span className="rounded-full border border-slate-300 bg-white px-3 py-1">
                  Travel: {job.travel}
                </span>
              )}
            </div>

            <div className="mt-8 flex gap-3">
              <Link
                href={`/careers/${job.slug}/apply`}
                className="inline-flex items-center rounded-xl bg-slate-900 px-5 py-3 text-white shadow-sm transition hover:bg-slate-700"
              >
                Apply now
              </Link>
              <Link
                href="/careers"
                className="inline-flex items-center rounded-xl border border-slate-300 bg-white px-5 py-3 text-slate-900 shadow-sm transition hover:bg-slate-50"
              >
                Back to all jobs
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Details */}
      <section className="bg-slate-50/60">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid gap-10 md:grid-cols-3">
            <div className="md:col-span-2 space-y-10">
              <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="text-lg font-semibold">Key responsibilities</h2>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-slate-700">
                  {job.responsibilities.map((r, i) => (
                    <li key={i}>{r}</li>
                  ))}
                </ul>
              </article>

              <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="text-lg font-semibold">Qualifications</h2>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-slate-700">
                  {job.qualifications.map((q, i) => (
                    <li key={i}>{q}</li>
                  ))}
                </ul>
              </article>

              {job.preferred && (
                <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                  <h2 className="text-lg font-semibold">Preferred skills</h2>
                  <ul className="mt-3 list-disc space-y-2 pl-5 text-slate-700">
                    {job.preferred.map((p, i) => (
                      <li key={i}>{p}</li>
                    ))}
                  </ul>
                </article>
              )}

              {job.benefits && (
                <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                  <h2 className="text-lg font-semibold">What we offer</h2>
                  <ul className="mt-3 list-disc space-y-2 pl-5 text-slate-700">
                    {job.benefits.map((b, i) => (
                      <li key={i}>{b}</li>
                    ))}
                  </ul>
                </article>
              )}
            </div>

            {/* Apply info box */}
            <aside className="space-y-6">
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="text-lg font-semibold">Ready to apply?</h3>
                <p className="mt-2 text-sm text-slate-600">
                  Submit your application on the next page. You can also email{" "}
                  <a
                    className="font-medium underline"
                    href={`mailto:${job.applyEmail ?? "info@hbc-group.eu"}`}
                  >
                    {job.applyEmail ?? "info@hbc-group.eu"}
                  </a>
                  .
                </p>
                <Link
                  href={`/careers/${job.slug}/apply`}
                  className="mt-4 inline-flex items-center rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-slate-700"
                >
                  Go to application
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}
