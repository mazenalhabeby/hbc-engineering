import Hero from "@/app/section/Hero";
import AboutSection from "./section/About";
import ValuesSection from "./section/ValuesSection";
import SolutionsShowcaseAnimated from "./section/SolutionsByAudience";

export default function Home() {
  return (
    <div>
      <main>
        <Hero />
        <AboutSection />
        <ValuesSection />
        <SolutionsShowcaseAnimated />
      </main>
    </div>
  );
}
