import {
  CheckCircle2,
  Cpu,
  Fingerprint,
  Gauge,
  GitMerge,
  ShieldAlert,
  Code,
} from "lucide-react";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/portfolio/SectionHeading";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { engineeringPrinciples } from "@/constants/profile";

const principleIcons = [GitMerge, Fingerprint, Cpu, Gauge, ShieldAlert];

export function EngineeringFocusSection() {
  return (
    <Section id="philosophy">
      <SectionHeading
        title="Engineering Focus & Architecture Patterns"
        description="Core principles guiding platform reliability, zero-toil security, and developer velocity."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 max-w-6xl mx-auto w-full">
        {engineeringPrinciples.map((item, idx) => {
          const Icon = principleIcons[idx] || Cpu;

          return (
            <Card
              key={item.title}
              className="flex flex-col justify-between border-border/70 bg-card/60 backdrop-blur-md shadow-sm hover:shadow-md hover:border-primary/40 transition-all duration-200 rounded-xl sm:rounded-2xl overflow-hidden p-3.5 sm:p-4.5"
            >
              <div className="flex flex-col gap-2">
                {/* Header: Icon, Number & Badge */}
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <div className="flex size-7 sm:size-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 border border-primary/20 text-primary">
                      <Icon className="size-3.5 sm:size-4" />
                    </div>
                    <span className="text-[10px] font-mono text-muted-foreground font-bold">
                      0{idx + 1}.
                    </span>
                  </div>
                  <Badge
                    variant="outline"
                    className="rounded-full bg-primary/5 text-primary border-primary/20 text-[9px] sm:text-[10px] font-mono uppercase px-2 py-0"
                  >
                    {item.badge}
                  </Badge>
                </div>

                {/* Title & Description */}
                <div>
                  <h3 className="text-xs sm:text-sm font-bold font-display text-foreground leading-snug">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-[11px] sm:text-xs text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Applied In: Code Pattern Callout */}
                <div className="mt-1 rounded-lg bg-muted/40 border border-border/60 p-2 sm:p-2.5 text-[10px] sm:text-[11px] text-foreground font-medium leading-relaxed">
                  <span className="font-semibold text-primary font-mono text-[9px] sm:text-[10px] uppercase tracking-wider block mb-0.5 flex items-center gap-1">
                    <Code className="size-2.5" />
                    Applied Pattern:
                  </span>
                  <span className="text-muted-foreground text-[10px] sm:text-[11px]">
                    {item.appliedIn}
                  </span>
                </div>
              </div>

              {/* Quote footer */}
              <div className="mt-2.5 pt-2 border-t border-border/40 flex items-start gap-1.5">
                <CheckCircle2 className="size-3 text-primary shrink-0 mt-0.5" />
                <p className="text-[10px] sm:text-[11px] font-mono text-muted-foreground italic leading-tight">
                  "{item.quote}"
                </p>
              </div>
            </Card>
          );
        })}
      </div>
    </Section>
  );
}
