import { MetaTagsService } from "@/shared/services";
import { NgOptimizedImage } from "@angular/common";
import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { RouterLink } from "@angular/router";
import { NgIcon, provideIcons } from "@ng-icons/core";
import {
  lucideArrowLeft,
  lucideArrowRight,
  lucideExternalLink,
  lucideGithub,
  lucideLayers,
  lucidePackage,
  lucideSparkles,
} from "@ng-icons/lucide";
import { HlmBadge } from "@spartan-ng/helm/badge";
import { HlmButton } from "@spartan-ng/helm/button";
import { HlmCardImports } from "@spartan-ng/helm/card";

@Component({
  selector: "app-mat-tel-input-details",
  standalone: true,
  imports: [
    HlmButton,
    HlmBadge,
    HlmCardImports,
    NgIcon,
    NgOptimizedImage,
    RouterLink,
  ],
  providers: [
    provideIcons({
      lucideArrowLeft,
      lucideArrowRight,
      lucideExternalLink,
      lucideGithub,
      lucideLayers,
      lucidePackage,
      lucideSparkles,
    }),
  ],
  template: `
    <section class="py-12 min-h-[80dvh]">
      <div class="container max-w-6xl">
        <a
          routerLink="/works"
          hlmBtn
          variant="ghost"
          size="sm"
          class="mb-8 text-white/60 inline-flex items-center gap-1"
        >
          <ng-icon hlm name="lucideArrowLeft"></ng-icon>
          Back to Works
        </a>

        <header class="mb-12">
          <div class="flex flex-wrap items-center gap-2 mb-4">
            <span hlmBadge class="bg-accent/15 text-accent border-accent/30">
              Featured Project
            </span>
            <span hlmBadge variant="outline" class="text-white/70">
              Angular Material
            </span>
          </div>

          <h1 class="text-4xl md:text-5xl font-bold mb-4">
            mat-tel-input —
            <span class="text-accent"
              >international phone fields for Material</span
            >
          </h1>

          <p class="text-white/70 text-lg max-w-3xl">
            A standalone Angular component that drops into
            <code class="text-accent/90">mat-form-field</code> with country
            search, E.164 hydration, validation, and CSS variables for theming.
            Published on npm with live documentation and a playground.
          </p>

          <div class="mt-8 flex flex-wrap gap-3">
            <a
              href="https://github.com/Muneersahel/mat-tel-input"
              target="_blank"
              rel="noopener noreferrer"
              hlmBtn
              variant="outline"
              size="lg"
              class="flex items-center gap-2"
            >
              <ng-icon hlm name="lucideGithub"></ng-icon>
              Source on GitHub
            </a>
            <a
              href="https://www.npmjs.com/package/mat-tel-input"
              target="_blank"
              rel="noopener noreferrer"
              hlmBtn
              variant="outline"
              size="lg"
              class="flex items-center gap-2"
            >
              <ng-icon hlm name="lucidePackage"></ng-icon>
              Package on npm
            </a>
            <a
              href="https://mattelinput.muneersahel.com/"
              target="_blank"
              rel="noopener noreferrer"
              hlmBtn
              size="lg"
              class="flex items-center gap-2 bg-accent text-primary hover:bg-accent/90"
            >
              <ng-icon hlm name="lucideExternalLink"></ng-icon>
              Live demo & docs
            </a>
          </div>
        </header>

        <figure
          hlmCard
          class="mb-16 overflow-hidden border-white/10 bg-white/5 p-0"
        >
          <img
            [ngSrc]="'/images/works/mattelinput.png'"
            alt="mat-tel-input documentation site showing getting started, live phone demos, and API reference"
            width="1280"
            height="800"
            priority
            class="w-full h-auto"
          />
          <figcaption
            class="px-5 py-3 text-sm text-white/50 border-t border-white/10"
          >
            Screenshot of the hosted demo at mattelinput.muneersahel.com
          </figcaption>
        </figure>

        <section class="mb-16">
          <div class="flex items-center gap-2 mb-6">
            <ng-icon hlm name="lucideSparkles" class="text-accent"></ng-icon>
            <h2 class="text-2xl font-bold">Highlights</h2>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            @for (feature of features; track feature.title) {
              <article
                hlmCard
                class="p-6 bg-white/5 border-white/10 hover:border-accent/50 transition-colors"
              >
                <h3 class="text-lg font-semibold mb-2 text-white/90">
                  {{ feature.title }}
                </h3>
                <p class="text-white/60 text-sm leading-relaxed">
                  {{ feature.description }}
                </p>
              </article>
            }
          </div>
        </section>

        <section hlmCard class="p-6 bg-white/5 border-white/10 mb-16">
          <div class="flex items-center gap-2 mb-4">
            <ng-icon hlm name="lucideLayers" class="text-accent"></ng-icon>
            <h2 class="text-xl font-bold">Stack</h2>
          </div>
          <div class="flex flex-wrap gap-2">
            @for (tech of stack; track tech) {
              <span
                class="px-3 py-1 bg-white/10 rounded-full text-sm text-white/80"
              >
                {{ tech }}
              </span>
            }
          </div>
        </section>

        <div class="flex justify-center">
          <a
            href="https://mattelinput.muneersahel.com/"
            target="_blank"
            rel="noopener noreferrer"
            hlmBtn
            variant="outline"
            size="lg"
            class="flex items-center gap-2"
          >
            Open full documentation
            <ng-icon hlm name="lucideArrowRight"></ng-icon>
          </a>
        </div>
      </div>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class MatTelInputDetailsComponent {
  private metaTags = inject(MetaTagsService);

  constructor() {
    this.metaTags.updateMetaTags({
      title: "mat-tel-input — Angular Material phone input | Munir Issa",
      description:
        "mat-tel-input: an Angular Material telephone input with country picker, validation, E.164 support, and live documentation.",
    });
  }

  readonly features = [
    {
      title: "Form control friendly",
      description:
        "Implements ControlValueAccessor so it behaves like any other Material control inside reactive or template-driven forms.",
    },
    {
      title: "Validation built in",
      description:
        "Registers sensible validators and exposes matTelInputValidator when you need explicit control over error messages.",
    },
    {
      title: "Configurable UX",
      description:
        "Preferred and allowed country lists, search in the dropdown, display formats (national / international), and CSS custom properties for flags and dial codes.",
    },
  ];

  readonly stack = [
    "Angular",
    "Angular Material",
    "TypeScript",
    "libphonenumber-js",
    "npm",
  ];
}
