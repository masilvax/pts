import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { last, Observable, share } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TrainingSession } from '../models/training-session';

@Injectable({
  providedIn: 'root',
})
export class TrainingSessionService {
  readonly ApiUrl = environment.API_URL;

  constructor(private http: HttpClient) {}

  myTrainingSession(id: number): Observable<TrainingSession> {
    return this.http.get<TrainingSession>(this.ApiUrl + '/http_sesja.php?akcja=myTrainingSession&id=' + id).pipe(share(), last());
  }

  doneUndone(exerciseId:number,setsDone:'string'):Observable<any>{
    const rampampam = {
      akcja:'doneUndone',
      id:exerciseId,
      zrobione:setsDone
    }
    return this.http.post<any>(this.ApiUrl+'/http_sesja.php',rampampam).pipe(
      share()
    )
  }
}
