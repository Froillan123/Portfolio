import { ExternalLink, Github } from "lucide-react";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/portfolio/SectionHeading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { projects } from "@/constants/projects";

export function ProjectsSection() {
  return (
    <Section id="projects" muted>
      <SectionHeading
        title="Featured Projects"
        description="Core developer platforms, Go microservice gateways, and KMS envelope encryption systems."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project) => {
          const Icon = project.icon;
          return (
            <Card
              key={project.title}
              className="flex flex-col justify-between border-border/80 bg-card/60 backdrop-blur-md shadow-md hover:shadow-xl hover:border-primary/25 transition-all duration-300"
            >
              <div>
                <CardHeader className="p-5 pb-3">
                  <div className="flex items-center gap-3">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 border border-primary/20 text-primary">
                      <Icon className="size-5" />
                    </div>
                    <div>
                      <CardTitle className="text-lg font-bold font-display text-foreground">
                        {project.title}
                      </CardTitle>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {project.subtitle}
                      </p>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="p-5 pt-2">
                  {/* Clean 2-3 Bullet Points */}
                  <ul className="flex flex-col gap-2 my-3">
                    {project.bullets.map((bullet, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                        <span className="mt-1.5 flex size-1.5 shrink-0 rounded-full bg-primary" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Tech Tags */}
                  <div className="flex flex-wrap gap-1.5 mt-4 pt-3 border-t border-border/40">
                    {project.technologies.map((tech) => (
                      <Badge
                        key={tech}
                        variant="outline"
                        className="rounded-full bg-primary/5 text-primary border-primary/15 text-[11px] font-medium px-2.5 py-0.5"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </div>

              {/* One Clean Link Button */}
              {project.link && (
                <CardFooter className="p-5 pt-0">
                  <Button
                    size="sm"
                    variant="outline"
                    className="w-full sm:w-auto rounded-full font-semibold text-xs gap-1.5 shadow-sm hover:bg-primary hover:text-primary-foreground transition-all"
                    onClick={() => window.open(project.link, "_blank")}
                  >
                    {project.linkLabel === "GitHub" ? (
                      <Github className="size-3.5" />
                    ) : (
                      <ExternalLink className="size-3.5" />
                    )}
                    <span>{project.linkLabel || "View Project"}</span>
                  </Button>
                </CardFooter>
              )}
            </Card>
          );
        })}
      </div>
    </Section>
  );
}
