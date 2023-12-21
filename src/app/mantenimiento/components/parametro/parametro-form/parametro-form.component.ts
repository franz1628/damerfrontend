import { Component, EventEmitter, Input, Output, forwardRef } from '@angular/core';
import { FormBuilder, FormGroup, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { Parametro, ParametroInit } from '../../../interface/parametro.interface';
import { AlertService } from '../../../../shared/services/alert.service';
import { ValidFormService } from '../../../../shared/services/validForm.service';
import { ParametroService } from '../../../service/parametro.service';


@Component({
  selector: 'app-parametro-form',
  templateUrl: './parametro-form.component.html',
})
export class ParametroFormComponent {
  @Input()
  public model: Parametro = ParametroInit
  public showLoading: boolean = false;
  @Output() updateModelsEmit: EventEmitter<null> = new EventEmitter();
  public myForm: FormGroup = this.fb.group({
    id: [0],
    codigo:  [0, [Validators.required, Validators.min(1), Validators.pattern(/^-?\d+$/)]],
    descripcion: ['',Validators.required],
    descripcionResumida: [''],
    tip: [''],
    idInputClasificado: [0],
    valorParametro1: [0],
    valorParametro2: [0],
    valorParametro3: [0],
    inicioVigencia: [new Date()],
    alias1: [''],
    alias2: [''],
    alias3: [''],
    idEstadoRegistro: [1]
 
  })

  //public listProvincia : Provincia[] = [];
  
  constructor(public alert: AlertService, public fb: FormBuilder, public validForm: ValidFormService, public service: ParametroService) {

  }

  ngOnInit(){
    this.showLoading = true
    //this.provinciaService.get().subscribe(response => { this.showLoading = false; this.listProvincia = response.data });
  }
  
  get currentModel() {
    
    return this.myForm.value as Parametro;
  }

  submit() {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }

    /*if(!Number.isInteger(parseInt(this.currentModel.codigo.toString())) || this.currentModel.codigo<=0){
      this.alert.showAlert('Mensaje!', 'El codigo no es válido', 'warning');
      return;
    }*/

    if(!this.currentModel.id){
      this.service.add(this.currentModel).subscribe(() => {
        this.showLoading = false;
        this.updateModelsEmit.emit();
        this.alert.showAlert('¡Éxito!', 'Se agregó correctamente', 'success');
        this.myForm.patchValue(ParametroInit);
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

  setModel(model: Parametro) {
    this.myForm.patchValue(model);
  }

  nuevo() {
    this.myForm.patchValue(ParametroInit);
    this.myForm.clearValidators()
  }

  isValidField(field: string): boolean | null {
    return this.validForm.isValidField(field, this.myForm);
  }

  getFieldError(field: string): string | null {
    return this.validForm.getFieldError(field, this.myForm);
  }
}
