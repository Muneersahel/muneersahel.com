import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
  selector: "app-admin-resume",
  standalone: true,
  template: `
    <section class="p-6">
      <h2 class="text-2xl font-bold">CV & Resume (Admin)</h2>
      <p class="text-muted mt-2">Manage resume content here.</p>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class AdminResumeComponent {}
