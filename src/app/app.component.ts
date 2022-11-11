import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { DOCUMENT } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, DoCheck, HostBinding, /* HostBinding, */ Inject, OnChanges, OnInit, Renderer2 } from '@angular/core';
import { map, Observable, shareReplay } from 'rxjs';
import { User } from './core/models/user';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit/* , DoCheck */{
  isDark = false;
  loggedUser$:Observable<User | null> = this.auth.userSubject

  loggedBool$:Observable<boolean> = this.loggedUser$.pipe(map(e => !!e))

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

/*   @HostBinding('class')
  get themeModel() {
    return this.isDark ? 'theme-dark' : 'theme-light'
  } */  //podobno psuje selecta, bo robi theme <app-root> a nie body

  //@HostBinding('class') klasaCss = this.isDark ? 'theme-dark' : 'theme-light'

  //jedno i drugie powyżej działa. ALE: z getem i metodą mogę dynamicznie zmieniać w zalezności od zmiennej isDark, a bez tego muszę wpisać coś w klasaCss 

  constructor(@Inject(DOCUMENT) private document: Document, private renderer: Renderer2, private auth:AuthService, private breakpointObserver: BreakpointObserver) {}
//   ngDoCheck(): void {
//     let userr = this.auth.userSubject.value
//     console.log(userr)
// /*     this.isDark = userr?.theme ==='ciemny' ? true : false
//     this.changeTheme(this.isDark)    */ 
//   }
  ngOnInit(): void {
    this.isDark = this.auth.userSubject.value?.theme ==='ciemny' ? true : false
    this.changeTheme(this.isDark)
  }

  changeTheme(isDarkMode:boolean) {
    const hostClass = isDarkMode ? 'theme-dark' : 'theme-light'
    this.renderer.setAttribute(this.document.body, 'class', hostClass)
    //this.isDark = !this.isDark //@HostBinding z getem i metodą i returnem
    //this.klasaCss = this.isDark ? 'theme-dark' : 'theme-light' //@HostBinding bez geta
  }

}
