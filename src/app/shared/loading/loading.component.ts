import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { LoadingService } from 'src/app/core/services/loading.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit {

  loading: Subject<boolean> = this.load.isLoading;

  constructor(private load:LoadingService) { }

  ngOnInit(): void {
  }

}