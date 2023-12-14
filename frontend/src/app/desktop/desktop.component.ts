import { Component } from '@angular/core';
import { LoginService } from '../service/login.service';

@Component({
  selector: 'app-desktop',
  templateUrl: './desktop.component.html',
  styleUrls: ['./desktop.component.css']
})
export class DesktopComponent {

  constructor(private loginService: LoginService) {}

  apps = {
    'terminal': true,
  };

  // cntOpenApps: number = 0;
  anyAppOpen: boolean = false;
  isTerminalOpen: boolean = false;

  // openTerminal() {
  //   if(this.apps.terminal) {
  //     --this.cntOpenApps;
  //   }
  //   else {
  //     ++this.cntOpenApps;
  //   }
  //   this.apps.terminal = !this.apps.terminal;
  //   this.isAnyAppOpen();
  // }

  toggleTerminal(toggle: any) {
    if(toggle === true) {
      this.apps.terminal = true;
    }
    else {
      this.apps.terminal = false;
    }
  }

  // isAnyAppOpen() {
  //   if(this.cntOpenApps == 0) {
  //     this.anyAppOpen = false;
  //   }
  //   else {
  //     this.anyAppOpen = true;
  //   }
  // }

  logOut() {
    this.loginService.logOut();
  }


}
