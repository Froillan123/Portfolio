import { ShieldCheck, CheckCircle2, Info } from "lucide-react";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/portfolio/SectionHeading";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { securityAssessment } from "@/constants/profile";

export function ExperienceSection() {
  return (
    <Section id="experience">
      <SectionHeading
        title="Experience"
        description="Authorized cloud security assessment and infrastructure hardening."
      />

      <div className="max-w-3xl mx-auto">
        <Card className="border-border/80 bg-card/60 backdrop-blur-md shadow-lg relative overflow-hidden group hover:border-primary/25 transition-all">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/10 to-transparent rounded-full -mr-12 -mt-12 pointer-events-none" />

          <CardHeader className="p-6 pb-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-3">
                <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 border border-primary/20 text-primary">
                  <ShieldCheck className="size-6" />
                </div>
                <div>
                  <CardTitle className="text-xl font-bold font-display text-foreground">
                    {securityAssessment.title}
                  </CardTitle>
                  <p className="text-xs font-semibold text-primary mt-0.5">
                    {securityAssessment.roleContext} <span className="text-muted-foreground/60 mx-1">·</span> <span className="text-muted-foreground font-normal">{securityAssessment.company} ({securityAssessment.period})</span>
                  </p>
                </div>
              </div>

              <Badge variant="secondary" className="w-fit rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20">
                OJT Internship
              </Badge>
            </div>
          </CardHeader>

          <CardContent className="p-6 pt-3">
            {/* OJT Context Note */}
            <div className="flex items-start gap-2 rounded-xl bg-primary/5 border border-primary/10 p-3 mb-4 text-xs text-muted-foreground leading-relaxed">
              <Info className="size-4 text-primary shrink-0 mt-0.5" />
              <span>{securityAssessment.ojtNote}</span>
            </div>

            {/* Bullets */}
            <ul className="flex flex-col gap-2.5 my-2">
              {securityAssessment.bullets.map((bullet, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  <CheckCircle2 className="size-4 text-primary shrink-0 mt-0.5" />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 mt-5 pt-4 border-t border-border/40">
              {securityAssessment.tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="outline"
                  className="rounded-full bg-primary/5 text-primary border-primary/15 text-xs font-medium px-3 py-0.5"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </Section>
  );
}
