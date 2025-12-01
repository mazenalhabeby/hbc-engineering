"use client";

import * as React from "react";
import Link from "next/link";
import { useSearchParams, useParams } from "next/navigation";
import { CheckCircle, ArrowLeft, Mail, Calendar } from "lucide-react";

export default function ThankYouClient() {
  const searchParams = useSearchParams();
  const params = useParams<{ locale: string }>();

  const locale = Array.isArray(params.locale)
    ? params.locale[0]
    : params.locale;

  const name = searchParams.get("name") || "there";
  const role = searchParams.get("role") || "the position";

  // Generate application ID on client-side only to avoid hydration mismatch
  const [appId, setAppId] = React.useState<string>("");

  React.useEffect(() => {
    setAppId(
      `${role.replace(/\s+/g, "-").toLowerCase()}-${Date.now()
        .toString()
        .slice(-6)}`
    );
  }, [role]);

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white pt-12">
      {/* Background decoration */}
      <div
        className="absolute inset-0 pointer-events-none overflow-hidden"
        aria-hidden
      >
        <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full blur-3xl opacity-20 bg-emerald-300" />
        <div className="absolute top-1/2 -right-24 h-96 w-96 rounded-full blur-3xl opacity-20 bg-blue-300" />
      </div>

      <div className="relative mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Success Icon */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            <div className="absolute inset-0 bg-emerald-500 rounded-full blur-xl opacity-30 animate-pulse" />
            <CheckCircle
              className="relative h-20 w-20 text-emerald-600"
              strokeWidth={2}
            />
          </div>
        </div>

        {/* Main Content Card */}
        <div className="rounded-2xl border border-slate-200 bg-white p-8 sm:p-12 shadow-lg">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-3">
              Application Submitted Successfully!
            </h1>
            <p className="text-lg text-slate-600">
              Thank you,{" "}
              <span className="font-semibold text-slate-900">{name}</span>
            </p>
          </div>

          {/* Application Details */}
          <div className="bg-gradient-to-br from-emerald-50 to-blue-50 rounded-xl p-6 mb-8 border border-emerald-100">
            <p className="text-sm font-medium text-slate-600 mb-2">
              Position Applied For
            </p>
            <p className="text-xl font-semibold text-slate-900">{role}</p>
          </div>

          {/* Next Steps */}
          <div className="space-y-6 mb-8">
            <h2 className="text-xl font-semibold text-slate-900 flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-600 text-sm font-bold">
                ?
              </span>
              What Happens Next?
            </h2>

            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100">
                    <Mail className="h-5 w-5 text-emerald-600" />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 mb-1">
                    Email Confirmation
                  </h3>
                  <p className="text-sm text-slate-600">
                    You&apos;ll receive a confirmation email shortly with your
                    application details.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                    <Calendar className="h-5 w-5 text-blue-600" />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 mb-1">
                    Application Review
                  </h3>
                  <p className="text-sm text-slate-600">
                    Our HR team will review your application within 5-7 business
                    days.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-100">
                    <CheckCircle className="h-5 w-5 text-purple-600" />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 mb-1">
                    Interview Process
                  </h3>
                  <p className="text-sm text-slate-600">
                    If selected, we&apos;ll contact you to schedule an
                    interview.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Important Note */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-8">
            <p className="text-sm text-amber-900">
              <strong className="font-semibold">Important:</strong> Please check
              your spam/junk folder if you don&apos;t receive a confirmation
              email within 24 hours.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href={`/${locale}/careers`}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-6 py-3 text-base font-medium text-slate-900 shadow-sm hover:bg-slate-50 transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              Browse Other Positions
            </Link>
            <Link
              href={`/${locale}`}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-slate-700 transition-colors"
            >
              Back to Homepage
            </Link>
          </div>

          {/* Contact Info */}
          <div className="mt-8 pt-8 border-t border-slate-200 text-center">
            <p className="text-sm text-slate-600">
              Have questions about your application?{" "}
              <a
                href="mailto:careers@hbc-engineering.com"
                className="font-medium text-blue-600 hover:text-blue-700 underline underline-offset-2"
              >
                Contact our HR team
              </a>
            </p>
          </div>
        </div>

        {/* Footer Note */}
        {appId && (
          <p className="mt-8 text-center text-sm text-slate-500">
            Application ID: {appId}
          </p>
        )}
      </div>
    </main>
  );
}
