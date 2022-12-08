import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, combineLatest, map, Observable, switchMap } from 'rxjs';
import { Exercise } from 'src/app/core/models/exercise';
import { Training } from 'src/app/core/models/training';
import { TrainingSession } from 'src/app/core/models/training-session';
import { TrainingSessionService } from 'src/app/core/services/training-session.service';

@Component({
  selector: 'app-my-training-session',
  templateUrl: './my-training-session.component.html',
  styleUrls: ['./my-training-session.component.scss']
})
export class MyTrainingSessionComponent implements OnInit {

  session$!: Observable<TrainingSession>
  sessionId$!: Observable<number>
  refreshSession$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)

  constructor(private activatedRoute: ActivatedRoute, private srvc:TrainingSessionService) { }

  addExercise(exercise: Exercise){
    console.log(exercise)
    this.refreshSession$.next(true)
  }

  ngOnInit(): void {

    this.sessionId$ = this.activatedRoute.params.pipe(map(param => param['id']))

    this.session$ = combineLatest([this.sessionId$,this.refreshSession$])
    .pipe(
      switchMap(([id]) => {
        return this.srvc.myTrainingSession(id)
      })
    )
  }

}
