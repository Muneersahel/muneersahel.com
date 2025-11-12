import { Blog } from "@/core/blog-interface";
import { BlogService } from "@/pages/blogs/data";
import { ReadingTimePipe } from "@/shared/pipes";
import { MetaTagsService } from "@/shared/services";
import { DatePipe, NgOptimizedImage } from "@angular/common";
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
} from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { Router, RouterLink } from "@angular/router";
import { NgIcon, provideIcons } from "@ng-icons/core";
import {
  lucideArrowRight,
  lucideCalendar,
  lucideClock,
  lucideTag,
} from "@ng-icons/lucide";
import { MarkdownComponent } from "ngx-markdown";

@Component({
  selector: "app-single-blog",
  imports: [
    MarkdownComponent,
    NgOptimizedImage,
    ReadingTimePipe,
    DatePipe,
    RouterLink,
    NgIcon,
  ],
  providers: [
    provideIcons({
      lucideCalendar,
      lucideClock,
      lucideTag,
      lucideArrowRight,
    }),
  ],
  template: `
    @if (blog(); as blog) {
      <section class="py-8 lg:py-12">
        <div class="container max-w-7xl">
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            <!-- Main Content -->
            <article class="lg:col-span-8">
              <!-- Header -->
              <header class="mb-8">
                <h1
                  class="text-3xl sm:text-4xl xl:text-5xl font-extrabold mb-6 text-white leading-tight"
                >
                  {{ blog.title }}
                </h1>

                <!-- Meta Information -->
                <div
                  class="flex flex-wrap items-center gap-4 text-sm text-white/60 mb-6"
                >
                  <div class="flex items-center gap-2">
                    <ng-icon hlm name="lucideCalendar" class="w-4 h-4" />
                    <span>{{ blog.date | date: "MMM dd, yyyy" }}</span>
                  </div>
                  @if (markdown(); as markdown) {
                    <div class="flex items-center gap-2">
                      <ng-icon hlm name="lucideClock" class="w-4 h-4" />
                      <span
                        >{{ (markdown | readingTime).minutes }} min read</span
                      >
                    </div>
                  }
                </div>

                <!-- Tags -->
                @if (blog.tags && blog.tags.length > 0) {
                  <div class="flex flex-wrap gap-2 mb-6">
                    @for (tag of blog.tags; track tag) {
                      <span
                        class="inline-flex items-center gap-1.5 px-3 py-1.5 bg-accent/10 text-accent rounded-full text-xs font-medium border border-accent/20 hover:bg-accent/20 transition-colors"
                      >
                        <ng-icon hlm name="lucideTag" class="w-3 h-3" />
                        {{ tag }}
                      </span>
                    }
                  </div>
                }

                <!-- Brief -->
                <p
                  class="text-lg text-white/80 leading-relaxed border-l-4 border-accent pl-4 py-2 bg-accent/5 rounded-r"
                >
                  {{ blog.brief }}
                </p>
              </header>

              <!-- Cover Image -->
              @if (blog.coverImage) {
                <figure class="relative w-full h-64 sm:h-80 xl:h-96 mb-8">
                  <img
                    [alt]="blog.title"
                    [ngSrc]="blog.coverImage"
                    class="rounded-lg object-cover shadow-lg"
                    priority
                    fill
                  />
                </figure>
              }

              <!-- Article Content -->
              @if (markdown(); as markdown) {
                <div class="blog">
                  <markdown [data]="markdown" clipboard />
                </div>
              }

              <!-- Share & Actions (Optional) -->
              <div
                class="mt-12 pt-8 border-t border-white/10 flex items-center justify-between"
              >
                <a
                  routerLink="/blogs"
                  class="inline-flex items-center gap-2 text-white/60 hover:text-accent transition-colors"
                >
                  <ng-icon hlm name="lucideArrowRight" class="rotate-180" />
                  <span>Back to all posts</span>
                </a>
              </div>
            </article>

            <!-- Sidebar -->
            <aside class="lg:col-span-4">
              <div class="lg:sticky lg:top-8 space-y-8">
                <!-- Recent Posts -->
                @if (recentBlogs().length > 0) {
                  <div
                    class="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10"
                  >
                    <h3 class="text-xl font-bold text-white mb-4">
                      Recent Posts
                    </h3>
                    <div class="space-y-4">
                      @for (recent of recentBlogs(); track recent.slug) {
                        <a
                          [routerLink]="['/blogs', recent.slug]"
                          class="block group"
                        >
                          <div
                            class="flex gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors"
                          >
                            @if (recent.coverImage) {
                              <div
                                class="w-16 h-16 shrink-0 rounded overflow-hidden bg-white/10"
                              >
                                <img
                                  [src]="recent.coverImage"
                                  [alt]="recent.title"
                                  class="w-full h-full object-cover"
                                />
                              </div>
                            }
                            <div class="flex-1 min-w-0">
                              <h4
                                class="text-sm font-semibold text-white group-hover:text-accent transition-colors line-clamp-2"
                              >
                                {{ recent.title }}
                              </h4>
                              <p class="text-xs text-white/60 mt-1">
                                {{ recent.date | date: "MMM dd, yyyy" }}
                              </p>
                            </div>
                          </div>
                        </a>
                      }
                    </div>
                  </div>
                }

                <!-- Related Posts -->
                @if (relatedBlogs().length > 0) {
                  <div
                    class="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10"
                  >
                    <h3 class="text-xl font-bold text-white mb-4">
                      Related Posts
                    </h3>
                    <div class="space-y-4">
                      @for (related of relatedBlogs(); track related.slug) {
                        <a
                          [routerLink]="['/blogs', related.slug]"
                          class="block group"
                        >
                          <div
                            class="p-4 rounded-lg border border-white/10 hover:border-accent/30 hover:bg-white/5 transition-all"
                          >
                            <h4
                              class="text-sm font-semibold text-white group-hover:text-accent transition-colors mb-2 line-clamp-2"
                            >
                              {{ related.title }}
                            </h4>
                            <p class="text-xs text-white/60 line-clamp-2 mb-2">
                              {{ related.brief }}
                            </p>
                            @if (related.tags && related.tags.length > 0) {
                              <div class="flex flex-wrap gap-1">
                                @for (
                                  tag of related.tags.slice(0, 3);
                                  track tag
                                ) {
                                  <span
                                    class="text-xs px-2 py-0.5 bg-accent/10 text-accent rounded"
                                  >
                                    {{ tag }}
                                  </span>
                                }
                              </div>
                            }
                          </div>
                        </a>
                      }
                    </div>
                  </div>
                }

                <!-- All Tags -->
                @if (allTags().length > 0) {
                  <div
                    class="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10"
                  >
                    <h3 class="text-xl font-bold text-white mb-4">
                      Popular Tags
                    </h3>
                    <div class="flex flex-wrap gap-2">
                      @for (tag of allTags(); track tag) {
                        <span
                          class="inline-block px-3 py-1.5 bg-white/5 hover:bg-accent/10 text-white/80 hover:text-accent rounded-full text-xs border border-white/10 hover:border-accent/30 transition-all cursor-pointer"
                        >
                          {{ tag }}
                        </span>
                      }
                    </div>
                  </div>
                }
              </div>
            </aside>
          </div>
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
  private _router = inject(Router);

  slug = input.required<string>();

  blog = signal<Blog | null>(null);
  allBlogs = signal<Blog[]>([]);
  markdown = computed(() => this.blog()?.content || "");

  // Get 3 most recent blogs excluding current
  recentBlogs = computed(() => {
    const current = this.blog();
    if (!current) return [];

    return this.allBlogs()
      .filter((b) => b.slug !== current.slug)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 3);
  });

  // Get related blogs based on shared tags
  relatedBlogs = computed(() => {
    const current = this.blog();
    if (!current || !current.tags) return [];

    const currentTags = current.tags;
    const scored = this.allBlogs()
      .filter((b) => b.slug !== current.slug)
      .map((blog) => {
        const sharedTags =
          blog.tags?.filter((tag) => currentTags.includes(tag)).length || 0;
        return { blog, score: sharedTags };
      })
      .filter((item) => item.score > 0)
      .sort((a, b) => b.score - a.score);

    return scored.slice(0, 3).map((item) => item.blog);
  });

  // Get all unique tags from all blogs
  allTags = computed(() => {
    const tags = new Set<string>();
    this.allBlogs().forEach((blog) => {
      blog.tags?.forEach((tag) => tags.add(tag));
    });
    return Array.from(tags).sort();
  });

  constructor() {
    // Fetch all blogs for related/recent posts
    this._blogService
      .getBlogs()
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe((blogs) => {
        this.allBlogs.set(blogs);
      });

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
                keywords: blog.tags?.join(", ") || "",
              });
            }
          });
      });
    });
  }
}
