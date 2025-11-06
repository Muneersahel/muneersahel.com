import { inject } from "@angular/core";
import { Auth, user } from "@angular/fire/auth";
import { CanActivateFn, Router } from "@angular/router";
import { map } from "rxjs";

export const publicGuard: CanActivateFn = (route, state) => {
  const auth = inject(Auth);
  const router = inject(Router);

  return user(auth).pipe(
    map((u) => {
      if (u) {
        console.log("User is authenticated, redirecting to dashboard", u);
        router.navigate(["/admin"]);
        return false;
      }
      return true;
    }),
  );
};
