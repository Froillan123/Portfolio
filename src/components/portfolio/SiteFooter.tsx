import { profile } from "@/constants/profile";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border py-8">
      <div className="container mx-auto max-w-6xl px-4 text-center text-sm text-muted-foreground sm:px-6">
        <p>
          © {year} {profile.name}. Built with React, TypeScript, and shadcn/ui.
        </p>
      </div>
    </footer>
  );
}
