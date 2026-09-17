import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, Server, ShieldCheck, HeartHandshake, Mail, Home } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { ThemeToggle } from "@/components/ThemeToggle";
import { navigationItems } from "@/constants/navigationItems";
import { profile } from "@/constants/profile";
import { cn } from "@/lib/utils";

const nameParts = profile.name.split(" ").filter(Boolean);
const initials = `${nameParts[0]?.[0] || "F"}${nameParts[nameParts.length - 1]?.[0] || "E"}`;

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const isCurrentActive = (path: string) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <header className="safe-top fixed inset-x-0 top-0 z-50 px-3 pt-2 sm:px-4 sm:pt-4 md:px-6">
      <div className="container mx-auto flex h-11 max-w-5xl items-center justify-between gap-2 rounded-full border border-border/50 bg-background/70 px-3 shadow-lg backdrop-blur-xl sm:h-12 sm:px-4 sm:gap-3">
        {/* Logo / Avatar Link */}
        <Link
          to="/"
          className="flex min-w-0 shrink-0 items-center gap-2 rounded-full px-2 py-1 transition-colors hover:bg-muted/40 sm:gap-2.5"
        >
          <Avatar className="size-6 border border-border/60 sm:size-7">
            <AvatarImage src={profile.imageUrl} alt={profile.name} />
            <AvatarFallback className="text-[9px] sm:text-xs">{initials}</AvatarFallback>
          </Avatar>
          <span className="truncate text-xs font-bold tracking-tight sm:text-sm font-display text-foreground/95">
            {profile.shortName}
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav
          className="hidden items-center gap-0.5 rounded-full border border-border/60 bg-muted/20 p-0.5 lg:flex"
          aria-label="Primary Navigation"
        >
          {navigationItems.map((item) => {
            const active = isCurrentActive(item.path);

            return (
              <Link
                key={item.id}
                to={item.path}
                className={cn(
                  "rounded-full px-3.5 py-1 text-xs font-semibold tracking-wide transition-all duration-200 xl:px-4 xl:text-sm font-display",
                  active
                    ? "bg-background text-foreground shadow-sm border border-border/40"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Right Action Icons: Theme, Resume, Mobile Menu */}
        <div className="flex shrink-0 items-center gap-0.5 sm:gap-1">
          <ThemeToggle />
          <Button
            size="sm"
            className="hidden rounded-full md:inline-flex h-8 px-4 text-xs font-bold font-display"
            onClick={() => window.open(encodeURI(profile.resumePath), "_blank")}
          >
            Resume
          </Button>

          {/* Mobile Drawer Sheet */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button
                variant="outline"
                size="icon"
                className="size-8 rounded-full sm:size-9"
                aria-label="Open navigation menu"
              >
                <Menu className="size-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[min(100vw-1.5rem,20rem)] p-4 sm:p-6">
              <SheetHeader className="text-left">
                <div className="flex items-center gap-3">
                  <Avatar className="size-12 border border-border">
                    <AvatarImage src={profile.imageUrl} alt={profile.name} />
                    <AvatarFallback>{initials}</AvatarFallback>
                  </Avatar>
                  <div className="min-w-0">
                    <SheetTitle className="text-base font-bold font-display">{profile.shortName}</SheetTitle>
                    <p className="truncate text-xs text-muted-foreground">{profile.title}</p>
                  </div>
                </div>
              </SheetHeader>

              <nav className="mt-6 flex flex-col gap-1.5" aria-label="Mobile Navigation">
                {navigationItems.map((item) => {
                  const active = isCurrentActive(item.path);
                  return (
                    <Link
                      key={item.id}
                      to={item.path}
                      onClick={() => setMobileOpen(false)}
                      className={cn(
                        "flex items-center justify-between rounded-xl px-3.5 py-2.5 text-sm font-semibold transition-colors",
                        active
                          ? "bg-primary text-primary-foreground font-bold shadow-sm"
                          : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
                      )}
                    >
                      <span>{item.label}</span>
                      {item.id === "home" && <Home className="size-4 opacity-70" />}
                      {item.id === "about" && <HeartHandshake className="size-4 opacity-70" />}
                      {item.id === "platform" && <Server className="size-4 opacity-70" />}
                      {item.id === "security" && <ShieldCheck className="size-4 opacity-70" />}
                      {item.id === "contact" && <Mail className="size-4 opacity-70" />}
                    </Link>
                  );
                })}

                <Separator className="my-3 bg-border/60" />

                <Button
                  className="w-full rounded-full font-semibold text-xs sm:text-sm h-10"
                  onClick={() => {
                    window.open(encodeURI(profile.resumePath), "_blank");
                    setMobileOpen(false);
                  }}
                >
                  Download Resume
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
