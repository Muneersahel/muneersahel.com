import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { forkJoin, map } from "rxjs";

export type Blog = {
  num: string;
  slug: string;
  title: string;
  coverImage?: string;
  date: string;
  brief: string;
  content: string;
  tags: string[];
};

@Injectable({
  providedIn: "root",
})
export class BlogService {
  private _http = inject(HttpClient);
  private _blogFiles = [
    "manage-authentication-state-with-angular-signal",
    "manage-authentication-state-with-ngrx-in-angular",
    "why-i-shifted-to-angular-ionic",
    "introduction-to-nodejs",
    "introduction-to-nodejs-2",
    "connect-nodejs-to-mysql",
    "typesafe-routes-in-angular",
  ];

  private parseFrontmatter(markdown: string): {
    metadata: Partial<Blog>;
    content: string;
  } {
    const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
    const match = markdown.match(frontmatterRegex);

    if (!match) {
      return { metadata: {}, content: markdown };
    }

    const [, frontmatterStr, content] = match;
    const metadata: Partial<Blog> = {};

    frontmatterStr.split("\n").forEach((line) => {
      const colonIndex = line.indexOf(":");
      if (colonIndex === -1) return;

      const key = line.slice(0, colonIndex).trim();
      let value = line.slice(colonIndex + 1).trim();

      // Remove quotes if present
      if (
        (value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))
      ) {
        value = value.slice(1, -1);
      }

      // Parse arrays (tags)
      if (value.startsWith("[") && value.endsWith("]")) {
        value = value.slice(1, -1);
        const arrayValues = value.split(",").map((v) => {
          let trimmed = v.trim();
          if (
            (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
            (trimmed.startsWith("'") && trimmed.endsWith("'"))
          ) {
            trimmed = trimmed.slice(1, -1);
          }
          return trimmed;
        });
        (metadata as any)[key] = arrayValues;
      } else {
        (metadata as any)[key] = value;
      }
    });

    return { metadata, content };
  }

  getBlogs() {
    const blogRequests = this._blogFiles.map((slug) =>
      this._http.get(`content/blogs/${slug}.md`, { responseType: "text" }).pipe(
        map((markdown) => {
          const { metadata, content } = this.parseFrontmatter(markdown);
          return {
            ...metadata,
            slug,
            content,
          } as Blog;
        }),
      ),
    );

    return forkJoin(blogRequests).pipe(
      map((blogs) =>
        blogs.sort((a, b) => {
          const numA = parseInt(a.num || "0");
          const numB = parseInt(b.num || "0");
          return numA - numB;
        }),
      ),
    );
  }

  getBlog(slug: string) {
    return this._http
      .get(`content/blogs/${slug}.md`, { responseType: "text" })
      .pipe(
        map((markdown) => {
          const { metadata, content } = this.parseFrontmatter(markdown);
          return {
            ...metadata,
            slug,
            content,
          } as Blog;
        }),
      );
  }

  getMarkdown(slug: string) {
    return this._http
      .get(`content/blogs/${slug}.md`, { responseType: "text" })
      .pipe(
        map((markdown) => {
          const { content } = this.parseFrontmatter(markdown);
          return content;
        }),
      );
  }
}
