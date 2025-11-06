import { hlm } from "@spartan-ng/helm/utils";
import { Directive, computed, input } from "@angular/core";

import { type VariantProps, cva } from "class-variance-authority";
import type { ClassValue } from "clsx";

export const inputErrorVariants = cva("text-destructive text-sm font-medium", {
  variants: {},
  defaultVariants: {},
});
export type InputErrorVariants = VariantProps<typeof inputErrorVariants>;

@Directive({
  selector: "[hlmInputError]",
  standalone: true,
  host: {
    "[class]": "_computedClass()",
  },
})
export class HlmInputError {
  public readonly userClass = input<ClassValue>("", { alias: "class" });
  protected _computedClass = computed(() =>
    hlm(inputErrorVariants(), this.userClass()),
  );
}
