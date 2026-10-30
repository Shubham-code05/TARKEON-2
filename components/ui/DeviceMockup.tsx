import Image from "next/image";
import type { ProjectMockup } from "@/content/types";
import { cn } from "@/lib/utils";

type DeviceMockupProps = ProjectMockup & {
  /** Describes the website shown. The phone repeats the same site, so it stays decorative. */
  alt: string;
  priority?: boolean;
  sizes?: string;
  className?: string;
};

const bezel = "border border-line-strong bg-surface-3";

/**
 * A laptop with the desktop screenshot and a phone overlapping it. Frames are plain CSS.
 * On hover the laptop screen scrolls through the page, inside this figure or any parent
 * marked with the "group" class (cards use a stretched link that sits on top of it).
 */
export function DeviceMockup({ desktop, mobile, alt, priority, sizes = "(min-width: 1024px) 50vw, 100vw", className }: DeviceMockupProps) {
  return (
    <figure className={cn("group/mockup relative pr-[7%] pb-[4%]", className)}>
      <div className={cn("rounded-t-[3%] p-[1.4%] pb-[1.8%] shadow-card", bezel)}>
        <div className="relative aspect-[16/10] overflow-hidden rounded-[1%] bg-surface [container-type:size]">
          <Image
            src={desktop.src}
            alt={alt}
            width={desktop.width}
            height={desktop.height}
            priority={priority}
            quality={65}
            sizes={sizes}
            className="absolute top-0 left-0 h-auto w-full transition-transform duration-[6s] ease-in-out motion-safe:group-hover:translate-y-[calc(-100%+100cqh)] motion-safe:group-hover/mockup:translate-y-[calc(-100%+100cqh)]"
          />
        </div>
      </div>
      <div aria-hidden="true" className="relative -mx-[3.5%] h-[0.5rem] rounded-b-lg border border-t-0 border-line-strong bg-line">
        <span className="absolute top-0 left-1/2 h-1 w-[14%] -translate-x-1/2 rounded-b bg-line-strong" />
      </div>

      <div
        aria-hidden="true"
        className={cn(
          "absolute right-0 bottom-0 aspect-[390/844] w-[23%] rounded-[12%/5.6%] p-[1.2%] shadow-[0_14px_28px_-12px_rgb(16_24_40/0.4)]",
          bezel,
        )}
      >
        <div className="relative h-full overflow-hidden rounded-[10%/4.8%] bg-surface">
          <Image src={mobile.src} alt="" fill sizes="(min-width: 1024px) 12vw, 25vw" className="object-cover object-top" />
        </div>
      </div>
    </figure>
  );
}
