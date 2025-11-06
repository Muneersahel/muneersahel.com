import { hlm } from "@spartan-ng/helm/utils";
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  computed,
  inject,
  input,
} from "@angular/core";
import { NgIcon, provideIcons } from "@ng-icons/core";
import { lucideCheck } from "@ng-icons/lucide";

import { BrnSelectOption } from "@spartan-ng/brain/select";
import { HlmIcon } from "@spartan-ng/helm/icon";
import type { ClassValue } from "clsx";

@Component({
  selector: "hlm-option",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  hostDirectives: [BrnSelectOption],
  providers: [provideIcons({ lucideCheck })],
  host: {
    "[class]": "_computedClass()",
  },
  template: `
    <ng-content />
    <span
      [attr.dir]="_brnSelectOption.dir()"
      class="absolute left-2 flex h-3.5 w-3.5 items-center justify-center rtl:left-auto rtl:right-2"
      [attr.data-state]="this._brnSelectOption.checkedState()"
    >
      @if (this._brnSelectOption.selected()) {
        <ng-icon hlm aria-hidden="true" name="lucideCheck" />
      }
    </span>
  `,
  imports: [NgIcon, HlmIcon],
})
export class HlmSelectOption {
  protected readonly _brnSelectOption = inject(BrnSelectOption, {
    host: true,
  });
  public readonly userClass = input<ClassValue>("", { alias: "class" });
  protected readonly _computedClass = computed(() =>
    hlm(
      "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2  rtl:flex-reverse rtl:pr-8 rtl:pl-2 text-sm outline-hidden data-disabled:pointer-events-none data-disabled:opacity-50 data-[active]:bg-accent data-[active]:text-accent-foreground",
      this.userClass(),
    ),
  );

  @Input()
  set value(value: unknown | null) {
    this._brnSelectOption.value = value;
  }

  @Input()
  public disabled = false;
}
