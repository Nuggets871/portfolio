import { Component, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'app-hero',
    standalone: true,
    imports: [CommonModule, TranslateModule],
    templateUrl: './hero.component.html',
    styleUrl: './hero.component.css'
})
export class HeroComponent implements AfterViewInit {
    showContent = false;

    constructor(private cdr: ChangeDetectorRef) { }

    ngAfterViewInit() {
        // Use a slightly longer delay to ensure the browser has painted the initial state
        setTimeout(() => {
            this.showContent = true;
            this.cdr.detectChanges();
        }, 300);
    }

    scrollTo(id: string) {
        const el = document.getElementById(id);
        if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
        }
    }
}
