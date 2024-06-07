import { Routes } from '@angular/router';

import { HomeComponent } from '@/pages/home';
import { LayoutComponent } from './layout/layout.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', title: 'Home | Muneersahel', component: HomeComponent },
      {
        path: 'services',
        title: 'Services | Muneersahel',
        loadComponent: () => import('@/pages/services/services.component'),
      },
      {
        path: 'resume',
        title: 'Resume | Muneersahel',
        loadComponent: () => import('@/pages/resume/resume.component'),
      },
      {
        path: 'works',
        title: 'Works | Muneersahel',
        loadComponent: () => import('@/pages/works/works.component'),
      },
      {
        path: 'contact',
        title: 'Contact | Muneersahel',
        loadComponent: () => import('./pages/contact/contact.component'),
      },
    ],
  },
];
