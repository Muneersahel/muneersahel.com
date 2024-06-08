import { Routes } from '@angular/router';

import { HomeComponent } from '@/pages/home';
import { LayoutComponent } from './layout/layout.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', component: HomeComponent },
      {
        path: 'services',
        loadComponent: () => import('@/pages/services/services.component'),
      },
      {
        path: 'resume',
        loadComponent: () => import('@/pages/resume/resume.component'),
      },
      {
        path: 'works',
        loadComponent: () => import('@/pages/works/works.component'),
      },
      {
        path: 'contact',
        loadComponent: () => import('./pages/contact/contact.component'),
      },
      {
        path: 'blogs',
        children: [
          {
            path: '',
            loadComponent: () => import('./pages/blogs/blogs.component'),
          },
          {
            path: ':slug',
            loadComponent: () =>
              import(
                './pages/blogs/components/single-blog/single-blog.component'
              ),
          },
        ],
      },
    ],
  },
];
