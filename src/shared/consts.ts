import type { AccentColor, FontFamily } from "@type/resume";

export const FONT_STACK: Record<FontFamily, string> = {
    ptsans: "'PT Sans', sans-serif",
    ptserif: "'PT Serif', serif",
    ptmono: "'PT Mono', monospace",
};

export const ACCENT_HEX: Record<AccentColor, string> = {
    blue: "#2563eb",
    green: "#16a34a",
    purple: "#9333ea",
    rose: "#e11d48",
    slate: "#475569",
};
