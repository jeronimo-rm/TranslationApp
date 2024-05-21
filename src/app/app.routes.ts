import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'translation',
    loadComponent: () => import('./translation/translation.page').then( m => m.TranslationPage)
  },
  {
    path: '',
    redirectTo: 'translation',
    pathMatch: 'full',
  },

];
