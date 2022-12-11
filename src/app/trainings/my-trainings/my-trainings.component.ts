import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, catchError, map, Observable, of, share, Subscription, switchMap, tap } from 'rxjs';
import { Training } from 'src/app/core/models/training';
import { ConfirmDialogService } from 'src/app/core/services/confirm-dialog.service';
import { TrainingsService } from 'src/app/core/services/trainings.service';
import { DialogAddTrainingComponent } from '../dialog-add-training/dialog-add-training.component';

@Component({
  selector: 'app-my-trainings',
  templateUrl: './my-trainings.component.html',
  styleUrls: ['./my-trainings.component.scss']
})
export class MyTrainingsComponent implements OnInit {
  constructor(
    private srvc: TrainingsService,
    //private activatedRoute: ActivatedRoute,
    public dialog: MatDialog,
    private confirmDialogSrvc:ConfirmDialogService
  ) {}

  myTrainings$!: Observable<Training[]>;
  refreshTrainigs$ = new BehaviorSubject<boolean>(false);
  //loader: boolean = false;
  private subscriptions: Subscription[] = []

  addNew(trainingName: string): void {

    const dialogRef = this.dialog.open(DialogAddTrainingComponent, {
      width: '260px',
      data: trainingName,
    });
    
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        console.log('The dialog was closed', result);
        //dodaja nowy trening, czyli subscribe i w srodku:
        let trainig:Training = {
          id:0,
          nazwa:result,
        }
        this.subscriptions.push(
          this.srvc.addNewTraining(trainig).subscribe({
            next: (res) => {
              console.log(res)
              this.refreshTrainigs$.next(true)
            },
            error: (err) => {
              this.refreshTrainigs$.next(true)
              console.error(err)
            }
          })
        )
        
      }
    });
  }

  deleteTraining(t:Training) {
    this.confirmDialogSrvc.confirmDialog({
      title:'Deleting a training plan',
      message: t.nazwa +' - Are you sure?',
      cancelCaption:'No',
      confirmCaption:'Yes'
    }).subscribe((confirm) => {
      if(confirm){
        //alert('number: '+id)
        //this.addNew('terefer-'+id)

        this.subscriptions.push(// not needed - http uncubscribes automatically. But that's one of a few ways to handle (un)subscriptions
          this.srvc.deleteTraining(t.id).subscribe({
            next: (res) => {
              console.log(res)
              this.refreshTrainigs$.next(true)
            },
            error: (err) => {
              this.refreshTrainigs$.next(true)
              console.error(err)
            }
          })
        )
      }
    })
  }

  ngOnInit(): void {
    //this.myTrainings$ = this.srvc.myTrainings()

    //to nie zdaje egzaminu, bo z resolvera ma na stałe dane, więc po update'cie nie ma bata, zeby mial tam swieze dane
    /*this.myTrainings$ = this.activatedRoute.data.pipe(
      map((data) => data?.['trainings']),
      share()
    ); */
    this.myTrainings$ = this.refreshTrainigs$.pipe(
      switchMap(() => this.srvc.myTrainings()),
      share()
    );

  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe())
  }
}
