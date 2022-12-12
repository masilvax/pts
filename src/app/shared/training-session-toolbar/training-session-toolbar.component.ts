import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { map, Observable, shareReplay } from 'rxjs';

@Component({
  selector: 'app-training-session-toolbar',
  templateUrl: './training-session-toolbar.component.html',
  styleUrls: ['./training-session-toolbar.component.scss']
})
export class TrainingSessionToolbarComponent implements OnInit {

  constructor(private breakpointObserver: BreakpointObserver) { }
  
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  .pipe(
    map(result => result.matches),
    shareReplay()
  );

  isWebLandscape$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.WebLandscape)
  .pipe(
    map(result => result.matches),
    shareReplay()
  );

  @Output() actionEvent: EventEmitter<string> = new EventEmitter<string>()

  ngOnInit(): void {
  }

}
