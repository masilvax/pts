import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { last, Observable, share, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Training } from '../models/training';
import { TrainingSession } from '../models/training-session';

@Injectable({
  providedIn: 'root'
})
export class TrainingsService {

  readonly ApiUrl = environment.API_URL;

  constructor(private http:HttpClient) { }

  myTrainings():Observable<Training[]> {
    let params = new HttpParams().set('akcja','myTrainings')
    //params.append('akcja','myTrainings')
    //let akcja = 'myTrainings'
    return this.http.get<Training[]>(this.ApiUrl + '/http_treningi.php',{params: params}).pipe(share(),last())
    //return this.http.post<any>(this.ApiUrl + '/http_treningi.php',{akcja}).pipe(share())
  }

  addNewTraining(training: Training): Observable<any> {
    let akcja = 'saveTraining'
    return this.http.post<any>(this.ApiUrl+'/http_treningi.php',{akcja,training}).pipe(
      share()
    )
  }

  deleteTraining(id:number): Observable<any> {
    //let params = new HttpParams()
    //params.set('akcja','usunTrening')
    //params.set('idTreningu',id)
    return this.http.get(this.ApiUrl + '/http_treningi.php?akcja=usunTrening&id='+id)//get bo php nie umie puta i deleta
  }
/* ****************************** */
  myTraining(id:number,data:string):Observable<Training>{
/*     let params = new HttpParams()
    params.set('akcja','myTraining')
    params.set('id',id) */
    return this.http.get<Training>(this.ApiUrl + '/http_treningi.php?akcja=myTraining&id='+id+'&data='+data).pipe(share(),last())
  }

  //handles buttons from toolbar
  trainingSessionsAction(ids:{id:number,date:string}[],action:string):Observable<any>{
    let idsStr = JSON.stringify(ids.sort((a,b) => this.komparujKurwa(a.date, b.date,false)).map(obj => obj.id))
    return this.http.get<Training>(this.ApiUrl + '/http_treningi.php?akcja='+action+'&idki='+idsStr).pipe(share(),last())
  }
  private komparujKurwa(a:string,b:string, isAsc: boolean) {// it doesn't compare without this callback function
    return (a < b ? -1 : 1)* (isAsc ? 1 : -1)
  }

  saveSession(trainingSession: TrainingSession): Observable<any> {
    console.log(trainingSession)
    const parapapampam = {
      akcja: 'saveSession',
      trainingSession
    }
    return this.http.post<any>(this.ApiUrl+'/http_sesja.php',parapapampam)
  }

}
