import { Font } from "@react-pdf/renderer";
import type { FontFamily } from "../types/resume";

let registered = false;

export function registerPDFFonts(): void {
    if (registered) return;
    registered = true;

    // PT Sans - sans-serif, humanist, excellent Cyrillic support
    Font.register({
        family: "PT Sans",
        fonts: [
            {
                src: "/fonts/PT_Sans-Web-Regular.ttf",
                fontWeight: 400,
            },
            {
                src: "/fonts/PT_Sans-Web-Bold.ttf",
                fontWeight: 700,
            },
        ],
    });

    // PT Serif - serif, humanist, excellent Cyrillic support
    Font.register({
        family: "PT Serif",
        fonts: [
            {
                src: "/fonts/PT_Serif-Web-Regular.ttf",
                fontWeight: 400,
            },
            {
                src: "/fonts/PT_Serif-Web-Bold.ttf",
                fontWeight: 700,
            },
        ],
    });

    // PT Mono - monospace, technical, excellent Cyrillic support
    Font.register({
        family: "PT Mono",
        fonts: [
            {
                src: "/fonts/PT_Mono-Regular.ttf",
                fontWeight: 400,
            },
        ],
    });

    Font.registerHyphenationCallback((w) => [w]);
}

export const PDF_FONT_FAMILY: Record<FontFamily, string> = {
    ptsans: "PT Sans",
    ptserif: "PT Serif",
    ptmono: "PT Mono",
};
