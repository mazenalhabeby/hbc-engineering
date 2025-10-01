import React from "react";
export default function MapCard() {
  const addr = "Kapellenstraße 30, 4664 Laakirchen, Austria";
  const q = encodeURIComponent(addr);
  return (
    <div className="mt-6 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      <div className="aspect-[16/9] w-full">
        <iframe
          title="HBC Group HQ"
          className="h-full w-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          src={`https://www.google.com/maps?q=${q}&z=14&output=embed`}
        />
      </div>
      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 p-4 text-sm text-slate-700">
        <div>
          <strong>Address:</strong> {addr}
        </div>
        <a
          className="rounded-lg border border-slate-300 px-3 py-1 hover:bg-slate-50"
          href={`https://www.google.com/maps/search/?api=1&query=${q}`}
          target="_blank"
          rel="noreferrer noopener"
        >
          Open in Google Maps
        </a>
      </div>
    </div>
  );
}
