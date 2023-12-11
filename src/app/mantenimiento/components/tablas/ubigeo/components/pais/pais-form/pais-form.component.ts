import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '../../../../../../../shared/services/alert.service';
import { Pais, PaisInit } from '../../../interface/pais.interface';
import { ValidFormService } from '../../../../../../../shared/services/validForm.service';
import { PaisService } from '../../../service/pais.service';

@Component({
  selector: 'app-pais-form',
  templateUrl: './pais-form.component.html'
})
export class PaisFormComponent {
  @Input()
  public model: Pais = PaisInit
  public showLoading: boolean = false;
  @Output() updateModelsEmit: EventEmitter<null> = new EventEmitter();
  public myForm: FormGroup = this.fb.group({
    id: [0],
    descripcion: ['', Validators.required],
    estado: [1]
  })

  constructor(
    public alert: AlertService, 
    public fb: FormBuilder, 
    public validForm: ValidFormService, 
    public service: PaisService) {

  }

  ngOnInit(){
    this.showLoading = true
  }
  
  get currentModel() {
    
    return this.myForm.value as Pais;
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
      });
    }else{
      this.service.update(this.currentModel.id,this.currentModel).subscribe(() => {
        this.showLoading = false;
        this.updateModelsEmit.emit();
        this.alert.showAlert('¡Éxito!', 'Se edito correctamente', 'success');
      });
    }
  }

  setModel(model: Pais) {
    this.myForm.patchValue(model);
  }

  nuevo() {
    this.myForm.patchValue(PaisInit);
    this.myForm.clearValidators()
  }

  isValidField(field: string): boolean | null {
    return this.validForm.isValidField(field, this.myForm);
  }

  getFieldError(field: string): string | null {
    return this.validForm.getFieldError(field, this.myForm);
  }

}
