import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidFormService } from '../../../../../shared/services/validForm.service';
import { AlertService } from '../../../../../shared/services/alert.service';
import { TipoInformeOrden, TipoInformeOrdenInit } from '../../../../interface/tipoInformeOrden';
import { TipoInformeOrdenService } from '../../../../service/tipoInformeOrden';

@Component({
  selector: 'app-tipo-informe-orden-form',
  templateUrl: './tipo-informe-orden-form.component.html'
})
export class TipoInformeOrdenFormComponent {
  @Input()
  public model: TipoInformeOrden = TipoInformeOrdenInit
  public showLoading: boolean = false;
  @Output() updateModelsEmit: EventEmitter<null> = new EventEmitter();
  public myForm: FormGroup = this.fb.group({
    id: [0],
    codigo: [0, [Validators.required, Validators.min(1), Validators.pattern(/^-?\d+$/)]],
    descripcion:  ['', Validators.required],
    descripcionResumida: [''],
    tip: [''],
    claseInforme: [0],
    estudios: [0],
    variables: [0],
    unidades: [0],
    alias1: [''],
    alias2: [''],
    alias3: [''],
  })

  //public listProvincia : Provincia[] = [];
  
  constructor(public alert: AlertService, public fb: FormBuilder, public validForm: ValidFormService, public service: TipoInformeOrdenService) {

  }

  ngOnInit(){
    this.showLoading = true
    //this.provinciaService.get().subscribe(response => { this.showLoading = false; this.listProvincia = response.data });
  }
  
  get currentModel() {
    
    return this.myForm.value as TipoInformeOrden;
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
        this.myForm.patchValue(TipoInformeOrdenInit);
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

  setModel(model: TipoInformeOrden) {
    this.myForm.patchValue(model);
  }

  nuevo() {
    this.myForm.patchValue(TipoInformeOrdenInit);
    this.myForm.clearValidators()
  }

  isValidField(field: string): boolean | null {
    return this.validForm.isValidField(field, this.myForm);
  }

  getFieldError(field: string): string | null {
    return this.validForm.getFieldError(field, this.myForm);
  }
}

