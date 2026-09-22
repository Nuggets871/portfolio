import { Injectable } from '@angular/core';
import { TranslateLoader, TranslationObject } from '@ngx-translate/core';
import { Observable, of } from 'rxjs';

import en from '../i18n/en';

const TRANSLATIONS: Record<string, TranslationObject> = {
  en: en as TranslationObject,
};

@Injectable()
export class TranslateBundledLoader implements TranslateLoader {
  getTranslation(lang: string): Observable<TranslationObject> {
    return of(TRANSLATIONS[lang] ?? TRANSLATIONS['en']);
  }
}
