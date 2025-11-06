import { NgModule } from "@angular/core";
import { HlmSkeleton } from "./lib/hlm-skeleton.component";

export * from "./lib/hlm-skeleton.component";

@NgModule({
  imports: [HlmSkeleton],
  exports: [HlmSkeleton],
})
export class HlmSkeletonModule {}
