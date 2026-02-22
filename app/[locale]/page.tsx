import dynamic from "next/dynamic";
import Hero from "./section/Hero";
import ServicesSection from "./section/CoreServices";

const AboutSection = dynamic(() => import("./section/About"), {
  loading: () => <div className="min-h-[600px]" />,
});
const ValuesSection = dynamic(() => import("./section/ValuesSection"), {
  loading: () => <div className="min-h-[500px]" />,
});
const SolutionsShowcaseAnimated = dynamic(
  () => import("./section/SolutionsByAudience"),
  {
    loading: () => <div className="min-h-[800px]" />,
  }
);

export default function Home() {
  return (
    <main className="font-manrope">
      <Hero />
      <ServicesSection />
      <AboutSection />
      <ValuesSection />
      <SolutionsShowcaseAnimated />
    </main>
  );
}
