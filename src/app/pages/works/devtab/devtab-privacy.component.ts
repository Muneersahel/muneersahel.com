import { MetaTagsService } from "@/shared/services";
import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { RouterLink } from "@angular/router";
import { NgIcon, provideIcons } from "@ng-icons/core";
import {
  lucideArrowLeft,
  lucideDatabase,
  lucideGlobe,
  lucideLock,
  lucideMail,
  lucideShield,
  lucideTrash2,
  lucideUserCheck,
} from "@ng-icons/lucide";
import { HlmButton } from "@spartan-ng/helm/button";
import { HlmCardImports } from "@spartan-ng/helm/card";

const SUPPORT_EMAIL = "saidmunir73@gmail.com";
const LAST_UPDATED = "April 18, 2026";

@Component({
  selector: "app-devtab-privacy",
  standalone: true,
  imports: [HlmButton, HlmCardImports, NgIcon, RouterLink],
  providers: [
    provideIcons({
      lucideArrowLeft,
      lucideDatabase,
      lucideGlobe,
      lucideLock,
      lucideMail,
      lucideShield,
      lucideTrash2,
      lucideUserCheck,
    }),
  ],
  template: `
    <section class="py-12 min-h-[80dvh]">
      <div class="container max-w-3xl">
        <a
          routerLink="/works/devtab"
          hlmBtn
          variant="ghost"
          size="sm"
          class="mb-8 text-white/60 inline-flex items-center gap-1"
        >
          <ng-icon hlm name="lucideArrowLeft"></ng-icon>
          Back to DevTab
        </a>

        <header class="mb-10">
          <div class="flex items-center gap-3 mb-4">
            <div
              class="w-12 h-12 rounded-lg bg-accent/15 text-accent flex items-center justify-center"
            >
              <ng-icon hlm size="24px" name="lucideShield"></ng-icon>
            </div>
            <div>
              <p class="text-white/50 text-sm uppercase tracking-wider">
                DevTab
              </p>
              <h1 class="text-3xl md:text-4xl font-bold">Privacy Policy</h1>
            </div>
          </div>
          <p class="text-white/60 text-sm">Last updated · {{ lastUpdated }}</p>
        </header>

        <div hlmCard class="p-8 bg-accent/5 border-accent/20 mb-10">
          <p class="text-white/80 leading-relaxed">
            <strong class="text-white">Short version:</strong> DevTab is a
            client-side Chrome extension. It has no backend, collects no
            analytics, and never sees your data. Your WakaTime API key and
            cached stats stay on your own device, and network traffic goes
            directly from your browser to the WakaTime API you configured.
          </p>
        </div>

        <article class="space-y-10 text-white/75 leading-relaxed">
          <section>
            <div class="flex items-center gap-2 mb-3">
              <ng-icon hlm name="lucideDatabase" class="text-accent"></ng-icon>
              <h2 class="text-xl font-bold text-white/90">
                What DevTab stores
              </h2>
            </div>
            <p class="mb-3">
              DevTab only stores information that is necessary for the dashboard
              to work. All of it lives locally in your browser through Chrome's
              <code class="text-accent">chrome.storage.local</code> API (or
              <code class="text-accent">localStorage</code> as a fallback):
            </p>
            <ul class="space-y-2 list-disc pl-6">
              <li>
                <strong class="text-white/90">Your WakaTime credential</strong>
                — the API key you pasted and the credential type you selected.
              </li>
              <li>
                <strong class="text-white/90">A dashboard cache</strong> — the
                latest stats and summaries response so that the next new tab
                paints instantly.
              </li>
            </ul>
            <p class="mt-3">
              That's it. No name, no email, no identifiers, no history of pages
              you visit, no anonymous IDs.
            </p>
          </section>

          <section>
            <div class="flex items-center gap-2 mb-3">
              <ng-icon hlm name="lucideGlobe" class="text-accent"></ng-icon>
              <h2 class="text-xl font-bold text-white/90">
                What DevTab sends over the network
              </h2>
            </div>
            <p class="mb-3">
              When a new tab opens, DevTab makes requests directly from your
              browser to the WakaTime API base URL you configured (by default
              <code class="text-accent">https://api.wakatime.com</code>). Those
              requests include your API key as an
              <code class="text-accent">Authorization</code> header so WakaTime
              can return your stats.
            </p>
            <p>
              Requests go straight to WakaTime. They do not pass through any
              server I control. No other third parties receive your data from
              DevTab.
            </p>
          </section>

          <section>
            <div class="flex items-center gap-2 mb-3">
              <ng-icon hlm name="lucideUserCheck" class="text-accent"></ng-icon>
              <h2 class="text-xl font-bold text-white/90">
                No tracking, no analytics
              </h2>
            </div>
            <p>
              DevTab does not include any analytics SDK, error-reporting
              service, or third-party tracker. There are no cookies set by the
              extension and no outbound pings beyond the WakaTime API calls
              described above.
            </p>
          </section>

          <section>
            <div class="flex items-center gap-2 mb-3">
              <ng-icon hlm name="lucideLock" class="text-accent"></ng-icon>
              <h2 class="text-xl font-bold text-white/90">
                Permissions DevTab uses
              </h2>
            </div>
            <ul class="space-y-2 list-disc pl-6">
              <li>
                <strong class="text-white/90">chrome_url_overrides</strong> —
                required to replace the new-tab page.
              </li>
              <li>
                <strong class="text-white/90">storage</strong> — required to
                save your API key and the dashboard cache locally.
              </li>
              <li>
                <strong class="text-white/90"
                  >host access to the WakaTime API</strong
                >
                — required to fetch your stats. You can revoke this at any time
                from Chrome's extension settings.
              </li>
            </ul>
            <p class="mt-3">
              DevTab does not request access to your browsing history, tabs,
              bookmarks, or any other site.
            </p>
          </section>

          <section>
            <div class="flex items-center gap-2 mb-3">
              <ng-icon hlm name="lucideTrash2" class="text-accent"></ng-icon>
              <h2 class="text-xl font-bold text-white/90">
                Deleting your data
              </h2>
            </div>
            <p class="mb-3">
              You can remove everything DevTab has stored at any time:
            </p>
            <ul class="space-y-2 list-disc pl-6">
              <li>
                Open DevTab's Settings and click
                <em class="text-white/90">Clear credential</em> to wipe the API
                key and cached dashboard.
              </li>
              <li>
                Or uninstall the extension — Chrome will drop the associated
                storage automatically.
              </li>
            </ul>
            <p class="mt-3">
              WakaTime holds your actual coding history. To delete that, manage
              your account directly at
              <a
                href="https://wakatime.com"
                target="_blank"
                rel="noopener noreferrer"
                class="text-accent hover:underline"
                >wakatime.com</a
              >.
            </p>
          </section>

          <section>
            <div class="flex items-center gap-2 mb-3">
              <ng-icon hlm name="lucideShield" class="text-accent"></ng-icon>
              <h2 class="text-xl font-bold text-white/90">Children</h2>
            </div>
            <p>
              DevTab is a developer tool and is not directed at children under
              13. It does not knowingly collect any personal information from
              them.
            </p>
          </section>

          <section>
            <div class="flex items-center gap-2 mb-3">
              <ng-icon hlm name="lucideShield" class="text-accent"></ng-icon>
              <h2 class="text-xl font-bold text-white/90">
                Changes to this policy
              </h2>
            </div>
            <p>
              If DevTab ever changes how it handles data, this page will be
              updated and the
              <em class="text-white/90">Last updated</em> date at the top will
              change. Meaningful changes will also be called out in the
              extension's release notes on GitHub.
            </p>
          </section>

          <section>
            <div class="flex items-center gap-2 mb-3">
              <ng-icon hlm name="lucideMail" class="text-accent"></ng-icon>
              <h2 class="text-xl font-bold text-white/90">Contact</h2>
            </div>
            <p class="mb-4">
              Questions, concerns, or requests about privacy? Reach out and I'll
              respond personally.
            </p>
            <a
              [href]="supportMailto"
              hlmBtn
              class="flex items-center gap-2 w-fit bg-accent text-primary hover:bg-accent/90"
            >
              <ng-icon hlm name="lucideMail"></ng-icon>
              {{ supportEmail }}
            </a>
          </section>
        </article>
      </div>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class DevtabPrivacyComponent {
  private metaTags = inject(MetaTagsService);

  readonly supportEmail = SUPPORT_EMAIL;
  readonly supportMailto = `mailto:${SUPPORT_EMAIL}?subject=DevTab%20privacy`;
  readonly lastUpdated = LAST_UPDATED;

  constructor() {
    this.metaTags.updateMetaTags({
      title: "DevTab Privacy Policy | Munir Issa",
      description:
        "How DevTab handles your data. Spoiler: it doesn't — everything stays on your device.",
    });
  }
}
