import { Component, ChangeDetectionStrategy, EventEmitter, Output, Input } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { BehaviorSubject, interval, Observable, of } from 'rxjs';
import { first, last, map, share, shareReplay, switchMap } from 'rxjs/operators';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { AuthService } from '../../core/services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../../core/models/user';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavigationComponent {

  constructor(private breakpointObserver: BreakpointObserver, private auth:AuthService) {}
/*   @Output()
  readonly themeChanged = new EventEmitter<boolean>();

  @Input()
  isDarkTheme:boolean = false //used in parent template in <app-navigation> */

   loggedUser$:Observable<User | null> = this.auth.userSubject 
  /* loggedBool$:Observable<boolean> = this.loggedUser$.pipe(map(e => !!e)) */

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  //isMobile: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)

  //emits event for app component
  //for closing menu on mobile devices when clicking anchor
  @Output() out: EventEmitter<any> = new EventEmitter<any>()

  emitOutDrawerClose() {//ten brejkpointer jakoś nie umie last() zwrócić
/*     let mobile = this.isHandset$.pipe(
      map(x => x.valueOf)
    );
    console.log(mobile) */
    let obserwalba = this.isHandset$.pipe(first())//tego nie umie. last() - nic nie zwraca, first() działa poprawnie za to 

    let sub = obserwalba.subscribe(res => {
      console.log(res)
      if(res){
        console.log('res jes tru')
        this.out.emit()
      }
    })
    sub.unsubscribe()
  }

}
