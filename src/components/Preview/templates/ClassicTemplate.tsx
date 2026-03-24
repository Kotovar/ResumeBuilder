import { useResumeStore } from "@store/resumeStore";
import { getT } from "@i18n/translations";
import { dateRange, formatSalary } from "./shared";
import { FONT_STACK } from "@shared/consts";

const SectionHeader = ({ title }: { title: string }) => (
    <div
        className="mb-2 pb-0.5 border-b-2"
        style={{ borderColor: "var(--accent)" }}
    >
        <h2
            className="text-[10px] font-bold uppercase tracking-[0.15em]"
            style={{ color: "var(--accent)" }}
        >
            {title}
        </h2>
    </div>
);

export function ClassicTemplate() {
    const {
        personal,
        summary,
        experience,
        education,
        skills,
        projects,
        sections,
        settings,
    } = useResumeStore();
    const t = getT(settings.lang);
    // Personal section is always visible, filter only for other sections
    const visibleSections = sections.filter(
        (s) => s.id === "personal" || s.visible,
    );

    const renderSection = (id: string) => {
        switch (id) {
            case "summary":
                if (!summary) return null;
                return (
                    <section key="summary" className="mb-4">
                        <SectionHeader title={t.sections.summary} />
                        <p
                            className="text-[11px] leading-relaxed text-gray-700"
                            style={{ whiteSpace: "pre-line" }}
                        >
                            {summary}
                        </p>
                    </section>
                );

            case "experience":
                if (!experience.length) return null;
                return (
                    <section key="experience" className="mb-4">
                        <SectionHeader title={t.sections.experience} />
                        {experience.map((exp) => (
                            <div key={exp.id} className="mb-3 last:mb-0">
                                <div className="flex justify-between items-baseline gap-2 flex-wrap">
                                    <div>
                                        <span className="text-[12px] font-semibold text-gray-900">
                                            {exp.position}
                                        </span>
                                        {exp.company && (
                                            <span className="text-[11px] text-gray-500 ml-1.5">
                                                · {exp.company}
                                            </span>
                                        )}
                                    </div>
                                    <span className="text-[10px] text-gray-400 whitespace-nowrap shrink-0">
                                        {dateRange(
                                            exp.startDate,
                                            exp.endDate,
                                            exp.current,
                                            t.experience.present,
                                            settings.lang,
                                        )}
                                        {exp.location && ` · ${exp.location}`}
                                    </span>
                                </div>
                                {exp.description && (
                                    <p
                                        className="text-[10.5px] text-gray-600 leading-relaxed mt-0.5"
                                        style={{ whiteSpace: "pre-line" }}
                                    >
                                        {exp.description}
                                    </p>
                                )}
                                {exp.highlights.filter(Boolean).length > 0 && (
                                    <ul className="mt-1 space-y-0.5 pl-3">
                                        {exp.highlights
                                            .filter(Boolean)
                                            .map((h, i) => (
                                                <li
                                                    key={i}
                                                    className="text-[11px] text-gray-700 leading-relaxed list-disc"
                                                >
                                                    {h}
                                                </li>
                                            ))}
                                    </ul>
                                )}
                            </div>
                        ))}
                    </section>
                );

            case "education":
                if (!education.length) return null;
                return (
                    <section key="education" className="mb-4">
                        <SectionHeader title={t.sections.education} />
                        {education.map((edu) => (
                            <div key={edu.id} className="mb-2 last:mb-0">
                                <div className="flex justify-between items-baseline">
                                    <div>
                                        <span className="text-[12px] font-semibold text-gray-900">
                                            {edu.degree && edu.field
                                                ? `${edu.degree} ${t.education.in} ${edu.field}`
                                                : edu.degree || edu.field}
                                        </span>
                                        {edu.institution && (
                                            <span className="text-[11px] text-gray-500 ml-1.5">
                                                · {edu.institution}
                                            </span>
                                        )}
                                    </div>
                                    <span className="text-[10px] text-gray-400 whitespace-nowrap shrink-0">
                                        {[edu.startDate, edu.endDate]
                                            .filter(Boolean)
                                            .join(" – ")}
                                        {edu.location && ` · ${edu.location}`}
                                        {edu.gpa && ` · GPA ${edu.gpa}`}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </section>
                );

            case "skills":
                if (!skills.length) return null;
                return (
                    <section key="skills" className="mb-4">
                        <SectionHeader title={t.sections.skills} />
                        <div className="flex flex-col gap-1">
                            {skills.map((group) => (
                                <div key={group.id} className="flex gap-2">
                                    {group.category && (
                                        <span className="text-[11px] font-semibold text-gray-700 whitespace-nowrap w-28 shrink-0">
                                            {group.category}:
                                        </span>
                                    )}
                                    <span className="text-[11px] text-gray-600 leading-relaxed">
                                        {group.skills.join(" · ")}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </section>
                );

            case "projects":
                if (!projects.length) return null;
                return (
                    <section key="projects" className="mb-4">
                        <SectionHeader title={t.sections.projects} />
                        {projects.map((proj) => (
                            <div key={proj.id} className="mb-3 last:mb-0">
                                <div className="flex items-baseline gap-2 flex-wrap">
                                    <span className="text-[12px] font-semibold text-gray-900">
                                        {proj.name}
                                    </span>
                                    {proj.technologies.length > 0 && (
                                        <span className="text-[10px] text-gray-400">
                                            {proj.technologies.join(" · ")}
                                        </span>
                                    )}
                                    {proj.url && (
                                        <span
                                            className="text-[10px]"
                                            style={{ color: "var(--accent)" }}
                                        >
                                            {proj.url}
                                        </span>
                                    )}
                                </div>
                                {proj.description && (
                                    <p className="text-[11px] text-gray-600 mt-0.5">
                                        {proj.description}
                                    </p>
                                )}
                                {proj.highlights.filter(Boolean).length > 0 && (
                                    <ul className="mt-1 space-y-0.5 pl-3">
                                        {proj.highlights
                                            .filter(Boolean)
                                            .map((h, i) => (
                                                <li
                                                    key={i}
                                                    className="text-[11px] text-gray-700 leading-relaxed list-disc"
                                                >
                                                    {h}
                                                </li>
                                            ))}
                                    </ul>
                                )}
                            </div>
                        ))}
                    </section>
                );

            default:
                return null;
        }
    };

    return (
        <div
            className="bg-white"
            style={{
                fontFamily: FONT_STACK[settings.fontFamily],
                padding: "40px 48px",
                minHeight: "297mm",
            }}
        >
            <header className="mb-5 flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                    <h1 className="text-[26px] font-bold text-gray-900 leading-tight tracking-tight">
                        {personal.fullName || "Your Name"}
                    </h1>
                    {personal.title && (
                        <p
                            className="text-[13px] font-medium mt-0.5"
                            style={{ color: "var(--accent)" }}
                        >
                            {personal.title}
                        </p>
                    )}
                    <div className="flex flex-wrap gap-x-3 gap-y-1 mt-2">
                        {personal.email && (
                            <a
                                href={`mailto:${personal.email}`}
                                className="text-[10px] text-gray-500"
                            >
                                {personal.email}
                            </a>
                        )}
                        {personal.phone && (
                            <a
                                href={`tel:${personal.phone}`}
                                className="text-[10px] text-gray-500"
                            >
                                {personal.phone}
                            </a>
                        )}
                        {personal.location && (
                            <span className="text-[10px] text-gray-500">
                                {personal.location}
                            </span>
                        )}
                        {personal.website && (
                            <a
                                href={
                                    personal.website.startsWith("http")
                                        ? personal.website
                                        : `https://${personal.website}`
                                }
                                className="text-[10px] text-gray-500"
                            >
                                {personal.website}
                            </a>
                        )}
                        {personal.linkedin && (
                            <a
                                href={
                                    personal.linkedin.startsWith("http")
                                        ? personal.linkedin
                                        : `https://${personal.linkedin}`
                                }
                                className="text-[10px] text-gray-500"
                            >
                                {personal.linkedin}
                            </a>
                        )}
                        {personal.github && (
                            <a
                                href={
                                    personal.github.startsWith("http")
                                        ? personal.github
                                        : `https://${personal.github}`
                                }
                                className="text-[10px] text-gray-500"
                            >
                                {personal.github}
                            </a>
                        )}
                        {personal.telegram && (
                            <a
                                href={
                                    personal.telegram.startsWith("@")
                                        ? `https://t.me/${personal.telegram.slice(1)}`
                                        : `https://t.me/${personal.telegram}`
                                }
                                className="text-[10px] text-gray-500"
                            >
                                {personal.telegram}
                            </a>
                        )}
                        {personal.salary?.amount ? (
                            <span className="text-[10px] text-gray-500">
                                {t.personal.salary}:{" "}
                                {formatSalary(
                                    personal.salary.amount,
                                    personal.salary.currency,
                                )}
                            </span>
                        ) : null}
                    </div>
                </div>
                {personal.photo && (
                    <img
                        src={personal.photo}
                        alt="profile"
                        style={{
                            width: 88,
                            height: 88,
                            borderRadius: 6,
                            objectFit: "cover",
                            flexShrink: 0,
                        }}
                    />
                )}
            </header>

            <hr className="border-0 border-t border-gray-200 mb-4" />

            {visibleSections
                .filter((s) => s.id !== "personal")
                .map((s) => renderSection(s.id))}
        </div>
    );
}
