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
import { useTranslations } from "next-intl";

const features = [
  {
    title: "value.fearure.experience.title",
    description: "value.fearure.experience.des",
    icon: Experience,
  },
  {
    title: "value.fearure.partnership.title",
    description: "value.fearure.partnership.des",
    icon: Partnership,
  },
  {
    title: "value.fearure.innovation.title",
    description: "value.fearure.innovation.des",
    icon: Innovation,
  },
  {
    title: "value.fearure.reliability.title",
    description: "value.fearure.reliability.des",
    icon: Reliability,
  },
  {
    title: "value.fearure.flexibility.title",
    description: "value.fearure.flexibility.des",
    icon: Flexibility,
  },
  {
    title: "value.fearure.commitment.title",
    description: "value.fearure.commitment.des",
    icon: Commitment,
  },
];

export default function ValuesSection() {
  const t = useTranslations("home");

  return (
    <section className="bg-background py-16 pb-16 ">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            {t("value.title")}
          </h2>
          <p className="mt-4 text-lg text-gray-600">{t("value.des")}</p>
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
                {t(feature.title)}
              </h3>
              <p className="text-base text-gray-600">
                {t(feature.description)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
