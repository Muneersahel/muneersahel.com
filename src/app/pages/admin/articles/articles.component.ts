import { Blog } from "@/core/blog-interface";
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import {
  Firestore,
  collection,
  collectionData,
  orderBy,
  query,
} from "@angular/fire/firestore";
import { Router, RouterLink } from "@angular/router";
import { NgIcon, provideIcons } from "@ng-icons/core";
import {
  lucideExternalLink,
  lucideFileText,
  lucidePlus,
  lucideSearch,
} from "@ng-icons/lucide";
import { HlmButton } from "@spartan-ng/helm/button";
import { HlmCard } from "@spartan-ng/helm/card";
import { HlmInput } from "@spartan-ng/helm/input";
import { map } from "rxjs";

@Component({
  selector: "app-admin-articles",
  standalone: true,
  imports: [HlmCard, HlmButton, HlmInput, NgIcon, RouterLink],
  providers: [
    provideIcons({
      lucidePlus,
      lucideSearch,
      lucideExternalLink,
      lucideFileText,
    }),
  ],
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
            class="flex items-center gap-2 text-black rounded-md h-10"
            (click)="addArticle()"
          >
            <ng-icon hlm name="lucidePlus"></ng-icon>
            <span>Add Article</span>
          </button>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        @if (articles().length === 0) {
          <div class="col-span-full text-center py-16">
            <p class="text-black/60 text-lg">No articles found.</p>
            <p class="text-black/40 text-sm mt-2">
              Click "Add Article" to create your first blog post.
            </p>
          </div>
        } @else if (filteredArticles().length === 0) {
          <div class="col-span-full text-center py-16">
            <p class="text-black/60 text-lg">No articles match your search.</p>
            <p class="text-black/40 text-sm mt-2">
              Try a different search term.
            </p>
          </div>
        } @else {
          @for (article of filteredArticles(); track article.slug) {
            <a
              [routerLink]="['/admin/articles/edit', article.slug]"
              class="block"
            >
              <div
                hlmCard
                class="bg-black/5 hover:bg-black/7 transition h-full"
              >
                <div class="p-4 h-full flex flex-col space-y-4">
                  <div
                    class="h-40 bg-black/3 rounded-lg overflow-hidden mb-3 flex items-center justify-center"
                  >
                    @if (article.coverImage) {
                      <img
                        [src]="article.coverImage"
                        [alt]="article.title"
                        class="w-full h-full object-cover"
                      />
                    } @else {
                      <ng-icon
                        hlm
                        name="lucideFileText"
                        class="text-black/20"
                        size="48"
                      />
                    }
                  </div>

                  <h3 class="text-lg font-semibold text-black mb-2">
                    {{ article.title }}
                  </h3>

                  <p class="text-black/70 text-sm overflow-hidden">
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
        }
      </div>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class AdminArticlesComponent {
  private router = inject(Router);
  private firestore = inject(Firestore);

  // Fetch articles from Firestore in real-time
  articles = toSignal(
    collectionData(
      query(collection(this.firestore, "blogs"), orderBy("date", "desc")),
    ).pipe(map((blogs) => blogs as Blog[])),
    { initialValue: [] as Blog[] },
  );

  searchQuery = signal("");

  // Reactive filtered articles based on search query
  filteredArticles = computed(() => {
    const q = this.searchQuery().toLowerCase().trim();
    const allArticles = this.articles();

    if (!q) {
      return allArticles;
    }

    return allArticles.filter(
      (a) =>
        a.title.toLowerCase().includes(q) ||
        a.brief.toLowerCase().includes(q) ||
        a.tags?.some((t) => t.toLowerCase().includes(q)),
    );
  });

  onSearch(query: string) {
    this.searchQuery.set(query);
  }

  addArticle() {
    // Navigate to the article editor
    this.router.navigate(["/admin/articles/new"]);
  }
}
