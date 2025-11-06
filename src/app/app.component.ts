import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { NgxSonnerToaster } from "ngx-sonner";

@Component({
  selector: "app-root",
  imports: [RouterOutlet, NgxSonnerToaster],
  template: `
    <ngx-sonner-toaster [closeButton]="true" [richColors]="true" />
    <router-outlet />
  `,
})
export class AppComponent {}
