import { Component, OnInit, OnDestroy, HostListener, ViewChild, ElementRef, inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

import { RevealDirective } from '../../directives/reveal.directive';
import { ProjectGalleryComponent } from '../project-gallery/project-gallery';
import { techLogo } from '../../shared/tech-logos';
import { scrollToSection } from '../../shared/scroll';
import { Project } from '../../shared/models';

@Component({
    selector: 'app-projects',
    standalone: true,
    imports: [TranslateModule, RevealDirective, ProjectGalleryComponent],
    templateUrl: './projects.component.html',
    styleUrl: './projects.component.css'
})
export class ProjectsComponent implements OnInit, OnDestroy {
    @ViewChild('modalContent') modalContent?: ElementRef<HTMLElement>;

    showAll = false;
    selectedProject: Project | null = null;

    featuredProjects: Project[] = [];
    portfolios: Project[] = [];
    otherProjects: Project[] = [];

    private langSub?: Subscription;
    private lastFocused: HTMLElement | null = null;
    private readonly document = inject(DOCUMENT);

    constructor(public translate: TranslateService) { }

    ngOnInit() {
        this.loadProjects();
    }

    ngOnDestroy() {
        if (this.langSub) {
            this.langSub.unsubscribe();
        }
        this.document.body.style.overflow = '';
    }

    @HostListener('document:keydown.escape')
    onEscape() {
        if (this.selectedProject) {
            this.closeModal();
        }
    }

    loadProjects() {
        // Use stream to get updates when translation files are loaded
        if (this.langSub) this.langSub.unsubscribe();
        this.langSub = this.translate.stream('projects').subscribe((res: { items?: Project[] }) => {
            if (res && typeof res === 'object' && Array.isArray(res.items)) {
                const items = res.items;
                const isFeatured = (p: Project) =>
                    p.featured === true || String(p.featured).toLowerCase() === 'true';

                this.featuredProjects = items.filter(isFeatured);
                this.portfolios = items.filter((p) => p.group === 'portfolios');
                this.otherProjects = items.filter(
                    (p) =>
                        !this.featuredProjects.some((fp) => fp.title === p.title) &&
                        !this.portfolios.some((pp) => pp.title === p.title)
                );
            }
        });
    }

    toggleShowAll() {
        this.showAll = !this.showAll;
        if (!this.showAll) {
            scrollToSection('projects');
        }
    }

    openModal(project: Project) {
        this.lastFocused = this.document.activeElement as HTMLElement | null;
        this.selectedProject = project;
        this.document.body.style.overflow = 'hidden';
        setTimeout(() => this.modalContent?.nativeElement.focus());
    }

    closeModal() {
        this.selectedProject = null;
        this.document.body.style.overflow = '';
        this.lastFocused?.focus();
        this.lastFocused = null;
    }

    getProjectImages(project: Project | null): string[] {
        if (!project) return [];
        if (Array.isArray(project.image)) return project.image;
        if (project.image) return [project.image];
        return [this.getFallbackImage(project)];
    }

    getTechLogo(tech: string): string | null {
        return techLogo(tech);
    }

    private getFallbackImage(project: Project | null): string {
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
}
