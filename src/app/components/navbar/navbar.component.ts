import { Component, HostListener } from '@angular/core';
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

    @HostListener('window:scroll')
    onWindowScroll() {
        this.isScrolled = window.scrollY > 50;
    }

    ngOnInit() {
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
