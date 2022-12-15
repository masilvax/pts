import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginRegisterComponent } from './login-register/login-register.component';

const routes: Routes = [
  {path:'', component: LoginRegisterComponent, data: {animation: 'fader'}}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
