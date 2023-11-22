import { Routes } from '@angular/router';
import HomeComponent from './home/home.component';

export const routes: Routes = [
	{
		path: '',
		title: 'Home | Muneersahel',
		component: HomeComponent,
	},
	{
		path: 'blogs',
		children: [
			{
				path: ':slug',
				loadComponent: () => import('./single-blog/single-blog.component'),
			},
		],
	},
];
