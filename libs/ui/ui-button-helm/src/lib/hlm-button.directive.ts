import { Directive, Input, computed, input, signal } from "@angular/core";
import { hlm } from "@spartan-ng/helm/utils";

import { cva, type VariantProps } from "class-variance-authority";
import type { ClassValue } from "clsx";

export const buttonVariants = cva(
  "inline-flex items-center whitespace-nowrap rounded-full font-semibold ring-offset-white transition-colors",
  {
    variants: {
      variant: {
        default: "bg-accent text-primary hover:bg-accent-hover",
        primary: "bg-primary text-white",
        outline:
          "border border-accent bg-transparent text-accent hover:bg-accent hover:text-primary",
      },
      size: {
        default: "h-11 px-6",
        md: "h-12 px-6",
        lg: "h-14 px-8 text-sm uppercase tracking-[2px]",
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
  selector: "[hlmBtn]",
  standalone: true,
  host: {
    "[class]": "_computedClass()",
  },
})
export class HlmButton {
  public readonly userClass = input<ClassValue>("", { alias: "class" });
  private readonly _settableClass = signal<ClassValue>("");

  protected _computedClass = computed(() =>
    hlm(
      buttonVariants({ variant: this._variant(), size: this._size() }),
      this._settableClass(),
      this.userClass(),
    ),
  );

  setClass(value: ClassValue) {
    this._settableClass.set(value);
  }

  private readonly _variant = signal<ButtonVariants["variant"]>("default");
  @Input()
  set variant(variant: ButtonVariants["variant"]) {
    this._variant.set(variant);
  }

  private readonly _size = signal<ButtonVariants["size"]>("default");
  @Input()
  set size(size: ButtonVariants["size"]) {
    this._size.set(size);
  }
}
