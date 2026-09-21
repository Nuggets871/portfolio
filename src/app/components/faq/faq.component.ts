import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { RevealDirective } from '../../directives/reveal.directive';

@Component({
  selector: 'app-faq',
  imports: [TranslateModule, RevealDirective],
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FaqComponent {}
