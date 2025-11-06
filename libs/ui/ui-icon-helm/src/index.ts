import { NgModule } from "@angular/core";
import { NgIcon, provideIcons as provideIconsImport } from "@ng-icons/core";
import { HlmIcon } from "./lib/hlm-icon.component";

export * from "./lib/hlm-icon.component";

export const provideIcons = provideIconsImport;

@NgModule({
  imports: [NgIcon, HlmIcon],
  exports: [HlmIcon],
})
export class HlmIconModule {}
