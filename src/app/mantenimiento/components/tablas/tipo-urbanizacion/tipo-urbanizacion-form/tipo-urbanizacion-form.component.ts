import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '../../../../../shared/services/alert.service';
import { ValidFormService } from '../../../../../shared/services/validForm.service';
import { TipoUrbanizacion, TipoUrbanizacionInit } from '../../ubigeo/interface/tipoUrbzanizacion.interface';
import { TipoUrbanizacionService } from '../../ubigeo/service/tipoUrbanizacion.service';

@Component({
  selector: 'app-tipo-urbanizacion-form',
  templateUrl: './tipo-urbanizacion-form.component.html'
})
export class TipoUrbanizacionFormComponent {
  @Input()
  public model: TipoUrbanizacion = TipoUrbanizacionInit
  public showLoading: boolean = false;
  @Output() updateModelsEmit: EventEmitter<null> = new EventEmitter();
  public myForm: FormGroup = this.fb.group({
    id: [0],
    descripcion: ['', Validators.required],
    descripcionResumida: [''],
  })

  constructor(
    public alert: AlertService, 
    public fb: FormBuilder, 
    public validForm: ValidFormService, 
    public service: TipoUrbanizacionService
    ) {

  }

  ngOnInit(){
    this.showLoading = true;
  }
  
  get currentModel() {
    
    return this.myForm.value as TipoUrbanizacion;
  }

  submit() {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }

    if(!this.currentModel.id){
      this.service.add(this.currentModel).subscribe(() => {
        this.showLoading = false;
        this.updateModelsEmit.emit();
        this.alert.showAlert('¡Éxito!', 'Se agregó correctamente', 'success');
        this.myForm.reset()
      });
    }else{
      this.service.update(this.currentModel.id,this.currentModel).subscribe(() => {
        this.showLoading = false;
        this.updateModelsEmit.emit();
        this.alert.showAlert('¡Éxito!', 'Se edito correctamente', 'success');
        this.myForm.reset()
      });
    }
  }

  setModel(model: TipoUrbanizacion) {
    this.myForm.patchValue(model);
  }

  nuevo() {
    this.myForm.patchValue(TipoUrbanizacionInit);
    this.myForm.clearValidators()
  }

  isValidField(field: string): boolean | null {
    return this.validForm.isValidField(field, this.myForm);
  }

  getFieldError(field: string): string | null {
    return this.validForm.getFieldError(field, this.myForm);
  }
}
