import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AlertService } from '../../../../../../../shared/services/alert.service';
import { Pais } from '../../../interface/pais.interface';

@Component({
  selector: 'app-pais-form',
  templateUrl: './pais-form.component.html'
})
export class PaisFormComponent {
  public model: Pais = {
    id: 0,
    descripcion: '',
    estado: 1
  }
  public myForm: FormGroup = this.fb.group({
    descripcion: [''],
  })

  constructor(public alert: AlertService, public fb: FormBuilder) { }

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

    this.myForm.reset({
      id: 0,
      descripcion: '',
      estado: 1
    });
  }

  isValidField( field: string ): boolean | null {
    return this.myForm.controls[field].errors
      && this.myForm.controls[field].touched;
  }

  getFieldError( field: string ): string | null {

    if ( !this.myForm.controls[field] ) return null;

    const errors = this.myForm.controls[field].errors || {};

    for (const key of Object.keys(errors) ) {
      switch( key ) {
        case 'required':
          return 'Este campo es requerido';

        case 'minlength':
          return `Mínimo ${ errors['minlength'].requiredLength } caracters.`;
      }
    }

    return null;
  }

}
