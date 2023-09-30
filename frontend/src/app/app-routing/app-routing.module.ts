import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { authGuard } from '../auth-gaurd/auth.guard';

const appRoutes: Routes = [
  { path: '', component: LoginComponent },
  // { path: 'main', component: MainComponent, canActivate: [authGuard]}
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes),
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
