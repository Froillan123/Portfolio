import { ArrowRight, Check, Download } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { heroHighlights, profile } from "@/constants/profile";
import { scrollToSection } from "@/hooks/use-active-section";

export function HeroSection() {
  return (
    <section
      id="home"
      className="relative flex min-h-[100svh] scroll-mt-20 flex-col justify-center overflow-x-hidden border-b border-border/60 sm:scroll-mt-28"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,hsl(var(--muted)),transparent)]"
      />

      <div className="container relative mx-auto w-full max-w-6xl px-4 pb-10 pt-[4.75rem] sm:px-6 sm:pb-14 sm:pt-28 md:pb-16 md:pt-32">
        <div className="flex flex-col items-center gap-10 md:min-h-[calc(100svh-8rem)] md:justify-center lg:grid lg:grid-cols-2 lg:items-center lg:gap-12 xl:gap-16">
          <div className="flex w-full max-w-xl flex-col gap-6 sm:gap-8 lg:max-w-none">
            <Badge
              variant="secondary"
              className="w-fit max-w-full gap-2 rounded-full border border-border px-3 py-1.5 text-xs font-normal"
            >
              <span className="relative flex size-2 shrink-0">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary/30 opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-primary" />
              </span>
              <span className="truncate">Open to work</span>
            </Badge>

            <div className="flex flex-col gap-3 sm:gap-4">
              <h1 className="text-balance text-3xl font-semibold leading-[1.12] tracking-tight sm:text-4xl md:text-5xl lg:text-[3.25rem]">
                {profile.name}
              </h1>
              <p className="text-lg font-medium text-foreground/90 sm:text-xl">
                {profile.title}
                <span className="font-normal text-muted-foreground"> · {profile.tagline}</span>
              </p>
              <p className="max-w-lg text-sm leading-relaxed text-muted-foreground sm:text-base">
                {profile.bio}
              </p>
            </div>

            <div className="flex flex-col gap-2.5 sm:flex-row sm:flex-wrap sm:gap-3">
              <Button
                size="lg"
                className="h-11 w-full rounded-full sm:w-auto sm:px-6"
                onClick={() => scrollToSection("projects")}
              >
                View projects
                <ArrowRight data-icon="inline-end" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-11 w-full rounded-full sm:w-auto sm:px-6"
                onClick={() => scrollToSection("contact")}
              >
                Get in touch
              </Button>
              <Button
                size="lg"
                variant="ghost"
                className="h-11 w-full rounded-full sm:w-auto"
                onClick={() => window.open(profile.resumePath, "_blank")}
              >
                <Download data-icon="inline-start" />
                Resume
              </Button>
            </div>

            <ul className="flex flex-col gap-2.5 sm:gap-3">
              {heroHighlights.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-muted-foreground">
                  <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full border border-border bg-card">
                    <Check className="size-3 text-foreground" />
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="w-full max-w-[min(100%,20rem)] sm:max-w-xs lg:max-w-md lg:justify-self-end">
            <div className="aspect-[4/5] max-h-[min(70vh,28rem)] overflow-hidden rounded-2xl border border-border bg-muted shadow-xl sm:rounded-3xl lg:max-h-none">
              <img
                src={profile.imageUrl}
                alt={profile.name}
                className="size-full object-cover object-top"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
