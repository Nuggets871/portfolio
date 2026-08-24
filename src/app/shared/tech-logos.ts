export const TECH_LOGOS: Record<string, string> = {
    // Skills — programming
    'Python': 'python',
    'Java': 'java',
    'C': 'c',
    'Spring Boot': 'spring',
    // Skills — web
    'HTML': 'html5',
    'CSS': 'css3',
    'JavaScript': 'javascript',
    'Angular': 'angular',
    'VueJS': 'vuejs',
    'ReactJS': 'react',
    'PHP': 'php',
    'Symfony': 'symfony',
    // Skills — database
    'PL-SQL': 'oracle',
    'MongoDB': 'mongodb',
    'MySQL': 'mysql',
    // Skills — tools
    'Git': 'git',
    'VS Code': 'vscode',
    'Android Studio': 'androidstudio',
    'JetBrains': 'jetbrains',
    // Skills — os
    'Windows': 'windows8',
    'Linux': 'linux',
    'Mac': 'apple',
    // Projects
    'Node.js': 'nodejs',
    'Express': 'express',
    'React': 'react',
    'NextJS': 'nextjs',
    'NestJS': 'nestjs',
    'Tailwind CSS': 'tailwindcss',
    'Prisma': 'prisma',
    'DaisyUI': 'daisyui',
    'GSAP': 'gsap',
    'Sharp': 'sharp'
};

export function techLogo(name: string): string | null {
    const file = TECH_LOGOS[name];
    return file ? `assets/img/skills/${file}.svg` : null;
}