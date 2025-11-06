import { hlm } from "@spartan-ng/helm/utils";
import { Component, computed, input } from "@angular/core";

import type { ClassValue } from "clsx";

@Component({
  selector: "hlm-sheet-footer",
  standalone: true,
  template: ` <ng-content /> `,
  host: {
    "[class]": "_computedClass()",
  },
})
export class HlmSheetFooter {
  public readonly userClass = input<ClassValue>("", { alias: "class" });
  protected _computedClass = computed(() =>
    hlm(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      this.userClass(),
    ),
  );
}
