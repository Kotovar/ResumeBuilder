import { getT } from "../i18n/translations";
import type { Lang } from "@type/resume";

// Sections that appear in the sidebar (in order)
export const SIDEBAR_SECTIONS = ["personal", "skills", "education"];
// Sections that appear in the main content area (in order)
export const MAIN_SECTIONS = ["summary", "experience", "projects"];

type SidebarSectionId = (typeof SIDEBAR_SECTIONS)[number];
type MainSectionId = (typeof MAIN_SECTIONS)[number];

/**
 * Format a date range for PDF display.
 */
export function localDateRange(
    start: string,
    end: string,
    current: boolean,
    presentLabel: string,
    lang: Lang,
): string {
    const t = getT(lang);
    const s = start
        ? `${t.months.short[parseInt(start.split("-")[1], 10) - 1]} ${start.split("-")[0]}`
        : "";
    const e = current
        ? presentLabel
        : end
          ? `${t.months.short[parseInt(end.split("-")[1], 10) - 1]} ${end.split("-")[0]}`
          : "";
    if (!s && !e) return "";
    if (!s) return e;
    if (!e) return s;
    return `${s} – ${e}`;
}

/**
 * Ensure URL has https:// prefix.
 */
export function ensureHttps(url: string): string {
    if (!url) return url;
    if (url.startsWith("http://") || url.startsWith("https://")) return url;
    return `https://${url}`;
}

/**
 * Check if photo data URI is safe for PDF.
 */
export function isSafePhoto(photo: string | undefined): boolean {
    return (
        typeof photo === "string" &&
        (photo.startsWith("data:image/jpeg;base64,") ||
            photo.startsWith("data:image/png;base64,"))
    );
}

export function isSidebarSection(id: string): id is SidebarSectionId {
    return SIDEBAR_SECTIONS.includes(id);
}

export function isMainSection(id: string): id is MainSectionId {
    return MAIN_SECTIONS.includes(id);
}
