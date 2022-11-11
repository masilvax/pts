import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class HeaderInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    
    const user = JSON.parse(localStorage.getItem('user')!)

    if (user) {
      request = request.clone({
        setHeaders: {Authorization: `${user.token}`}
      })
      console.log('robie interceptor')
    }
    return next.handle(request);
    
  }
}
