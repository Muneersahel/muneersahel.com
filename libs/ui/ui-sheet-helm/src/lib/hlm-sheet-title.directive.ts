import { hlm } from "@spartan-ng/helm/utils";
import { Directive, computed, input } from "@angular/core";

import { BrnSheetTitle } from "@spartan-ng/brain/sheet";
import type { ClassValue } from "clsx";

@Directive({
  selector: "[hlmSheetTitle]",
  standalone: true,
  host: {
    "[class]": "_computedClass()",
  },
  hostDirectives: [BrnSheetTitle],
})
export class HlmSheetTitle {
  public readonly userClass = input<ClassValue>("", { alias: "class" });
  protected _computedClass = computed(() =>
    hlm("text-lg font-semibold", this.userClass()),
  );
}
