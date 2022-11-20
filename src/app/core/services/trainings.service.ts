import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { last, Observable, share, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Training } from '../models/training';

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
    let akcja = 'dodajTrening'
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

}
