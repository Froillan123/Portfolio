import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  title: string;
  description?: string;
  className?: string;
};

export function SectionHeading({ title, description, className }: SectionHeadingProps) {
  return (
    <div className={cn("mb-8 flex flex-col gap-2 sm:mb-10 sm:gap-3", className)}>
      <div className="flex items-start gap-2 sm:items-center sm:gap-3">
        <span className="mt-1 h-6 w-1 shrink-0 rounded-full bg-foreground sm:mt-0 sm:h-8" aria-hidden />
        <h2 className="text-xl font-semibold tracking-tight sm:text-2xl md:text-3xl">{title}</h2>
      </div>
      {description ? (
        <p className="max-w-2xl pl-3 text-sm text-muted-foreground sm:pl-7 sm:text-base">
          {description}
        </p>
      ) : null}
    </div>
  );
}
