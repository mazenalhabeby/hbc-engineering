import React from "react";
export default function FaqAccordion({
  items,
}: {
  items: { q: string; a: string }[];
}) {
  return (
    <div className="mt-6 divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white">
      {items.map((f) => (
        <details key={f.q} className="group p-6 open:bg-slate-50">
          <summary className="flex cursor-pointer list-none items-center justify-between text-left text-base font-medium text-slate-900">
            <span>{f.q}</span>
            <span className="ml-4 rounded-full border border-slate-300 p-1 transition group-open:rotate-45">
              <svg
                viewBox="0 0 20 20"
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M10 4v12M4 10h12" />
              </svg>
            </span>
          </summary>
          <p className="mt-3 max-w-3xl text-sm text-slate-600">{f.a}</p>
        </details>
      ))}
    </div>
  );
}
