import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { map } from 'rxjs';

export type Blog = {
  num: string;
  slug: string;
  title: string;
  coverImage: string;
  date: string;
  brief: string;
  content: string;
  tags: string[];
};

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  private _http = inject(HttpClient);
  private _url = '/content/content.json';

  getBlogs() {
    return this._http.get<{ blogs: Blog[] }>(this._url).pipe(
      map((response) => {
        return response.blogs;
      }),
    );
  }

  getBlog(slug: string) {
    return this._http.get<{ blogs: Blog[] }>(this._url).pipe(
      map((response) => {
        return response.blogs.find((blog) => blog.slug === slug);
      }),
    );
  }
}
