import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { RevealDirective } from '../../directives/reveal.directive';

@Component({
    selector: 'app-contact',
    standalone: true,
    imports: [TranslateModule, RevealDirective],
    templateUrl: './contact.component.html',
    styleUrl: './contact.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactComponent { }
