"use client";

import Image from "next/image";
import { qutation } from "@/assets";

export default function AboutSection() {
  return (
    <section aria-labelledby="about-heading" className="relative bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 lg:py-14">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
          <div className="flex flex-col justify-center gap-6">
            <h2
              id="about-heading"
              className="text-5xl font-semibold tracking-tight text-slate-900"
            >
              Engineering Strength.
              <br />
              Delivering Confidence.
            </h2>

            <p className=" text-slate-600 text-lg leading-loose tracking-wider">
              HBC Group provides expert industrial maintenance, machinery
              service, and plant relocation across the US and Europe. We combine
              European engineering excellence with local support to deliver 24/7
              solutions that keep operations running reliably. Our services span
              preventive maintenance, diagnostics, overhauls, fire protection,
              and smart building solutions—helping clients maximize uptime,
              extend asset life, and operate with confidence.
            </p>
          </div>
          <div className="relative rounded-bl-[72px] rounded-tr-[72px] rounded-tl-lg  rounded-br-lg text-white shadow-xl min-h-[624px] flex flex-col justify-between px-8 py-10 overflow-hidden">
            <Image
              src={"/images/factoryBg.jpeg"}
              alt="Background"
              fill
              className="absolute inset-0 object-cover"
            />
            <div className="absolute inset-0 bg-secondary opacity-80" />

            <div className="relative">
              <div className="flex flex-col items-start gap-3">
                <Image
                  src={qutation}
                  alt="qutation icon"
                  className=" w-20 h-20"
                  width={32}
                  height={32}
                />
                <p className="text-2xl font-medium">
                  More than service — we’re your partner in protecting
                  investments, ensuring safety, and powering progress.
                </p>
              </div>
            </div>

            <div className="relative">
              {/* Metrics row */}
              <div className="mt-8 grid grid-cols-2 gap-6 sm:gap-8">
                <div>
                  <div className="text-4xl font-extrabold tracking-tight">
                    2,000<span className="align-super text-2xl">+</span>
                  </div>
                  <div className="mt-1 text-sm/5 text-white/80">
                    Satisfied Clients
                  </div>
                </div>
                <div>
                  <div className="text-4xl font-extrabold tracking-tight">
                    750<span className="align-super text-2xl">+</span>
                  </div>
                  <div className="mt-1 text-sm/5 text-white/80">
                    Projects Completed
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
