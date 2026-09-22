import { Component, HostListener, OnInit, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { scrollToSection } from '../../shared/scroll';

@Component({
    selector: 'app-navbar',
    standalone: true,
    imports: [TranslateModule],
    templateUrl: './navbar.component.html',
    styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
    private readonly platformId = inject(PLATFORM_ID);

    isMenuOpen = false;
    isScrolled = false;

    @HostListener('window:scroll')
    onWindowScroll() {
        if (isPlatformBrowser(this.platformId)) {
            this.updateScrolled();
        }
    }

    ngOnInit() {
        if (isPlatformBrowser(this.platformId)) {
            this.updateScrolled();
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

    scrollTo(id: string, event?: Event) {
        event?.preventDefault();
        this.closeMenu();
        scrollToSection(id);
    }
}
