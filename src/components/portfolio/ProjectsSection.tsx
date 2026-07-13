import { ExternalLink } from "lucide-react";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/portfolio/SectionHeading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { projects } from "@/constants/projects";

export function ProjectsSection() {
  return (
    <Section id="projects" muted>
      <SectionHeading
        title="Projects"
        description="Selected work: designing products and building complete software systems."
      />
      <div className="flex flex-col gap-6 sm:gap-8">
        {projects.map((project) => (
          <Card
            key={project.title}
            className="overflow-hidden border-border/80 transition-all duration-300 hover:shadow-xl hover:border-primary/20 group"
          >
            <div className="flex flex-col md:grid md:grid-cols-5">
              <div className="relative aspect-video w-full overflow-hidden bg-muted/30 md:col-span-2 md:aspect-auto md:min-h-[240px] lg:min-h-[280px] flex items-center justify-center p-3 sm:p-4 border-b md:border-b-0 md:border-r border-border/50">
                <img
                  src={project.image}
                  alt={`${project.title} preview`}
                  className="max-h-full max-w-full object-contain rounded-lg shadow-sm transition-transform duration-500 group-hover:scale-[1.02]"
                />
                {project.proprietary ? (
                  <Badge
                    variant="secondary"
                    className="absolute left-3 top-3 max-w-[calc(100%-1.5rem)] truncate rounded-full bg-background/90 text-[10px] font-semibold backdrop-blur-sm sm:left-4 sm:top-4 sm:text-xs text-primary border border-primary/10"
                  >
                    Proprietary · live
                  </Badge>
                ) : null}
              </div>

              <div className="flex min-w-0 flex-col md:col-span-3">
                <CardHeader className="gap-1 p-5 sm:p-6 bg-gradient-to-b from-card/35 to-transparent">
                  <CardTitle className="text-xl sm:text-2xl font-extrabold font-display tracking-tight text-foreground">{project.title}</CardTitle>
                  <CardDescription className="text-xs font-bold uppercase tracking-widest text-primary">{project.subtitle}</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-5 p-5 pt-0 sm:p-6 sm:pt-0">
                  <p className="text-sm leading-relaxed text-muted-foreground font-medium">
                    {project.description}
                  </p>

                  {project.highlights?.length ? (
                    <ul className="flex flex-col gap-2.5">
                      {project.highlights.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-2.5 text-xs sm:text-sm text-muted-foreground"
                        >
                          <span className="mt-1.5 flex size-1.5 shrink-0 rounded-full bg-primary/60" />
                          <span className="font-medium">{item}</span>
                        </li>
                      ))}
                    </ul>
                  ) : null}

                  {project.technologies?.length ? (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {project.technologies.map((tech) => (
                        <Badge key={tech} variant="outline" className="rounded-full bg-primary/5 text-primary border border-primary/15 text-xs font-semibold px-3 py-0.5">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  ) : null}

                  {project.proprietary ? (
                    <p className="text-[11px] text-muted-foreground/85 font-medium italic pt-1">
                      Note: Project code and systems configurations are proprietary.
                    </p>
                  ) : null}
                </CardContent>
                <CardFooter className="mt-auto flex flex-col gap-2 p-5 pt-0 sm:flex-row sm:p-6 sm:pt-0">
                  <Button
                    className="w-full sm:w-auto rounded-full font-bold font-display shadow-md transition-all hover:shadow-lg"
                    onClick={() => window.open(project.link, "_blank")}
                  >
                    <ExternalLink data-icon="inline-start" />
                    Visit live site
                  </Button>
                  {!project.proprietary && project.github ? (
                    <Button
                      variant="outline"
                      className="w-full sm:w-auto"
                      onClick={() => window.open(project.github, "_blank")}
                    >
                      Source
                    </Button>
                  ) : null}
                </CardFooter>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </Section>
  );
}
