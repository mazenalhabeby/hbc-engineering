"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
  useForm,
  FormProvider,
  useFormContext,
  UseFormReturn,
  type FieldPath,
} from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

/**
 * ============================================
 *  Multi-Step Animated Project Request Form
 * ============================================
 * ✅ Validation only on blur (and on Next)
 * ✅ Step-scoped “Next” enable via silent Zod checks
 * ✅ Stable motion keys (no focus loss)
 * ✅ Animated gradient background + glass card
 */

// ---------------- Schema ----------------
// (kept messages static to avoid hook usage outside components)
const projectSchema = z.object({
  // Step 1 — Client Info
  fullName: z.string().min(2, "Please enter your full name"),
  company: z.string().min(2, "Please enter your company name"),
  email: z.string().email("Enter a valid email"),
  phone: z.string().optional(),
  country: z.string().min(2, "Select your country"),

  // Step 2 — Project Overview
  projectType: z.string().min(2, "Select a project type"),
  brief: z.string().min(20, "Provide at least 20 characters"),
  goals: z.string().min(10, "List your main project goals"),
  expectedUsers: z.string().optional(),

  // Step 3 — Scope & Timeline
  features: z.array(z.string()).min(1, "Select at least one feature"),
  deadline: z.string().optional(),
  timelineFlex: z.enum(["strict", "target", "open"]).default("target"),

  // Step 4 — Budget & Success
  budget: z.enum(["<10k", "10–30k", "30–80k", "80–200k", ">200k"]).optional(),
  procurement: z.enum(["Startup", "B2B", "Enterprise", "B2G"]).optional(),
  success: z.string().min(10, "Describe your success criteria"),
  risks: z.string().optional(),

  // Step 5 — Integrations & Security
  integrations: z.array(z.string()).optional().default([]),
  auth: z
    .enum(["None", "Email/Password", "SSO/SAML", "OAuth"])
    .default("Email/Password"),
  compliance: z.array(z.string()).optional().default([]),
  residency: z.enum(["EU", "US", "MENA", "Any"]).default("EU"),

  // Step 6 — Consent
  consent: z
    .boolean()
    .refine((v) => v === true, { message: "You must agree to continue" }),
});

export type ProjectRequestForm = z.infer<typeof projectSchema>;

// ---------------- Steps (keys only; labels via t) ----------------
const steps = [
  { key: "client" },
  { key: "overview" },
  { key: "scope" },
  { key: "budget" },
  { key: "security" },
  { key: "review" },
] as const;

type StepKey = (typeof steps)[number]["key"];

// ---------- TOP-LEVEL keys for Zod (no nested FieldPath) ----------
type TopKey = Extract<keyof ProjectRequestForm, string>;
const stepTopKeys: Record<StepKey, readonly TopKey[]> = {
  client: ["fullName", "company", "email", "country"],
  overview: ["projectType", "brief", "goals", "expectedUsers"],
  scope: ["features", "deadline", "timelineFlex"],
  budget: ["budget", "procurement", "success", "risks"],
  security: ["integrations", "auth", "compliance", "residency"],
  review: ["consent"],
};

// ---------- Casted version for RHF .trigger (FieldPath[]) ----------
type FP = FieldPath<ProjectRequestForm>;
const stepFieldsRHF = stepTopKeys as Record<StepKey, readonly FP[]>;

// Per-step Zod schemas for silent canNext checks
const stepSchemas = {
  client: projectSchema.pick({
    fullName: true,
    company: true,
    email: true,
    country: true,
  }),
  overview: projectSchema.pick({
    projectType: true,
    brief: true,
    goals: true,
    expectedUsers: true,
  }),
  scope: projectSchema.pick({
    features: true,
    deadline: true,
    timelineFlex: true,
  }),
  budget: projectSchema.pick({
    budget: true,
    procurement: true,
    success: true,
    risks: true,
  }),
  security: projectSchema.pick({
    integrations: true,
    auth: true,
    compliance: true,
    residency: true,
  }),
  review: projectSchema.pick({ consent: true }),
} satisfies Record<StepKey, z.ZodTypeAny>;

// Utility: pick values by keys (top-level only)
function pickValues<T extends object, K extends readonly (keyof T)[]>(
  obj: T,
  keys: K
): Pick<T, K[number]> {
  const out = {} as Pick<T, K[number]>;
  keys.forEach((k) => {
    out[k] = obj[k];
  });
  return out;
}

// ---------------- Presets (labels via t inside components) ----------------
const FEATURES = [
  "User Auth / SSO",
  "Admin Panel",
  "E-commerce / Payments",
  "Subscriptions / Billing",
  "Realtime Chat / Notifications",
  "Analytics Dashboard",
  "Mobile App",
  "AI Assistant / RAG",
  "Web3 Wallet / Tokens",
  "3rd-party Integrations",
] as const;

const INTEGRATIONS = [
  "Salesforce",
  "HubSpot",
  "SAP",
  "Stripe",
  "PayPal",
  "Plaid",
  "Auth0",
  "Okta",
  "AWS",
  "GCP",
  "Azure",
] as const;

const COMPLIANCE = ["GDPR", "ISO 27001", "SOC 2", "HIPAA", "PCI DSS"] as const;

// ---------------- Helper UI ----------------
function FieldError({ name }: { name: keyof ProjectRequestForm }) {
  const { formState } = useFormContext<ProjectRequestForm>();
  const error = formState.errors[name];
  if (!error) return null;
  return <p className="mt-1 text-sm text-red-600">{error.message as string}</p>;
}

function ChipSelector({
  options,
  value,
  onChange,
}: {
  options: readonly string[];
  value: string[];
  onChange: (v: string[]) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => {
        const active = value.includes(opt);
        return (
          <button
            key={opt}
            type="button"
            onClick={() =>
              onChange(
                active ? value.filter((v) => v !== opt) : [...value, opt]
              )
            }
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                e.currentTarget.click();
              }
            }}
            className={cn(
              "rounded-full px-3 py-1 text-sm border transition outline-none",
              "active:scale-[0.98] focus:ring-2 focus:ring-[#066eb0]/30",
              active
                ? "bg-[#066eb0] text-white border-[#066eb0] shadow-sm"
                : "bg-white text-slate-700 border-slate-300 hover:border-slate-400"
            )}
          >
            {opt}
          </button>
        );
      })}
    </div>
  );
}

// Stable-key wrapper for animated steps
const MotionStep: React.FC<React.PropsWithChildren<{ stepKey: string }>> = ({
  children,
  stepKey,
}) => (
  <motion.div
    key={stepKey}
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -12 }}
    transition={{ duration: 0.35 }}
    className="space-y-4"
  >
    {children}
  </motion.div>
);

// ---------------- Field Blocks ----------------
function InputBlock({
  id,
  label,
  placeholder,
  type = "text",
}: {
  id: keyof ProjectRequestForm;
  label: string;
  placeholder?: string;
  type?: string;
}) {
  const { register } = useFormContext<ProjectRequestForm>();
  return (
    <div>
      <Label htmlFor={id}>{label}</Label>
      <Input id={id} type={type} placeholder={placeholder} {...register(id)} />
      <FieldError name={id} />
    </div>
  );
}

function TextareaBlock({
  id,
  label,
  rows = 3,
  placeholder,
}: {
  id: keyof ProjectRequestForm;
  label: string;
  rows?: number;
  placeholder?: string;
}) {
  const { register } = useFormContext<ProjectRequestForm>();
  return (
    <div className="sm:col-span-2">
      <Label htmlFor={id}>{label}</Label>
      <Textarea
        id={id}
        rows={rows}
        placeholder={placeholder}
        {...register(id)}
      />
      <FieldError name={id} />
    </div>
  );
}

function SelectBlock({
  label,
  field,
  options,
  placeholder = "Select",
}: {
  label: string;
  field: keyof ProjectRequestForm;
  options: readonly string[];
  placeholder?: string;
}) {
  const { setValue } = useFormContext<ProjectRequestForm>();
  return (
    <div>
      <Label>{label}</Label>
      <Select
        onValueChange={(v: string) =>
          setValue(field, v as ProjectRequestForm[typeof field], {
            shouldDirty: true,
            shouldTouch: true,
          })
        }
      >
        <SelectTrigger>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((o) => (
            <SelectItem key={o} value={o}>
              {o}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <FieldError name={field} />
    </div>
  );
}

// ---------------- Main Form ----------------
export default function ClientForm() {
  const t = useTranslations("form");

  const [current, setCurrent] = useState(0);
  const [canNext, setCanNext] = useState(false);

  const methods: UseFormReturn<ProjectRequestForm> =
    useForm<ProjectRequestForm>({
      resolver: zodResolver(projectSchema),
      mode: "onBlur",
      reValidateMode: "onBlur",
      defaultValues: {
        fullName: "",
        company: "",
        email: "",
        phone: "",
        country: "",
        projectType: "",
        brief: "",
        goals: "",
        expectedUsers: "",
        features: [],
        deadline: "",
        timelineFlex: "target",
        budget: undefined,
        procurement: undefined,
        success: "",
        risks: "",
        integrations: [],
        auth: "Email/Password",
        compliance: [],
        residency: "EU",
        consent: false,
      },
    });

  const { handleSubmit, setValue, getValues, watch, trigger } = methods;

  // Steps (labels from i18n)
  const stepMeta = useMemo(
    () =>
      ({
        client: {
          title: t("steps.client.title"),
          subtitle: t("steps.client.subtitle"),
        },
        overview: {
          title: t("steps.overview.title"),
          subtitle: t("steps.overview.subtitle"),
        },
        scope: {
          title: t("steps.scope.title"),
          subtitle: t("steps.scope.subtitle"),
        },
        budget: {
          title: t("steps.budget.title"),
          subtitle: t("steps.budget.subtitle"),
        },
        security: {
          title: t("steps.security.title"),
          subtitle: t("steps.security.subtitle"),
        },
        review: {
          title: t("steps.review.title"),
          subtitle: t("steps.review.subtitle"),
        },
      } as const),
    [t]
  );

  // Autosave draft
  useEffect(() => {
    const key = "project-form-draft";
    const subscription = watch((values) => {
      localStorage.setItem(key, JSON.stringify(values));
    });

    const saved = localStorage.getItem(key);
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as ProjectRequestForm;
        (Object.keys(parsed) as (keyof ProjectRequestForm)[]).forEach((k) => {
          setValue(k, parsed[k]);
        });
      } catch {
        // ignore bad drafts
      }
    }
    return () => subscription.unsubscribe();
  }, [setValue, watch]);

  // Silent step validation for enabling Next (no error messages)
  useEffect(() => {
    const compute = () => {
      const key = steps[current].key as StepKey;
      const keys = stepTopKeys[key];
      const subset = pickValues(getValues(), keys);
      const ok = (stepSchemas[key] as z.ZodTypeAny).safeParse(subset).success;
      setCanNext(ok);
    };
    compute();
    const sub = watch(() => compute());
    return () => sub.unsubscribe();
  }, [current, watch, getValues]);

  const goNext = async () => {
    const key = steps[current].key as StepKey;
    const ok = await trigger(stepFieldsRHF[key], { shouldFocus: true });
    if (!ok) return;
    setCurrent((i) => Math.min(i + 1, steps.length - 1));
  };

  const goPrev = () => setCurrent((i) => Math.max(i - 1, 0));

  const onSubmit = (data: ProjectRequestForm) => {
    console.log("Submitted:", data);
    alert(t("alerts.submitted"));
    localStorage.removeItem("project-form-draft");
  };

  const progress = Math.round(((current + 1) / steps.length) * 100);

  // Localized lists
  const countries = [
    "Austria",
    "Belgium",
    "Croatia",
    "Czechia",
    "Denmark",
    "Egypt",
    "France",
    "Germany",
    "Italy",
    "Netherlands",
    "Poland",
    "Portugal",
    "Qatar",
    "Saudi Arabia",
    "Spain",
    "Sweden",
    "Switzerland",
    "Turkey",
    "UAE",
    "UK",
    "USA",
  ].map((c) => t(`lists.countries.${c}`));

  const projectTypes = [
    "Website / Landing",
    "SaaS / Platform",
    "E-commerce",
    "Mobile App",
    "AI / Automation",
    "Web3 / Payments",
    "Data / BI",
    "Other",
  ].map((x) => t(`lists.projectTypes.${x}`));

  const featuresLabels = FEATURES.map((x) => t(`lists.features.${x}`));
  const integrationsLabels = INTEGRATIONS.map((x) =>
    t(`lists.integrations.${x}`)
  );
  const complianceLabels = COMPLIANCE.map((x) => t(`lists.compliance.${x}`));

  const tlFlex = ["strict", "target", "open"].map((x) =>
    t(`lists.timelineFlex.${x}`)
  );
  const budgetOpts = ["<10k", "10–30k", "30–80k", "80–200k", ">200k"].map((x) =>
    t(`lists.budget.${x}`)
  );
  const procurementOpts = ["Startup", "B2B", "Enterprise", "B2G"].map((x) =>
    t(`lists.procurement.${x}`)
  );
  const authOpts = ["None", "Email/Password", "SSO/SAML", "OAuth"].map((x) =>
    t(`lists.auth.${x}`)
  );
  const residencyOpts = ["EU", "US", "MENA", "Any"].map((x) =>
    t(`lists.residency.${x}`)
  );

  return (
    <FormProvider {...methods}>
      {/* OUTER: animated gradient container with glow */}
      <div className="relative mx-auto w-full max-w-5xl overflow-hidden rounded-[28px] p-1 shadow-[0_22px_70px_-20px_rgba(6,110,176,0.45)]">
        <div className="absolute inset-0 -z-10 rounded-[28px] bg-[linear-gradient(135deg,#2c8cc7_0%,#1b7dbb_40%,#066eb0_100%)]" />
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 rounded-[28px] bg-[radial-gradient(60%_80%_at_50%_-20%,rgba(255,255,255,0.25),transparent_80%)]"
          animate={{ backgroundPosition: ["0% 0%", "100% 100%"] }}
          transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
          style={{ backgroundSize: "200% 200%" }}
        />

        {/* Inner glass surface */}
        <div className="relative z-10 rounded-[26px] bg-white/60 p-6 backdrop-blur-xl sm:p-8">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mx-auto w-full max-w-3xl space-y-8"
          >
            {/* Header / progress */}
            <div>
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
                    {t("title")}
                  </h1>
                  <p className="text-slate-700">
                    {stepMeta[steps[current].key].subtitle}
                  </p>
                </div>
                <div className="text-sm text-slate-700">
                  {t("progress", { cur: current + 1, total: steps.length })}
                </div>
              </div>
              <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-white/60">
                <motion.div
                  className="h-full bg-gradient-to-r from-[#2c8cc7] via-[#1b7dbb] to-[#066eb0]"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.4 }}
                />
              </div>
            </div>

            {/* Card */}
            <Card className="rounded-[18px] border border-white/40 bg-white/70 shadow-[0_15px_55px_-15px_rgba(6,110,176,0.25)] backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="text-slate-800">
                  {stepMeta[steps[current].key].title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <AnimatePresence mode="wait" initial={false}>
                  {/* STEP 1 */}
                  {current === 0 && (
                    <MotionStep stepKey="client">
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <InputBlock
                          id="fullName"
                          label={t("fields.fullName.label")}
                          placeholder={t("fields.fullName.ph")}
                        />
                        <InputBlock
                          id="company"
                          label={t("fields.company.label")}
                          placeholder={t("fields.company.ph")}
                        />
                        <InputBlock
                          id="email"
                          label={t("fields.email.label")}
                          placeholder={t("fields.email.ph")}
                          type="email"
                        />
                        <InputBlock
                          id="phone"
                          label={t("fields.phone.label")}
                          placeholder={t("fields.phone.ph")}
                        />
                        <div className="sm:col-span-2">
                          <Label>{t("fields.country.label")}</Label>
                          <Select
                            onValueChange={(v) =>
                              setValue("country", v, {
                                shouldDirty: true,
                                shouldTouch: true,
                              })
                            }
                          >
                            <SelectTrigger>
                              <SelectValue
                                placeholder={t("fields.country.ph")}
                              />
                            </SelectTrigger>
                            <SelectContent>
                              {countries.map((c) => (
                                <SelectItem key={c} value={c}>
                                  {c}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FieldError name="country" />
                        </div>
                      </div>
                    </MotionStep>
                  )}

                  {/* STEP 2 */}
                  {current === 1 && (
                    <MotionStep stepKey="overview">
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <SelectBlock
                          label={t("fields.projectType.label")}
                          field="projectType"
                          options={projectTypes}
                          placeholder={t("fields.projectType.ph")}
                        />
                        <InputBlock
                          id="expectedUsers"
                          label={t("fields.expectedUsers.label")}
                          placeholder={t("fields.expectedUsers.ph")}
                        />
                        <TextareaBlock
                          id="brief"
                          label={t("fields.brief.label")}
                          rows={4}
                          placeholder={t("fields.brief.ph")}
                        />
                        <TextareaBlock
                          id="goals"
                          label={t("fields.goals.label")}
                          rows={3}
                          placeholder={t("fields.goals.ph")}
                        />
                      </div>
                    </MotionStep>
                  )}

                  {/* STEP 3 */}
                  {current === 2 && (
                    <MotionStep stepKey="scope">
                      <div className="space-y-4">
                        <Label>{t("fields.features.label")}</Label>
                        <ChipSelector
                          options={featuresLabels}
                          value={watch("features")}
                          onChange={(v) =>
                            setValue("features", v, {
                              shouldDirty: true,
                              shouldTouch: true,
                            })
                          }
                        />
                        <FieldError name="features" />
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                          <InputBlock
                            id="deadline"
                            label={t("fields.deadline.label")}
                            type="date"
                          />
                          <SelectBlock
                            label={t("fields.timelineFlex.label")}
                            field="timelineFlex"
                            options={tlFlex}
                          />
                        </div>
                      </div>
                    </MotionStep>
                  )}

                  {/* STEP 4 */}
                  {current === 3 && (
                    <MotionStep stepKey="budget">
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <SelectBlock
                          label={t("fields.budget.label")}
                          field="budget"
                          options={budgetOpts}
                          placeholder={t("fields.budget.ph")}
                        />
                        <SelectBlock
                          label={t("fields.procurement.label")}
                          field="procurement"
                          options={procurementOpts}
                        />
                        <TextareaBlock
                          id="success"
                          label={t("fields.success.label")}
                          rows={3}
                          placeholder={t("fields.success.ph")}
                        />
                        <TextareaBlock
                          id="risks"
                          label={t("fields.risks.label")}
                          rows={3}
                          placeholder={t("fields.risks.ph")}
                        />
                      </div>
                    </MotionStep>
                  )}

                  {/* STEP 5 */}
                  {current === 4 && (
                    <MotionStep stepKey="security">
                      <div className="space-y-5">
                        <Label>{t("fields.integrations.label")}</Label>
                        <ChipSelector
                          options={integrationsLabels}
                          value={watch("integrations")}
                          onChange={(v) => setValue("integrations", v)}
                        />
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                          <SelectBlock
                            label={t("fields.auth.label")}
                            field="auth"
                            options={authOpts}
                          />
                          <SelectBlock
                            label={t("fields.residency.label")}
                            field="residency"
                            options={residencyOpts}
                          />
                        </div>
                        <Label>{t("fields.compliance.label")}</Label>
                        <ChipSelector
                          options={complianceLabels}
                          value={watch("compliance")}
                          onChange={(v) => setValue("compliance", v)}
                        />
                      </div>
                    </MotionStep>
                  )}

                  {/* STEP 6 */}
                  {current === 5 && (
                    <MotionStep stepKey="review">
                      <Summary data={getValues()} />
                      <div className="flex items-center gap-2 pt-3">
                        <Checkbox
                          id="consent"
                          checked={watch("consent")}
                          onCheckedChange={(v) =>
                            setValue("consent", Boolean(v), {
                              shouldDirty: true,
                              shouldTouch: true,
                            })
                          }
                        />
                        <Label htmlFor="consent" className="text-slate-700">
                          {t("consent")}
                        </Label>
                      </div>
                      <FieldError name="consent" />
                    </MotionStep>
                  )}
                </AnimatePresence>
              </CardContent>
            </Card>

            {/* Footer actions */}
            <div className="flex items-center justify-between">
              <Button
                type="button"
                variant="outline"
                onClick={goPrev}
                disabled={current === 0}
                className="rounded-full border-white/60 bg-white/40 text-slate-800 backdrop-blur hover:bg-white/60 disabled:opacity-60"
              >
                {t("buttons.back")}
              </Button>
              {current < steps.length - 1 ? (
                <Button
                  type="button"
                  onClick={goNext}
                  disabled={!canNext}
                  className="rounded-full bg-gradient-to-r from-[#2c8cc7] via-[#1b7dbb] to-[#066eb0] text-white shadow-md hover:opacity-90 disabled:opacity-60"
                >
                  {t("buttons.next")}
                </Button>
              ) : (
                <Button
                  type="submit"
                  className="rounded-full bg-gradient-to-r from-[#2c8cc7] via-[#1b7dbb] to-[#066eb0] text-white shadow-md hover:opacity-90"
                >
                  {t("buttons.submit")}
                </Button>
              )}
            </div>

            <div className="text-xs text-slate-600">{t("footerNote")}</div>
          </form>
        </div>

        {/* Peripheral glows */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[28px]"
        >
          <div className="absolute -left-16 -top-16 h-[24rem] w-[24rem] rounded-full bg-[radial-gradient(closest-side,rgba(255,255,255,0.35),transparent_70%)] blur-3xl" />
          <div className="absolute -right-24 -bottom-24 h-[30rem] w-[30rem] rounded-full bg-[radial-gradient(closest-side,rgba(6,110,176,0.30),transparent_70%)] blur-3xl" />
        </div>
      </div>
    </FormProvider>
  );
}

// ---------------- Summary ----------------
function Summary({ data }: { data: ProjectRequestForm }) {
  const t = useTranslations("form.summary");
  const rows = useMemo(
    () =>
      [
        { k: t("fullName"), v: data.fullName },
        { k: t("company"), v: data.company },
        { k: t("email"), v: data.email },
        { k: t("phone"), v: data.phone || "—" },
        { k: t("country"), v: data.country },
        { k: t("projectType"), v: data.projectType },
        { k: t("summary"), v: data.brief },
        { k: t("goals"), v: data.goals },
        {
          k: t("features"),
          v: (data.features ?? []).join(", ") || "—",
        },
        { k: t("expectedUsers"), v: data.expectedUsers || "—" },
        { k: t("deadline"), v: data.deadline || "—" },
        { k: t("timeline"), v: data.timelineFlex },
        { k: t("budget"), v: data.budget || "—" },
        { k: t("engagement"), v: data.procurement || "—" },
        { k: t("success"), v: data.success },
        { k: t("risks"), v: data.risks || "—" },
        {
          k: t("integrations"),
          v: (data.integrations ?? []).join(", ") || "—",
        },
        { k: t("auth"), v: data.auth },
        { k: t("residency"), v: data.residency },
        {
          k: t("compliance"),
          v: (data.compliance ?? []).join(", ") || "—",
        },
      ] as const,
    [data, t]
  );

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200">
      <table className="w-full text-sm">
        <tbody>
          {rows.map((r) => (
            <tr key={r.k} className="odd:bg-slate-50">
              <td className="w-48 px-4 py-2 font-medium text-slate-700">
                {r.k}
              </td>
              <td className="px-4 py-2 text-slate-700">{r.v}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
