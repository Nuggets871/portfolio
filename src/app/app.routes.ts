import { Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { languageResolver } from './resolvers/language.resolver';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HomeComponent,
    data: { lang: 'en' },
    resolve: { language: languageResolver },
  },
  {
    path: 'fr',
    component: HomeComponent,
    data: { lang: 'fr' },
    resolve: { language: languageResolver },
  },
  {
    path: 'es',
    component: HomeComponent,
    data: { lang: 'es' },
    resolve: { language: languageResolver },
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];
