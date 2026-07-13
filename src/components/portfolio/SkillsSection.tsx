import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/portfolio/SectionHeading";
import { skillDepthTiers, getSkillIconSrc } from "@/constants/skills";
import { Card } from "@/components/ui/card";

export function SkillsSection() {
  return (
    <Section id="skills" className="overflow-x-hidden">
      <SectionHeading
        title="Skills & Tech Matrix"
        description="A structured view of the technology stack I use, categorized by active usage and development depth."
      />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {skillDepthTiers.map((tier) => (
          <Card
            key={tier.id}
            className="border-border/60 shadow-lg backdrop-blur-md bg-card/30 relative overflow-hidden transition-all duration-300 hover:border-primary/20 hover:shadow-xl group"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-primary/5 to-transparent rounded-full -mr-8 -mt-8 pointer-events-none" />
            
            <div className="p-6">
              <h3 className="text-sm font-bold font-display uppercase tracking-widest text-primary mb-1">
                {tier.title}
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed mb-6 font-medium">
                {tier.description}
              </p>

              <div className="grid grid-cols-2 gap-2 sm:gap-2.5">
                {tier.items.map((item) => {
                  const src = getSkillIconSrc(item);
                  return (
                    <div
                      key={item.name}
                      className="flex items-center gap-2 rounded-xl border border-border bg-background/50 p-2 sm:p-2.5 transition-all duration-300 hover:scale-[1.03] hover:border-primary/25 hover:bg-background/90 shadow-sm"
                    >
                      {src ? (
                        <img
                          src={src}
                          alt=""
                          width={18}
                          height={18}
                          className="h-4.5 w-auto max-w-[1.125rem] object-contain opacity-80"
                          loading="lazy"
                        />
                      ) : (
                        <div className="size-4.5 rounded bg-primary/10 flex items-center justify-center font-bold text-[9px] text-primary">
                          {item.name[0]}
                        </div>
                      )}
                      <span className="truncate text-xs font-semibold tracking-tight text-foreground/90 pl-0.5">
                        {item.name}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </Section>
  );
}
