import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { map } from 'rxjs';

import { SeoService } from '../services/seo.service';

type SupportedLanguage = 'fr' | 'en' | 'es';

function resolveLanguage(value: unknown): SupportedLanguage {
  return value === 'fr' || value === 'es' ? value : 'en';
}

export const languageResolver: ResolveFn<boolean> = (route) => {
  const language = resolveLanguage(route.data['lang']);
  const translate = inject(TranslateService);
  const seo = inject(SeoService);

  return translate.use(language).pipe(
    map(() => {
      seo.apply(language);
      return true;
    }),
  );
};
