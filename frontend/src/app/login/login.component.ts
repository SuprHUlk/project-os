import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { LoginService } from '../service/login.service';
import { MatSnackBar } from '@angular/material/snack-bar'
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {

  constructor (private loginService: LoginService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private http: HttpClient,
    private router: Router
    ) {}

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
      this.loginService.logInWithEmailAndPassword(this.logInForm.value)
      .subscribe(
        (res: any) => {
          this.openSnackBar('Log In successful', 'Ok');
        },
        (err: any) => {
          if(err.error.error === 'InvalidCredentials') {
            this.openSnackBar('InvalidCredentials: Please recheck you credentials', 'Ok');
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
      this.loginService.signUpWithEmailAndPassword(this.signUpForm.value)
      .subscribe(
        (response: any) => {
          console.log(response);
          this.display();
            this.openSnackBar('Sign Up successful', 'Ok');
        },
        (error: any) => {
          if(error.error.error.name === 'ValidationError') {
            this.openSnackBar('email-already-in-use: Please try a different email', 'Ok');
          }
          else if(error.error.error === 'WeakPassword') {
            this.openSnackBar('weak-password: Password should be at least 6 characters', 'Ok');
          }
          else {
            this.openSnackBar('unknown-error: Please try again', 'Ok');
          }
        }
      )
    }
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action);
  }

}
