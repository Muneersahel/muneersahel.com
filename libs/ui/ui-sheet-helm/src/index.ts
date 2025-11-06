import { NgModule } from "@angular/core";

import { HlmSheetClose } from "./lib/hlm-sheet-close.directive";
import { HlmSheetContent } from "./lib/hlm-sheet-content.component";
import { HlmSheetDescription } from "./lib/hlm-sheet-description.directive";
import { HlmSheetFooter } from "./lib/hlm-sheet-footer.component";
import { HlmSheetHeader } from "./lib/hlm-sheet-header.component";
import { HlmSheetOverlay } from "./lib/hlm-sheet-overlay.directive";
import { HlmSheetTitle } from "./lib/hlm-sheet-title.directive";
import { HlmSheet } from "./lib/hlm-sheet.component";

export * from "./lib/hlm-sheet-close.directive";
export * from "./lib/hlm-sheet-content.component";
export * from "./lib/hlm-sheet-description.directive";
export * from "./lib/hlm-sheet-footer.component";
export * from "./lib/hlm-sheet-header.component";
export * from "./lib/hlm-sheet-overlay.directive";
export * from "./lib/hlm-sheet-title.directive";
export * from "./lib/hlm-sheet.component";

export const HlmSheetImports = [
  HlmSheet,
  HlmSheetClose,
  HlmSheetContent,
  HlmSheetDescription,
  HlmSheetFooter,
  HlmSheetHeader,
  HlmSheetOverlay,
  HlmSheetTitle,
] as const;

@NgModule({
  imports: [...HlmSheetImports],
  exports: [...HlmSheetImports],
})
export class HlmSheetModule {}
