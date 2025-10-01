import React from "react";
export default function InfoGrid() {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <div className="text-xs text-slate-500">Headquarters</div>
          <div className="mt-1 font-medium">
            Kapellenstraße 30, 4664 Laakirchen, Austria
          </div>
        </div>
        <div>
          <div className="text-xs text-slate-500">Hours</div>
          <div className="mt-1 font-medium">Mon–Thr · 8:00–17:00</div>
          <div className="mt-1 font-medium">Fri · 8:00–12:00</div>
        </div>
        <div>
          <div className="text-xs text-slate-500">Regions</div>
          <div className="mt-1 font-medium">EU & USA</div>
        </div>
        <div>
          <div className="text-xs text-slate-500">Response</div>
          <div className="mt-1 font-medium tabular-nums">
            &lt; 1 business day
          </div>
        </div>
      </div>
    </div>
  );
}
