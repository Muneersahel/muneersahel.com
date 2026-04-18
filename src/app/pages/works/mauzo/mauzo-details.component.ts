import { MetaTagsService } from "@/shared/services";
import { NgOptimizedImage } from "@angular/common";
import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { RouterLink } from "@angular/router";
import { NgIcon, provideIcons } from "@ng-icons/core";
import {
  lucideArrowLeft,
  lucideArrowRight,
  lucideExternalLink,
  lucideLayers,
  lucideSmartphone,
  lucideSparkles,
} from "@ng-icons/lucide";
import { HlmBadge } from "@spartan-ng/helm/badge";
import { HlmButton } from "@spartan-ng/helm/button";
import { HlmCardImports } from "@spartan-ng/helm/card";

@Component({
  selector: "app-mauzo-details",
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
      lucideLayers,
      lucideSmartphone,
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
              POS and retail
            </span>
          </div>

          <h1 class="text-4xl md:text-5xl font-bold mb-4">
            Mauzo —
            <span class="text-accent"
              >sell and run the shop from your phone</span
            >
          </h1>

          <p class="text-white/70 text-lg max-w-3xl">
            Mauzo turns phones and tablets into a point-of-sale and operations
            hub for small retailers across East Africa: record sales, watch
            stock, understand profit, and keep branches aligned — with native
            apps and a marketing site that explains the product end to end.
          </p>

          <div class="mt-8 flex flex-wrap gap-3">
            <a
              href="https://mauzoapp.com/"
              target="_blank"
              rel="noopener noreferrer"
              hlmBtn
              size="lg"
              class="flex items-center gap-2 bg-accent text-primary hover:bg-accent/90"
            >
              <ng-icon hlm name="lucideExternalLink"></ng-icon>
              Visit mauzoapp.com
            </a>
            <a
              href="https://play.google.com/store/apps/details?id=com.juafaida.mauzo"
              target="_blank"
              rel="noopener noreferrer"
              hlmBtn
              variant="outline"
              size="lg"
              class="flex items-center gap-2"
            >
              <ng-icon hlm name="lucideSmartphone"></ng-icon>
              Google Play
            </a>
            <a
              href="https://apps.apple.com/tz/app/mauzo-app-sell-track/id6612007098"
              target="_blank"
              rel="noopener noreferrer"
              hlmBtn
              variant="outline"
              size="lg"
              class="flex items-center gap-2"
            >
              <ng-icon hlm name="lucideSmartphone"></ng-icon>
              App Store
            </a>
          </div>
        </header>

        <figure
          hlmCard
          class="mb-16 overflow-hidden border-white/10 bg-white/5 p-0"
        >
          <img
            [ngSrc]="'/images/works/mauzoapp.png'"
            alt="Mauzo marketing website hero and product sections for the POS app"
            width="1280"
            height="800"
            priority
            class="w-full h-auto"
          />
          <figcaption
            class="px-5 py-3 text-sm text-white/50 border-t border-white/10"
          >
            Screenshot of mauzoapp.com
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
            <h2 class="text-xl font-bold">Surfaces</h2>
          </div>
          <div class="flex flex-wrap gap-2">
            @for (item of surfaces; track item) {
              <span
                class="px-3 py-1 bg-white/10 rounded-full text-sm text-white/80"
              >
                {{ item }}
              </span>
            }
          </div>
        </section>

        <div class="flex justify-center">
          <a
            href="https://mauzoapp.com/"
            target="_blank"
            rel="noopener noreferrer"
            hlmBtn
            variant="outline"
            size="lg"
            class="flex items-center gap-2"
          >
            Open the Mauzo site
            <ng-icon hlm name="lucideArrowRight"></ng-icon>
          </a>
        </div>
      </div>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class MauzoDetailsComponent {
  private metaTags = inject(MetaTagsService);

  constructor() {
    this.metaTags.updateMetaTags({
      title: "Mauzo — POS & business tools for East Africa | Munir Issa",
      description:
        "Mauzo: point-of-sale, inventory, and reporting for small retailers — Android, iOS, and mauzoapp.com.",
    });
  }

  readonly features = [
    {
      title: "Sales at the counter",
      description:
        "Record transactions quickly on devices staff already carry, so checkout stays fast during busy periods.",
    },
    {
      title: "Stock you can trust",
      description:
        "Track inventory with alerts when items run low, reducing guesswork and lost sales from empty shelves.",
    },
    {
      title: "Visibility into performance",
      description:
        "Reports and summaries help owners see profit, expenses, and trends without exporting spreadsheets first.",
    },
  ];

  readonly surfaces = [
    "Marketing site",
    "Android app",
    "iOS app",
    "Multi-location",
  ];
}
