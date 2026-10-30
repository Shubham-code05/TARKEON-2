import Link from "next/link";
import { Icon } from "@/components/Icon";
import { whatsappLink } from "@/lib/utils";

/** Sticky bottom bar on phones: the two actions people want most. Desktop uses the floating button. */
export function MobileActionBar() {
  return (
    <nav
      aria-label="Quick actions"
      className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 gap-2 border-t border-line bg-bg/90 p-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] backdrop-blur-xl md:hidden"
    >
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
