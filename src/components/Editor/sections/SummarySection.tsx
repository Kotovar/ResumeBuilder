import { useResumeStore } from "@store/resumeStore";
import { useT } from "@i18n/useT";
import { TextareaField } from "../ui/TextareaField";
import { TipBox } from "../ui/TipBox";

export function SummarySection() {
    const { summary, updateSummary } = useResumeStore();
    const t = useT().summary;
    const wordCount = summary.split(/\s+/).filter(Boolean).length;

    return (
        <div className="flex flex-col gap-4">
            <TipBox>{t.tip}</TipBox>

            <TextareaField
                label={t.label}
                value={summary}
                onChange={updateSummary}
                placeholder={t.placeholder}
                rows={6}
            />

            <div className="flex justify-between items-center text-xs">
                <span
                    className={
                        wordCount > 80 ? "text-amber-500" : "text-gray-400"
                    }
                >
                    {t.wordCount(wordCount)}
                    {wordCount > 80 ? ` ${t.wordCountWarning}` : ""}
                </span>
                <span className="text-gray-300">{t.recommended}</span>
            </div>
        </div>
    );
}
