import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { merge, Observable, Subject, takeUntil, timer } from 'rxjs';
import { Destroyer } from 'src/app/core/destroyer.class';
import { Exercise } from 'src/app/core/models/exercise';

@Component({
  selector: 'app-dialog-countdown',
  templateUrl: './dialog-countdown.component.html',
  styleUrls: ['./dialog-countdown.component.scss']
})
export class DialogCountdownComponent extends Destroyer implements OnInit {

  nextMessage: string[] = []
  pasueTime:number = 0
  timeLeft:number = 0
  percentageCountdown:number = 0
  countdown$:Observable<number> = timer(0,1000)
  timesUp$:Subject<boolean> = new Subject<boolean>()

  constructor(
    private dialogRef:MatDialogRef<DialogCountdownComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {exercises: Exercise[], set: {setsDone:string, setIndex: number, exerciseId: number}}
  ) {
    super()
  }

  ngOnInit(): void {
    let doneArr = JSON.parse(this.data.set.setsDone)
    
    console.log(doneArr.length, this.data.set.setIndex)
    let exercise = this.data.exercises.find(ex => ex.id === this.data.set.exerciseId)
    
    if(doneArr.length > (this.data.set.setIndex+1)) {//next set
      this.pasueTime = exercise?.przerwy_serie!
      //sprawdzic czy poprzedni ma superseta
      this.getSupersetPrevExercise(exercise?.id, this.data.set.setIndex)
      this.nextMessage.push( exercise?.nazwa_krotka + ' - ' + exercise?.powt[this.data.set.setIndex+1] + ' x ' + exercise?.ciezar[this.data.set.setIndex+1] + exercise?.jedn_intens)
    }
    
    if (doneArr.length <= (this.data.set.setIndex+1)) {//next exercise
      this.pasueTime = exercise?.przerwa_po!
      let order = exercise?.kolejnosc
      let nextExercise = this.data.exercises.find(ex => ex.kolejnosc === order! + 1)
      this.nextMessage.push(nextExercise?.nazwa_krotka + ' - ' + nextExercise?.powt[0] + ' x ' + nextExercise?.ciezar[0] + nextExercise?.jedn_intens)
      //sprawdzic czy nastepny ma superseta
    }
    this.timeLeft = this.pasueTime

    this.startCountdown()

  }

  startCountdown() {
    this.countdown$.pipe(
      takeUntil(merge(this.timesUp$, this.destroy$))
    ).subscribe(val => {
      this.timeLeft--
      if(this.timeLeft < 1){
        this.pauseCountdown()
      }
      console.log(this.timeLeft,val)
    })
  }

  pauseCountdown() {
    this.timesUp$.next(false)
  }

  stopCountdown() {
    this.timeLeft = this.pasueTime
    this.pauseCountdown()
  }

  getSupersetNextExercise(exerciseId:number | undefined): string {
    return ''
  }

  getSupersetPrevExercise(exerciseId:number | undefined, setIndex:number) {
    let exercise = this.data.exercises.find(ex => ex.id === exerciseId)
    let order = exercise?.kolejnosc
    if(order && order > 1){
      let prevExercise = this.data.exercises.find(ex => ex.kolejnosc === order! - 1)
      if(prevExercise?.superset === 1){
        this.getSupersetPrevExercise(prevExercise?.id, setIndex) 
        this.nextMessage.push(prevExercise?.nazwa_krotka + ' ' + prevExercise?.powt[setIndex+1] + 'x' + prevExercise?.ciezar[setIndex+1] + (prevExercise?.jedn_intens !=='BW' ? prevExercise?.jedn_intens : '') )
      }
    }
  }

}
