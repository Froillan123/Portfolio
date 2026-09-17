import { Link } from "react-router-dom";
import { ArrowRight, HeartHandshake, Server, ShieldCheck, Sparkles } from "lucide-react";
import { HeroSection } from "@/components/portfolio/HeroSection";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ecosystemOverview } from "@/constants/projects";
import { securityAssessment, originStory } from "@/constants/profile";

export default function HomePage() {
  return (
    <div className="flex flex-col gap-12 sm:gap-16 pb-16">
      {/* Hero Section */}
      <HeroSection />

      {/* Featured Overview & Gateway Cards */}
      <section className="container mx-auto max-w-6xl px-3.5 sm:px-6">
        <div className="flex flex-col gap-2 mb-8 text-center sm:text-left">
          <Badge
            variant="secondary"
            className="w-fit mx-auto sm:mx-0 gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary font-display"
          >
            <Sparkles className="size-3.5 text-primary" />
            <span>Portfolio Sections & Deep Dives</span>
          </Badge>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-display tracking-tight text-foreground">
            Explore Engineering Work & Audits
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base max-w-2xl">
            Navigate through the complete origin mission, 4-tier cloud platform architecture, and authorized infrastructure security assessments.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {/* 1. Why I Built FaceOfMind Card (About) */}
          <Card className="flex flex-col justify-between border-border/70 bg-card/60 backdrop-blur-md shadow-sm hover:shadow-md hover:border-primary/40 transition-all duration-200 rounded-xl sm:rounded-2xl overflow-hidden group">
            <div>
              <CardHeader className="p-4 sm:p-5 pb-2">
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex size-9 sm:size-10 items-center justify-center rounded-xl bg-primary/10 border border-primary/20 text-primary group-hover:bg-primary/20 transition-colors">
                    <HeartHandshake className="size-4 sm:size-5" />
                  </div>
                  <Badge variant="outline" className="rounded-full text-[10px] font-mono uppercase bg-primary/5 text-primary border-primary/20 px-2 py-0.5">
                    Origin Mission
                  </Badge>
                </div>
                <CardTitle className="text-base sm:text-lg font-bold font-display text-foreground group-hover:text-primary transition-colors">
                  Why I Built FaceOfMind
                </CardTitle>
                <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                  From Personal Survival to Mission-Driven Platform Engineering.
                </p>
              </CardHeader>
              <CardContent className="p-4 sm:p-5 pt-0 text-xs sm:text-sm text-muted-foreground leading-relaxed space-y-2">
                <p className="line-clamp-3">
                  {originStory.personalIntro}
                </p>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {["1:125,000 Ratio", "Data Minimization", "Zero-Trust", "RA 10173"].map((tag) => (
                    <span key={tag} className="text-[10px] font-mono px-2 py-0.5 rounded bg-muted/60 text-foreground/80 border border-border/50">
                      {tag}
                    </span>
                  ))}
                </div>
              </CardContent>
            </div>
            <CardFooter className="p-4 sm:p-5 pt-0">
              <Button asChild size="sm" variant="outline" className="w-full rounded-full font-semibold text-xs sm:text-sm gap-1.5 h-9 hover:bg-muted/60">
                <Link to="/about">
                  <span>Read Full Origin Story</span>
                  <ArrowRight className="size-3.5" />
                </Link>
              </Button>
            </CardFooter>
          </Card>

          {/* 2. Platform Architecture Card (Platform) */}
          <Card className="flex flex-col justify-between border-border/70 bg-card/60 backdrop-blur-md shadow-sm hover:shadow-md hover:border-primary/40 transition-all duration-200 rounded-xl sm:rounded-2xl overflow-hidden group">
            <div>
              <CardHeader className="p-4 sm:p-5 pb-2">
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex size-9 sm:size-10 items-center justify-center rounded-xl bg-primary/10 border border-primary/20 text-primary group-hover:bg-primary/20 transition-colors">
                    <Server className="size-4 sm:size-5" />
                  </div>
                  <Badge variant="outline" className="rounded-full text-[10px] font-mono uppercase bg-primary/5 text-primary border-primary/20 px-2 py-0.5">
                    4-Tier System
                  </Badge>
                </div>
                <CardTitle className="text-base sm:text-lg font-bold font-display text-foreground group-hover:text-primary transition-colors">
                  Platform Architecture
                </CardTitle>
                <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                  FaceOfMind Distributed Cloud Infrastructure on Google Cloud.
                </p>
              </CardHeader>
              <CardContent className="p-4 sm:p-5 pt-0 text-xs sm:text-sm text-muted-foreground leading-relaxed space-y-2">
                <p className="line-clamp-3">
                  {ecosystemOverview.description}
                </p>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {["Go Gateway", "Cloud KMS", "GitOps", "Cloud Run"].map((tag) => (
                    <span key={tag} className="text-[10px] font-mono px-2 py-0.5 rounded bg-muted/60 text-foreground/80 border border-border/50">
                      {tag}
                    </span>
                  ))}
                </div>
              </CardContent>
            </div>
            <CardFooter className="p-4 sm:p-5 pt-0">
              <Button asChild size="sm" className="w-full rounded-full font-semibold text-xs sm:text-sm gap-1.5 h-9">
                <Link to="/platform">
                  <span>Explore Platform & Subsystems</span>
                  <ArrowRight className="size-3.5" />
                </Link>
              </Button>
            </CardFooter>
          </Card>

          {/* 3. Security Audit Card (Security) */}
          <Card className="flex flex-col justify-between border-border/70 bg-card/60 backdrop-blur-md shadow-sm hover:shadow-md hover:border-primary/40 transition-all duration-200 rounded-xl sm:rounded-2xl overflow-hidden group">
            <div>
              <CardHeader className="p-4 sm:p-5 pb-2">
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex size-9 sm:size-10 items-center justify-center rounded-xl bg-primary/10 border border-primary/20 text-primary group-hover:bg-primary/20 transition-colors">
                    <ShieldCheck className="size-4 sm:size-5" />
                  </div>
                  <Badge variant="outline" className="rounded-full text-[10px] font-mono uppercase bg-primary/5 text-primary border-primary/20 px-2 py-0.5">
                    15+ Findings
                  </Badge>
                </div>
                <CardTitle className="text-base sm:text-lg font-bold font-display text-foreground group-hover:text-primary transition-colors">
                  Cloud Security Audit
                </CardTitle>
                <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                  Authorized AWS Infrastructure Cost & Vulnerability Assessment.
                </p>
              </CardHeader>
              <CardContent className="p-4 sm:p-5 pt-0 text-xs sm:text-sm text-muted-foreground leading-relaxed space-y-2">
                <p className="line-clamp-3">
                  {securityAssessment.narrative}
                </p>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {["S3 Hardening", "IAM Wildcards", "VPC Subnets", "RA 10173"].map((tag) => (
                    <span key={tag} className="text-[10px] font-mono px-2 py-0.5 rounded bg-muted/60 text-foreground/80 border border-border/50">
                      {tag}
                    </span>
                  ))}
                </div>
              </CardContent>
            </div>
            <CardFooter className="p-4 sm:p-5 pt-0">
              <Button asChild size="sm" variant="secondary" className="w-full rounded-full font-semibold text-xs sm:text-sm gap-1.5 h-9 bg-primary/10 text-primary hover:bg-primary/20 border border-primary/20">
                <Link to="/security">
                  <span>Inspect Security Findings</span>
                  <ArrowRight className="size-3.5" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </section>
    </div>
  );
}
