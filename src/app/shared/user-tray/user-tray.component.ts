import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/core/models/user';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-user-tray',
  templateUrl: './user-tray.component.html',
  styleUrls: ['./user-tray.component.scss']
})
export class UserTrayComponent{

  constructor(private auth:AuthService) { }

  loggedUser$:Observable<User | null> = this.auth.userSubject

  logout() {
    this.auth.logout()
  }

}
