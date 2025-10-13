import Hero from "./section/Hero";
import AboutSection from "./section/About";
import ValuesSection from "./section/ValuesSection";
import SolutionsShowcaseAnimated from "./section/SolutionsByAudience";
import ServicesSection from "./section/CoreServices";

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
