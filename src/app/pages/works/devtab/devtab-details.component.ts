import { MetaTagsService } from "@/shared/services";
import { NgOptimizedImage } from "@angular/common";
import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { RouterLink } from "@angular/router";
import { NgIcon, provideIcons } from "@ng-icons/core";
import {
  lucideArrowLeft,
  lucideArrowRight,
  lucideChrome,
  lucideCode,
  lucideExternalLink,
  lucideGithub,
  lucideKey,
  lucideLayers,
  lucideMail,
  lucideShield,
  lucideSparkles,
  lucideZap,
} from "@ng-icons/lucide";
import { HlmBadge } from "@spartan-ng/helm/badge";
import { HlmButton } from "@spartan-ng/helm/button";
import { HlmCardImports } from "@spartan-ng/helm/card";

const SUPPORT_EMAIL = "saidmunir73@gmail.com";

@Component({
  selector: "app-devtab-details",
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
      lucideChrome,
      lucideCode,
      lucideExternalLink,
      lucideGithub,
      lucideKey,
      lucideLayers,
      lucideMail,
      lucideShield,
      lucideSparkles,
      lucideZap,
    }),
  ],
  template: `
    <section class="py-12 min-h-[80dvh]">
      <div class="container max-w-6xl">
        <!-- Breadcrumb -->
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

        <!-- Hero -->
        <header class="mb-12">
          <div class="flex flex-wrap items-center gap-2 mb-4">
            <span hlmBadge class="bg-accent/15 text-accent border-accent/30">
              Featured Project
            </span>
            <span hlmBadge variant="outline" class="text-white/70">
              Chrome Extension
            </span>
          </div>

          <h1 class="text-4xl md:text-5xl font-bold mb-4">
            DevTab —
            <span class="text-accent">your coding analytics new tab</span>
          </h1>

          <p class="text-white/70 text-lg max-w-3xl">
            DevTab replaces every new tab with a live WakaTime dashboard. Open a
            tab, see the last 7 days of coding activity in one glance, then get
            back to shipping.
          </p>

          <div class="mt-8 flex flex-wrap gap-3">
            <a
              href="https://github.com/Muneersahel/DevTab"
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
              routerLink="/works/devtab/privacy"
              hlmBtn
              variant="ghost"
              size="lg"
              class="flex items-center gap-2 text-white/80"
            >
              <ng-icon hlm name="lucideShield"></ng-icon>
              Privacy Policy
            </a>
          </div>
        </header>

        <!-- Screenshot -->
        <figure
          hlmCard
          class="mb-16 overflow-hidden border-white/10 bg-white/5 p-0"
        >
          <img
            [ngSrc]="'/images/works/devtab.png'"
            alt="DevTab dashboard showing 18 hours of coding across TypeScript, HTML, and CSS over the last 7 days"
            width="1280"
            height="800"
            priority
            class="w-full h-auto"
          />
          <figcaption
            class="px-5 py-3 text-sm text-white/50 border-t border-white/10"
          >
            Dashboard rendered on a new tab · dummy data shown for preview
          </figcaption>
        </figure>

        <!-- Key features -->
        <section class="mb-16">
          <div class="flex items-center gap-2 mb-6">
            <ng-icon hlm name="lucideSparkles" class="text-accent"></ng-icon>
            <h2 class="text-2xl font-bold">Key features</h2>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            @for (feature of features; track feature.title) {
              <article
                hlmCard
                class="p-6 bg-white/5 border-white/10 hover:border-accent/50 transition-colors"
              >
                <div
                  class="w-10 h-10 rounded-lg bg-accent/10 text-accent flex items-center justify-center mb-4"
                >
                  <ng-icon hlm [name]="feature.icon"></ng-icon>
                </div>
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

        <!-- How it works -->
        <section class="mb-16">
          <div class="flex items-center gap-2 mb-6">
            <ng-icon hlm name="lucideZap" class="text-accent"></ng-icon>
            <h2 class="text-2xl font-bold">How it works</h2>
          </div>

          <ol class="space-y-4">
            @for (step of howItWorks; track step.title; let i = $index) {
              <li
                hlmCard
                class="p-6 bg-white/5 border-white/10 flex gap-5 items-start"
              >
                <div
                  class="flex-none w-10 h-10 rounded-full bg-accent/15 text-accent font-semibold flex items-center justify-center"
                >
                  {{ i + 1 }}
                </div>
                <div>
                  <h3 class="text-lg font-semibold mb-1 text-white/90">
                    {{ step.title }}
                  </h3>
                  <p class="text-white/60 text-sm leading-relaxed">
                    {{ step.description }}
                  </p>
                </div>
              </li>
            }
          </ol>
        </section>

        <!-- Under the hood -->
        <section class="mb-16 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <article hlmCard class="p-6 bg-white/5 border-white/10 lg:col-span-2">
            <div class="flex items-center gap-2 mb-4">
              <ng-icon hlm name="lucideLayers" class="text-accent"></ng-icon>
              <h2 class="text-xl font-bold">Under the hood</h2>
            </div>
            <p class="text-white/70 mb-5 text-sm leading-relaxed">
              DevTab is a Manifest V3 Chrome extension backed by an Angular 21
              single-page app. It ships as a static bundle, reads the WakaTime
              stats and summaries endpoints, and renders through a small
              signal-based store that paints cached data instantly and refreshes
              quietly in the background.
            </p>
            <div class="flex flex-wrap gap-2">
              @for (tech of stack; track tech) {
                <span
                  class="px-3 py-1 bg-white/10 rounded-full text-sm text-white/80"
                >
                  {{ tech }}
                </span>
              }
            </div>
          </article>

          <article hlmCard class="p-6 bg-white/5 border-white/10">
            <div class="flex items-center gap-2 mb-4">
              <ng-icon hlm name="lucideKey" class="text-accent"></ng-icon>
              <h3 class="text-xl font-bold">What you need</h3>
            </div>
            <ul class="space-y-3 text-sm text-white/70">
              <li class="flex gap-2">
                <span class="text-accent">→</span>
                <span>A WakaTime account (or any compatible backend)</span>
              </li>
              <li class="flex gap-2">
                <span class="text-accent">→</span>
                <span>Your personal WakaTime API key</span>
              </li>
              <li class="flex gap-2">
                <span class="text-accent">→</span>
                <span>Chrome or any Chromium-based browser</span>
              </li>
            </ul>
          </article>
        </section>

        <!-- Privacy snapshot -->
        <section
          hlmCard
          class="mb-16 p-8 bg-accent/5 border-accent/20 flex flex-col md:flex-row gap-6 items-start"
        >
          <div
            class="flex-none w-12 h-12 rounded-lg bg-accent/15 text-accent flex items-center justify-center"
          >
            <ng-icon hlm size="24px" name="lucideShield"></ng-icon>
          </div>
          <div class="flex-1">
            <h2 class="text-xl font-bold mb-2">Privacy by design</h2>
            <p class="text-white/70 mb-4 text-sm leading-relaxed">
              DevTab has no backend, no analytics, and no account system. Your
              WakaTime API key lives in Chrome's local storage on your device.
              Network requests go directly from your browser to api.wakatime.com
              — nothing is proxied through any server I control.
            </p>
            <a
              routerLink="/works/devtab/privacy"
              hlmBtn
              variant="outline"
              class="flex items-center gap-2 w-fit"
            >
              Read the full privacy policy
              <ng-icon hlm name="lucideArrowRight"></ng-icon>
            </a>
          </div>
        </section>

        <!-- Support -->
        <section
          hlmCard
          class="p-8 bg-white/5 border-white/10 flex flex-col md:flex-row gap-6 items-start"
        >
          <div
            class="flex-none w-12 h-12 rounded-lg bg-accent/15 text-accent flex items-center justify-center"
          >
            <ng-icon hlm size="24px" name="lucideMail"></ng-icon>
          </div>
          <div class="flex-1">
            <h2 class="text-xl font-bold mb-2">Support & feedback</h2>
            <p class="text-white/70 mb-4 text-sm leading-relaxed">
              Found a bug, have an idea, or want to ask something about DevTab?
              Reach out directly — I read every message.
            </p>
            <a
              [href]="supportMailto"
              hlmBtn
              class="flex items-center gap-2 w-fit bg-accent text-primary hover:bg-accent/90"
            >
              <ng-icon hlm name="lucideMail"></ng-icon>
              {{ supportEmail }}
            </a>
          </div>
        </section>
      </div>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class DevtabDetailsComponent {
  private metaTags = inject(MetaTagsService);

  readonly supportEmail = SUPPORT_EMAIL;
  readonly supportMailto = `mailto:${SUPPORT_EMAIL}?subject=DevTab%20support`;

  constructor() {
    this.metaTags.updateMetaTags({
      title: "DevTab — Coding analytics on every new tab | Munir Issa",
      description:
        "A Chrome new-tab extension that shows a live WakaTime dashboard: coding hours, languages, projects, and editors at a glance.",
    });
  }

  features = [
    {
      icon: "lucideZap",
      title: "Instant paint",
      description:
        "The dashboard renders from local cache the moment you open a new tab, then refreshes in the background. No empty screens, no waiting.",
    },
    {
      icon: "lucideChrome",
      title: "Built for the new tab",
      description:
        "DevTab replaces the default Chrome new-tab page with a focused, dark, distraction-free coding overview.",
    },
    {
      icon: "lucideCode",
      title: "Rich WakaTime breakdown",
      description:
        "Total hours, daily average, best day, languages, projects, editors, and operating systems — all from the last 7 days of activity.",
    },
    {
      icon: "lucideLayers",
      title: "Weekly activity chart",
      description:
        "A bar chart of coding minutes per day and a donut for your language mix make the breakdown easy to read at a glance.",
    },
    {
      icon: "lucideShield",
      title: "Local-first & private",
      description:
        "Your API key never leaves your browser. There's no server in the middle and no telemetry. You're the only audience for your data.",
    },
    {
      icon: "lucideSparkles",
      title: "Any WakaTime backend",
      description:
        "Works with wakatime.com, self-hosted Wakapi, Hackatime, or any WakaTime-compatible API — just paste the right base URL and key.",
    },
  ];

  howItWorks = [
    {
      title: "Install the extension",
      description:
        "Add DevTab to Chrome (or any Chromium-based browser). It registers as a new-tab page and does nothing else until you connect an account.",
    },
    {
      title: "Paste your WakaTime API key",
      description:
        "Open Settings from the dashboard header, pick your credential type (WakaTime or compatible backend), and paste your personal API key. The key is stored locally via Chrome's storage API.",
    },
    {
      title: "Open a new tab",
      description:
        "DevTab fetches your last-7-days stats and summaries from the WakaTime API, normalizes them, caches the result, and paints the dashboard. Subsequent tabs render from cache instantly.",
    },
    {
      title: "Refresh or customize",
      description:
        "Hit Refresh for an on-demand sync, or manage your credential from Settings at any time. Removing the credential clears all cached data.",
    },
  ];

  stack = [
    "Angular 21",
    "TypeScript",
    "Tailwind CSS",
    "Chrome Manifest V3",
    "WakaTime API",
    "Chart.js",
    "Signals",
    "esbuild",
  ];
}
