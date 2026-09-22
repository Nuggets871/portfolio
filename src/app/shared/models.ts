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
