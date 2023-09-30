import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { LoginService } from '../service/login.service';
import { MatSnackBar } from '@angular/material/snack-bar'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {

  constructor (private loginService: LoginService, private formBuilder: FormBuilder, private snackBar: MatSnackBar) {}

  isLogIn: boolean = true;

  logInForm = this.formBuilder.group({
    email:['', Validators.required],
    password:['', Validators.required],
  })


  signUpForm = this.formBuilder.group({
    username:['', Validators.required],
    email:['', Validators.required],
    password:['', Validators.required],
  })

  display() {
    this.isLogIn = !this.isLogIn;
    this.logInForm.reset();
    this.signUpForm.reset();
  }

  logInWithGoogle() {
    this.loginService.logInWithGoogle();
  }

  logInWithEmailAndPassword() {
    console.log(this.logInForm.value);

    if(!this.logInForm.valid) {
      this.openSnackBar('admin-restricted-operation: Please fill all the fields with valid values', 'Ok');
    }
    else {
      this.loginService.logInWithEmailAndPassword(this.logInForm)
      .then(
        (res: any) => {
          if(res === 'NO_ERROR') {
            this.openSnackBar('Log In successful', 'Ok');
          }
          else if(res === 'auth/invalid-email') {
            this.openSnackBar('invalid-email: Please enter a valid email', 'Ok');
          }
          else if(res === 'auth/missing-password') {
            this.openSnackBar('missing-password: Please enter the password', 'Ok');
          }
          else if(res === 'auth/invalid-login-credentials' ||
            res === 'auth/wrong-password') {
            this.openSnackBar('invalid-login-credentials: Please recheck you credentials', 'Ok');
          }
          else {
            this.openSnackBar('unknown-error: Please try again', 'Ok');
          }
        }
      );
    }
  }

  signUpWithEmailAndPassword() {
    console.log(this.signUpForm.value);

    if(!this.signUpForm.valid) {
      this.openSnackBar('admin-restricted-operation: Please fill all the fields with valid values', 'Ok');
    }
    else {
      this.loginService.signUpWithEmailAndPassword(this.signUpForm)
      .then(
        (res: any) => {
          if(res === 'NO_ERROR') {
            this.openSnackBar('Sign Up successful', 'Ok');
          }
          else if(res === 'auth/admin-restricted-operation' || res === 'auth/missing-password') {
            this.openSnackBar('admin-restricted-operation: Please fill all the fields with valid values', 'Ok');
          }
          else if(res === 'auth/email-already-in-use') {
            this.openSnackBar('email-already-in-use: Please try different email', 'Ok');
          }
          else if(res === 'auth/weak-password') {
            this.openSnackBar('weak-password: Password should be at least 6 characters', 'Ok');
          }
          else {
            this.openSnackBar('unknown-error: Please try again', 'Ok');
          }
        }
      );
    }
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action);
  }

}
