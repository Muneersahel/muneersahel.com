import {
  Component,
  ContentChild,
  type ElementRef,
  ViewChild,
  computed,
  input,
} from "@angular/core";
import { NgIcon, provideIcons } from "@ng-icons/core";
import { lucideChevronDown } from "@ng-icons/lucide";
import { hlm } from "@spartan-ng/helm/utils";

import { BrnSelectTrigger } from "@spartan-ng/brain/select";
import { HlmIcon } from "@spartan-ng/helm/icon";
import type { ClassValue } from "clsx";

@Component({
  selector: "hlm-select-trigger",
  standalone: true,
  imports: [BrnSelectTrigger, NgIcon],
  providers: [provideIcons({ lucideChevronDown })],
  template: `
    <button [class]="_computedClass()" #button brnSelectTrigger type="button">
      <ng-content />
      @if (icon) {
        <ng-content select="hlm-icon" />
      } @else {
        <ng-icon
          hlm
          size="sm"
          class="flex-none   ml-2"
          name="lucideChevronDown"
        />
      }
    </button>
  `,
})
export class HlmSelectTrigger {
  @ViewChild("button", { static: true })
  public buttonEl!: ElementRef;

  @ContentChild(HlmIcon, { static: false })
  protected icon!: HlmIcon;

  public readonly userClass = input<ClassValue>("", { alias: "class" });
  protected readonly _computedClass = computed(() =>
    hlm(
      "flex h-10 items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-hidden focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 w-[180px]",
      this.userClass(),
    ),
  );
}
