import { ExperienceSection } from "@/components/portfolio/ExperienceSection";
import { Badge } from "@/components/ui/badge";
import { ShieldCheck } from "lucide-react";

export default function SecurityPage() {
  return (
    <div className="pt-20 sm:pt-24 pb-16 min-h-[calc(100vh-80px)]">
      <div className="container mx-auto max-w-6xl px-3.5 sm:px-6 mb-6">
        <div className="flex items-center gap-2 mb-2">
          <Badge
            variant="secondary"
            className="gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary font-display"
          >
            <ShieldCheck className="size-3.5 text-primary" />
            <span>Infrastructure & Cloud Security</span>
          </Badge>
        </div>
      </div>
      <ExperienceSection />
    </div>
  );
}
