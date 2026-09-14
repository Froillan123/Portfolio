import {
  CheckCircle2,
  Cpu,
  Fingerprint,
  Gauge,
  GitMerge,
  ShieldAlert,
} from "lucide-react";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/portfolio/SectionHeading";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const principles = [
  {
    icon: GitMerge,
    title: "Automate Repetitive Infrastructure & Workflows",
    badge: "Automation & GitOps",
    description:
      "Eliminate manual operational toil through declarative GitOps pipelines, matrix build filters that only compile modified services, and automated IAM bindings on container deployment.",
    quote: "If a deployment or configuration task is done twice, it should be codified and automated.",
  },
  {
    icon: Fingerprint,
    title: "Prefer Least-Privilege IAM & Service Isolation",
    badge: "Zero-Toil Security",
    description:
      "Enforce granular service account permissions (e.g. roles/run.invoker per service), AES-256-GCM envelope encryption with GCP KMS, and isolated secret scoping at runtime.",
    quote: "Security boundaries should be structural and programmatic, not assumed.",
  },
  {
    icon: Cpu,
    title: "Scale Without Unnecessary Operational Complexity",
    description:
      "Architect distributed systems that handle high throughput and dynamic routing without introducing fragile orchestration overhead or unnecessary middleware dependencies.",
    badge: "System Simplicity",
    quote: "Simplicity in architecture is the highest form of reliability.",
  },
  {
    icon: Gauge,
    title: "Observability, Telemetry & Failure as First-Class Design",
    badge: "Resiliency & Telemetry",
    description:
      "Embed end-to-end latency propagation headers (X-Gateway, X-Upstream, X-Total), structured security audit trails, and graceful route fallbacks directly into proxy and service layers.",
    quote: "You cannot debug, secure, or optimize what you do not measure.",
  },
  {
    icon: ShieldAlert,
    title: "Prefer Managed Cloud Infrastructure for Operational Leverage",
    badge: "Cloud Efficiency",
    description:
      "Leverage serverless container platforms (Cloud Run), managed KMS, and managed relational databases (Cloud SQL) to eliminate patching toil while maintaining full control of application boundaries.",
    quote: "Spend engineering cycles on platform reliability and developer velocity, not server maintenance.",
  },
];

export function EngineeringFocusSection() {
  return (
    <Section id="philosophy">
      <SectionHeading
        title="Engineering Focus"
        description="Core architectural principles guiding my approach to cloud platforms, security, and developer infrastructure."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {principles.map((item, idx) => {
          const Icon = item.icon;
          const isWide = idx === 0;

          return (
            <Card
              key={item.title}
              className={`border-border/80 bg-card/60 backdrop-blur-md shadow-md transition-all duration-300 hover:shadow-xl hover:border-primary/25 relative overflow-hidden flex flex-col justify-between ${
                isWide ? "md:col-span-2 lg:col-span-2" : ""
              }`}
            >
              <div className="absolute top-0 right-0 w-28 h-28 bg-gradient-to-br from-primary/5 to-transparent rounded-full -mr-10 -mt-10 pointer-events-none" />

              <CardContent className="p-5 sm:p-6 flex flex-col gap-3">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 border border-primary/20 text-primary">
                    <Icon className="size-5" />
                  </div>
                  <Badge
                    variant="outline"
                    className="rounded-full bg-primary/5 text-primary border-primary/15 text-[10px] font-semibold tracking-wider font-mono uppercase px-2.5 py-0.5"
                  >
                    {item.badge}
                  </Badge>
                </div>

                <div className="mt-1">
                  <h3 className="text-base sm:text-lg font-bold font-display text-foreground leading-snug">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-auto pt-3 border-t border-border/40 flex items-start gap-2">
                  <CheckCircle2 className="size-3.5 text-primary shrink-0 mt-0.5" />
                  <p className="text-[11px] font-mono text-muted-foreground italic">
                    "{item.quote}"
                  </p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </Section>
  );
}
