import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { map, Observable, shareReplay } from 'rxjs';

@Component({
  selector: 'app-my-trainings-toolbar',
  templateUrl: './my-trainings-toolbar.component.html',
  styleUrls: ['./my-trainings-toolbar.component.scss']
})
export class MyTrainingsToolbarComponent implements OnInit {

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
