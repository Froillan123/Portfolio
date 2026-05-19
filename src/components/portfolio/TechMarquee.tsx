import type { SkillItem } from "@/constants/skills";
import { getSkillIconSrc } from "@/constants/skills";
import { cn } from "@/lib/utils";

type TechMarqueeProps = {
  items: SkillItem[];
  reverse?: boolean;
  duration?: number;
};

function MarqueeLogo({ item }: { item: SkillItem }) {
  const src = getSkillIconSrc(item);

  return (
    <div className="flex shrink-0 items-center gap-3 px-3 sm:gap-3.5 sm:px-4">
      {src ? (
        <img
          src={src}
          alt=""
          width={32}
          height={32}
          className="h-7 w-auto max-w-[2rem] object-contain opacity-55 grayscale sm:h-8 sm:max-w-[2.25rem]"
          loading="lazy"
        />
      ) : null}
      <span className="whitespace-nowrap text-base font-semibold tracking-tight text-foreground/55 sm:text-lg">
        {item.name}
      </span>
    </div>
  );
}

export function TechMarquee({ items, reverse = false, duration = 38 }: TechMarqueeProps) {
  const track = [...items, ...items];

  return (
    <div
      className="group relative overflow-hidden"
      style={{ "--marquee-duration": `${duration}s` } as React.CSSProperties}
    >
      <div
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-background via-background/80 to-transparent sm:w-20 md:w-28"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-background via-background/80 to-transparent sm:w-20 md:w-28"
        aria-hidden
      />

      <div
        className={cn(
          "flex w-max items-center py-2 group-hover:[animation-play-state:paused] sm:py-3",
          reverse ? "animate-marquee-reverse" : "animate-marquee"
        )}
      >
        {track.map((item, index) => (
          <MarqueeLogo key={`${item.name}-${index}`} item={item} />
        ))}
      </div>
    </div>
  );
}
