import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { take, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VerifyIdTokenService {

  constructor(private http: HttpClient) { }

  verifyIdToken(idToken: string) {

    const request = { idToken: idToken };

    const requestHeader = new HttpHeaders(
      { 'No-Auth': 'True' }
    );

    return this.http.post('http://localhost:8080/verifyFirebaseToken', request, { headers: requestHeader })
      .pipe(
        take(1),
        map((result: any) => {
          return result.isValid === "true";
        })
      );
  }


}
