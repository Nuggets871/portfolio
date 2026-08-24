import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { RevealDirective } from '../../directives/reveal.directive';
import { techLogo } from '../../shared/tech-logos';

interface SkillCategory {
    key: string;
}

@Component({
    selector: 'app-skills',
    standalone: true,
    imports: [CommonModule, TranslateModule, RevealDirective],
    templateUrl: './skills.component.html',
    styleUrl: './skills.component.css'
})
export class SkillsComponent {
    categories: SkillCategory[] = [
        { key: 'programming' },
        { key: 'web' },
        { key: 'database' },
        { key: 'tools' },
        { key: 'os' },
        { key: 'management' },
        { key: 'languages' }
    ];

    getLogo(skill: string): string | null {
        return techLogo(skill);
    }
}
