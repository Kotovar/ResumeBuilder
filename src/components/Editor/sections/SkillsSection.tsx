import { useResumeStore } from '../../../store/resumeStore';
import { useT } from '../../../i18n/useT';
import { FormField } from '../ui/FormField';
import { TagInput } from '../ui/TagInput';
import { TipBox } from '../ui/TipBox';
import type { SkillGroup } from '../../../types/resume';

interface CardProps {
  group: SkillGroup;
  index: number;
  total: number;
  onMoveUp: () => void;
  onMoveDown: () => void;
}

function SkillGroupCard({ group, index, total, onMoveUp, onMoveDown }: CardProps) {
  const { updateSkillGroup, removeSkillGroup } = useResumeStore();
  const t = useT().skills;
  const upd = (data: Partial<SkillGroup>) => updateSkillGroup(group.id, data);

  return (
    <div className="border border-gray-200 rounded-lg p-3 flex flex-col gap-3 bg-white">
      <div className="flex items-end gap-2">
        {/* Category up/down */}
        <div className="flex flex-col gap-0.5 shrink-0 pb-1">
          <button
            type="button"
            onClick={onMoveUp}
            disabled={index === 0}
            className="cursor-pointer w-5 h-5 flex items-center justify-center text-gray-300
              hover:text-gray-500 disabled:opacity-20 disabled:cursor-default rounded
              transition-colors text-xs leading-none"
            title="Move up"
          >
            ↑
          </button>
          <button
            type="button"
            onClick={onMoveDown}
            disabled={index === total - 1}
            className="cursor-pointer w-5 h-5 flex items-center justify-center text-gray-300
              hover:text-gray-500 disabled:opacity-20 disabled:cursor-default rounded
              transition-colors text-xs leading-none"
            title="Move down"
          >
            ↓
          </button>
        </div>

        <div className="flex-1">
          <FormField
            label={t.category}
            value={group.category}
            onChange={(v) => upd({ category: v })}
            placeholder={t.phCategory}
          />
        </div>

        <button
          type="button"
          onClick={() => removeSkillGroup(group.id)}
          className="cursor-pointer text-xs text-gray-300 hover:text-red-400 px-2 py-2
            rounded transition-colors shrink-0"
        >
          {t.removeButton}
        </button>
      </div>

      <TagInput
        label={t.skillsLabel}
        tags={group.skills}
        onChange={(skills) => upd({ skills })}
        placeholder={t.phSkills}
        sortable
      />
    </div>
  );
}

export function SkillsSection() {
  const { skills, addSkillGroup, reorderSkillGroups } = useResumeStore();
  const t = useT().skills;

  return (
    <div className="flex flex-col gap-4">
      <TipBox>{t.tip}</TipBox>

      <div className="flex flex-col gap-2">
        {skills.map((group, index) => (
          <SkillGroupCard
            key={group.id}
            group={group}
            index={index}
            total={skills.length}
            onMoveUp={() => reorderSkillGroups(index, index - 1)}
            onMoveDown={() => reorderSkillGroups(index, index + 1)}
          />
        ))}
      </div>

      <button
        type="button"
        onClick={addSkillGroup}
        className="cursor-pointer flex items-center justify-center gap-1.5 w-full py-2.5
          border-2 border-dashed border-gray-200 rounded-lg text-sm text-gray-400
          hover:border-gray-300 hover:text-gray-600 transition-colors"
      >
        {t.addButton}
      </button>
    </div>
  );
}
