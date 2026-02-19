import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { RevealDirective } from '../../directives/reveal.directive';

interface SkillCategory {
    key: string;
    icon: string;
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
        { key: 'programming', icon: '⟨/⟩' },
        { key: 'web', icon: '◈' },
        { key: 'database', icon: '⊞' },
        { key: 'tools', icon: '⚙' },
        { key: 'os', icon: '▣' },
        { key: 'management', icon: '◉' },
        { key: 'languages', icon: '◆' }
    ];
}
