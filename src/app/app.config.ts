import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideTranslateService, TranslateLoader } from '@ngx-translate/core';

import { routes } from './app.routes';
import { TranslateBundledLoader } from './services/translate-bundled.loader';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideTranslateService({
      fallbackLang: 'en',
      loader: { provide: TranslateLoader, useClass: TranslateBundledLoader },
    }),
    provideClientHydration(withEventReplay()),
  ],
};
