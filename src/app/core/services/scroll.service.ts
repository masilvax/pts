import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScrollService {

  isScrolled:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)

  constructor() { }

  scroll() {
    this.isScrolled.next(true)
  }

  unscroll() {
    this.isScrolled.next(false)
  }
}
