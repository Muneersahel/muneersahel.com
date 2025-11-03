---
num: "02"
slug: "manage-authentication-state-with-ngrx-in-angular"
title: "Manage Authentication State with NgRx in Angular"
coverImage: "/images/blogs/angular-authentication.avif"
date: "2024-06-08"
brief: "Master enterprise-grade authentication with NgRx. Learn Redux patterns, time-travel debugging, and advanced state management for scalable Angular applications."
tags: ["angular", "authentication", "ngrx"]
---

In modern web applications, ensuring the security and privacy of user data is paramount. While Angular Signals offer a lightweight solution for state management, **NgRx** provides a robust, battle-tested approach for complex enterprise applications that require strict architectural patterns and advanced debugging capabilities.

This guide focuses on implementing authentication with NgRx. If you're working on a smaller application or prefer a simpler approach with zero external dependencies, check out the [companion article on managing authentication with Angular Signals](/blogs/manage-authentication-state-with-angular-signal).

<br />

## What is NgRx?

**NgRx** is a reactive state management library for Angular applications, inspired by Redux. It provides a predictable, centralized approach to managing application state using the principles of functional programming and immutability.

### Core NgRx Concepts

NgRx is built on four fundamental pillars:

1. **Store** - A single source of truth that holds your application state
2. **Actions** - Events that describe state changes
3. **Reducers** - Pure functions that handle state transitions
4. **Effects** - Side effect management for async operations

### Why Choose NgRx for Authentication?

NgRx excels in scenarios that require:

✅ **Predictable state management** - Strict unidirectional data flow  
✅ **Time-travel debugging** - Redux DevTools integration  
✅ **Testability** - Pure functions are easy to test  
✅ **Scalability** - Proven pattern for large applications  
✅ **Team standardization** - Enforced architectural patterns  
✅ **Rich ecosystem** - Router store, entity management, data persistence

<br />

## Getting Started with NgRx for Authentication

Let's build a complete authentication system using NgRx, following best practices and modern patterns.

### Step 1: Install and Configure NgRx Packages

First, install the necessary NgRx packages:

```bash
npm install @ngrx/store @ngrx/effects @ngrx/store-devtools
```

This installs:

- `@ngrx/store` - Core state management
- `@ngrx/effects` - Side effect handling
- `@ngrx/store-devtools` - Redux DevTools integration (optional but recommended)

<br />

Configure the store in your `app.config.ts`:

```typescript
import { ApplicationConfig } from "@angular/core";
import { provideStore } from "@ngrx/store";
import { provideEffects } from "@ngrx/effects";
import { provideStoreDevtools } from "@ngrx/store-devtools";
import { authReducer } from "./store/auth/auth.reducer";
import { AuthEffects } from "./store/auth/auth.effects";

export const appConfig: ApplicationConfig = {
  providers: [
    provideStore({ auth: authReducer }),
    provideEffects([AuthEffects]),
    provideStoreDevtools({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    }),
  ],
};
```

<br />

### Step 2: Define Authentication State and Actions

Create a clear state interface and comprehensive actions:

```typescript
// auth.state.ts
export interface User {
  id: string;
  email: string;
  name: string;
  roles: string[];
}

export interface AuthState {
  user: User | null;
  token: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

export const initialAuthState: AuthState = {
  user: null,
  token: null,
  refreshToken: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};
```

<br />

```typescript
// auth.actions.ts
import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { User } from "./auth.state";

export const AuthActions = createActionGroup({
  source: "Auth",
  events: {
    // Login Actions
    Login: props<{ email: string; password: string }>(),
    "Login Success": props<{ user: User; token: string; refreshToken: string }>(),
    "Login Failure": props<{ error: string }>(),

    // Logout Actions
    Logout: emptyProps(),
    "Logout Success": emptyProps(),

    // Token Refresh
    "Refresh Token": emptyProps(),
    "Refresh Token Success": props<{ token: string; refreshToken: string }>(),
    "Refresh Token Failure": props<{ error: string }>(),

    // Load User Profile
    "Load User": emptyProps(),
    "Load User Success": props<{ user: User }>(),
    "Load User Failure": props<{ error: string }>(),

    // Clear Error
    "Clear Error": emptyProps(),
  },
});
```

<br />

**Action Group Benefits:**

- Type-safe action creators
- Reduced boilerplate
- Automatic action type generation
- Better IDE autocomplete

<br />

This command installs the @ngrx/store package for managing the store and state, as well as the @ngrx/effects package for handling side effects. Add necessary configuration as described in the [NgRx documentation](https://ngrx.io/guide/store/install).

### Step 3: Create the Authentication Reducer

Reducers are pure functions that define how state changes in response to actions:

```typescript
// auth.reducer.ts
import { createReducer, on } from "@ngrx/store";
import { AuthActions } from "./auth.actions";
import { AuthState, initialAuthState } from "./auth.state";

export const authReducer = createReducer(
  initialAuthState,

  // Login
  on(AuthActions.login, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(AuthActions.loginSuccess, (state, { user, token, refreshToken }) => ({
    ...state,
    user,
    token,
    refreshToken,
    isAuthenticated: true,
    loading: false,
    error: null,
  })),

  on(AuthActions.loginFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Logout
  on(AuthActions.logout, (state) => ({
    ...state,
    loading: true,
  })),

  on(AuthActions.logoutSuccess, () => initialAuthState),

  // Token Refresh
  on(AuthActions.refreshToken, (state) => ({
    ...state,
    loading: true,
  })),

  on(AuthActions.refreshTokenSuccess, (state, { token, refreshToken }) => ({
    ...state,
    token,
    refreshToken,
    loading: false,
    error: null,
  })),

  on(AuthActions.refreshTokenFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
    // Clear auth on refresh failure
    user: null,
    token: null,
    refreshToken: null,
    isAuthenticated: false,
  })),

  // Load User Profile
  on(AuthActions.loadUser, (state) => ({
    ...state,
    loading: true,
  })),

  on(AuthActions.loadUserSuccess, (state, { user }) => ({
    ...state,
    user,
    isAuthenticated: true,
    loading: false,
  })),

  on(AuthActions.loadUserFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Clear Error
  on(AuthActions.clearError, (state) => ({
    ...state,
    error: null,
  })),
);
```

<br />

**Reducer Best Practices:**

- Always return a new state object (immutability)
- Keep reducers pure (no side effects)
- Handle all related actions
- Provide clear state transitions

<br />

### Step 4: Implement Effects for Side Effects

Effects handle asynchronous operations and interactions with external services:

```typescript
// auth.effects.ts
import { Injectable, inject } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { map, exhaustMap, catchError, tap } from "rxjs/operators";
import { AuthService } from "./auth.service";
import { AuthActions } from "./auth.actions";

@Injectable()
export class AuthEffects {
  private actions$ = inject(Actions);
  private authService = inject(AuthService);
  private router = inject(Router);

  // Login Effect
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      exhaustMap(({ email, password }) =>
        this.authService.login(email, password).pipe(
          map(({ user, token, refreshToken }) => AuthActions.loginSuccess({ user, token, refreshToken })),
          catchError((error) =>
            of(
              AuthActions.loginFailure({
                error: error.error?.message || "Login failed",
              }),
            ),
          ),
        ),
      ),
    ),
  );

  // Login Success Effect - Navigate to dashboard
  loginSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.loginSuccess),
        tap(({ token, refreshToken }) => {
          // Persist tokens
          localStorage.setItem("accessToken", token);
          localStorage.setItem("refreshToken", refreshToken);
          // Navigate
          this.router.navigate(["/dashboard"]);
        }),
      ),
    { dispatch: false },
  );

  // Logout Effect
  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.logout),
      exhaustMap(() =>
        this.authService.logout().pipe(
          map(() => AuthActions.logoutSuccess()),
          catchError(() => of(AuthActions.logoutSuccess())), // Logout locally even if API fails
        ),
      ),
    ),
  );

  // Logout Success Effect - Clean up and redirect
  logoutSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.logoutSuccess),
        tap(() => {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          this.router.navigate(["/login"]);
        }),
      ),
    { dispatch: false },
  );

  // Token Refresh Effect
  refreshToken$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.refreshToken),
      exhaustMap(() => {
        const refreshToken = localStorage.getItem("refreshToken");
        if (!refreshToken) {
          return of(AuthActions.refreshTokenFailure({ error: "No refresh token" }));
        }

        return this.authService.refreshToken(refreshToken).pipe(
          map(({ token, refreshToken: newRefreshToken }) => AuthActions.refreshTokenSuccess({ token, refreshToken: newRefreshToken })),
          catchError((error) =>
            of(
              AuthActions.refreshTokenFailure({
                error: error.error?.message || "Token refresh failed",
              }),
            ),
          ),
        );
      }),
    ),
  );

  // Refresh Token Success - Persist new tokens
  refreshTokenSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.refreshTokenSuccess),
        tap(({ token, refreshToken }) => {
          localStorage.setItem("accessToken", token);
          localStorage.setItem("refreshToken", refreshToken);
        }),
      ),
    { dispatch: false },
  );
}
```

<br />

**Effect Operators Explained:**

- `exhaustMap` - Ignores new requests while one is in progress (prevents double-clicks)
- `switchMap` - Cancels previous requests (good for search/autocomplete)
- `concatMap` - Queues requests (maintains order)
- `mergeMap` - Processes requests in parallel

<br />

### Step 5: Create Selectors for State Access

Selectors provide performant, memoized access to state slices:

```typescript
// auth.selectors.ts
import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AuthState } from "./auth.state";

// Feature selector
export const selectAuthState = createFeatureSelector<AuthState>("auth");

// Memoized selectors
export const selectUser = createSelector(selectAuthState, (state) => state.user);

export const selectToken = createSelector(selectAuthState, (state) => state.token);

export const selectIsAuthenticated = createSelector(selectAuthState, (state) => state.isAuthenticated);

export const selectAuthLoading = createSelector(selectAuthState, (state) => state.loading);

export const selectAuthError = createSelector(selectAuthState, (state) => state.error);

// Composed selectors
export const selectUserRoles = createSelector(selectUser, (user) => user?.roles || []);

export const selectHasRole = (role: string) => createSelector(selectUserRoles, (roles) => roles.includes(role));

export const selectIsAdmin = createSelector(selectUserRoles, (roles) => roles.includes("admin"));
```

<br />

**Selector Benefits:**

- **Memoization** - Results cached until inputs change
- **Composability** - Build complex selectors from simple ones
- **Performance** - Reduce unnecessary component re-renders
- **Testability** - Easy to unit test in isolation

<br />

### Step 6: Using NgRx in Components

Now let's see how to use the store in components:

```typescript
// login.component.ts
import { Component, inject } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { Store } from "@ngrx/store";
import { AuthActions } from "./store/auth/auth.actions";
import { selectAuthLoading, selectAuthError } from "./store/auth/auth.selectors";

@Component({
  selector: "app-login",
  standalone: true,
  imports: [FormsModule, AsyncPipe],
  template: `
    <div class="login-container">
      <h2>Login</h2>

      @if (error$ | async; as error) {
        <div class="error-message">
          {{ error }}
          <button (click)="clearError()">×</button>
        </div>
      }

      <form (ngSubmit)="onSubmit()">
        <input type="email" [(ngModel)]="email" name="email" placeholder="Email" required />

        <input type="password" [(ngModel)]="password" name="password" placeholder="Password" required />

        <button type="submit" [disabled]="loading$ | async">
          @if (loading$ | async) {
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
  private store = inject(Store);

  email = "";
  password = "";

  // Select state slices
  loading$ = this.store.select(selectAuthLoading);
  error$ = this.store.select(selectAuthError);

  onSubmit(): void {
    this.store.dispatch(
      AuthActions.login({
        email: this.email,
        password: this.password,
      }),
    );
  }

  clearError(): void {
    this.store.dispatch(AuthActions.clearError());
  }
}
```

<br />

**Component Patterns:**

- Use `async` pipe for automatic subscription management
- Dispatch actions for state changes
- Select specific state slices with selectors
- Keep components focused on presentation

<br />

### Step 7: Route Guards with NgRx

Create guards that leverage NgRx for authorization:

```typescript
// auth.guard.ts
import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { map, take } from "rxjs/operators";
import { selectIsAuthenticated } from "./store/auth/auth.selectors";

export const authGuard = () => {
  const store = inject(Store);
  const router = inject(Router);

  return store.select(selectIsAuthenticated).pipe(
    take(1),
    map((isAuthenticated) => {
      if (isAuthenticated) {
        return true;
      }
      return router.createUrlTree(["/login"]);
    }),
  );
};

// Role-based guard
export const roleGuard = (allowedRoles: string[]) => {
  return () => {
    const store = inject(Store);
    const router = inject(Router);

    return store.select(selectUserRoles).pipe(
      take(1),
      map((userRoles) => {
        const hasRole = allowedRoles.some((role) => userRoles.includes(role));
        if (hasRole) {
          return true;
        }
        return router.createUrlTree(["/unauthorized"]);
      }),
    );
  };
};

// Usage in routes
const routes: Routes = [
  {
    path: "dashboard",
    canActivate: [authGuard],
    loadComponent: () => import("./dashboard/dashboard.component"),
  },
  {
    path: "admin",
    canActivate: [roleGuard(["admin"])],
    loadComponent: () => import("./admin/admin.component"),
  },
];
```

<br />

## NgRx vs Angular Signals: Making the Right Choice

While NgRx provides enterprise-grade state management, it's not always the best choice. Here's when to use each:

### Choose NgRx When:

✅ **Large teams** - Need enforced patterns and standardization  
✅ **Complex state** - Multiple stores with intricate relationships  
✅ **Debugging requirements** - Time-travel debugging is essential  
✅ **Existing NgRx codebase** - Team already familiar with the ecosystem  
✅ **Audit trails** - Need to track every state change  
✅ **Testing infrastructure** - Pure functions simplify testing

### Choose Angular Signals When:

✅ **Smaller applications** - Less complexity, faster development  
✅ **Quick prototypes** - Minimal setup, no external dependencies  
✅ **New to Angular** - Easier learning curve  
✅ **Performance critical** - Fine-grained reactivity  
✅ **Modern Angular apps** - Leveraging latest framework features

**Not sure?** Start with [Angular Signals](/blogs/manage-authentication-state-with-angular-signal) and migrate to NgRx if complexity grows. Signals are built into Angular, making them the lighter starting point.

<br />

## Best Practices for NgRx Authentication

### 1. Use Action Groups

Modern NgRx uses `createActionGroup` for better organization:

```typescript
// ✅ Good - Organized and type-safe
export const AuthActions = createActionGroup({
  source: 'Auth',
  events: { ... }
});

// ❌ Old - Verbose and scattered
export const login = createAction('[Auth] Login');
export const loginSuccess = createAction('[Auth] Login Success');
```

### 2. Leverage Selectors

Always use selectors instead of direct state access:

```typescript
// ✅ Good - Memoized and testable
this.user$ = this.store.select(selectUser);

// ❌ Bad - No memoization
this.store.subscribe((state) => (this.user = state.auth.user));
```

### 3. Handle Loading States

Track loading states for better UX:

```typescript
on(AuthActions.login, (state) => ({
  ...state,
  loading: true,
  error: null, // Clear previous errors
}));
```

### 4. Use Effects for Side Effects Only

Keep reducers pure, put side effects in effects:

```typescript
// ✅ Good - Side effects in effects
loginSuccess$ = createEffect(
  () =>
    this.actions$.pipe(
      ofType(AuthActions.loginSuccess),
      tap(({ token }) => localStorage.setItem("token", token)),
    ),
  { dispatch: false },
);

// ❌ Bad - Side effects in reducer
on(AuthActions.loginSuccess, (state, { token }) => {
  localStorage.setItem("token", token); // ❌ Impure!
  return { ...state, token };
});
```

### 5. Enable Redux DevTools in Development

Configure DevTools for debugging:

```typescript
provideStoreDevtools({
  maxAge: 25,
  logOnly: environment.production,
  autoPause: true, // Pause when window not focused
  trace: false, // Enable stack traces
  traceLimit: 75,
});
```

<br />

## Testing NgRx Authentication

NgRx's architecture makes testing straightforward:

```typescript
// Testing reducers
describe("AuthReducer", () => {
  it("should set loading on login", () => {
    const action = AuthActions.login({ email: "test@test.com", password: "pass" });
    const state = authReducer(initialAuthState, action);

    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });
});

// Testing selectors
describe("Auth Selectors", () => {
  it("should select authenticated status", () => {
    const state = { auth: { ...initialAuthState, isAuthenticated: true } };
    const result = selectIsAuthenticated(state);

    expect(result).toBe(true);
  });
});

// Testing effects
describe("AuthEffects", () => {
  it("should dispatch loginSuccess on successful login", () => {
    const action = AuthActions.login({ email: "test@test.com", password: "pass" });
    const outcome = AuthActions.loginSuccess({ user, token, refreshToken });

    actions$ = of(action);
    authService.login.and.returnValue(of({ user, token, refreshToken }));

    effects.login$.subscribe((result) => {
      expect(result).toEqual(outcome);
    });
  });
});
```

<br />

## Conclusion

NgRx provides a robust, predictable, and scalable solution for managing authentication state in Angular applications. While it requires more setup than Angular Signals, the benefits become clear as your application grows in complexity.

The strict patterns enforced by NgRx—unidirectional data flow, immutability, and pure functions—create maintainable code that's easy to reason about and test. The Redux DevTools integration offers unparalleled debugging capabilities, making it easier to track down issues in production.

**When to use NgRx:**  
Choose NgRx for enterprise applications, large teams, or when you need advanced debugging and state management features.

**When to use Signals:**  
For smaller projects or when you prefer a lightweight, built-in solution, check out the [companion guide on managing authentication with Angular Signals](/blogs/manage-authentication-state-with-angular-signal).

Both approaches are valid—the best choice depends on your specific requirements, team expertise, and application complexity.

<br />

## References

- [NgRx Official Documentation](https://ngrx.io/)
- [NgRx Store](https://ngrx.io/guide/store)
- [NgRx Effects](https://ngrx.io/guide/effects)
- [NgRx Best Practices](https://ngrx.io/guide/eslint-plugin/rules)
- [Redux DevTools](https://github.com/reduxjs/redux-devtools)
- [Angular Signals Alternative](/blogs/manage-authentication-state-with-angular-signal)

<br />

## Let's Connect

Have questions about NgRx or Angular? Let's chat!

- **Twitter/X**: [@Muneersahel](https://twitter.com/Muneersahel)
- **LinkedIn**: [linkedin.com/in/muneersahel](https://www.linkedin.com/in/muneersahel/)
- **GitHub**: [Muneersahel](https://github.com/Muneersahel)

Happy coding! 🚀
