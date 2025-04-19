import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  BrnSheetContentDirective,
  BrnSheetTriggerDirective,
} from '@spartan-ng/ui-sheet-brain';

// import {
//   HlmSheetComponent,
//   HlmSheetContentComponent,
//   HlmSheetDescriptionDirective,
//   HlmSheetFooterComponent,
//   HlmSheetHeaderComponent,
//   HlmSheetTitleDirective,
// } from '@ui/sheet';

import { RouterLink, RouterLinkActive } from '@angular/router';
import { lucideAlignRight } from '@ng-icons/lucide';
import { HlmIconComponent, provideIcons } from '@spartan-ng/ui-icon-helm';
import {
  HlmSheetComponent,
  HlmSheetContentComponent,
} from '@spartan-ng/ui-sheet-helm';
import { links } from '../constants';

@Component({
  selector: 'app-mobile-nav',
  imports: [
    HlmSheetContentComponent,
    HlmSheetComponent,
    BrnSheetTriggerDirective,
    BrnSheetContentDirective,
    HlmIconComponent,
    RouterLink,
    RouterLinkActive,
  ],
  providers: [provideIcons({ lucideAlignRight })],
  template: `
    <hlm-sheet>
      <button brnSheetTrigger side="right">
        <hlm-icon
          name="lucideAlignRight"
          size="lg"
          class="text-accent"
        ></hlm-icon>
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
