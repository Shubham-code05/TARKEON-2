import Image from "next/image";
import { founderPhoto } from "@/lib/founder-photo";

/** public/images/about/founder.jpg as a circle, or a "T" placeholder until that file exists. */
export function FounderAvatar({ size }: { size: number }) {
  const src = founderPhoto();
  const box = { width: size, height: size };
  if (src) {
    return (
      <Image
        src={src}
        alt="Founder of Tarkeon"
        width={size * 2}
        height={size * 2}
        sizes={`${size}px`}
        style={box}
        className="shrink-0 rounded-full object-cover"
      />
    );
  }
  return (
    <span
      aria-hidden="true"
      style={{ ...box, fontSize: size * 0.42 }}
      className="flex shrink-0 items-center justify-center rounded-full bg-brand font-display font-bold text-white"
    >
      T
    </span>
  );
}
