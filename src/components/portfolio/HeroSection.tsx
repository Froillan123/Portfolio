import { ArrowRight, Check, Download } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { heroHighlights, profile } from "@/constants/profile";
import { scrollToSection } from "@/hooks/use-active-section";
import { TypewriterLoop } from "@/components/TypewriterLoop";
import { FloatingParticles } from "@/components/FloatingParticles";

export function HeroSection() {
  return (
    <section
      id="home"
      className="relative flex min-h-[100svh] scroll-mt-20 flex-col justify-center overflow-x-hidden border-b border-border/60 sm:scroll-mt-28 bg-background"
    >
      {/* Premium background gradient and tech grid pattern */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,hsl(var(--muted)),transparent)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_80%,transparent_100%)]"
      />

      <FloatingParticles />

      <div className="container relative mx-auto w-full max-w-6xl px-4 pb-10 pt-[4.75rem] sm:px-6 sm:pb-14 sm:pt-28 md:pb-16 md:pt-32">
        <div className="flex flex-col items-center gap-10 md:min-h-[calc(100svh-8rem)] md:justify-center lg:grid lg:grid-cols-2 lg:items-center lg:gap-12 xl:gap-16">
          <div className="flex w-full max-w-xl flex-col gap-6 sm:gap-8 lg:max-w-none">
            <Badge
              variant="secondary"
              className="w-fit max-w-full gap-2 rounded-full border border-primary/20 bg-primary/5 px-3.5 py-1.5 text-xs font-semibold text-primary shadow-sm"
            >
              <span className="relative flex size-2 shrink-0">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400/30 opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
              </span>
              <span className="truncate">Founder & Lead Developer · FaceofMind</span>
            </Badge>

            <div className="flex flex-col gap-3 sm:gap-4">
              <h1 className="text-balance text-3xl font-extrabold font-display leading-[1.1] tracking-tight sm:text-4xl md:text-5xl lg:text-[3.25rem] bg-gradient-to-r from-foreground via-foreground/90 to-muted-foreground bg-clip-text text-transparent">
                {profile.name}
              </h1>
              <div className="flex flex-col gap-1 min-h-[5.5rem] sm:min-h-[6rem] justify-center">
                <p className="text-lg font-medium text-foreground/80 sm:text-xl">
                  {profile.title}
                </p>
                <TypewriterLoop />
              </div>
              <p className="max-w-lg text-sm leading-relaxed text-muted-foreground sm:text-base pt-2">
                {profile.bio}
              </p>
            </div>

            <div className="flex flex-col gap-2.5 sm:flex-row sm:flex-wrap sm:gap-3">
              <Button
                size="lg"
                className="h-11 w-full rounded-full sm:w-auto sm:px-6 shadow-md hover:shadow-lg transition-all font-semibold"
                onClick={() => scrollToSection("projects")}
              >
                View projects
                <ArrowRight data-icon="inline-end" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-11 w-full rounded-full sm:w-auto sm:px-6 hover:bg-muted/50 transition-all font-semibold"
                onClick={() => scrollToSection("contact")}
              >
                Get in touch
              </Button>
              <Button
                size="lg"
                variant="ghost"
                className="h-11 w-full rounded-full sm:w-auto hover:bg-muted/50 transition-all font-semibold"
                onClick={() => window.open(profile.resumePath, "_blank")}
              >
                <Download data-icon="inline-start" />
                Resume
              </Button>
            </div>

            <ul className="flex flex-col gap-2.5 sm:gap-3">
              {heroHighlights.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-muted-foreground">
                  <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full border border-border bg-card shadow-sm">
                    <Check className="size-3 text-primary" />
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative w-full max-w-[min(100%,20rem)] sm:max-w-xs lg:max-w-md lg:justify-self-end group">
            {/* Ambient background glow */}
            <div className="absolute -inset-2 rounded-[2.25rem] bg-gradient-to-r from-violet-600/20 via-fuchsia-500/25 to-indigo-500/20 opacity-75 blur-xl transition duration-1000 group-hover:opacity-100 group-hover:duration-200" />
            
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
