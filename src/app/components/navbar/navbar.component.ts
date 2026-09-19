import { Component, HostListener } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { scrollToSection } from '../../shared/scroll';

@Component({
    selector: 'app-navbar',
    standalone: true,
    imports: [TranslateModule],
    templateUrl: './navbar.component.html',
    styleUrl: './navbar.component.css'
})
export class NavbarComponent {
    isMenuOpen = false;
    isScrolled = false;

    @HostListener('window:scroll')
    onWindowScroll() {
        this.updateScrolled();
    }

    ngOnInit() {
        this.updateScrolled();
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
