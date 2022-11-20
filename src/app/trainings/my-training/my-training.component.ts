import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, combineLatest, map, Observable, switchMap } from 'rxjs';
import { Training } from 'src/app/core/models/training';
import { TrainingsService } from 'src/app/core/services/trainings.service';

@Component({
  selector: 'app-my-training',
  templateUrl: './my-training.component.html',
  styleUrls: ['./my-training.component.scss']
})
export class MyTrainingComponent implements OnInit {

  constructor(private activatedRoute:ActivatedRoute, private router:Router, private srvc:TrainingsService) { }

  training$!:Observable<Training>
  monthSelectedSub$:BehaviorSubject<number> = new BehaviorSubject<number>(0)
  monthSelected:number = 0
  //monthSelected$!:Observable<number>
  idichuj$!:Observable<number>

  addNew(trainingName: string): void {}

  changeMonth(direction: 'next' | 'prev'): void {
    direction === 'next' ? this.monthSelectedSub$.next(++this.monthSelected) : this.monthSelectedSub$.next(--this.monthSelected)


/*     this.training$ = this.monthSelectedSub$.pipe(
      switchMap(selMonth => this.srvc.myTraining(4))
    ) */
  }

  

  ngOnInit(): void {
/*     this.training$ = this.activatedRoute.params.pipe(
      map((param) => param?.['id']),
      switchMap(id => this.srvc.myTraining(id))
      
    ) */

    this.idichuj$ = this.activatedRoute.params.pipe(map((param)=> param?.['id']))
    //this.monthSelected$ = this.monthSelectedSub$.asObservable()

    this.training$ = combineLatest(this.idichuj$,this.monthSelectedSub$)//, (id,month) => {return this.srvc.myTraining(id)})
    .pipe(
      //map(([id,month])=>({this.srvc.myTraining(id)})),
      switchMap(([id,month]) => {
        let datex = '2022-11-05'
        if (month>0){
          datex = '2022-12-05'
        }
        if (month < 0){
          datex = '2022-10-05'
        }
        return this.srvc.myTraining(id,datex)
      })
    )

  }

}
