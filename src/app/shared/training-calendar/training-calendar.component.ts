import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, HostListener, Inject, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { DateAdapter, MatDateFormats, MAT_DATE_FORMATS } from '@angular/material/core';
import { MatCalendar } from '@angular/material/datepicker';
import { Subject, takeUntil } from 'rxjs';
import { TrainingSession } from 'src/app/core/models/training-session';

@Component({
  selector: 'app-training-calendar',
  templateUrl: './training-calendar.component.html',
  styleUrls: ['./training-calendar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class TrainingCalendarComponent implements OnChanges, AfterViewInit {

  exampleHeader = ExampleHeaderComponent;
  currentMonth: number = 0;
  daysSelected: any[] = [];//to ma byc outputowane przy edycji

  @Input() edit: boolean = false;
  @Input() daysSessioned!: TrainingSession[]// = [{id:3, date: '2022-11-20', title: 'tęż tąrąfąrą' }];

  @Output() changeMonthEvent:EventEmitter<number> = new EventEmitter<number>()
  @Output() daysSelectedEvent:EventEmitter<any[]> = new EventEmitter<any[]>()

  constructor() {}

  @HostListener('click', ['$event.target'])
  onClick(trg: { dataset: { month: string; }; }) {
    if (trg.dataset.month === 'nextMonth') {
      this.currentMonth++;
      this.daysSelected.splice(0,this.daysSelected.length);
      console.log('NEXT: ', this.currentMonth);
      setTimeout(()=>{//zeby po zrenderowaniu kolejnego miesiaca w kalendarzu sie dane zaladowaly - najpierw render kalendarza potem ładować dane
        this.changeMonthEvent.emit(this.currentMonth)
      })
    }
    if (trg.dataset.month === 'prevMonth') {
      this.currentMonth--;
      this.daysSelected.splice(0,this.daysSelected.length);
      console.log('PREV: ', this.currentMonth);
      setTimeout(()=>{
        this.changeMonthEvent.emit(this.currentMonth)
      })
    }
  }

  isSelected = (event: any) => {
    const date = this.dateToString(event)
    let cssClass: string = '';

/*     if (this.daysSessioned.find((x) => x.date == date)) {
      cssClass = 'sessioned';
    } */
    if (this.daysSelected.find((x) => x.date == date)) {
      cssClass = 'selected';
      console.log('moze tu wchodze?')
    }
    return cssClass;
  };

  select(event: any, calendar: any) {
    console.log('EDYCJA Z KLIKA W DZIEŃ: '+this.edit)
    const date = this.dateToString(event)

    

    if(this.edit){
      let ds = this.daysSessioned.find(ds => ds.date == date)
      if(ds) {
        const dateObj = { date: date, id: ds.id };
        const index = this.daysSelected.findIndex((x) => x.date == date);
        if (index < 0) this.daysSelected.push(dateObj);
        else this.daysSelected.splice(index, 1);

        calendar.updateTodaysDate();
        setTimeout(() => {
          //debugger
          this.displayMonth();
        });
        this.daysSelectedEvent.emit(this.daysSelected)
      }
    }else{
      const session:TrainingSession | undefined = this.daysSessioned.find((x) => x.date == date)
      if(session){
        console.log('znalazłem sesje: '+ session.id, session.title)//eventemitter i dialog
      }else{
        console.log('DODAJE NOWY')//router navi
      }
    }
  }

  displayMonth() {
    console.log('displejam mant')
    console.dir(this.daysSelected)
    let x = document.querySelectorAll('.mat-calendar-body-cell');
    x.forEach((y) => {
      let dateFrmAria = new Date(y.getAttribute('aria-label')!)
      let day = dateFrmAria.getDate()
      let dateSearch = this.dateToString(dateFrmAria);
      let data = this.daysSessioned.find((f) => f.date == dateSearch);
      if (data) {
        //y.setAttribute("data-text", data.text);
        y.children[0].innerHTML = day + '<br/>' + data.title;
        y.classList.add('sessioned')
      }

      let dataSel = this.daysSelected.find((f) => f.date == dateSearch);
      //console.log(dataSel)
      if (dataSel) {
        y.classList.remove('sessioned')
        y.classList.add('selected')
      }else{
        y.classList.remove('selected')
      }
    });
  }
  dateToString(date: Date) {
    return (
      date.getFullYear() +
      '-' +
      ('00' + (date.getMonth() + 1)).slice(-2) +
      '-' +
      ('00' + date.getDate()).slice(-2)
    );
  }

  ngOnChanges(): void {
    if(!this.edit){
      this.daysSelected.splice(0,this.daysSelected.length);
      console.log('czyszcze selected')
    }
    setTimeout(() => {
      //debugger
      this.displayMonth();
    });
    console.log('Z AKLENDARZAAA: '+this.edit)
  }

  ngAfterViewInit(): void {
    this.displayMonth()
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

  //nie ma jak do parenta tego wtentegować, dlatego w parencie jest hostlistener na klika. a guziki maja data-month="prevMonth" i "nextMonth"
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
