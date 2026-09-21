import { Injectable } from '@angular/core';
import { TranslateLoader, TranslationObject } from '@ngx-translate/core';
import { Observable, of } from 'rxjs';

import en from '../i18n/en';
import fr from '../i18n/fr';
import es from '../i18n/es';

const TRANSLATIONS: Record<string, TranslationObject> = {
  en: en as TranslationObject,
  fr: fr as TranslationObject,
  es: es as TranslationObject,
};

@Injectable()
export class TranslateBundledLoader implements TranslateLoader {
  getTranslation(lang: string): Observable<TranslationObject> {
    return of(TRANSLATIONS[lang] ?? TRANSLATIONS['en']);
  }
}
