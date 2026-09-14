import { useState } from "react";
import {
  ArrowRight,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Github,
  Network,
  Sparkles,
  Workflow,
} from "lucide-react";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/portfolio/SectionHeading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { projects, ecosystemOverview, type Project } from "@/constants/projects";
import { ArchitectureModal } from "@/components/portfolio/ArchitectureModal";
import { MermaidViewer } from "@/components/portfolio/MermaidViewer";

export function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [showGlobalDiagram, setShowGlobalDiagram] = useState(false);

  const handleOpenArchitecture = (project: Project) => {
    setSelectedProject(project);
    setModalOpen(true);
  };

  return (
    <Section id="projects" muted>
      <SectionHeading
        title="Featured Platform Architecture"
        description="The FaceOfMind Cloud Infrastructure Ecosystem — engineered as specialized, modular platform subsystems on Google Cloud."
      />

      {/* Flagship Ecosystem Architecture Banner */}
      <div className="mb-8 rounded-2xl sm:rounded-3xl border border-primary/20 bg-card/70 p-3.5 sm:p-7 backdrop-blur-md shadow-xl relative overflow-hidden w-full max-w-full">
        <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent rounded-full -mr-16 -mt-16 pointer-events-none" />

        <div className="flex flex-col gap-3 sm:gap-4 w-full max-w-full">
          <div className="flex flex-wrap items-center justify-between gap-2 w-full">
            <Badge
              variant="secondary"
              className="gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-2.5 sm:px-3 py-0.5 sm:py-1 text-[10px] sm:text-xs font-semibold text-primary font-display"
            >
              <Sparkles className="size-3 text-primary" />
              <span>Flagship Cloud Architecture</span>
            </Badge>

            <div className="flex items-center gap-2">
              <Button
                size="sm"
                variant="outline"
                className="h-7 text-[10px] sm:text-[11px] font-mono rounded-full gap-1 border-primary/30 text-primary hover:bg-primary/10 px-2.5 sm:px-3"
                onClick={() => setShowGlobalDiagram((prev) => !prev)}
              >
                <Network className="size-3" />
                <span>{showGlobalDiagram ? "Hide Topology" : "View Topology"}</span>
                {showGlobalDiagram ? <ChevronUp className="size-3" /> : <ChevronDown className="size-3" />}
              </Button>
            </div>
          </div>

          <div className="w-full max-w-full">
            <h3 className="text-lg sm:text-2xl font-bold font-display text-foreground tracking-tight leading-snug">
              {ecosystemOverview.title}
            </h3>
            <p className="mt-1.5 sm:mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-4xl">
              {ecosystemOverview.description}
            </p>
          </div>

          {/* Collapsible Global Mermaid Architecture Diagram */}
          {showGlobalDiagram && (
            <div className="my-2 animate-in fade-in-50 duration-300 w-full max-w-full overflow-hidden">
              <MermaidViewer
                chart={ecosystemOverview.mermaidChart}
                title="FaceOfMind Ecosystem Global Architecture"
              />
            </div>
          )}

          {/* 4-Tier Interactive Map */}
          <div className="mt-1 sm:mt-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-2.5 w-full">
            {ecosystemOverview.subsystems.map((subsystem, idx) => {
              const SubIcon = subsystem.icon;
              return (
                <div
                  key={idx}
                  className="flex items-center gap-2.5 rounded-xl sm:rounded-2xl border border-border/80 bg-background/80 p-2.5 sm:p-3 shadow-sm hover:border-primary/30 transition-all backdrop-blur-sm"
                >
                  <div className="flex size-7 sm:size-8 shrink-0 items-center justify-center rounded-lg sm:rounded-xl bg-primary/10 border border-primary/20 text-primary">
                    <SubIcon className="size-3.5 sm:size-4" />
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-[11px] sm:text-xs font-bold font-display text-foreground">
                      {subsystem.name}
                    </p>
                    <p className="truncate text-[9px] sm:text-[10px] font-mono text-primary font-medium">
                      {subsystem.role}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* The 4 Subsystem Project Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 w-full max-w-full">
        {projects.map((project) => {
          const Icon = project.icon;
          return (
            <Card
              key={project.title}
              className="flex flex-col justify-between border-border/80 bg-card/60 backdrop-blur-md shadow-md hover:shadow-xl hover:border-primary/25 transition-all duration-300 w-full max-w-full overflow-hidden"
            >
              <div className="w-full max-w-full">
                <CardHeader className="p-4 sm:p-5 pb-2 sm:pb-3 w-full">
                  <div className="flex flex-col gap-2 w-full">
                    <div className="flex items-center justify-between gap-2">
                      <Badge
                        variant="outline"
                        className="rounded-full bg-primary/5 text-primary border-primary/20 text-[9px] sm:text-[10px] font-mono uppercase tracking-wider px-2 sm:px-2.5 py-0.5"
                      >
                        {project.tier}
                      </Badge>
                    </div>

                    <div className="flex items-center gap-2.5 sm:gap-3 w-full">
                      <div className="flex size-9 sm:size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 border border-primary/20 text-primary">
                        <Icon className="size-4 sm:size-5" />
                      </div>
                      <div className="min-w-0">
                        <CardTitle className="text-base sm:text-lg font-bold font-display text-foreground truncate">
                          {project.title}
                        </CardTitle>
                        <p className="text-[11px] sm:text-xs text-muted-foreground mt-0.5 truncate">
                          {project.subtitle}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="p-4 sm:p-5 pt-1 sm:pt-2 w-full">
                  {/* Clean 2-3 Bullet Points */}
                  <ul className="flex flex-col gap-2 my-2.5 sm:my-3">
                    {project.bullets.map((bullet, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                        <span className="mt-1.5 flex size-1.5 shrink-0 rounded-full bg-primary" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Inline Architecture Pipeline Preview */}
                  <div className="mt-3 sm:mt-4 rounded-xl border border-border/60 bg-muted/20 p-2 sm:p-2.5 w-full max-w-full overflow-hidden">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-wider text-muted-foreground/80 font-bold flex items-center gap-1">
                        <Workflow className="size-3 text-primary" />
                        Subsystem Pipeline:
                      </span>
                      <button
                        type="button"
                        onClick={() => handleOpenArchitecture(project)}
                        className="text-[10px] sm:text-[11px] font-mono text-primary hover:underline font-semibold"
                      >
                        Inspect Flow →
                      </button>
                    </div>
                    <div className="flex items-center gap-1 overflow-x-auto pb-1 text-[10px] sm:text-[11px] font-mono text-foreground/80 scrollbar-none touch-pan-x w-full">
                      {project.architectureFlow.map((node, i) => (
                        <span key={i} className="inline-flex items-center shrink-0">
                          <span className="rounded bg-background/80 px-1.5 py-0.5 border border-border/50 text-[9px] sm:text-[10px] whitespace-nowrap">
                            {node}
                          </span>
                          {i < project.architectureFlow.length - 1 && (
                            <ArrowRight className="size-2.5 mx-1 text-muted-foreground/60 shrink-0" />
                          )}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Tech Tags */}
                  <div className="flex flex-wrap gap-1 mt-3 sm:mt-4 pt-2.5 sm:pt-3 border-t border-border/40">
                    {project.technologies.map((tech) => (
                      <Badge
                        key={tech}
                        variant="outline"
                        className="rounded-full bg-primary/5 text-primary border-primary/15 text-[10px] sm:text-[11px] font-medium px-2 sm:px-2.5 py-0.5"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </div>

              {/* Action Buttons: View Architecture + Repository Link */}
              <CardFooter className="p-4 sm:p-5 pt-0 flex flex-wrap items-center justify-between gap-2">
                <Button
                  size="sm"
                  variant="secondary"
                  className="rounded-full font-semibold text-xs gap-1.5 bg-primary/10 text-primary hover:bg-primary/20 transition-all border border-primary/20 h-8"
                  onClick={() => handleOpenArchitecture(project)}
                >
                  <Network className="size-3.5" />
                  <span>View Architecture</span>
                </Button>

                {project.link && (
                  <Button
                    size="sm"
                    variant="outline"
                    className="rounded-full font-semibold text-xs gap-1.5 shadow-sm hover:bg-primary hover:text-primary-foreground transition-all h-8"
                    onClick={() => window.open(project.link, "_blank")}
                  >
                    {project.linkLabel === "GitHub" ? (
                      <Github className="size-3.5" />
                    ) : (
                      <ExternalLink className="size-3.5" />
                    )}
                    <span>{project.linkLabel || "View Project"}</span>
                  </Button>
                )}
              </CardFooter>
            </Card>
          );
        })}
      </div>

      {/* Architecture Visualizer Modal */}
      <ArchitectureModal
        project={selectedProject}
        open={modalOpen}
        onOpenChange={setModalOpen}
      />
    </Section>
  );
}
