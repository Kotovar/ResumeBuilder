import type { Lang, SectionId } from "@type/resume";

export interface Translations {
    toolbar: {
        brand: string;
        template: string;
        font: string;
        color: string;
        language: string;
        classic: string;
        modern: string;
        reset: string;
        import: string;
        saveJSON: string;
        exportPDF: string;
    };
    sections: Record<SectionId, string>;
    editor: { label: string };
    personal: {
        tip: string;
        fullName: string;
        professionalTitle: string;
        email: string;
        phone: string;
        location: string;
        website: string;
        linkedin: string;
        github: string;
        photo: string;
        photoUpload: string;
        photoReplace: string;
        photoRemove: string;
        salary: string;
        salaryAmount: string;
        salaryCurrency: string;
        salaryPlaceholder: string;
        phName: string;
        phTitle: string;
        phEmail: string;
        phPhone: string;
        phLocation: string;
        phWebsite: string;
        phLinkedin: string;
        phGithub: string;
    };
    summary: {
        label: string;
        tip: string;
        wordCount: (n: number) => string;
        wordCountWarning: string;
        recommended: string;
        placeholder: string;
    };
    experience: {
        tip: string;
        addButton: string;
        removeButton: string;
        newPosition: string;
        position: string;
        company: string;
        location: string;
        currentLabel: string;
        currentCheck: string;
        startDate: string;
        endDate: string;
        description: string;
        phDescription: string;
        achievements: string;
        achieveTip: string;
        phAchieve: string;
        present: string;
    };
    education: {
        addButton: string;
        removeButton: string;
        newDegree: string;
        institution: string;
        degree: string;
        field: string;
        location: string;
        gpa: string;
        startDate: string;
        endDate: string;
        phInstitution: string;
        phDegree: string;
        phField: string;
        phLocation: string;
    };
    skills: {
        tip: string;
        addButton: string;
        removeButton: string;
        category: string;
        skillsLabel: string;
        phCategory: string;
        phSkills: string;
    };
    projects: {
        tip: string;
        addButton: string;
        removeButton: string;
        newProject: string;
        name: string;
        description: string;
        url: string;
        github: string;
        technologies: string;
        highlights: string;
        highlightTip: string;
        phName: string;
        phDescription: string;
        phHighlight: string;
        phTech: string;
    };
    confirm: { reset: string };
    ui: { addBullet: string };
    months: {
        short: string[]; // Abbreviated: Jan, Feb, Mar...
    };
}

// ── English ────────────────────────────────────────────────
const en: Translations = {
    toolbar: {
        brand: "Resume Builder",
        template: "Template",
        font: "Font",
        color: "Color",
        language: "Language",
        classic: "Classic",
        modern: "Modern",
        reset: "Reset",
        import: "Import",
        saveJSON: "Save JSON",
        exportPDF: "Export PDF",
    },
    sections: {
        personal: "Personal Info",
        summary: "Summary",
        experience: "Experience",
        education: "Education",
        skills: "Skills",
        projects: "Projects",
    },
    editor: { label: "Editor" },
    personal: {
        tip: "Your title should match the role you're applying for, not just your current job title. Recruiters scan this in seconds.",
        fullName: "Full Name",
        professionalTitle: "Professional Title",
        email: "Email",
        phone: "Phone",
        location: "Location",
        website: "Website",
        linkedin: "LinkedIn",
        github: "GitHub",
        photo: "Profile Photo",
        photoUpload: "Upload Photo",
        photoReplace: "Replace",
        photoRemove: "Remove",
        salary: "Salary",
        salaryAmount: "Expected Salary",
        salaryCurrency: "Currency",
        salaryPlaceholder: "2000",
        phName: "Jane Smith",
        phTitle: "Senior Software Engineer",
        phEmail: "jane@example.com",
        phPhone: "+1 555 123 4567",
        phLocation: "San Francisco, CA",
        phWebsite: "yoursite.com",
        phLinkedin: "linkedin.com/in/you",
        phGithub: "github.com/you",
    },
    summary: {
        label: "Professional Summary",
        tip: "Write 2–4 sentences focused on your value: years of experience, your top skill areas, and one concrete achievement. Tailor this to each application. Aim for 40–80 words.",
        wordCount: (n) => `${n} words`,
        wordCountWarning: "(consider shortening)",
        recommended: "Recommended: 40–80 words",
        placeholder:
            "Experienced engineer with 5+ years building scalable systems…",
    },
    experience: {
        tip: 'Lead with measurable impact: "Reduced API latency 40%" beats "Worked on API optimization". Use strong action verbs and quantify wherever possible.',
        addButton: "+ Add Experience",
        removeButton: "Remove",
        newPosition: "New Position",
        position: "Position / Role",
        company: "Company",
        location: "Location",
        currentLabel: "Currently here?",
        currentCheck: "Present",
        startDate: "Start Date",
        endDate: "End Date",
        description: "Additional Information",
        phDescription:
            "Tools used, team context, or any other relevant details…",
        achievements: "Key Achievements",
        achieveTip: "Impact, not tasks",
        phAchieve: "Reduced load time by 40% by optimizing…",
        present: "Present",
    },
    education: {
        addButton: "+ Add Education",
        removeButton: "Remove",
        newDegree: "New Degree",
        institution: "Institution",
        degree: "Degree",
        field: "Field of Study",
        location: "Location",
        gpa: "GPA",
        startDate: "Start Date",
        endDate: "End Date",
        phInstitution: "MIT",
        phDegree: "B.S.",
        phField: "Computer Science",
        phLocation: "Cambridge, MA",
    },
    skills: {
        tip: "Group skills by category. Match keywords from job descriptions to pass ATS scanners. 4–8 skills per category is optimal.",
        addButton: "+ Add Skill Group",
        removeButton: "Remove",
        category: "Category",
        skillsLabel: "Skills",
        phCategory: "Languages",
        phSkills: "TypeScript, React… (Enter to add)",
    },
    projects: {
        tip: "Projects show initiative. Include the problem solved, your role, and measurable outcomes (users, stars, performance gains).",
        addButton: "+ Add Project",
        removeButton: "Remove",
        newProject: "New Project",
        name: "Project Name",
        description: "Short Description",
        url: "Live URL",
        github: "GitHub",
        technologies: "Technologies",
        highlights: "Highlights",
        highlightTip: "Impact, not features",
        phName: "My Awesome Project",
        phDescription: "One-line description of the project",
        phHighlight: "What did you build or achieve?",
        phTech: "React, TypeScript… (Enter)",
    },
    confirm: {
        reset: "Reset to sample resume? All changes will be lost.",
    },
    ui: { addBullet: "+ Add bullet" },
    months: {
        short: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
        ],
    },
};

// ── Russian ────────────────────────────────────────────────
const ru: Translations = {
    toolbar: {
        brand: "Конструктор резюме",
        template: "Шаблон",
        font: "Шрифт",
        color: "Цвет",
        language: "Язык",
        classic: "Классика",
        modern: "Модерн",
        reset: "Сбросить",
        import: "Импорт",
        saveJSON: "Сохранить",
        exportPDF: "Экспорт PDF",
    },
    sections: {
        personal: "Личные данные",
        summary: "О себе",
        experience: "Опыт работы",
        education: "Образование",
        skills: "Навыки",
        projects: "Проекты",
    },
    editor: { label: "Редактор" },
    personal: {
        tip: "Заголовок должен соответствовать желаемой должности. Рекрутеры просматривают его за секунды.",
        fullName: "Полное имя",
        professionalTitle: "Должность / Специализация",
        email: "Email",
        phone: "Телефон",
        location: "Город",
        website: "Сайт",
        linkedin: "LinkedIn",
        github: "GitHub",
        photo: "Фото профиля",
        photoUpload: "Загрузить фото",
        photoReplace: "Заменить",
        photoRemove: "Удалить",
        salary: "Зарплата",
        salaryAmount: "Ожидаемая зарплата",
        salaryCurrency: "Валюта",
        salaryPlaceholder: "150000",
        phName: "Иван Иванов",
        phTitle: "Старший разработчик",
        phEmail: "ivan@example.com",
        phPhone: "+7 999 123 45 67",
        phLocation: "Москва, Россия",
        phWebsite: "yoursite.ru",
        phLinkedin: "linkedin.com/in/ivan",
        phGithub: "github.com/ivan",
    },
    summary: {
        label: "Краткое описание",
        tip: "Напишите 2–4 предложения о своей ценности: опыт, ключевые навыки и одно конкретное достижение. Адаптируйте текст под каждую вакансию. Оптимальный объём — 40–80 слов.",
        wordCount: (n) => `${n} слов`,
        wordCountWarning: "(рекомендуется сократить)",
        recommended: "Рекомендовано: 40–80 слов",
        placeholder:
            "Опытный разработчик с 5+ годами опыта создания масштабируемых систем…",
    },
    experience: {
        tip: "Начинайте с измеримого результата: «Снизил задержку API на 40%» убедительнее, чем «Работал над оптимизацией». Используйте глаголы действия и цифры.",
        addButton: "+ Добавить опыт",
        removeButton: "Удалить",
        newPosition: "Новая должность",
        position: "Должность",
        company: "Компания",
        location: "Город",
        currentLabel: "Работаю сейчас",
        currentCheck: "По настоящее время",
        startDate: "Дата начала",
        endDate: "Дата окончания",
        description: "Дополнительно",
        phDescription:
            "Используемые инструменты, контекст или любые другие детали…",
        achievements: "Ключевые достижения",
        achieveTip: "Результат, не задачи",
        phAchieve: "Снизил время загрузки на 40% за счёт…",
        present: "Настоящее время",
    },
    education: {
        addButton: "+ Добавить образование",
        removeButton: "Удалить",
        newDegree: "Новая запись",
        institution: "Учебное заведение",
        degree: "Степень / Квалификация",
        field: "Специальность",
        location: "Город",
        gpa: "Средний балл",
        startDate: "Год поступления",
        endDate: "Год окончания",
        phInstitution: "МГУ им. Ломоносова",
        phDegree: "Бакалавр",
        phField: "Информатика",
        phLocation: "Москва",
    },
    skills: {
        tip: "Группируйте навыки по категориям. Используйте ключевые слова из вакансий. 4–8 навыков на категорию — оптимально.",
        addButton: "+ Добавить категорию",
        removeButton: "Удалить",
        category: "Категория",
        skillsLabel: "Навыки",
        phCategory: "Языки программирования",
        phSkills: "Python, TypeScript… (Enter для добавления)",
    },
    projects: {
        tip: "Проекты демонстрируют инициативность. Укажите задачу, вашу роль и измеримые результаты (пользователи, звёзды, прирост производительности).",
        addButton: "+ Добавить проект",
        removeButton: "Удалить",
        newProject: "Новый проект",
        name: "Название проекта",
        description: "Краткое описание",
        url: "Ссылка",
        github: "GitHub",
        technologies: "Технологии",
        highlights: "Ключевые моменты",
        highlightTip: "Результат, не функции",
        phName: "Мой проект",
        phDescription: "Краткое описание в одной строке",
        phHighlight: "Что вы создали или достигли?",
        phTech: "React, TypeScript… (Enter)",
    },
    confirm: {
        reset: "Сбросить до примера резюме? Все изменения будут потеряны.",
    },
    ui: { addBullet: "+ Добавить пункт" },
    months: {
        short: [
            "Янв",
            "Фев",
            "Мар",
            "Апр",
            "Май",
            "Июн",
            "Июл",
            "Авг",
            "Сен",
            "Окт",
            "Ноя",
            "Дек",
        ],
    },
};

export const translations: Record<Lang, Translations> = { en, ru };

export function getT(lang: Lang): Translations {
    return translations[lang] ?? translations.en;
}
