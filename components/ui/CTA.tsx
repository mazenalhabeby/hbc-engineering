import React from "react";
import Section from "../Section";
export default function CTA({
  gradientFrom = "from-blue-600",
  gradientTo = "to-emerald-600",
  title,
  subtitle,
  bullets,
  phone,
  email,
}: {
  gradientFrom?: string;
  gradientTo?: string;
  title: string;
  subtitle: string;
  bullets: string[];
  phone: string;
  email: string;
}) {
  return (
    <Section id="contact" className="relative overflow-hidden">
      <div
        className={`absolute inset-0 -z-10 bg-gradient-to-r ${gradientFrom} ${gradientTo} opacity-10`}
        aria-hidden
      />
      <div className="py-14">
        <div className="grid items-center gap-8 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm md:grid-cols-3">
          <div className="md:col-span-2">
            <h2 className="text-xl font-semibold">{title}</h2>
            <p className="mt-2 text-slate-600">{subtitle}</p>
            <ul className="mt-4 grid gap-2 text-sm text-slate-700 sm:grid-cols-2">
              {bullets.map((b) => (
                <li key={b} className="flex items-center gap-2">
                  <span className="inline-block h-2 w-2 rounded-full bg-emerald-500" />{" "}
                  {b}
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-3 text-sm">
            <a
              href={`tel:${phone.replace(/\s+/g, "")}`}
              className="block rounded-xl bg-slate-900 px-5 py-3 text-center font-medium text-white shadow-sm transition hover:bg-slate-700"
            >
              Call {phone}
            </a>
            <a
              href={`mailto:${email}`}
              className="block rounded-xl border border-slate-300 bg-white px-5 py-3 text-center font-medium text-slate-900 shadow-sm transition hover:bg-slate-50"
            >
              {email}
            </a>
          </div>
        </div>
      </div>
    </Section>
  );
}
