import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { catchError, EMPTY, Observable, of } from 'rxjs';
import { Training } from 'src/app/core/models/training';
import { TrainingsService } from 'src/app/core/services/trainings.service';

@Injectable({
  providedIn: 'root'
})
export class MyTrainingsResolver implements Resolve<Training[]> {

  constructor(private srvc:TrainingsService, private router:Router) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Training[]> {
    return this.srvc.myTrainings().pipe(
      catchError(e => {
        this.router.navigate([''])
        console.error(e)
        return EMPTY
      })
    )
  }
}
