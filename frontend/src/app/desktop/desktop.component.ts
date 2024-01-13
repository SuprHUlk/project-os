import { Component } from '@angular/core';
import { LoginService } from '../service/login.service';
import { timer, map, share } from 'rxjs';

@Component({
  selector: 'app-desktop',
  templateUrl: './desktop.component.html',
  styleUrls: ['./desktop.component.css']
})
export class DesktopComponent {

  constructor(private loginService: LoginService) {}

  apps = {
    'terminal': false,
    'explorer': false,
    'mediaViewer': false,
    'toDo': true
  };

  file: { mimeType: string, link: string } = { mimeType: '', link: ''};

  time = new Date();
  rxTime = new Date();
  subscription: any;

  ngOnInit() {

    console.log(this.rxTime);


    this.subscription = timer(0, 1000)
      .pipe(
        map(() => new Date()),
        share()
      )
      .subscribe(time => {
        this.rxTime = time;
      });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  toggleApp(toggle: { appName: string, status: boolean }) {

    const { appName, status } = toggle;

    if(appName ==='terminal') {
      this.apps.terminal = status;
    }
    else if(appName === 'explorer') {
      this.apps.explorer = status;
    }
    else if(appName === 'mediaViewer') {
      this.apps.mediaViewer = status;
    }
    else if(appName === 'toDo') {
      this.apps.toDo = status;
    }

  }

  openMediaViewer(data: { mimeType: string, link: string }) {
    const { mimeType, link } = data;
    if (this.apps.mediaViewer) this.apps.mediaViewer = !this.apps.mediaViewer;
    this.apps.mediaViewer = true;
    console.log(mimeType, link);

    this.file = { mimeType, link };
  }

  logOut() {
    this.loginService.logOut();
  }

}
