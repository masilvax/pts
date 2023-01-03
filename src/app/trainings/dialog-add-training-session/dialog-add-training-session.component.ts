import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-add-training-session',
  templateUrl: './dialog-add-training-session.component.html',
  styleUrls: ['./dialog-add-training-session.component.scss']
})
/* no save to DB here. when adding new we need train-session id for url navigation */
export class DialogAddTrainingSessionComponent {

  constructor(
    public dialogRef: MatDialogRef<DialogAddTrainingSessionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {action:string,nazwa:string,data:string},
  ) {}

  onSubmit(): void {
    let date:Date = new Date(this.data.data)
    this.data.data = date.getFullYear() + '-' + (date.getMonth()+1) +'-'+ date.getDate()
    this.dialogRef.close(this.data);
  }

}
