import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path:'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule) },
  { path:'', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  { path:'trainings', loadChildren: () => import('./trainings/trainings.module').then(m => m.TrainingsModule) },
  /* { path: '**', component: LoginRegisterComponent } */
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
