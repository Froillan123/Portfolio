import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  title: string;
  description?: string;
  className?: string;
};

export function SectionHeading({ title, description, className }: SectionHeadingProps) {
  return (
    <div className={cn("mb-5 sm:mb-7 flex flex-col gap-1.5 sm:gap-2", className)}>
      <div className="flex items-center gap-2 sm:gap-2.5">
        <span className="h-5 w-1 shrink-0 rounded-full bg-primary sm:h-6" aria-hidden />
        <h2 className="text-lg font-bold font-display tracking-tight sm:text-2xl md:text-3xl text-foreground">
          {title}
        </h2>
      </div>
      {description ? (
        <p className="max-w-3xl pl-3 text-sm sm:text-base text-muted-foreground sm:pl-3.5 leading-relaxed font-normal">
          {description}
        </p>
      ) : null}
    </div>
  );
}
