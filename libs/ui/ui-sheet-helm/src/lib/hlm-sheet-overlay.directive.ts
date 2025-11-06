import { injectCustomClassSettable } from "@spartan-ng/brain/core";
import { hlm } from "@spartan-ng/helm/utils";
import { Directive, computed, effect, input } from "@angular/core";

import type { ClassValue } from "clsx";

@Directive({
  selector: "[hlmSheetOverlay],brn-sheet-overlay[hlm]",
  standalone: true,
  host: {
    "[class]": "_computedClass()",
  },
})
export class HlmSheetOverlay {
  private _classSettable = injectCustomClassSettable({
    optional: true,
    host: true,
  });
  public readonly userClass = input<ClassValue>("", { alias: "class" });
  protected _computedClass = computed(() =>
    hlm(
      "bg-background/80 backdrop-blur-xs data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      this.userClass(),
    ),
  );

  constructor() {
    effect(() => {
      this._classSettable?.setClassToCustomElement(this._computedClass());
    });
  }
}
