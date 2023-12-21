import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ValidFormService {
  isValidField( field: string, myForm: FormGroup ): boolean | null {
    return myForm.controls[field].errors
      && myForm.controls[field].touched;
  }

  getFieldError( field: string, myForm: FormGroup  ): string | null {

    if ( !myForm.controls[field] ) return null;

    const errors = myForm.controls[field].errors || {};

    for (const key of Object.keys(errors) ) {
      
      switch( key ) {
        case 'required':
          return 'Este campo es requerido';

        case 'min':
          return `Valor minimo ${ errors['min'].min }`;
        default : 
          return `No válido`;
      }
    }

    return null;
  }
}
