import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidFormService } from '../../../../../shared/services/validForm.service';
import { AlertService } from '../../../../../shared/services/alert.service';
import { UnidadMedida, UnidadMedidaInit } from '../../../../interface/unidadMedida';
import { UnidadMedidaService } from '../../../../service/unidadMedida';


@Component({
  selector: 'app-unidad-medida-form',
  templateUrl: './unidad-medida-form.component.html'
})
export class UnidadMedidaFormComponent {
  @Input()
  public model: UnidadMedida = UnidadMedidaInit
  public showLoading: boolean = false;
  @Output() updateModelsEmit: EventEmitter<null> = new EventEmitter();
  public myForm: FormGroup = this.fb.group({
    id:[0],
    codigo:  [0, [Validators.required, Validators.min(1), Validators.pattern(/^-?\d+$/)]],
    descripcion: ['',Validators.required],
    descripcionResumida: [''],
    tip: [''],
    unidadMetrica: [0],
    factorConversion: ['']
  })

  //public listProvincia : Provincia[] = [];
  
  constructor(public alert: AlertService, public fb: FormBuilder, public validForm: ValidFormService, public service: UnidadMedidaService) {

  }

  ngOnInit(){
    this.showLoading = true
    //this.provinciaService.get().subscribe(response => { this.showLoading = false; this.listProvincia = response.data });
  }
  
  get currentModel() {
    
    return this.myForm.value as UnidadMedida;
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
        this.myForm.patchValue(UnidadMedidaInit);
        this.myForm.clearValidators()
      });
    }else{
      this.service.update(this.currentModel.id,this.currentModel).subscribe(() => {
        this.showLoading = false;
        this.updateModelsEmit.emit();
        this.alert.showAlert('¡Éxito!', 'Se edito correctamente', 'success');
      });
    }
  }

  setModel(model: UnidadMedida) {
    this.myForm.patchValue(model);
  }

  nuevo() {
    this.myForm.patchValue(UnidadMedidaInit);
    this.myForm.clearValidators()
  }

  isValidField(field: string): boolean | null {
    return this.validForm.isValidField(field, this.myForm);
  }

  getFieldError(field: string): string | null {
    return this.validForm.getFieldError(field, this.myForm);
  }
}
