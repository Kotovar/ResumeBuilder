import { useState, type ComponentType } from 'react';
import { SectionNav } from './SectionNav';
import { PersonalSection } from './sections/PersonalSection';
import { SummarySection } from './sections/SummarySection';
import { ExperienceSection } from './sections/ExperienceSection';
import { EducationSection } from './sections/EducationSection';
import { SkillsSection } from './sections/SkillsSection';
import { ProjectsSection } from './sections/ProjectsSection';
import { useT } from '../../i18n/useT';
import type { SectionId } from '../../types/resume';

const SECTIONS: Record<SectionId, ComponentType> = {
  personal:   PersonalSection,
  summary:    SummarySection,
  experience: ExperienceSection,
  education:  EducationSection,
  skills:     SkillsSection,
  projects:   ProjectsSection,
};

export function EditorPanel() {
  const [active, setActive] = useState<SectionId>('personal');
  const t = useT();
  const ActiveSection = SECTIONS[active];

  return (
    <div className="flex flex-col h-full">
      <div className="px-4 py-3 border-b border-gray-100">
        <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-widest">
          {t.editor.label}
        </h2>
      </div>

      <div className="border-b border-gray-100">
        <SectionNav active={active} onSelect={setActive} />
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="p-4">
          <h3 className="text-base font-semibold text-gray-800 mb-4">
            {t.sections[active]}
          </h3>
          <ActiveSection />
        </div>
      </div>
    </div>
  );
}
