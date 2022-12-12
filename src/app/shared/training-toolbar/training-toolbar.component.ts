import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { map, Observable, shareReplay } from 'rxjs';

@Component({
  selector: 'app-training-toolbar',
  templateUrl: './training-toolbar.component.html',
  styleUrls: ['./training-toolbar.component.scss']
})
export class TrainingToolbarComponent {

  constructor(private breakpointObserver:BreakpointObserver) { }

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

  @Output() editEvent: EventEmitter<boolean> = new EventEmitter<boolean>()
  edit:boolean = false

  toggleEdit(){
    this.edit = !this.edit
    this.editEvent.emit(this.edit)
  }

}
