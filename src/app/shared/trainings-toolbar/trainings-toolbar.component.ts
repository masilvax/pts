import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { map, Observable, shareReplay } from 'rxjs';

@Component({
  selector: 'app-trainings-toolbar',
  templateUrl: './trainings-toolbar.component.html',
  styleUrls: ['./trainings-toolbar.component.scss']
})
export class TrainingsToolbarComponent implements OnInit {

  constructor(private breakpointObserver:BreakpointObserver) { }

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  .pipe(
    map(result => result.matches),
    shareReplay()
  );

  @Output() addNewTrainingEvent: EventEmitter<string> = new EventEmitter<string>()

  ngOnInit(): void {
  }

}
