import { ChangeDetectionStrategy, Component } from "@angular/core";
import { RouterLink } from "@angular/router";
import { NgIcon, provideIcons } from "@ng-icons/core";
import { lucideArrowLeft } from "@ng-icons/lucide";
import { HlmCard } from "@spartan-ng/helm/card";

@Component({
  selector: "app-admin-article",
  standalone: true,
  imports: [HlmCard, NgIcon, RouterLink],
  providers: [provideIcons({ lucideArrowLeft })],
  template: `
    <section class="p-6">
      <div class="mb-4">
        <a
          routerLink="/admin/articles"
          class="inline-flex items-center gap-2 text-sm text-gray-500"
        >
          <ng-icon hlm name="lucideArrowLeft" class="w-4 h-4" />
          Back to articles
        </a>
      </div>

      <div hlmCard class="p-6">
        <h1 class="text-2xl font-bold mb-2">Dummy Article Title</h1>
        <div class="text-sm text-gray-500 mb-4">2024-06-08 • Draft</div>

        <article class="prose prose-invert max-w-none">
          <h2>Introduction</h2>
          <p>
            This is a dummy article used in the admin single-article view. It
            demonstrates rendering content in the admin area and can be replaced
            by real markdown parsing later.
          </p>

          <h3>Sample Code</h3>
          <pre><code>console.log('Hello from the dummy article');</code></pre>

          <h3>Conclusion</h3>
          <p>
            Replace this content with parsed markdown and frontmatter-driven
            fields when integrating with the actual blog storage.
          </p>
        </article>
      </div>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class AdminArticleComponent {}
