# Managing Authentication State with NgRx in Angular

In modern web applications, ensuring the security and privacy of user data is of utmost importance, and managing the authentication state effectively is a key aspect of achieving this. As an Angular developer, you have several options for handling authentication state, and one popular choice is using **NgRx**. In this article, we will explore how to manage authentication state with NgRx in Angular.

## What is NgRx?

NgRx is a powerful state management library for Angular applications. It is based on the Redux pattern and provides a predictable and centralized approach to managing application state. Using NgRx, you can efficiently manage complex states, including authentication, throughout your Angular application.

## Getting Started with NgRx for Authentication

To use NgRx for authentication in your Angular application, follow these steps:

### Step 1: Install NgRx Packages

Open your command-line interface and navigate to your Angular project's root directory. Then, use npm install to add the necessary NgRx packages:

```bash
npm install @ngrx/store
npm install @ngrx/effects
```

This command installs the @ngrx/store package for managing the store and state, as well as the @ngrx/effects package for handling side effects. Add necessary configuration as described in the [NgRx documentation](https://ngrx.io/guide/store/install).

### Step 2: Create Authentication Actions

Actions represent the events that can change the state in NgRx. For authentication, you'll typically create actions like `login`, `logout`, and `loadUser`. These actions will be dispatched when certain events occur, such as a user logging in or out.

```typescript
// auth.actions.ts

import { createAction, props } from "@ngrx/store";

export const login = createAction("[Auth] Login", props<{ username: string; password: string }>());
export const loginSuccess = createAction("[Auth] Login Success", props<{ user: User; token: string }>());
export const logout = createAction("[Auth] Logout");
export const loadUser = createAction("[Auth] Load User");
```

### Step 3: Define Authentication Reducers

Reducers specify how the state should change in response to actions. You'll need to create a reducer for the authentication state that handles actions like login and logout. Reducers are responsible for updating the state immutably.

```typescript
// auth.reducer.ts

import { createReducer, on } from "@ngrx/store";
import * as AuthActions from "./auth.actions";

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
};

export const authReducer = createReducer(
  initialState,
  on(AuthActions.login, (state) => ({
    ...state,
  })),
  on(AuthActions.loginSuccess, (state, { user, token }) => ({
    ...state,
    user,
    token,
    isAuthenticated: true,
  })),
  on(AuthActions.logout, (state) => ({
    ...state,
    user: null,
    token: null,
    isAuthenticated: false,
  })),
);
```

### Step 4: Create Authentication Effects

NgRx effects are used for handling side effects such as making HTTP requests. In the context of authentication, you may use effects to communicate with your server and save the token in local storage.

```typescript
// auth.effects.ts

import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, mergeMap, tap } from "rxjs/operators";
import * as AuthActions from "./auth.actions";
import { AuthService } from "./auth.service";

export const login$ = createEffect(
  (actions$ = inject(Actions), authService = inject(AuthService)) =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      mergeMap(({ username, password }) =>
        this.authService.login(username, password).pipe(
          map((res) => AuthActions.loginSuccess({ user: res.user, token: res.token })),
          catchError((error) => of(AuthActions.loginFailure({ error }))),
        ),
      ),
    ),
  { functional: true },
);
```

### Step 5: Dispatch Actions

In your components, you can dispatch actions when authentication-related events occur. For instance, when a user logs in or out, you can dispatch the corresponding actions.

```typescript
// auth.component.ts

import { Component } from "@angular/core";
import { Store } from "@ngrx/store";
import * as AuthActions from "./auth.actions";

@Component({
  selector: "app-auth",
  template: `
    <!-- Your authentication components and logic -->
    <button (click)="login()">Login</button>
    <button (click)="logout()">Logout</button>
  `,
})
export class AuthComponent {
  constructor(private store: Store) {}

  login(): void {
    // Simulate login process
    this.store.dispatch(
      AuthActions.login({
        user: { username: "John", password: "Doe" },
      }),
    );
  }

  logout(): void {
    this.store.dispatch(AuthActions.logout());
  }
}
```

## Conclusion

Managing authentication state with NgRx in your Angular application provides a robust and structured way to handle user authentication. NgRx's centralized state management, actions, reducers, and effects make it easier to implement complex authentication logic while keeping your application predictable and maintainable. In a future article, we'll compare this approach with other state management libraries, providing you with the knowledge to choose the one that best suits your needs. Stay tuned for more insights into state management in Angular!

## References

- [NgRx Documentation](https://ngrx.io/)
- [Contact Me](https://www.linkedin.com/in/muneersahel/)

If you have any questions or feedback, feel free to reach out to me on Twitter or LinkedIn.
