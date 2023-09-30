import { Injectable } from '@angular/core';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
  } from "firebase/auth";
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private fireAuth: AngularFireAuth) { }

  logInWithGoogle() {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();

    return signInWithPopup(auth, provider)
      .then(
          (result: any) => {
            localStorage.setItem('idToken', JSON.stringify(result._tokenResponse.idToken));
          },
          (error) => { console.log(error); }
      )
  }

  logInWithEmailAndPassword(logInForm: any) {
    const auth = getAuth();

    return signInWithEmailAndPassword(auth, logInForm.value.email, logInForm.value.password)
      .then(
        (result: any) => {
          console.log(result);
          localStorage.setItem('idToken', JSON.stringify(result._tokenResponse.idToken));
          return 'NO_ERROR';
        },
        (error) => {
          console.log(error.code);
          return error.code;
        }
      )
  }

  signUpWithEmailAndPassword(signUpForm: any) {
    const auth = getAuth();

    return createUserWithEmailAndPassword(auth, signUpForm.value.email, signUpForm.value.password)
      .then(
        (result: any) => {
          console.log(result);
          return 'NO_ERROR';
        },
        (error) => {
          console.log(error.code);
          return error.code;
        }
      )
  }

}
