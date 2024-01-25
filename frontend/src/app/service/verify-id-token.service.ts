import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { take, map, catchError, throwError } from 'rxjs';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VerifyIdTokenService {

  constructor(private http: HttpClient) { }

  verifyIdToken(idToken: string) {

    const request = { };

    return this.http.post(environment.apiUrl + '/valid/isauthenticated', request)
      .pipe(
        take(1),
        map(
          (result: any) => {
            return result.isValid === "true";
          }
        ),
        catchError(err =>
          throwError(err))
      );
  }


}
