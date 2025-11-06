import { Routes } from "@angular/router";

import { authGuard } from "@/guards/auth.guard";
import { publicGuard } from "@/guards/public.guard";
import { LayoutComponent } from "@/layout/layout.component";
import { AdminLayoutComponent } from "@/pages/admin/admin-layout.component";
import { HomeComponent } from "@/pages/home";

export const appRoutes: Routes = [
  {
    path: "",
    component: LayoutComponent,
    canActivate: [publicGuard],
    children: [
      { path: "", component: HomeComponent },
      {
        path: "services",
        loadComponent: () => import("@/pages/services/services.component"),
      },
      {
        path: "resume",
        loadComponent: () => import("@/pages/resume/resume.component"),
      },
      {
        path: "works",
        loadComponent: () => import("@/pages/works/works.component"),
      },
      {
        path: "contact",
        loadComponent: () => import("./pages/contact/contact.component"),
      },
      {
        path: "blogs",
        children: [
          {
            path: "",
            loadComponent: () => import("./pages/blogs/blogs.component"),
          },
          {
            path: ":slug",
            loadComponent: () =>
              import(
                "./pages/blogs/components/single-blog/single-blog.component"
              ),
          },
        ],
      },
      {
        path: "login",
        loadComponent: () =>
          import("./pages/login/login.component").then((m) => m.LoginComponent),
      },
    ],
  },
  {
    path: "admin",
    canActivate: [authGuard],
    component: AdminLayoutComponent,
    loadChildren: () =>
      import("./pages/admin/admin.routes").then((m) => m.routes),
  },
  { path: "**", redirectTo: "", pathMatch: "full" },
];
