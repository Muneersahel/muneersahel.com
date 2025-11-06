import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
  selector: "app-admin-works",
  standalone: true,
  template: `
    <section class="p-6">
      <h2 class="text-2xl font-bold">Works (Admin)</h2>
      <p class="text-muted mt-2">Manage portfolio items here.</p>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class AdminWorksComponent {}
