/* import { Directive, Input } from '@angular/core';
import { MatCheckbox } from '@angular/material/checkbox';

@Directive({
  selector: 'mat-checkbox[checkboxValue]',
  exportAs: 'checkboxValue'
})
export class CheckboxValueDirective {

  constructor() { }

  @Input('checkboxValue') checkbox!: MatCheckbox;
  @Input() falseValue: string = '0';
  @Input() trueValue: string = '1';

  ngOnInit() {
    this.checkbox.value = this.checkbox.checked ? this.trueValue : this.falseValue;
    this.checkbox.registerOnChange((checked: boolean) => {
      this.checkbox.value = checked ? this.trueValue : this.falseValue;
    })
  }

}
 */
import { Directive, Input, Optional, Self } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { MatCheckbox } from '@angular/material/checkbox';

@Directive({
  selector: 'mat-checkbox[appCheckboxValue]'
})
export class CheckboxValueDirective implements ControlValueAccessor {
  @Input() trueValue = '1';
  @Input() falseValue = '0';

  constructor(@Optional() @Self() private ngControl: NgControl, private checkbox: MatCheckbox) {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  writeValue(value: any): void {
    this.checkbox.writeValue(value === parseInt(this.trueValue));
  }

  registerOnChange(fn: any): void {
    this.checkbox.registerOnChange((checked: boolean) => {
      fn(checked ? parseInt(this.trueValue) : parseInt(this.falseValue));
    });
  }

  registerOnTouched(fn: any): void {
    this.checkbox.registerOnTouched(fn);
  }

  setDisabledState?(isDisabled: boolean): void {
    this.checkbox.setDisabledState(isDisabled);
  }
}