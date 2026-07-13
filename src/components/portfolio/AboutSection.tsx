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
import { AnimatedCounter } from "@/components/AnimatedCounter";

const initials = profile.name
  .split(" ")
  .map((part) => part[0])
  .join("")
  .slice(0, 2);

const architectureMetrics = [
  { value: 1, label: "Live System Maintained", suffix: "" },
  { value: 3, label: "Years Programming", suffix: "+" },
  { value: 10, label: "Technologies Used", suffix: "+" },
  { value: 100, label: "Product-Driven Engineering", suffix: "%" },
];

export function AboutSection() {
  return (
    <section
      id="about"
      className="relative scroll-mt-20 overflow-x-hidden border-b border-border/60 bg-muted/20 sm:scroll-mt-28 md:min-h-[100svh] md:flex md:flex-col md:justify-center"
    >
      {/* Background gradients */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_80%_50%,hsl(var(--muted)),transparent)]"
      />

      <div className="container relative mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-20 md:py-24 lg:py-28">
        <div className="flex flex-col gap-10 lg:grid lg:grid-cols-[1.2fr_0.8fr] lg:items-start lg:gap-12 xl:gap-16">
          
          {/* Main Info Column */}
          <div className="order-2 flex flex-col gap-6 sm:gap-8 lg:order-1">
            <Badge variant="secondary" className="w-fit rounded-full border border-border px-3.5 py-1 text-xs font-semibold font-display bg-primary/5 text-primary">
              About the Developer
            </Badge>

            <div className="flex flex-col gap-3 sm:gap-4">
              <h2 className="text-balance text-2xl font-bold font-display tracking-tight sm:text-3xl md:text-4xl bg-gradient-to-r from-foreground via-foreground/90 to-muted-foreground bg-clip-text text-transparent">
                My Story & Approach
              </h2>
              <p className="leading-relaxed text-muted-foreground text-sm sm:text-base">
                As the Founder of {aboutExperience.company}, I focus on bringing simple, intuitive ideas to life through software. I design and write code for mobile applications (Flutter), web portals (React), and backend services (Python & .NET Core).
              </p>
              <p className="leading-relaxed text-muted-foreground text-sm sm:text-base">
                I lead the creation and development of FaceofMind, designing it to be a daily emotional wellness companion and a delightful resource for users to check in on their emotional well-being. I love creating polished user experiences that look and feel modern. Check out the live application at{" "}
                <a
                  href={profile.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-foreground underline underline-offset-4 hover:text-primary transition-colors decoration-primary/30"
                >
                  faceofmind.it.com
                </a>
                .
              </p>
            </div>

            {/* Timeline Milestones */}
            <div className="flex flex-col gap-4 border-l border-border/80 pl-4 sm:pl-6 my-2">
              {aboutJourney.map((item, idx) => (
                <div key={idx} className="relative flex flex-col gap-1">
                  {/* Indicator node */}
                  <span className="absolute -left-[21px] sm:-left-[29px] top-1.5 flex size-2.5 items-center justify-center rounded-full bg-primary border-4 border-background ring-4 ring-muted/50" />
                  <p className="text-sm text-muted-foreground leading-relaxed pl-1">
                    {item}
                  </p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap">
              <Button variant="outline" size="sm" className="w-full rounded-full sm:w-auto shadow-sm text-xs font-semibold font-display" asChild>
                <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
                  <Linkedin data-icon="inline-start" />
                  LinkedIn
                </a>
              </Button>
              <Button variant="outline" size="sm" className="w-full rounded-full sm:w-auto shadow-sm text-xs font-semibold font-display" asChild>
                <a href={profile.github} target="_blank" rel="noopener noreferrer">
                  <Github data-icon="inline-start" />
                  GitHub
                </a>
              </Button>
              <Button variant="outline" size="sm" className="w-full rounded-full sm:w-auto shadow-sm text-xs font-semibold font-display" asChild>
                <a href={`mailto:${profile.email}`}>
                  <Mail data-icon="inline-start" />
                  Email
                </a>
              </Button>
              <Button variant="outline" size="sm" className="w-full rounded-full sm:w-auto shadow-sm text-xs font-semibold font-display" asChild>
                <a href={profile.website} target="_blank" rel="noopener noreferrer">
                  <Globe data-icon="inline-start" />
                  FaceofMind
                </a>
              </Button>
            </div>
          </div>

          {/* Sidebar Info Cards */}
          <div className="order-1 flex flex-col gap-4 lg:order-2 w-full">
            {/* Header Identity Card */}
            <Card className="border-border/60 shadow-lg backdrop-blur-md bg-card/45 relative overflow-hidden group hover:border-primary/10 transition-all">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/5 to-transparent rounded-full -mr-12 -mt-12 pointer-events-none" />
              <CardContent className="flex flex-col items-center gap-4 p-6 text-center sm:p-7">
                <Avatar className="size-20 border-2 border-border/80 shadow-md">
                  <AvatarImage
                    src={profile.imageUrl}
                    alt={profile.name}
                    className="object-cover object-top"
                  />
                  <AvatarFallback className="text-lg font-bold font-display">{initials}</AvatarFallback>
                </Avatar>
                <div className="min-w-0">
                  <p className="font-bold text-base font-display tracking-tight">{profile.shortName}</p>
                  <p className="text-xs text-muted-foreground mt-0.5 font-medium">{profile.title}</p>
                </div>
                <Separator className="bg-border/60" />
                <p className="text-left text-xs leading-relaxed text-muted-foreground font-semibold">
                  {profile.tagline}
                </p>
              </CardContent>
            </Card>

            {/* Experience Card */}
            <Card className="border-border/60 shadow-md backdrop-blur-md bg-card/45 transition-all duration-300 hover:border-primary/15 hover:shadow-lg">
              <CardContent className="flex gap-3.5 p-5">
                <div className="flex size-8 shrink-0 items-center justify-center rounded-xl bg-primary/5 border border-primary/10">
                  <Briefcase className="size-4 text-primary" />
                </div>
                <div className="min-w-0 flex flex-col gap-1 text-sm">
                  <p className="font-bold font-display text-foreground">{aboutExperience.role}</p>
                  <p className="text-xs text-muted-foreground font-medium">
                    {aboutExperience.company} · {aboutExperience.period}
                  </p>
                  <p className="text-xs leading-relaxed text-muted-foreground mt-1">
                    {aboutExperience.summary}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Education Card */}
            <Card className="border-border/60 shadow-md backdrop-blur-md bg-card/45 transition-all duration-300 hover:border-primary/15 hover:shadow-lg">
              <CardContent className="flex gap-3.5 p-5">
                <div className="flex size-8 shrink-0 items-center justify-center rounded-xl bg-primary/5 border border-primary/10">
                  <GraduationCap className="size-4 text-primary" />
                </div>
                <div className="min-w-0 flex flex-col gap-1 text-sm">
                  <p className="font-bold font-display text-foreground">{profile.school}</p>
                  <p className="text-xs text-muted-foreground font-medium">{profile.schoolDates}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{profile.educationDetail}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Simplified Stats Horizontal List */}
        <dl className="mt-12 grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
          {profile.stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-border/80 bg-card/40 px-5 py-4 text-center sm:text-left shadow-sm hover:border-primary/10 transition-all backdrop-blur-sm"
            >
              <dt className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider">{stat.label}</dt>
              <dd className="mt-1 text-sm font-semibold tracking-tight text-foreground font-display">{stat.value}</dd>
            </div>
          ))}
        </dl>

        {/* Interactive Coding Metrics Panels */}
        <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4 sm:gap-4">
          {architectureMetrics.map((metric) => (
            <div
              key={metric.label}
              className="relative overflow-hidden rounded-2xl border border-border/70 bg-card/30 p-5 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-primary/20 backdrop-blur-md"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-primary/5 to-transparent rounded-full -mr-8 -mt-8 pointer-events-none" />
              <dd className="text-3xl font-extrabold tracking-tight text-primary sm:text-4xl font-display flex items-baseline">
                <AnimatedCounter end={metric.value} suffix={metric.suffix} />
              </dd>
              <dt className="mt-2.5 text-[10px] font-bold uppercase tracking-wider text-muted-foreground font-sans">
                {metric.label}
              </dt>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
