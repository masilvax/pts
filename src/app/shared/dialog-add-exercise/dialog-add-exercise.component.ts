import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Exercise } from 'src/app/core/models/exercise';

@Component({
  selector: 'app-dialog-add-exercise',
  templateUrl: './dialog-add-exercise.component.html',
  styleUrls: ['./dialog-add-exercise.component.scss']
})
export class DialogAddExerciseComponent implements OnInit {

  constructor(
    private dialogRef:MatDialogRef<DialogAddExerciseComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Exercise
  ) { }

  onSave() {
    console.log(this.data.ciezar)
    this.data.ciezar.push(5)
  }

  ngOnInit(): void {
  }

}
