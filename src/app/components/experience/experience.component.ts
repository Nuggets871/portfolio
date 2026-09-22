import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { RevealDirective } from '../../directives/reveal.directive';

@Component({
    selector: 'app-experience',
    standalone: true,
    imports: [TranslateModule, RevealDirective],
    templateUrl: './experience.component.html',
    styleUrl: './experience.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExperienceComponent { }
