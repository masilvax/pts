import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from './navigation/navigation.component';
import { UserTrayComponent } from './user-tray/user-tray.component';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { TrainingTileComponent } from './training-tile/training-tile.component';
import { MatCardModule } from '@angular/material/card';


@NgModule({
  declarations: [
    NavigationComponent,
    UserTrayComponent,
    TrainingTileComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatCardModule
  ],
  exports: [
    NavigationComponent,
    UserTrayComponent,
    TrainingTileComponent
  ]
})
export class SharedModule { }
