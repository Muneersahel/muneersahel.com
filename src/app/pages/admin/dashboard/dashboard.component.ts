import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { Auth, signOut } from "@angular/fire/auth";
import { RouterLink } from "@angular/router";
import { NgIcon, provideIcons } from "@ng-icons/core";
import { lucidePanelLeft } from "@ng-icons/lucide";
import { HlmButton } from "@spartan-ng/helm/button";

@Component({
  selector: "app-dashboard",
  standalone: true,
  imports: [RouterLink, HlmButton, NgIcon],
  providers: [
    provideIcons({
      lucidePanelLeft,
    }),
  ],
  template: `
    <section
      class="py-12 min-h-[80dvh] flex items-center justify-center text-gray-700"
    >
      <ng-icon hlm name="lucidePanelLeft"></ng-icon>

      <div class="container">
        <div class="max-w-2xl mx-auto rounded-lg p-8 border ">
          <h1 class="text-3xl font-bold mb-4">Dashboard</h1>
          <p class="mb-6">
            This is a protected dashboard page. Only authenticated users can see
            this.
          </p>

          <div class="flex gap-4">
            <a routerLink="/" hlmBtn color="primary">Home</a>
            <button hlmBtn color="accent" (click)="onSignOut()">
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class DashboardComponent {
  private auth = inject(Auth);

  async onSignOut() {
    try {
      await signOut(this.auth);
    } catch (e) {
      console.error("Sign out failed", e);
    }
  }
}
