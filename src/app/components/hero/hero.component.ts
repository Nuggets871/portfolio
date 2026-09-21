import { Component, PLATFORM_ID, inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'app-hero',
    standalone: true,
    imports: [CommonModule, TranslateModule],
    templateUrl: './hero.component.html',
    styleUrl: './hero.component.css'
})
export class HeroComponent {
    private readonly platformId = inject(PLATFORM_ID);

    scrollTo(id: string) {
        if (!isPlatformBrowser(this.platformId)) {
            return;
        }
        const el = document.getElementById(id);
        if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
        }
    }
}
