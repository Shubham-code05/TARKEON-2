import { Icon } from "@/components/Icon";
import { whatsappLink } from "@/lib/utils";

/** Sticky WhatsApp button on tablets and desktops. Phones get <MobileActionBar /> instead. */
export function WhatsAppFloat() {
  return (
    <a
      href={whatsappLink("Hi Tarkeon, I have a question.")}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Tarkeon on WhatsApp (opens in a new tab)"
      className="group fixed right-4 bottom-4 z-40 hidden md:flex h-14 items-center gap-2 rounded-full bg-whatsapp pr-5 pl-4 text-white shadow-[0_12px_32px_-8px_rgb(16_24_40/0.3)] transition hover:-translate-y-0.5 hover:bg-[#0c6636] motion-reduce:hover:translate-y-0 md:right-6 md:bottom-6"
    >
      <Icon name="whatsapp" size={24} strokeWidth={1.8} />
      <span className="text-sm font-semibold">WhatsApp us</span>
    </a>
  );
}
