import {
    Document,
    Page,
    View,
    Text,
    Link,
    Image,
    StyleSheet,
} from "@react-pdf/renderer";
import { computeResumeColors, type ResumeColors } from "./colors";
import { getT } from "../i18n/translations";
import { formatSalary } from "../components/Preview/templates/shared";
import { PDF_FONT_FAMILY } from "./fonts";
import { ACCENT_HEX } from "@shared/consts";
import {
    ensureHttps,
    isMainSection,
    isSafePhoto,
    isSidebarSection,
    localDateRange,
} from "./shared";
import type {
    ResumeData,
    ExperienceEntry,
    EducationEntry,
    SkillGroup,
    ProjectEntry,
} from "@type/resume";

interface Props {
    data: ResumeData;
}

const SIDEBAR_WIDTH = 150;

function makeStyles(colors: ResumeColors, fontFamily: string) {
    const { accent, sidebarBg, sidebarHeaderText, mainBorder, skillTagBg } =
        colors;
    return StyleSheet.create({
        page: {
            fontFamily,
            fontSize: 9,
            color: "#1a1a1a",
            flexDirection: "row",
            paddingTop: 24,
            paddingBottom: 24,
        },
        sidebarBgFixed: {
            position: "absolute",
            top: 0,
            left: 0,
            width: SIDEBAR_WIDTH,
            height: 900,
            backgroundColor: sidebarBg,
        },
        // Sidebar content column
        sidebar: {
            width: SIDEBAR_WIDTH,
            paddingLeft: 14,
            paddingRight: 14,
        },
        sidebarPhoto: {
            width: 60,
            height: 60,
            borderRadius: 4,
            alignSelf: "center",
            marginBottom: 10,
        },
        sidebarName: {
            fontSize: 14,
            fontWeight: 700,
            color: accent,
            marginBottom: 3,
            lineHeight: 1.2,
        },
        sidebarTitle: {
            fontSize: 8,
            color: "#6b7280",
            marginBottom: 12,
        },
        sidebarSectionHeader: {
            fontSize: 6.5,
            fontWeight: 700,
            // color-mix(in srgb, accent 20%, white 80%) — faded accent, matches SidebarHeader in HTML
            color: sidebarHeaderText,
            letterSpacing: 1,
            borderBottomWidth: 1,
            // border-white/30 — white at 30% opacity, matches SidebarHeader className in HTML
            borderBottomColor: mainBorder,
            borderBottomStyle: "solid",
            paddingBottom: 2,
            marginBottom: 5,
            marginTop: 10,
        },
        // Contact items in sidebar
        contactItem: {
            marginBottom: 5,
        },
        contactLabel: {
            fontSize: 6,
            color: "#9ca3af",
            fontWeight: 700,
        },
        contactValue: {
            fontSize: 7,
            color: "#6b7280",
        },
        contactLink: {
            fontSize: 7,
            color: "#6b7280",
            textDecoration: "none",
        },
        // Skills tags
        skillsWrap: {
            flexDirection: "row",
            flexWrap: "wrap",
            rowGap: 3,
            columnGap: 3,
        },
        skillTag: {
            // color-mix(in srgb, accent 12%, white) — matches skill badge in HTML
            backgroundColor: skillTagBg,
            borderRadius: 2,
            paddingTop: 2,
            paddingBottom: 2,
            paddingLeft: 4,
            paddingRight: 4,
        },
        skillTagText: {
            fontSize: 6.5,
            color: accent,
        },
        // Education in sidebar
        sidebarEduItem: {
            marginBottom: 6,
        },
        sidebarEduDegree: {
            fontSize: 8,
            fontWeight: 700,
            color: "#374151",
        },
        sidebarEduInstitution: {
            fontSize: 7,
            color: "#6b7280",
        },
        sidebarEduDate: {
            fontSize: 7,
            color: "#9ca3af",
        },
        // Main content
        main: {
            flex: 1,
            paddingLeft: 20,
            paddingRight: 20,
        },
        mainSectionHeader: {
            fontSize: 8,
            fontWeight: 700,
            // var(--accent) — matches MainHeader text in HTML
            color: accent,
            letterSpacing: 1,
            borderBottomWidth: 1,
            // accentTint(accent, 0.30) — opaque equivalent of color-mix(in srgb, accent 30%, transparent) on white
            borderBottomColor: mainBorder,
            borderBottomStyle: "solid",
            paddingBottom: 2,
            marginBottom: 6,
            marginTop: 10,
        },
        summaryText: {
            fontSize: 9,
            color: "#374151",
            lineHeight: 1.5,
        },
        summaryParagraph: {
            fontSize: 9,
            color: "#374151",
            lineHeight: 1.5,
            marginBottom: 8,
        },
        // Experience
        expItem: {
            marginBottom: 8,
        },
        expTopRow: {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginBottom: 1,
        },
        expPosition: {
            fontSize: 9,
            fontWeight: 700,
            color: "#111827",
        },
        expDateLocation: {
            fontSize: 7.5,
            color: "#6b7280",
            textAlign: "right",
        },
        expCompany: {
            fontSize: 8.5,
            color: "#6b7280",
            marginBottom: 3,
        },
        expDescription: {
            fontSize: 8.5,
            color: "#374151",
            lineHeight: 1.4,
            marginBottom: 2,
        },
        bullet: {
            flexDirection: "row",
            marginBottom: 2,
        },
        bulletDot: {
            fontSize: 8.5,
            color: "#374151",
            width: 10,
        },
        bulletText: {
            fontSize: 8.5,
            color: "#374151",
            flex: 1,
            lineHeight: 1.4,
        },
        // Projects
        projectItem: {
            marginBottom: 8,
        },
        projectTopRow: {
            flexDirection: "row",
            alignItems: "center",
            columnGap: 6,
            marginBottom: 2,
        },
        projectName: {
            fontSize: 9,
            fontWeight: 700,
            color: "#111827",
        },
        projectUrl: {
            fontSize: 8,
            color: accent,
            textDecoration: "none",
        },
        projectTech: {
            fontSize: 8,
            color: "#6b7280",
            marginBottom: 2,
        },
        projectDesc: {
            fontSize: 8.5,
            color: "#374151",
            lineHeight: 1.4,
            marginBottom: 2,
        },
    });
}

export function ModernPDF({ data }: Props) {
    const { personal, settings, sections } = data;
    const colors = computeResumeColors(ACCENT_HEX[settings.accentColor]);
    const fontFamily = PDF_FONT_FAMILY[settings.fontFamily];
    const t = getT(settings.lang);
    const S = makeStyles(colors, fontFamily);

    type ContactEntry = { label: string; value: string; href?: string };
    const contactEntries: ContactEntry[] = [];
    if (personal.email)
        contactEntries.push({
            label: t.personal.email,
            value: personal.email,
            href: `mailto:${personal.email}`,
        });
    if (personal.phone)
        contactEntries.push({
            label: t.personal.phone,
            value: personal.phone,
            href: `tel:${personal.phone}`,
        });
    if (personal.location)
        contactEntries.push({
            label: t.personal.location,
            value: personal.location,
        });
    if (personal.website)
        contactEntries.push({
            label: t.personal.website,
            value: personal.website,
            href: ensureHttps(personal.website),
        });
    if (personal.linkedin)
        contactEntries.push({
            label: t.personal.linkedin,
            value: personal.linkedin,
            href: ensureHttps(personal.linkedin),
        });
    if (personal.github)
        contactEntries.push({
            label: t.personal.github,
            value: personal.github,
            href: ensureHttps(personal.github),
        });
    if (personal.telegram)
        contactEntries.push({
            label: t.personal.telegram,
            value: personal.telegram,
            href: personal.telegram.startsWith("@")
                ? `https://t.me/${personal.telegram.slice(1)}`
                : `https://t.me/${personal.telegram}`,
        });
    if (personal.salary?.amount)
        contactEntries.push({
            label: t.personal.salary,
            value: formatSalary(
                personal.salary.amount,
                personal.salary.currency,
            ),
        });

    // All skills across groups (for sidebar tag display)
    const allSkillGroups = data.skills;

    return (
        <Document>
            <Page size="A4" style={S.page}>
                {/* Sidebar background — fixed so it repeats on every page */}
                <View fixed style={S.sidebarBgFixed} />
                {/* Sidebar content — render sections in editor order */}
                <View style={S.sidebar}>
                    {/* Personal info (always first in sidebar) */}
                    {isSafePhoto(personal.photo) ? (
                        <Image src={personal.photo!} style={S.sidebarPhoto} />
                    ) : null}
                    {personal.fullName ? (
                        <Text style={S.sidebarName}>{personal.fullName}</Text>
                    ) : null}
                    {personal.title ? (
                        <Text style={S.sidebarTitle}>{personal.title}</Text>
                    ) : null}

                    {/* Contact info */}
                    {contactEntries.length > 0 && (
                        <>
                            <Text style={S.sidebarSectionHeader}>
                                {t.sections.personal.toUpperCase()}
                            </Text>
                            {contactEntries.map((entry, i) => (
                                <View key={i} style={S.contactItem}>
                                    <Text style={S.contactLabel}>
                                        {entry.label}
                                    </Text>
                                    {entry.href ? (
                                        <Link src={entry.href}>
                                            <Text style={S.contactLink}>
                                                {entry.value}
                                            </Text>
                                        </Link>
                                    ) : (
                                        <Text style={S.contactValue}>
                                            {entry.value}
                                        </Text>
                                    )}
                                </View>
                            ))}
                        </>
                    )}

                    {/* Skills and Education — render in section order */}
                    {sections
                        .filter(
                            (sec) =>
                                isSidebarSection(sec.id) &&
                                sec.id !== "personal" &&
                                sec.visible,
                        )
                        .map((sec) => {
                            if (sec.id === "skills") {
                                return (
                                    <View key="skills">
                                        <Text style={S.sidebarSectionHeader}>
                                            {t.sections.skills.toUpperCase()}
                                        </Text>
                                        {allSkillGroups.map(
                                            (group: SkillGroup) => (
                                                <View
                                                    key={group.id}
                                                    style={{ marginBottom: 4 }}
                                                >
                                                    {group.category ? (
                                                        <Text
                                                            style={{
                                                                fontSize: 6.5,
                                                                color: "#9ca3af",
                                                                fontWeight: 700,
                                                                marginBottom: 2,
                                                            }}
                                                        >
                                                            {group.category.toUpperCase()}
                                                        </Text>
                                                    ) : null}
                                                    <View style={S.skillsWrap}>
                                                        {group.skills.map(
                                                            (skill, i) => (
                                                                <View
                                                                    key={i}
                                                                    style={
                                                                        S.skillTag
                                                                    }
                                                                >
                                                                    <Text
                                                                        style={
                                                                            S.skillTagText
                                                                        }
                                                                    >
                                                                        {skill}
                                                                    </Text>
                                                                </View>
                                                            ),
                                                        )}
                                                    </View>
                                                </View>
                                            ),
                                        )}
                                    </View>
                                );
                            }
                            if (sec.id === "education") {
                                return (
                                    <View key="education">
                                        <Text style={S.sidebarSectionHeader}>
                                            {t.sections.education.toUpperCase()}
                                        </Text>
                                        {data.education.map(
                                            (edu: EducationEntry) => (
                                                <View
                                                    key={edu.id}
                                                    style={S.sidebarEduItem}
                                                >
                                                    <Text
                                                        style={
                                                            S.sidebarEduDegree
                                                        }
                                                    >
                                                        {edu.degree && edu.field
                                                            ? `${edu.degree} ${t.education.in} ${edu.field}`
                                                            : edu.degree ||
                                                              edu.field}
                                                    </Text>
                                                    {edu.institution ? (
                                                        <Text
                                                            style={
                                                                S.sidebarEduInstitution
                                                            }
                                                        >
                                                            {edu.institution}
                                                        </Text>
                                                    ) : null}
                                                    <Text
                                                        style={S.sidebarEduDate}
                                                    >
                                                        {[
                                                            localDateRange(
                                                                edu.startDate,
                                                                edu.endDate,
                                                                false,
                                                                t.experience
                                                                    .present,
                                                                settings.lang,
                                                            ),
                                                            edu.location,
                                                        ]
                                                            .filter(Boolean)
                                                            .join(" · ")}
                                                    </Text>
                                                    {edu.gpa ? (
                                                        <Text
                                                            style={
                                                                S.sidebarEduDate
                                                            }
                                                        >
                                                            GPA: {edu.gpa}
                                                        </Text>
                                                    ) : null}
                                                </View>
                                            ),
                                        )}
                                    </View>
                                );
                            }
                            return null;
                        })}
                </View>
                {/* Main content — render sections in editor order */}
                <View style={S.main}>
                    {sections
                        .filter((sec) => isMainSection(sec.id) && sec.visible)
                        .map((sec) => {
                            if (sec.id === "summary") {
                                return data.summary ? (
                                    <View key="summary">
                                        <Text style={S.mainSectionHeader}>
                                            {t.sections.summary.toUpperCase()}
                                        </Text>
                                        {data.summary
                                            .split("\n")
                                            .map((line, i) =>
                                                line.trim() ? (
                                                    <Text
                                                        key={i}
                                                        style={
                                                            S.summaryParagraph
                                                        }
                                                    >
                                                        {line}
                                                    </Text>
                                                ) : (
                                                    <View
                                                        key={i}
                                                        style={{ height: 8 }}
                                                    />
                                                ),
                                            )}
                                    </View>
                                ) : null;
                            }
                            if (sec.id === "experience") {
                                return data.experience.length > 0 ? (
                                    <View key="experience">
                                        <Text style={S.mainSectionHeader}>
                                            {t.sections.experience.toUpperCase()}
                                        </Text>
                                        {data.experience.map(
                                            (exp: ExperienceEntry) => (
                                                <View
                                                    key={exp.id}
                                                    style={S.expItem}
                                                >
                                                    <View style={S.expTopRow}>
                                                        <Text
                                                            style={
                                                                S.expPosition
                                                            }
                                                        >
                                                            {exp.position}
                                                        </Text>
                                                        <Text
                                                            style={
                                                                S.expDateLocation
                                                            }
                                                        >
                                                            {[
                                                                localDateRange(
                                                                    exp.startDate,
                                                                    exp.endDate,
                                                                    exp.current,
                                                                    t.experience
                                                                        .present,
                                                                    settings.lang,
                                                                ),
                                                                exp.location,
                                                            ]
                                                                .filter(Boolean)
                                                                .join(" · ")}
                                                        </Text>
                                                    </View>
                                                    {exp.company ? (
                                                        <Text
                                                            style={S.expCompany}
                                                        >
                                                            {exp.company}
                                                        </Text>
                                                    ) : null}
                                                    {exp.description
                                                        ? exp.description
                                                              .split("\n")
                                                              .map(
                                                                  (line, i) => (
                                                                      <Text
                                                                          key={
                                                                              i
                                                                          }
                                                                          style={
                                                                              S.expDescription
                                                                          }
                                                                      >
                                                                          {line}
                                                                      </Text>
                                                                  ),
                                                              )
                                                        : null}
                                                    {exp.highlights
                                                        .filter(Boolean)
                                                        .map((h, i) => (
                                                            <View
                                                                key={i}
                                                                style={S.bullet}
                                                            >
                                                                <Text
                                                                    style={
                                                                        S.bulletDot
                                                                    }
                                                                >
                                                                    •
                                                                </Text>
                                                                <Text
                                                                    style={
                                                                        S.bulletText
                                                                    }
                                                                >
                                                                    {h}
                                                                </Text>
                                                            </View>
                                                        ))}
                                                </View>
                                            ),
                                        )}
                                    </View>
                                ) : null;
                            }
                            if (sec.id === "projects") {
                                return data.projects.length > 0 ? (
                                    <View key="projects">
                                        <Text style={S.mainSectionHeader}>
                                            {t.sections.projects.toUpperCase()}
                                        </Text>
                                        {data.projects.map(
                                            (proj: ProjectEntry) => (
                                                <View
                                                    key={proj.id}
                                                    style={S.projectItem}
                                                >
                                                    <View
                                                        style={S.projectTopRow}
                                                    >
                                                        <Text
                                                            style={
                                                                S.projectName
                                                            }
                                                        >
                                                            {proj.name}
                                                        </Text>
                                                        {proj.url ? (
                                                            <Link
                                                                src={ensureHttps(
                                                                    proj.url,
                                                                )}
                                                            >
                                                                <Text
                                                                    style={
                                                                        S.projectUrl
                                                                    }
                                                                >
                                                                    {proj.url}
                                                                </Text>
                                                            </Link>
                                                        ) : null}
                                                    </View>
                                                    {proj.technologies.length >
                                                    0 ? (
                                                        <Text
                                                            style={
                                                                S.projectTech
                                                            }
                                                        >
                                                            {proj.technologies.join(
                                                                ", ",
                                                            )}
                                                        </Text>
                                                    ) : null}
                                                    {proj.description ? (
                                                        <Text
                                                            style={
                                                                S.projectDesc
                                                            }
                                                        >
                                                            {proj.description}
                                                        </Text>
                                                    ) : null}
                                                    {proj.highlights
                                                        .filter(Boolean)
                                                        .map((h, i) => (
                                                            <View
                                                                key={i}
                                                                style={S.bullet}
                                                            >
                                                                <Text
                                                                    style={
                                                                        S.bulletDot
                                                                    }
                                                                >
                                                                    •
                                                                </Text>
                                                                <Text
                                                                    style={
                                                                        S.bulletText
                                                                    }
                                                                >
                                                                    {h}
                                                                </Text>
                                                            </View>
                                                        ))}
                                                </View>
                                            ),
                                        )}
                                    </View>
                                ) : null;
                            }
                            return null;
                        })}
                </View>
            </Page>
        </Document>
    );
}
