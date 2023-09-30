import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const router=inject(Router);
  if(localStorage.getItem("idToken")===null) {
    router.navigate(['/']);
    return false;
  }
  return true;
};
