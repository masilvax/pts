import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  isLoading = new Subject<boolean>();

  constructor() {
  }

  show() {
    console.log('pokazuje loader') 
    this.isLoading.next(true);
  }

  hide() {
    console.log('chowam loader')
     this.isLoading.next(false);
  }
}