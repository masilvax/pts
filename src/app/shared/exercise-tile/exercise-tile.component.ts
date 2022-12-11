import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Exercise } from 'src/app/core/models/exercise';

interface oneSet {
  exerciseId:number,
  setsDone:string
}

@Component({
  selector: 'app-exercise-tile',
  templateUrl: './exercise-tile.component.html',
  styleUrls: ['./exercise-tile.component.scss']
})
export class ExerciseTileComponent implements OnInit {



  @Input() exercise!: Exercise
  @Output() actionEmitter: EventEmitter<Exercise> = new EventEmitter<Exercise>()
  @Output() doneEvent: EventEmitter<oneSet> = new EventEmitter<oneSet>()

  constructor() {
    
  }

  ngOnInit(): void {
    console.log('tere: ', this.exercise)
    this.exercise.zrobione = JSON.parse(this.exercise.zrobione.toString())
    this.exercise.powt = JSON.parse(this.exercise.powt.toString())
    this.exercise.ciezar = JSON.parse(this.exercise.ciezar.toString())
  }

  doneEventEmit(exerciseId:number,setIndex:number,value:number) {
    this.exercise.zrobione[setIndex] = value
    const oneSet = {
      exerciseId: exerciseId,
      setsDone: JSON.stringify(this.exercise.zrobione),
    };
    this.doneEvent.emit(oneSet)
  }

}
