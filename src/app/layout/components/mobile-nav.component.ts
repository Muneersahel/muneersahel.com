import { ChangeDetectionStrategy, Component } from "@angular/core";
import { NgIcon, provideIcons } from "@ng-icons/core";
import { BrnSheetContent, BrnSheetTrigger } from "@spartan-ng/brain/sheet";

// import {
//   HlmSheet,
//   HlmSheetContent,
//   HlmSheetDescriptionDirective,
//   HlmSheetFooterComponent,
//   HlmSheetHeaderComponent,
//   HlmSheetTitleDirective,
// } from '@ui/sheet';

import { RouterLink, RouterLinkActive } from "@angular/router";
import { lucideAlignRight } from "@ng-icons/lucide";
import { HlmSheet, HlmSheetContent } from "@spartan-ng/helm/sheet";
import { links } from "../constants";

@Component({
  selector: "app-mobile-nav",
  imports: [
    HlmSheetContent,
    HlmSheet,
    BrnSheetTrigger,
    BrnSheetContent,
    NgIcon,
    RouterLink,
    RouterLinkActive,
  ],
  providers: [provideIcons({ lucideAlignRight })],
  template: `
    <hlm-sheet>
      <button brnSheetTrigger side="right" aria-label="Open menu">
        <ng-icon
          hlm
          name="lucideAlignRight"
          size="lg"
          class="text-accent"
        ></ng-icon>
      </button>

      <hlm-sheet-content *brnSheetContent="let ctx">
        <div class="mt-32 mb-40 text-center text-2xl">
          <h1 class="text-4xl font-semibold">
            <a routerLink="/" class="">
              Muneer<span class="text-accent">.</span>
            </a>
          </h1>
        </div>

        <nav>
          <ul class="flex flex-col justify-center items-center gap-8">
            @for (link of links; track link.name) {
              <li>
                <a
                  routerLink="{{ link.path }}"
                  class="capitalize font-medium hover:text-accent transition-all"
                  routerLinkActive="text-accent border-b-2 border-accent"
                  [routerLinkActiveOptions]="{ exact: true }"
                >
                  {{ link.name }}
                </a>
              </li>
            }
          </ul>
        </nav>
      </hlm-sheet-content>
    </hlm-sheet>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class MobileNavComponent {
  links = links;
}
