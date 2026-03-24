import { pdf } from "@react-pdf/renderer";
import { ResumePDF } from "./ResumePDF";
import { preloadPDFFonts } from "./fonts";
import type { ResumeData } from "@type/resume";

export async function generatePDF(data: ResumeData): Promise<void> {
    // Preload fonts to ensure Cyrillic glyphs are available
    await preloadPDFFonts();

    const blob = await pdf(<ResumePDF data={data} />).toBlob();
    const name = `${data.personal.fullName.replace(/\s+/g, "_") || "resume"}_resume.pdf`;
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 1000);
}
