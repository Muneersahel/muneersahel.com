import { NgModule } from "@angular/core";
import { HlmToaster } from "./lib/hlm-toaster.component";

export * from "./lib/hlm-toaster.component";

@NgModule({
  imports: [HlmToaster],
  exports: [HlmToaster],
})
export class HlmToasterModule {}
