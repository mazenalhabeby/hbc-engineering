import React from "react";
export default function ContactForm() {
  return (
    <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <form action="#" method="post" className="space-y-4">
        <input
          type="text"
          name="website"
          className="hidden"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
        />
        <div className="grid gap-4 sm:grid-cols-2">
          {[
            {
              id: "name",
              label: "Name",
              type: "text",
              autoComplete: "name",
              required: true,
              placeholder: "Your name",
            },
            {
              id: "company",
              label: "Company",
              type: "text",
              autoComplete: "organization",
              required: false,
              placeholder: "Company name",
            },
            {
              id: "email",
              label: "Email",
              type: "email",
              autoComplete: "email",
              required: true,
              placeholder: "you@example.com",
            },
            {
              id: "phone",
              label: "Phone",
              type: "text",
              autoComplete: "tel",
              required: false,
              placeholder: "+43 ...",
            },
          ].map((f) => (
            <div key={f.id}>
              <label
                htmlFor={f.id}
                className="block text-sm font-medium text-slate-700"
              >
                {f.label}
              </label>
              <input
                id={f.id}
                required={!!f.required}
                name={f.id}
                type={f.type as "text" | "email"}
                autoComplete={f.autoComplete}
                placeholder={f.placeholder}
                className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-slate-900 placeholder-slate-400 shadow-sm focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-300"
              />
            </div>
          ))}
        </div>
        <div>
          <label
            htmlFor="service"
            className="block text-sm font-medium text-slate-700"
          >
            Service
          </label>
          <select
            id="service"
            name="service"
            defaultValue=""
            className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-slate-900 shadow-sm focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-300"
          >
            <option value="" disabled>
              Select a service…
            </option>
            <optgroup label="Maintenance">
              <option>Preventive maintenance</option>
              <option>Corrective maintenance</option>
              <option>Predictive maintenance</option>
              <option>24/7 emergency response</option>
              <option>Installation & commissioning</option>
              <option>Relocation & reassembly</option>
            </optgroup>
            <optgroup label="Sustainable Plant Substrates">
              <option>Green roof systems</option>
              <option>Water storage & retention</option>
              <option>Nursery & breeding mixes</option>
              <option>Landscape & urban trees</option>
              <option>Parks & bioswales</option>
              <option>Façade & container greening</option>
            </optgroup>
            <optgroup label="Smart Home & Automation">
              <option>Lighting & scenes</option>
              <option>Climate & air</option>
              <option>Shading & windows</option>
              <option>Security & access</option>
              <option>Energy & PV</option>
              <option>Audio & media</option>
            </optgroup>
            <optgroup label="Other">
              <option>General inquiry</option>
              <option>Partnerships</option>
              <option>Support</option>
            </optgroup>
          </select>
        </div>
        <div>
          <label
            htmlFor="message"
            className="block text-sm font-medium text-slate-700"
          >
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            placeholder="Describe your project, timeline, and any specifics..."
            className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-slate-900 placeholder-slate-400 shadow-sm focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-300"
          />
        </div>
        <div className="flex items-center gap-3">
          <input
            id="consent"
            type="checkbox"
            className="h-4 w-4 rounded border-slate-300 text-slate-900 focus:ring-slate-300"
          />
          <label htmlFor="consent" className="text-sm text-slate-600">
            I agree to be contacted by HBC Group about my request.
          </label>
        </div>
        <button
          type="submit"
          className="inline-flex w-full items-center justify-center rounded-xl bg-slate-900 px-5 py-3 font-medium text-white shadow-sm transition hover:bg-slate-700 sm:w-auto"
        >
          Submit request
        </button>
        <p className="text-xs text-slate-500">
          We respect your privacy and won’t share your details.
        </p>
      </form>
    </div>
  );
}
