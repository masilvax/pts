import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-add-training-session',
  templateUrl: './dialog-add-training-session.component.html',
  styleUrls: ['./dialog-add-training-session.component.scss']
})
export class DialogAddTrainingSessionComponent {

  constructor(
    public dialogRef: MatDialogRef<DialogAddTrainingSessionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {action:string,name:string,date:string},
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
