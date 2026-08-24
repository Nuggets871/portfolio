import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'app-navbar',
    standalone: true,
    imports: [CommonModule, TranslateModule],
    templateUrl: './navbar.component.html',
    styleUrl: './navbar.component.css'
})
export class NavbarComponent {
    isMenuOpen = false;
    isScrolled = false;
    private onScrollHandler: (() => void) | null = null;

    ngOnInit() {
        this.onScrollHandler = this.onScroll.bind(this);
        window.addEventListener('scroll', this.onScrollHandler, { passive: true });
        document.addEventListener('scroll', this.onScrollHandler, { passive: true });
        this.onScroll();
    }

    ngOnDestroy() {
        if (this.onScrollHandler) {
            window.removeEventListener('scroll', this.onScrollHandler);
            document.removeEventListener('scroll', this.onScrollHandler);
            this.onScrollHandler = null;
        }
    }

    onScroll() {
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
