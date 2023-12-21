import { Component } from '@angular/core';
import { AlertService } from '../../../shared/services/alert.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidFormService } from '../../../shared/services/validForm.service';
import { Medicion } from '../../interface/medicion';
import { MedicionService } from '../../service/medicion.service';

@Component({
  selector: 'app-medicion',
  templateUrl: './medicion.component.html'
})
export class MedicionComponent {
  public myForm: FormGroup = this.fb.group({
    id: [0, Validators.required],
    anio: [2024, [Validators.required,Validators.min(2010),Validators.max(2050), Validators.pattern(/^-?\d+$/)]],
    mes: [1, [Validators.required,Validators.min(1),Validators.max(12), Validators.pattern(/^-?\d+$/)]],
    codPais:[1],
    medicion: [''],
  })

  constructor( 
    public alert: AlertService,
    public fb: FormBuilder, 
    public validForm: ValidFormService,
    private medicionService : MedicionService
    ){

  }

  get currentModel() {
    return this.myForm.value as Medicion;
  }

  get getMedicion():number|string{
    const anio:number = parseInt(this.myForm.get('anio')?.value);
    const mes:number = parseInt(this.myForm.get('mes')?.value);
    if (this.myForm.valid) {
      this.myForm.patchValue({medicion:(anio%100)*100 + mes});
      return (anio%100)*100 + mes;
    }
    return '-';
  }

  submit() {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }

    this.medicionService.update(1,this.currentModel).subscribe(resp=>{
      this.alert.showAlert('Mensaje','Se guardo correctamente','success');
    })

  }

  isValidField(field: string): boolean | null {
    return this.validForm.isValidField(field, this.myForm);
  }

  getFieldError(field: string): string | null {
    return this.validForm.getFieldError(field, this.myForm);
  }
}



