import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Exercise } from 'src/app/core/models/exercise';

interface OneSet {
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
  @Input() isTrainer!: boolean
  @Input() isFirst!: boolean
  @Input() isLast!: boolean
  
  @Output() editEvent: EventEmitter<Exercise> = new EventEmitter<Exercise>()
  @Output() supersetEvent: EventEmitter<Exercise> = new EventEmitter<Exercise>()
  @Output() unsupersetEvent: EventEmitter<Exercise> = new EventEmitter<Exercise>()
  @Output() moveUpEvent: EventEmitter<Exercise> = new EventEmitter<Exercise>()
  @Output() moveDownEvent: EventEmitter<Exercise> = new EventEmitter<Exercise>()
  @Output() deleteEvent: EventEmitter<Exercise> = new EventEmitter<Exercise>()

  @Output() doneEvent: EventEmitter<OneSet> = new EventEmitter<OneSet>()

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
