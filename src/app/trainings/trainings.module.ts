import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TrainingsRoutingModule } from './trainings-routing.module';
import { MyTrainingsComponent } from './my-trainings/my-trainings.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SharedModule } from '../shared/shared.module';
import { DialogAddTrainingComponent } from './dialog-add-training/dialog-add-training.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MyTrainingComponent } from './my-training/my-training.component';
import { MatCardModule } from '@angular/material/card';
import { MyTrainingSessionComponent } from './my-training-session/my-training-session.component';
import { DialogAddTrainingSessionComponent } from './dialog-add-training-session/dialog-add-training-session.component';


@NgModule({
  declarations: [
    MyTrainingsComponent,
    DialogAddTrainingComponent,
    MyTrainingComponent,
    MyTrainingSessionComponent,
    DialogAddTrainingSessionComponent
  ],
  imports: [
    CommonModule,
    TrainingsRoutingModule,
    MatToolbarModule,
    MatDialogModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatCardModule,
    SharedModule
  ]
})
export class TrainingsModule { }
