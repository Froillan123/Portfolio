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
        "scroll-mt-[5.5rem] overflow-x-hidden py-14 sm:scroll-mt-28 sm:py-20 md:py-24",
        muted && "border-y border-border/60 bg-muted/30",
        className
      )}
    >
      <div className="container mx-auto w-full max-w-6xl px-4 sm:px-6">{children}</div>
    </section>
  );
}
