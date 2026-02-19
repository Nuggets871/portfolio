import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { RevealDirective } from '../../directives/reveal.directive';

@Component({
    selector: 'app-about',
    standalone: true,
    imports: [CommonModule, TranslateModule, RevealDirective],
    templateUrl: './about.component.html',
    styleUrl: './about.component.css'
})
export class AboutComponent { }
