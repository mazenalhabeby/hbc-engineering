import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Legal Notice / Impressum | HBC Engineering",
  description:
    "Legal notice and Impressum of HBC GmbH – Company registration, managing director, and contact information as required by Austrian law.",
};

export default function LegalPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-gray-50 px-6 py-20 mt-20">
      {/* HEADER */}
      <section className="mx-auto max-w-5xl text-center">
        <h1 className="text-4xl font-semibold tracking-tight text-gray-900 md:text-5xl">
          Legal Notice / Impressum
        </h1>
        <p className="mt-4 text-gray-500">
          Information pursuant to § 5 ECG and § 25 MedienG (Austrian law)
        </p>
      </section>

      {/* BODY */}
      <section className="mx-auto mt-14 max-w-4xl text-gray-800">
        <article className="prose prose-lg prose-slate mx-auto max-w-none">
          {/* Company Info */}
          <h2>Company Information</h2>
          <div className="rounded-lg bg-gray-100 p-6 text-sm leading-relaxed text-gray-700 shadow-sm not-prose">
            <p className="text-lg font-semibold text-gray-900">HBC GmbH</p>
            <p className="mt-2">Kapellenstraße 30</p>
            <p>4664 Laakirchen</p>
            <p>Austria</p>

            <div className="mt-4 grid gap-2">
              <p>
                <span className="font-semibold">Company Register Number (FN):</span>{" "}
                FN 464430 k
              </p>
              <p>
                <span className="font-semibold">Commercial Court:</span>{" "}
                Landesgericht Wels
              </p>
              <p>
                <span className="font-semibold">UID Number:</span>{" "}
                ATU71866723
              </p>
              <p>
                <span className="font-semibold">Legal Form:</span>{" "}
                Gesellschaft mit beschränkter Haftung (GmbH)
              </p>
              <p>
                <span className="font-semibold">Date of Incorporation:</span>{" "}
                22.12.2016
              </p>
              <p>
                <span className="font-semibold">Business Activity:</span>{" "}
                Handel mit Bau- und Dämmstoffen (Trade in building and insulation materials)
              </p>
            </div>
          </div>

          {/* Managing Director */}
          <h2>Managing Director</h2>
          <p>
            <strong>Herr Ing. Andreas Holub</strong>
            <br />
            Sole authorized representative (alleinvertretungsberechtigt)
          </p>

          {/* Shareholder */}
          <h2>Shareholder</h2>
          <p>
            <strong>Herr Ing. Andreas Holub</strong> – 100%
          </p>

          {/* Contact */}
          <h2>Contact</h2>
          <div className="rounded-lg border bg-white p-5 text-sm shadow-sm not-prose">
            <p className="font-semibold text-gray-900">HBC GmbH</p>
            <p className="mt-1">Kapellenstraße 30, 4664 Laakirchen, Austria</p>
            <p className="mt-2">
              <span className="font-semibold">Email:</span>{" "}
              <a
                href="mailto:office@hbc-engineering.com"
                className="text-blue-600 hover:underline"
              >
                office@hbc-engineering.com
              </a>
            </p>
            <p className="mt-1">
              <span className="font-semibold">Website:</span>{" "}
              <a
                href="https://www.hbc-engineering.com"
                className="text-blue-600 hover:underline"
              >
                www.hbc-engineering.com
              </a>
            </p>
          </div>

          {/* Disclaimer */}
          <h2>Disclaimer</h2>

          <h3>Liability for Content</h3>
          <p>
            The content of this website has been prepared with the greatest possible care.
            However, we cannot guarantee the accuracy, completeness, or timeliness of the
            content. As a service provider, we are responsible for our own content on these
            pages in accordance with general legislation. However, we are not obligated to
            monitor transmitted or stored third-party information or to investigate
            circumstances that indicate illegal activity.
          </p>

          <h3>Liability for Links</h3>
          <p>
            Our website contains links to external third-party websites over whose content
            we have no influence. Therefore, we cannot accept any liability for this
            third-party content. The respective provider or operator of the linked pages is
            always responsible for the content of the linked pages. The linked pages were
            checked for possible legal violations at the time of linking. Illegal content
            was not recognizable at the time of linking.
          </p>

          <h3>Copyright</h3>
          <p>
            The content and works created by the site operators on these pages are subject
            to Austrian copyright law. The reproduction, editing, distribution, and any
            kind of use beyond the limits of copyright law require the written consent of
            the respective author or creator. Downloads and copies of this site are only
            permitted for private, non-commercial use.
          </p>

          {/* EU Dispute Resolution */}
          <h2>EU Dispute Resolution</h2>
          <p>
            The European Commission provides a platform for online dispute resolution
            (ODR):{" "}
            <a
              href="https://ec.europa.eu/consumers/odr"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              https://ec.europa.eu/consumers/odr
            </a>
            . We are neither obligated nor willing to participate in dispute resolution
            proceedings before a consumer arbitration board.
          </p>
        </article>
      </section>
    </main>
  );
}
