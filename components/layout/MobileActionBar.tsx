import Link from "next/link";
import { Icon } from "@/components/Icon";
import { cn, telLink, whatsappLink } from "@/lib/utils";

/** Sticky bottom bar on phones: call, WhatsApp and estimate. Desktop uses the floating button. */
export function MobileActionBar() {
  const tel = telLink();
  return (
    <nav
      aria-label="Quick actions"
      className={cn(
        "fixed inset-x-0 bottom-0 z-40 grid gap-2",
        tel ? "grid-cols-[auto_1fr_1fr]" : "grid-cols-2",
        "border-t border-line bg-bg/90 p-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] backdrop-blur-xl md:hidden",
      )}
    >
      {tel && (
        <a
          href={tel}
          className="flex min-h-12 items-center justify-center gap-1.5 rounded-md border border-line bg-surface px-4 text-[0.9375rem] font-semibold text-fg"
        >
          <Icon name="phone" size={18} /> Call
        </a>
      )}
      <a
        href={whatsappLink("Hi Tarkeon, I have a question.")}
        target="_blank"
        rel="noopener noreferrer"
        className="flex min-h-12 items-center justify-center gap-2 rounded-md bg-whatsapp text-[0.9375rem] font-semibold text-white"
      >
        <Icon name="whatsapp" size={20} /> WhatsApp
      </a>
      <Link
        href="/pricing#calculator"
        className="flex min-h-12 items-center justify-center gap-2 rounded-md bg-accent text-[0.9375rem] font-semibold text-white"
      >
        <Icon name="rupee" size={18} /> Get estimate
      </Link>
    </nav>
  );
}
