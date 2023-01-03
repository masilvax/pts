import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { last, Observable, share } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Exercise } from '../models/exercise';
import { TrainingSession } from '../models/training-session';

@Injectable({
  providedIn: 'root',
})
export class TrainingSessionService {
  readonly ApiUrl = environment.API_URL;

  constructor(private http: HttpClient) {}

  myTrainingSession(id: number): Observable<TrainingSession> {
    return this.http.get<TrainingSession>(this.ApiUrl + '/http_sesja.php?akcja=myTrainingSession&id=' + id).pipe(share(), );
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

  saveExercise(exercise: Exercise, action: string): Observable<any> {
    const parapapampam = {
      akcja: action,
      ...exercise
    }
    return this.http.post<any>(this.ApiUrl+'/http_sesja.php',parapapampam)
  }

  saveSession(trainingSession: TrainingSession): Observable<any> {
    console.log(trainingSession)
    const parapapampam = {
      akcja: 'saveSession',
      trainingSession
    }
    return this.http.post<any>(this.ApiUrl+'/http_sesja.php',parapapampam)
  }
  
/*   superset(exercise: Exercise): Observable<any> {
    const parapapampam = {
      akcja: 'superset',
      ...exercise
    }
    return this.http.post<any>(this.ApiUrl+'/http_sesja.php',parapapampam)
  }

  unsuperset(exercise: Exercise): Observable<any> {
    const parapapampam = {
      akcja: 'unsuperset',
      ...exercise
    }
    return this.http.post<any>(this.ApiUrl+'/http_sesja.php',parapapampam)
  } */
}
