// ── Primitive helpers ──────────────────────────────────────

/**
 * Blend `hex` with white at `weight` (0–1).
 * Equivalent to: color-mix(in srgb, hex {weight*100}%, white {(1-weight)*100}%)
 *
 * Example:
 *   accentTint('#2563eb', 0.08) → sidebar background (#eef3fd for blue)
 *   accentTint('#2563eb', 0.12) → skill-tag background
 *   accentTint('#2563eb', 0.20) → sidebar section-header text
 */
export function accentTint(hex: string, weight: number): string {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    const rr = Math.round(r * weight + 255 * (1 - weight));
    const gg = Math.round(g * weight + 255 * (1 - weight));
    const bb = Math.round(b * weight + 255 * (1 - weight));
    return `#${rr.toString(16).padStart(2, "0")}${gg.toString(16).padStart(2, "0")}${bb.toString(16).padStart(2, "0")}`;
}

/**
 * Return `rgba(r,g,b,alpha)` for a hex color.
 * Equivalent to: color-mix(in srgb, hex {alpha*100}%, transparent)
 *
 * Example:
 *   hexToRgba('#2563eb', 0.30) → main-content section-header border
 */
export function hexToRgba(hex: string, alpha: number): string {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r},${g},${b},${alpha})`;
}

// ── Derived color set ──────────────────────────────────────

/**
 * All colors derived from a single accent hex, mapped exactly to
 * the CSS expressions used in ClassicTemplate.tsx / ModernTemplate.tsx.
 *
 * Use this as the single source of truth in PDF components so that
 * the PDF output always matches the live preview.
 */
export interface ResumeColors {
    /** var(--accent)
     *  → ClassicPDF  : section-header text, section-header border, links
     *  → ModernPDF   : sidebar name, main-header text, skill-tag text */
    accent: string;

    /** color-mix(in srgb, accent  8%, white)
     *  → ModernPDF   : sidebar background (<aside> backgroundColor) */
    sidebarBg: string;

    /** color-mix(in srgb, accent 12%, white)
     *  → ModernPDF   : skill-tag background (badge) */
    skillTagBg: string;

    /** color-mix(in srgb, accent 20%, white 80%)
     *  → ModernPDF   : sidebar section-header text (SidebarHeader) */
    sidebarHeaderText: string;

    /** color-mix(in srgb, accent 30%, white)  — opaque tint, visually equivalent to rgba(r,g,b,0.30) on white
     *  → ModernPDF   : main-content section-header bottom border (MainHeader) */
    mainBorder: string;

    /** border-white/30  ≡  rgba(255,255,255,0.30)
     *  → ModernPDF   : sidebar section-header bottom border (SidebarHeader) */
    sidebarBorder: string;
}

export function computeResumeColors(accentHex: string): ResumeColors {
    return {
        accent: accentHex,
        sidebarBg: accentTint(accentHex, 0.08),
        skillTagBg: accentTint(accentHex, 0.12),
        sidebarHeaderText: accentTint(accentHex, 0.2),
        mainBorder: accentTint(accentHex, 0.3),
        sidebarBorder: "rgba(255,255,255,0.3)",
    };
}
