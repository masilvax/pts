import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Training } from 'src/app/core/models/training';
import { TrainingsService } from 'src/app/core/services/trainings.service';

@Component({
  selector: 'app-my-trainings',
  templateUrl: './my-trainings.component.html',
  styleUrls: ['./my-trainings.component.scss']
})
export class MyTrainingsComponent implements OnInit {

  constructor(private srvc:TrainingsService) { }

  myTrainings$!:Observable<Training[]>

  ngOnInit(): void {
    this.myTrainings$ = this.srvc.myTrainings()
  }

}
