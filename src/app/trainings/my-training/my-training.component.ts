import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, combineLatest, map, Observable, switchMap } from 'rxjs';
import { Training } from 'src/app/core/models/training';
import { TrainingsService } from 'src/app/core/services/trainings.service';
import { DialogAddTrainingSessionComponent } from '../dialog-add-training-session/dialog-add-training-session.component';

@Component({
  selector: 'app-my-training',
  templateUrl: './my-training.component.html',
  styleUrls: ['./my-training.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MyTrainingComponent implements OnInit {

  constructor(
    private activatedRoute:ActivatedRoute, 
    private router:Router, 
    private srvc:TrainingsService, 
    public dialog:MatDialog
  ) { }

  idTraining$!:Observable<number>
  training$!:Observable<Training>
  monthSelectedSub$:BehaviorSubject<number> = new BehaviorSubject<number>(0)//do dswiezania tez sie przydaje
  monthSelected:number = 0 // tylko do przekazania miesiaca do subjecta po akcji z toolbara w celu odswiezenia danych
  edit:boolean = false
  daysSelected:any[] = []
  

  actionFromChildToolbar(action: string): void {
    console.log(action,this.daysSelected)
    this.srvc.trainingSessionsAction(this.daysSelected, action).subscribe({
      next: () => {
        this.daysSelected.splice(0,this.daysSelected.length)
        setTimeout(()=>{
          this.monthSelectedSub$.next(this.monthSelected)
        })
      },
      error: (err) => {
        this.daysSelected.splice(0,this.daysSelected.length)
        this.monthSelectedSub$.next(this.monthSelected)
        console.error(err)
      }
    })
  }
  
  editFromChildToolbar(edit:boolean) {
    this.edit = edit
    console.log('EDYCJAAA: '+this.edit)
  }

  changeMonthFromChildCalendar(month:number) {
    console.log('miesiac: '+month)
    this.monthSelected = month
    this.monthSelectedSub$.next(month)
  }

  daysSelectedFromChildCalendar(days: any[]) {
    this.daysSelected = days
  }

  addNewSessionFromChildCalendar(event:{date: string, trainingId:number}){
    console.log('ADDING NEW FOR: ',event)
    const dialogRef = this.dialog.open(DialogAddTrainingSessionComponent, {
      data: {nazwa:'', data:event.date, action:'Add new' }
    })

    dialogRef.afterClosed().subscribe((result: any) =>{
      console.log(result)
      if(result) {
        this.srvc.saveSession({id:0, id_treningu:event.trainingId , ...result}).subscribe({
          next: (response) =>{
            console.log(response)
            setTimeout(()=>{
              this.monthSelectedSub$.next(this.monthSelected)
            })
            if(response.odp !== 'OK')
              alert(response.odp)
          }
        })
      }
    })
  }

  // for range of months needed in backend
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

    this.idTraining$ = this.activatedRoute.params.pipe(map((param)=> param?.['id']))
    //this.monthSelected$ = this.monthSelectedSub$.asObservable()

    this.training$ = combineLatest([this.idTraining$,this.monthSelectedSub$])//, (id,month) => {return this.srvc.myTraining(id)})
    .pipe(
      //map(([id,month])=>({this.srvc.myTraining(id)})),
      switchMap(([id,month]) => {
        return this.srvc.myTraining(id,this.addMonths(month))
      })
    )

  }

}
