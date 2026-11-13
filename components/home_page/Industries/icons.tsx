import type { IndustryBadgeIcon } from "@/lib/data/industries";

const SVG_PROPS = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  style: { flexShrink: 0 },
} as const;

export const SECTOR_ICONS: Record<string, React.ReactNode> = {
  gem: (
    <svg width="24" height="24" viewBox="0 0 24 24" {...SVG_PROPS} aria-hidden="true">
      <polygon points="6 3 18 3 22 9 12 22 2 9"/>
      <polygon points="12 22 12 9 6 3"/><polygon points="12 22 12 9 18 3"/>
      <line x1="2" x2="22" y1="9" y2="9"/>
    </svg>
  ),
  sprout: (
    <svg width="24" height="24" viewBox="0 0 24 24" {...SVG_PROPS} aria-hidden="true">
      <path d="M7 20h10"/><path d="M10 20c5.5-2.5.8-6.4 3-10"/>
      <path d="M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2 2.8-.5 4.4 0 5.5.8z"/>
      <path d="M14.1 6a7 7 0 0 0-1.1 4c1.9-.1 3.3-.6 4.3-1.4 1-1 1.6-2.3 1.7-4.6-2.7.1-4 1-4.9 2z"/>
    </svg>
  ),
  "hard-hat": (
    <svg width="24" height="24" viewBox="0 0 24 24" {...SVG_PROPS} aria-hidden="true">
      <path d="M2 18a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v2z"/>
      <path d="M10 10V5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v5"/>
      <path d="M4 15v-3a6 6 0 0 1 6-6h0"/><path d="M14 6h0a6 6 0 0 1 6 6v3"/>
    </svg>
  ),
  factory: (
    <svg width="24" height="24" viewBox="0 0 24 24" {...SVG_PROPS} aria-hidden="true">
      <path d="M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7 5V8l-7 5V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"/>
      <path d="M17 18h1"/><path d="M12 18h1"/><path d="M7 18h1"/>
    </svg>
  ),
  package: (
    <svg width="24" height="24" viewBox="0 0 24 24" {...SVG_PROPS} aria-hidden="true">
      <path d="m7.5 4.27 9 5.15"/>
      <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l2-1.14"/>
      <path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/>
    </svg>
  ),
  "train-front": (
    <svg width="24" height="24" viewBox="0 0 24 24" {...SVG_PROPS} aria-hidden="true">
      <path d="M8 3.1V7a4 4 0 0 0 8 0V3.1"/>
      <path d="m9 15-1-1"/><path d="m15 15 1-1"/>
      <path d="M9 19c-2.8 0-5-2.2-5-5v-4a8 8 0 0 1 16 0v4c0 2.8-2.2 5-5 5Z"/>
      <path d="m8 19-2 3"/><path d="m16 19 2 3"/>
    </svg>
  ),
};

export const BADGE_ICONS: Record<IndustryBadgeIcon, React.ReactNode> = {
  shield: (
    <svg width="14" height="14" viewBox="0 0 24 24" {...SVG_PROPS} aria-hidden="true">
      <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1 1 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/>
      <path d="m9 12 2 2 4-4"/>
    </svg>
  ),
  satellite: (
    <svg width="14" height="14" viewBox="0 0 24 24" {...SVG_PROPS} aria-hidden="true">
      <path d="M13 7 9 3 5 7l4 4"/>
      <path d="m17 11 4 4-4 4-4-4"/>
      <path d="m8 12 4 4 4-4-4-4Z"/>
      <path d="m16 8 3-3"/>
      <path d="M9 21a6 6 0 0 0-6-6"/>
    </svg>
  ),
  weight: (
    <svg width="14" height="14" viewBox="0 0 24 24" {...SVG_PROPS} aria-hidden="true">
      <circle cx="12" cy="5" r="3"/>
      <path d="M6.5 8h11l2.5 13H4Z"/>
    </svg>
  ),
  cold: (
    <svg width="14" height="14" viewBox="0 0 24 24" {...SVG_PROPS} aria-hidden="true">
      <path d="M12 2v20"/><path d="m4.93 4.93 14.14 14.14"/><path d="m19.07 4.93-14.14 14.14"/>
      <path d="M12 9.5 8.5 7"/><path d="M12 14.5 8.5 17"/><path d="M12 9.5 15.5 7"/><path d="M12 14.5 15.5 17"/>
    </svg>
  ),
  clock: (
    <svg width="14" height="14" viewBox="0 0 24 24" {...SVG_PROPS} aria-hidden="true">
      <circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>
    </svg>
  ),
  container: (
    <svg width="14" height="14" viewBox="0 0 24 24" {...SVG_PROPS} aria-hidden="true">
      <rect x="2" y="7" width="20" height="10" rx="1"/>
      <path d="M6 7v10"/><path d="M10 7v10"/><path d="M14 7v10"/><path d="M18 7v10"/>
    </svg>
  ),
  escort: (
    <svg width="14" height="14" viewBox="0 0 24 24" {...SVG_PROPS} aria-hidden="true">
      <path d="M5 17h14l-1.5-5.5a2 2 0 0 0-1.9-1.5H8.4a2 2 0 0 0-1.9 1.5Z"/>
      <path d="M3 17h18v2a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1Z"/>
      <path d="M7 10V7"/><path d="M11 10V6"/><path d="M15 10V7"/>
    </svg>
  ),
};

export const CHECK_MARK = (
  <svg width="16" height="16" viewBox="0 0 24 24" {...SVG_PROPS} aria-hidden="true">
    <path d="M20 6 9 17l-5-5"/>
  </svg>
);

export const ARROW_RIGHT = (
  <svg width="18" height="18" viewBox="0 0 24 24" {...SVG_PROPS} aria-hidden="true">
    <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
  </svg>
);
