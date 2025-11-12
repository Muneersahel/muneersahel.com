import { Blog } from "@/core/blog-interface";
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from "@angular/core";
import {
  Firestore,
  addDoc,
  collection,
  getDocs,
  query,
  where,
} from "@angular/fire/firestore";
import { FormBuilder } from "@angular/forms";
import {
  Field,
  form,
  minLength,
  required,
  submit,
} from "@angular/forms/signals";
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { NgIcon, provideIcons } from "@ng-icons/core";
import {
  lucideArrowLeft,
  lucideEye,
  lucideSave,
  lucideX,
} from "@ng-icons/lucide";
import { deepComputed } from "@ngrx/signals";
import { HlmButton } from "@spartan-ng/helm/button";
import { HlmCard } from "@spartan-ng/helm/card";
import { HlmInput } from "@spartan-ng/helm/input";
import { HlmLabel } from "@spartan-ng/helm/label";
import { HlmTextareaImports } from "@spartan-ng/helm/textarea";
import { MarkdownModule } from "ngx-markdown";
import { toast } from "ngx-sonner";
import { explicitEffect } from "ngxtension/explicit-effect";

@Component({
  selector: "app-article-editor",
  standalone: true,
  imports: [
    RouterLink,
    HlmCard,
    HlmButton,
    HlmInput,
    HlmLabel,
    NgIcon,
    HlmTextareaImports,
    MarkdownModule,
    Field,
  ],
  providers: [
    provideIcons({ lucideArrowLeft, lucideSave, lucideEye, lucideX }),
  ],
  template: `
    <section class="p-6 max-w-6xl mx-auto">
      <!-- Header -->
      <div class="flex items-center justify-between mb-6">
        <div class="flex items-center gap-4">
          <a
            routerLink="/admin/articles"
            class="inline-flex items-center gap-2 text-sm text-black/60 hover:text-black"
          >
            <ng-icon hlm name="lucideArrowLeft" class="w-4 h-4" />
            Back to articles
          </a>
        </div>
        <div class="flex items-center gap-2">
          <button
            hlmBtn
            variant="outline"
            (click)="togglePreview()"
            class="flex items-center gap-2"
          >
            <ng-icon hlm name="lucideEye" />
            <span>{{ showPreview() ? "Edit" : "Preview" }}</span>
          </button>
          <button
            hlmBtn
            (click)="onSave()"
            [disabled]="!articleForm().valid()"
            class="flex items-center gap-2"
          >
            <ng-icon hlm name="lucideSave" />
            <span>{{ isSaving() ? "Saving..." : "Save Article" }}</span>
          </button>
        </div>
      </div>

      <div class="grid grid-cols-1 gap-6">
        <!-- Form Section -->
        @if (!showPreview()) {
          <div hlmCard class="p-6">
            <form class="space-y-6">
              <!-- Title -->
              <div class="space-y-2">
                <label hlmLabel for="title" class="text-black">
                  Title
                  <span class="text-red-500">*</span></label
                >
                <input
                  hlmInput
                  id="title"
                  [field]="articleForm.title"
                  placeholder="Enter article title"
                  class="w-full text-black placeholder:text-black/40"
                />
                @if (
                  articleForm.title().invalid() && articleForm.title().touched()
                ) {
                  <p class="text-xs text-red-500">Title is required</p>
                }
              </div>

              <!-- Slug -->
              <div class="space-y-2">
                <label hlmLabel for="slug" class="text-black"
                  >Slug <span class="text-red-500">*</span></label
                >
                <input
                  hlmInput
                  id="slug"
                  [field]="articleForm.slug"
                  placeholder="article-url-slug"
                  class="w-full text-black placeholder:text-black/40"
                />
                @if (
                  articleForm.slug().invalid() && articleForm.slug().touched()
                ) {
                  <p class="text-xs text-red-500">Slug is required</p>
                }
              </div>

              <!-- Brief -->
              <div class="space-y-2">
                <label hlmLabel for="brief" class="text-black"
                  >Brief Description <span class="text-red-500">*</span></label
                >
                <textarea
                  hlmInput
                  id="brief"
                  [field]="articleForm.brief"
                  rows="3"
                  placeholder="A short description of the article"
                  class="w-full text-black placeholder:text-black/40 resize-none"
                ></textarea>
                @if (
                  articleForm.brief().invalid() && articleForm.brief().touched()
                ) {
                  <p class="text-xs text-red-500">Brief is required</p>
                }
              </div>

              <!-- Cover Image URL -->
              <div class="space-y-2">
                <label hlmLabel for="coverImage" class="text-black"
                  >Cover Image URL</label
                >
                <input
                  hlmInput
                  id="coverImage"
                  [field]="articleForm.coverImage"
                  placeholder="/images/blogs/cover.avif"
                  class="w-full text-black placeholder:text-black/40"
                />
              </div>

              <!-- Date -->
              <div class="space-y-2">
                <label hlmLabel for="date" class="text-black"
                  >Publish Date <span class="text-red-500">*</span></label
                >
                <input
                  hlmInput
                  id="date"
                  type="date"
                  [field]="articleForm.date"
                  class="w-full text-black"
                />
              </div>

              <!-- Tags -->
              <div class="space-y-2">
                <label hlmLabel class="text-black">Tags</label>
                <div
                  class="flex flex-wrap gap-2 items-center min-h-10 p-2 border border-black/10 rounded-md bg-transparent"
                >
                  @for (tag of tags(); track tag) {
                    <span
                      class="inline-flex items-center gap-1 px-2 py-1 bg-black/10 rounded text-sm text-black"
                    >
                      {{ tag }}
                      <button
                        type="button"
                        (click)="removeTag(tag)"
                        class="hover:text-red-500 w-3 h-3"
                      >
                        <ng-icon hlm name="lucideX" class="w-3 h-3" />
                      </button>
                    </span>
                  }
                  <input
                    type="text"
                    class="flex-1 min-w-[120px] border-0 bg-transparent outline-none text-sm text-black placeholder:text-black/40"
                    placeholder="Add tag (press Enter)"
                    (keydown.enter)="addTag($event)"
                  />
                </div>
              </div>

              <!-- Content (Markdown Editor) -->
              <div class="space-y-2">
                <label hlmLabel for="content" class="text-black"
                  >Content (Markdown) <span class="text-red-500">*</span></label
                >
                <textarea
                  hlmTextarea
                  id="content"
                  [field]="articleForm.content"
                  [rows]="20"
                  placeholder="# Your Article Title

Write your article content here using Markdown syntax...

## Features
- Support for **bold** and *italic*
- Code blocks
- Lists
- And more!"
                  class="w-full text-black placeholder:text-black/40 font-mono text-sm leading-relaxed resize-y"
                ></textarea>
                @if (
                  articleForm.content().invalid() &&
                  articleForm.content().touched()
                ) {
                  <p class="text-xs text-red-500">Content is required</p>
                }
                <p class="text-xs text-black/60">
                  Use Markdown syntax. Supports headings, bold, italic, code
                  blocks, lists, etc.
                </p>
              </div>
            </form>
          </div>
        }

        <!-- Preview Section -->
        @if (showPreview()) {
          <div hlmCard class="p-6 bg-primary">
            <article class="blog max-w-none">
              <h1>
                {{ articleForm.title().value() || "Untitled Article" }}
              </h1>

              @if (articleForm.coverImage().value()) {
                <img
                  [src]="articleForm.coverImage().value()"
                  [alt]="articleForm.title().value()"
                />
              }

              <div class="text-sm text-white/60 mb-4">
                {{ articleForm.date().value() }} •
                {{ articleForm.brief().value() }}
              </div>

              @if (tags().length > 0) {
                <div class="flex gap-2 mb-6">
                  @for (tag of tags(); track tag) {
                    <span
                      class="px-2 py-1 bg-accent/20 text-accent rounded text-xs"
                    >
                      {{ tag }}
                    </span>
                  }
                </div>
              }

              <markdown
                [data]="
                  articleForm.content().value() ||
                  '*No content yet. Start writing!*'
                "
              ></markdown>
            </article>
          </div>
        }
      </div>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ArticleEditorComponent {
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private firestore = inject(Firestore);

  tags = signal<string[]>([]);
  showPreview = signal(false);
  isSaving = signal(false);
  editMode = signal(false);
  originalSlug = signal<string | null>(null);

  #articleModel = signal<Omit<Blog, "num">>({
    slug: "",
    title: "",
    coverImage: "",
    brief: "",
    content: "",
    tags: [],
    date: new Date().toISOString(),
  });

  article = deepComputed(() => this.#articleModel());

  articleForm = form(this.#articleModel, (value) => {
    required(value.slug);
    required(value.title);
    minLength(value.title, 5);
    required(value.brief);
    required(value.content);
    required(value.date);
  });

  constructor() {
    explicitEffect([this.article.title], ([title]) => {
      const slug = this.article.slug();
      if (title) {
        const newSlug = title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, "");
        this.articleForm.slug().value.set(newSlug);
      }
    });

    // Load article if editing (slug param exists)
    const slug = this.route.snapshot.paramMap.get("slug");
    if (slug && slug !== "new") {
      this.editMode.set(true);
      this.originalSlug.set(slug);
      this.loadArticle(slug);
    }
  }

  async loadArticle(slug: string) {
    try {
      const blogsCol = collection(this.firestore, "blogs");
      const q = query(blogsCol, where("slug", "==", slug));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const blogData = querySnapshot.docs[0].data() as Blog;
        this.articleForm().value.set({
          slug: blogData.slug,
          title: blogData.title,
          coverImage: blogData.coverImage,
          date: blogData.date,
          brief: blogData.brief,
          content: blogData.content,
          tags: blogData.tags || [],
        });
        this.tags.set(blogData.tags || []);
        toast.success("Article loaded successfully");
      } else {
        toast.error("Article not found");
        this.router.navigate(["/admin/articles"]);
      }
    } catch (error) {
      console.error("Error loading article:", error);
      toast.error("Failed to load article");
    }
  }

  addTag(event: Event) {
    event.preventDefault();
    const input = event.target as HTMLInputElement;
    const tag = input.value.trim();

    if (tag && !this.tags().includes(tag)) {
      this.tags.set([...this.tags(), tag]);
      input.value = "";
    }
  }

  removeTag(tag: string) {
    this.tags.set(this.tags().filter((t) => t !== tag));
  }

  togglePreview() {
    this.showPreview.set(!this.showPreview());
  }

  async onSave() {
    if (this.articleForm().valid() && !this.isSaving()) {
      this.isSaving.set(true);

      submit(this.articleForm, async () => {
        const blogsCol = collection(this.firestore, "blogs");
        const querySnapshot = await getDocs(blogsCol);
        const num = querySnapshot.docs.length + 1;

        const article: Blog = {
          ...this.#articleModel(),
          num: String(num).padStart(2, "0"),
          tags: this.tags(),
        };

        try {
          const blogsCol = collection(this.firestore, "blogs");

          if (this.editMode() && this.originalSlug()) {
            // Update existing article
            // First, check if slug has changed
            // const currentSlug = article.slug;
            // const originalSlug = this.originalSlug();
            // if (currentSlug !== originalSlug) {
            //   // Delete old document and create new one with new slug
            //   const oldQuery = query(
            //     blogsCol,
            //     where("slug", "==", originalSlug),
            //   );
            //   const oldSnapshot = await getDocs(oldQuery);
            //   if (!oldSnapshot.empty) {
            //     const oldDocRef = oldSnapshot.docs[0].ref;
            //     // Create new document with new slug
            //     await addDoc(blogsCol, {
            //       ...article,
            //       num: oldSnapshot.docs[0].data().num,
            //     });
            //     // Note: Manual deletion of old doc required or keep using setDoc with ID
            //     toast.warning(
            //       "Slug changed. Please manually delete the old article if needed.",
            //     );
            //   }
            // } else {
            // Update existing document
            // const q = query(blogsCol, where("slug", "==", currentSlug));
            // const querySnapshot = await getDocs(q);
            // if (!querySnapshot.empty) {
            //   const docRef = querySnapshot.docs[0].ref;
            //   await setDoc(docRef, article, { merge: true });
            //   toast.success("Article updated successfully!");
            // }
            // }
          } else {
            const slugQuery = query(
              blogsCol,
              where("slug", "==", article.slug),
            );
            const existingDocs = await getDocs(slugQuery);

            if (!existingDocs.empty) {
              toast.error("An article with this slug already exists!");
              this.isSaving.set(false);
              return;
            }

            await addDoc(blogsCol, article);
            toast.success("Article created successfully!");
          }

          this.router.navigate(["/admin/articles"]);
        } catch (error) {
          console.error("Error saving article:", error);
          toast.error("Failed to save article. Please try again.");
        } finally {
          this.isSaving.set(false);
        }
      });
    }
  }
}
