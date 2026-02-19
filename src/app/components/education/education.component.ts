import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { RevealDirective } from '../../directives/reveal.directive';

@Component({
    selector: 'app-education',
    standalone: true,
    imports: [CommonModule, TranslateModule, RevealDirective],
    templateUrl: './education.component.html',
    styleUrl: './education.component.css'
})
export class EducationComponent {
    constructor(public translate: TranslateService) { }
}
