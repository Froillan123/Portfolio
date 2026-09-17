import { useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  ExternalLink,
  Github,
  Network,
  Shield,
  Workflow,
  Zap,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MermaidViewer } from "@/components/portfolio/MermaidViewer";
import type { Project } from "@/constants/projects";

type ArchitectureModalProps = {
  project: Project | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function ArchitectureModal({ project, open, onOpenChange }: ArchitectureModalProps) {
  const [activeStepIndex, setActiveStepIndex] = useState<number | null>(null);

  if (!project) return null;

  const Icon = project.icon;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[calc(100vw-0.75rem)] sm:w-[94vw] max-w-5xl max-h-[90vh] sm:max-h-[92vh] overflow-y-auto p-3 sm:p-6 md:p-7 rounded-xl sm:rounded-3xl border border-border/80 bg-background/95 backdrop-blur-xl shadow-2xl">
        {/* Modal Header */}
        <DialogHeader className="space-y-1.5 pr-0 sm:pr-8 w-full text-left">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2.5 w-full">
            <div className="flex items-start gap-2.5 sm:gap-3 min-w-0">
              <div className="flex size-9 sm:size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 border border-primary/20 text-primary shadow-xs mt-0.5">
                <Icon className="size-4.5 sm:size-5.5" />
              </div>
              <div className="min-w-0 flex-1">
                <DialogTitle className="text-sm sm:text-lg md:text-xl font-bold font-display text-foreground leading-snug break-words">
                  {project.title}
                </DialogTitle>
                <DialogDescription className="text-xs sm:text-sm text-muted-foreground mt-0.5 break-words">
                  {project.tier} · Architecture Deep Dive
                </DialogDescription>
              </div>
            </div>

            <Badge
              variant="outline"
              className="w-fit rounded-full bg-primary/5 text-primary border-primary/20 text-[10px] sm:text-xs font-mono uppercase px-2 py-0.5 shrink-0 self-start"
            >
              {project.tier}
            </Badge>
          </div>
        </DialogHeader>

        <div className="flex flex-col gap-3.5 sm:gap-5 mt-1 w-full">
          {/* Architecture Summary Banner */}
          <div className="rounded-xl sm:rounded-2xl border border-primary/20 bg-primary/5 p-3 sm:p-4.5 text-xs sm:text-sm text-foreground leading-relaxed w-full">
            <div className="flex items-center gap-1.5 font-bold font-display text-primary mb-1 text-xs sm:text-sm uppercase tracking-wider">
              <Workflow className="size-3.5 sm:size-4" />
              <span>Role in FaceOfMind Ecosystem</span>
            </div>
            <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed break-words">
              {project.architectureSummary}
            </p>
          </div>

          {/* Tabbed View: Mermaid Architecture Diagram & Interactive Step Flow */}
          <Tabs defaultValue="mermaid" className="w-full">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2 w-full">
              <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-muted-foreground font-display flex items-center gap-1.5">
                <Network className="size-3.5 text-primary" />
                <span>Architecture Topology</span>
              </h4>

              <TabsList className="grid grid-cols-2 h-8 bg-muted/60 p-0.5 rounded-lg border border-border/60 w-full sm:w-auto">
                <TabsTrigger value="mermaid" className="text-[10px] sm:text-xs font-mono px-1.5 sm:px-3 py-1">
                  Mermaid Diagram
                </TabsTrigger>
                <TabsTrigger value="interactive" className="text-[10px] sm:text-xs font-mono px-1.5 sm:px-3 py-1">
                  Step Pipeline
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="mermaid" className="mt-0 focus-visible:outline-none w-full">
              <MermaidViewer
                chart={project.mermaidChart}
                title={`${project.title} - Topology`}
              />
            </TabsContent>

            <TabsContent value="interactive" className="mt-0 focus-visible:outline-none w-full">
              <div className="relative rounded-xl border border-border/80 bg-card/60 p-3 sm:p-5 backdrop-blur-sm overflow-hidden w-full">
                <div className="flex flex-col gap-2.5 w-full">
                  <span className="text-[11px] sm:text-xs text-muted-foreground italic">
                    Click any stage to inspect protocol:
                  </span>

                  {/* Horizontal / Grid Flow */}
                  <div className="flex flex-wrap items-center gap-2 w-full">
                    {project.architectureSteps.map((step, idx) => {
                      const isSelected = activeStepIndex === idx;
                      const isLast = idx === project.architectureSteps.length - 1;

                      return (
                        <div key={idx} className="flex items-center gap-1.5 w-full sm:w-auto">
                          <button
                            type="button"
                            onClick={() => setActiveStepIndex(isSelected ? null : idx)}
                            className={`group relative flex flex-col items-start rounded-lg border p-2 sm:px-3 sm:py-2 text-left transition-all duration-200 w-full sm:w-auto ${
                              isSelected
                                ? "border-primary bg-primary/10 shadow-md ring-1 ring-primary"
                                : "border-border/70 bg-background/80 hover:border-primary/40 hover:bg-muted/40"
                            }`}
                          >
                            <div className="flex items-center gap-1.5 w-full">
                              <span className="flex size-4 items-center justify-center rounded-full bg-primary/20 text-[10px] font-bold text-primary font-mono shrink-0">
                                {idx + 1}
                              </span>
                              <span className="text-xs sm:text-sm font-bold font-display text-foreground break-words">
                                {step.label}
                              </span>
                            </div>
                            {step.sublabel && (
                              <span className="text-[11px] sm:text-xs text-muted-foreground mt-0.5 pl-5.5 break-words">
                                {step.sublabel}
                              </span>
                            )}
                            {step.protocol && (
                              <span className="mt-1 rounded bg-muted px-2 py-0.5 text-[10px] sm:text-xs font-mono font-medium text-primary border border-border/60">
                                {step.protocol}
                              </span>
                            )}
                          </button>

                          {!isLast && (
                            <ArrowRight className="size-3 text-muted-foreground/60 shrink-0 hidden sm:block" />
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Active Step Deep Dive Card */}
                  {activeStepIndex !== null && (
                    <div className="mt-2 rounded-lg border border-primary/20 bg-background/90 p-3 text-xs sm:text-sm text-muted-foreground animate-in fade-in-50 duration-200">
                      <span className="font-bold text-foreground text-xs sm:text-sm break-words block">
                        Stage {activeStepIndex + 1}: {project.architectureSteps[activeStepIndex].label}
                      </span>
                      <p className="mt-1 leading-relaxed text-xs sm:text-sm break-words">
                        Protocol / Mechanism:{" "}
                        <span className="font-mono text-primary font-semibold">
                          {project.architectureSteps[activeStepIndex].protocol}
                        </span>
                        {" - "}
                        {project.architectureSteps[activeStepIndex].sublabel}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>
          </Tabs>

          {/* Problem -> Solution -> Measurable Impact Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 sm:gap-3 w-full">
            <div className="rounded-xl border border-border/80 bg-card/40 p-3 sm:p-4">
              <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-rose-500 font-display flex items-center gap-1.5">
                <span className="size-2 rounded-full bg-rose-500" />
                Problem
              </span>
              <p className="mt-1.5 text-xs sm:text-sm text-muted-foreground leading-relaxed break-words">
                {project.problemSolved.problem}
              </p>
            </div>

            <div className="rounded-xl border border-border/80 bg-card/40 p-3 sm:p-4">
              <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-amber-500 font-display flex items-center gap-1.5">
                <span className="size-2 rounded-full bg-amber-500" />
                Engineering Solution
              </span>
              <p className="mt-1.5 text-xs sm:text-sm text-muted-foreground leading-relaxed break-words">
                {project.problemSolved.solution}
              </p>
            </div>

            <div className="rounded-xl border border-primary/20 bg-primary/5 p-3 sm:p-4">
              <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-primary font-display flex items-center gap-1.5">
                <Zap className="size-3.5 text-primary" />
                Quantified Impact
              </span>
              <p className="mt-1.5 text-xs sm:text-sm text-foreground font-medium leading-relaxed break-words">
                {project.problemSolved.impact}
              </p>
            </div>
          </div>

          {/* Security & Reliability Boundaries */}
          <div className="rounded-xl border border-border/80 bg-card/30 p-3 sm:p-4 w-full">
            <div className="flex items-center gap-1.5 font-bold font-display text-foreground mb-2 text-xs sm:text-sm uppercase tracking-wider">
              <Shield className="size-4 text-primary" />
              <span>Security & Reliability Boundaries</span>
            </div>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {project.securityGuarantees.map((guarantee, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-1.5 text-xs sm:text-sm text-muted-foreground leading-relaxed"
                >
                  <CheckCircle2 className="size-3.5 text-primary shrink-0 mt-0.5" />
                  <span className="break-words">{guarantee}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Technology Stack Tags */}
          <div className="w-full">
            <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground font-display">
              Technologies & Tools
            </span>
            <div className="mt-1.5 flex flex-wrap gap-1.5">
              {project.technologies.map((tech) => (
                <Badge
                  key={tech}
                  variant="outline"
                  className="rounded-full bg-primary/5 text-primary border-primary/20 text-[11px] sm:text-xs px-2.5 py-0.5"
                >
                  {tech}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        <Separator className="my-2.5 sm:my-3.5 bg-border/60" />

        {/* Action Link Footer */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 w-full">
          <p className="text-[11px] sm:text-xs text-muted-foreground italic text-center sm:text-left">
            Architecture and infrastructure by Froillan Kim B. Edem.
          </p>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            {project.link && (
              <Button
                size="sm"
                className="flex-1 sm:flex-none rounded-full font-semibold text-xs sm:text-sm gap-1.5 h-8 sm:h-9 px-3.5"
                onClick={() => window.open(project.link, "_blank")}
              >
                {project.linkLabel === "GitHub" ? (
                  <Github className="size-3.5" />
                ) : (
                  <ExternalLink className="size-3.5" />
                )}
                <span>{project.linkLabel ? `View ${project.linkLabel}` : "View Repository"}</span>
              </Button>
            )}
            <Button
              size="sm"
              variant="outline"
              className="flex-1 sm:flex-none rounded-full text-xs sm:text-sm h-8 sm:h-9 px-4"
              onClick={() => onOpenChange(false)}
            >
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}



