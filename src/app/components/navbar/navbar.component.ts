import { Component, HostListener, OnDestroy, OnInit, PLATFORM_ID, inject } from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { scrollToSection } from '../../shared/scroll';

@Component({
    selector: 'app-navbar',
    standalone: true,
    imports: [TranslateModule],
    templateUrl: './navbar.component.html',
    styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit, OnDestroy {
    private readonly platformId = inject(PLATFORM_ID);
    private readonly document = inject(DOCUMENT);

    isMenuOpen = false;
    isScrolled = false;

    @HostListener('window:scroll')
    onWindowScroll() {
        if (isPlatformBrowser(this.platformId)) {
            this.updateScrolled();
        }
    }

    @HostListener('window:resize')
    onWindowResize() {
        if (isPlatformBrowser(this.platformId) && window.innerWidth > 768 && this.isMenuOpen) {
            this.closeMenu();
        }
    }

    @HostListener('document:keydown.escape')
    onEscape() {
        if (this.isMenuOpen) {
            this.closeMenu();
        }
    }

    ngOnInit() {
        if (isPlatformBrowser(this.platformId)) {
            this.updateScrolled();
        }
    }

    ngOnDestroy() {
        this.document.body.style.overflow = '';
    }

    private updateScrolled() {
        this.isScrolled = window.scrollY > 50;
    }

    toggleMenu() {
        this.isMenuOpen = !this.isMenuOpen;
        this.syncBodyScroll();
    }

    closeMenu() {
        this.isMenuOpen = false;
        this.syncBodyScroll();
    }

    private syncBodyScroll() {
        if (isPlatformBrowser(this.platformId)) {
            this.document.body.style.overflow = this.isMenuOpen ? 'hidden' : '';
        }
    }

    scrollTo(id: string, event?: Event) {
        event?.preventDefault();
        this.closeMenu();
        scrollToSection(id);
    }
}
