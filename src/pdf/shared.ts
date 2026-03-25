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
 * Handles undefined values and year-only dates (e.g., "2008" or "2008-09").
 */
export function localDateRange(
    start: string | undefined,
    end: string | undefined,
    current: boolean,
    presentLabel: string,
    lang: Lang,
): string {
    const t = getT(lang);

    const formatDate = (date: string | undefined): string => {
        if (!date) return "";
        const parts = date.split("-");
        const year = parts[0];
        const month = parts[1];
        if (!year) return "";
        if (!month) return year; // Year only
        const monthIndex = parseInt(month, 10) - 1;
        const monthName = t.months.short[monthIndex];
        if (!monthName) return year; // Invalid month, show year only
        return `${monthName} ${year}`;
    };

    const s = formatDate(start);
    const e = current ? presentLabel : formatDate(end);

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
