import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { catchError, Observable, of } from 'rxjs';
import { AuthService } from '../../core/services/auth.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private auth:AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      (r) => {
        console.log('WESZŁEM W INTERCEPTOR')
        return r
      },
      catchError( (e) => {
        if(e.status == '401') {
          console.log('WYLOGOWANY 401: '+e.status+'::'+e.message)
          console.dir(e)
          this.auth.logout('tokenended')
          //throw new Error('BRAK AUTORYZACJI')
          return of()
        }
          //this.authService.ogarnijKoniecSesji();
        console.log('FATALNY ERROR Z INTERCEPTORA: '+e.status+'::'+e.message)
        console.dir(e)
        //return of()
        throw new Error('NOWYYY ERROROR')// jak w ten sposob wyrzuce error to moge go w komponencie wylapac - bez twgo throwa musze lapac tylko tu w serwisie
      }),
      //share()
    );
  }
}
