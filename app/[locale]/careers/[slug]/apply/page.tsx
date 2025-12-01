// app/careers/[slug]/apply/page.tsx
"use client";

import * as React from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  useForm,
  FormProvider,
  useFormContext,
  useController,
  type FieldErrors,
} from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast, Toaster } from "sonner";
import { jobs } from "../../jobsData";

/* ---------------------------------- STEP CONFIG ---------------------------------- */
const STEPS = ["Personal & Documents", "Review"] as const;
const currencies = ["EUR", "USD"] as const;

/* ---------------------------------- COUNTRY CODES ---------------------------------- */
const countryCodes = [
  { code: "+1", country: "United States", flag: "🇺🇸", countryCode: "US" },
  { code: "+1", country: "Canada", flag: "🇨🇦", countryCode: "CA" },
  { code: "+44", country: "United Kingdom", flag: "🇬🇧", countryCode: "GB" },
  { code: "+43", country: "Austria", flag: "🇦🇹", countryCode: "AT" },
  { code: "+49", country: "Germany", flag: "🇩🇪", countryCode: "DE" },
  { code: "+33", country: "France", flag: "🇫🇷", countryCode: "FR" },
  { code: "+39", country: "Italy", flag: "🇮🇹", countryCode: "IT" },
  { code: "+34", country: "Spain", flag: "🇪🇸", countryCode: "ES" },
  { code: "+31", country: "Netherlands", flag: "🇳🇱", countryCode: "NL" },
  { code: "+32", country: "Belgium", flag: "🇧🇪", countryCode: "BE" },
  { code: "+41", country: "Switzerland", flag: "🇨🇭", countryCode: "CH" },
  { code: "+45", country: "Denmark", flag: "🇩🇰", countryCode: "DK" },
  { code: "+46", country: "Sweden", flag: "🇸🇪", countryCode: "SE" },
  { code: "+47", country: "Norway", flag: "🇳🇴", countryCode: "NO" },
  { code: "+48", country: "Poland", flag: "🇵🇱", countryCode: "PL" },
  { code: "+351", country: "Portugal", flag: "🇵🇹", countryCode: "PT" },
  { code: "+353", country: "Ireland", flag: "🇮🇪", countryCode: "IE" },
  { code: "+61", country: "Australia", flag: "🇦🇺", countryCode: "AU" },
  { code: "+64", country: "New Zealand", flag: "🇳🇿", countryCode: "NZ" },
  { code: "+91", country: "India", flag: "🇮🇳", countryCode: "IN" },
  { code: "+86", country: "China", flag: "🇨🇳", countryCode: "CN" },
  { code: "+81", country: "Japan", flag: "🇯🇵", countryCode: "JP" },
  { code: "+82", country: "South Korea", flag: "🇰🇷", countryCode: "KR" },
  { code: "+65", country: "Singapore", flag: "🇸🇬", countryCode: "SG" },
  { code: "+971", country: "UAE", flag: "🇦🇪", countryCode: "AE" },
] as const;

/* ---------------------------------- ZOD SCHEMAS ---------------------------------- */
const personalSchema = z.object({
  name: z.string().min(2, "Please enter your full name"),
  email: z.string().email("Please enter a valid email"),
  phoneCountryCode: z.string().min(1, "Country code is required"),
  phone: z
    .string()
    .min(1, "Phone number is required")
    .regex(
      /^[0-9\s\-().]+$/,
      "Please enter a valid phone number (digits, spaces, dashes, and parentheses only)"
    ),
  profile: z
    .string()
    .url("Please enter a valid URL (including https://)")
    .optional()
    .or(z.literal("")),
  addressStreet: z.string().min(2, "Street is required"),
  addressLine2: z.string().optional().or(z.literal("")),
  addressCity: z.string().min(1, "City is required"),
  addressRegion: z.string().optional().or(z.literal("")),
  addressPostal: z.string().min(1, "Postal code is required"),
  addressCountry: z.string().min(1, "Country is required"),
});

const experienceSchema = z.object({
  yearsExperience: z.preprocess(
    (v) => (v === "" || v == null ? undefined : Number(v)),
    z.number().int().min(0).optional()
  ),
  earliestStart: z.string().optional().or(z.literal("")),
  noticePeriod: z.string().optional().or(z.literal("")),
  salaryCurrency: z.enum(currencies).optional(),
  salary: z.preprocess(
    (v) => (v === "" || v == null ? undefined : Number(v)),
    z.number().min(0).optional()
  ),
  workAuthorization: z
    .enum([
      "Citizen / Permanent resident",
      "Work visa / Permit",
      "Require sponsorship",
      "Other / Not sure",
    ])
    .optional(),
  relocate: z
    .enum(["Open to relocate", "Maybe, case-by-case", "Not at this time"])
    .optional(),
  travel: z.enum(["Up to 25%", "Up to 50%", "Up to 75%", "100%+"]).optional(),
});

const skillsSchema = z.object({
  driversLicense: z.enum(["Yes", "No"]).optional(),
  languages: z.string().optional().or(z.literal("")),
  skills: z.array(z.string()).optional().default([]),
  notes: z.string().optional().or(z.literal("")),
});

const documentsSchema = z.object({
  coverLetter: z.string().optional().or(z.literal("")),
  cv: z.any().refine((fl) => fl && fl.length && fl[0], "CV is required"),
  files: z.any().optional(),
});

const consentSchema = z.object({
  consentContact: z.literal(true, {
    errorMap: () => ({ message: "Please agree to be contacted." }),
  }),
  consentData: z.literal(true, {
    errorMap: () => ({ message: "Please agree to data processing." }),
  }),
  signature: z.string().min(2, "Please type your full name"),
});

const formSchema = personalSchema
  .and(experienceSchema)
  .and(skillsSchema)
  .and(documentsSchema)
  .and(consentSchema);
export type ApplyFormData = z.infer<typeof formSchema>;

/* ------------------------------ STEP → FIELD MAP ------------------------------ */
const FIELDS_BY_STEP: Record<number, (keyof ApplyFormData | string)[]> = {
  0: [
    "name",
    "email",
    "phoneCountryCode",
    "phone",
    "profile",
    "addressStreet",
    "addressLine2",
    "addressCity",
    "addressRegion",
    "addressPostal",
    "addressCountry",
    "coverLetter",
    "cv",
    "files",
  ],
  1: ["consentContact", "consentData", "signature"],
};

/* -------------------------------------- PAGE -------------------------------------- */
export default function ApplyPage() {
  // Hooks first
  const params = useParams<{ slug: string; locale: string }>();
  const slugStr = Array.isArray(params.slug) ? params.slug[0] : params.slug;
  const locale = Array.isArray(params.locale)
    ? params.locale[0]
    : params.locale;
  const router = useRouter();

  const methods = useForm<ApplyFormData>({
    resolver: zodResolver(formSchema),
    mode: "onBlur",
    defaultValues: {
      salaryCurrency: "EUR",
      skills: [],
      phoneCountryCode: "+43", // Default to Austria
      addressCountry: "",
    },
  });
  const {
    handleSubmit,
    trigger,
    watch,
    formState: { isSubmitting },
    setError,
    setValue,
  } = methods;

  const [step, setStep] = React.useState(0);

  // Auto-detect user's country based on geolocation
  React.useEffect(() => {
    async function detectCountry() {
      try {
        const res = await fetch("https://ipapi.co/json/");
        if (res.ok) {
          const data = await res.json();
          const userCountryCode = data.country_code; // e.g., "AT", "US"

          // Find matching country in our list
          const matchedCountry = countryCodes.find(
            (c) => c.countryCode === userCountryCode
          );

          if (matchedCountry) {
            // Set phone country code
            setValue("phoneCountryCode", matchedCountry.code);
            // Set address country
            setValue("addressCountry", matchedCountry.country);
          }
        }
      } catch (error) {
        // Silently fail - keep default values
        console.error("Failed to detect country:", error);
      }
    }

    detectCountry();
  }, [setValue]);

  const job = React.useMemo(
    () => (slugStr ? jobs.find((j) => j.slug === slugStr) : undefined),
    [slugStr]
  );

  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [step]);

  const next = async () => {
    const fields = FIELDS_BY_STEP[step] ?? [];
    const valid = await trigger(fields as Parameters<typeof trigger>[0]);
    if (valid) setStep((s) => Math.min(s + 1, STEPS.length - 1));
  };
  const back = () => setStep((s) => Math.max(s - 1, 0));

  const onSubmit = async (values: ApplyFormData) => {
    const fd = new FormData();

    // Append primitives
    for (const [k, v] of Object.entries(values)) {
      if (k === "cv" || k === "files" || k === "skills") continue;
      if (typeof v === "number") fd.append(k, String(v));
      else if (typeof v === "boolean") fd.append(k, v ? "true" : "false");
      else if (v != null) fd.append(k, v as string);
    }
    values.skills?.forEach((s) => fd.append("skills", s));

    const MAX_BYTES = 10 * 1024 * 1024;

    // CV (required)
    const cvFL = values.cv as FileList;
    if (!cvFL?.[0]) throw new Error("CV is required");
    if (cvFL[0].size > MAX_BYTES) {
      setError("cv", { message: "CV must be 10MB or less" });
      setStep(0);
      return;
    }
    fd.append("cv", cvFL[0]);

    // Additional files
    const extraFL = values.files as FileList | undefined;
    if (extraFL?.length) {
      for (const f of Array.from(extraFL)) {
        if (f.size > MAX_BYTES) {
          setError("files", { message: `File "${f.name}" exceeds 10MB` });
          setStep(0);
          return;
        }
        fd.append("files", f);
      }
    }

    // Meta
    if (job) {
      fd.append("position", job.title);
      fd.append("slug", job.slug);
    }

    const res = await fetch("/api/apply", { method: "POST", body: fd });
    if (!res.ok) {
      const errorData = await res
        .json()
        .catch(() => ({ error: "Application failed." }));
      toast.error(errorData.error || "Application failed. Please try again.");
      return;
    }

    // Success!
    toast.success("Application submitted successfully! Redirecting...");

    // Small delay to show success message
    setTimeout(() => {
      router.push(
        `/${locale}/careers/thank-you?role=${encodeURIComponent(
          job?.title ?? "Role"
        )}&name=${encodeURIComponent(values.name)}`
      );
    }, 1000);
  };

  // Safe fallbacks after hooks
  if (!slugStr) return <SkeletonPage />;
  if (!job) return <NotFoundCard />;

  const v = watch();

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white text-slate-900 py-16">
      <Toaster position="top-center" richColors closeButton />
      {/* Hero */}
      <section className="relative overflow-hidden py-8">
        <div className="absolute inset-0 pointer-events-none" aria-hidden>
          <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full blur-3xl opacity-20 bg-blue-300" />
          <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full blur-3xl opacity-20 bg-emerald-300" />
        </div>
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="mb-3 inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700 ring-1 ring-blue-200">
              Careers
            </p>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Apply – {job.title}
            </h1>
            <p className="mt-2 text-slate-600">
              Complete the steps below. You can go back and review before
              submitting.
            </p>
          </div>
        </div>
      </section>

      {/* Stepper */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ol className="mb-6 flex flex-wrap items-center gap-3 text-sm">
          {STEPS.map((label, i) => (
            <li key={label} className="flex items-center gap-2">
              <span
                className={[
                  "inline-flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold",
                  i === step
                    ? "bg-slate-900 text-white"
                    : i < step
                    ? "bg-emerald-600 text-white"
                    : "bg-slate-200 text-slate-700",
                ].join(" ")}
              >
                {i + 1}
              </span>
              <span className={i <= step ? "font-medium" : "text-slate-500"}>
                {label}
              </span>
              {i < STEPS.length - 1 && (
                <span className="mx-1 text-slate-300">—</span>
              )}
            </li>
          ))}
        </ol>
      </section>

      {/* Form */}
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="w-full rounded-2xl border border-slate-200 bg-white p-4 sm:p-6 shadow-sm">
          <FormProvider {...methods}>
            <form
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              className="w-full max-w-full"
            >
              {/* STEP 1 — Personal */}
              <fieldset
                className={step === 0 ? "" : "hidden"}
                aria-hidden={step !== 0}
              >
                <legend className="text-lg font-semibold">
                  Personal details
                </legend>
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <TextField
                    name="name"
                    label="Full name"
                    required
                    autoComplete="name"
                  />
                  <TextField
                    name="email"
                    type="email"
                    label="Email"
                    required
                    autoComplete="email"
                  />
                  <CountryPhoneField required />
                  <TextField
                    name="profile"
                    label="LinkedIn / Portfolio (optional)"
                    placeholder="https://…"
                  />
                </div>

                <div className="mt-6">
                  <h4 className="text-sm font-medium text-slate-900">
                    Address
                  </h4>
                  <div className="mt-3 grid gap-4">
                    <TextField
                      name="addressStreet"
                      label="Street address"
                      required
                      placeholder="Street and number"
                    />
                    <TextField
                      name="addressLine2"
                      label="Address line 2 (optional)"
                      placeholder="Apartment, suite, unit, etc."
                    />
                    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                      <TextField name="addressCity" label="City" required />
                      <TextField name="addressRegion" label="State / Region" />
                      <TextField
                        name="addressPostal"
                        label="Postal code"
                        required
                      />
                      <TextField
                        name="addressCountry"
                        label="Country"
                        required
                        placeholder="e.g., Austria"
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <h4 className="text-sm font-medium text-slate-900">
                    Documents
                  </h4>

                  <div className="mt-4">
                    <label className="block text-sm text-slate-700">
                      Cover letter (optional)
                    </label>
                    <Textarea name="coverLetter" rows={4} />
                    <FieldError name="coverLetter" />
                  </div>

                  <div className="mt-6">
                    <FileDrop
                      name="cv"
                      label="CV / Résumé"
                      description="PDF or DOC/DOCX, max 10MB."
                      accept=".pdf,.doc,.docx"
                      required
                      maxBytes={10 * 1024 * 1024}
                      multiple={false}
                    />
                  </div>

                  <div className="mt-6">
                    <FileDrop
                      name="files"
                      label="Additional documents (optional)"
                      description="PDF, DOC/DOCX, PNG/JPG, ZIP — up to 5 files, 10MB each."
                      accept=".pdf,.doc,.docx,.png,.jpg,.jpeg,.zip"
                      multiple
                      maxFiles={5}
                      maxBytes={10 * 1024 * 1024}
                    />
                  </div>
                </div>
              </fieldset>

              {/* STEP 2 — Review / Consent + REVIEW SUMMARY */}
              <fieldset
                className={step === 1 ? "" : "hidden"}
                aria-hidden={step !== 1}
              >
                <legend className="text-lg font-semibold">
                  Review & consent
                </legend>
                <p className="mt-2 text-sm text-slate-600">
                  Please confirm your details. By submitting, you agree to our
                  recruitment privacy policy.
                </p>

                <div className="mt-4 space-y-3">
                  <Checkbox
                    name="consentContact"
                    label="I agree to be contacted about my application."
                    required
                  />
                  <Checkbox
                    name="consentData"
                    label="I consent to the processing of my personal data for recruitment in line with HBC Group’s privacy policy."
                    required
                  />
                  <TextField
                    name="signature"
                    label="Signature (type your full name)"
                    required
                  />
                </div>

                {/* REVIEW SUMMARY */}
                <div className="mt-8 rounded-xl border border-slate-200 bg-slate-50/60 p-5">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-semibold text-slate-900">
                      Your application
                    </h3>
                  </div>

                  <SummarySection title="Personal" onEdit={() => setStep(0)}>
                    <KV label="Full name" value={v.name} />
                    <KV label="Email" value={v.email} />
                    <KV
                      label="Phone"
                      value={
                        v.phone
                          ? `${v.phoneCountryCode || ""} ${v.phone}`
                          : undefined
                      }
                    />
                    <KV label="Profile" value={v.profile} isLink />
                  </SummarySection>

                  <SummarySection title="Address" onEdit={() => setStep(0)}>
                    <KV label="Street" value={v.addressStreet} />
                    <KV label="Line 2" value={v.addressLine2} />
                    <KV label="City" value={v.addressCity} />
                    <KV label="Region" value={v.addressRegion} />
                    <KV label="Postal code" value={v.addressPostal} />
                    <KV label="Country" value={v.addressCountry} />
                  </SummarySection>

                  <SummarySection title="Documents" onEdit={() => setStep(0)}>
                    <KV
                      label="CV / Résumé"
                      value={fileNameFromFileList(v.cv as unknown as FileList)}
                    />
                    <KV
                      label="Additional files"
                      value={fileNamesFromFileList(
                        v.files as unknown as FileList
                      )}
                    />
                  </SummarySection>
                </div>
              </fieldset>

              {/* Navigation buttons */}
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex gap-2 sm:gap-3">
                  <Link
                    href={`/${locale}/careers/${job.slug}`}
                    className="rounded-xl border border-slate-300 bg-white px-4 py-2.5 sm:px-5 sm:py-3 text-sm sm:text-base text-slate-900 shadow-sm hover:bg-slate-50"
                  >
                    Back to job
                  </Link>
                  {step > 0 && (
                    <button
                      type="button"
                      onClick={back}
                      className="rounded-xl border border-slate-300 bg-white px-4 py-2.5 sm:px-5 sm:py-3 text-sm sm:text-base text-slate-900 shadow-sm hover:bg-slate-50"
                    >
                      Back
                    </button>
                  )}
                </div>

                {step < STEPS.length - 1 ? (
                  <button
                    type="button"
                    onClick={next}
                    className="rounded-xl bg-slate-900 px-4 py-2.5 sm:px-5 sm:py-3 text-sm sm:text-base font-medium text-white shadow-sm hover:bg-slate-700"
                  >
                    Continue
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="rounded-xl bg-slate-900 px-4 py-2.5 sm:px-5 sm:py-3 text-sm sm:text-base font-medium text-white shadow-sm hover:bg-slate-700 disabled:opacity-60"
                  >
                    {isSubmitting ? "Submitting…" : "Submit application"}
                  </button>
                )}
              </div>
            </form>
          </FormProvider>
        </div>
      </section>
    </main>
  );
}

/* ---------------------------------- UI HELPERS ---------------------------------- */
function SkeletonPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white text-slate-900">
      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="h-6 w-40 animate-pulse rounded bg-slate-200" />
        <div className="mt-4 h-10 w-80 animate-pulse rounded bg-slate-200" />
      </section>
    </main>
  );
}

function NotFoundCard() {
  const params = useParams<{ locale: string }>();
  const locale = Array.isArray(params.locale)
    ? params.locale[0]
    : params.locale;

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white text-slate-900">
      <section className="mx-auto max-w-7xl px-4 py-28 sm:px-6 lg:px-8">
        <div className="max-w-xl rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Job not found
          </h1>
          <p className="mt-2 text-slate-600">
            The position you&#39;re looking for doesn&#39;t exist or may have
            been closed.
          </p>
          <Link
            href={`/${locale}/careers`}
            className="mt-6 inline-flex items-center rounded-xl bg-slate-900 px-5 py-3 text-white shadow-sm transition hover:bg-slate-700"
          >
            Back to Careers
          </Link>
        </div>
      </section>
    </main>
  );
}

/* ------------------------------ RHF FIELD COMPONENTS ------------------------------ */
function TextField({
  name,
  label,
  className,
  required,
  ...rest
}: React.InputHTMLAttributes<HTMLInputElement> & {
  name: keyof ApplyFormData | string;
  label: string;
}) {
  const { register, formState } = useFormContext<ApplyFormData>();
  const err = getErr(formState.errors, name);
  return (
    <div>
      <label className="block text-sm text-slate-700">
        {label} {required && <span className="text-rose-600">*</span>}
      </label>
      <input
        {...register(name as keyof ApplyFormData)}
        {...rest}
        className={[
          "mt-1 w-full rounded-xl border px-3 py-2 shadow-sm",
          err
            ? "border-rose-300 focus:border-rose-400 focus:ring-rose-200"
            : "border-slate-300 focus:border-slate-400 focus:ring-slate-300",
          className || "",
        ].join(" ")}
      />
      {err && <p className="mt-1 text-xs text-rose-700">{err}</p>}
    </div>
  );
}

function FieldError({ name }: { name: keyof ApplyFormData | string }) {
  const { formState } = useFormContext<ApplyFormData>();
  const err = getErr(formState.errors, name);
  return err ? <p className="mt-1 text-xs text-rose-700">{err}</p> : null;
}

function Textarea({
  name,
  rows = 3,
  className,
  ...rest
}: React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  name: keyof ApplyFormData | string;
}) {
  const { register, formState } = useFormContext<ApplyFormData>();
  const err = getErr(formState.errors, name);
  return (
    <>
      <textarea
        {...register(name as keyof ApplyFormData)}
        {...rest}
        rows={rows}
        className={[
          "mt-1 w-full rounded-xl border px-3 py-2 shadow-sm",
          err
            ? "border-rose-300 focus:border-rose-400 focus:ring-rose-200"
            : "border-slate-300 focus:border-slate-400 focus:ring-slate-300",
          className || "",
        ].join(" ")}
      />
      {err && <p className="mt-1 text-xs text-rose-700">{err}</p>}
    </>
  );
}

function Checkbox({
  name,
  label,
  required,
}: {
  name: keyof ApplyFormData | string;
  label: string;
  required?: boolean;
}) {
  const { register, formState } = useFormContext<ApplyFormData>();
  const err = getErr(formState.errors, name);
  return (
    <label className="flex items-start gap-3">
      <input
        type="checkbox"
        {...register(name as keyof ApplyFormData)}
        className="mt-1 h-4 w-4 rounded border-slate-300 text-slate-900"
      />
      <span className="text-sm text-slate-700">
        {label} {required && <span className="text-rose-600">*</span>}
        {err && <span className="ml-2 text-rose-700">{err}</span>}
      </span>
    </label>
  );
}
/* ------------------------------ Country Phone Field ------------------------------ */
function CountryPhoneField({ required }: { required?: boolean }) {
  const { register, formState } = useFormContext<ApplyFormData>();
  const codeErr = getErr(formState.errors, "phoneCountryCode");
  const phoneErr = getErr(formState.errors, "phone");
  const hasError = codeErr || phoneErr;

  return (
    <div className="min-w-0">
      <label className="block text-sm text-slate-700">
        Phone {required && <span className="text-rose-600">*</span>}
      </label>
      <div className="mt-1 flex gap-2 min-w-0">
        <select
          {...register("phoneCountryCode")}
          className={[
            "w-24 sm:w-32 flex-shrink-0 rounded-xl border bg-white px-2 sm:px-3 py-2 shadow-sm text-sm sm:text-base",
            hasError
              ? "border-rose-300 focus:border-rose-400 focus:ring-rose-200"
              : "border-slate-300 focus:border-slate-400 focus:ring-slate-300",
          ].join(" ")}
          style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
        >
          {countryCodes.map((c, idx) => (
            <option
              key={`${c.code}-${c.country}-${idx}`}
              value={c.code}
              style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
            >
              {c.flag} {c.code}
            </option>
          ))}
        </select>
        <input
          type="tel"
          {...register("phone")}
          placeholder="123 456 7890"
          autoComplete="tel"
          className={[
            "flex-1 min-w-0 rounded-xl border px-3 py-2 shadow-sm",
            hasError
              ? "border-rose-300 focus:border-rose-400 focus:ring-rose-200"
              : "border-slate-300 focus:border-slate-400 focus:ring-slate-300",
          ].join(" ")}
        />
      </div>
      {codeErr && <p className="mt-1 text-xs text-rose-700">{codeErr}</p>}
      {phoneErr && <p className="mt-1 text-xs text-rose-700">{phoneErr}</p>}
    </div>
  );
}

/* ------------------------------ Enhanced File Drop ------------------------------ */
function FileDrop(props: {
  name: keyof ApplyFormData | string;
  label: string;
  description?: string;
  accept?: string; // ".pdf,.doc,.docx"
  multiple?: boolean;
  required?: boolean;
  maxBytes?: number; // per-file
  maxFiles?: number; // for multiple
}) {
  const {
    name,
    label,
    description,
    accept = "",
    multiple = false,
    required = false,
    maxBytes = 10 * 1024 * 1024,
    maxFiles,
  } = props;

  const {
    control,
    formState: { errors },
    clearErrors,
    setError,
  } = useFormContext<ApplyFormData>();
  const { field } = useController({
    name: name as keyof ApplyFormData,
    control,
  });

  const inputRef = React.useRef<HTMLInputElement | null>(null);
  const [isOver, setIsOver] = React.useState(false);
  const errMsg = getErr(errors, name as string);

  const currentFL = field.value as FileList | undefined;
  const currentFiles = currentFL ? Array.from(currentFL) : [];

  const onBrowseClick = () => inputRef.current?.click();

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    handleIncomingFiles(Array.from(e.target.files));
    e.target.value = "";
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsOver(false);
    const dt = e.dataTransfer;
    if (!dt?.files?.length) return;
    handleIncomingFiles(Array.from(dt.files));
  };

  function handleIncomingFiles(incoming: File[]) {
    let next = multiple ? [...currentFiles] : [];
    const rejected: string[] = [];

    for (const f of incoming) {
      if (!fileAccepted(f, accept)) {
        rejected.push(`"${f.name}": type not allowed`);
        continue;
      }
      if (maxBytes && f.size > maxBytes) {
        rejected.push(`"${f.name}": exceeds ${humanBytes(maxBytes)}`);
        continue;
      }
      if (multiple) {
        if (
          !next.some(
            (x) =>
              x.name === f.name &&
              x.size === f.size &&
              x.lastModified === f.lastModified
          )
        ) {
          next.push(f);
        }
      } else {
        next = [f];
        break;
      }
    }

    if (multiple && maxFiles && next.length > maxFiles) {
      rejected.push(`Too many files (max ${maxFiles}).`);
      next = next.slice(0, maxFiles);
    }

    field.onChange(toFileList(next));
    if (rejected.length)
      setError(name as keyof ApplyFormData, {
        type: "validate",
        message: rejected.join(" • "),
      });
    else clearErrors(name as keyof ApplyFormData);
  }

  function removeFile(idx: number) {
    if (!currentFiles.length) return;
    const next = currentFiles.filter((_, i) => i !== idx);
    field.onChange(toFileList(next));
    if (!next.length && required) {
      setError(name as keyof ApplyFormData, {
        type: "required",
        message: `${label} is required`,
      });
    } else {
      clearErrors(name as keyof ApplyFormData);
    }
  }

  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <div>
          <label className="block text-sm font-medium text-slate-800">
            {label} {required && <span className="text-rose-600">*</span>}
          </label>
          {description && (
            <p className="mt-1 text-xs text-slate-500">{description}</p>
          )}
        </div>
        {currentFiles.length > 0 && (
          <button
            type="button"
            onClick={() => field.onChange(toFileList([]))}
            className="text-xs font-medium text-slate-700 underline underline-offset-2 hover:text-slate-900"
          >
            Clear all
          </button>
        )}
      </div>

      {/* Drop zone */}
      <div
        role="button"
        tabIndex={0}
        onKeyDown={(e) =>
          e.key === "Enter" || e.key === " " ? onBrowseClick() : null
        }
        onClick={onBrowseClick}
        onDragEnter={(e) => {
          e.preventDefault();
          setIsOver(true);
        }}
        onDragOver={(e) => {
          e.preventDefault();
          setIsOver(true);
        }}
        onDragLeave={(e) => {
          e.preventDefault();
          setIsOver(false);
        }}
        onDrop={onDrop}
        className={[
          "flex flex-col items-center justify-center rounded-xl border-2 border-dashed p-6 text-center transition",
          isOver
            ? "border-emerald-400 bg-emerald-50/50"
            : errMsg
            ? "border-rose-300 bg-rose-50/40"
            : "border-slate-300 bg-slate-50/60 hover:bg-slate-50",
        ].join(" ")}
      >
        <svg
          className="h-8 w-8"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          aria-hidden
        >
          <path
            d="M12 16V4m0 12l-3-3m3 3l3-3M4 20h16"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <p className="mt-2 text-sm">
          <span className="font-medium text-slate-900">Click to upload</span> or
          drag & drop
        </p>
        {accept && (
          <p className="mt-1 text-xs text-slate-500">Allowed: {accept}</p>
        )}
        {maxBytes && (
          <p className="text-xs text-slate-500">
            Max size: {humanBytes(maxBytes)} {multiple && "(each)"}
          </p>
        )}
      </div>

      {/* Hidden input (uncontrolled) */}
      <input
        ref={inputRef}
        type="file"
        className="hidden"
        multiple={multiple}
        accept={accept}
        onChange={onInputChange}
      />

      {/* Error */}
      {errMsg && <p className="mt-2 text-xs text-rose-700">{errMsg}</p>}

      {/* Selected files */}
      {currentFiles.length > 0 && (
        <ul className="mt-4 space-y-2">
          {currentFiles.map((f, idx) => (
            <li
              key={`${f.name}-${f.size}-${f.lastModified}-${idx}`}
              className="flex items-center justify-between rounded-lg border border-slate-200 bg-white p-3"
            >
              <div className="flex min-w-0 items-center gap-3">
                <FileIcon name={f.name} />
                <div className="min-w-0">
                  <p
                    className="truncate text-sm font-medium text-slate-900"
                    title={f.name}
                  >
                    {f.name}
                  </p>
                  <p className="text-xs text-slate-500">{humanBytes(f.size)}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => removeFile(idx)}
                className="rounded-md border border-slate-300 px-2 py-1 text-xs text-slate-700 hover:bg-slate-50"
                aria-label={`Remove ${f.name}`}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

/* ---------------------------- File UI helpers ---------------------------- */
function FileIcon({ name }: { name: string }) {
  const ext = name.split(".").pop()?.toLowerCase();
  const map: Record<string, string> = {
    pdf: "#EF4444",
    doc: "#2563EB",
    docx: "#2563EB",
    png: "#059669",
    jpg: "#059669",
    jpeg: "#059669",
    zip: "#7C3AED",
  };
  const color = map[ext ?? ""] ?? "#334155";
  return (
    <span
      className="inline-flex h-8 w-8 items-center justify-center rounded-md text-white"
      style={{ backgroundColor: color }}
      aria-hidden
    >
      {ext?.toUpperCase() ?? "FILE"}
    </span>
  );
}

function humanBytes(n: number) {
  if (n < 1024) return `${n} B`;
  const kb = n / 1024;
  if (kb < 1024) return `${kb.toFixed(1)} KB`;
  const mb = kb / 1024;
  if (mb < 1024) return `${mb.toFixed(1)} MB`;
  const gb = mb / 1024;
  return `${gb.toFixed(1)} GB`;
}

function toFileList(files: File[]): FileList {
  const dt = new DataTransfer();
  files.forEach((f) => dt.items.add(f));
  return dt.files;
}

function fileAccepted(file: File, accept: string) {
  if (!accept) return true;
  const rules = accept.split(",").map((s) => s.trim().toLowerCase());
  const name = file.name.toLowerCase();
  const mime = (file.type || "").toLowerCase();

  return rules.some((rule) => {
    if (!rule) return true;
    if (rule.startsWith(".")) return name.endsWith(rule);
    if (rule.endsWith("/*")) {
      const group = rule.slice(0, -2);
      return mime.startsWith(group + "/");
    }
    return mime === rule;
  });
}

/* ------------------------------- REVIEW UI HELPERS ------------------------------- */
function SummarySection({
  title,
  onEdit,
  children,
}: {
  title: string;
  onEdit?: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="mt-6 rounded-xl border border-slate-200 bg-white p-4">
      <div className="mb-3 flex items-center justify-between">
        <h4 className="text-sm font-semibold text-slate-900">{title}</h4>
        {onEdit && (
          <button
            type="button"
            onClick={onEdit}
            className="text-xs font-medium text-blue-700 underline-offset-4 hover:underline"
          >
            Edit
          </button>
        )}
      </div>
      <dl className="grid grid-cols-1 gap-3 sm:grid-cols-2">{children}</dl>
    </div>
  );
}

function KV({
  label,
  value,
  isLink = false,
}: {
  label: string;
  value?: string;
  isLink?: boolean;
}) {
  const display =
    value && value !== "undefined" && value !== "null" && value !== ""
      ? value
      : "—";
  return (
    <div className="rounded-lg border border-slate-100 bg-slate-50/60 p-3">
      <dt className="text-xs text-slate-500">{label}</dt>
      <dd className="mt-0.5 break-words text-sm text-slate-800">
        {isLink && display !== "—" ? (
          <a
            href={display}
            target="_blank"
            rel="noreferrer"
            className="underline underline-offset-2"
          >
            {display}
          </a>
        ) : (
          display
        )}
      </dd>
    </div>
  );
}

/* -------------------------------- UTIL FUNCS -------------------------------- */
function getErr(errors: FieldErrors<ApplyFormData>, name: string) {
  const e = errors?.[name as keyof typeof errors];
  return e?.message as string | undefined;
}

function fileNameFromFileList(fl?: FileList) {
  return fl && fl[0]?.name ? fl[0].name : "—";
}
function fileNamesFromFileList(fl?: FileList) {
  return fl && fl.length
    ? Array.from(fl)
        .map((f) => f.name)
        .join(", ")
    : "—";
}
