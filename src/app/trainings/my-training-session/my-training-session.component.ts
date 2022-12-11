import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, combineLatest, map, Observable, switchMap, takeUntil } from 'rxjs';
import { Destroyer } from 'src/app/core/destroyer.class';
import { Exercise } from 'src/app/core/models/exercise';
import { TrainingSession } from 'src/app/core/models/training-session';
import { TrainingSessionService } from 'src/app/core/services/training-session.service';

@Component({
  selector: 'app-my-training-session',
  templateUrl: './my-training-session.component.html',
  styleUrls: ['./my-training-session.component.scss']
})
export class MyTrainingSessionComponent extends Destroyer implements OnInit {

  session$!: Observable<TrainingSession>
  sessionId$!: Observable<number>
  refreshSession$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)

  session!: TrainingSession
  sessionId!: number

  constructor(private activatedRoute: ActivatedRoute, private srvc:TrainingSessionService) {
    super()
  }

  addExercise(exercise: Exercise){
    console.log(exercise)
    this.refreshSession$.next(true)
  }

  doneUndone(set:any){
    console.log(set)

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
