import React from "react";
export default function ButtonsRow({
  primary,
  primaryHref,
  secondary,
  secondaryHref,
}: {
  primary: string;
  primaryHref: string;
  secondary: string;
  secondaryHref: string;
}) {
  return (
    <div className="mt-6 flex flex-wrap gap-3">
      <a
        href={primaryHref}
        className="inline-flex items-center rounded-xl bg-slate-900 px-5 py-3 text-white shadow-sm transition hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400"
      >
        {primary}
      </a>
      <a
        href={secondaryHref}
        className="inline-flex items-center rounded-xl border border-slate-300 bg-white px-5 py-3 text-slate-900 shadow-sm transition hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-300"
      >
        {secondary}
      </a>
    </div>
  );
}
