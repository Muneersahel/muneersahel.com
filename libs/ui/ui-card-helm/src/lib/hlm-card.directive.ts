import { hlm } from "@spartan-ng/helm/utils";
import { Directive, computed, input } from "@angular/core";

import { type VariantProps, cva } from "class-variance-authority";
import type { ClassValue } from "clsx";

export const cardVariants = cva(
  "rounded-lg border border-border bg-card focus:outline-hidden focus:ring-2 focus:ring-ring focus:ring-offset-2 text-card-foreground shadow-xs",
  {
    variants: {},
    defaultVariants: {},
  },
);
export type CardVariants = VariantProps<typeof cardVariants>;

@Directive({
  selector: "[hlmCard]",
  standalone: true,
  host: {
    "[class]": "_computedClass()",
  },
})
export class HlmCard {
  public readonly userClass = input<ClassValue>("", { alias: "class" });
  protected _computedClass = computed(() =>
    hlm(cardVariants(), this.userClass()),
  );
}
