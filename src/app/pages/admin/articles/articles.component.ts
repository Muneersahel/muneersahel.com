import { ChangeDetectionStrategy, Component, signal } from "@angular/core";
import { RouterLink } from "@angular/router";
import { NgIcon, provideIcons } from "@ng-icons/core";
import { lucideExternalLink, lucidePlus, lucideSearch } from "@ng-icons/lucide";
import { HlmButton } from "@spartan-ng/helm/button";
import { HlmCard } from "@spartan-ng/helm/card";
import { HlmInput } from "@spartan-ng/helm/input";

interface AdminArticle {
  num: string;
  slug: string;
  title: string;
  coverImage: string;
  date: string;
  brief: string;
  tags: string[];
}

@Component({
  selector: "app-admin-articles",
  standalone: true,
  imports: [HlmCard, HlmButton, HlmInput, NgIcon, RouterLink],
  providers: [provideIcons({ lucidePlus, lucideSearch, lucideExternalLink })],
  template: `
    <section class="p-6 text-black">
      <div class="flex items-center justify-between mb-6">
        <div>
          <h2 class="text-2xl font-semibold text-black">Articles</h2>
          <p class="text-black/70 mt-1">Manage blog posts and drafts</p>
        </div>

        <div class="flex items-center gap-3">
          <div class="w-[320px]">
            <div class="relative">
              <input
                hlmInput
                class="w-full pl-10 pr-4 py-2 rounded-lg bg-black/5 border border-black/10 text-black placeholder:text-black/50"
                placeholder="Search articles..."
                (input)="onSearch($any($event.target).value)"
              />
              <ng-icon
                hlm
                name="lucideSearch"
                class="absolute left-3 top-1/2 -translate-y-1/2 text-black/60"
              />
            </div>
          </div>

          <button
            hlmBtn
            size="default"
            class="flex items-center gap-2 text-black"
            (click)="addArticle()"
          >
            <ng-icon hlm name="lucidePlus"></ng-icon>
            <span>Add Article</span>
          </button>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        @for (article of filteredArticles; track article.slug) {
          <a [routerLink]="['/admin/articles', article.slug]" class="block">
            <div hlmCard class="bg-black/5 hover:bg-black/7 transition h-full">
              <div class="p-4 h-full flex flex-col space-y-4">
                <div class="h-40 bg-black/3 rounded-lg overflow-hidden mb-3">
                  <img
                    src="{{ article.coverImage }}"
                    alt="{{ article.title }}"
                    class="w-full h-full object-cover"
                  />
                </div>

                <h3 class="text-lg font-semibold text-black mb-2">
                  {{ article.title }}
                </h3>

                <p
                  class="text-black/70 text-sm overflow-hidden"
                  style="display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 3;"
                >
                  {{ article.brief }}
                </p>

                <div class="mt-auto flex items-center justify-between">
                  <div class="text-xs text-black/60">{{ article.date }}</div>
                  <ng-icon
                    hlm
                    name="lucideExternalLink"
                    class="text-black/60"
                  />
                </div>
              </div>
            </div>
          </a>
        }
      </div>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class AdminArticlesComponent {
  private _all = signal<AdminArticle[]>([
    {
      num: "01",
      slug: "manage-authentication-state-with-angular-signal",
      title: "Manage Authentication State with Angular Signal",
      coverImage: "/images/blogs/angular-authentication.avif",
      date: "2024-06-08",
      brief:
        "Learn how to manage authentication state with Angular Signal. In this blog post, we will create a simple Angular application that uses Angular Signal to manage authentication state.",
      tags: ["angular", "authentication", "signal"],
    },
    {
      num: "02",
      slug: "manage-authentication-state-with-ngrx-in-angular",
      title: "Manage Authentication State with NgRx",
      coverImage: "/images/blogs/angular-authentication.avif",
      date: "2024-06-08",
      brief: "Enterprise-grade authentication using NgRx patterns and effects.",
      tags: ["angular", "ngrx", "authentication"],
    },
    {
      num: "03",
      slug: "why-i-shifted-to-angular-ionic",
      title: "Why I Shifted to Angular + Ionic",
      coverImage: "/images/blogs/angular-ionic.avif",
      date: "2024-05-10",
      brief: "Lessons learned moving to Ionic for cross-platform apps.",
      tags: ["angular", "ionic"],
    },
  ]);

  filteredArticles = this._all();

  onSearch(query: string) {
    const q = String(query || "")
      .toLowerCase()
      .trim();
    if (!q) {
      this.filteredArticles = this._all();
      return;
    }

    this.filteredArticles = this._all().filter(
      (a) =>
        a.title.toLowerCase().includes(q) ||
        a.brief.toLowerCase().includes(q) ||
        a.tags.some((t) => t.includes(q)),
    );
  }

  addArticle() {
    // For now, create a dummy article and prepend
    const newArticle: AdminArticle = {
      num: String(this._all().length + 1).padStart(2, "0"),
      slug: `new-article-${Date.now()}`,
      title: "New Article (Draft)",
      coverImage: "/images/blogs/angular-authentication.avif",
      date: new Date().toISOString().slice(0, 10),
      brief: "Draft article created from admin.",
      tags: ["draft"],
    };

    this._all.set([newArticle, ...this._all()]);
    this.filteredArticles = this._all();
  }
}
