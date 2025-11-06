import { Directive, computed, input } from "@angular/core";
import { hlm } from "@spartan-ng/brain/core";
import type { ClassValue } from "clsx";

@Directive({
  selector: "brn-toggle-group[hlm],[hlmToggleGroup]",
  standalone: true,
  host: {
    "[class]": "_computedClass()",
  },
})
export class HlmToggleGroupDirective {
  public readonly userClass = input<ClassValue>("", { alias: "class" });
  protected _computedClass = computed(() =>
    hlm(
      'inline-flex items-center rounded-md [&>[hlm][brnToggle][variant="outline"]]:-mx-[0.5px] [&>[hlm][brnToggle]]:rounded-none [&>[hlm][brnToggle]]:focus:z-10 [&>[hlm][brnToggle]]:first-of-type:rounded-l-md [&>[hlm][brnToggle]]:last-of-type:rounded-r-md',
      this.userClass(),
    ),
  );
}
