import { useState } from "react";
import { Menu } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { ThemeToggle } from "@/components/ThemeToggle";
import { navigationItems } from "@/constants/navigationItems";
import { profile } from "@/constants/profile";
import { scrollToSection } from "@/hooks/use-active-section";
import { cn } from "@/lib/utils";

type SiteHeaderProps = {
  activeSection: string;
};

const initials = profile.name
  .split(" ")
  .map((part) => part[0])
  .join("")
  .slice(0, 2);

export function SiteHeader({ activeSection }: SiteHeaderProps) {
  const [open, setOpen] = useState(false);

  const navigate = (id: string) => {
    scrollToSection(id);
    setOpen(false);
  };

  return (
    <header className="safe-top fixed inset-x-0 top-0 z-50 px-3 pt-2 sm:px-4 sm:pt-4 md:px-6">
      <div className="container mx-auto flex h-12 max-w-6xl items-center justify-between gap-2 rounded-xl border border-border/60 bg-background/90 px-2 shadow-sm backdrop-blur-xl sm:h-14 sm:max-w-none sm:rounded-2xl sm:px-3 sm:gap-3 md:px-4">
        <button
          type="button"
          onClick={() => navigate("home")}
          className="flex min-w-0 shrink-0 items-center gap-2 rounded-lg px-1 py-1 transition-colors hover:bg-muted/60 sm:gap-2.5"
        >
          <Avatar className="size-7 border border-border sm:size-8">
            <AvatarImage src={profile.imageUrl} alt={profile.name} />
            <AvatarFallback className="text-[10px] sm:text-xs">{initials}</AvatarFallback>
          </Avatar>
          <span className="truncate text-xs font-semibold tracking-tight sm:text-sm">
            {profile.shortName}
          </span>
        </button>

        <nav
          className="hidden items-center gap-0.5 rounded-full border border-border/80 bg-muted/40 p-1 xl:flex"
          aria-label="Primary"
        >
          {navigationItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => navigate(item.id)}
                className={cn(
                  "rounded-full px-2.5 py-1.5 text-xs font-medium transition-all duration-200 lg:px-3.5 lg:text-sm",
                  isActive
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="flex shrink-0 items-center gap-0.5 sm:gap-1">
          <ThemeToggle />
          <Button
            size="sm"
            className="hidden rounded-full md:inline-flex"
            onClick={() => window.open(profile.resumePath, "_blank")}
          >
            Resume
          </Button>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild className="xl:hidden">
              <Button
                variant="outline"
                size="icon"
                className="size-8 rounded-full sm:size-9"
                aria-label="Open menu"
              >
                <Menu className="size-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[min(100vw-1.5rem,20rem)]">
              <SheetHeader className="text-left">
                <div className="flex items-center gap-3">
                  <Avatar className="size-12 border border-border">
                    <AvatarImage src={profile.imageUrl} alt={profile.name} />
                    <AvatarFallback>{initials}</AvatarFallback>
                  </Avatar>
                  <div className="min-w-0">
                    <SheetTitle className="text-base">{profile.shortName}</SheetTitle>
                    <p className="truncate text-xs text-muted-foreground">{profile.title}</p>
                  </div>
                </div>
              </SheetHeader>
              <nav className="mt-8 flex flex-col gap-1" aria-label="Mobile">
                {navigationItems.map((item) => {
                  const isActive = activeSection === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => navigate(item.id)}
                      className={cn(
                        "flex items-center rounded-xl px-3 py-2.5 text-left text-sm font-medium transition-colors",
                        isActive
                          ? "bg-primary text-primary-foreground"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground"
                      )}
                    >
                      {item.label}
                    </button>
                  );
                })}
                <Separator className="my-3" />
                <Button
                  className="w-full rounded-full"
                  onClick={() => {
                    window.open(profile.resumePath, "_blank");
                    setOpen(false);
                  }}
                >
                  Download resume
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
