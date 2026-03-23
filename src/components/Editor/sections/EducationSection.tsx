import { useState } from 'react';
import { useResumeStore } from '../../../store/resumeStore';
import { useT } from '../../../i18n/useT';
import { FormField } from '../ui/FormField';
import type { EducationEntry } from '../../../types/resume';

function EducationCard({ entry }: { entry: EducationEntry }) {
  const { updateEducation, removeEducation } = useResumeStore();
  const t = useT().education;
  const [open, setOpen] = useState(!entry.institution);
  const upd = (data: Partial<EducationEntry>) => updateEducation(entry.id, data);

  const headline =
    entry.degree && entry.field
      ? `${entry.degree} in ${entry.field}`
      : entry.degree || t.newDegree;

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden bg-white">
      <div
        role="button"
        tabIndex={0}
        className="flex items-center gap-2 px-3 py-2.5 cursor-pointer hover:bg-gray-50
          select-none transition-colors"
        onClick={() => setOpen(!open)}
        onKeyDown={(e) => e.key === 'Enter' && setOpen(!open)}
      >
        <div className="flex flex-col flex-1 min-w-0">
          <span className="text-sm font-semibold text-gray-800 truncate">{headline}</span>
          <span className="text-xs text-gray-400 truncate">
            {entry.institution || '—'}
          </span>
        </div>
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); removeEducation(entry.id); }}
          className="cursor-pointer text-xs text-gray-300 hover:text-red-400 px-1.5 py-0.5
            rounded transition-colors shrink-0"
        >
          {t.removeButton}
        </button>
        <span className="text-gray-300 text-xs select-none">{open ? '▲' : '▼'}</span>
      </div>

      {open && (
        <div className="px-3 pb-4 pt-2 flex flex-col gap-3 border-t border-gray-100">
          <div className="grid grid-cols-2 gap-3">
            <div className="col-span-2">
              <FormField label={t.institution} value={entry.institution} onChange={(v) => upd({ institution: v })} placeholder={t.phInstitution} />
            </div>
            <FormField label={t.degree}   value={entry.degree}    onChange={(v) => upd({ degree: v })}    placeholder={t.phDegree} />
            <FormField label={t.field}    value={entry.field}     onChange={(v) => upd({ field: v })}     placeholder={t.phField} />
            <FormField label={t.location} value={entry.location}  onChange={(v) => upd({ location: v })}  placeholder={t.phLocation} />
            <FormField label={t.gpa}      value={entry.gpa}       onChange={(v) => upd({ gpa: v })}       placeholder="3.9" />
            <FormField label={t.startDate} value={entry.startDate} onChange={(v) => upd({ startDate: v })} placeholder="2014-09" />
            <FormField label={t.endDate}   value={entry.endDate}   onChange={(v) => upd({ endDate: v })}   placeholder="2018-05" />
          </div>
        </div>
      )}
    </div>
  );
}

export function EducationSection() {
  const { education, addEducation } = useResumeStore();
  const t = useT().education;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        {education.map((entry) => (
          <EducationCard key={entry.id} entry={entry} />
        ))}
      </div>

      <button
        type="button"
        onClick={addEducation}
        className="cursor-pointer flex items-center justify-center gap-1.5 w-full py-2.5
          border-2 border-dashed border-gray-200 rounded-lg text-sm text-gray-400
          hover:border-gray-300 hover:text-gray-600 transition-colors"
      >
        {t.addButton}
      </button>
    </div>
  );
}
