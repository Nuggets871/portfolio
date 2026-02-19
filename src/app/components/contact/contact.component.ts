import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { RevealDirective } from '../../directives/reveal.directive';

@Component({
    selector: 'app-contact',
    standalone: true,
    imports: [CommonModule, TranslateModule, RevealDirective],
    templateUrl: './contact.component.html',
    styleUrl: './contact.component.css'
})
export class ContactComponent { }
