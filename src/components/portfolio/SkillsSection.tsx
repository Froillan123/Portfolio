import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/portfolio/SectionHeading";
import { TechMarquee } from "@/components/portfolio/TechMarquee";
import type { SkillDepthId } from "@/constants/skills";
import { skillDepthTiers } from "@/constants/skills";

const tierLabel: Record<SkillDepthId, string> = {
  strong: "Strong",
  familiar: "Familiar",
  exposed: "Exposed",
};

export function SkillsSection() {
  return (
    <Section id="skills" className="overflow-x-hidden">
      <SectionHeading
        title="Skills"
        description="Depth from shipping FaceofMind — grouped by how deep I go, not every tool I've opened once."
      />

      <div className="flex flex-col gap-8 sm:gap-10 md:gap-12">
        {skillDepthTiers.map((tier, index) => (
          <div key={tier.id} className="flex flex-col gap-3 sm:gap-4">
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 px-1">
              <h3 className="text-xs font-semibold uppercase tracking-widest text-foreground/80">
                {tierLabel[tier.id]}
              </h3>
              <p className="text-xs text-muted-foreground sm:text-sm">{tier.description}</p>
            </div>
            <TechMarquee
              items={tier.items}
              reverse={index % 2 === 1}
              duration={32 + index * 6}
            />
          </div>
        ))}
      </div>
    </Section>
  );
}
