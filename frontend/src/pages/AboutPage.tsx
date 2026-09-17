import { AboutSection } from "@/components/portfolio/AboutSection";
import { EngineeringFocusSection } from "@/components/portfolio/EngineeringFocusSection";

export default function AboutPage() {
  return (
    <div className="pt-16 sm:pt-20 pb-16 min-h-[calc(100vh-80px)] flex flex-col gap-12">
      <AboutSection />
      <EngineeringFocusSection />
    </div>
  );
}

