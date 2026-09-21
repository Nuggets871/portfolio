import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { RevealDirective } from '../../directives/reveal.directive';

@Component({
    selector: 'app-education',
    standalone: true,
    imports: [TranslateModule, RevealDirective],
    templateUrl: './education.component.html',
    styleUrl: './education.component.css'
})
export class EducationComponent { }
