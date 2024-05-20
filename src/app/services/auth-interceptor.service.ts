import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.log("Intercepting Requests");
    const username = window.sessionStorage.getItem('loggedInUser');
    if (username) {
      request = request.clone({
        headers: request.headers.set('username', username)
      })
    }
    return next.handle(request);
  }
}
