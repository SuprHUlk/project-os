import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, take, map } from 'rxjs';
import { VerifyIdTokenService } from '../service/verify-id-token.service';

export const AuthGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot):
    Observable<boolean | UrlTree> | Promise<boolean | UrlTree>| boolean | UrlTree=> {

  const router = inject(Router);
  const idToken = localStorage.getItem('idToken');

  if(idToken === null) {
    return router.createUrlTree(['/']);
  }

  return inject(VerifyIdTokenService).verifyIdToken(idToken!.replace(/"/g, ''))
    .pipe(
      take(1),
      map((result: any) => {
        const isAuth = result;
        console.log(isAuth);
        if(isAuth) {
          return true;
        }
        return router.createUrlTree(['/']);
      })
    )
};
