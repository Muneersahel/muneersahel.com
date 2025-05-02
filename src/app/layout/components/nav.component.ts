import { ChangeDetectionStrategy, Component } from "@angular/core";
import { RouterLink, RouterLinkActive } from "@angular/router";

import { links } from "../constants";

@Component({
  selector: "app-nav",
  imports: [RouterLink, RouterLinkActive],
  template: `
    <nav>
      <ul class="flex gap-8">
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
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavComponent {
  links = links;
}
