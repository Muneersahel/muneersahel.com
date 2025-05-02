import { ChangeDetectionStrategy, Component } from "@angular/core";
import { RouterLink } from "@angular/router";
import { HlmButtonModule } from "@spartan-ng/ui-button-helm";

import MobileNavComponent from "./mobile-nav.component";
import { NavComponent } from "./nav.component";

@Component({
  selector: "app-header",
  imports: [HlmButtonModule, RouterLink, NavComponent, MobileNavComponent],
  styles: `
    :host {
      @apply sticky top-0 z-10;
    }
  `,
  template: `
    <header class="py-8 xl:py-12 text-white">
      <!-- logo -->
      <div class="container flex items-center justify-between">
        <h1 class="text-4xl font-semibold">
          <a routerLink="/" class="">
            Muneer<span class="text-accent">.</span>
          </a>
        </h1>

        <!-- desktop nav and hire me button -->
        <div class="hidden xl:flex items-center gap-8">
          <app-nav />
          <a routerLink="/contact" hlmBtn color="accent" class="ml-4">
            Hire Me
          </a>
        </div>

        <!-- mobile nav -->
        <div class="xl:hidden">
          <app-mobile-nav />
        </div>
      </div>
    </header>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {}
