import { Font } from "@react-pdf/renderer";
import type { FontFamily } from "@type/resume";

let registered = false;

// Google Fonts CDN URLs with Cyrillic subset for reliable Cyrillic rendering
// PT Sans - these fonts include full Cyrillic support
// Regular (400)
const PT_SANS_REGULAR =
    "https://fonts.gstatic.com/s/ptsans/v21/pxiEyp8kv8JHgFVrJJbecmNE.woff2";
// Bold (700)
const PT_SANS_BOLD =
    "https://fonts.gstatic.com/s/ptsans/v21/pxiByp8kv8JHgFVrLCz7Z1JF.woff2";
// Italic (400)
const PT_SANS_ITALIC =
    "https://fonts.gstatic.com/s/ptsans/v21/pxiDyp8kv8JHgFVrJJLmv1pl.woff2";
// Bold Italic (700)
const PT_SANS_BOLD_ITALIC =
    "https://fonts.gstatic.com/s/ptsans/v21/pxiVyp8kv8JHgFVrJJLmg1hl.woff2";

// PT Serif - these fonts include full Cyrillic support
// Regular (400)
const PT_SERIF_REGULAR =
    "https://fonts.gstatic.com/s/ptserif/v18/EJRVQgYoZZY2vCFuvDFT9q0.woff2";
// Bold (700)
const PT_SERIF_BOLD =
    "https://fonts.gstatic.com/s/ptserif/v18/EJRSQgYoZZY2vCFuvAnt65q.woff2";
// Italic (400)
const PT_SERIF_ITALIC =
    "https://fonts.gstatic.com/s/ptserif/v18/EJRTQgYoZZY2vCFuvAFT9q0e.woff2";
// Bold Italic (700)
const PT_SERIF_BOLD_ITALIC =
    "https://fonts.gstatic.com/s/ptserif/v18/EJRQQgYoZZY2vCFuvAFT9q0e.woff2";

// PT Mono - includes full Cyrillic support
// Regular (400)
const PT_MONO_REGULAR =
    "https://fonts.gstatic.com/s/ptmono/v15/9oRONYoBnWILk-9ArCg5Mt.woff2";

export function registerPDFFonts(): void {
    if (registered) return;
    registered = true;

    // PT Sans - humanist sans-serif with excellent Cyrillic support
    Font.register({
        family: "PT Sans",
        fonts: [
            { src: PT_SANS_REGULAR, fontWeight: 400, fontStyle: "normal" },
            { src: PT_SANS_BOLD, fontWeight: 700, fontStyle: "normal" },
            { src: PT_SANS_ITALIC, fontWeight: 400, fontStyle: "italic" },
            {
                src: PT_SANS_BOLD_ITALIC,
                fontWeight: 700,
                fontStyle: "italic",
            },
        ],
    });

    // PT Serif - humanist serif with excellent Cyrillic support
    Font.register({
        family: "PT Serif",
        fonts: [
            { src: PT_SERIF_REGULAR, fontWeight: 400, fontStyle: "normal" },
            { src: PT_SERIF_BOLD, fontWeight: 700, fontStyle: "normal" },
            { src: PT_SERIF_ITALIC, fontWeight: 400, fontStyle: "italic" },
            {
                src: PT_SERIF_BOLD_ITALIC,
                fontWeight: 700,
                fontStyle: "italic",
            },
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

    // Force font loading by creating dummy elements
    const fontUrls = [
        PT_SANS_REGULAR,
        PT_SANS_BOLD,
        PT_SANS_ITALIC,
        PT_SANS_BOLD_ITALIC,
        PT_SERIF_REGULAR,
        PT_SERIF_BOLD,
        PT_SERIF_ITALIC,
        PT_SERIF_BOLD_ITALIC,
        PT_MONO_REGULAR,
    ];

    await Promise.all(
        fontUrls.map((url) =>
            fetch(url, { priority: "high" }).then((res) => res.arrayBuffer()),
        ),
    );
}
