import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '../../../../../../../shared/services/alert.service';
import { Pais, PaisInit } from '../../../interface/pais.interface';
import { ValidFormService } from '../../../../../../../shared/services/validForm.service';

@Component({
  selector: 'app-pais-form',
  templateUrl: './pais-form.component.html'
})
export class PaisFormComponent {
  public model: Pais = PaisInit
  public myForm: FormGroup = this.fb.group({
    descripcion: ['',Validators.required],
  })

  constructor(public alert: AlertService, public fb: FormBuilder, public validForm : ValidFormService) { }

  @Output() submitEmit: EventEmitter<Pais> = new EventEmitter();

  submit() {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }
    
    this.submitEmit.emit({
      id:0,
      descripcion:this.myForm.controls["descripcion"].value,
      estado:1
    })

    this.myForm.reset(PaisInit);
  }

  isValidField( field: string ): boolean | null {
    return this.validForm.isValidField(field,this.myForm);
  }

  getFieldError( field: string ): string | null {
    return this.validForm.getFieldError(field, this.myForm);
  }

}
