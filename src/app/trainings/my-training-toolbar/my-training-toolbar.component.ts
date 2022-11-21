import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { map, Observable, shareReplay } from 'rxjs';

@Component({
  selector: 'app-my-training-toolbar',
  templateUrl: './my-training-toolbar.component.html',
  styleUrls: ['./my-training-toolbar.component.scss']
})
export class MyTrainingToolbarComponent implements OnInit {

  constructor(private breakpointObserver:BreakpointObserver) { }

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  .pipe(
    map(result => result.matches),
    shareReplay()
  );

  @Output() addNewTrainingEvent: EventEmitter<string> = new EventEmitter<string>()

  @Output() editEvent: EventEmitter<boolean> = new EventEmitter<boolean>()
  edit:boolean = false

  toggleEdit(){
    this.edit = !this.edit
    this.editEvent.emit(this.edit)
  }

  ngOnInit(): void {
  }

}
