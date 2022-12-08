import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from './navigation/navigation.component';
import { UserTrayComponent } from './user-tray/user-tray.component';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { TrainingTileComponent } from './training-tile/training-tile.component';
import { MatCardModule } from '@angular/material/card';
import { LoadingComponent } from './loading/loading.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { TrainingCalendarComponent,ExampleHeaderComponent } from './training-calendar/training-calendar.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ExerciseTileComponent } from './exercise-tile/exercise-tile.component';
import {MatCheckboxModule} from '@angular/material/checkbox'; 
import { FormsModule } from '@angular/forms';
import { CheckboxValueDirective } from '../core/directives/checkbox-value.directive';

@NgModule({
  declarations: [
    NavigationComponent,
    UserTrayComponent,
    TrainingTileComponent,
    LoadingComponent,
    ConfirmDialogComponent,
    TrainingCalendarComponent,
    ExampleHeaderComponent,
    ExerciseTileComponent,
    CheckboxValueDirective
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatProgressBarModule,
    MatDialogModule,
    MatDatepickerModule,
    MatCheckboxModule,
    FormsModule
  ],
  exports: [
    NavigationComponent,
    UserTrayComponent,
    TrainingTileComponent,
    LoadingComponent,
    ConfirmDialogComponent,
    TrainingCalendarComponent,
    ExerciseTileComponent
  ]
})
export class SharedModule { }
