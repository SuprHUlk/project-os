import { Injectable } from '@angular/core';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  } from "firebase/auth";
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router'
import { HttpClient } from '@angular/common/http';
import { take, map, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private fireAuth: AngularFireAuth, private router: Router, private http: HttpClient) { }

  logInWithEmailAndPassword(logInForm: any): any {

    return this.http.post("http://localhost:3000/auth/login", logInForm)
      .pipe(
        take(1),
        map((result: any) => {
          console.log(result);
          localStorage.setItem('idToken', JSON.stringify(result.idToken));
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
            this.http.post("http://localhost:3000/auth/google", {
              username: result._tokenResponse.displayName,
              email: result._tokenResponse.email,
              })
              .subscribe(
                ((res: any) => {
                  console.log(res);
                  localStorage.setItem('idToken', JSON.stringify(res.idToken));
                  this.router.navigate(['/desktop']);
                })
              )
          },
          (error) => { console.log(error); }
      )
  }

  signUpWithEmailAndPassword(signUpForm: any): any {
    return this.http.post("http://localhost:3000/auth/signup", signUpForm)
      .pipe(
        take(1),
        map((result: any) => {
          console.log(result);
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
