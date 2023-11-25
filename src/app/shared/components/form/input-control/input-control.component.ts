import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-input-control',
  templateUrl: './input-control.component.html',
  styleUrl: './input-control.component.css',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => InputControlComponent),
    multi: true
  }]
})
export class InputControlComponent implements ControlValueAccessor {
  public onChange: any = (_: any) => { };
  public onTouch: any = () => {};
  public valor:string=''

  ngOnInit(): void {
    
  }

  onInputChange(target: EventTarget | null) {

    this.onChange((target as HTMLInputElement).value);
 
  }

  writeValue(obj: any): void {
    this.valor = obj;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn

  }
  registerOnTouched(fn: any): void {
  
  }
  setDisabledState?(isDisabled: boolean): void {

  } 

  @Input()
  public textControl: string = '';
  @Input()
  public idControl: string = '';

}
