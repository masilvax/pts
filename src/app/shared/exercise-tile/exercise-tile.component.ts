import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Exercise } from 'src/app/core/models/exercise';

interface OneSet {
  exerciseId:number,
  setsDone:string,
  setIndex:number
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
    if(this.exercise.zrobione.length > 0) {
      this.exercise.zrobione = JSON.parse(this.exercise.zrobione.toString())
      if(this.exercise.zrobione.length !== this.exercise.serie){
        console.log('zrobione niezgodne z l. serii - zrobione: ' + this.exercise.zrobione.toString() + ', l.serii: ' + this.exercise.serie)
      }
    } else {
      this.exercise.zrobione = []
      for(let i=0; i<this.exercise.serie; i++){
        this.exercise.zrobione.push(0)
      }
    }
    
    this.exercise.powt = JSON.parse(this.exercise.powt.toString())
    this.exercise.ciezar = JSON.parse(this.exercise.ciezar.toString())
  }

  doneEventEmit(exerciseId:number,setIndex:number,value:number) {
    this.exercise.zrobione[setIndex] = value
    const oneSet = {
      exerciseId: exerciseId,
      setsDone: JSON.stringify(this.exercise.zrobione),
      setIndex: setIndex
    };
    this.doneEvent.emit(oneSet)
  }

}
