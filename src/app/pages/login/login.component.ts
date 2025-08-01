import { ChangeDetectionStrategy, Component, signal } from "@angular/core";
import { FormsModule, NgForm } from "@angular/forms";
import { HlmButtonDirective } from "@spartan-ng/ui-button-helm";
import {
  HlmCardContentDirective,
  HlmCardDirective,
  HlmCardHeaderDirective,
  HlmCardTitleDirective,
} from "@spartan-ng/ui-card-helm";
import { HlmInputDirective } from "@spartan-ng/ui-input-helm";

@Component({
  selector: "app-login",
  standalone: true,
  imports: [
    FormsModule,
    HlmButtonDirective,
    HlmInputDirective,
    HlmCardDirective,
    HlmCardHeaderDirective,
    HlmCardTitleDirective,
    HlmCardContentDirective,
  ],
  template: `
    <section
      class="py-12 min-h-[80dvh] flex items-center justify-center bg-primary text-white"
    >
      <div
        hlmCard
        class="w-full max-w-md bg-white/5 rounded-lg p-8 border border-border shadow-lg backdrop-blur-sm"
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
          @if (error()) {
            <div class="mt-4 text-red-500 text-center text-sm">
              {{ error() }}
            </div>
          }
        </div>
      </div>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [``],
})
export class LoginComponent {
  email = "";
  password = "";
  loading = signal(false);
  error = signal("");

  onSubmit(form: NgForm) {
    if (form.invalid) return;
    this.loading.set(true);
    this.error.set("");
    // Simulate login (replace with real auth logic)
    setTimeout(() => {
      this.loading.set(false);
      if (
        this.email.toLowerCase() === "test@example.com" &&
        this.password === "password"
      ) {
        // Success: redirect or show success message
        this.error.set("");
        // ...
      } else {
        this.error.set("Invalid email or password.");
      }
    }, 1200);
  }
}
