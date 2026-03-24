import { getT } from "@i18n/translations";
import type { Lang } from "@type/resume";

/** Format "YYYY-MM" → "Jan 2020" (localized) */
export function fmtDate(dateStr: string, lang: Lang = "en"): string {
    if (!dateStr) return "";
    const [year, month] = dateStr.split("-");
    const t = getT(lang);
    const m = parseInt(month, 10);
    return isNaN(m) ? year : `${t.months.short[m - 1]} ${year}`;
}

/** Format a date range, e.g. "Jan 2020 – Present" (localized) */
export function dateRange(
    start: string,
    end: string,
    current: boolean,
    presentLabel: string,
    lang: Lang = "en",
): string {
    const s = fmtDate(start, lang);
    const e = current ? presentLabel : fmtDate(end, lang);
    if (!s && !e) return "";
    if (!s) return e;
    if (!e) return s;
    return `${s} – ${e}`;
}

/** Format salary amount + currency, e.g. "$2,000" or "150 000 ₽" */
export function formatSalary(amount: number, currency: "RUB" | "USD"): string {
    if (!amount) return "";
    if (currency === "RUB") return amount.toLocaleString("ru-RU") + "\u00a0₽";
    return "$" + amount.toLocaleString("en-US");
}
