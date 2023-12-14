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
        this.test();
        this.returnVal = this.whoami();
        break;
      case 'help':
        this.returnVal = '<br>whoami<br>help<br>clear<br>';
        break;
      default:
        this.returnVal = '<br>Command not found. For a list of commands, type "help".<br>';
    }

    return this.returnVal;
  }

  test() {
    const requestHeader = new HttpHeaders(
      { 'No-Auth': 'False' }
    );
    console.log(2313);
    this.http.post('http://localhost:8080/verifyFirebaseToken', { idToken: localStorage.getItem("idToken") }, { headers: requestHeader }).subscribe(
      res => console.log(res)
    )
  }

  whoami() {

    const requestHeader = new HttpHeaders(
      { 'Authorization': localStorage.getItem("idToken")! }
    );


    return this.http.post('http://localhost:8080/verifyFirebaseToken', { idToken: localStorage.getItem("idToken") }, { headers: requestHeader })
      .pipe(
        take(1),
        map((result: any) => {
          console.log(result);
          return result.isValid;
        })
      );
  }
}
