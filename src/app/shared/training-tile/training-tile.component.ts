import { Component, Input } from '@angular/core';
import { Training } from 'src/app/core/models/training';

@Component({
  selector: 'app-training-tile',
  templateUrl: './training-tile.component.html',
  styleUrls: ['./training-tile.component.scss']
})
export class TrainingTileComponent {

  constructor() { }

  @Input() training!:Training

}
