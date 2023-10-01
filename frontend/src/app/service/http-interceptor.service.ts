import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<any>, next: HttpHandler) {

    if(request.headers.get("No-Auth") === "True") {
      return next.handle(request);
    }

    const token = localStorage.getItem('idToken')!.replace(/"/g, '');
    const modifiedReq = this.addToken(request, token);

    return next.handle(modifiedReq).pipe(
      catchError(
        (error: HttpErrorResponse) => {
          console.log(error);
          return throwError("Wrong");
        }
      )
    )
  }

  private addToken(request: HttpRequest<any>, token: String | null) {
    return request.clone( {  headers: request.headers.append('Authorization', 'Bearer '+token) } );
  }
}
