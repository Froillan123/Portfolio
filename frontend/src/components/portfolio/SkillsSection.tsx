import { Cloud, Server, ShieldCheck, Database, Code2, Terminal, Cpu } from "lucide-react";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/portfolio/SectionHeading";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { skillsData } from "@/constants/skills";

const iconMap = {
  cloud: Cloud,
  server: Server,
  shield: ShieldCheck,
  database: Database,
  code: Code2,
};

export function SkillsSection() {
  return (
    <Section id="skills" muted>
      <SectionHeading
        title="Technical Capabilities Matrix"
        description="Engineering domains, distributed systems primitives, and security tools."
      />

      <div className="max-w-6xl mx-auto w-full flex flex-col gap-3 sm:gap-4">
        
        {/* Terminal Header Bar */}
        <div className="flex items-center justify-between px-3.5 sm:px-4 py-2 rounded-xl bg-card/70 border border-border/70 backdrop-blur-md">
          <div className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[11px] font-mono text-foreground font-semibold flex items-center gap-1.5">
              <Terminal className="size-3 text-primary" />
              platform-stack --inspect --all-tiers
            </span>
          </div>
          <span className="text-[10px] font-mono text-muted-foreground hidden sm:inline">
            5 Core Domains · Google Cloud Native
          </span>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {skillsData.map((item, idx) => {
            const Icon = iconMap[item.iconName] || Code2;
            const isWide = idx === 0 || idx === 1;

            return (
              <Card
                key={item.category}
                className="flex flex-col justify-between border-border/70 bg-card/60 backdrop-blur-md shadow-sm hover:shadow-md hover:border-primary/40 transition-all duration-200 rounded-xl sm:rounded-2xl overflow-hidden p-3.5 sm:p-4"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 pb-2.5 border-b border-border/40">
                    <div className="flex items-center gap-2 min-w-0">
                      <div className="flex size-7 items-center justify-center rounded-lg bg-primary/10 border border-primary/20 text-primary">
                        <Icon className="size-3.5" />
                      </div>
                      <h4 className="text-xs sm:text-sm font-bold font-display text-foreground truncate">
                        {item.category}
                      </h4>
                    </div>
                    <Badge
                      variant="outline"
                      className="rounded-full bg-muted/40 text-[9px] font-mono text-muted-foreground border-border/60 px-2 py-0"
                    >
                      {item.items.length} primitives
                    </Badge>
                  </div>

                  <p className="text-[11px] text-muted-foreground mt-2 leading-relaxed">
                    {item.description}
                  </p>

                  <div className="flex flex-wrap gap-1 sm:gap-1.5 mt-2.5">
                    {item.items.map((skill) => (
                      <span
                        key={skill}
                        className="inline-flex items-center gap-1 rounded-md border border-border/60 bg-background/80 px-2 py-0.5 text-[10px] sm:text-[11px] font-mono font-medium text-foreground/90 hover:border-primary/40 hover:bg-primary/5 transition-all"
                      >
                        <span className="size-1 rounded-full bg-primary/70 shrink-0" />
                        <span className="truncate">{skill}</span>
                      </span>
                    ))}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
