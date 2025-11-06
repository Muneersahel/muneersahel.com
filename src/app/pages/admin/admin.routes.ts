import { Routes } from "@angular/router";

export const routes: Routes = [
  {
    path: "",
    redirectTo: "dashboard",
    pathMatch: "full",
  },
  {
    path: "dashboard",
    loadComponent: () => import("./dashboard/dashboard.component"),
  },
  {
    path: "articles",
    loadComponent: () => import("./articles/articles.component"),
  },
  {
    path: "articles/:slug",
    loadComponent: () => import("./articles/article.component"),
  },
  {
    path: "contacts",
    loadComponent: () => import("./contacts/contacts.component"),
  },
  {
    path: "works",
    loadComponent: () => import("./works/works.component"),
  },
  {
    path: "resume",
    loadComponent: () => import("./resume/resume.component"),
  },
  {
    path: "**",
    redirectTo: "dashboard",
    pathMatch: "full",
  },
];
