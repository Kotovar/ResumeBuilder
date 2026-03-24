import { useState } from "react";
import { useResumeStore } from "@store/resumeStore";
import { useT } from "@i18n/useT";
import { FormField } from "../ui/FormField";
import { TagInput } from "../ui/TagInput";
import { BulletList } from "../ui/BulletList";
import { TipBox } from "../ui/TipBox";
import type { ProjectEntry } from "@type/resume";

function ProjectCard({ entry }: { entry: ProjectEntry }) {
    const { updateProject, removeProject } = useResumeStore();
    const t = useT().projects;
    const [open, setOpen] = useState(!entry.name);
    const upd = (data: Partial<ProjectEntry>) => updateProject(entry.id, data);

    return (
        <div className="border border-gray-200 rounded-lg overflow-hidden bg-white">
            <div
                role="button"
                tabIndex={0}
                className="flex items-center gap-2 px-3 py-2.5 cursor-pointer hover:bg-gray-50
          select-none transition-colors"
                onClick={() => setOpen(!open)}
                onKeyDown={(e) => e.key === "Enter" && setOpen(!open)}
            >
                <div className="flex flex-col flex-1 min-w-0">
                    <span className="text-sm font-semibold text-gray-800 truncate">
                        {entry.name || t.newProject}
                    </span>
                    <span className="text-xs text-gray-400 truncate">
                        {entry.technologies.slice(0, 4).join(" · ") || "—"}
                    </span>
                </div>
                <button
                    type="button"
                    onClick={(e) => {
                        e.stopPropagation();
                        removeProject(entry.id);
                    }}
                    className="cursor-pointer text-xs text-gray-300 hover:text-red-400 px-1.5 py-0.5
            rounded transition-colors shrink-0"
                >
                    {t.removeButton}
                </button>
                <span className="text-gray-300 text-xs select-none">
                    {open ? "▲" : "▼"}
                </span>
            </div>

            {open && (
                <div className="px-3 pb-4 pt-2 flex flex-col gap-3 border-t border-gray-100">
                    <div className="grid grid-cols-2 gap-3">
                        <div className="col-span-2">
                            <FormField
                                label={t.name}
                                value={entry.name}
                                onChange={(v) => upd({ name: v })}
                                placeholder={t.phName}
                            />
                        </div>
                        <div className="col-span-2">
                            <FormField
                                label={t.description}
                                value={entry.description}
                                onChange={(v) => upd({ description: v })}
                                placeholder={t.phDescription}
                            />
                        </div>
                        <FormField
                            label={t.url}
                            value={entry.url}
                            onChange={(v) => upd({ url: v })}
                            placeholder="myproject.com"
                        />
                        <FormField
                            label={t.github}
                            value={entry.github}
                            onChange={(v) => upd({ github: v })}
                            placeholder="github.com/you/repo"
                        />
                    </div>

                    <TagInput
                        label={t.technologies}
                        tags={entry.technologies}
                        onChange={(technologies) => upd({ technologies })}
                        placeholder={t.phTech}
                    />

                    <BulletList
                        label={t.highlights}
                        items={
                            entry.highlights.length ? entry.highlights : [""]
                        }
                        onChange={(highlights) => upd({ highlights })}
                        placeholder={t.phHighlight}
                        tip={t.highlightTip}
                    />
                </div>
            )}
        </div>
    );
}

export function ProjectsSection() {
    const { projects, addProject } = useResumeStore();
    const t = useT().projects;

    return (
        <div className="flex flex-col gap-4">
            <TipBox>{t.tip}</TipBox>

            <div className="flex flex-col gap-2">
                {projects.map((entry) => (
                    <ProjectCard key={entry.id} entry={entry} />
                ))}
            </div>

            <button
                type="button"
                onClick={addProject}
                className="cursor-pointer flex items-center justify-center gap-1.5 w-full py-2.5
          border-2 border-dashed border-gray-200 rounded-lg text-sm text-gray-400
          hover:border-gray-300 hover:text-gray-600 transition-colors"
            >
                {t.addButton}
            </button>
        </div>
    );
}
