import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { ConfirmDialog } from '../models/confirm-dialog';

@Injectable({
  providedIn: 'root'
})
export class ConfirmDialogService {

  constructor(private dialog: MatDialog) { }

  confirmDialog(data:ConfirmDialog): Observable<boolean> {
    return this.dialog.open(ConfirmDialogComponent, {
      data,
      width: '400px',
      disableClose: true,
    }).afterClosed()
  }
}
