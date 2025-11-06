import { NgIcon } from "@ng-icons/core";
import { NgModule } from "@angular/core";
import { provideIcons as provideIconsImport } from "@ng-icons/core";
import { HlmIconDirective } from "./lib/hlm-icon.component";

export * from "./lib/hlm-icon.component";

export const provideIcons = provideIconsImport;

@NgModule({
  imports: [NgIcon, HlmIconDirective],
  exports: [HlmIconDirective],
})
export class HlmIconModule {}
