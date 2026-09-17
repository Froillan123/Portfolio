import { useState } from "react";
import {
  ArrowRight,
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
import { GlobalTopologyModal } from "@/components/portfolio/GlobalTopologyModal";

export function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [globalModalOpen, setGlobalModalOpen] = useState(false);

  const handleOpenArchitecture = (project: Project) => {
    setSelectedProject(project);
    setModalOpen(true);
  };

  const handleOpenSubsystemByName = (subsystemName: string) => {
    const matched = projects.find((p) =>
      p.title.toLowerCase().includes(subsystemName.toLowerCase()) ||
      subsystemName.toLowerCase().includes(p.title.toLowerCase()) ||
      (subsystemName.includes("GitOps") && p.id === "gitops-idp") ||
      (subsystemName.includes("Gateway") && p.id === "go-api-gateway") ||
      (subsystemName.includes("Vault") && p.id === "kms-vault") ||
      (subsystemName.includes("Core") && p.id === "faceofmind-core")
    );
    if (matched) {
      handleOpenArchitecture(matched);
    } else {
      setGlobalModalOpen(true);
    }
  };

  return (
    <Section id="platform">
      <SectionHeading
        title="Platform Architecture & Subsystems"
        description="The FaceOfMind Cloud Infrastructure Ecosystem: engineered as modular, decoupled platform tiers on Google Cloud."
      />

      {/* Flagship Ecosystem Architecture Banner */}
      <div className="mb-6 rounded-2xl border border-primary/20 bg-card/70 p-4 sm:p-6 backdrop-blur-md shadow-lg relative overflow-hidden w-full max-w-full">
        <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent rounded-full -mr-16 -mt-16 pointer-events-none" />

        <div className="flex flex-col gap-3 sm:gap-4 w-full max-w-full">
          <div className="flex flex-wrap items-center justify-between gap-2 w-full">
            <Badge
              variant="secondary"
              className="gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary font-display"
            >
              <Sparkles className="size-3.5 text-primary" />
              <span>FaceOfMind Platform Topology</span>
            </Badge>

            <Button
              size="sm"
              variant="outline"
              className="h-8 text-xs font-mono rounded-full gap-1.5 border-primary/30 text-primary hover:bg-primary/10 px-3.5 shadow-xs"
              onClick={() => setGlobalModalOpen(true)}
            >
              <Network className="size-3.5" />
              <span>View Global Topology</span>
            </Button>
          </div>

          <div className="w-full max-w-full">
            <h3 className="text-lg sm:text-2xl font-bold font-display text-foreground tracking-tight leading-snug">
              {ecosystemOverview.title}
            </h3>
            <p className="mt-1.5 text-sm sm:text-base text-muted-foreground leading-relaxed max-w-4xl font-normal">
              {ecosystemOverview.description}
            </p>
          </div>

          {/* 4-Tier Interactive Map */}
          <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3 w-full">
            {ecosystemOverview.subsystems.map((subsystem, idx) => {
              const SubIcon = subsystem.icon;
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleOpenSubsystemByName(subsystem.name)}
                  className="flex items-center gap-3 rounded-xl border border-border/70 bg-background/80 p-3 sm:p-3.5 shadow-xs hover:border-primary/40 hover:bg-background transition-all backdrop-blur-sm text-left group cursor-pointer"
                >
                  <div className="flex size-8 sm:size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 border border-primary/20 text-primary group-hover:bg-primary/20 transition-colors">
                    <SubIcon className="size-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-xs sm:text-sm font-bold font-display text-foreground group-hover:text-primary transition-colors">
                      {subsystem.name}
                    </p>
                    <p className="truncate text-xs font-mono text-primary font-medium mt-0.5">
                      {subsystem.role}
                    </p>
                  </div>
                </button>
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
              className="flex flex-col justify-between border-border/70 bg-card/60 backdrop-blur-md shadow-sm hover:shadow-md hover:border-primary/30 transition-all duration-200 rounded-xl sm:rounded-2xl overflow-hidden w-full max-w-full"
            >
              <div className="w-full max-w-full">
                <CardHeader className="p-4 sm:p-5 pb-2 sm:pb-3 w-full">
                  <div className="flex flex-col gap-2.5 w-full">
                    <div className="flex items-center justify-between gap-2">
                      <Badge
                        variant="outline"
                        className="rounded-full bg-primary/5 text-primary border-primary/20 text-xs font-mono uppercase tracking-wider px-2.5 py-0.5"
                      >
                        {project.tier}
                      </Badge>
                    </div>

                    <div className="flex items-center gap-3 w-full">
                      <div className="flex size-9 sm:size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 border border-primary/20 text-primary">
                        <Icon className="size-4 sm:size-5" />
                      </div>
                      <div className="min-w-0">
                        <CardTitle className="text-base sm:text-lg font-bold font-display text-foreground truncate">
                          {project.title}
                        </CardTitle>
                        <p className="text-xs sm:text-sm text-muted-foreground mt-0.5 truncate">
                          {project.subtitle}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="p-4 sm:p-5 pt-1 sm:pt-2 w-full">
                  {/* Clean Bullet Points */}
                  <ul className="flex flex-col gap-2 my-2">
                    {project.bullets.map((bullet, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                        <span className="mt-2 flex size-1.5 shrink-0 rounded-full bg-primary" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Inline Architecture Pipeline Preview */}
                  <div className="mt-3.5 rounded-lg border border-border/60 bg-muted/20 p-2.5 sm:p-3 w-full max-w-full overflow-hidden">
                    <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground font-bold flex items-center gap-1.5 mb-1.5">
                      <Workflow className="size-3 text-primary" />
                      Subsystem Flow:
                    </span>
                    <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5 text-xs font-mono text-foreground/80 scrollbar-none touch-pan-x w-full">
                      {project.architectureFlow.map((node, i) => (
                        <span key={i} className="inline-flex items-center shrink-0">
                          <span className="rounded bg-background/90 px-2 py-0.5 border border-border/50 text-xs whitespace-nowrap">
                            {node}
                          </span>
                          {i < project.architectureFlow.length - 1 && (
                            <ArrowRight className="size-3 mx-1 text-muted-foreground/60 shrink-0" />
                          )}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Tech Tags */}
                  <div className="flex flex-wrap gap-1.5 mt-3.5 pt-3 border-t border-border/40">
                    {project.technologies.map((tech) => (
                      <Badge
                        key={tech}
                        variant="outline"
                        className="rounded-full bg-primary/5 text-primary border-primary/15 text-xs font-medium px-2.5 py-0.5"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </div>

              {/* Action Buttons */}
              <CardFooter className="p-4 sm:p-5 pt-0 flex flex-wrap items-center justify-between gap-2.5">
                <Button
                  size="sm"
                  variant="secondary"
                  className="rounded-full font-semibold text-xs sm:text-sm gap-1.5 bg-primary/10 text-primary hover:bg-primary/20 transition-all border border-primary/20 h-8 sm:h-9 px-3.5"
                  onClick={() => handleOpenArchitecture(project)}
                >
                  <Network className="size-3.5" />
                  <span>View Architecture</span>
                </Button>

                {project.link && (
                  <Button
                    size="sm"
                    variant="outline"
                    className="rounded-full font-semibold text-xs sm:text-sm gap-1.5 shadow-xs hover:bg-primary hover:text-primary-foreground transition-all h-8 sm:h-9 px-3.5"
                    onClick={() => window.open(project.link, "_blank")}
                  >
                    {project.linkLabel === "GitHub" ? (
                      <Github className="size-3.5" />
                    ) : (
                      <ExternalLink className="size-3.5" />
                    )}
                    <span>{project.linkLabel || "View Code"}</span>
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

      {/* Global Topology Visualizer Modal */}
      <GlobalTopologyModal
        open={globalModalOpen}
        onOpenChange={setGlobalModalOpen}
        onSelectProject={handleOpenArchitecture}
      />
    </Section>
  );
}
