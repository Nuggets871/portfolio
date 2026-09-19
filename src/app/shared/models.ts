export interface Project {
    title: string;
    category: string;
    description: string;
    tech: string[];
    image?: string | string[];
    link?: string;
    github?: string;
    featured?: boolean | string;
    group?: string;
    demo?: boolean;
}

export interface ExperienceItem {
    company: string;
    role: string;
    period: string;
    tech: string[];
    description: string[];
    link?: string;
}

export interface EducationItem {
    institution: string;
    period: string;
    degree: string;
    detail?: string;
}
