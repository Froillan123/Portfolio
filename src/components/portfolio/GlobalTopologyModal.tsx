import {
  ArrowRight,
  Brain,
  CheckCircle2,
  GitBranch,
  Lock,
  Network,
  Server,
  Shield,
  Sparkles,
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
import { ecosystemOverview, projects, type Project } from "@/constants/projects";

type GlobalTopologyModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelectProject?: (project: Project) => void;
};

export function GlobalTopologyModal({
  open,
  onOpenChange,
  onSelectProject,
}: GlobalTopologyModalProps) {
  const architecturalPillars = [
    {
      title: "Zero-Trust Service Perimeter",
      description:
        "Public clients only communicate with the Go Gateway. All backend microservices on Google Cloud Run are private and reject unauthenticated requests. The Gateway mints IAM OIDC identity tokens on the fly.",
      icon: Shield,
    },
    {
      title: "Zero-Disk In-Memory Cryptography",
      description:
        "Sensitive user biometric embeddings and authentication keys are protected via Cloud KMS envelope encryption. Decryption keys reside purely in RAM with RLIMIT_CORE=0 to prevent memory dumps.",
      icon: Lock,
    },
    {
      title: "Sub-Millisecond Dynamic Routing",
      description:
        "High-performance Go Radix Trie route lookup executes in under 2ms. Route updates dispatched by the GitOps engine synchronize dynamically via PostgreSQL LISTEN and NOTIFY with zero downtime.",
      icon: Zap,
    },
  ];

  const handleSubsystemClick = (subsystemName: string) => {
    if (!onSelectProject) return;
    const matched = projects.find((p) =>
      p.title.toLowerCase().includes(subsystemName.toLowerCase()) ||
      subsystemName.toLowerCase().includes(p.title.toLowerCase()) ||
      (subsystemName.includes("GitOps") && p.id === "gitops-idp") ||
      (subsystemName.includes("Gateway") && p.id === "go-api-gateway") ||
      (subsystemName.includes("Vault") && p.id === "kms-vault") ||
      (subsystemName.includes("Core") && p.id === "faceofmind-core")
    );
    if (matched) {
      onOpenChange(false);
      onSelectProject(matched);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[calc(100vw-0.75rem)] sm:w-[94vw] max-w-5xl max-h-[90vh] sm:max-h-[92vh] overflow-y-auto p-3 sm:p-6 md:p-7 rounded-xl sm:rounded-3xl border border-border/80 bg-background/95 backdrop-blur-xl shadow-2xl">
        {/* Modal Header */}
        <DialogHeader className="space-y-1.5 pr-0 sm:pr-8 w-full text-left">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2.5 w-full">
            <div className="flex items-start gap-2.5 sm:gap-3 min-w-0">
              <div className="flex size-9 sm:size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 border border-primary/20 text-primary shadow-xs mt-0.5">
                <Network className="size-4.5 sm:size-5.5" />
              </div>
              <div className="min-w-0 flex-1">
                <DialogTitle className="text-sm sm:text-lg md:text-xl font-bold font-display text-foreground leading-snug break-words">
                  {ecosystemOverview.title}
                </DialogTitle>
                <DialogDescription className="text-xs sm:text-sm text-muted-foreground mt-0.5 break-words">
                  {ecosystemOverview.subtitle}
                </DialogDescription>
              </div>
            </div>

            <Badge
              variant="outline"
              className="w-fit rounded-full bg-primary/5 text-primary border-primary/20 text-[10px] sm:text-xs font-mono uppercase px-2.5 py-0.5 shrink-0 self-start gap-1"
            >
              <Sparkles className="size-3 text-primary" />
              <span>Global Topology</span>
            </Badge>
          </div>
        </DialogHeader>

        <div className="flex flex-col gap-3.5 sm:gap-5 mt-1 w-full">
          {/* Architecture Summary Banner */}
          <div className="rounded-xl sm:rounded-2xl border border-primary/20 bg-primary/5 p-3 sm:p-4.5 text-xs sm:text-sm text-foreground leading-relaxed w-full">
            <div className="flex items-center gap-1.5 font-bold font-display text-primary mb-1 text-xs sm:text-sm uppercase tracking-wider">
              <Workflow className="size-3.5 sm:size-4" />
              <span>Ecosystem Architecture & Engineering Philosophy</span>
            </div>
            <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed break-words">
              {ecosystemOverview.description}
            </p>
          </div>

          {/* Tabbed View: Mermaid Architecture Diagram & Subsystem Matrix & Pipeline Flow */}
          <Tabs defaultValue="mermaid" className="w-full">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2 w-full">
              <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-muted-foreground font-display flex items-center gap-1.5">
                <Network className="size-3.5 text-primary" />
                <span>Architecture Inspection</span>
              </h4>

              <TabsList className="grid grid-cols-3 h-8 sm:h-9 bg-muted/60 p-0.5 rounded-lg border border-border/60 w-full sm:w-auto">
                <TabsTrigger value="mermaid" className="text-[10px] sm:text-xs font-mono px-1.5 sm:px-3 py-1">
                  Mermaid Diagram
                </TabsTrigger>
                <TabsTrigger value="subsystems" className="text-[10px] sm:text-xs font-mono px-1.5 sm:px-3 py-1">
                  4-Tier Subsystems
                </TabsTrigger>
                <TabsTrigger value="pipeline" className="text-[10px] sm:text-xs font-mono px-1.5 sm:px-3 py-1">
                  Data Pipeline
                </TabsTrigger>
              </TabsList>
            </div>

            {/* Mermaid Tab */}
            <TabsContent value="mermaid" className="mt-0 focus-visible:outline-none w-full">
              <MermaidViewer
                chart={ecosystemOverview.mermaidChart}
                title="FaceOfMind Ecosystem Global Architecture"
              />
            </TabsContent>

            {/* 4-Tier Subsystems Tab */}
            <TabsContent value="subsystems" className="mt-0 focus-visible:outline-none w-full">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
                {ecosystemOverview.subsystems.map((subsystem, idx) => {
                  const SubIcon = subsystem.icon;
                  return (
                    <div
                      key={idx}
                      className="flex flex-col justify-between rounded-xl border border-border/80 bg-card/60 p-3.5 sm:p-4 hover:border-primary/40 hover:bg-card/80 transition-all shadow-xs"
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex size-9 sm:size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 border border-primary/20 text-primary">
                          <SubIcon className="size-4.5" />
                        </div>
                        <div className="min-w-0">
                          <span className="text-[10px] font-mono text-primary uppercase tracking-wider font-semibold">
                            Tier {idx + 1}
                          </span>
                          <h5 className="text-xs sm:text-sm font-bold font-display text-foreground break-words mt-0.5">
                            {subsystem.name}
                          </h5>
                          <p className="text-xs text-muted-foreground mt-1 break-words">
                            {subsystem.role}
                          </p>
                        </div>
                      </div>

                      {onSelectProject && (
                        <div className="mt-3 pt-2.5 border-t border-border/50 flex justify-end">
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-7 text-xs font-mono text-primary hover:bg-primary/10 gap-1 px-2.5"
                            onClick={() => handleSubsystemClick(subsystem.name)}
                          >
                            <span>Inspect Tier Deep Dive</span>
                            <ArrowRight className="size-3" />
                          </Button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </TabsContent>

            {/* Data Pipeline Tab */}
            <TabsContent value="pipeline" className="mt-0 focus-visible:outline-none w-full">
              <div className="rounded-xl border border-border/80 bg-card/60 p-3.5 sm:p-5 backdrop-blur-sm w-full">
                <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground font-display block mb-3">
                  End-to-End Request & Data Ingress Path:
                </span>
                <div className="flex flex-col gap-2.5 w-full">
                  {ecosystemOverview.topology.map((node, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2.5 p-2.5 rounded-lg border border-border/60 bg-background/80"
                    >
                      <span className="flex size-5 items-center justify-center rounded-full bg-primary/15 text-[11px] font-bold text-primary font-mono shrink-0">
                        {i + 1}
                      </span>
                      <span className="text-xs sm:text-sm font-medium text-foreground break-words flex-1">
                        {node}
                      </span>
                      <span className="text-[10px] sm:text-xs font-mono text-muted-foreground px-2 py-0.5 rounded bg-muted/60 shrink-0">
                        Stage {i + 1}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>

          {/* Architectural Pillars Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 sm:gap-3 w-full">
            {architecturalPillars.map((pillar, idx) => {
              const PillarIcon = pillar.icon;
              return (
                <div
                  key={idx}
                  className="rounded-xl border border-border/80 bg-card/40 p-3 sm:p-4"
                >
                  <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-primary font-display flex items-center gap-1.5">
                    <PillarIcon className="size-3.5 text-primary" />
                    <span>{pillar.title}</span>
                  </span>
                  <p className="mt-1.5 text-xs sm:text-sm text-muted-foreground leading-relaxed break-words">
                    {pillar.description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Global Platform Security & Reliability Guarantees */}
          <div className="rounded-xl border border-border/80 bg-card/30 p-3 sm:p-4 w-full">
            <div className="flex items-center gap-1.5 font-bold font-display text-foreground mb-2 text-xs sm:text-sm uppercase tracking-wider">
              <Shield className="size-4 text-primary" />
              <span>Platform Security & Deployment Controls</span>
            </div>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <li className="flex items-start gap-1.5 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                <CheckCircle2 className="size-3.5 text-primary shrink-0 mt-0.5" />
                <span className="break-words">
                  Microservices deployed with no public ingress (--no-allow-unauthenticated)
                </span>
              </li>
              <li className="flex items-start gap-1.5 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                <CheckCircle2 className="size-3.5 text-primary shrink-0 mt-0.5" />
                <span className="break-words">
                  Asynchronous Cloud Build matrix running only on changed Git manifests
                </span>
              </li>
              <li className="flex items-start gap-1.5 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                <CheckCircle2 className="size-3.5 text-primary shrink-0 mt-0.5" />
                <span className="break-words">
                  Cloud KMS envelope encryption in volatile RAM with zero disk persistence
                </span>
              </li>
              <li className="flex items-start gap-1.5 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                <CheckCircle2 className="size-3.5 text-primary shrink-0 mt-0.5" />
                <span className="break-words">
                  Automated PostgreSQL LISTEN and NOTIFY cache invalidation with zero downtime
                </span>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-2.5 sm:my-3.5 bg-border/60" />

        {/* Modal Footer */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 w-full">
          <p className="text-[11px] sm:text-xs text-muted-foreground italic text-center sm:text-left">
            Architecture and infrastructure by Froillan Kim B. Edem.
          </p>
          <div className="flex items-center justify-end gap-2 w-full sm:w-auto">
            <Button
              size="sm"
              variant="outline"
              className="flex-1 sm:flex-none rounded-full text-xs sm:text-sm h-8 sm:h-9 px-5 font-semibold"
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
