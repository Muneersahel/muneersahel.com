import { hlm } from "@spartan-ng/helm/utils";
import { Component, computed, input } from "@angular/core";

import type { ClassValue } from "clsx";

@Component({
  selector: "hlm-skeleton",
  standalone: true,
  template: "",
  host: {
    "[class]": "_computedClass()",
  },
})
export class HlmSkeleton {
  public readonly userClass = input<ClassValue>("", { alias: "class" });
  protected _computedClass = computed(() =>
    hlm("block animate-pulse rounded-md bg-muted", this.userClass()),
  );
}
