import { useResumeStore } from '../../store/resumeStore';
import { useT } from '../../i18n/useT';
import type { SectionId } from '../../types/resume';

const ICONS: Record<SectionId, string> = {
  personal:   '👤',
  summary:    '✍️',
  experience: '💼',
  education:  '🎓',
  skills:     '⚡',
  projects:   '🚀',
};

interface Props {
  active: SectionId;
  onSelect: (id: SectionId) => void;
}

export function SectionNav({ active, onSelect }: Props) {
  const { sections, toggleSectionVisibility, reorderSections } = useResumeStore();
  const t = useT();

  return (
    <nav className="flex flex-col gap-0.5 p-2">
      {sections.map((section, i) => {
        const isActive = section.id === active;
        return (
          <div
            key={section.id}
            className={`group flex items-center gap-2.5 px-3 py-2.5 rounded-lg cursor-pointer
              select-none transition-colors ${
                isActive
                  ? 'text-white font-medium'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            style={isActive ? { backgroundColor: 'var(--accent)' } : {}}
            onClick={() => onSelect(section.id)}
          >
            <span className="text-base flex-none">{ICONS[section.id]}</span>
            <span className="flex-1 text-sm">{t.sections[section.id]}</span>

            {/* Reorder arrows */}
            <div
              className={`flex gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity ${
                isActive ? 'opacity-100' : ''
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                disabled={i === 0}
                onClick={() => reorderSections(i, i - 1)}
                title="Move up"
                className={`cursor-pointer p-0.5 rounded text-xs leading-none disabled:opacity-20 disabled:cursor-not-allowed transition-opacity
                  ${isActive ? 'text-white/70 hover:text-white' : 'text-gray-400 hover:text-gray-600'}`}
              >
                ↑
              </button>
              <button
                disabled={i === sections.length - 1}
                onClick={() => reorderSections(i, i + 1)}
                title="Move down"
                className={`cursor-pointer p-0.5 rounded text-xs leading-none disabled:opacity-20 disabled:cursor-not-allowed transition-opacity
                  ${isActive ? 'text-white/70 hover:text-white' : 'text-gray-400 hover:text-gray-600'}`}
              >
                ↓
              </button>
            </div>

            {/* Visibility toggle */}
            <button
              type="button"
              title={section.visible ? 'Hide in resume' : 'Show in resume'}
              onClick={(e) => {
                e.stopPropagation();
                toggleSectionVisibility(section.id);
              }}
              className={`cursor-pointer text-sm flex-none transition-opacity ${
                isActive
                  ? section.visible
                    ? 'opacity-70 hover:opacity-100'
                    : 'opacity-40 hover:opacity-70'
                  : section.visible
                    ? 'text-gray-400 hover:text-gray-600'
                    : 'text-gray-300 hover:text-gray-400'
              }`}
            >
              {section.visible ? '👁' : '🚫'}
            </button>
          </div>
        );
      })}
    </nav>
  );
}
