import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostListener, Inject, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { DateAdapter, MatDateFormats, MAT_DATE_FORMATS } from '@angular/material/core';
import { MatCalendar } from '@angular/material/datepicker';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-training-calendar',
  templateUrl: './training-calendar.component.html',
  styleUrls: ['./training-calendar.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TrainingCalendarComponent implements OnInit {

  exampleHeader = ExampleHeaderComponent;
  currentMonth: number = 0;
  daysSelected: any[] = [{ date: '2022-11-25', text: 'terefere' }];
  daysSessioned: any[] = [{ date: '2022-11-20', text: 'tęż tąrąfąrą' }];
  edit: boolean = true;
  //event: any;

  constructor() {}

  @HostListener('click', ['$event.target'])
  onClick(trg: { dataset: { month: string; }; }) {
    if (trg.dataset.month === 'nextMonth') {
      this.currentMonth++;
      console.log('NEXT: ', this.currentMonth);
    }
    if (trg.dataset.month === 'prevMonth') {
      this.currentMonth--;
      console.log('PREV: ', this.currentMonth);
    }
  }

  isSelected = (event: any) => {
    const date =
      event.getFullYear() +
      '-' +
      ('00' + (event.getMonth() + 1)).slice(-2) +
      '-' +
      ('00' + event.getDate()).slice(-2);
    let cssClass: string = '';

    if (this.daysSessioned.find((x) => x.date == date)) {
      cssClass = 'sessioned';
    }
    if (this.daysSelected.find((x) => x.date == date)) {
      cssClass = 'selected';
    }
    return cssClass;
  };

  isSessioned = (event: any) => {
    //to juz chyba sie nie przyda - poprawic w templatce
    const date =
      event.getFullYear() +
      '-' +
      ('00' + (event.getMonth() + 1)).slice(-2) +
      '-' +
      ('00' + event.getDate()).slice(-2);
    return this.daysSessioned.find((x) => x == date) ? 'selected' : null;
  };

  select(event: any, calendar: any) {
    const date =
      event.getFullYear() +
      '-' +
      ('00' + (event.getMonth() + 1)).slice(-2) +
      '-' +
      ('00' + event.getDate()).slice(-2);

    const dateObj = { date: date, text: 'wer' };

    const index = this.daysSelected.findIndex((x) => x.date == date);
    if (index < 0) this.daysSelected.push(dateObj);
    else this.daysSelected.splice(index, 1);

    calendar.updateTodaysDate();
    setTimeout(() => {
      //debugger
      this.displayMonth();
    });
  }

  displayMonth() {
    //let elements = document.querySelectorAll(".endDate");
    let x = document.querySelectorAll('.mat-calendar-body-cell');
    console.dir(x);
    x.forEach((y) => {
      const dateSearch = this.dateToString(
        new Date(y.getAttribute('aria-label')!)
      );
      //console.log(dateSearch)
      const data = this.daysSelected.find((f) => f.date == dateSearch);
      if (data) {
        //y.setAttribute("data-text", data.text);
        y.innerHTML =
          '<div>' + y.innerHTML + '<br/><br/><br/>' + data.text + '</div>';
        //console.log(y.getAttribute('data-text'));
      }
    });
  }
  dateToString(date: Date) {
    //console.log(date)
    return (
      date.getFullYear() +
      '-' +
      ('00' + (date.getMonth() + 1)).slice(-2) +
      '-' +
      ('00' + date.getDate()).slice(-2)
    );
  }

  ngOnInit(): void {
  }

}


/** Custom header component for datepicker. */
@Component({
  selector: 'example-header',
  styles: [
    `
    .example-header {
      display: flex;
      align-items: center;
      padding: 0.5em;
    }

    .example-header-label {
      flex: 1;
      height: 1em;
      font-weight: 500;
      text-align: center;
    }
  `,
  ],
  template: `
    <div class="example-header" 
    >

      <button mat-icon-button (click)="previousClicked()" data-month="prevMonth">
        <mat-icon data-month="prevMonth">keyboard_arrow_left</mat-icon>
      </button>
      <span class="example-header-label">{{periodLabel}}</span>
      <button mat-icon-button (click)="nextClicked()" data-month="nextMonth">
        <mat-icon data-month="nextMonth">keyboard_arrow_right</mat-icon>
      </button>

    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExampleHeaderComponent<D> implements OnDestroy {
  private _destroyed = new Subject<void>();

  constructor(
    private _calendar: MatCalendar<D>,
    private _dateAdapter: DateAdapter<D>,
    @Inject(MAT_DATE_FORMATS) private _dateFormats: MatDateFormats,
    cdr: ChangeDetectorRef
  ) {
    _calendar.stateChanges
      .pipe(takeUntil(this._destroyed))
      .subscribe(() => cdr.markForCheck());
  }

  //nie ma jak do parenta tego wtentegować
  //@Output() monthEmit: EventEmitter<any> = new EventEmitter<any>();

  ngOnDestroy() {
    this._destroyed.next();
    this._destroyed.complete();
  }

  get periodLabel() {
    return this._dateAdapter
      .format(
        this._calendar.activeDate,
        this._dateFormats.display.monthYearLabel
      )
      .toLocaleUpperCase();
  }

  previousClicked() {
    this._calendar.activeDate = this._dateAdapter.addCalendarMonths(
      this._calendar.activeDate,
      -1
    );
  }

  nextClicked() {
    this._calendar.activeDate = this._dateAdapter.addCalendarMonths(
      this._calendar.activeDate,
      1
    );
  }
}

/**  Copyright 2022 Google LLC. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at https://angular.io/license */
