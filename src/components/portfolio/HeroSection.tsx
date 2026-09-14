import { ArrowRight, Download, Mail } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { profile } from "@/constants/profile";
import { scrollToSection } from "@/hooks/use-active-section";
import { FloatingParticles } from "@/components/FloatingParticles";

export function HeroSection() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen min-h-[100svh] min-h-[100dvh] scroll-mt-20 flex-col justify-center overflow-hidden border-b border-border/60 sm:scroll-mt-28 bg-background pt-14 sm:pt-16 lg:pt-0"
    >
      {/* Background gradients */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,hsl(var(--muted)),transparent)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_80%,transparent_100%)]"
      />

      <FloatingParticles />

      <div className="container relative mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        <div className="flex flex-col-reverse lg:grid lg:grid-cols-12 lg:items-center lg:gap-12 xl:gap-16">
          
          {/* Left Column: Text, Core Stack Bar, Action Buttons & Stats */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left mt-10 lg:mt-0 lg:col-span-7">
            {/* Availability Badge */}
            <Badge
              variant="secondary"
              className="mb-5 gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-semibold text-primary shadow-sm"
            >
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400/30 opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
              </span>
              <span>Open to Cloud, Platform & DevOps Roles</span>
            </Badge>

            {/* Name & Title */}
            <h1 className="text-balance text-4xl font-extrabold font-display leading-[1.1] tracking-tight sm:text-5xl lg:text-[3.25rem] text-foreground">
              {profile.name}
            </h1>
            <p className="mt-2 text-lg sm:text-xl font-semibold text-primary">
              {profile.title}
            </p>

            {/* Punchline */}
            <p className="mt-4 max-w-lg text-base sm:text-lg text-muted-foreground leading-relaxed">
              {profile.tagline}
            </p>

            {/* Core Tech Stack Gravity Bar */}
            <div className="mt-4 flex flex-wrap items-center justify-center lg:justify-start gap-1.5 sm:gap-2">
              <span className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground/70 font-semibold mr-1">
                Core Stack:
              </span>
              {profile.coreTech.map((tech, index) => (
                <span
                  key={tech}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-border/80 bg-muted/30 px-2.5 py-1 text-xs font-mono font-medium text-foreground/90 shadow-sm backdrop-blur-sm"
                >
                  <span className="size-1 rounded-full bg-primary" />
                  {tech}
                </span>
              ))}
            </div>

            {/* 3 Main Action Buttons */}
            <div className="mt-8 flex flex-wrap items-center justify-center lg:justify-start gap-3">
              <Button
                size="lg"
                className="h-11 rounded-full px-6 font-semibold shadow-md hover:shadow-lg transition-all"
                onClick={() => scrollToSection("projects")}
              >
                View Projects
                <ArrowRight className="size-4 ml-1.5" />
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="h-11 rounded-full px-6 font-semibold hover:bg-muted/50 transition-all"
                onClick={() => window.open(encodeURI(profile.resumePath), "_blank")}
              >
                <Download className="size-4 mr-1.5" />
                Resume
              </Button>

              <Button
                size="lg"
                variant="ghost"
                className="h-11 rounded-full px-6 font-semibold hover:bg-muted/50 transition-all"
                onClick={() => scrollToSection("contact")}
              >
                <Mail className="size-4 mr-1.5" />
                Contact
              </Button>
            </div>

            {/* 3 Real Concrete Stats */}
            <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-3 w-full">
              {profile.stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-border/70 bg-card/40 p-4 backdrop-blur-sm shadow-sm text-center lg:text-left"
                >
                  <p className="text-2xl sm:text-3xl font-extrabold font-display text-primary">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-xs font-medium text-muted-foreground">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Sleek Framed Profile Image */}
          <div className="relative w-full max-w-[min(100%,18rem)] sm:max-w-xs lg:max-w-sm lg:col-span-5 mx-auto group">
            {/* Ambient background glow */}
            <div className="absolute -inset-2 rounded-[2.25rem] bg-gradient-to-r from-primary/20 via-primary/10 to-transparent opacity-75 blur-xl transition duration-1000 group-hover:opacity-100 group-hover:duration-200" />
            
            {/* Geometric frame */}
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-border bg-background shadow-2xl transition-all duration-500 group-hover:scale-[1.01] group-hover:border-primary/20 p-2">
              <div className="size-full overflow-hidden rounded-[1.75rem]">
                <img
                  src={profile.imageUrl}
                  alt={profile.name}
                  className="size-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
