// app/privacy-policy/page.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy & Policy | HBC Engineering",
  description:
    "Official Privacy & Policy of HBC Engineering – Learn how we collect, use, and protect your personal information in compliance with GDPR and CCPA.",
};

const LAST_UPDATED = "November 6, 2025";

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-gray-50 px-6 py-20 mt-20">
      {/* HEADER */}
      <section className="mx-auto max-w-5xl text-center">
        <h1 className="text-4xl font-semibold tracking-tight text-gray-900 md:text-5xl">
          Privacy &amp; Policy
        </h1>
        <p className="mt-4 text-gray-500">Last updated: {LAST_UPDATED}</p>
      </section>

      {/* BODY */}
      <section className="mx-auto mt-14 max-w-4xl text-gray-800">
        <article className="prose prose-lg prose-slate mx-auto max-w-none">
          <p className="lead text-lg text-gray-600">
            Welcome to <strong>HBC Engineering</strong> (“we”, “our”, “us”). We
            are committed to safeguarding your privacy. This Privacy & Policy
            explains how we collect, use, and protect your information when you
            visit our website or interact with us.
          </p>

          <h2>1. Who We Are</h2>
          <p>
            HBC Engineering operates internationally in industrial maintenance,
            IT solutions, and fire-protection services.
          </p>
          <div className="rounded-lg bg-gray-100 p-4 text-sm leading-relaxed text-gray-700 shadow-sm">
            <p className="font-semibold">HBC Engineering</p>
            <p>260 Peachtree Street, Atlanta, GA 30303 USA</p>
            <p>
              <span className="font-semibold">Email:</span>{" "}
              <a
                href="mailto:office@hbc-engineering.com"
                className="text-blue-600 hover:underline"
              >
                office@hbc-engineering.com
              </a>
            </p>
            <p>
              <span className="font-semibold">Phone:</span>{" "}
              <a
                href="tel:+14047033649"
                className="text-blue-600 hover:underline"
              >
                +1 (404) 703-3649
              </a>
            </p>
          </div>

          <h2>2. Information We Collect</h2>
          <ul>
            <li>
              <strong>Personal details</strong> – Name, email, phone, and any
              information you provide via contact forms or career applications.
            </li>
            <li>
              <strong>Technical data</strong> – IP address, browser type, device
              info, referral URLs, and usage analytics.
            </li>
            <li>
              <strong>Project data</strong> – Only as needed to deliver our
              engineering, IT, or fire-protection services.
            </li>
          </ul>

          <h2>3. How We Use Your Information</h2>
          <ul>
            <li>To respond to inquiries and deliver requested services.</li>
            <li>To operate, maintain, and improve our website and systems.</li>
            <li>To process applications and manage projects.</li>
            <li>To comply with legal obligations and industry standards.</li>
          </ul>

          <h2>4. Legal Basis for Processing (EU/EEA)</h2>
          <p>
            We process your data only when one of the following applies: your
            <strong> consent</strong>, performance of a contract, our
            <strong> legitimate interests</strong>, or legal obligation.
          </p>

          <h2>5. Cookies & Tracking Technologies</h2>
          <p>
            We use essential and analytics cookies to ensure functionality and
            improve user experience. You can manage or disable cookies through
            your browser settings. For details, please review our Cookie Policy
            (if available).
          </p>

          <h2>6. Data Sharing & Transfers</h2>
          <p>
            We do <strong>not sell</strong> personal data. We may share it with
            trusted partners or service providers (for hosting, analytics, or
            customer support) under strict data-processing agreements. When
            transferring data internationally, we use Standard Contractual
            Clauses or other lawful safeguards.
          </p>

          <h2>7. Data Retention</h2>
          <p>
            We retain personal data only as long as necessary to fulfil the
            purposes described or as required by law. After that, we securely
            delete or anonymize the data.
          </p>

          <h2>8. Security Measures</h2>
          <p>
            We implement industry-standard security controls (encryption, access
            management, network firewalls, and regular audits) to protect data
            against loss or unauthorized access. While no system is fully
            secure, we continuously improve our safeguards.
          </p>

          <h2>9. Your Rights</h2>
          <ul>
            <li>Access and receive a copy of your personal data.</li>
            <li>Request correction or deletion of data.</li>
            <li>Withdraw consent or object to processing.</li>
            <li>Data portability (where applicable).</li>
            <li>
              File a complaint with your local data-protection authority if you
              believe your rights are violated.
            </li>
          </ul>

          <h2>10. Children’s Privacy</h2>
          <p>
            Our website and services are not intended for children under 16. We
            do not knowingly collect data from them.
          </p>

          <h2>11. Third-Party Links</h2>
          <p>
            Our site may contain links to external sites. We are not responsible
            for their privacy practices and encourage you to read their
            policies.
          </p>

          <h2>12. Policy Updates</h2>
          <p>
            We may update this Privacy Policy periodically. Revised versions
            will include a new “Last updated” date and be effective upon
            posting.
          </p>

          <h2>13. Contact Us</h2>
          <p>
            If you have questions about this policy or wish to exercise your
            rights, please contact us at:
          </p>
          <div className="rounded-lg border bg-white p-5 text-sm shadow-sm">
            <p className="font-semibold text-gray-900">
              HBC Engineering Data Privacy Team
            </p>
            <p>260 Peachtree Street, Atlanta, GA 30303 USA</p>
            <p>
              Email:{" "}
              <a
                href="mailto:office@hbc-engineering.com"
                className="text-blue-600 hover:underline"
              >
                office@hbc-engineering.com
              </a>
            </p>
            <p>
              Phone:{" "}
              <a
                href="tel:+14047033649"
                className="text-blue-600 hover:underline"
              >
                +1 (404) 703-3649
              </a>
            </p>
          </div>
        </article>
      </section>
    </main>
  );
}
