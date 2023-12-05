import { Component } from '@angular/core';
import { ValidFormService } from '../../../../../shared/services/validForm.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '../../../../../shared/services/alert.service';

@Component({
  selector: 'app-canasta',
  templateUrl: './canasta.component.html'
})
export class CanastaComponent {
  public myForm: FormGroup = this.fb.group({
    id: [0, Validators.required],
    codigo: [0, Validators.required],
    descripcion: ['', Validators.required],
    descripcionResumida: [''],
    tip: [''],
    especificarAltura: [0],
    especificarAncho: [0],
    especificarProfundidad: [0],
    especificarModelo: [0],
    alias1: [''],
    alias2: [''],
    alias3: [''],
  })

  constructor(
    public validForm: ValidFormService,
    public alert: AlertService,
    public fb: FormBuilder,
    ){
    
  }

  isValidField(field: string): boolean | null {
    return this.validForm.isValidField(field, this.myForm);
  }

  getFieldError(field: string): string | null {
    return this.validForm.getFieldError(field, this.myForm);
  }
}
