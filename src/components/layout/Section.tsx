import { cn } from "@/lib/utils";

type SectionProps = {
  id: string;
  children: React.ReactNode;
  className?: string;
  muted?: boolean;
};

export function Section({ id, children, className, muted }: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "scroll-mt-16 overflow-x-hidden py-10 sm:scroll-mt-20 sm:py-14 md:py-16",
        muted && "border-y border-border/60 bg-muted/20",
        className
      )}
    >
      <div className="container mx-auto w-full max-w-6xl px-3.5 sm:px-6">{children}</div>
    </section>
  );
}
