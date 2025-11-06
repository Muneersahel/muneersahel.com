import { NgModule } from "@angular/core";
import { HlmHoverCardContent } from "./lib/hlm-hover-card-content.component";

export { HlmHoverCardContent } from "./lib/hlm-hover-card-content.component";

export const HlmHoverCardImports = [HlmHoverCardContent] as const;

@NgModule({
  imports: [...HlmHoverCardImports],
  exports: [...HlmHoverCardImports],
})
export class HlmHoverCardModule {}
