import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

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
    currentLang: string;
    languages = [
        { code: 'fr', label: 'FR' },
        { code: 'en', label: 'EN' },
        { code: 'es', label: 'ES' }
    ];

    constructor(private translate: TranslateService) {
        this.currentLang = this.translate.currentLang || 'fr';
    }

    ngOnInit() {
        window.addEventListener('scroll', this.onScroll.bind(this));
    }

    onScroll() {
        this.isScrolled = window.scrollY > 50;
    }

    switchLanguage(lang: string) {
        this.currentLang = lang;
        this.translate.use(lang);
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
