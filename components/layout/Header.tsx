import { industries } from "@/content/industries";
import { services } from "@/content/services";
import { mainNav } from "@/content/site";
import { whatsappLink } from "@/lib/utils";
import { HeaderClient, type MenuGroup } from "./HeaderClient";

/** Server wrapper: passes only the small slice of content the menu needs to the client. */
export function Header() {
  const menus: Record<"services" | "industries", MenuGroup> = {
    services: {
      title: "Services",
      href: "/services",
      allLabel: "All services",
      items: services.map((s) => ({ href: `/services/${s.slug}`, title: s.shortTitle, text: s.summary, icon: s.icon })),
    },
    industries: {
      title: "Industries",
      href: "/industries",
      allLabel: "All industries",
      items: industries.map((i) => ({ href: `/industries/${i.slug}`, title: i.name, text: i.summary, icon: i.icon })),
    },
  };
  return <HeaderClient nav={mainNav} menus={menus} whatsappHref={whatsappLink("Hi Tarkeon, I'd like to know more.")} />;
}
