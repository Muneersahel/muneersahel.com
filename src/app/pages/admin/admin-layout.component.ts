import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { Auth, signOut } from "@angular/fire/auth";
import {
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from "@angular/router";
import { NgIcon, provideIcons } from "@ng-icons/core";
import {
  lucideFile,
  lucideFileText,
  lucideHouse,
  lucideLayers,
  lucideLogOut,
  lucideMail,
  lucidePanelLeft,
} from "@ng-icons/lucide";
import { HlmButton } from "@spartan-ng/helm/button";
import { HlmSidebarImports } from "@spartan-ng/helm/sidebar";
import { toast } from "ngx-sonner";

@Component({
  selector: "app-admin-layout",
  imports: [
    RouterOutlet,
    RouterLink,
    HlmSidebarImports,
    NgIcon,
    RouterLinkActive,
    HlmButton,
  ],
  providers: [
    provideIcons({
      lucideHouse,
      lucideFileText,
      lucidePanelLeft,
      lucideLayers,
      lucideFile,
      lucideMail,
      lucideLogOut,
    }),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div hlmSidebarWrapper>
      <hlm-sidebar>
        <div hlmSidebarHeader class="px-4 py-6">
          <a routerLink="/admin/dashboard" class="text-xl font-semibold">
            Admin<span class="text-accent">.</span>
          </a>
        </div>

        <div hlmSidebarContent>
          <div hlmSidebarGroup>
            <div hlmSidebarGroupLabel>Main</div>
            <div hlmSidebarGroupContent>
              <ul hlmSidebarMenu>
                @for (item of _items; track item.title) {
                  <li hlmSidebarMenuItem>
                    <a
                      hlmSidebarMenuButton
                      [routerLink]="[item.url]"
                      routerLinkActive
                      [routerLinkActiveOptions]="{ exact: true }"
                      #rla="routerLinkActive"
                      [isActive]="rla.isActive"
                    >
                      <ng-icon hlm [name]="item.icon"></ng-icon>
                      <span>{{ item.title }}</span>
                    </a>
                  </li>
                }
              </ul>
            </div>
          </div>
        </div>

        <div hlmSidebarFooter class="px-4 py-4 space-y-3">
          <button
            hlmBtn
            variant="outline"
            class="w-full flex items-center justify-center gap-2"
            (click)="logout()"
          >
            <ng-icon hlm name="lucideLogOut" class="w-4 h-4" />
            <span>Logout</span>
          </button>
          <div class="text-sm text-sidebar-foreground text-center">v1.0.0</div>
        </div>
      </hlm-sidebar>

      <main hlmSidebarInset class="w-full text-gray-700">
        <router-outlet />
      </main>
    </div>
  `,
})
export class AdminLayoutComponent {
  private auth = inject(Auth);
  private router = inject(Router);

  protected readonly _items = [
    { title: "Dashboard", url: "/admin/dashboard", icon: "lucideHouse" },
    { title: "Articles", url: "/admin/articles", icon: "lucideFileText" },
    { title: "Works", url: "/admin/works", icon: "lucideLayers" },
    { title: "CV & Resume", url: "/admin/resume", icon: "lucideFile" },
    { title: "Contacts", url: "/admin/contacts", icon: "lucideMail" },
  ];

  async logout() {
    try {
      await signOut(this.auth);
      toast.success("Logged out successfully");
      this.router.navigate(["/login"]);
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Failed to logout. Please try again.");
    }
  }
}
