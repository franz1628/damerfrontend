import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Departamento, DepartamentoInit } from '../../../interface/departamento.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '../../../../../../../shared/services/alert.service';
import { ValidFormService } from '../../../../../../../shared/services/validForm.service';
import { DepartamentoService } from '../../../service/departamento.service';

@Component({
  selector: 'app-departamento-form',
  templateUrl: './departamento-form.component.html'
})
export class DepartamentoFormComponent {
  @Input()
  public model: Departamento = DepartamentoInit
  public showLoading: boolean = false;
  @Output() updateModelsEmit: EventEmitter<null> = new EventEmitter();
  public myForm: FormGroup = this.fb.group({
    id: [0],
    descripcion: ['', Validators.required],
    idPais: [1004],
    estado: [1]
  })
  
  constructor(public alert: AlertService, public fb: FormBuilder, public validForm: ValidFormService, public service: DepartamentoService) {}
  
  

  get currentModel() {
    return this.myForm.value as Departamento;
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
        this.myForm.patchValue(DepartamentoInit);
      });
    }else{
      this.service.update(this.currentModel.id,this.currentModel).subscribe(() => {
        this.showLoading = false;
        this.updateModelsEmit.emit();
        this.alert.showAlert('¡Éxito!', 'Se edito correctamente', 'success');
        this.myForm.patchValue(DepartamentoInit);
      });
    }
  }

  setModel(model: Departamento) {
    this.myForm.patchValue(model);
  }

  nuevo() {
    this.myForm.patchValue(DepartamentoInit);
    this.myForm.clearValidators()
  }

  isValidField(field: string): boolean | null {
    return this.validForm.isValidField(field, this.myForm);
  }

  getFieldError(field: string): string | null {
    return this.validForm.getFieldError(field, this.myForm);
  }
}
