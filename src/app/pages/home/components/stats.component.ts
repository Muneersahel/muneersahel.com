import { CountUpDirective } from '@/shared/directives';
import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'app-stats',
    imports: [CountUpDirective, NgClass],
    template: `
    <section class="pt-4 pb-12 xl:pt-0 xl:pb-0">
      <div class="container">
        <div class="flex flex-wrap gap-6 max-w-[80vw] mx-auto xl:max-w-none">
          @for (item of stats; track item.label) {
            <div
              class="flex-1 flex gap-4 items-center justify-center xl:justify-start "
            >
              <span
                class="text-4xl font-extrabold xl:text-6xl"
                [countUp]="item.num"
                [duration]="3000"
              >
                {{ item.num }}
              </span>
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
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class StatsComponent {
  stats = [
    { num: 12, label: 'Years of experience' },
    { num: 5, label: 'Projects completed' },
    { num: 3, label: 'Technology mastered' },
    { num: 5, label: 'Code commits' },
  ];
}
