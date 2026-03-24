import {
    Document,
    Page,
    View,
    Text,
    Link,
    StyleSheet,
} from "@react-pdf/renderer";
import type {
    ResumeData,
    ExperienceEntry,
    EducationEntry,
    SkillGroup,
    ProjectEntry,
} from "../types/resume";
import { ACCENT_HEX, computeResumeColors, type ResumeColors } from "./colors";
import { PDF_FONT_FAMILY } from "./fonts";
import { getT } from "../i18n/translations";
import { fmtDate } from "../components/Preview/templates/shared";

interface Props {
    data: ResumeData;
}

const SIDEBAR_WIDTH = 150;

function localDateRange(
    start: string,
    end: string,
    current: boolean,
    presentLabel: string,
): string {
    const s = fmtDate(start);
    const e = current ? presentLabel : fmtDate(end);
    if (!s && !e) return "";
    if (!s) return e;
    if (!e) return s;
    return `${s} – ${e}`;
}

function ensureHttps(url: string): string {
    if (!url) return url;
    if (url.startsWith("http://") || url.startsWith("https://")) return url;
    return `https://${url}`;
}

function makeStyles(colors: ResumeColors, fontFamily: string) {
    const { accent, sidebarBg, sidebarHeaderText, mainBorder, skillTagBg } =
        colors;
    return StyleSheet.create({
        page: {
            fontFamily,
            fontSize: 9,
            color: "#1a1a1a",
            flexDirection: "row",
        },
        // Fixed sidebar background
        sidebarBgFixed: {
            position: "absolute",
            top: 0,
            left: 0,
            width: SIDEBAR_WIDTH,
            height: "100%",
            backgroundColor: sidebarBg,
        },
        // Sidebar content column
        sidebar: {
            width: SIDEBAR_WIDTH,
            paddingTop: 24,
            paddingBottom: 24,
            paddingLeft: 14,
            paddingRight: 14,
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
            paddingTop: 24,
            paddingBottom: 24,
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
    const { personal, settings } = data;
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

    // All skills across groups (for sidebar tag display)
    const allSkillGroups = data.skills;

    return (
        <Document>
            <Page size="A4" style={S.page}>
                {/* Fixed sidebar background — appears on all pages */}
                <View fixed style={S.sidebarBgFixed} />

                {/* Sidebar content */}
                <View style={S.sidebar}>
                    {personal.fullName ? (
                        <Text style={S.sidebarName}>{personal.fullName}</Text>
                    ) : null}
                    {personal.title ? (
                        <Text style={S.sidebarTitle}>{personal.title}</Text>
                    ) : null}

                    {/* Contact */}
                    {contactEntries.length > 0 && (
                        <>
                            <Text style={S.sidebarSectionHeader}>
                                {"CONTACT"}
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

                    {/* Skills */}
                    {allSkillGroups.length > 0 && (
                        <>
                            <Text style={S.sidebarSectionHeader}>
                                {t.sections.skills.toUpperCase()}
                            </Text>
                            {allSkillGroups.map((group: SkillGroup) => (
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
                                        {group.skills.map((skill, i) => (
                                            <View key={i} style={S.skillTag}>
                                                <Text style={S.skillTagText}>
                                                    {skill}
                                                </Text>
                                            </View>
                                        ))}
                                    </View>
                                </View>
                            ))}
                        </>
                    )}

                    {/* Education in sidebar */}
                    {data.education.length > 0 && (
                        <>
                            <Text style={S.sidebarSectionHeader}>
                                {t.sections.education.toUpperCase()}
                            </Text>
                            {data.education.map((edu: EducationEntry) => (
                                <View key={edu.id} style={S.sidebarEduItem}>
                                    <Text style={S.sidebarEduDegree}>
                                        {[edu.degree, edu.field]
                                            .filter(Boolean)
                                            .join(" · ")}
                                    </Text>
                                    {edu.institution ? (
                                        <Text style={S.sidebarEduInstitution}>
                                            {edu.institution}
                                        </Text>
                                    ) : null}
                                    <Text style={S.sidebarEduDate}>
                                        {[
                                            localDateRange(
                                                edu.startDate,
                                                edu.endDate,
                                                false,
                                                t.experience.present,
                                            ),
                                            edu.location,
                                        ]
                                            .filter(Boolean)
                                            .join(" · ")}
                                    </Text>
                                    {edu.gpa ? (
                                        <Text style={S.sidebarEduDate}>
                                            GPA: {edu.gpa}
                                        </Text>
                                    ) : null}
                                </View>
                            ))}
                        </>
                    )}
                </View>

                {/* Main content */}
                <View style={S.main}>
                    {/* Summary */}
                    {data.summary && (
                        <>
                            <Text style={S.mainSectionHeader}>
                                {t.sections.summary.toUpperCase()}
                            </Text>
                            <Text style={S.summaryText}>{data.summary}</Text>
                        </>
                    )}

                    {/* Experience */}
                    {data.experience.length > 0 && (
                        <>
                            <Text style={S.mainSectionHeader}>
                                {t.sections.experience.toUpperCase()}
                            </Text>
                            {data.experience.map((exp: ExperienceEntry) => (
                                <View
                                    key={exp.id}
                                    style={S.expItem}
                                    wrap={false}
                                >
                                    <View style={S.expTopRow}>
                                        <Text style={S.expPosition}>
                                            {exp.position}
                                        </Text>
                                        <Text style={S.expDateLocation}>
                                            {[
                                                localDateRange(
                                                    exp.startDate,
                                                    exp.endDate,
                                                    exp.current,
                                                    t.experience.present,
                                                ),
                                                exp.location,
                                            ]
                                                .filter(Boolean)
                                                .join(" · ")}
                                        </Text>
                                    </View>
                                    {exp.company ? (
                                        <Text style={S.expCompany}>
                                            {exp.company}
                                        </Text>
                                    ) : null}
                                    {exp.description
                                        ? exp.description
                                              .split("\n")
                                              .map((line, i) => (
                                                  <Text
                                                      key={i}
                                                      style={S.expDescription}
                                                  >
                                                      {line}
                                                  </Text>
                                              ))
                                        : null}
                                    {exp.highlights
                                        .filter(Boolean)
                                        .map((h, i) => (
                                            <View key={i} style={S.bullet}>
                                                <Text style={S.bulletDot}>
                                                    •
                                                </Text>
                                                <Text style={S.bulletText}>
                                                    {h}
                                                </Text>
                                            </View>
                                        ))}
                                </View>
                            ))}
                        </>
                    )}

                    {/* Projects */}
                    {data.projects.length > 0 && (
                        <>
                            <Text style={S.mainSectionHeader}>
                                {t.sections.projects.toUpperCase()}
                            </Text>
                            {data.projects.map((proj: ProjectEntry) => (
                                <View
                                    key={proj.id}
                                    style={S.projectItem}
                                    wrap={false}
                                >
                                    <View style={S.projectTopRow}>
                                        <Text style={S.projectName}>
                                            {proj.name}
                                        </Text>
                                        {proj.url ? (
                                            <Link src={ensureHttps(proj.url)}>
                                                <Text style={S.projectUrl}>
                                                    {proj.url}
                                                </Text>
                                            </Link>
                                        ) : null}
                                    </View>
                                    {proj.technologies.length > 0 ? (
                                        <Text style={S.projectTech}>
                                            {proj.technologies.join(", ")}
                                        </Text>
                                    ) : null}
                                    {proj.description ? (
                                        <Text style={S.projectDesc}>
                                            {proj.description}
                                        </Text>
                                    ) : null}
                                    {proj.highlights
                                        .filter(Boolean)
                                        .map((h, i) => (
                                            <View key={i} style={S.bullet}>
                                                <Text style={S.bulletDot}>
                                                    •
                                                </Text>
                                                <Text style={S.bulletText}>
                                                    {h}
                                                </Text>
                                            </View>
                                        ))}
                                </View>
                            ))}
                        </>
                    )}
                </View>
            </Page>
        </Document>
    );
}
