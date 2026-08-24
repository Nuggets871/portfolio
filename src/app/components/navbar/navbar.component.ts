import { Component, HostListener, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'app-navbar',
    standalone: true,
    imports: [CommonModule, TranslateModule],
    templateUrl: './navbar.component.html',
    styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnDestroy {
    isMenuOpen = false;
    isScrolled = false;
    private scrollTimer: any;

    @HostListener('window:scroll')
    onWindowScroll() {
        this.updateScrolled();
    }

    ngOnInit() {
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
        const el = document.getElementById(id);
        if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
        }
    }
}
