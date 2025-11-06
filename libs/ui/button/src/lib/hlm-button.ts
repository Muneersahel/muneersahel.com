import { Directive, computed, input, signal } from "@angular/core";
import { BrnButton } from "@spartan-ng/brain/button";
import { hlm } from "@spartan-ng/helm/utils";
import { type VariantProps, cva } from "class-variance-authority";
import type { ClassValue } from "clsx";
import { injectBrnButtonConfig } from "./hlm-button.token";

export const buttonVariants = cva(
  "focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 aria-invalid:border-destructive inline-flex shrink-0 items-center justify-center gap-2 text-base font-medium whitespace-nowrap transition-all outline-none focus-visible:ring-[3px] disabled:pointer-events-none cursor-pointer disabled:opacity-50 [&_ng-icon]:pointer-events-none [&_ng-icon]:shrink-0 [&_ng-icon:not([class*='text-'])]:text-base inline-flex items-center whitespace-nowrap rounded-full font-semibold ring-offset-white transition-colors",
  {
    variants: {
      variant: {
        default: "bg-accent text-primary hover:bg-accent-hover",
        primary: "bg-primary text-white",
        destructive:
          "bg-destructive hover:bg-destructive/90 focus-visible:ring-destructive/20 text-white",
        outline:
          "border border-accent bg-transparent text-accent hover:bg-accent hover:text-primary",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-11 px-6 py-2 has-[>ng-icon]:px-3",
        sm: "h-8 gap-1.5 px-3 has-[>ng-icon]:px-2.5",
        md: "h-12 gao-1 px-2 has-[>ng-icon]:px-1.5",
        lg: "h-10 px-6 has-[>ng-icon]:px-4",
        icon: "size-9",
        "icon-sm": "size-8",
        "icon-lg": "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export type ButtonVariants = VariantProps<typeof buttonVariants>;

@Directive({
  selector: "button[hlmBtn], a[hlmBtn]",
  exportAs: "hlmBtn",
  hostDirectives: [{ directive: BrnButton, inputs: ["disabled"] }],
  host: {
    "data-slot": "button",
    "[class]": "_computedClass()",
  },
})
export class HlmButton {
  private readonly _config = injectBrnButtonConfig();

  private readonly _additionalClasses = signal<ClassValue>("");

  public readonly userClass = input<ClassValue>("", { alias: "class" });

  protected readonly _computedClass = computed(() =>
    hlm(
      buttonVariants({ variant: this.variant(), size: this.size() }),
      this.userClass(),
      this._additionalClasses(),
    ),
  );

  public readonly variant = input<ButtonVariants["variant"]>(
    this._config.variant,
  );

  public readonly size = input<ButtonVariants["size"]>(this._config.size);

  setClass(classes: string): void {
    this._additionalClasses.set(classes);
  }
}
