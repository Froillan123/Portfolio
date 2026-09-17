import { useState } from "react";
import {
  ShieldAlert,
  ShieldCheck,
  Terminal,
  Lock,
  Search,
  FileText,
  Server,
  KeyRound,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ExternalLink,
} from "lucide-react";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/portfolio/SectionHeading";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { securityAssessment } from "@/constants/profile";

const auditMetrics = [
  { label: "Vulnerabilities Identified", value: "15+", badge: "Audited", icon: ShieldAlert, color: "text-rose-500" },
  { label: "Public Data Exposure", value: "Prevented", badge: "RA 10173", icon: Lock, color: "text-emerald-500" },
  { label: "Audit Timeline", value: "OJT Side-Project", badge: "2026", icon: Terminal, color: "text-primary" },
];

const vulnerabilityFindings = [
  {
    severity: "CRITICAL",
    category: "Cloud Storage",
    title: "Public S3 Bucket Customer Document Exposure",
    impact: "Sensitive PRC licenses, government IDs, and financial records accessible via public object URLs.",
    fix: "Enforced S3 Block Public Access, bucket policies, and signed-URL temporary access tokens.",
  },
  {
    severity: "HIGH",
    category: "IAM & Access",
    title: "Over-Privileged IAM Roles & Wildcard Actions",
    impact: "Service accounts possessed administrative privileges beyond required read/write scopes.",
    fix: "Restructured IAM to strict least-privilege role bindings and scoped KMS cryptographic permissions.",
  },
  {
    severity: "HIGH",
    category: "Network & VPC",
    title: "Relational Database in Public Subnet",
    impact: "Database ports directly reachable from public IP space without bastion or VPN barriers.",
    fix: "Architected VPC private subnet isolation with secure SSH bastion host gateway routing.",
  },
  {
    severity: "MEDIUM",
    category: "Compliance",
    title: "Unencrypted Sensitive Fields at Rest",
    impact: "Potential non-compliance penalties under RA 10173 (Philippine Data Privacy Act).",
    fix: "Implemented AES-256-GCM envelope encryption and authored executive remediation advisory.",
  },
];

export function ExperienceSection() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <Section id="security" muted>
      <SectionHeading
        title="Security Audit & Cloud Experience"
        description="Case study: Authorized AWS cost optimization that evolved into a critical security and compliance assessment."
      />

      <div className="max-w-4xl mx-auto w-full flex flex-col gap-3 sm:gap-4">
        
        {/* Top Metric Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3.5">
          {auditMetrics.map((metric) => {
            const Icon = metric.icon;
            return (
              <div
                key={metric.label}
                className="flex items-center justify-between rounded-xl border border-border/70 bg-card/60 p-3.5 sm:p-4 backdrop-blur-md shadow-xs"
              >
                <div className="flex items-center gap-3">
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 border border-primary/20 text-primary">
                    <Icon className="size-4.5" />
                  </div>
                  <div>
                    <p className={`text-xl sm:text-2xl font-bold font-display ${metric.color}`}>
                      {metric.value}
                    </p>
                    <p className="text-xs sm:text-sm text-muted-foreground font-medium">
                      {metric.label}
                    </p>
                  </div>
                </div>
                <Badge variant="outline" className="text-xs font-mono px-2.5 py-0.5 rounded-full border-border/60">
                  {metric.badge}
                </Badge>
              </div>
            );
          })}
        </div>

        {/* Interactive Case Study Console */}
        <Card className="border-border/70 bg-card/70 backdrop-blur-md shadow-lg rounded-xl sm:rounded-2xl overflow-hidden">
          {/* Terminal Console Header */}
          <div className="flex items-center justify-between px-4 py-2.5 bg-muted/40 border-b border-border/60">
            <div className="flex items-center gap-2">
              <span className="size-2.5 rounded-full bg-rose-500/80" />
              <span className="size-2.5 rounded-full bg-amber-500/80" />
              <span className="size-2.5 rounded-full bg-emerald-500/80" />
              <span className="text-xs font-mono text-muted-foreground font-semibold ml-2 flex items-center gap-1.5">
                <Terminal className="size-3.5 text-primary" />
                sec-audit@ph-realestate-platform:~$
              </span>
            </div>
            <Badge variant="secondary" className="text-xs font-mono bg-primary/10 text-primary border border-primary/20 px-2.5 py-0.5">
              NDA Protected
            </Badge>
          </div>

          <div className="p-4 sm:p-6">
            <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="w-full">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-3.5 border-b border-border/50">
                <div>
                  <h3 className="text-base sm:text-lg font-bold font-display text-foreground">
                    {securityAssessment.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
                    Philippine Real Estate Platform · Jan 2026 - Mar 2026
                  </p>
                </div>

                <TabsList className="grid grid-cols-2 h-8 bg-muted/50 p-0.5 rounded-lg border border-border/60 w-full sm:w-auto">
                  <TabsTrigger value="overview" className="text-xs font-mono px-3 py-1">
                    Incident Arc
                  </TabsTrigger>
                  <TabsTrigger value="findings" className="text-xs font-mono px-3 py-1">
                    15+ Findings Matrix
                  </TabsTrigger>
                </TabsList>
              </div>

              {/* Tab 1: Incident & Discovery Arc */}
              <TabsContent value="overview" className="mt-4 flex flex-col gap-3.5 focus-visible:outline-none">
                <div className="rounded-xl border border-primary/20 bg-primary/5 p-4 sm:p-4.5 text-sm sm:text-base text-foreground/90 leading-relaxed font-normal">
                  <p>{securityAssessment.narrative}</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mt-1">
                  {securityAssessment.bullets.map((bullet, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2.5 rounded-lg border border-border/60 bg-background/60 p-3 text-xs sm:text-sm text-muted-foreground leading-relaxed shadow-xs"
                    >
                      <CheckCircle2 className="size-4 text-primary shrink-0 mt-0.5" />
                      <span>{bullet}</span>
                    </div>
                  ))}
                </div>
              </TabsContent>

              {/* Tab 2: Findings Matrix */}
              <TabsContent value="findings" className="mt-4 flex flex-col gap-3 focus-visible:outline-none">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {vulnerabilityFindings.map((finding, idx) => (
                    <div
                      key={idx}
                      className="rounded-xl border border-border/70 bg-background/70 p-3.5 sm:p-4 flex flex-col justify-between gap-2.5 shadow-xs"
                    >
                      <div className="flex flex-col gap-1.5">
                        <div className="flex items-center justify-between">
                          <span
                            className={`text-xs font-mono font-extrabold px-2 py-0.5 rounded ${
                              finding.severity === "CRITICAL"
                                ? "bg-rose-500/10 text-rose-500 border border-rose-500/20"
                                : "bg-amber-500/10 text-amber-500 border border-amber-500/20"
                            }`}
                          >
                            {finding.severity}
                          </span>
                          <span className="text-xs font-mono text-muted-foreground">
                            {finding.category}
                          </span>
                        </div>
                        <p className="text-sm sm:text-base font-bold font-display text-foreground mt-0.5">
                          {finding.title}
                        </p>
                        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                          {finding.impact}
                        </p>
                      </div>

                      <div className="rounded-md bg-muted/40 p-2 border border-border/50 text-xs font-mono text-primary flex items-start gap-1.5">
                        <span className="font-bold text-foreground shrink-0">Fix:</span>
                        <span className="text-muted-foreground">{finding.fix}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>

            {/* Bottom Tag Bar */}
            <div className="flex flex-wrap gap-1.5 mt-4 pt-3.5 border-t border-border/40">
              {securityAssessment.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center rounded-md border border-border/60 bg-primary/5 px-2.5 py-1 text-xs font-mono font-medium text-primary"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </Section>
  );
}
