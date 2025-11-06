import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  forwardRef,
} from "@angular/core";
import { BrnDialog } from "@spartan-ng/brain/dialog";
import { BrnSheet, BrnSheetOverlay } from "@spartan-ng/brain/sheet";
import { HlmSheetOverlay } from "./hlm-sheet-overlay.directive";

@Component({
  selector: "hlm-sheet",
  imports: [BrnSheetOverlay, HlmSheetOverlay],
  providers: [
    {
      provide: BrnDialog,
      useExisting: forwardRef(() => BrnSheet),
    },
    {
      provide: BrnSheet,
      useExisting: forwardRef(() => HlmSheet),
    },
  ],
  template: `
    <brn-sheet-overlay hlm />
    <ng-content />
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  exportAs: "hlmSheet",
})
export class HlmSheet extends BrnSheet {
  constructor() {
    super();
  }
}
