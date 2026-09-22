import { Component, OnInit, OnDestroy, AfterViewInit, HostListener, ViewChild, ElementRef, PLATFORM_ID, ChangeDetectionStrategy, inject, signal, computed } from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
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
    styleUrl: './projects.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectsComponent implements OnInit, OnDestroy, AfterViewInit {
    @ViewChild('modalContent') modalContent?: ElementRef<HTMLElement>;
    @ViewChild('featuredGrid') featuredGrid?: ElementRef<HTMLElement>;

    showAll = false;
    selectedProject: Project | null = null;

    featuredProjects = signal<Project[]>([]);
    portfolios = signal<Project[]>([]);
    otherProjects = signal<Project[]>([]);

    private readonly columns = signal(4);
    private resizeObserver?: ResizeObserver;

    // On a 3-column layout the 4th featured card would wrap alone onto a
    // second row, so only show 3 there. Every other layout keeps all of them.
    readonly visibleFeaturedProjects = computed(() => {
        const items = this.featuredProjects();
        return this.columns() === 3 && items.length > 3 ? items.slice(0, 3) : items;
    });

    private langSub?: Subscription;
    private lastFocused: HTMLElement | null = null;
    private readonly document = inject(DOCUMENT);
    private readonly platformId = inject(PLATFORM_ID);

    constructor(public translate: TranslateService) { }

    ngOnInit() {
        this.loadProjects();
    }

    ngAfterViewInit() {
        if (!isPlatformBrowser(this.platformId)) return;

        const el = this.featuredGrid?.nativeElement;
        if (!el) return;

        requestAnimationFrame(() => this.updateColumns());

        if (typeof ResizeObserver !== 'undefined') {
            this.resizeObserver = new ResizeObserver(() => this.updateColumns());
            this.resizeObserver.observe(el);
        }
    }

    ngOnDestroy() {
        if (this.langSub) {
            this.langSub.unsubscribe();
        }
        this.resizeObserver?.disconnect();
        this.document.body.style.overflow = '';
    }

    private updateColumns() {
        const el = this.featuredGrid?.nativeElement;
        if (!el) return;

        const tracks = getComputedStyle(el).gridTemplateColumns;
        const count = tracks && tracks !== 'none'
            ? tracks.split(/\s+/).filter(Boolean).length
            : 1;
        this.columns.set(count);
    }

    @HostListener('document:keydown.escape')
    onEscape() {
        if (this.selectedProject) {
            this.closeModal();
        }
    }

    @HostListener('document:keydown.tab', ['$event'])
    @HostListener('document:keydown.shift.tab', ['$event'])
    onTab(event: Event) {
        const keyEvent = event as KeyboardEvent;
        const container = this.modalContent?.nativeElement;
        if (!this.selectedProject || !container) {
            return;
        }

        const focusable = Array.from(
            container.querySelectorAll<HTMLElement>(
                'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
            )
        ).filter((el) => el.offsetParent !== null);

        event.preventDefault();

        if (focusable.length === 0) {
            container.focus();
            return;
        }

        const active = this.document.activeElement as HTMLElement | null;
        const currentIndex = active ? focusable.indexOf(active) : -1;
        const lastIndex = focusable.length - 1;

        let nextIndex: number;
        if (keyEvent.shiftKey) {
            nextIndex = currentIndex <= 0 ? lastIndex : currentIndex - 1;
        } else {
            nextIndex = currentIndex === -1 || currentIndex === lastIndex ? 0 : currentIndex + 1;
        }

        focusable[nextIndex].focus();
    }

    loadProjects() {
        // Use stream to get updates when translation files are loaded
        if (this.langSub) this.langSub.unsubscribe();
        this.langSub = this.translate.stream('projects').subscribe((res: { items?: Project[] }) => {
            if (res && typeof res === 'object' && Array.isArray(res.items)) {
                const items = res.items;
                const isFeatured = (p: Project) =>
                    p.featured === true || String(p.featured).toLowerCase() === 'true';

                const featured = items.filter(isFeatured);
                const portfolios = items.filter((p) => p.group === 'portfolios');

                this.featuredProjects.set(featured);
                this.portfolios.set(portfolios);
                this.otherProjects.set(
                    items.filter(
                        (p) =>
                            !featured.some((fp) => fp.title === p.title) &&
                            !portfolios.some((pp) => pp.title === p.title)
                    )
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
