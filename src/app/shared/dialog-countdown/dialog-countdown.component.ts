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
  pauseTime:number = 0
  timeLeft:number = 0
  paused:boolean = false
  percentageCountdown:number = 100
  countdown$:Observable<number> = timer(1000,1000)
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
    let order = exercise?.kolejnosc
    let endOfTrainingSession:boolean = false

    if(order && this.data.exercises.length === order && doneArr.length <= (this.data.set.setIndex+1)){
      alert('koniec treinngu w dialog-countdown - nie powinien tu wejść w ogóle')
      endOfTrainingSession = true
    }

    if(!endOfTrainingSession){
      if(doneArr.length > (this.data.set.setIndex+1)) {//next set
        this.pauseTime = exercise?.przerwy_serie!
        //sprawdzic czy poprzednie cwicznie ma superseta
        this.getSupersetPrevExercise(exercise?.id, this.data.set.setIndex)
        this.nextMessage.push( exercise?.nazwa_krotka + ' - ' + exercise?.powt[this.data.set.setIndex+1] + ' x ' + exercise?.ciezar[this.data.set.setIndex+1] + (exercise?.jedn_intens !== 'BW' ? exercise?.jedn_intens : ''))
      }
      
      if (doneArr.length <= (this.data.set.setIndex+1)) {//next exercise
        this.pauseTime = exercise?.przerwa_po!
        //sprawdzic czy nastepne cwiczenia ma superseta
        this.getSupersetNextExercise(exercise?.id)
      }
      this.timeLeft = this.pauseTime
      this.startCountdown(true)
    }
  }

  startCountdown(firstRun:boolean = false) {
    this.percentageCountdown = (firstRun)? 100 : (this.timeLeft-1)/this.pauseTime * 100 //only because of shift
    this.paused = false
    this.countdown$.pipe(
      takeUntil(merge(this.timesUp$, this.destroy$))
    ).subscribe(val => {
      this.timeLeft = this.timeLeft > 1 ? this.timeLeft-1 : 0
      this.percentageCountdown = (this.timeLeft - 1)/this.pauseTime * 100
      if(this.timeLeft < 1){
        this.pauseCountdown()
        var audio = new Audio('../../../assets/alarm1.mp3'); //szfarcwalt-czopa.mp3
        //audio.volume = 0.1;
        audio.play();
      }
      //console.log(this.timeLeft,val)
    })
  }

  pauseCountdown() {
    this.paused = true
    this.timesUp$.next(false)
  }

  stopCountdown() {
    this.timeLeft = this.pauseTime
    this.percentageCountdown = 100
    this.pauseCountdown()
  }

  getSupersetNextExercise(exerciseId:number | undefined) {
    let exercise = this.data.exercises.find(ex => ex.id === exerciseId)
    let order = exercise?.kolejnosc
    if(order && order < this.data.exercises.length){
      let nextExercise = this.data.exercises.find(ex => ex.kolejnosc === order! + 1)
      this.nextMessage.push(nextExercise?.nazwa_krotka + ' ' + nextExercise?.powt[0] + ' x ' + nextExercise?.ciezar[0] + (nextExercise?.jedn_intens !=='BW' ? nextExercise?.jedn_intens : '') )
      if(nextExercise?.superset === 1){
        this.getSupersetNextExercise(nextExercise?.id) 
      }
    }
  }

  getSupersetPrevExercise(exerciseId:number | undefined, setIndex:number) {
    let exercise = this.data.exercises.find(ex => ex.id === exerciseId)
    let order = exercise?.kolejnosc
    if(order && order > 1){
      let prevExercise = this.data.exercises.find(ex => ex.kolejnosc === order! - 1)
      if(prevExercise?.superset === 1){
        this.getSupersetPrevExercise(prevExercise?.id, setIndex) 
        this.nextMessage.push(prevExercise?.nazwa_krotka + ' ' + prevExercise?.powt[setIndex+1] + ' x ' + prevExercise?.ciezar[setIndex+1] + (prevExercise?.jedn_intens !=='BW' ? prevExercise?.jedn_intens : '') )
      }
    }
  }

}
