import { ChangeDetectionStrategy, Component } from "@angular/core";
import { RouterLink, RouterLinkActive, RouterOutlet } from "@angular/router";
import { NgIcon, provideIcons } from "@ng-icons/core";
import {
  lucideFile,
  lucideFileText,
  lucideHouse,
  lucideLayers,
  lucideMail,
  lucidePanelLeft,
} from "@ng-icons/lucide";
import { HlmSidebarImports } from "@spartan-ng/helm/sidebar";

@Component({
  selector: "app-admin-layout",
  imports: [
    RouterOutlet,
    RouterLink,
    HlmSidebarImports,
    NgIcon,
    RouterLinkActive,
  ],
  providers: [
    provideIcons({
      lucideHouse,
      lucideFileText,
      lucidePanelLeft,
      lucideLayers,
      lucideFile,
      lucideMail,
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

        <div hlmSidebarFooter class="px-4 py-4">
          <div class="text-sm text-sidebar-foreground">v1.0.0</div>
        </div>
      </hlm-sidebar>

      <main hlmSidebarInset class="w-full text-gray-700">
        <router-outlet />
      </main>
    </div>
  `,
})
export class AdminLayoutComponent {
  protected readonly _items = [
    { title: "Dashboard", url: "/admin/dashboard", icon: "lucideHouse" },
    { title: "Articles", url: "/admin/articles", icon: "lucideFileText" },
    { title: "Works", url: "/admin/works", icon: "lucideLayers" },
    { title: "CV & Resume", url: "/admin/resume", icon: "lucideFile" },
    { title: "Contacts", url: "/admin/contacts", icon: "lucideMail" },
  ];
}
