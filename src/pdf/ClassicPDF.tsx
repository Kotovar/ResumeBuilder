import {
    Document,
    Page,
    View,
    Text,
    Link,
    Image,
    StyleSheet,
} from "@react-pdf/renderer";
import { computeResumeColors } from "./colors";
import { getT } from "@i18n/translations";
import { formatSalary } from "@components/Preview/templates/shared";
import { PDF_FONT_FAMILY } from "./fonts";
import { ACCENT_HEX } from "@shared/consts";
import { ensureHttps, isSafePhoto, localDateRange } from "./shared";
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

function makeStyles(accent: string, fontFamily: string) {
    return StyleSheet.create({
        page: {
            fontFamily,
            fontSize: 9,
            color: "#1a1a1a",
            paddingTop: 30,
            paddingBottom: 30,
            paddingLeft: 36,
            paddingRight: 36,
            lineHeight: 1.4,
        },
        // Header
        headerName: {
            fontSize: 20,
            fontWeight: 700,
            color: "#111827",
            lineHeight: 1.2,
            marginBottom: 4,
        },
        headerTitle: {
            fontSize: 10,
            color: accent,
            marginBottom: 6,
        },
        contactRow: {
            flexDirection: "row",
            flexWrap: "wrap",
            rowGap: 2,
            columnGap: 8,
            marginBottom: 8,
        },
        contactItem: {
            fontSize: 8,
            color: "#374151",
        },
        contactLink: {
            fontSize: 8,
            color: accent,
            textDecoration: "none",
        },
        divider: {
            borderBottomWidth: 1,
            borderBottomColor: "#e5e7eb",
            borderBottomStyle: "solid",
            marginBottom: 10,
        },
        // Section header
        sectionHeader: {
            fontSize: 7.5,
            fontWeight: 700,
            color: accent,
            letterSpacing: 1.5,
            borderBottomWidth: 1.5,
            borderBottomColor: accent,
            borderBottomStyle: "solid",
            paddingBottom: 2,
            marginBottom: 6,
            marginTop: 8,
        },
        // Summary
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
        // Education
        eduItem: {
            marginBottom: 7,
        },
        eduTopRow: {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "flex-start",
        },
        eduDegree: {
            fontSize: 9,
            fontWeight: 700,
            color: "#111827",
        },
        eduDateLocation: {
            fontSize: 7.5,
            color: "#6b7280",
            textAlign: "right",
        },
        eduInstitution: {
            fontSize: 8.5,
            color: "#6b7280",
        },
        eduGpa: {
            fontSize: 8,
            color: "#6b7280",
        },
        // Skills
        skillRow: {
            flexDirection: "row",
            marginBottom: 3,
        },
        skillCategory: {
            fontSize: 8.5,
            fontWeight: 700,
            color: "#374151",
            width: 80,
        },
        skillValues: {
            fontSize: 8.5,
            color: "#374151",
            flex: 1,
        },
        // Header photo
        headerRow: {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginBottom: 0,
        },
        headerLeft: {
            flex: 1,
        },
        headerPhoto: {
            width: 56,
            height: 56,
            borderRadius: 4,
            marginLeft: 12,
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

export function ClassicPDF({ data }: Props) {
    const { personal, settings, sections } = data;
    const colors = computeResumeColors(ACCENT_HEX[settings.accentColor]);
    const fontFamily = PDF_FONT_FAMILY[settings.fontFamily];
    const t = getT(settings.lang);
    const S = makeStyles(colors.accent, fontFamily);

    const contactItems: { label: string; href?: string }[] = [];
    if (personal.email)
        contactItems.push({
            label: personal.email,
            href: `mailto:${personal.email}`,
        });
    if (personal.phone)
        contactItems.push({
            label: personal.phone,
            href: `tel:${personal.phone}`,
        });
    if (personal.location) contactItems.push({ label: personal.location });
    if (personal.website)
        contactItems.push({
            label: personal.website,
            href: ensureHttps(personal.website),
        });
    if (personal.linkedin)
        contactItems.push({
            label: personal.linkedin,
            href: ensureHttps(personal.linkedin),
        });
    if (personal.github)
        contactItems.push({
            label: personal.github,
            href: ensureHttps(personal.github),
        });
    if (personal.salary?.amount) {
        const salaryLabel = t.personal.salary;
        const salaryFormatted = formatSalary(
            personal.salary.amount,
            personal.salary.currency,
        );
        contactItems.push({ label: `${salaryLabel}: ${salaryFormatted}` });
    }

    // PDF always includes all sections (ignore visibility flags)
    // Personal info is rendered separately in the header

    return (
        <Document>
            <Page size="A4" style={S.page}>
                {/* Header - Personal Info (always rendered) */}
                <View style={S.headerRow}>
                    <View style={S.headerLeft}>
                        {personal.fullName ? (
                            <Text style={S.headerName}>
                                {personal.fullName}
                            </Text>
                        ) : null}
                        {personal.title ? (
                            <Text style={S.headerTitle}>{personal.title}</Text>
                        ) : null}
                        {contactItems.length > 0 && (
                            <View style={S.contactRow}>
                                {contactItems.map((item, i) =>
                                    item.href ? (
                                        <Link key={i} src={item.href}>
                                            <Text style={S.contactLink}>
                                                {item.label}
                                            </Text>
                                        </Link>
                                    ) : (
                                        <Text key={i} style={S.contactItem}>
                                            {item.label}
                                        </Text>
                                    ),
                                )}
                            </View>
                        )}
                    </View>
                    {isSafePhoto(personal.photo) ? (
                        <Image src={personal.photo!} style={S.headerPhoto} />
                    ) : null}
                </View>
                <View style={S.divider} />

                {/* Sections - render all sections from order, ignoring visibility */}
                {sections.map((sec) => {
                    // Personal section is rendered in header, skip here
                    if (sec.id === "personal") return null;
                    if (sec.id === "summary") {
                        return (
                            <View key="summary">
                                <Text style={S.sectionHeader}>
                                    {t.sections.summary.toUpperCase()}
                                </Text>
                                {data.summary
                                    ? data.summary.split("\n").map((line, i) =>
                                          line.trim() ? (
                                              <Text
                                                  key={i}
                                                  style={S.summaryParagraph}
                                              >
                                                  {line}
                                              </Text>
                                          ) : (
                                              <View
                                                  key={i}
                                                  style={{ height: 8 }}
                                              />
                                          ),
                                      )
                                    : null}
                            </View>
                        );
                    }

                    if (sec.id === "experience") {
                        return (
                            <View key="experience">
                                <Text style={S.sectionHeader}>
                                    {t.sections.experience.toUpperCase()}
                                </Text>
                                {data.experience.map((exp: ExperienceEntry) => (
                                    <View key={exp.id} style={S.expItem}>
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
                                                        settings.lang,
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
                                                          style={
                                                              S.expDescription
                                                          }
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
                            </View>
                        );
                    }

                    if (sec.id === "education") {
                        return (
                            <View key="education">
                                <Text style={S.sectionHeader}>
                                    {t.sections.education.toUpperCase()}
                                </Text>
                                {data.education.map((edu: EducationEntry) => (
                                    <View key={edu.id} style={S.eduItem}>
                                        <View style={S.eduTopRow}>
                                            <Text style={S.eduDegree}>
                                                {[edu.degree, edu.field]
                                                    .filter(Boolean)
                                                    .join(" · ")}
                                            </Text>
                                            <Text style={S.eduDateLocation}>
                                                {[
                                                    localDateRange(
                                                        edu.startDate,
                                                        edu.endDate,
                                                        false,
                                                        t.experience.present,
                                                        settings.lang,
                                                    ),
                                                    edu.location,
                                                ]
                                                    .filter(Boolean)
                                                    .join(" · ")}
                                            </Text>
                                        </View>
                                        {edu.institution ? (
                                            <Text style={S.eduInstitution}>
                                                {edu.institution}
                                            </Text>
                                        ) : null}
                                        {edu.gpa ? (
                                            <Text style={S.eduGpa}>
                                                GPA: {edu.gpa}
                                            </Text>
                                        ) : null}
                                    </View>
                                ))}
                            </View>
                        );
                    }

                    if (sec.id === "skills") {
                        return (
                            <View key="skills">
                                <Text style={S.sectionHeader}>
                                    {t.sections.skills.toUpperCase()}
                                </Text>
                                {data.skills.map((group: SkillGroup) => (
                                    <View key={group.id} style={S.skillRow}>
                                        <Text style={S.skillCategory}>
                                            {group.category}
                                        </Text>
                                        <Text style={S.skillValues}>
                                            {group.skills.join(" · ")}
                                        </Text>
                                    </View>
                                ))}
                            </View>
                        );
                    }

                    if (sec.id === "projects") {
                        return (
                            <View key="projects">
                                <Text style={S.sectionHeader}>
                                    {t.sections.projects.toUpperCase()}
                                </Text>
                                {data.projects.map((proj: ProjectEntry) => (
                                    <View key={proj.id} style={S.projectItem}>
                                        <View style={S.projectTopRow}>
                                            <Text style={S.projectName}>
                                                {proj.name}
                                            </Text>
                                            {proj.url ? (
                                                <Link
                                                    src={ensureHttps(proj.url)}
                                                >
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
                            </View>
                        );
                    }

                    return null;
                })}
            </Page>
        </Document>
    );
}
