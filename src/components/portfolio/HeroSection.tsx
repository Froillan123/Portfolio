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
      className="relative flex min-h-screen min-h-[100svh] min-h-[100dvh] scroll-mt-16 flex-col justify-center overflow-hidden border-b border-border/60 sm:scroll-mt-20 bg-background pt-12 sm:pt-16 lg:pt-0"
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

      <div className="container relative mx-auto w-full max-w-6xl px-3.5 sm:px-6 py-12 sm:py-16 lg:py-20">
        <div className="flex flex-col-reverse lg:grid lg:grid-cols-12 lg:items-center lg:gap-10 xl:gap-14">
          
          {/* Left Column: Text, Core Stack Bar, Action Buttons & Stats */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left mt-8 lg:mt-0 lg:col-span-7">
            {/* Availability Badge */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 mb-4">
              <Badge
                variant="secondary"
                className="gap-2 rounded-full border border-primary/20 bg-primary/5 px-3.5 py-1 text-xs sm:text-sm font-semibold text-primary shadow-xs"
              >
                <span className="relative flex size-2.5">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400/30 opacity-75" />
                  <span className="relative inline-flex size-2.5 rounded-full bg-emerald-500" />
                </span>
                <span>Open to Platform & Cloud Systems Roles</span>
              </Badge>

              <Badge
                variant="outline"
                className="rounded-full border-border/70 text-xs font-mono text-muted-foreground px-3 py-1"
              >
                {profile.badgeSubtitle}
              </Badge>
            </div>

            {/* Name & Title */}
            <h1 className="text-balance text-3xl font-extrabold font-display leading-[1.1] tracking-tight sm:text-4xl lg:text-5xl text-foreground">
              {profile.name}
            </h1>
            <p className="mt-2 text-base sm:text-xl font-bold text-primary">
              {profile.title}
            </p>

            {/* Punchline */}
            <p className="mt-3.5 max-w-xl text-sm sm:text-base text-muted-foreground leading-relaxed font-normal">
              {profile.tagline}
            </p>

            {/* Core Tech Stack Gravity Bar */}
            <div className="mt-5 flex flex-wrap items-center justify-center lg:justify-start gap-1.5 sm:gap-2">
              <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground font-semibold mr-1">
                Core Stack:
              </span>
              {profile.coreTech.map((tech) => (
                <span
                  key={tech}
                  className="inline-flex items-center gap-1.5 rounded-md border border-border/80 bg-muted/30 px-2.5 py-1 text-xs sm:text-sm font-mono font-medium text-foreground/90 shadow-xs backdrop-blur-sm"
                >
                  <span className="size-1.5 rounded-full bg-primary" />
                  {tech}
                </span>
              ))}
            </div>

            {/* 3 Main Action Buttons */}
            <div className="mt-7 flex flex-wrap items-center justify-center lg:justify-start gap-2.5 sm:gap-3 w-full sm:w-auto">
              <Button
                size="sm"
                className="h-10 rounded-full px-5 font-semibold shadow-sm hover:shadow-md transition-all text-xs sm:text-sm"
                onClick={() => scrollToSection("platform")}
              >
                View Platform Architecture
                <ArrowRight className="size-3.5 ml-1.5" />
              </Button>

              <Button
                size="sm"
                variant="outline"
                className="h-10 rounded-full px-5 font-semibold hover:bg-muted/50 transition-all text-xs sm:text-sm"
                onClick={() => window.open(encodeURI(profile.resumePath), "_blank")}
              >
                <Download className="size-3.5 mr-1.5" />
                Resume
              </Button>

              <Button
                size="sm"
                variant="ghost"
                className="h-10 rounded-full px-5 font-semibold hover:bg-muted/50 transition-all text-xs sm:text-sm"
                onClick={() => scrollToSection("contact")}
              >
                <Mail className="size-3.5 mr-1.5" />
                Contact
              </Button>
            </div>

            {/* 4 Real Concrete Metrics with Clear Human Context */}
            <div className="mt-9 sm:mt-11 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3 w-full">
              {profile.stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-xl border border-border/70 bg-card/50 p-3.5 sm:p-4 backdrop-blur-sm shadow-xs text-left"
                >
                  <p className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-display text-primary tracking-tight">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-xs sm:text-sm font-medium text-muted-foreground leading-snug">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Sleek Framed Profile Image */}
          <div className="relative w-full max-w-[min(100%,15rem)] sm:max-w-xs lg:max-w-sm lg:col-span-5 mx-auto group">
            {/* Ambient background glow */}
            <div className="absolute -inset-2 rounded-[2rem] bg-gradient-to-r from-primary/20 via-primary/10 to-transparent opacity-75 blur-xl transition duration-1000 group-hover:opacity-100 group-hover:duration-200" />
            
            {/* Geometric frame */}
            <div className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem] border border-border bg-background shadow-xl transition-all duration-500 group-hover:scale-[1.01] group-hover:border-primary/20 p-1.5">
              <div className="size-full overflow-hidden rounded-[1.5rem]">
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
