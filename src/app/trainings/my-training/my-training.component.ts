import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, combineLatest, map, Observable, switchMap } from 'rxjs';
import { Training } from 'src/app/core/models/training';
import { TrainingsService } from 'src/app/core/services/trainings.service';

@Component({
  selector: 'app-my-training',
  templateUrl: './my-training.component.html',
  styleUrls: ['./my-training.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MyTrainingComponent implements OnInit {

  constructor(private activatedRoute:ActivatedRoute, private router:Router, private srvc:TrainingsService) { }

  idichuj$!:Observable<number>
  training$!:Observable<Training>
  monthSelectedSub$:BehaviorSubject<number> = new BehaviorSubject<number>(0)
  monthSelected:number = 0 // tylko do przekazania miesiaca do subjecta po akcji z toolbara w celu odswiezenia danych
  edit:boolean = false
  daysSelected:any[] = []
  //monthSelected$!:Observable<number>
  

  actionFromChild(action: string): void {
    console.log(action,this.daysSelected)
    this.monthSelectedSub$.next(this.monthSelected)
  }
  
  editFromChild(edit:boolean) {
    this.edit = edit
    console.log('EDYCJAAA: '+this.edit)
  }

  changeMonthFromChild(month:number) {
    console.log('miesiac: '+month)
    this.monthSelected = month
    this.monthSelectedSub$.next(month)
  }

  daysSelectedFromChild(days: any[]) {
    this.daysSelected = days
  }

  addMonths(numOfMonths:number, date = new Date()) {
    date.setMonth(date.getMonth() + numOfMonths);
    return this.dateToString(date);
  }
  dateToString(date: Date) {
    return (
      date.getFullYear() +
      '-' +
      ('00' + (date.getMonth() + 1)).slice(-2) +
      '-' +
      ('00' + date.getDate()).slice(-2)
    );
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
/*         let datex = '2022-11-05'
        if (month>0){
          datex = '2022-12-05'
        }
        if (month < 0){
          datex = '2022-10-05'
        } */
        return this.srvc.myTraining(id,this.addMonths(month))
      })
    )

  }

}
