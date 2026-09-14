import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/portfolio/SectionHeading";
import { Card, CardContent } from "@/components/ui/card";
import { skillsData } from "@/constants/skills";

export function SkillsSection() {
  return (
    <Section id="skills" muted>
      <SectionHeading
        title="Technical Skills"
        description="Core technology stack and engineering domains."
      />

      <div className="max-w-3xl mx-auto">
        <Card className="border-border/80 bg-card/60 backdrop-blur-md shadow-md">
          <CardContent className="p-6 sm:p-8">
            <div className="flex flex-col divide-y divide-border/60">
              {skillsData.map((item) => (
                <div
                  key={item.category}
                  className="grid grid-cols-1 sm:grid-cols-[140px_1fr] gap-1 sm:gap-4 py-3.5 first:pt-0 last:pb-0"
                >
                  <span className="text-xs sm:text-sm font-bold font-display text-primary uppercase tracking-wider">
                    {item.category}:
                  </span>
                  <span className="text-xs sm:text-sm text-foreground/90 font-mono leading-relaxed">
                    {item.skills}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </Section>
  );
}
