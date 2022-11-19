import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable, switchMap } from 'rxjs';
import { Training } from 'src/app/core/models/training';
import { TrainingsService } from 'src/app/core/services/trainings.service';

@Component({
  selector: 'app-my-training',
  templateUrl: './my-training.component.html',
  styleUrls: ['./my-training.component.scss']
})
export class MyTrainingComponent implements OnInit {

  constructor(private activatedRoute:ActivatedRoute, private router:Router, private srvc:TrainingsService) { }

  training$!:Observable<Training>

  ngOnInit(): void {
    this.training$ = this.activatedRoute.params.pipe(
      map((param) => param?.['id']),
      switchMap(id => this.srvc.myTraining(id))
      
    )
  }

}
