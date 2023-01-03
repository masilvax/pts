import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, combineLatest, map, Observable, switchMap, takeUntil } from 'rxjs';
import { Destroyer } from 'src/app/core/destroyer.class';
import { Exercise } from 'src/app/core/models/exercise';
import { TrainingSession } from 'src/app/core/models/training-session';
import { ScrollService } from 'src/app/core/services/scroll.service';
import { TrainingSessionService } from 'src/app/core/services/training-session.service';
import { DialogAddExerciseComponent } from 'src/app/shared/dialog-add-exercise/dialog-add-exercise.component';
import { DialogCountdownComponent } from 'src/app/shared/dialog-countdown/dialog-countdown.component';
import { DialogAddTrainingSessionComponent } from '../dialog-add-training-session/dialog-add-training-session.component';

@Component({
  selector: 'app-my-training-session',
  templateUrl: './my-training-session.component.html',
  styleUrls: ['./my-training-session.component.scss']
})
export class MyTrainingSessionComponent extends Destroyer implements OnInit {

  //session$!: Observable<TrainingSession>
  sessionId$!: Observable<number>
  refreshSession$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)

  alarm: boolean = false

  session!: TrainingSession
  //sessionId!: number

  isTrainer: boolean = false // for child elmnt (exercise-tile)

  hideHeader$: BehaviorSubject<boolean> = this.scrollSrvc.isScrolled//boolean = false

  constructor(
    private activatedRoute: ActivatedRoute, 
    private srvc:TrainingSessionService,
    private dialog: MatDialog,
    private scrollSrvc: ScrollService) {    
      super()
  }

  editSession(session: TrainingSession) {
    let dateStr:string = session.data.replace(' 00:00:00','')
    const dialogRef = this.dialog.open(DialogAddTrainingSessionComponent,{
      data: {nazwa: session.nazwa,data: dateStr, action: ' Edit'}
    })

    dialogRef.afterClosed().subscribe((result: any) =>{
      console.log(result)
      if(result) {
        this.srvc.saveSession({...session, ...result}).subscribe({
          next: (response) =>{
            console.log(response)
            this.refreshSession$.next(true)
            if(response.odp !== 'OK')
              alert(response.odp)
          }
        })
      }
    })
  }

  editExersise(exercise: Exercise) {//also from tile
    console.log('edit: ', exercise)    

    const dialogRef = this.dialog.open(DialogAddExerciseComponent,{
      data: JSON.parse(JSON.stringify(exercise)),
      maxWidth: '95vw',
      maxHeight: '90vh'
    })

    dialogRef.afterClosed().subscribe(result => {
      console.log(result)
      if(result){
        this.refreshSession$.next(true)
      }
    })
  }

  actionFromTile(exercise: Exercise, action: string) {
    console.log(exercise,action)

    this.srvc.saveExercise(exercise,action).subscribe({
      next: (res) => {
        this.refreshSession$.next(true)
      }
    })
  }

  actionFromToolbar(action: string) {
    console.log(action)
    
    switch (action){
      case 'add':
        this.editExersise({
          id:0,//zero will be added as new to DB
          id_sesji: this.session.id,
          ciezar: [1],
          jedn_intens: 'kg',
          nazwa_krotka: '',
          nazwa: '',
          serie: 1,
          powt: [1],
          zrobione: [0],
          superset: 0
        })
        break

    }
  }

  alarmFromToolbar(alarm: boolean) {
    this.alarm = alarm
  }

  doneUndone(set:any){
    let doneArr = JSON.parse(set.setsDone)

    this.srvc.doneUndone(set.exerciseId,set.setsDone).subscribe({
      next: (res) => {
        console.log(res)
        this.refreshSession$.next(true)
      },
      error: (err) => {
        this.refreshSession$.next(true)
        console.error(err)
      },
      complete: () => {//if subscription completes there's no need to unsubscribe
        console.log('kąplit')
      }
    })

    let exercise = this.session.cwiczenia!.find(ex => ex.id === set.exerciseId)
    if(doneArr.length === set.setIndex +1 && this.session.cwiczenia?.length === exercise?.kolejnosc && doneArr[set.setIndex] === 1){
      alert('KONIEEEEEEC')//TUDU 
      return
    }

    if(doneArr[set.setIndex] === 1 && this.alarm){ // if done and alarm
      const dialogRef = this.dialog.open(DialogCountdownComponent,{
        data: {exercises:this.session.cwiczenia, set: set},
        maxWidth: '95vw',
        minWidth: '246px',
        maxHeight: '90vh',
        panelClass: 'counter-dialog',
        disableClose: true
      })
    }
  }

  ngOnInit(): void {

    this.sessionId$ = this.activatedRoute.params.pipe(map(param => param['id']))

    //this.session$ = 
    combineLatest([this.sessionId$,this.refreshSession$])
    .pipe(
      switchMap(([id]) => this.srvc.myTrainingSession(id)),
      takeUntil(this.destroy$)
    ).subscribe({// subscription needed for training-session (exercises) manipulation in class component (i.e. getting next exercise for countdown)
      next: (session) =>{
        this.session = session
        console.log(this.session)
      },
      error: (err) => {
        console.error(err)
      },
      complete: () => {// i tego mje nie zrobi w combinelatest zdaje się, stad TAKEUNTIL i extend klasy destroyer, w ktorej jest onDestroy 
        console.log('komplet')
      }
    })
  }

}
