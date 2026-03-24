// ── Locale ────────────────────────────────────────────────
export type Lang = "en" | "ru";

// ── Core section identifiers ──────────────────────────────
export type SectionId =
    | "personal"
    | "summary"
    | "experience"
    | "education"
    | "skills"
    | "projects";

// ── Customization options ─────────────────────────────────
export type TemplateType = "classic" | "modern";
export type AccentColor = "blue" | "green" | "purple" | "rose" | "slate";
/** All fonts include full Cyrillic support - PT font family only */
export type FontFamily = "ptsans" | "ptserif" | "ptmono";

// ── Resume sections data ──────────────────────────────────
export type SalaryCurrency = "RUB" | "USD";

export interface SalaryExpectation {
    amount: number;
    currency: SalaryCurrency;
}

export interface PersonalInfo {
    fullName: string;
    title: string;
    email: string;
    phone: string;
    location: string;
    website: string;
    linkedin: string;
    github: string;
    telegram: string;
    /** Base64-encoded profile photo (jpeg/png) */
    photo?: string;
    salary?: SalaryExpectation;
}

export interface ExperienceEntry {
    id: string;
    company: string;
    position: string;
    location: string;
    startDate: string; // "YYYY-MM"
    endDate: string; // "YYYY-MM" | ""
    current: boolean;
    /** Free-form responsibilities / context (shown above achievements) */
    description: string;
    highlights: string[];
}

export interface EducationEntry {
    id: string;
    institution: string;
    degree: string;
    field: string;
    location: string;
    startDate: string;
    endDate: string;
    gpa: string;
}

export interface ProjectEntry {
    id: string;
    name: string;
    description: string;
    technologies: string[];
    url: string;
    github: string;
    highlights: string[];
}

export interface SkillGroup {
    id: string;
    category: string;
    skills: string[];
}

// ── Section visibility / order metadata ──────────────────
export interface SectionConfig {
    id: SectionId;
    title: string; // kept for backwards compat; display uses translations
    visible: boolean;
}

// ── Appearance + locale settings ─────────────────────────
export interface ResumeSettings {
    template: TemplateType;
    accentColor: AccentColor;
    fontFamily: FontFamily;
    lang: Lang;
}

// ── Top-level document ────────────────────────────────────
export interface ResumeData {
    personal: PersonalInfo;
    summary: string;
    experience: ExperienceEntry[];
    education: EducationEntry[];
    skills: SkillGroup[];
    projects: ProjectEntry[];
    /** Ordered list — drives section order in Classic template */
    sections: SectionConfig[];
    settings: ResumeSettings;
}
