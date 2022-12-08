import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Exercise } from 'src/app/core/models/exercise';

@Component({
  selector: 'app-training-session-tile',
  templateUrl: './exercise-tile.component.html',
  styleUrls: ['./exercise-tile.component.scss']
})
export class ExerciseTileComponent implements OnInit {

  @Input() exercise!: Exercise
  @Output() actionEmitter: EventEmitter<Exercise> = new EventEmitter<Exercise>()

  constructor() {
    
  }

  ngOnInit(): void {
    console.log('tere: ', this.exercise)
    this.exercise.zrobione = JSON.parse(this.exercise.zrobione.toString())
    this.exercise.powt = JSON.parse(this.exercise.powt.toString())
    this.exercise.ciezar = JSON.parse(this.exercise.ciezar.toString())
  }

}
