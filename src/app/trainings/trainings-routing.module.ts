import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../core/guards/auth.guard';
import { MyTrainingSessionComponent } from './my-training-session/my-training-session.component';
import { MyTrainingComponent } from './my-training/my-training.component';
import { MyTrainingsComponent } from './my-trainings/my-trainings.component';
import { MyTrainingsResolver } from './my-trainings/my-trainings.resolver';

const routes: Routes = [
  {path:'', component: MyTrainingsComponent, canActivate: [AuthGuard], data: {animation: 'fader'} /* , resolve: {trainings: MyTrainingsResolver} */},
  {path:':id', component: MyTrainingComponent, canActivate: [AuthGuard], data: {animation: 'fader'} /* , resolve: {trainings: MyTrainingsResolver} */},
  {path:'session/:id', component: MyTrainingSessionComponent, canActivate: [AuthGuard], data: {animation: 'fader'} }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrainingsRoutingModule { }
