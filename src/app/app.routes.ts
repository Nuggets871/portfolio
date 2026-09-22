import { Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { seoResolver } from './resolvers/seo.resolver';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HomeComponent,
    resolve: { seo: seoResolver },
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];
