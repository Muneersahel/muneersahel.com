import { NgClass } from "@angular/common";
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  resource,
} from "@angular/core";
import { getYear } from "date-fns";

import { CountUpDirective } from "@/shared/directives";

@Component({
  selector: "app-stats",
  imports: [CountUpDirective, NgClass],
  template: `
    <section class="pt-4 pb-12 xl:pt-0 xl:pb-0">
      <div class="container">
        <div class="flex flex-wrap gap-6 max-w-[80vw] mx-auto xl:max-w-none">
          @for (item of stats(); track item.label) {
            <div
              class="flex-1 flex gap-4 items-center justify-center xl:justify-start "
            >
              @if (item.countUp) {
                <span
                  class="text-4xl font-extrabold xl:text-6xl"
                  [countUp]="item.num"
                  [duration]="3000"
                >
                  {{ item.num }}
                </span>
              } @else {
                <span class="text-4xl font-extrabold xl:text-6xl">
                  {{ item.num }}
                </span>
              }

              <p
                class="text-white/80 text-lg leading-snug"
                [ngClass]="{
                  'max-w-[100px]': item.label.length < 15,
                  'max-w-[150px]': item.label.length >= 15,
                }"
              >
                {{ item.label }}
              </p>
            </div>
          }
        </div>
      </div>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatsComponent {
  commits = resource({
    loader: async () => {
      const res = await fetch(
        "https://api.github.com/search/commits?q=author:muneersahel+committer-date:2019-01-01..2025-12-31",
      );
      const data = await res.json();
      return data.total_count;
    },
  });

  stats = computed(() => {
    return [
      {
        num: getYear(new Date()) - 2019,
        label: "Years of experience",
        countUp: true,
      },
      { num: 5, label: "Projects completed", countUp: true },
      { num: "20+", label: "Technology mastered", countUp: false },
      {
        num: this.commits.isLoading() ? 0 : this.commits.value(),
        label: "Code commits",
        countUp: true,
      },
    ];
  });
}
