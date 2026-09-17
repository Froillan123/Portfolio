import { Link } from "react-router-dom";
import { Github, Linkedin, Mail } from "lucide-react";
import { profile } from "@/constants/profile";
import { navigationItems } from "@/constants/navigationItems";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border/60 bg-muted/20 py-10 sm:py-12">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex flex-col items-center sm:items-start text-center sm:text-left gap-1">
          <p className="text-sm font-bold font-display text-foreground">
            {profile.name}
          </p>
          <p className="text-xs text-muted-foreground">
            {profile.title} · {profile.school} ({profile.schoolDates})
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            © {year} {profile.name}. All rights reserved.
          </p>
        </div>

        {/* Quick Nav Links */}
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-muted-foreground">
          {navigationItems.map((item) => (
            <Link
              key={item.id}
              to={item.path}
              className="hover:text-primary transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Social Icons */}
        <div className="flex items-center gap-3">
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full border border-border/60 bg-background/80 text-muted-foreground hover:text-primary hover:border-primary/40 transition-all shadow-xs"
            aria-label="GitHub Profile"
          >
            <Github className="size-4" />
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full border border-border/60 bg-background/80 text-muted-foreground hover:text-primary hover:border-primary/40 transition-all shadow-xs"
            aria-label="LinkedIn Profile"
          >
            <Linkedin className="size-4" />
          </a>
          <a
            href={`mailto:${profile.email}`}
            className="p-2 rounded-full border border-border/60 bg-background/80 text-muted-foreground hover:text-primary hover:border-primary/40 transition-all shadow-xs"
            aria-label="Send Email"
          >
            <Mail className="size-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}
