import { SiteFooter } from "@/components/portfolio/SiteFooter";
import { SiteHeader } from "@/components/portfolio/SiteHeader";
import { AboutSection } from "@/components/portfolio/AboutSection";
import { ContactSection } from "@/components/portfolio/ContactSection";
import { HeroSection } from "@/components/portfolio/HeroSection";
import { ProjectsSection } from "@/components/portfolio/ProjectsSection";
import { SkillsSection } from "@/components/portfolio/SkillsSection";
import { Chatbot } from "@/components/Chatbot";
import { sectionIds } from "@/constants/navigationItems";
import { useActiveSection } from "@/hooks/use-active-section";

export function Portfolio() {
  const activeSection = useActiveSection([...sectionIds]);

  return (
    <div className="min-h-screen overflow-x-hidden bg-background text-foreground">
      <SiteHeader activeSection={activeSection} />
      <main className="overflow-x-hidden">
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ContactSection />
      </main>
      <SiteFooter />
      <Chatbot />
    </div>
  );
}
