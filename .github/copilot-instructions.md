# Copilot Instructions for muneersahel.com

This is a modern, server-side rendered portfolio and blog website built with Angular 20, using Nx for monorepo management and Spartan UI for components.

## Core Architecture & Principles

- **Framework**: Angular 20 with standalone components only
- **Monorepo**: Nx workspace with UI component libraries
- **UI Framework**: [Spartan UI](https://spartan.ng) with Tailwind CSS
- **SSR**: Angular Universal with Express
- **Content**: Markdown-based blog with frontmatter
- **State**: Signal-based management
- **Theme**: Dark mode only
- **Analytics**: Firebase integration

## Angular Guidelines

### Component Development

- Use `inject()` method instead of constructor DI
- Maximum 200 lines per component
- Always use Control Flow (`@if`/`@for`) over `*ngIf`/`*ngFor`
- Use signal inputs/outputs over `@Input`/`@Output`
- Standalone components by default (no `standalone: true` needed)
- Import RxJS operators directly from 'rxjs'

### State & Data Management

- Prefer signals over traditional observables
- Use `@ngrx/signals` store for shared state
- Services for HTTP requests
- Use async pipe over manual subscriptions
- Template-driven forms preferred over reactive forms

Example signal store:

```typescript
@Injectable({ providedIn: "root" })
export class BlogStore {
  private _blogs = signal<Blog[]>([]);
  blogs = computed(() => this._blogs());

  constructor(private blogService: BlogService) {
    this.loadBlogs();
  }
}
```

### Styling & UI

- Use Tailwind CSS utilities
- Dark mode styling required
- Follow Spartan UI design system
- Ensure accessibility compliance
- Modern UI components from @spartan-ng

Example component:

```typescript
@Component({
  selector: "app-blog-card",
  imports: [HlmCardDirective, HlmButtonDirective],
  template: `
    <div hlmCard class="bg-white/5 rounded-lg p-6 hover:bg-white/10">
      <h2 class="text-2xl font-bold text-white">{{ blog().title }}</h2>
      @if (blog().brief) {
        <p class="text-white/60">{{ blog().brief }}</p>
      }
    </div>
  `,
})
export class BlogCardComponent {
  blog = input.required<Blog>();
}
```

## Project Structure

- `/src/app/`
  - `/pages/` - Page components
  - `/layout/` - Layout components
  - `/shared/` - Shared utilities
- `/libs/ui/` - Spartan UI components
- `/public/content/` - Blog content
- `/public/images/` - Asset storage

## Blog System

Blog posts use frontmatter for metadata:

```markdown
---
num: "01"
slug: "manage-authentication-state-with-angular-signal"
title: "Managing Auth State with Signals"
date: "2024-06-01"
brief: "Learn signal-based auth state management"
tags: ["angular", "authentication", "signals"]
---

Content here...
```

## Development Workflow

1. **New Features**

   ```bash
   nx generate component pages/new-feature
   ```

2. **Running Locally**

   ```bash
   nx serve  # Development
   nx build  # Production build with SSR
   ```

3. **Testing**
   ```bash
   nx test    # Unit tests
   nx e2e     # E2E tests
   ```

## Common Patterns

### HTTP Requests

```typescript
@Injectable({ providedIn: "root" })
export class DataService {
  private http = inject(HttpClient);

  getData() {
    return this.http.get<Data[]>("/api/data").pipe(
      catchError((error) => {
        console.error(error);
        return EMPTY;
      }),
    );
  }
}
```

### Component Template

```typescript
@Component({
  template: `
    @if (data$ | async; as data) {
      <hlm-card>
        <h3 hlmCardTitle>{{data.title}}</h3>
        <p hlmCardDescription>{{data.description}}</p>
      </hlm-card>
    }
  `
})
```

## Key Integration Points

1. **Firebase**

   - Analytics tracking
   - Firestore (planned)
   - Authentication (planned)

2. **Markdown Processing**

   - Custom frontmatter parsing
   - Syntax highlighting
   - Cross-referencing between posts

3. **SEO & Performance**
   - SSR optimization
   - Meta tag management
   - Image optimization
