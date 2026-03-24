import { Font } from "@react-pdf/renderer";
import type { FontFamily } from "@type/resume";

let registered = false;

// Local TTF font files with Cyrillic support
// PT Sans - only Regular and Bold available
const PT_SANS_REGULAR = "/fonts/PT_Sans-Web-Regular.ttf";
const PT_SANS_BOLD = "/fonts/PT_Sans-Web-Bold.ttf";

// PT Serif - only Regular and Bold available
const PT_SERIF_REGULAR = "/fonts/PT_Serif-Web-Regular.ttf";
const PT_SERIF_BOLD = "/fonts/PT_Serif-Web-Bold.ttf";

// PT Mono - only Regular available
const PT_MONO_REGULAR = "/fonts/PT_Mono-Regular.ttf";

export function registerPDFFonts(): void {
    if (registered) return;
    registered = true;

    // PT Sans - humanist sans-serif with excellent Cyrillic support
    Font.register({
        family: "PT Sans",
        fonts: [
            { src: PT_SANS_REGULAR, fontWeight: 400, fontStyle: "normal" },
            { src: PT_SANS_BOLD, fontWeight: 700, fontStyle: "normal" },
        ],
    });

    // PT Serif - humanist serif with excellent Cyrillic support
    Font.register({
        family: "PT Serif",
        fonts: [
            { src: PT_SERIF_REGULAR, fontWeight: 400, fontStyle: "normal" },
            { src: PT_SERIF_BOLD, fontWeight: 700, fontStyle: "normal" },
        ],
    });

    // PT Mono - monospace with excellent Cyrillic support
    Font.register({
        family: "PT Mono",
        fonts: [{ src: PT_MONO_REGULAR, fontWeight: 400, fontStyle: "normal" }],
    });

    // Disable automatic hyphenation to avoid issues with Cyrillic text
    Font.registerHyphenationCallback((word) => [word]);
}

export const PDF_FONT_FAMILY: Record<FontFamily, string> = {
    ptsans: "PT Sans",
    ptserif: "PT Serif",
    ptmono: "PT Mono",
};

/**
 * Preload fonts to ensure they're available before PDF generation.
 * Call this before generating PDF to avoid missing glyph issues.
 */
export async function preloadPDFFonts(): Promise<void> {
    registerPDFFonts();

    // Force font loading by fetching the TTF files
    const fontUrls = [
        PT_SANS_REGULAR,
        PT_SANS_BOLD,
        PT_SERIF_REGULAR,
        PT_SERIF_BOLD,
        PT_MONO_REGULAR,
    ];

    await Promise.all(
        fontUrls.map((url) =>
            fetch(url, { priority: "high" }).then((res) => res.arrayBuffer()),
        ),
    );
}
