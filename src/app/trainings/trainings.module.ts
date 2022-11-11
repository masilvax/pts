import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TrainingsRoutingModule } from './trainings-routing.module';
import { MyTrainingsComponent } from './my-trainings/my-trainings.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    MyTrainingsComponent
  ],
  imports: [
    CommonModule,
    TrainingsRoutingModule,
    MatToolbarModule,
    SharedModule
  ]
})
export class TrainingsModule { }
