import { Component, HostListener, OnDestroy, OnInit, PLATFORM_ID, inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'app-navbar',
    standalone: true,
    imports: [CommonModule, TranslateModule, RouterLink, RouterLinkActive],
    templateUrl: './navbar.component.html',
    styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit, OnDestroy {
    private readonly platformId = inject(PLATFORM_ID);

    isMenuOpen = false;
    isScrolled = false;
    private scrollTimer?: ReturnType<typeof setInterval>;

    @HostListener('window:scroll')
    onWindowScroll() {
        if (isPlatformBrowser(this.platformId)) {
            this.updateScrolled();
        }
    }

    ngOnInit() {
        if (!isPlatformBrowser(this.platformId)) {
            return;
        }
        this.updateScrolled();
        this.scrollTimer = setInterval(() => this.updateScrolled(), 150);
    }

    ngOnDestroy() {
        if (this.scrollTimer) {
            clearInterval(this.scrollTimer);
        }
    }

    private updateScrolled() {
        this.isScrolled = window.scrollY > 50;
    }

    toggleMenu() {
        this.isMenuOpen = !this.isMenuOpen;
    }

    closeMenu() {
        this.isMenuOpen = false;
    }

    scrollTo(id: string) {
        this.closeMenu();
        if (!isPlatformBrowser(this.platformId)) {
            return;
        }
        const el = document.getElementById(id);
        if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
        }
    }
}
