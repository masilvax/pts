import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TrainingsRoutingModule } from './trainings-routing.module';
import { MyTrainingsComponent } from './my-trainings/my-trainings.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SharedModule } from '../shared/shared.module';
import { MyTrainingsToolbarComponent } from './my-trainings-toolbar/my-trainings-toolbar.component';
import { DialogAddTrainingComponent } from './dialog-add-training/dialog-add-training.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MyTrainingComponent } from './my-training/my-training.component';
import { MyTrainingToolbarComponent } from './my-training-toolbar/my-training-toolbar.component';
import { MatCardModule } from '@angular/material/card';
import { MyTrainingSessionComponent } from './my-training-session/my-training-session.component';


@NgModule({
  declarations: [
    MyTrainingsComponent,
    MyTrainingsToolbarComponent,
    DialogAddTrainingComponent,
    MyTrainingComponent,
    MyTrainingToolbarComponent,
    MyTrainingSessionComponent
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
