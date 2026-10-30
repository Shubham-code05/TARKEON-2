import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/utils";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "whatsapp" | "light";
export type ButtonSize = "sm" | "md" | "lg";

const base =
  "group/btn relative inline-flex items-center justify-center gap-2 rounded-md py-2 text-center font-semibold sm:whitespace-nowrap " +
  "transition duration-200 ease-out-soft select-none disabled:pointer-events-none disabled:opacity-60 " +
  "hover:-translate-y-px motion-reduce:hover:translate-y-0";

const variants: Record<ButtonVariant, string> = {
  primary: "bg-accent text-white shadow-button hover:bg-accent-hover",
  secondary: "border border-line-strong bg-surface text-fg hover:border-accent/50 hover:bg-surface-2",
  ghost: "text-fg-2 hover:bg-surface-2 hover:text-fg",
  whatsapp: "bg-whatsapp text-white hover:bg-[#0c6636]",
  light: "bg-white text-ink hover:bg-white/90",
};

const sizes: Record<ButtonSize, string> = {
  sm: "min-h-10 px-4 text-sm",
  md: "min-h-12 px-5 text-[0.9375rem]",
  lg: "min-h-14 px-7 text-base",
};

type CommonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: ReactNode;
};

type ButtonAsLink = CommonProps & { href: string; external?: boolean } & Omit<
    ComponentPropsWithoutRef<"a">,
    "href" | "className" | "children"
  >;
type ButtonAsButton = CommonProps & { href?: undefined } & Omit<ComponentPropsWithoutRef<"button">, "className" | "children">;

export function buttonClasses(variant: ButtonVariant = "primary", size: ButtonSize = "md", className?: string) {
  return cn(base, variants[variant], sizes[size], className);
}

export function Button(props: ButtonAsLink | ButtonAsButton) {
  const { variant = "primary", size = "md", className, children } = props;
  const classes = buttonClasses(variant, size, className);

  if (props.href !== undefined) {
    const { href, external, variant: _v, size: _s, className: _c, children: _ch, ...rest } = props;
    const isExternal = external ?? /^(https?:|mailto:|tel:)/.test(href);
    if (isExternal) {
      const opensTab = href.startsWith("http");
      return (
        <a
          href={href}
          className={classes}
          {...(opensTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          {...rest}
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} {...rest}>
        {children}
      </Link>
    );
  }

  const { variant: _v, size: _s, className: _c, children: _ch, type = "button", ...rest } = props;
  return (
    <button type={type} className={classes} {...rest}>
      {children}
    </button>
  );
}
