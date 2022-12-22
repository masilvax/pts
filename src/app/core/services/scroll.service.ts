import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScrollService {

  isScrolled:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)

  constructor() { }

  scroll() {
    console.log('skroluje')
    this.isScrolled.next(true)
  }

  unscroll() {
    console.log('odskrolowywowuje')
    this.isScrolled.next(false)
  }
}
