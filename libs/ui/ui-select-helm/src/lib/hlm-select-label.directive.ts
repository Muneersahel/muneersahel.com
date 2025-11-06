import { hlm } from "@spartan-ng/helm/utils";
import {
  Directive,
  type OnInit,
  computed,
  inject,
  input,
  signal,
} from "@angular/core";

import { BrnSelectLabel } from "@spartan-ng/brain/select";
import type { ClassValue } from "clsx";
import { HlmSelectContent } from "./hlm-select-content.directive";

@Directive({
  selector: "[hlmSelectLabel], hlm-select-label",
  hostDirectives: [BrnSelectLabel],
  standalone: true,
  host: {
    "[class]": "_computedClass()",
  },
})
export class HlmSelectLabel implements OnInit {
  private readonly selectContent = inject(HlmSelectContent);
  private readonly _stickyLabels = signal(false);
  public readonly userClass = input<ClassValue>("", { alias: "class" });
  protected _computedClass = computed(() =>
    hlm(
      "pl-8 pr-2 text-sm font-semibold rtl:pl-2 rtl:pr-8",
      this._stickyLabels() ? "sticky top-0 bg-popover block z-2" : "",
      this.userClass(),
    ),
  );

  ngOnInit(): void {
    if (this.selectContent.stickyLabels) {
      this._stickyLabels.set(true);
    }
  }
}
