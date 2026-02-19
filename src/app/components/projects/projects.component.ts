import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { RevealDirective } from '../../directives/reveal.directive';

@Component({
    selector: 'app-projects',
    standalone: true,
    imports: [CommonModule, TranslateModule, RevealDirective],
    templateUrl: './projects.component.html',
    styleUrl: './projects.component.css'
})
export class ProjectsComponent {
    constructor(public translate: TranslateService) { }
}
