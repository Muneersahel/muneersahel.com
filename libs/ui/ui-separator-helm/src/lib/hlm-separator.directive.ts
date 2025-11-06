import { hlm } from "@spartan-ng/helm/utils";
import { Directive, computed, input } from "@angular/core";

import type { ClassValue } from "clsx";

export type HlmSeparatorOrientation = "horizontal" | "vertical";
@Directive({
  selector: "[hlmSeparator],brn-separator[hlm]",
  standalone: true,
  host: {
    "[class]": "_computedClass()",
  },
})
export class HlmSeparator {
  public readonly orientation = input<HlmSeparatorOrientation>("horizontal");
  public readonly userClass = input<ClassValue>("", { alias: "class" });
  protected _computedClass = computed(() =>
    hlm(
      "inline-flex shrink-0 border-0 bg-border",
      this.orientation() === "horizontal" ? "h-px w-full" : "h-full w-px",
      this.userClass(),
    ),
  );
}
