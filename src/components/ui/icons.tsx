/**
 * Inline SVG icon set (dependency-free). Each icon inherits `currentColor`
 * and accepts standard SVG props. Decorative by default (aria-hidden); pass
 * a `title` where an icon conveys meaning on its own.
 */
import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { title?: string };

function base(props: IconProps) {
  const { title, ...rest } = props;
  return {
    width: 20,
    height: 20,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.75,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": title ? undefined : true,
    role: title ? "img" : undefined,
    ...rest,
  };
}

/** Stylized falcon / bird mark used as the logo glyph. */
export function FalconMark(props: IconProps) {
  const { title, ...rest } = props;
  return (
    <svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden={title ? undefined : true}
      role={title ? "img" : undefined}
      {...rest}
    >
      {title ? <title>{title}</title> : null}
      <path
        d="M12 3.2 4.5 9.1c-1.2.9-1.4 2.6-.5 3.8.7.9 1.9 1.2 2.9.8L12 11.6l5.1 2.1c1 .4 2.2.1 2.9-.8.9-1.2.7-2.9-.5-3.8L12 3.2Z"
        fill="url(#falcon-g)"
      />
      <path d="M12 11.6v7.2M9 14.4l-2.4 3.4M15 14.4l2.4 3.4" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" />
      <defs>
        <linearGradient id="falcon-g" x1="4" y1="4" x2="20" y2="14" gradientUnits="userSpaceOnUse">
          <stop stopColor="#fbbf24" />
          <stop offset="1" stopColor="#f97316" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export const IconArrowRight = (p: IconProps) => (
  <svg {...base(p)}>{p.title ? <title>{p.title}</title> : null}<path d="M5 12h14M13 6l6 6-6 6" /></svg>
);
export const IconCheck = (p: IconProps) => (
  <svg {...base(p)}>{p.title ? <title>{p.title}</title> : null}<path d="M20 6 9 17l-5-5" /></svg>
);
export const IconBolt = (p: IconProps) => (
  <svg {...base(p)}>{p.title ? <title>{p.title}</title> : null}<path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z" /></svg>
);
export const IconShield = (p: IconProps) => (
  <svg {...base(p)}>{p.title ? <title>{p.title}</title> : null}<path d="M12 3 5 6v5c0 4.5 3 7.5 7 9 4-1.5 7-4.5 7-9V6l-7-3Z" /><path d="m9 12 2 2 4-4" /></svg>
);
export const IconChart = (p: IconProps) => (
  <svg {...base(p)}>{p.title ? <title>{p.title}</title> : null}<path d="M4 20V10M10 20V4M16 20v-7M22 20H2" /></svg>
);
export const IconClock = (p: IconProps) => (
  <svg {...base(p)}>{p.title ? <title>{p.title}</title> : null}<circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>
);
export const IconCpu = (p: IconProps) => (
  <svg {...base(p)}>{p.title ? <title>{p.title}</title> : null}<rect x="8" y="8" width="8" height="8" rx="1.5" /><path d="M9 2v3M15 2v3M9 19v3M15 19v3M2 9h3M2 15h3M19 9h3M19 15h3" /></svg>
);
export const IconLayers = (p: IconProps) => (
  <svg {...base(p)}>{p.title ? <title>{p.title}</title> : null}<path d="m12 3 9 5-9 5-9-5 9-5Z" /><path d="m3 13 9 5 9-5" /></svg>
);
export const IconTarget = (p: IconProps) => (
  <svg {...base(p)}>{p.title ? <title>{p.title}</title> : null}<circle cx="12" cy="12" r="8" /><circle cx="12" cy="12" r="4" /><circle cx="12" cy="12" r="1" /></svg>
);
export const IconMenu = (p: IconProps) => (
  <svg {...base(p)}>{p.title ? <title>{p.title}</title> : null}<path d="M4 7h16M4 12h16M4 17h16" /></svg>
);
export const IconClose = (p: IconProps) => (
  <svg {...base(p)}>{p.title ? <title>{p.title}</title> : null}<path d="M6 6 18 18M18 6 6 18" /></svg>
);
export const IconChevron = (p: IconProps) => (
  <svg {...base(p)}>{p.title ? <title>{p.title}</title> : null}<path d="m6 9 6 6 6-6" /></svg>
);
export const IconStar = (p: IconProps) => (
  <svg {...base({ ...p, fill: "currentColor", stroke: "none" })}>{p.title ? <title>{p.title}</title> : null}<path d="m12 2 2.9 6.1 6.6.9-4.8 4.6 1.2 6.6L12 17.8 6.1 20.9l1.2-6.6L2.5 9.7l6.6-.9L12 2Z" /></svg>
);
export const IconSpark = (p: IconProps) => (
  <svg {...base(p)}>{p.title ? <title>{p.title}</title> : null}<path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M18 6l-2.5 2.5M8.5 15.5 6 18" /></svg>
);
export const IconMail = (p: IconProps) => (
  <svg {...base(p)}>{p.title ? <title>{p.title}</title> : null}<rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></svg>
);
export const IconDiscord = (p: IconProps) => (
  <svg {...base({ ...p, fill: "currentColor", stroke: "none" })}>{p.title ? <title>{p.title}</title> : null}<path d="M19.3 5.4a16 16 0 0 0-4-1.2l-.2.4a11 11 0 0 1 3.5 1.1 13 13 0 0 0-11.2 0 11 11 0 0 1 3.5-1.1l-.2-.4a16 16 0 0 0-4 1.2A17 17 0 0 0 2 18.6a16 16 0 0 0 4.9 2.5l.7-1.2c-.7-.3-1.3-.6-1.9-1l.4-.3a11.6 11.6 0 0 0 10 0l.4.3c-.6.4-1.2.7-1.9 1l.7 1.2a16 16 0 0 0 4.9-2.5A17 17 0 0 0 19.3 5.4ZM9.3 15.3c-.8 0-1.5-.8-1.5-1.7s.6-1.7 1.5-1.7 1.5.8 1.5 1.7-.6 1.7-1.5 1.7Zm5.4 0c-.8 0-1.5-.8-1.5-1.7s.6-1.7 1.5-1.7 1.5.8 1.5 1.7-.6 1.7-1.5 1.7Z" /></svg>
);
export const IconGlobe = (p: IconProps) => (
  <svg {...base(p)}>{p.title ? <title>{p.title}</title> : null}<circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c2.5 2.5 2.5 15 0 18M12 3c-2.5 2.5-2.5 15 0 18" /></svg>
);
