import { Injectable } from '@angular/core';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { Router } from '@angular/router'
import { HttpClient } from '@angular/common/http';
import { take, map, catchError, throwError } from 'rxjs';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private router: Router, private http: HttpClient) { }

  logInWithEmailAndPassword(logInForm: any): any {

    return this.http.post(environment.apiUrl + "/auth/login", logInForm)
      .pipe(
        take(1),
        map((result: any) => {
          localStorage.setItem('idToken', result.idToken);
          localStorage.setItem('username', result.username);
          this.router.navigate(['/desktop']);
        }),
        catchError((error) => {
          return throwError(() => error);
        })
      )
  }

  logInWithGoogle() {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();

    return signInWithPopup(auth, provider)
      .then(
          (result: any) => {
            this.http.post(environment.apiUrl + "/auth/google", {
              username: result._tokenResponse.displayName,
              email: result._tokenResponse.email,
              })
              .subscribe(
                ((res: any) => {
                  localStorage.setItem('idToken', res.idToken);
                  localStorage.setItem('username', res.username);
                  this.router.navigate(['/desktop']);
                })
              )
          },
          (error) => { console.log(error); }
      )
  }

  signUpWithEmailAndPassword(signUpForm: any): any {
    return this.http.post(environment.apiUrl + "/auth/signup", signUpForm)
      .pipe(
        take(1),
        map((result: any) => {
          return 'NO_ERROR';
        }),
        catchError((error) => {
          console.log(error);
          return throwError(() => error);
        })
      )
  }

  logOut() {
    localStorage.clear();
    this.router.navigate(['/']);
  }

}
