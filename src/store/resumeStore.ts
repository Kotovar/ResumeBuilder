import { create } from "zustand";
import { persist } from "zustand/middleware";
import type {
    ResumeData,
    PersonalInfo,
    ExperienceEntry,
    EducationEntry,
    SkillGroup,
    ProjectEntry,
    SectionConfig,
    ResumeSettings,
} from "../types/resume";
import { createDefaultResume } from "../data/defaults";

// ── Helpers ───────────────────────────────────────────────
function uid(): string {
    return crypto.randomUUID();
}

function move<T>(arr: T[], from: number, to: number): T[] {
    const next = [...arr];
    const [item] = next.splice(from, 1);
    next.splice(to, 0, item);
    return next;
}

// ── Action interface ──────────────────────────────────────
interface ResumeActions {
    updatePersonal: (data: Partial<PersonalInfo>) => void;
    updateSummary: (text: string) => void;

    addExperience: () => void;
    updateExperience: (id: string, data: Partial<ExperienceEntry>) => void;
    removeExperience: (id: string) => void;
    reorderExperience: (from: number, to: number) => void;

    addEducation: () => void;
    updateEducation: (id: string, data: Partial<EducationEntry>) => void;
    removeEducation: (id: string) => void;
    reorderEducation: (from: number, to: number) => void;

    addSkillGroup: () => void;
    updateSkillGroup: (id: string, data: Partial<SkillGroup>) => void;
    removeSkillGroup: (id: string) => void;
    reorderSkillGroups: (from: number, to: number) => void;

    addProject: () => void;
    updateProject: (id: string, data: Partial<ProjectEntry>) => void;
    removeProject: (id: string) => void;
    reorderProjects: (from: number, to: number) => void;

    updateSections: (sections: SectionConfig[]) => void;
    toggleSectionVisibility: (id: string) => void;
    reorderSections: (from: number, to: number) => void;

    updateSettings: (data: Partial<ResumeSettings>) => void;

    loadResume: (data: ResumeData) => void;
    resetResume: () => void;
}

type ResumeStore = ResumeData & ResumeActions;

// ── Store ─────────────────────────────────────────────────
export const useResumeStore = create<ResumeStore>()(
    persist(
        (set) => ({
            ...createDefaultResume(),

            // ── Personal & Summary ──────────────────────────────
            updatePersonal: (data) =>
                set((s) => ({ personal: { ...s.personal, ...data } })),

            updateSummary: (text) => set({ summary: text }),

            // ── Experience ──────────────────────────────────────
            addExperience: () =>
                set((s) => ({
                    experience: [
                        ...s.experience,
                        {
                            id: uid(),
                            company: "",
                            position: "",
                            location: "",
                            startDate: "",
                            endDate: "",
                            current: false,
                            description: "",
                            highlights: [""],
                        },
                    ],
                })),

            updateExperience: (id, data) =>
                set((s) => ({
                    experience: s.experience.map((e) =>
                        e.id === id ? { ...e, ...data } : e,
                    ),
                })),

            removeExperience: (id) =>
                set((s) => ({
                    experience: s.experience.filter((e) => e.id !== id),
                })),

            reorderExperience: (from, to) =>
                set((s) => ({ experience: move(s.experience, from, to) })),

            // ── Education ───────────────────────────────────────
            addEducation: () =>
                set((s) => ({
                    education: [
                        ...s.education,
                        {
                            id: uid(),
                            institution: "",
                            degree: "",
                            field: "",
                            location: "",
                            startDate: "",
                            endDate: "",
                            gpa: "",
                        },
                    ],
                })),

            updateEducation: (id, data) =>
                set((s) => ({
                    education: s.education.map((e) =>
                        e.id === id ? { ...e, ...data } : e,
                    ),
                })),

            removeEducation: (id) =>
                set((s) => ({
                    education: s.education.filter((e) => e.id !== id),
                })),

            reorderEducation: (from, to) =>
                set((s) => ({ education: move(s.education, from, to) })),

            // ── Skills ──────────────────────────────────────────
            addSkillGroup: () =>
                set((s) => ({
                    skills: [
                        ...s.skills,
                        { id: uid(), category: "", skills: [] },
                    ],
                })),

            updateSkillGroup: (id, data) =>
                set((s) => ({
                    skills: s.skills.map((g) =>
                        g.id === id ? { ...g, ...data } : g,
                    ),
                })),

            removeSkillGroup: (id) =>
                set((s) => ({ skills: s.skills.filter((g) => g.id !== id) })),

            reorderSkillGroups: (from, to) =>
                set((s) => ({ skills: move(s.skills, from, to) })),

            // ── Projects ────────────────────────────────────────
            addProject: () =>
                set((s) => ({
                    projects: [
                        ...s.projects,
                        {
                            id: uid(),
                            name: "",
                            description: "",
                            technologies: [],
                            url: "",
                            github: "",
                            highlights: [""],
                        },
                    ],
                })),

            updateProject: (id, data) =>
                set((s) => ({
                    projects: s.projects.map((p) =>
                        p.id === id ? { ...p, ...data } : p,
                    ),
                })),

            removeProject: (id) =>
                set((s) => ({
                    projects: s.projects.filter((p) => p.id !== id),
                })),

            reorderProjects: (from, to) =>
                set((s) => ({ projects: move(s.projects, from, to) })),

            // ── Section config ───────────────────────────────────
            updateSections: (sections) => set({ sections }),

            toggleSectionVisibility: (id) =>
                set((s) => ({
                    sections: s.sections.map((sec) =>
                        sec.id === id ? { ...sec, visible: !sec.visible } : sec,
                    ),
                })),

            reorderSections: (from, to) =>
                set((s) => ({ sections: move(s.sections, from, to) })),

            // ── Settings ────────────────────────────────────────
            updateSettings: (data) =>
                set((s) => ({ settings: { ...s.settings, ...data } })),

            // ── Data management ──────────────────────────────────
            loadResume: (data) => set({ ...data }),
            resetResume: () => set({ ...createDefaultResume() }),
        }),
        {
            name: "resume-v1",
            version: 2,
            migrate: (raw, fromVersion) => {
                const state = raw as ResumeData;
                if (fromVersion < 2) {
                    // Add description field to existing experience entries
                    state.experience = (state.experience ?? []).map((e) => ({
                        ...e,
                        description:
                            (e as ExperienceEntry & { description?: string })
                                .description ?? "",
                    }));
                    // Add lang to settings
                    state.settings = {
                        ...state.settings,
                        lang:
                            ((
                                state.settings as ResumeSettings & {
                                    lang?: string;
                                }
                            ).lang as ResumeSettings["lang"]) ?? "en",
                        // Migrate removed fonts to 'ptsans'
                        fontFamily: ["inter", "roboto", "lora"].includes(
                            state.settings.fontFamily as string,
                        )
                            ? "ptsans"
                            : ((state.settings
                                  .fontFamily as ResumeSettings["fontFamily"]) ??
                              "ptsans"),
                    };
                }
                return state;
            },
        },
    ),
);
