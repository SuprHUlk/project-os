import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if(localStorage.getItem('idToken') == null) {
      return next.handle(request);
    }

    const token = localStorage.getItem('idToken');
    const modifiedReq = request.clone( {  headers: request.headers.set('Authorization', 'Bearer '+token) } );

    return next.handle(modifiedReq);
  }
}
