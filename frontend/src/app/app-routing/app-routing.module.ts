import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { AuthGuard } from '../auth-gaurd/auth.guard';
import { DesktopComponent } from '../desktop/desktop.component';

const appRoutes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'desktop', component: DesktopComponent, canActivate: [AuthGuard]}
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
