"use client";

import React, { useState } from "react";

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");
    setErrorMessage("");

    // Store form reference before async operation
    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      console.log("Submitting form to /api/contact...");

      const response = await fetch("/api/contact", {
        method: "POST",
        body: formData,
      });

      console.log("Response status:", response.status);
      console.log("Response ok:", response.ok);

      // Check if response is JSON
      const contentType = response.headers.get("content-type");
      console.log("Content-Type:", contentType);

      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Server did not return JSON response");
      }

      const data = await response.json();
      console.log("Response data:", data);

      if (response.ok) {
        setSubmitStatus("success");
        console.log("Form submitted successfully!");
        // Reset form using stored reference
        form.reset();
      } else {
        setSubmitStatus("error");
        // Show detailed error in development, generic error in production
        const detailedError = data.details ? `: ${data.details}` : "";
        setErrorMessage(data.error + detailedError || "Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setSubmitStatus("error");
      const errorMsg = error instanceof Error ? error.message : "Unknown error";
      setErrorMessage(`Network error: ${errorMsg}. Please check your connection and try again.`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      {submitStatus === "success" && (
        <div className="mb-4 rounded-lg bg-green-50 p-4 text-green-800 border border-green-200">
          <p className="font-medium">Message sent successfully!</p>
          <p className="text-sm mt-1">We'll get back to you within 24 hours.</p>
        </div>
      )}

      {submitStatus === "error" && (
        <div className="mb-4 rounded-lg bg-red-50 p-4 text-red-800 border border-red-200">
          <p className="font-medium">Error sending message</p>
          <p className="text-sm mt-1">{errorMessage}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
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
            name="consent"
            type="checkbox"
            required
            className="h-4 w-4 rounded border-slate-300 text-slate-900 focus:ring-slate-300"
          />
          <label htmlFor="consent" className="text-sm text-slate-600">
            I agree to be contacted by HBC Group about my request.
          </label>
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex w-full items-center justify-center rounded-xl bg-slate-900 px-5 py-3 font-medium text-white shadow-sm transition hover:bg-slate-700 disabled:bg-slate-400 disabled:cursor-not-allowed sm:w-auto"
        >
          {isSubmitting ? "Sending..." : "Submit request"}
        </button>
        <p className="text-xs text-slate-500">
          We respect your privacy and won’t share your details.
        </p>
      </form>
    </div>
  );
}
