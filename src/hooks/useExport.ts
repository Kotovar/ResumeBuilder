import { useCallback } from 'react';
import type { ResumeData } from '../types/resume';

/**
 * PDF export — portal approach.
 *
 * #resume-print-container lives in index.html as a permanent sibling of #root.
 * App.tsx portals the live template into it via createPortal — real React DOM,
 * never inside any transform context. window.print() targets that container
 * directly; no cloning required, so text stays vector (selectable/searchable)
 * and links remain clickable in the PDF.
 */
export function useExport(data: ResumeData) {
  const exportPDF = useCallback(() => {
    window.print();
  }, []);

  const exportJSON = useCallback(() => {
    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${data.personal.fullName.replace(/\s+/g, '_') || 'resume'}_resume.json`;
    a.click();
    URL.revokeObjectURL(url);
  }, [data]);

  const importJSON = useCallback((onLoad: (data: ResumeData) => void) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json,application/json';
    input.onchange = () => {
      const file = input.files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (ev) => {
        try {
          const parsed = JSON.parse(ev.target?.result as string) as ResumeData;
          onLoad(parsed);
        } catch {
          alert('Invalid JSON file — could not import resume.');
        }
      };
      reader.readAsText(file);
    };
    input.click();
  }, []);

  return { exportPDF, exportJSON, importJSON };
}
