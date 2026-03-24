import { Font } from '@react-pdf/renderer';
import type { FontFamily } from '../types/resume';

let registered = false;

export function registerPDFFonts(): void {
  if (registered) return;
  registered = true;

  Font.register({
    family: 'Inter',
    fonts: [
      { src: 'https://cdn.jsdelivr.net/gh/rsms/inter@v3.19/docs/font-files/Inter-Regular.woff2', fontWeight: 400 },
      { src: 'https://cdn.jsdelivr.net/gh/rsms/inter@v3.19/docs/font-files/Inter-Medium.woff2', fontWeight: 500 },
      { src: 'https://cdn.jsdelivr.net/gh/rsms/inter@v3.19/docs/font-files/Inter-SemiBold.woff2', fontWeight: 600 },
      { src: 'https://cdn.jsdelivr.net/gh/rsms/inter@v3.19/docs/font-files/Inter-Bold.woff2', fontWeight: 700 },
    ],
  });

  Font.register({
    family: 'PT Sans',
    fonts: [
      { src: 'https://cdn.jsdelivr.net/gh/google/fonts@main/ofl/ptsans/PT_Sans-Web-Regular.ttf', fontWeight: 400 },
      { src: 'https://cdn.jsdelivr.net/gh/google/fonts@main/ofl/ptsans/PT_Sans-Web-Bold.ttf', fontWeight: 700 },
    ],
  });

  Font.register({
    family: 'PT Serif',
    fonts: [
      { src: 'https://cdn.jsdelivr.net/gh/google/fonts@main/ofl/ptserif/PT_Serif-Web-Regular.ttf', fontWeight: 400 },
      { src: 'https://cdn.jsdelivr.net/gh/google/fonts@main/ofl/ptserif/PT_Serif-Web-Bold.ttf', fontWeight: 700 },
    ],
  });

  Font.register({
    family: 'Roboto',
    fonts: [
      { src: 'https://cdn.jsdelivr.net/gh/google/fonts@main/apache/roboto/static/Roboto-Regular.ttf', fontWeight: 400 },
      { src: 'https://cdn.jsdelivr.net/gh/google/fonts@main/apache/roboto/static/Roboto-Medium.ttf', fontWeight: 500 },
      { src: 'https://cdn.jsdelivr.net/gh/google/fonts@main/apache/roboto/static/Roboto-Bold.ttf', fontWeight: 700 },
    ],
  });

  Font.register({
    family: 'Lora',
    fonts: [
      { src: 'https://cdn.jsdelivr.net/gh/google/fonts@main/ofl/lora/static/Lora-Regular.ttf', fontWeight: 400 },
      { src: 'https://cdn.jsdelivr.net/gh/google/fonts@main/ofl/lora/static/Lora-Bold.ttf', fontWeight: 700 },
    ],
  });

  Font.registerHyphenationCallback((w) => [w]);
}

export const PDF_FONT_FAMILY: Record<FontFamily, string> = {
  inter:   'Inter',
  ptsans:  'PT Sans',
  ptserif: 'PT Serif',
  roboto:  'Roboto',
  lora:    'Lora',
};
