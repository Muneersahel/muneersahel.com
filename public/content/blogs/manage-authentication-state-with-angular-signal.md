---
num: "01"
slug: "manage-authentication-state-with-angular-signal"
title: "Manage Authentication State with Angular Signals"
coverImage: "/images/blogs/angular-authentication.avif"
date: "2024-06-08"
brief: "Discover how to leverage Angular Signals for authentication state management. A modern, lightweight approach that simplifies state handling without external dependencies."
tags: ["angular", "authentication", "signal"]
---

In modern web applications, authentication is a critical aspect of ensuring the security and privacy of users' data. As an Angular developer, managing authentication state effectively is essential. With the introduction of **Angular Signals** in version 16, we now have a powerful, built-in solution for reactive state management.

This guide focuses on using Angular Signals for authentication. If you're looking for a more enterprise-grade solution with time-travel debugging and advanced side-effect management, check out the [companion article on managing authentication with NgRx](/blogs/manage-authentication-state-with-ngrx-in-angular).

<br />

## What are Angular Signals?

[**Angular Signals**](https://angular.dev/guide/signals) are a reactive primitive that granularly tracks how and where your state is used throughout an application, allowing the framework to optimize rendering updates. From the official Angular documentation:

> A signal is a wrapper around a value that can notify interested consumers when that value changes.

Signals provide several benefits for authentication state management:

- **No external dependencies** - Built directly into Angular 16+
- **Fine-grained reactivity** - Only re-renders components that depend on changed values
- **Simplified mental model** - Less boilerplate than Redux-based solutions
- **Better TypeScript inference** - Full type safety out of the box
- **Excellent performance** - Optimized change detection

<br />

## Building an Authentication Service with Signals

Signals come built-in with Angular 16 and above, requiring no additional package installations. Let's build a complete authentication service step by step.

### Step 1: Define the Authentication State

First, create an authentication service that handles all auth logic. We'll define a clear type for the authentication state and use signals to make it reactive.

<br />

```typescript
import { Injectable, signal, computed, effect, inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";

type User = {
  id: string;
  email: string;
  name: string;
};

type AuthState = {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
};

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);
  private destroyRef = inject(DestroyRef);

  // Private state signal - the single source of truth
  private _state = signal<AuthState>({
    user: null,
    token: null,
    isAuthenticated: false,
    loading: false,
    error: null,
  });

  // Public computed signals - derived state that components can consume
  user = computed(() => this._state().user);
  token = computed(() => this._state().token);
  isAuthenticated = computed(() => this._state().isAuthenticated);
  loading = computed(() => this._state().loading);
  error = computed(() => this._state().error);
}
```

<br />

**Key Points:**

- The private `_state` signal holds all authentication data
- Public `computed` signals expose specific slices of state
- Components can reactively consume these signals
- The `loading` and `error` states enable better UX

<br />

### Step 2: Persist Authentication with Local Storage

To maintain authentication across page refreshes, we'll integrate local storage with signals using the powerful `effect` API.

<br />

```typescript
export class AuthService {
  private readonly ACCESS_TOKEN_KEY = "accessToken";

  // Initialize state from local storage
  private _storedToken = typeof window !== "undefined" ? localStorage.getItem(this.ACCESS_TOKEN_KEY) : null;

  private _state = signal<AuthState>({
    user: null,
    token: this._storedToken,
    isAuthenticated: this._storedToken !== null,
    loading: false,
    error: null,
  });

  // ... computed signals ...

  constructor() {
    // Automatically sync token changes to local storage
    effect(() => {
      const token = this.token();
      if (typeof window === "undefined") return; // SSR check

      if (token) {
        localStorage.setItem(this.ACCESS_TOKEN_KEY, token);
      } else {
        localStorage.removeItem(this.ACCESS_TOKEN_KEY);
      }
    });

    // Load user data if token exists
    if (this._storedToken) {
      this.loadUserProfile();
    }
  }

  private loadUserProfile(): void {
    this.http
      .get<User>("/api/auth/me")
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (user) => {
          this._state.update((state) => ({
            ...state,
            user,
            isAuthenticated: true,
          }));
        },
        error: () => {
          // Token is invalid, clear auth state
          this.logout();
        },
      });
  }
}
```

<br />

**Important Considerations:**

- **SSR Safety**: Check for `window` object availability
- **Token Validation**: Load user profile to verify token validity
- **Auto-sync**: `effect()` automatically updates local storage when token changes
- **Error Handling**: Invalid tokens trigger automatic logout

<br />

### Step 3: Implement Login and Logout Methods

Now let's add the core authentication methods. We'll use signal mutations to update state efficiently.

<br />

```typescript
type LoginPayload = {
  email: string;
  password: string;
};

type AuthResponse = {
  user: User;
  token: string;
};

export class AuthService {
  // ... previous code ...

  login(payload: LoginPayload): void {
    // Set loading state
    this._state.update((state) => ({ ...state, loading: true, error: null }));

    this.http
      .post<AuthResponse>("/api/auth/login", payload)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (response) => {
          // Update state with successful login
          this._state.set({
            user: response.user,
            token: response.token,
            isAuthenticated: true,
            loading: false,
            error: null,
          });

          this.router.navigate(["/dashboard"]);
        },
        error: (error) => {
          // Update state with error
          this._state.update((state) => ({
            ...state,
            loading: false,
            error: error.error?.message || "Login failed. Please try again.",
          }));
        },
      });
  }

  logout(): void {
    // Clear all authentication state
    this._state.set({
      user: null,
      token: null,
      isAuthenticated: false,
      loading: false,
      error: null,
    });

    this.router.navigate(["/login"]);
  }

  clearError(): void {
    this._state.update((state) => ({ ...state, error: null }));
  }
}
```

<br />

**Signal Update Patterns:**

- `update()` - Partial updates, good for modifying specific properties
- `set()` - Complete replacement, good for resetting entire state
- `mutate()` - Direct mutation (use sparingly, breaks immutability)

<br />

### Step 4: Using Signals in Components

With signals, your components become incredibly simple and reactive. Here's how to use the auth service in a login component:

<br />

```typescript
import { Component, inject, signal } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { AuthService } from "./auth.service";

@Component({
  selector: "app-login",
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="login-container">
      <h2>Login</h2>

      @if (authService.error()) {
        <div class="error-message">
          {{ authService.error() }}
          <button (click)="authService.clearError()">×</button>
        </div>
      }

      <form (ngSubmit)="onSubmit()">
        <input type="email" [(ngModel)]="email()" name="email" placeholder="Email" required />

        <input type="password" [(ngModel)]="password()" name="password" placeholder="Password" required />

        <button type="submit" [disabled]="authService.loading()">
          @if (authService.loading()) {
            Logging in...
          } @else {
            Login
          }
        </button>
      </form>
    </div>
  `,
})
export class LoginComponent {
  authService = inject(AuthService);

  email = signal("");
  password = signal("");

  onSubmit(): void {
    this.authService.login({
      email: this.email(),
      password: this.password(),
    });
  }
}
```

<br />

**Component Benefits:**

- Direct signal access - no need for `async` pipe or subscriptions
- Automatic reactivity - UI updates when signals change
- Clean template syntax - using `()` to read signal values
- No manual cleanup - signals don't require unsubscribe

<br />

### Step 5: Route Protection with Signal-Based Guards

Create a guard that uses signals to protect routes:

<br />

```typescript
import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "./auth.service";

export const authGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAuthenticated()) {
    return true;
  }

  return router.createUrlTree(["/login"]);
};

// In your routes configuration:
const routes: Routes = [
  {
    path: "dashboard",
    canActivate: [authGuard],
    loadComponent: () => import("./dashboard/dashboard.component"),
  },
];
```

<br />

## When to Choose Signals vs NgRx

Angular Signals are excellent for most authentication scenarios, especially when:

✅ **You want simplicity** - Less boilerplate, easier to understand  
✅ **Your app is small to medium-sized** - Signals scale well for most applications  
✅ **You prefer built-in solutions** - No external dependencies needed  
✅ **Team familiarity matters** - Easier onboarding for new Angular developers  
✅ **Performance is critical** - Fine-grained reactivity with minimal overhead

However, consider **[NgRx for authentication](/blogs/manage-authentication-state-with-ngrx-in-angular)** if you need:

❌ **Time-travel debugging** - Redux DevTools integration  
❌ **Complex state interactions** - Multiple stores with cross-cutting concerns  
❌ **Strict unidirectional data flow** - Enforced architecture patterns  
❌ **Advanced middleware** - Custom effects and meta-reducers  
❌ **Team standardization** - Your team already uses NgRx ecosystem

<br />

## Best Practices

### 1. Keep State Private

Always use a private signal for your state and expose only computed signals:

```typescript
// ✅ Good
private _state = signal<AuthState>({ ... });
user = computed(() => this._state().user);

// ❌ Bad
state = signal<AuthState>({ ... }); // Direct access allows mutations
```

### 2. Use Computed for Derived Values

Leverage computed signals for derived state instead of duplicating values:

```typescript
// ✅ Good
isGuest = computed(() => this.user() === null);
userDisplayName = computed(() => this.user()?.name || 'Guest');

// ❌ Bad - Storing derived values in state
private _state = signal<AuthState>({
  user: null,
  isGuest: true, // Redundant!
});
```

### 3. Handle SSR Gracefully

Always check for browser-only APIs:

```typescript
// ✅ Good
private getStoredToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(this.ACCESS_TOKEN_KEY);
}

// ❌ Bad
private token = localStorage.getItem('token'); // Breaks in SSR
```

### 4. Implement Proper Error Handling

Always include error states and clear mechanisms:

```typescript
this._state.update((state) => ({
  ...state,
  loading: false,
  error: error.error?.message || "An unexpected error occurred",
}));
```

<br />

## Conclusion

Angular Signals provide a modern, performant, and developer-friendly approach to managing authentication state. Since their introduction in Angular 16, signals have become my preferred method for state management in most Angular applications. They eliminate the complexity of external state management libraries while providing excellent reactivity and TypeScript support.

The built-in nature of signals, combined with their fine-grained reactivity and minimal boilerplate, makes them ideal for authentication flows. You get type safety, automatic cleanup, and a straightforward API that integrates seamlessly with Angular's ecosystem.

**Ready for more?** Check out the [companion guide on managing authentication with NgRx](/blogs/manage-authentication-state-with-ngrx-in-angular) to understand when a Redux-based approach might better suit your needs. Both approaches are valid—choose based on your project's requirements and team expertise.

<br />

## References

- [Angular Signals Official Guide](https://angular.dev/guide/signals)
- [Angular Signals API Documentation](https://angular.dev/api/core/signal)
- [Angular Effects Documentation](https://angular.dev/guide/signals#effects)
- [takeUntilDestroyed Operator](https://angular.dev/api/core/rxjs-interop/takeUntilDestroyed)

<br />

## Let's Connect

Found this helpful? Have questions or suggestions? I'd love to hear from you!

- **Twitter/X**: [@Muneersahel](https://twitter.com/Muneersahel)
- **LinkedIn**: [linkedin.com/in/muneersahel](https://www.linkedin.com/in/muneersahel/)
- **GitHub**: [Muneersahel](https://github.com/Muneersahel)
