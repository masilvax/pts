import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-add-training',
  templateUrl: './dialog-add-training.component.html',
  styleUrls: ['./dialog-add-training.component.scss']
})
export class DialogAddTrainingComponent {

  constructor(
    public dialogRef: MatDialogRef<DialogAddTrainingComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {name:string,action:string},
  ) {}

}
