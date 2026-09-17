import { Link } from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
  ExternalLink,
  Github,
  Globe,
  HeartHandshake,
  Layers,
  Linkedin,
  Lock,
  Mail,
  Network,
  Quote,
  Scale,
  Server,
  ShieldCheck,
  Sparkles,
  Users,
  Workflow,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { profile, originStory } from "@/constants/profile";

export function AboutSection() {
  const problemIcons = [Users, Scale, Lock];

  return (
    <section
      id="about"
      className="relative scroll-mt-16 overflow-x-hidden border-b border-border/60 bg-muted/20 py-12 sm:py-16 md:py-20"
    >
      {/* Background ambient lighting */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,hsl(var(--primary)/0.08),transparent_70%)]"
      />

      <div className="container relative mx-auto w-full max-w-5xl px-3.5 sm:px-6 flex flex-col gap-12 sm:gap-16">
        
        {/* ====================================================================
            1. EDITORIAL HERO & ORIGIN STORY
        ==================================================================== */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto gap-4 sm:gap-5">
          <div className="flex flex-wrap items-center justify-center gap-2">
            <Badge
              variant="secondary"
              className="rounded-full border border-primary/20 px-3.5 py-1 text-xs font-semibold font-display bg-primary/10 text-primary"
            >
              <HeartHandshake className="size-3.5 mr-1.5" />
              Engineering Mission & Origin
            </Badge>
            <Badge
              variant="outline"
              className="rounded-full border-border/70 text-xs font-mono text-muted-foreground px-3 py-1"
            >
              {profile.badgeSubtitle}
            </Badge>
          </div>

          <div className="space-y-2">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-display tracking-tight text-foreground">
              {originStory.headline}
            </h2>
            <p className="text-base sm:text-lg font-medium text-primary font-display">
              {originStory.subheadline}
            </p>
          </div>

          {/* Punchy 3-4 line origin paragraph */}
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed font-normal text-balance max-w-2xl">
            {originStory.personalIntro}
          </p>

          {/* Highlighted Quote Box */}
          <div className="w-full mt-2 rounded-2xl border border-primary/20 bg-card/60 p-5 sm:p-6 backdrop-blur-md shadow-sm relative overflow-hidden text-left">
            <div className="flex items-start gap-3.5 sm:gap-4">
              <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 border border-primary/20 text-primary mt-0.5">
                <Quote className="size-4.5" />
              </div>
              <div className="min-w-0 flex-1">
                <blockquote className="text-sm sm:text-base font-display text-foreground font-medium italic leading-relaxed">
                  "{originStory.quote}"
                </blockquote>
                <p className="mt-2 text-xs font-mono text-primary font-semibold">
                  — {profile.shortName} · Platform & Cloud Systems Engineer
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ====================================================================
            2. THE PROBLEM (3-Column High-Scannability Problem Strip)
        ==================================================================== */}
        <div className="flex flex-col gap-5">
          <div className="flex flex-col items-center text-center gap-1.5">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-primary">
              The Access & Privacy Challenge
            </span>
            <h3 className="text-xl sm:text-2xl font-bold font-display text-foreground">
              Why Clinical Mental Health Demands Architectural Rigor
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
            {originStory.pillars.map((pillar, idx) => {
              const PillarIcon = problemIcons[idx] || Sparkles;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-border/70 bg-card/50 p-5 sm:p-6 backdrop-blur-md shadow-xs flex flex-col justify-between hover:border-primary/40 transition-colors"
                >
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-mono text-muted-foreground uppercase font-bold tracking-wider">
                        {pillar.label}
                      </span>
                      <div className="flex size-7 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <PillarIcon className="size-3.5" />
                      </div>
                    </div>

                    <div>
                      <div className="text-xl sm:text-2xl font-extrabold font-mono text-primary tracking-tight">
                        {pillar.stat}
                      </div>
                      <h4 className="text-base font-bold font-display text-foreground mt-1">
                        {pillar.title}
                      </h4>
                    </div>

                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ====================================================================
            3. VISUAL CENTERPIECE: Progression from Student Project -> Platform Engineering
        ==================================================================== */}
        <div className="rounded-2xl border border-primary/25 bg-card/70 p-6 sm:p-8 backdrop-blur-md shadow-md relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent rounded-full -mr-20 -mt-20 pointer-events-none" />

          <div className="flex flex-col gap-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-border/60 pb-4">
              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-primary">
                  Engineering Evolution
                </span>
                <h3 className="text-xl sm:text-2xl font-bold font-display text-foreground mt-0.5">
                  From Student Project → Platform Engineering
                </h3>
              </div>
              <p className="text-xs font-mono text-muted-foreground">
                Iterative Architectural Transformation
              </p>
            </div>

            {/* Progression Flow Sequence */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5 sm:gap-3">
              {originStory.progression.map((item, idx) => (
                <div
                  key={idx}
                  className="rounded-xl border border-border/70 bg-background/80 p-3.5 flex flex-col justify-between shadow-xs relative group hover:border-primary/40 transition-colors"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono text-primary font-bold px-1.5 py-0.5 rounded bg-primary/10">
                      STEP {item.step}
                    </span>
                    {idx < originStory.progression.length - 1 && (
                      <ArrowRight className="size-3.5 text-muted-foreground/40 hidden lg:block" />
                    )}
                  </div>
                  <div>
                    <h5 className="text-xs sm:text-sm font-bold font-display text-foreground leading-tight">
                      {item.label}
                    </h5>
                    <p className="text-[11px] text-muted-foreground mt-1 leading-snug">
                      {item.detail}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Tech Stack Banner Underneath */}
            <div className="flex flex-wrap items-center justify-center gap-2 pt-2 border-t border-border/40">
              <span className="text-xs font-mono text-muted-foreground mr-1">Underlying Stack:</span>
              {originStory.progressionStack.map((tech) => (
                <Badge
                  key={tech}
                  variant="outline"
                  className="rounded-full bg-primary/5 text-primary border-primary/20 text-xs font-mono px-3 py-0.5"
                >
                  {tech}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        {/* ====================================================================
            4. ENGINEERING JOURNEY (Timeline)
        ==================================================================== */}
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center text-center gap-1.5">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-primary">
              Milestones & Growth
            </span>
            <h3 className="text-xl sm:text-2xl font-bold font-display text-foreground">
              Engineering Journey
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground max-w-xl">
              Chronological progression from initial problem discovery to cloud infrastructure and security audits.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {originStory.journeyTimeline.map((item, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-border/70 bg-card/50 p-5 backdrop-blur-md shadow-xs flex flex-col justify-between hover:border-primary/40 transition-all group"
              >
                <div className="flex flex-col gap-2.5">
                  <div className="flex items-center justify-between">
                    <Badge
                      variant="secondary"
                      className="rounded-full text-xs font-mono font-bold px-2.5 py-0.5 bg-primary/10 text-primary border border-primary/20"
                    >
                      {item.year}
                    </Badge>
                    <span className="text-[10px] font-mono text-muted-foreground uppercase">
                      {item.badge}
                    </span>
                  </div>

                  <div>
                    <h4 className="text-sm sm:text-base font-bold font-display text-foreground group-hover:text-primary transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-xs font-mono text-primary font-medium mt-0.5">
                      {item.subtitle}
                    </p>
                  </div>

                  <p className="text-xs text-muted-foreground leading-relaxed mt-1">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ====================================================================
            5. CONCRETE EVIDENCE CARDS
        ==================================================================== */}
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center text-center gap-1.5">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-primary">
              Technical Verification
            </span>
            <h3 className="text-xl sm:text-2xl font-bold font-display text-foreground">
              Engineering Evidence & Implementations
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {originStory.evidence.map((item) => (
              <Card
                key={item.id}
                className="flex flex-col justify-between border-border/70 bg-card/60 backdrop-blur-md shadow-sm hover:shadow-md hover:border-primary/40 transition-all duration-200 rounded-2xl overflow-hidden group"
              >
                <CardContent className="p-5 sm:p-6 flex flex-col justify-between h-full gap-4">
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between gap-2">
                      <Badge
                        variant="secondary"
                        className="rounded-full text-xs font-mono bg-primary/10 text-primary border border-primary/20 px-2.5 py-0.5"
                      >
                        {item.badge}
                      </Badge>
                      <span className="text-xs font-mono text-muted-foreground">
                        {item.period}
                      </span>
                    </div>

                    <div>
                      <div className="text-lg sm:text-xl font-bold font-display text-foreground group-hover:text-primary transition-colors flex items-center justify-between">
                        <span>{item.title}</span>
                        <span className="text-xs font-mono text-primary font-bold px-2 py-0.5 rounded bg-primary/10 border border-primary/20">
                          {item.metric}
                        </span>
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      {item.summary}
                    </p>

                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] font-mono px-2 py-0.5 rounded bg-muted/60 text-foreground/80 border border-border/50"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-border/40">
                    <Button
                      asChild
                      size="sm"
                      className="w-full rounded-full font-semibold text-xs sm:text-sm gap-1.5 h-9 bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground border border-primary/20 transition-all"
                    >
                      <Link to={item.actionHref}>
                        <span>{item.actionLabel}</span>
                        <ArrowRight className="size-3.5" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* ====================================================================
            6. SOCIAL & DIRECT ACTION BUTTONS
        ==================================================================== */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3.5 pt-6 border-t border-border/40 w-full">
          <Button
            variant="outline"
            size="default"
            className="h-10 rounded-full px-5 sm:px-6 text-xs sm:text-sm font-semibold font-display shadow-xs border-border/80 hover:border-primary/40 hover:bg-primary/5 transition-all"
            asChild
          >
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
              <Linkedin className="size-4 text-primary" />
              <span>LinkedIn</span>
            </a>
          </Button>
          <Button
            variant="outline"
            size="default"
            className="h-10 rounded-full px-5 sm:px-6 text-xs sm:text-sm font-semibold font-display shadow-xs border-border/80 hover:border-primary/40 hover:bg-primary/5 transition-all"
            asChild
          >
            <a href={profile.github} target="_blank" rel="noopener noreferrer">
              <Github className="size-4 text-primary" />
              <span>GitHub</span>
            </a>
          </Button>
          <Button
            variant="outline"
            size="default"
            className="h-10 rounded-full px-5 sm:px-6 text-xs sm:text-sm font-semibold font-display shadow-xs border-border/80 hover:border-primary/40 hover:bg-primary/5 transition-all"
            asChild
          >
            <a href={`mailto:${profile.email}`}>
              <Mail className="size-4 text-primary" />
              <span>Email</span>
            </a>
          </Button>
          <Button
            variant="outline"
            size="default"
            className="h-10 rounded-full px-5 sm:px-6 text-xs sm:text-sm font-semibold font-display shadow-xs border-border/80 hover:border-primary/40 hover:bg-primary/5 transition-all"
            asChild
          >
            <a href={profile.website} target="_blank" rel="noopener noreferrer">
              <Globe className="size-4 text-primary" />
              <span>Live Platform</span>
            </a>
          </Button>
        </div>

      </div>
    </section>
  );
}
