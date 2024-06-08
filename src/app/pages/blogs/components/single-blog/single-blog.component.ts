import { Blog, BlogService } from '@/pages/blogs/data';
import { MetaTagsService } from '@/shared/services';
import { NgOptimizedImage } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  computed,
  effect,
  inject,
  input,
  signal,
  untracked,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MarkdownComponent } from 'ngx-markdown';

@Component({
  selector: 'app-single-blog',
  standalone: true,
  imports: [MarkdownComponent, NgOptimizedImage],
  template: `
    @if (blog(); as blog) {
      <section class="pb-8">
        <div class="container blog">
          <h1
            class="text-3xl font-extrabold sm:text-4xl mb-6 border-b border-white/60 pb-4"
          >
            {{ blog.title }}
          </h1>

          <figure
            class="relative w-full h-[278px] xl:w-full xl:h-[478px] mb-12"
          >
            <img
              [alt]="blog.title"
              [ngSrc]="blog.coverImage"
              class="rounded-lg object-cover"
              priority
              fill
            />
          </figure>
          <markdown [src]="file()" clipboard />
        </div>
      </section>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class SingleBlogComponent {
  private _blogService = inject(BlogService);
  private _destroyRef = inject(DestroyRef);
  private _metaTags = inject(MetaTagsService);

  slug = input.required<string>();
  file = computed(() => {
    return `content/blogs/${this.slug()}.md`;
  });

  blog = signal<Blog | null>(null);

  constructor() {
    effect(() => {
      const slug = this.slug();

      untracked(() => {
        this._blogService
          .getBlog(slug)
          .pipe(takeUntilDestroyed(this._destroyRef))
          .subscribe((blog) => {
            if (blog) {
              this.blog.set(blog);
              this._metaTags.updateMetaTags({
                title: blog.title,
                description: blog.brief,
                image: blog.coverImage,
                url: `${this._metaTags.baseUrl}/blogs/${slug}`,
                keywords: blog.tags.join(', '),
              });
            }
          });
      });
    });
  }
}
