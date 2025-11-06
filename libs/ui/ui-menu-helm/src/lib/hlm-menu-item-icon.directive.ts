import { hlm } from "@spartan-ng/helm/utils";
import { Directive, computed, inject, input } from "@angular/core";

import { HlmIcon } from "@spartan-ng/helm/icon";
import type { ClassValue } from "clsx";

@Directive({
  selector: "[hlmMenuIcon]",
  standalone: true,
  host: {
    "[class]": "_computedClass()",
  },
})
export class HlmMenuItemIcon {
  private _menuIcon = inject(HlmIcon, { host: true, optional: true });

  constructor() {
    if (!this._menuIcon) return;
    this._menuIcon.size = "none";
  }

  public readonly userClass = input<ClassValue>("", { alias: "class" });
  protected _computedClass = computed(() =>
    hlm("mr-2 h-4 w-4", this.userClass()),
  );
}
