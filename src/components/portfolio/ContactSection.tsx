import { useState } from "react";
import { Check, Copy, Github, Linkedin, Mail, Phone } from "lucide-react";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/portfolio/SectionHeading";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { profile } from "@/constants/profile";
import { toast } from "sonner";

export function ContactSection() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      toast.success("Email copied to clipboard");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Could not copy email");
    }
  };

  return (
    <Section id="contact">
      <SectionHeading
        title="Contact"
        description="Open to cloud, platform, DevOps, and cloud security engineering roles."
      />

      <div className="max-w-2xl mx-auto text-center w-full">
        <Card className="border-border/70 bg-card/60 backdrop-blur-md shadow-md p-4 sm:p-6 md:p-7 rounded-xl sm:rounded-2xl">
          <CardContent className="flex flex-col items-center gap-4 p-0">
            <p className="text-sm sm:text-base text-muted-foreground max-w-lg leading-relaxed font-normal">
              Feel free to reach out for role opportunities, technical discussions, or collaboration.
            </p>

            {/* Direct Contact Links */}
            <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 w-full">
              <Button
                variant="outline"
                size="sm"
                className="rounded-full gap-2 text-xs sm:text-sm font-semibold shadow-xs hover:border-primary/40 h-9 sm:h-10 px-4"
                onClick={copyEmail}
              >
                {copied ? <Check className="size-4 text-emerald-500" /> : <Copy className="size-4" />}
                <span>{profile.email}</span>
              </Button>

              <Button
                variant="outline"
                size="sm"
                className="rounded-full gap-2 text-xs sm:text-sm font-semibold shadow-xs hover:border-primary/40 h-9 sm:h-10 px-4"
                onClick={() => window.open(profile.linkedin, "_blank")}
              >
                <Linkedin className="size-4" />
                <span>LinkedIn</span>
              </Button>

              <Button
                variant="outline"
                size="sm"
                className="rounded-full gap-2 text-xs sm:text-sm font-semibold shadow-xs hover:border-primary/40 h-9 sm:h-10 px-4"
                onClick={() => window.open(profile.github, "_blank")}
              >
                <Github className="size-4" />
                <span>GitHub</span>
              </Button>

              <Button
                variant="outline"
                size="sm"
                className="rounded-full gap-2 text-xs sm:text-sm font-semibold shadow-xs hover:border-primary/40 h-9 sm:h-10 px-4"
                onClick={() => window.open(`tel:${profile.phone}`)}
              >
                <Phone className="size-4" />
                <span>{profile.phone}</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </Section>
  );
}
