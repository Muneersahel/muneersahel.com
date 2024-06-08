In modern web applications, authentication is a critical aspect of ensuring the security and privacy of users' data. As an Angular developer, managing the authentication state effectively becomes essential.

<br />

## What is Angular Signal?

[**Angular Signal**](https://angular.io/guide/signals), a system that granularly tracks how and where your state is used throughout an application, allowing the framework to optimize rendering updates. From the official Angular documentation:

> A signal is a wrapper around a value that can notify interested consumers when that value changes.

More explanation from the [Angular Signals](https://angular.io/guide/signals) documentation:

<br />

## Getting Started with Signal for Authentication

Signals comes out of the box with Angular 16 and above, so you don't need to install any additional packages.

To start using Angular Signal for authentication, follow these steps:

### Step 1: Create the Authentication Service and import Signal

Create an authentication service that will handle the authentication logic. Define a type for the authentication state and create a signal for it. The authentication state will contain the user details, token, and authentication status where each can be computed from the state using the `computed` method from the `@angular/core` package.

<br />

```typescript
import { Injectable, signal, computed } from "@angular/core";

type AuthState = {
  user: User | null;
  token: string | null;
  is_auth: boolean;
  loading: boolean;
};

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private _state = signal<AuthState>({
    user: null,
    token: null,
    is_auth: false,
    loading: false,
  });
  token = computed(() => this._state().token);
  loading = computed(() => this._state().loading);
  isAuth = computed(() => this._state().is_auth);
  user = computed(() => this._state().user);

  constructor() {}
}
```

<br />

Loading is set to `false` by default. You may set it to `true` when the login process starts and set it back to `false` when the login process is complete. This will allow you to show a loading indicator while the login process is in progress.

<br />

### Step 2: Fetch and set token from local storage

Instead of initializing the token to null, you can fetch the token from the local storage and initialize the token to the fetched token. This will ensure that the user remains logged in even after the page refreshes.

<br />

```typescript
export class AuthService {
  private _accessTokenKey = "accessToken";
  private _storedToken = localStorage.getItem(this._accessTokenKey);
  private _state = signal<AuthState>({
    user: null,
    token: this._storedToken,
    is_auth: this._storedToken !== null, // You may check the token validity here
    loading: false,
  });

  constructor() {}
}
```

<br />

`is_auth` is set to `true` if the token is not null. You may also check the validity of the token, if the token is not expired, and set the `is_auth` accordingly.

We can use another method `effect` from signal to ensure that the token is set to the local storage whenever the token changes in the state. More about `effect` from the [Angular](https://angular.io/guide/signals#effects) documentation.

<br />

```typescript
  constructor() {
    effect(() => {
      const token = this.token();
      if (token !== null) {
        localStorage.setItem(this._accessTokenKey, token);
      } else {
        localStorage.removeItem(this._accessTokenKey);
      }
    });
  }
```

<br />

Now when we update `_state` with a new token, the effect will be triggered and the token will be set to the local storage.

<br />

### Step 3: Create login method

Create a login method that will update the state with the user details and token. You may also set the `is_auth` to `true` and `loading` to `false` when the login process is complete. When the login process fails, you may set the `loading` to `false` and show an appropriate error message.

<br />

```typescript
login(payload: LoginPayload) {
    this.http
      .post<AuthResponse>(`${this.loginUrl}`, payload)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res) => {
          this._state.mutate((state) => {
            state.user = res.user;
            state.token = res.access_token;
            state.is_auth = true;
            state.loading = false;
            return state;
          });
          this.router.navigate(["/home"]);
        },
        error: (err) => {
          // stop loading and show error message
        },
      });
}
```

<br />

`takeUntilDestroyed` is an operator which completes the Observable when the calling context (component, directive, service, etc) is destroyed.

Now, you can use the `AuthService` in your components to check the authentication state and perform actions accordingly. For example, you can show the login page if the user is not authenticated and show the home page if the user is authenticated.

<br />

## Conclusion

Since the introduction of the signals, signals has been a great way I use to simply manage the application state inside my Angular applications. It is a great alternative to other state management libraries like NgRx. It is also a great way to learn about the internals of Angular.

I will write how to manage authentication state with NgRx in the next article so you can compare both approaches and choose the one that suits your needs. Stay tuned!

<br />

## References

- [Angular Signal](https://angular.io/guide/signals)
- [Angular Signal API](https://angular.io/api/core/signal)

<br />

## Contact

If you have any questions or feedback, feel free to reach out to me on [Twitter](https://twitter.com/Muneersahel) or [LinkedIn](https://www.linkedin.com/in/muneersahel/).
