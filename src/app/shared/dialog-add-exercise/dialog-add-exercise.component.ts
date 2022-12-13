import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Exercise } from 'src/app/core/models/exercise';
import { TrainingSessionService } from 'src/app/core/services/training-session.service';

@Component({
  selector: 'app-dialog-add-exercise',
  templateUrl: './dialog-add-exercise.component.html',
  styleUrls: ['./dialog-add-exercise.component.scss']
})
export class DialogAddExerciseComponent implements OnInit {

  loader:boolean = false

  constructor(
    private dialogRef:MatDialogRef<DialogAddExerciseComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Exercise,
    private srvc: TrainingSessionService
  ) { }

  onSave() {
    this.loader = true
    console.log(this.data.ciezar)
    this.srvc.saveExercise(this.data).subscribe({
      next: (res) => {
        console.log(res)
        this.loader = false
        if(res.odp!=='OK'){
          alert(res.odp)
        } else {
          this.dialogRef.close(true);
        }
      }/* ,
      complete: () => {
        console.log('zakomentowane, bo kompletuje. kompletuje to nie trzeba unsubscribe'a')
      } */
    })
  }

  trackByFn(index: any, item: any) {// without tracking, focus is lost after every digit typed in (ngModel with dynamically created array)
    return index;
  }

  addSet() {
    if (this.data.serie < 99) {
      this.data.ciezar.push(this.data.ciezar[this.data.ciezar.length - 1]);
      this.data.powt.push(this.data.powt[this.data.powt.length - 1]);
      this.data.zrobione.push(0);
      this.data.serie++;
    }
    console.log(this.data)
  }
  removeSet() {
    if (this.data.serie > 1) {
      this.data.ciezar = this.data.ciezar.slice(0, -1);
      this.data.powt = this.data.powt.slice(0, -1);
      this.data.zrobione = this.data.zrobione.slice(0, -1);
      this.data.serie--;
    }
    console.log(this.data)
  }

  ngOnInit(): void {
  }

}
