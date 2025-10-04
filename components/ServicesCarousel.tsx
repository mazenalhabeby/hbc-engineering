"use client";

import React from "react";
import { Carousel, Card } from "@/components/ui/apple-cards-carousel";
import Image from "next/image";

/* ------------------------------------------------------------------ */
/* MAIN COMPONENT                                                      */
/* ------------------------------------------------------------------ */
export function ServicesCarousel() {
  const cards = data.map((card, index) => (
    <Card key={card.src} card={card} index={index} />
  ));

  return (
    <div className="w-full h-full py-20">
      <h2 className="max-w-7xl pl-4 mx-auto text-xl md:text-5xl font-bold text-neutral-800 dark:text-neutral-200 font-sans">
        Our Core Services
      </h2>
      <Carousel items={cards} />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* DYNAMIC CONTENT WRAPPER                                             */
/* ------------------------------------------------------------------ */
const ContentBlock = ({
  title,
  points,
  img,
}: {
  title: string;
  points: string[];
  img: string;
}) => {
  return (
    <div className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4">
      <h3 className="text-2xl md:text-3xl font-bold text-neutral-800 dark:text-neutral-100 mb-4">
        {title}
      </h3>
      <ul className="list-disc pl-6 text-neutral-700 dark:text-neutral-300 space-y-2 mb-6">
        {points.map((p, i) => (
          <li key={i}>{p}</li>
        ))}
      </ul>
      <Image
        src={img}
        alt={title}
        height={500}
        width={500}
        className="md:w-1/2 md:h-1/2 h-full w-full mx-auto object-contain"
      />
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* DATA FOR CARDS                                                      */
/* ------------------------------------------------------------------ */
const data = [
  {
    category: "Industrial",
    title: "Precision Maintenance",
    src: "/images/about/industrial.jpg",
    content: (
      <ContentBlock
        title="Industrial Maintenance"
        points={[
          "Hydraulics systems maintenance",
          "Electrical diagnostics & repair",
          "Mechanical servicing & upgrades",
          "Advanced welding solutions",
          "Industrial programming & automation",
        ]}
        img="/images/industrial-services.png"
      />
    ),
  },
  {
    category: "Intelligent Building",
    title: "Smart Homes",
    src: "/images/about/smarthome.jpg",
    content: (
      <ContentBlock
        title="Smart Homes"
        points={[
          "Home automation & IoT integration",
          "Energy efficiency monitoring",
          "Security & safety enhancements",
          "Voice & mobile-controlled systems",
        ]}
        img="/images/smarthomes.png"
      />
    ),
  },
  {
    category: "Intelligent Building",
    title: "Green Products",
    src: "/images/about/green.jpg",
    content: (
      <ContentBlock
        title="Shop Green Products"
        points={[
          "Eco-friendly Accessories",
          "Agro & sustainable farming tech",
          "Concrete & building materials",
          "Construction innovations",
          "Renewable energy solutions",
          "Soil & environmental protection",
        ]}
        img="/images/green-products.png"
      />
    ),
  },
  {
    category: "Fire Protection",
    title: "Advanced Safety",
    src: "/images/about/security.jpg",
    content: (
      <ContentBlock
        title="Fire Protection & Safety"
        points={[
          "Wood Preservation systems",
          "Film Protection coatings",
          "Facade fireproofing solutions",
          "CCTV & Surveillance cameras",
          "Server systems for monitoring",
          "Secure entry systems",
          "Comprehensive alarm systems",
        ]}
        img="/images/fire-protection.png"
      />
    ),
  },
  {
    category: "Other Services",
    title: "Special Projects",
    src: "/images/about/hero-collage.jpg",
    content: (
      <ContentBlock
        title="Specialized Industrial Services"
        points={[
          "Machines dismantled & relocated",
          "Rebuilding of industrial plants",
          "New construction planning",
          "Custom engineering solutions",
        ]}
        img="/images/industrial-projects.png"
      />
    ),
  },
];
