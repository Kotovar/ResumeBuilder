import { useState } from 'react';
import { useResumeStore } from '../../../store/resumeStore';
import { useT } from '../../../i18n/useT';
import { FormField } from '../ui/FormField';
import { TextareaField } from '../ui/TextareaField';
import { BulletList } from '../ui/BulletList';
import { TipBox } from '../ui/TipBox';
import type { ExperienceEntry } from '../../../types/resume';

function ExperienceCard({ entry, index }: { entry: ExperienceEntry; index: number }) {
  const { experience, updateExperience, removeExperience, reorderExperience } = useResumeStore();
  const t = useT().experience;
  const [open, setOpen] = useState(!entry.company && !entry.position);
  const upd = (data: Partial<ExperienceEntry>) => updateExperience(entry.id, data);

  const canMoveUp   = index > 0;
  const canMoveDown = index < experience.length - 1;

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden bg-white">
      {/* Header row */}
      <div
        role="button"
        tabIndex={0}
        className="flex items-center gap-2 px-3 py-2.5 cursor-pointer hover:bg-gray-50
          select-none transition-colors"
        onClick={() => setOpen(!open)}
        onKeyDown={(e) => e.key === 'Enter' && setOpen(!open)}
      >
        <div className="flex flex-col flex-1 min-w-0">
          <span className="text-sm font-semibold text-gray-800 truncate">
            {entry.position || t.newPosition}
          </span>
          <span className="text-xs text-gray-400 truncate">
            {entry.company || '—'}
            {entry.current ? ` · ${t.present}` : entry.endDate ? ` · ${entry.endDate}` : ''}
          </span>
        </div>

        {/* Reorder */}
        <div className="flex items-center gap-0.5" onClick={(e) => e.stopPropagation()}>
          <button
            type="button"
            disabled={!canMoveUp}
            onClick={() => reorderExperience(index, index - 1)}
            className="cursor-pointer p-1 text-gray-300 hover:text-gray-600
              disabled:opacity-20 disabled:cursor-not-allowed transition-colors"
            title="Move up"
          >▲</button>
          <button
            type="button"
            disabled={!canMoveDown}
            onClick={() => reorderExperience(index, index + 1)}
            className="cursor-pointer p-1 text-gray-300 hover:text-gray-600
              disabled:opacity-20 disabled:cursor-not-allowed transition-colors"
            title="Move down"
          >▼</button>
        </div>

        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); removeExperience(entry.id); }}
          className="cursor-pointer text-xs text-gray-300 hover:text-red-400 px-1.5 py-0.5
            rounded transition-colors shrink-0"
        >
          {t.removeButton}
        </button>
        <span className="text-gray-300 text-xs select-none shrink-0">
          {open ? '▲' : '▼'}
        </span>
      </div>

      {/* Expanded form */}
      {open && (
        <div className="px-3 pb-4 pt-2 flex flex-col gap-3 border-t border-gray-100">
          <div className="grid grid-cols-2 gap-3">
            <div className="col-span-2">
              <FormField
                label={t.position}
                value={entry.position}
                onChange={(v) => upd({ position: v })}
                placeholder="Senior Engineer"
              />
            </div>
            <div className="col-span-2">
              <FormField
                label={t.company}
                value={entry.company}
                onChange={(v) => upd({ company: v })}
                placeholder="Acme Corp"
              />
            </div>
            <FormField
              label={t.location}
              value={entry.location}
              onChange={(v) => upd({ location: v })}
              placeholder="Remote"
            />
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                {t.currentLabel}
              </label>
              <label className="flex items-center gap-2 cursor-pointer mt-1">
                <input
                  type="checkbox"
                  checked={entry.current}
                  onChange={(e) => upd({ current: e.target.checked, endDate: '' })}
                  className="w-4 h-4 rounded border-gray-300 cursor-pointer"
                  style={{ accentColor: 'var(--accent)' }}
                />
                <span className="text-sm text-gray-700">{t.currentCheck}</span>
              </label>
            </div>
            <FormField
              label={t.startDate}
              value={entry.startDate}
              onChange={(v) => upd({ startDate: v })}
              placeholder="2020-01"
            />
            {!entry.current && (
              <FormField
                label={t.endDate}
                value={entry.endDate}
                onChange={(v) => upd({ endDate: v })}
                placeholder="2023-06"
              />
            )}
          </div>

          {/* Description — context / responsibilities */}
          <TextareaField
            label={t.description}
            value={entry.description}
            onChange={(v) => upd({ description: v })}
            placeholder={t.phDescription}
            rows={3}
          />

          {/* Highlights — impact bullets */}
          <BulletList
            label={t.achievements}
            items={entry.highlights.length ? entry.highlights : ['']}
            onChange={(highlights) => upd({ highlights })}
            placeholder={t.phAchieve}
            tip={t.achieveTip}
          />
        </div>
      )}
    </div>
  );
}

export function ExperienceSection() {
  const { experience, addExperience } = useResumeStore();
  const t = useT().experience;

  return (
    <div className="flex flex-col gap-4">
      <TipBox>{t.tip}</TipBox>

      <div className="flex flex-col gap-2">
        {experience.map((entry, i) => (
          <ExperienceCard key={entry.id} entry={entry} index={i} />
        ))}
      </div>

      <button
        type="button"
        onClick={addExperience}
        className="cursor-pointer flex items-center justify-center gap-1.5 w-full py-2.5
          border-2 border-dashed border-gray-200 rounded-lg text-sm text-gray-400
          hover:border-gray-300 hover:text-gray-600 transition-colors"
      >
        {t.addButton}
      </button>
    </div>
  );
}
