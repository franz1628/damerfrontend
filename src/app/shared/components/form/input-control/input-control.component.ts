import { Component, Input, forwardRef } from '@angular/core';
import { FormBuilder, FormGroup, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-input-control',
  templateUrl: './input-control.component.html',
  styleUrls: ['./input-control.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputControlComponent),
      multi: true,
    },
  ],
})
export class InputControlComponent implements ControlValueAccessor {
  @Input() textControl: string = '';
  @Input() idControl: string = '';

  public myForm: FormGroup = this.fb.group({
    [this.idControl]: [''],
  });

  get formControl() {
    return this.myForm.controls[this.idControl];
  }

  // Implementación de ControlValueAccessor
  onChange: any = (_: any) => {};
  onTouch: any = () => {};

  writeValue(value: any): void {
    this.myForm.patchValue({ [this.idControl]: value });
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    isDisabled ? this.myForm.disable() : this.myForm.enable();
  }

  constructor(public fb: FormBuilder) {}

  onInputChange() {
    this.onChange(this.formControl.value);
    this.onTouch();
  }
}