import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { RevealDirective } from '../../directives/reveal.directive';

@Component({
    selector: 'app-about',
    standalone: true,
    imports: [TranslateModule, RevealDirective],
    templateUrl: './about.component.html',
    styleUrl: './about.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AboutComponent { }
