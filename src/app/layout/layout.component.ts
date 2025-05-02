import { ChangeDetectionStrategy, Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";

import { HeaderComponent } from "./components";

@Component({
  selector: "app-layout",
  imports: [HeaderComponent, RouterOutlet],
  template: `
    <section>
      <app-header />
      <router-outlet />
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutComponent {}
