import { useResumeStore } from "@store/resumeStore";
import { getT } from "@i18n/translations";
import { dateRange, formatSalary } from "./shared";
import { FONT_STACK } from "@shared/consts";

const SidebarHeader = ({ title }: { title: string }) => (
    <h2
        className="text-[9px] font-bold uppercase tracking-[0.18em] mb-2 pb-0.5 border-b border-white/30"
        style={{ color: "color-mix(in srgb, var(--accent) 50%, white 80%)" }}
    >
        {title}
    </h2>
);

const MainHeader = ({ title }: { title: string }) => (
    <div
        className="mb-2 pb-0.5 border-b"
        style={{
            borderColor: "color-mix(in srgb, var(--accent) 30%, transparent)",
        }}
    >
        <h2
            className="text-[10px] font-bold uppercase tracking-[0.15em] "
            style={{ color: "var(--accent)" }}
        >
            {title}
        </h2>
    </div>
);

export function ModernTemplate() {
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

    const isVisible = (id: string) =>
        id === "personal"
            ? true
            : (sections.find((s) => s.id === id)?.visible ?? false);

    const contactItems = [
        {
            label: t.personal.email,
            value: personal.email,
            href: personal.email ? `mailto:${personal.email}` : undefined,
        },
        {
            label: t.personal.phone,
            value: personal.phone,
            href: personal.phone ? `tel:${personal.phone}` : undefined,
        },
        {
            label: t.personal.location,
            value: personal.location,
            href: undefined,
        },
        {
            label: t.personal.website,
            value: personal.website,
            href: personal.website
                ? personal.website.startsWith("http")
                    ? personal.website
                    : `https://${personal.website}`
                : undefined,
        },
        {
            label: t.personal.linkedin,
            value: personal.linkedin,
            href: personal.linkedin
                ? personal.linkedin.startsWith("http")
                    ? personal.linkedin
                    : `https://${personal.linkedin}`
                : undefined,
        },
        {
            label: t.personal.github,
            value: personal.github,
            href: personal.github
                ? personal.github.startsWith("http")
                    ? personal.github
                    : `https://${personal.github}`
                : undefined,
        },
        {
            label: t.personal.telegram,
            value: personal.telegram,
            href: personal.telegram
                ? personal.telegram.startsWith("@")
                    ? `https://t.me/${personal.telegram.slice(1)}`
                    : `https://t.me/${personal.telegram}`
                : undefined,
        },
        ...(personal.salary?.amount
            ? [
                  {
                      label: t.personal.salary,
                      value: formatSalary(
                          personal.salary.amount,
                          personal.salary.currency,
                      ),
                      href: undefined,
                  },
              ]
            : []),
    ].filter(({ value }) => value);

    return (
        <div
            className="bg-white flex"
            style={{
                fontFamily: FONT_STACK[settings.fontFamily],
                minHeight: "297mm",
            }}
        >
            {/* ── Left sidebar ──────────────────────────────────── */}
            <aside
                className="w-50 shrink-0 flex flex-col gap-5 px-5 pt-8 pb-8"
                style={{
                    backgroundColor:
                        "color-mix(in srgb, var(--accent) 8%, white)",
                    WebkitPrintColorAdjust: "exact",
                    printColorAdjust: "exact",
                }}
            >
                {/* Photo */}
                {personal.photo && (
                    <img
                        src={personal.photo}
                        alt="profile"
                        className="w-25 h-25 rounded-md object-cover"
                    />
                )}

                {/* Name & title */}
                <div>
                    <h1
                        className="text-[18px] font-bold leading-tight tracking-tight"
                        style={{ color: "var(--accent)" }}
                    >
                        {personal.fullName || "Your Name"}
                    </h1>
                    {personal.title && (
                        <p className="text-[10px] font-medium text-gray-600 mt-1 leading-snug">
                            {personal.title}
                        </p>
                    )}
                </div>

                {/* Contact */}
                {contactItems.length > 0 && (
                    <div>
                        <SidebarHeader title={t.sections.personal} />
                        <div className="flex flex-col gap-1.5">
                            {contactItems.map(({ label, value, href }) => (
                                <div key={label}>
                                    <p className="text-[8px] font-semibold uppercase tracking-wide text-gray-400">
                                        {label}
                                    </p>
                                    {href ? (
                                        <a
                                            href={href}
                                            className="text-[9.5px] text-gray-700 break-all leading-tight"
                                        >
                                            {value}
                                        </a>
                                    ) : (
                                        <p className="text-[9.5px] text-gray-700 break-all leading-tight">
                                            {value}
                                        </p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Skills */}
                {isVisible("skills") && skills.length > 0 && (
                    <div>
                        <SidebarHeader title={t.sections.skills} />
                        <div className="flex flex-col gap-2.5">
                            {skills.map((group) => (
                                <div key={group.id}>
                                    {group.category && (
                                        <p className="text-[8px] font-semibold uppercase tracking-wide text-gray-400 mb-0.5">
                                            {group.category}
                                        </p>
                                    )}
                                    <div className="flex flex-wrap gap-1">
                                        {group.skills.map((skill, i) => (
                                            <span
                                                key={i}
                                                className="text-[9px] px-1.5 py-0.5 rounded"
                                                style={{
                                                    backgroundColor:
                                                        "color-mix(in srgb, var(--accent) 12%, white)",
                                                    color: "var(--accent)",
                                                }}
                                            >
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Education */}
                {isVisible("education") && education.length > 0 && (
                    <div>
                        <SidebarHeader title={t.sections.education} />
                        <div className="flex flex-col gap-3">
                            {education.map((edu) => (
                                <div key={edu.id}>
                                    <p className="text-[10px] font-semibold text-gray-800 leading-tight">
                                        {edu.degree && edu.field
                                            ? `${edu.degree} ${t.education.in} ${edu.field}`
                                            : edu.degree || edu.field}
                                    </p>
                                    <p className="text-[9px] text-gray-600 mt-0.5">
                                        {edu.institution}
                                    </p>
                                    {(edu.startDate || edu.endDate) && (
                                        <p className="text-[9px] text-gray-400 mt-0.5">
                                            {[edu.startDate, edu.endDate]
                                                .filter(Boolean)
                                                .join(" – ")}
                                        </p>
                                    )}
                                    {edu.location && (
                                        <p className="text-[9px] text-gray-400">
                                            {edu.location}
                                        </p>
                                    )}
                                    {edu.gpa && (
                                        <p className="text-[9px] text-gray-400">
                                            GPA: {edu.gpa}
                                        </p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </aside>

            {/* ── Main content ──────────────────────────────────── */}
            <main className="flex-1 px-7 pt-8 pb-8 flex flex-col gap-4 min-w-0">
                {/* Summary */}
                {isVisible("summary") && summary && (
                    <section>
                        <MainHeader title={t.sections.summary} />
                        <p
                            className="text-[11px] leading-relaxed text-gray-700"
                            style={{ whiteSpace: "pre-line" }}
                        >
                            {summary}
                        </p>
                    </section>
                )}

                {/* Experience */}
                {isVisible("experience") && experience.length > 0 && (
                    <section>
                        <MainHeader title={t.sections.experience} />
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
                                    </span>
                                </div>
                                {exp.location && (
                                    <p className="text-[9.5px] text-gray-400 mt-0.5">
                                        {exp.location}
                                    </p>
                                )}
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
                )}

                {/* Projects */}
                {isVisible("projects") && projects.length > 0 && (
                    <section>
                        <MainHeader title={t.sections.projects} />
                        {projects.map((proj) => (
                            <div key={proj.id} className="mb-3 last:mb-0">
                                <div className="flex items-baseline gap-2 flex-wrap">
                                    <span className="text-[12px] font-semibold text-gray-900">
                                        {proj.name}
                                    </span>
                                    {proj.url && (
                                        <span
                                            className="text-[9.5px]"
                                            style={{ color: "var(--accent)" }}
                                        >
                                            {proj.url}
                                        </span>
                                    )}
                                </div>
                                {proj.technologies.length > 0 && (
                                    <p className="text-[9.5px] text-gray-400 mt-0.5">
                                        {proj.technologies.join(" · ")}
                                    </p>
                                )}
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
                )}
            </main>
        </div>
    );
}
