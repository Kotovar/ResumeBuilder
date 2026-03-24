import { ClassicPDF } from './ClassicPDF';
import { ModernPDF } from './ModernPDF';
import type { ResumeData } from '../types/resume';

export function ResumePDF({ data }: { data: ResumeData }) {
  return data.settings.template === 'modern'
    ? <ModernPDF data={data} />
    : <ClassicPDF data={data} />;
}
