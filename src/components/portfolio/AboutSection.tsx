import {
  Check,
  Github,
  Globe,
  GraduationCap,
  Linkedin,
  Mail,
  Briefcase,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { aboutExperience, aboutJourney, profile } from "@/constants/profile";

const initials = profile.name
  .split(" ")
  .map((part) => part[0])
  .join("")
  .slice(0, 2);

export function AboutSection() {
  return (
    <section
      id="about"
      className="relative scroll-mt-20 overflow-x-hidden border-b border-border/60 bg-muted/30 sm:scroll-mt-28 md:min-h-[100svh] md:flex md:flex-col md:justify-center"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_80%_50%,hsl(var(--muted)),transparent)]"
      />

      <div className="container relative mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-20 md:py-24 lg:py-28">
        <div className="flex flex-col gap-10 lg:grid lg:grid-cols-[1fr_minmax(0,280px)] lg:items-start lg:gap-12 xl:gap-16">
          <div className="order-2 flex flex-col gap-6 sm:gap-8 lg:order-1">
            <Badge variant="secondary" className="w-fit rounded-full border border-border px-3 py-1">
              About
            </Badge>

            <div className="flex flex-col gap-3 sm:gap-4">
              <h2 className="text-balance text-2xl font-semibold tracking-tight sm:text-3xl md:text-4xl">
                Background
              </h2>
              <p className="leading-relaxed text-muted-foreground">
                I&apos;m an IT graduate from {profile.school} (2026), focused on software
                engineering. I work across mobile, web, and backend—mostly through FaceofMind, which
                I started during school and still run today.
              </p>
              <p className="leading-relaxed text-muted-foreground">
                I&apos;m looking for a junior role where I can contribute on a team, learn from
                code review, and keep shipping. For the product itself, see{" "}
                <a
                  href={profile.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-foreground underline-offset-4 hover:underline"
                >
                  faceofmind.it.com
                </a>
                .
              </p>
            </div>

            <ul className="flex flex-col gap-2.5 sm:gap-3">
              {aboutJourney.map((item) => (
                <li key={item} className="flex gap-3 text-sm text-muted-foreground">
                  <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full border border-border bg-background">
                    <Check className="size-3" />
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap">
              <Button variant="outline" size="sm" className="w-full rounded-full sm:w-auto" asChild>
                <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
                  <Linkedin data-icon="inline-start" />
                  LinkedIn
                </a>
              </Button>
              <Button variant="outline" size="sm" className="w-full rounded-full sm:w-auto" asChild>
                <a href={profile.github} target="_blank" rel="noopener noreferrer">
                  <Github data-icon="inline-start" />
                  GitHub
                </a>
              </Button>
              <Button variant="outline" size="sm" className="w-full rounded-full sm:w-auto" asChild>
                <a href={`mailto:${profile.email}`}>
                  <Mail data-icon="inline-start" />
                  Email
                </a>
              </Button>
              <Button variant="outline" size="sm" className="w-full rounded-full sm:w-auto" asChild>
                <a href={profile.website} target="_blank" rel="noopener noreferrer">
                  <Globe data-icon="inline-start" />
                  FaceofMind
                </a>
              </Button>
            </div>
          </div>

          <div className="order-1 flex flex-col gap-3 sm:gap-4 lg:order-2">
            <Card className="border-border/80 shadow-sm">
              <CardContent className="flex flex-col items-center gap-4 p-5 text-center sm:p-6">
                <Avatar className="size-24 border-2 border-border sm:size-28">
                  <AvatarImage
                    src={profile.imageUrl}
                    alt={profile.name}
                    className="object-cover object-top"
                  />
                  <AvatarFallback className="text-xl">{initials}</AvatarFallback>
                </Avatar>
                <div className="min-w-0">
                  <p className="font-semibold">{profile.shortName}</p>
                  <p className="text-sm text-muted-foreground">{profile.title}</p>
                </div>
                <Separator />
                <p className="text-left text-xs leading-relaxed text-muted-foreground">
                  {profile.tagline}
                </p>
              </CardContent>
            </Card>

            <Card className="border-border/80">
              <CardContent className="flex gap-3 p-4">
                <Briefcase className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                <div className="min-w-0 flex flex-col gap-1 text-sm">
                  <p className="font-medium">{aboutExperience.role}</p>
                  <p className="text-muted-foreground">
                    {aboutExperience.company} · {aboutExperience.period}
                  </p>
                  <p className="text-xs leading-relaxed text-muted-foreground">
                    {aboutExperience.summary}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/80">
              <CardContent className="flex gap-3 p-4">
                <GraduationCap className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                <div className="min-w-0 flex flex-col gap-1 text-sm">
                  <p className="font-medium">{profile.school}</p>
                  <p className="text-muted-foreground">{profile.schoolDates}</p>
                  <p className="text-xs text-muted-foreground">{profile.educationDetail}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <dl className="mt-10 grid grid-cols-1 gap-3 sm:mt-12 sm:grid-cols-2 sm:gap-4 md:grid-cols-3">
          {profile.stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl border border-border bg-card px-4 py-4 text-center sm:px-5 sm:text-left"
            >
              <dt className="text-xs text-muted-foreground">{stat.label}</dt>
              <dd className="mt-1 text-lg font-semibold tracking-tight sm:text-xl">{stat.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
