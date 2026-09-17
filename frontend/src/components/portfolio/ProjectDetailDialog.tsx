import { ExternalLink, Github } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import type { Project } from "@/constants/projects";

type ProjectDetailDialogProps = {
  project: Project | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function ProjectDetailDialog({ project, open, onOpenChange }: ProjectDetailDialogProps) {
  if (!project) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[85vh] max-w-lg overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{project.title}</DialogTitle>
          <DialogDescription>{project.subtitle}</DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-6">
          <p className="text-sm text-muted-foreground">{project.description}</p>

          {project.features?.length ? (
            <div>
              <h4 className="mb-2 text-sm font-medium">Features</h4>
              <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
                {project.features.map((feature) => (
                  <li key={feature} className="list-inside list-disc">
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          {project.techStack ? (
            <div>
              <h4 className="mb-2 text-sm font-medium">Stack by area</h4>
              <div className="flex flex-col gap-3">
                {Object.entries(project.techStack).map(([category, techs]) => (
                  <div key={category}>
                    <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                      {category}
                    </p>
                    <div className="mt-1 flex flex-wrap gap-1">
                      {techs.map((tech) => (
                        <Badge key={tech} variant="outline" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : null}

          <div>
            <h4 className="mb-2 text-sm font-medium">Technologies</h4>
            <div className="flex flex-wrap gap-1">
              {project.technologies.map((tech) => (
                <Badge key={tech} variant="secondary" className="text-xs">
                  {tech}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        <Separator />

        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="outline" onClick={() => window.open(project.github, "_blank")}>
            <Github data-icon="inline-start" />
            Source
          </Button>
          <Button onClick={() => window.open(project.link, "_blank")}>
            <ExternalLink data-icon="inline-start" />
            Live demo
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
