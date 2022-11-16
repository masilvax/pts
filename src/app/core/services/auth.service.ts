import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, map, Observable, of, share, shareReplay, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  readonly ApiUrl = environment.API_URL;

  public userSubject: BehaviorSubject<User | null>;
  public user: Observable<User | null>;

  public get userVal(): User | null{
    return this.userSubject.value;
  }

  get userLogged() {
    return this.userVal && this.userVal.token;
  }

  constructor(private http: HttpClient, private router:Router) {
    
    this.userSubject = new BehaviorSubject<User | null>(
      JSON.parse(localStorage.getItem('user')!)
    );

    this.user = this.userSubject.asObservable();
  }

  login(login:string, password:string):Observable<User> {

    localStorage.removeItem('user');
    this.userSubject.next(null);

    let akcja = 'login'
    return this.http.post<any>(this.ApiUrl+'/http_login.php',{akcja,login,password}).pipe(
/*       catchError((e)=>{
        console.log('401 przekazany z interceptora i wyłapany w authservice')
        this.logout()
        return of()
      }), */
      share(),
      tap(({token,trainer,theme,error})=>{//destruktuyzacja
        let user: User = {
          login:login,
          token:token,
          trainer:trainer,
          theme:theme,
          error:error
        }
        if(user.error){
          alert(user.error)
        }else{
          localStorage.setItem('user',JSON.stringify(user))
          this.userSubject.next(user);
          this.router.navigate(['/'])
        }
      })
    )
  }

  logout(info:string = '') {
    localStorage.removeItem('user');
    this.userSubject.next(null);

    this.router.navigate(['/login'])

    switch(info){
      case 'terefere':
        alert('nastąpiło terefere')  
        break
      case 'tokenended':
        alert('koniec tokena')  
        break
      default:
        alert('nastąpiło wylogowanie')
    }      
  }

  tokenTest():Observable<void> {
    let akcja = 'tokenTest'
    return this.http.post<any>(this.ApiUrl+'/http_login.php',{akcja}).pipe(share())
  }
}
