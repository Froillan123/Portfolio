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
        description="Selected work — public overview only. Proprietary products omit internal architecture."
      />
      <div className="flex flex-col gap-6 sm:gap-8">
        {projects.map((project) => (
          <Card
            key={project.title}
            className="overflow-hidden border-border/80 transition-shadow hover:shadow-lg"
          >
            <div className="flex flex-col md:grid md:grid-cols-5">
              <div className="relative aspect-video w-full overflow-hidden bg-muted md:col-span-2 md:aspect-auto md:min-h-[240px] lg:min-h-[280px]">
                <img
                  src={project.image}
                  alt={`${project.title} preview`}
                  className="size-full object-cover"
                />
                {project.proprietary ? (
                  <Badge
                    variant="secondary"
                    className="absolute left-3 top-3 max-w-[calc(100%-1.5rem)] truncate rounded-full bg-background/90 text-[10px] backdrop-blur-sm sm:left-4 sm:top-4 sm:text-xs"
                  >
                    Proprietary · live
                  </Badge>
                ) : null}
              </div>

              <div className="flex min-w-0 flex-col md:col-span-3">
                <CardHeader className="gap-1 p-4 sm:p-6">
                  <CardTitle className="text-lg sm:text-xl">{project.title}</CardTitle>
                  <CardDescription className="text-sm">{project.subtitle}</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-4 p-4 pt-0 sm:gap-5 sm:p-6 sm:pt-0">
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {project.description}
                  </p>

                  {project.highlights?.length ? (
                    <ul className="flex flex-col gap-2">
                      {project.highlights.map((item) => (
                        <li
                          key={item}
                          className="flex gap-2 text-sm text-muted-foreground before:mt-2 before:size-1 before:shrink-0 before:rounded-full before:bg-foreground/40 before:content-['']"
                        >
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  ) : null}

                  {project.technologies?.length ? (
                    <div className="flex flex-wrap gap-1.5">
                      {project.technologies.map((tech) => (
                        <Badge key={tech} variant="outline" className="rounded-md font-normal">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  ) : null}

                  {project.proprietary ? (
                    <p className="text-xs text-muted-foreground">
                      Source code and system design are not public. Visit the live site for the
                      product experience.
                    </p>
                  ) : null}
                </CardContent>
                <CardFooter className="mt-auto flex flex-col gap-2 p-4 pt-0 sm:flex-row sm:p-6 sm:pt-0">
                  <Button
                    className="w-full sm:w-auto"
                    onClick={() => window.open(project.link, "_blank")}
                  >
                    <ExternalLink data-icon="inline-start" />
                    Visit site
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
