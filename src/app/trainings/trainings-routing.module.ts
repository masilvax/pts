import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../core/guards/auth.guard';
import { MyTrainingsComponent } from './my-trainings/my-trainings.component';
import { MyTrainingsResolver } from './my-trainings/my-trainings.resolver';

const routes: Routes = [
  {path:'', component: MyTrainingsComponent, canActivate: [AuthGuard]/* , resolve: {trainings: MyTrainingsResolver} */}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrainingsRoutingModule { }
