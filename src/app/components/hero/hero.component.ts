import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { scrollToSection } from '../../shared/scroll';

@Component({
    selector: 'app-hero',
    standalone: true,
    imports: [TranslateModule],
    templateUrl: './hero.component.html',
    styleUrl: './hero.component.css'
})
export class HeroComponent {
    scrollTo(id: string, event?: Event) {
        event?.preventDefault();
        scrollToSection(id);
    }
}
