import { inject } from '@angular/core';
import { RenderMode, ServerRoute } from '@angular/ssr';
import { firstValueFrom } from 'rxjs';
import { BlogService } from './pages/blogs/data';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'blogs/:slug',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      const blogService = inject(BlogService);
      const blogs = await firstValueFrom(blogService.getBlogs());
      return blogs.map((blog) => ({ slug: blog.slug }));
    },
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];
