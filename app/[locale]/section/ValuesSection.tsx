"use client";

import Image from "next/image";

import {
  Commitment,
  Flexibility,
  Innovation,
  Reliability,
  Experience,
  Partnership,
} from "@/assets";

const features = [
  {
    title: "Proven Experience",
    description:
      "Over a decade of hands-on expertise in industrial maintenance, relocation, and smart technology integration — delivering precision and reliability across Europe and the USA.",
    icon: Experience,
  },
  {
    title: "Trusted Partnership",
    description:
      "Recognized as a dependable partner for both global corporations and individuals, built on long-term relationships, transparency, and delivering on promises.",
    icon: Partnership,
  },
  {
    title: "Innovation-Driven",
    description:
      "Combining engineering excellence with the latest smart solutions and green technologies, ensuring clients stay ahead in efficiency and sustainability.",
    icon: Innovation,
  },
  {
    title: "End-to-End Reliability",
    description:
      "From diagnostics and preventive maintenance to complete relocations and smart home solutions — we provide 24/7 support that guarantees continuity and peace of mind.",
    icon: Reliability,
  },
  {
    title: "Tailored Flexibility",
    description:
      "Customized strategies for every client — whether large-scale industrial operations or individual smart homes — ensuring unique needs are met with precision.",
    icon: Flexibility,
  },
  {
    title: "Unwavering Commitment",
    description:
      "Dedicated to every project with integrity, accountability, and excellence — we stand by our clients from start to finish, no matter the challenge.",
    icon: Commitment,
  },
];

export default function ValuesSection() {
  return (
    <section className="bg-background py-16 pb-16 ">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Why Choose HBC Group
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Our foundation is built on expertise, trust, and innovation — here
            are the values that define us.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-x-12 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="flex flex-col items-start gap-4"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-[#066eb0]/10 shadow-lg">
                <Image
                  src={feature.icon}
                  alt={feature.title}
                  className=" h-12 w-12 text-primary"
                  width={48}
                  height={48}
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">
                {feature.title}
              </h3>
              <p className="text-base text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
