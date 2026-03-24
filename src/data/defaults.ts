import type { ResumeData } from "@type/resume";

/** Creates a fresh default resume with new UUIDs each call. */
export function createDefaultResume(): ResumeData {
    return {
        personal: {
            fullName: "Alex Johnson",
            title: "Senior Software Engineer",
            email: "alex@example.com",
            phone: "+1 (555) 123-4567",
            location: "San Francisco, CA",
            website: "alexjohnson.dev",
            linkedin: "linkedin.com/in/alexjohnson",
            github: "github.com/alexjohnson",
        },
        summary:
            "Experienced software engineer with 8+ years building scalable web applications. " +
            "Passionate about clean code, performance optimization, and mentoring. " +
            "Led cross-functional teams delivering products used by millions of users.",
        experience: [
            {
                id: crypto.randomUUID(),
                company: "Acme Corp",
                position: "Senior Software Engineer",
                location: "San Francisco, CA",
                startDate: "2021-01",
                endDate: "",
                current: true,
                description:
                    "Led a 6-person team responsible for the core platform. Owned the full-stack architecture across billing, authentication, and third-party integrations.",
                highlights: [
                    "Led migration to microservices architecture, reducing API latency by 40%",
                    "Mentored 5 engineers, improving sprint velocity by 25%",
                    "Owned full-stack billing system handling $50M/year in transactions",
                ],
            },
            {
                id: crypto.randomUUID(),
                company: "StartupXYZ",
                position: "Software Engineer",
                location: "Remote",
                startDate: "2018-06",
                endDate: "2021-01",
                current: false,
                description: "",
                highlights: [
                    "Built real-time analytics dashboard for 200+ enterprise clients",
                    "Reduced infrastructure costs 30% through strategic caching optimizations",
                ],
            },
        ],
        education: [
            {
                id: crypto.randomUUID(),
                institution: "University of California, Berkeley",
                degree: "B.S.",
                field: "Computer Science",
                location: "Berkeley, CA",
                startDate: "2014-09",
                endDate: "2018-05",
                gpa: "3.8",
            },
        ],
        skills: [
            {
                id: crypto.randomUUID(),
                category: "Languages",
                skills: ["TypeScript", "Python", "Go", "SQL"],
            },
            {
                id: crypto.randomUUID(),
                category: "Frontend",
                skills: ["React", "Next.js", "TailwindCSS", "GraphQL"],
            },
            {
                id: crypto.randomUUID(),
                category: "Backend & Cloud",
                skills: ["Node.js", "PostgreSQL", "Redis", "AWS", "Docker"],
            },
        ],
        projects: [
            {
                id: crypto.randomUUID(),
                name: "OpenMetrics",
                description:
                    "Open-source observability platform with 2k+ GitHub stars",
                technologies: ["Go", "React", "Prometheus", "Grafana"],
                url: "openmetrics.dev",
                github: "github.com/alexjohnson/openmetrics",
                highlights: [
                    "Designed plugin system enabling 50+ community integrations",
                    "Maintained 99.9% uptime across distributed multi-region deployment",
                ],
            },
        ],
        sections: [
            { id: "personal", title: "Personal Info", visible: true },
            { id: "summary", title: "Summary", visible: true },
            { id: "experience", title: "Experience", visible: true },
            { id: "education", title: "Education", visible: true },
            { id: "skills", title: "Skills", visible: true },
            { id: "projects", title: "Projects", visible: true },
        ],
        settings: {
            template: "classic",
            accentColor: "blue",
            fontFamily: "ptsans",
            lang: "en",
        },
    };
}

export const defaultResume = createDefaultResume();
