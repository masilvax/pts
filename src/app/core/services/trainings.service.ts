import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, share } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TrainingsService {

  readonly ApiUrl = environment.API_URL;

  constructor(private http:HttpClient) { }

  myTrainings():Observable<any> {
    let params = new HttpParams().set('akcja','myTrainings')
    //params.append('akcja','myTrainings')
    //let akcja = 'myTrainings'
    return this.http.get<any>(this.ApiUrl + '/http_treningi.php',{params: params}).pipe(share())
    //return this.http.post<any>(this.ApiUrl + '/http_treningi.php',{akcja}).pipe(share())
  }
}
