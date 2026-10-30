import type { ReactNode } from "react";

const paths = {
  monitor: (
    <>
      <rect x="3" y="4" width="18" height="13" rx="2" />
      <path d="M8 21h8M12 17v4" />
    </>
  ),
  code: <path d="M8 6l-6 6 6 6M16 6l6 6-6 6M14 4l-4 16" />,
  chat: (
    <>
      <path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z" />
      <path d="M8.5 12h.01M12 12h.01M15.5 12h.01" />
    </>
  ),
  bolt: <path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z" />,
  layout: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M3 9h18M9 21V9" />
    </>
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="7" />
      <path d="M20 20l-3.5-3.5" />
    </>
  ),
  arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
  "arrow-up-right": <path d="M7 17L17 7M8 7h9v9" />,
  check: <path d="M5 12l5 5 9-10" />,
  x: <path d="M6 6l12 12M18 6L6 18" />,
  minus: <path d="M5 12h14" />,
  plus: <path d="M12 5v14M5 12h14" />,
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  "chevron-down": <path d="M6 9l6 6 6-6" />,
  "chevron-right": <path d="M9 6l6 6-6 6" />,
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 6 9-6" />
    </>
  ),
  "map-pin": (
    <>
      <path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z" />
      <circle cx="12" cy="9.5" r="2.5" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </>
  ),
  calendar: (
    <>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M3 10h18M8 3v4M16 3v4" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3l8 3v6c0 4.5-3.4 8.3-8 9-4.6-.7-8-4.5-8-9V6l8-3z" />
      <path d="M9 12l2 2 4-4" />
    </>
  ),
  file: (
    <>
      <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5z" />
      <path d="M14 3v5h5M9 13h6M9 17h6" />
    </>
  ),
  eye: (
    <>
      <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z" />
      <circle cx="12" cy="12" r="3" />
    </>
  ),
  wallet: (
    <>
      <rect x="3" y="6" width="18" height="14" rx="2" />
      <path d="M16 13h2M3 10h18M6 6l9-3 1 3" />
    </>
  ),
  users: (
    <>
      <circle cx="9" cy="8" r="3.5" />
      <path d="M2.5 20a6.5 6.5 0 0 1 13 0M16 4.5a3.5 3.5 0 0 1 0 7M18 14a6 6 0 0 1 3.5 6" />
    </>
  ),
  sparkles: (
    <path d="M12 3l1.8 4.7L18.5 9.5l-4.7 1.8L12 16l-1.8-4.7L5.5 9.5l4.7-1.8L12 3zM19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8L19 15z" />
  ),
  refresh: <path d="M20 11a8 8 0 0 0-14.6-4.5L4 8M4 4v4h4M4 13a8 8 0 0 0 14.6 4.5L20 16M20 20v-4h-4" />,
  link: (
    <path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1" />
  ),
  external: <path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" />,
  graduation: (
    <>
      <path d="M2 9l10-5 10 5-10 5L2 9z" />
      <path d="M6 11v5c0 1.7 2.7 3 6 3s6-1.3 6-3v-5M22 9v6" />
    </>
  ),
  stethoscope: (
    <>
      <path d="M6 3v6a5 5 0 0 0 10 0V3M4 3h4M14 3h4M11 14v2a5 5 0 0 0 10 0v-2" />
      <circle cx="21" cy="12" r="2" />
    </>
  ),
  utensils: <path d="M7 3v8M4 3v5a3 3 0 0 0 6 0V3M7 11v10M17 21V3c-2.5 1-4 3.5-4 7v4h4" />,
  building: (
    <>
      <path d="M4 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16M16 9h3a1 1 0 0 1 1 1v11M2 21h20" />
      <path d="M8 7h4M8 11h4M8 15h4" />
    </>
  ),
  store: (
    <>
      <path d="M4 10v10h16V10M3 5l1.5-2h15L21 5v2a3 3 0 0 1-6 0 3 3 0 0 1-6 0 3 3 0 0 1-6 0V5z" />
      <path d="M10 20v-5h4v5" />
    </>
  ),
  briefcase: (
    <>
      <rect x="3" y="7" width="18" height="13" rx="2" />
      <path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M3 13h18" />
    </>
  ),
  rupee: <path d="M6 4h12M6 9h12M9 4c6 0 6 10 0 10H6l9 7" />,
  star: <path d="M12 3l2.8 5.7 6.2.9-4.5 4.4 1 6.2L12 17.3 6.5 20.2l1-6.2L3 9.6l6.2-.9L12 3z" />,
  quote: <path d="M7 7h4v4c0 3-1.5 5-4 6M15 7h4v4c0 3-1.5 5-4 6" />,
  copy: (
    <>
      <rect x="9" y="9" width="11" height="11" rx="2" />
      <path d="M5 15V5a1 1 0 0 1 1-1h10" />
    </>
  ),
  linkedin: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <path d="M8 10v7M8 7v.01M12 17v-4a2 2 0 0 1 4 0v4M12 10v7" />
    </>
  ),
  "x-logo": <path d="M4 4l16 16M20 4L4 20" />,
  whatsapp: (
    <path d="M3.5 20.5l1.3-4.3A8.6 8.6 0 1 1 8 19.4l-4.5 1.1zM9 8.3c.2-.4.4-.4.7-.4h.5c.2 0 .4 0 .6.5l.7 1.7c.1.2.1.4 0 .6l-.5.6c-.1.2-.2.3 0 .6.4.7 1 1.4 1.6 1.9.6.5 1.2.8 1.6 1 .3.1.4.1.6-.1l.7-.8c.2-.2.3-.2.6-.1l1.6.8c.2.1.4.2.4.4 0 .5-.1 1-.5 1.4-.4.4-1.2.8-1.9.8-.8 0-2.3-.5-3.8-1.8-1.7-1.5-2.6-3.2-2.8-3.9-.3-.9.1-2 .5-2.4z" />
  ),
} satisfies Record<string, ReactNode>;

export type IconName = keyof typeof paths;

type IconProps = {
  name: IconName;
  size?: number;
  strokeWidth?: number;
  className?: string;
  /** Pass a label only when the icon carries meaning on its own. */
  label?: string;
};

export function Icon({ name, size = 20, strokeWidth = 1.75, className, label }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      focusable="false"
    >
      {paths[name]}
    </svg>
  );
}
