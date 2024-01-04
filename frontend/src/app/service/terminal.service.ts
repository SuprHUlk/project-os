import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { take, map } from 'rxjs';
import { idToken } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class TerminalService {

  constructor(private http: HttpClient) { }

  // returnVal: string = '';
  returnVal: any;

  check(command: string) {

    switch(command) {
      case 'whoami':
        this.returnVal = '<br>' + this.whoami();
        break;
      case 'help':
        this.returnVal = '<br>whoami<br>help<br>clear<br>';
        break;
      default:
        this.returnVal = '<br>Command not found. For a list of commands, type "help".<br>';
    }

    return this.returnVal;
  }

  whoami() {
    return localStorage.getItem('username');
  }
}
