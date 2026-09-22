import { ApplicationConfig, Injectable, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import {
  InterpolationParameters,
  provideTranslateParser,
  provideTranslateService,
  TranslateDefaultParser,
  TranslateLoader,
} from '@ngx-translate/core';

import { routes } from './app.routes';
import { TranslateBundledLoader } from './services/translate-bundled.loader';

// ngx-translate's default parser drops non-string leaf values (booleans, numbers)
// when interpolating nested objects/arrays, which strips flags like `featured`
// or `demo` from the `projects.items` data. Stringify them instead of dropping.
@Injectable()
export class ValuePreservingParser extends TranslateDefaultParser {
  override interpolate(expr: unknown, params?: InterpolationParameters): string | undefined {
    if (typeof expr === 'string' || typeof expr === 'function') {
      return super.interpolate(expr as string, params);
    }
    return expr === undefined || expr === null ? undefined : String(expr);
  }
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideTranslateService({
      fallbackLang: 'en',
      loader: { provide: TranslateLoader, useClass: TranslateBundledLoader },
      parser: provideTranslateParser(ValuePreservingParser),
    }),
    provideClientHydration(withEventReplay()),
  ],
};
