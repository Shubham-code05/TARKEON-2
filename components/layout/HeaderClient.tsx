"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { Icon, type IconName } from "@/components/Icon";
import { Logo } from "@/components/Logo";
import { buttonClasses } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export type MenuItem = { href: string; title: string; text: string; icon: IconName };
export type MenuGroup = { title: string; href: string; allLabel: string; items: MenuItem[] };
type NavLink = { label: string; href: string; menu?: "services" | "industries" };

type HeaderClientProps = {
  nav: NavLink[];
  menus: Record<"services" | "industries", MenuGroup>;
  whatsappHref: string;
};

export function HeaderClient({ nav, menus, whatsappHref }: HeaderClientProps) {
  const pathname = usePathname();
  const [openMenu, setOpenMenu] = useState<"services" | "industries" | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const navRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  // Close everything when the route changes
  useEffect(() => {
    setOpenMenu(null);
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Escape closes menus; clicking outside closes the dropdown
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key !== "Escape") return;
      if (mobileOpen) {
        setMobileOpen(false);
        toggleRef.current?.focus();
      }
      setOpenMenu(null);
    }
    function onClick(e: MouseEvent) {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setOpenMenu(null);
    }
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [mobileOpen]);

  // Lock page scroll behind the full-screen mobile menu
  useEffect(() => {
    document.documentElement.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [mobileOpen]);

  const openWithHover = useCallback((menu: "services" | "industries") => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenMenu(menu);
  }, []);
  const closeWithDelay = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpenMenu(null), 150);
  }, []);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`));

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 border-b transition-colors duration-300",
          scrolled || mobileOpen || openMenu
            ? "border-line bg-bg/85 backdrop-blur-xl"
            : "border-transparent bg-bg/40 backdrop-blur-md",
        )}
      >
        <nav ref={navRef} aria-label="Main" className="container-site flex h-16 items-center justify-between gap-4 md:h-[4.5rem]">
          <Link href="/" className="rounded-md" aria-label="Tarkeon home">
            <Logo size={30} id="header" />
          </Link>

          {/* Desktop navigation */}
          <ul className="hidden items-center gap-1 lg:flex">
            {nav.map((item) => {
              if (item.menu) {
                const group = menus[item.menu];
                const open = openMenu === item.menu;
                const menuId = `menu-${item.menu}`;
                return (
                  <li
                    key={item.href}
                    className="relative"
                    onMouseEnter={() => openWithHover(item.menu!)}
                    onMouseLeave={closeWithDelay}
                  >
                    <button
                      type="button"
                      aria-expanded={open}
                      aria-controls={menuId}
                      onClick={() => setOpenMenu(open ? null : item.menu!)}
                      className={cn(
                        "flex min-h-11 items-center gap-1 rounded-md px-3 text-[0.9375rem] font-medium transition-colors hover:text-fg",
                        isActive(item.href) || open ? "text-fg" : "text-fg-2",
                      )}
                    >
                      {item.label}
                      <Icon
                        name="chevron-down"
                        size={16}
                        className={cn("transition-transform duration-200", open && "rotate-180")}
                      />
                    </button>
                    <div
                      id={menuId}
                      hidden={!open}
                      className="absolute top-full left-1/2 w-[min(46rem,calc(100vw-3rem))] -translate-x-1/2 pt-3"
                    >
                      <div className="grid grid-cols-[1fr_14rem] overflow-hidden rounded-xl border border-line-strong bg-surface shadow-glow">
                        <ul className="grid grid-cols-2 gap-1 p-3">
                          {group.items.map((link) => (
                            <li key={link.href}>
                              <Link
                                href={link.href}
                                className="group flex gap-3 rounded-lg p-3 transition-colors hover:bg-surface-2"
                              >
                                <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-md border border-line-strong bg-surface-2 text-accent group-hover:text-accent-hover">
                                  <Icon name={link.icon} size={18} />
                                </span>
                                <span className="flex flex-col gap-0.5">
                                  <span className="text-sm font-semibold text-fg">{link.title}</span>
                                  <span className="line-clamp-2 text-[0.8125rem] leading-snug text-muted">{link.text}</span>
                                </span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                        <div className="flex flex-col justify-between gap-4 border-l border-line bg-surface-2/60 p-5">
                          <div>
                            <p className="font-display text-base font-semibold text-fg">Not sure what you need?</p>
                            <p className="mt-1.5 text-[0.8125rem] leading-relaxed text-muted">
                              Tell us about your business. We’ll suggest what helps most, free.
                            </p>
                          </div>
                          <div className="flex flex-col gap-2">
                            <Link href="/contact" className={buttonClasses("primary", "sm", "w-full")}>
                              Free consultation
                            </Link>
                            <Link href={group.href} className={buttonClasses("ghost", "sm", "w-full")}>
                              {group.allLabel} <Icon name="arrow" size={14} />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                );
              }
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className={cn(
                      "flex min-h-11 items-center rounded-md px-3 text-[0.9375rem] font-medium transition-colors hover:text-fg",
                      isActive(item.href) ? "text-fg" : "text-fg-2",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2">
            <Link href="/contact" className={buttonClasses("primary", "sm", "hidden sm:inline-flex")}>
              Free consultation
            </Link>
            <button
              ref={toggleRef}
              type="button"
              className="flex size-11 items-center justify-center rounded-md border border-line-strong bg-surface text-fg lg:hidden"
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              onClick={() => setMobileOpen((v) => !v)}
            >
              <Icon name={mobileOpen ? "x" : "menu"} size={20} />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile full-screen menu. Lives outside <header>: its backdrop-filter would trap position: fixed. */}
      <div
        id="mobile-menu"
        hidden={!mobileOpen}
        className="fixed inset-x-0 top-16 bottom-0 z-50 overflow-y-auto overscroll-contain bg-bg md:top-[4.5rem] lg:hidden"
      >
        <div className="container-site flex min-h-full flex-col gap-2 py-6">
          {nav.map((item) =>
            item.menu ? (
              <details key={item.href} className="group/m border-b border-line">
                <summary className="flex min-h-14 cursor-pointer items-center justify-between font-display text-2xl font-semibold text-fg">
                  {item.label}
                  <Icon name="chevron-down" size={22} className="text-muted transition-transform group-open/m:rotate-180" />
                </summary>
                <ul className="flex flex-col gap-1 pb-4">
                  {menus[item.menu].items.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className="flex min-h-12 items-center gap-3 rounded-md px-1 text-fg-2 hover:text-fg">
                        <Icon name={link.icon} size={18} className="text-accent" />
                        {link.title}
                      </Link>
                    </li>
                  ))}
                  <li>
                    <Link href={item.href} className="flex min-h-12 items-center gap-2 px-1 font-medium text-accent">
                      {menus[item.menu].allLabel} <Icon name="arrow" size={16} />
                    </Link>
                  </li>
                </ul>
              </details>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className="flex min-h-14 items-center border-b border-line font-display text-2xl font-semibold text-fg"
              >
                {item.label}
              </Link>
            ),
          )}
          <Link
            href="/contact"
            className="flex min-h-14 items-center border-b border-line font-display text-2xl font-semibold text-fg"
          >
            Contact
          </Link>
          <div className="mt-auto flex flex-col gap-3 pt-8">
            <Link href="/contact" className={buttonClasses("primary", "lg", "w-full")}>
              Book a free consultation
            </Link>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonClasses("secondary", "lg", "w-full")}
            >
              <Icon name="whatsapp" size={18} /> Chat on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
