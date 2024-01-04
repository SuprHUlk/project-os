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
    'terminal': false,
    'explorer': true,
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

  toggleApp(toggle: { appName: string, status: boolean }) {

    const appName: string = toggle.appName;
    const status: boolean = toggle.status;

    if(appName ==='terminal') {
      this.apps.terminal = status;
    }
    else if(appName === 'explorer') {
      this.apps.explorer = status;
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
