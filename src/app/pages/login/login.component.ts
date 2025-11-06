import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from "@angular/core";
import {
  Auth,
  AuthErrorCodes,
  signInWithEmailAndPassword,
} from "@angular/fire/auth";
import { FormsModule, NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { HlmButton } from "@spartan-ng/helm/button";
import {
  HlmCardContent,
  HlmCard,
  HlmCardHeader,
  HlmCardTitle,
} from "@spartan-ng/helm/card";
import { HlmInput } from "@spartan-ng/helm/input";
import { toast } from "ngx-sonner";

@Component({
  selector: "app-login",
  standalone: true,
  imports: [
    FormsModule,
    HlmButton,
    HlmInput,
    HlmCard,
    HlmCardHeader,
    HlmCardTitle,
    HlmCardContent,
  ],
  template: `
    <section
      class="py-12 min-h-[80dvh] flex items-center justify-center bg-primary text-white"
    >
      <div
        hlmCard
        class="w-full max-w-md bg-white/5 rounded-lg p-8 border border-border shadow-lg backdrop-blur-xs"
      >
        <div hlmCardHeader class="mb-8">
          <h1
            hlmCardTitle
            class="text-3xl font-bold text-center mb-2 text-white"
          >
            Login
          </h1>
          <p class="text-white/60 text-center">Sign in to your account</p>
        </div>
        <div hlmCardContent>
          <form
            #loginForm="ngForm"
            (ngSubmit)="onSubmit(loginForm)"
            autocomplete="off"
            class="space-y-6"
          >
            <div class="space-y-4">
              <div class="space-y-2">
                <label for="email" class="text-sm font-medium text-white/60">
                  Email
                </label>

                <input
                  hlmInput
                  id="email"
                  type="email"
                  name="email"
                  required
                  [(ngModel)]="email"
                  placeholder="Enter your email"
                  class="w-full"
                  aria-label="Email"
                  autocomplete="username"
                />
              </div>
              <div class="space-y-2">
                <label for="password" class="text-sm font-medium text-white/60">
                  Password
                </label>
                <input
                  hlmInput
                  id="password"
                  type="password"
                  name="password"
                  required
                  minlength="6"
                  [(ngModel)]="password"
                  placeholder="Enter your password"
                  class="w-full"
                  aria-label="Password"
                  autocomplete="current-password"
                />
              </div>
            </div>

            <button
              hlmBtn
              type="submit"
              size="lg"
              class="w-full uppercase font-semibold tracking-wide flex items-center justify-center gap-2"
              [disabled]="loginForm.invalid || loading()"
            >
              @if (loading()) {
                <span class="animate-spin mr-2">&#9696;</span>
                Logging in...
              } @else {
                Login
              }
            </button>
          </form>
        </div>
      </div>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  readonly #auth = inject(Auth);
  readonly #router = inject(Router);

  email = "";
  password = "";

  loading = signal(false);

  onSubmit(form: NgForm) {
    if (form.invalid) return;
    this.loading.set(true);
    signInWithEmailAndPassword(this.#auth, this.email, this.password)
      .then(() => {
        this.loading.set(false);
        this.#router.navigate(["/"]);
      })
      .catch((error) => {
        const errorCode = error.code;

        let msg = "";
        if (errorCode === AuthErrorCodes.INVALID_PASSWORD) {
          msg = "Invalid password. Please try again.";
        } else if (errorCode === AuthErrorCodes.USER_DELETED) {
          msg =
            "No user found with this email. Please check your email and try again.";
        } else {
          msg = "An unexpected error occurred. Please try again.";
        }

        this.loading.set(false);
        toast.error("Error", { description: msg });
      });
  }
}
