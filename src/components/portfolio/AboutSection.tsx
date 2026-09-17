import {
  Github,
  Globe,
  GraduationCap,
  Linkedin,
  Mail,
  ShieldCheck,
  Server,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { profile, workExperiences } from "@/constants/profile";

const nameParts = profile.name.split(" ").filter(Boolean);
const initials = `${nameParts[0]?.[0] || "F"}${nameParts[nameParts.length - 1]?.[0] || "E"}`;

export function AboutSection() {
  return (
    <section
      id="about"
      className="relative scroll-mt-16 overflow-x-hidden border-b border-border/60 bg-muted/20 sm:scroll-mt-20 py-10 sm:py-14 md:py-16"
    >
      {/* Background radial gradient */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_80%_50%,hsl(var(--muted)),transparent)]"
      />

      <div className="container relative mx-auto w-full max-w-6xl px-3.5 sm:px-6">
        <div className="flex flex-col gap-8 lg:grid lg:grid-cols-[1.15fr_0.85fr] lg:items-start lg:gap-10 xl:gap-12">
          
          {/* Main Narrative Column */}
          <div className="order-2 flex flex-col gap-4 sm:gap-5 lg:order-1">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="secondary" className="w-fit rounded-full border border-border px-3.5 py-1 text-xs sm:text-sm font-semibold font-display bg-primary/5 text-primary">
                Engineering Journey
              </Badge>
              <Badge variant="outline" className="rounded-full border-border/70 text-xs font-mono text-muted-foreground px-3 py-1">
                Self-Taught · Fresh Graduate (2026)
              </Badge>
            </div>

            <div className="flex flex-col gap-2.5 sm:gap-3">
              <h2 className="text-balance text-2xl font-bold font-display tracking-tight sm:text-3xl text-foreground">
                Self-Taught Platform Architecture & Cloud Systems
              </h2>
              
              {/* Context on FaceOfMind Platform */}
              <div className="rounded-xl border border-primary/20 bg-primary/5 p-4 sm:p-5 text-sm sm:text-base text-foreground/90 leading-relaxed font-normal">
                <p>
                  <strong>FaceOfMind</strong> is a self-taught platform engineering project I built from 2025 - 2026. Rather than building a typical student web app, I used it to master real-world distributed systems: engineering a custom Go Radix Trie API gateway, a declarative GitOps matrix control plane, and zero-disk envelope encryption on Google Cloud.
                </p>
              </div>

              <p className="leading-relaxed text-muted-foreground text-sm sm:text-base font-normal">
                I am a 2026 B.S. in Information Technology graduate from the University of Cebu. My technical focus centers on declarative automation, high-performance Go reverse proxies, Linux memory hardening, and least-privilege cloud infrastructure on Google Cloud and AWS.
              </p>
              
              {/* Authentic Cost Optimization -> Security Audit Story */}
              <p className="leading-relaxed text-muted-foreground text-sm sm:text-base font-normal">
                During my OJT internship at a Philippine real estate platform, an initial AWS cost optimization audit turned into an authorized security assessment after I discovered public S3 buckets exposing sensitive customer documents. I identified 15+ vulnerabilities across storage permissions, IAM policies, and VPC routing, authoring a remediation plan aligned with RA 10173 (Philippine Data Privacy Act).
              </p>
            </div>

            {/* Social / Contact quick buttons */}
            <div className="grid grid-cols-2 gap-2.5 sm:flex sm:flex-wrap pt-2">
              <Button variant="outline" size="sm" className="w-full rounded-full sm:w-auto text-xs sm:text-sm font-semibold font-display h-9 px-4" asChild>
                <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
                  <Linkedin data-icon="inline-start" className="size-4 mr-1.5" />
                  LinkedIn
                </a>
              </Button>
              <Button variant="outline" size="sm" className="w-full rounded-full sm:w-auto text-xs sm:text-sm font-semibold font-display h-9 px-4" asChild>
                <a href={profile.github} target="_blank" rel="noopener noreferrer">
                  <Github data-icon="inline-start" className="size-4 mr-1.5" />
                  GitHub
                </a>
              </Button>
              <Button variant="outline" size="sm" className="w-full rounded-full sm:w-auto text-xs sm:text-sm font-semibold font-display h-9 px-4" asChild>
                <a href={`mailto:${profile.email}`}>
                  <Mail data-icon="inline-start" className="size-4 mr-1.5" />
                  Email
                </a>
              </Button>
              <Button variant="outline" size="sm" className="w-full rounded-full sm:w-auto text-xs sm:text-sm font-semibold font-display h-9 px-4" asChild>
                <a href={profile.website} target="_blank" rel="noopener noreferrer">
                  <Globe data-icon="inline-start" className="size-4 mr-1.5" />
                  Live Platform
                </a>
              </Button>
            </div>
          </div>

          {/* Sidebar Identity & Credential Cards */}
          <div className="order-1 flex flex-col gap-3.5 lg:order-2 w-full">
            {/* Header Identity Card */}
            <Card className="border-border/70 shadow-md backdrop-blur-md bg-card/50 relative overflow-hidden rounded-xl sm:rounded-2xl">
              <CardContent className="flex flex-col items-center gap-3 p-5 text-center sm:p-6">
                <Avatar className="size-16 sm:size-20 border-2 border-border/80 shadow-sm">
                  <AvatarImage
                    src={profile.imageUrl}
                    alt={profile.name}
                    className="object-cover object-top"
                  />
                  <AvatarFallback className="text-base font-bold font-display">{initials}</AvatarFallback>
                </Avatar>
                <div className="min-w-0">
                  <p className="font-bold text-base sm:text-lg font-display tracking-tight">{profile.shortName}</p>
                  <p className="text-xs sm:text-sm text-muted-foreground mt-0.5 font-medium">{profile.title}</p>
                  <Badge variant="secondary" className="mt-1 text-xs font-mono bg-primary/10 text-primary border border-primary/20 px-2.5 py-0.5">
                    {profile.badgeSubtitle}
                  </Badge>
                </div>
                <Separator className="bg-border/60" />
                <p className="text-left text-xs sm:text-sm leading-relaxed text-muted-foreground font-normal">
                  {profile.tagline}
                </p>
              </CardContent>
            </Card>

            {/* Work Experiences Cards */}
            {workExperiences.map((exp, idx) => (
              <Card
                key={idx}
                className="border-border/70 shadow-sm backdrop-blur-md bg-card/50 transition-all rounded-xl sm:rounded-2xl"
              >
                <CardContent className="flex gap-3 p-3.5 sm:p-4">
                  <div className="flex size-8 sm:size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 border border-primary/20 text-primary">
                    {idx === 0 ? (
                      <ShieldCheck className="size-4" />
                    ) : (
                      <Server className="size-4" />
                    )}
                  </div>
                  <div className="min-w-0 flex flex-col gap-0.5 text-xs sm:text-sm">
                    <p className="font-bold font-display text-foreground leading-tight text-sm sm:text-base">
                      {exp.role}
                    </p>
                    <p className="text-xs sm:text-sm text-primary font-semibold">
                      {exp.company} · <span className="text-muted-foreground font-normal">{exp.period}</span>
                    </p>
                    <p className="text-xs sm:text-sm leading-relaxed text-muted-foreground mt-0.5">
                      {exp.summary}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* Education Card with Capstone */}
            <Card className="border-border/70 shadow-sm backdrop-blur-md bg-card/50 transition-all rounded-xl sm:rounded-2xl">
              <CardContent className="flex gap-3 p-3.5 sm:p-4">
                <div className="flex size-8 sm:size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 border border-primary/20 text-primary">
                  <GraduationCap className="size-4" />
                </div>
                <div className="min-w-0 flex flex-col gap-0.5 text-xs sm:text-sm">
                  <p className="font-bold font-display text-foreground text-sm sm:text-base">{profile.school}</p>
                  <p className="text-xs sm:text-sm text-muted-foreground font-medium">{profile.schoolDates} · {profile.educationDetail}</p>
                  <p className="text-xs sm:text-sm font-mono text-primary font-medium mt-0.5">{profile.capstoneDetail}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}

