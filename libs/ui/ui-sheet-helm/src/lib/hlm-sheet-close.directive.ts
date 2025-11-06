import { hlm } from "@spartan-ng/helm/utils";
import { Directive, computed, input } from "@angular/core";

import type { ClassValue } from "clsx";

@Directive({
  selector: "[hlmSheetClose],[brnSheetClose][hlm]",
  standalone: true,
  host: {
    "[class]": "_computedClass()",
  },
})
export class HlmSheetClose {
  public readonly userClass = input<ClassValue>("", { alias: "class" });
  protected _computedClass = computed(() =>
    hlm(
      "absolute right-8 top-8 transition-opacity outline-hidden",
      this.userClass(),
    ),
  );
}
