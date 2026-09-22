import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { map } from 'rxjs';

import { SeoService } from '../services/seo.service';

export const seoResolver: ResolveFn<boolean> = () => {
  const translate = inject(TranslateService);
  const seo = inject(SeoService);

  return translate.use('en').pipe(
    map(() => {
      seo.apply();
      return true;
    }),
  );
};
