import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { RevealDirective } from '../../directives/reveal.directive';
import { Subscription } from 'rxjs';

import { ProjectGalleryComponent } from '../project-gallery/project-gallery';

@Component({
    selector: 'app-projects',
    standalone: true,
    imports: [CommonModule, TranslateModule, RevealDirective, ProjectGalleryComponent],
    templateUrl: './projects.component.html',
    styleUrl: './projects.component.css'
})
export class ProjectsComponent implements OnInit, OnDestroy {
    showAll = false;
    selectedProject: any = null;

    featuredProjects: any[] = [];
    portfolios: any[] = [];
    otherProjects: any[] = [];
    private langSub?: Subscription;

    constructor(public translate: TranslateService) { }

    ngOnInit() {
        this.loadProjects();
    }

    ngOnDestroy() {
        if (this.langSub) {
            this.langSub.unsubscribe();
        }
    }

    loadProjects() {
        // Use stream to get updates when translation files are loaded
        if (this.langSub) this.langSub.unsubscribe();
        this.langSub = this.translate.stream('projects').subscribe((res: any) => {
            if (res && typeof res === 'object' && res.items) {
                const items = res.items;
                if (Array.isArray(items)) {
                    // Filter featured projects: check flag OR specific key titles
                    const featuredTitles = [
                        'Plateforme SaaS Ubikap', 'Ubikap SaaS Platform', 'Plataforma SaaS Ubikap',
                        'ERP Département Informatique', 'IT Department ERP', 'ERP Departamento Informático',
                        'Eduquiz'
                    ];

                    this.featuredProjects = items.filter((p: any) =>
                        p.featured == true ||
                        String(p.featured).toLowerCase() === 'true' ||
                        featuredTitles.includes(p.title)
                    );

                    // Group portfolios
                    this.portfolios = items.filter((p: any) => p.group === 'portfolios');

                    // Remaining projects
                    this.otherProjects = items.filter((p: any) =>
                        !this.featuredProjects.some(fp => fp.title === p.title) &&
                        !this.portfolios.some(pp => pp.title === p.title)
                    );
                }
            }
        });
    }

    toggleShowAll() {
        this.showAll = !this.showAll;
        if (!this.showAll) {
            this.scrollTo('projects');
        }
    }

    openModal(project: any) {
        this.selectedProject = project;
        document.body.style.overflow = 'hidden';
    }

    closeModal() {
        this.selectedProject = null;
        document.body.style.overflow = '';
    }

    getProjectImages(project: any): string[] {
        if (!project) return [];
        if (Array.isArray(project.image)) return project.image;
        if (project.image) return [project.image];
        return [this.getFallbackImage(project)];
    }

    private getFallbackImage(project: any): string {
        const category = project?.category?.toLowerCase() || '';
        if (category.includes('fullstack')) {
            return 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800';
        } else if (category.includes('web')) {
            return 'https://images.unsplash.com/photo-1547658719-da2b81169141?auto=format&fit=crop&q=80&w=800';
        } else if (category.includes('data') || category.includes('bi')) {
            return 'https://images.unsplash.com/photo-1551288049-bbbda536639a?auto=format&fit=crop&q=80&w=800';
        } else if (category.includes('algo') || category.includes('système') || category.includes('system')) {
            return 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?auto=format&fit=crop&q=80&w=800';
        }
        return 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=800';
    }

    scrollTo(id: string) {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    }
}
