import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ValidFormService } from '../../../../../shared/services/validForm.service';
import { AlertService } from '../../../../../shared/services/alert.service';
import { TipoInformeOrden, TipoInformeOrdenInit } from '../../../../interface/tipoInformeOrden';
import { TipoInformeOrdenService } from '../../../../service/tipoInformeOrden';
import { TipoEstudioService } from '../../../../service/tipoEstudio';
import { TipoEstudio } from '../../../../interface/tipoEstudio';

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
    descripcion: ['', Validators.required],
    descripcionResumida: [''],
    tip: [''],
    claseInforme: [0],
    estudios: [0],
    variables: [0],
    unidades: [0], 
    alias1: [''],
    alias2: [''],
    alias3: [''],
    tipoEstudios: this.fb.array([])
  })

  tipoEstudios:TipoEstudio[] = []
 
  //public listProvincia : Provincia[] = [];

  constructor(
    private alert: AlertService,
    private fb: FormBuilder,
    private validForm: ValidFormService,
    private service: TipoInformeOrdenService,
    private serviceTipoEstudio: TipoEstudioService
  ) {

  }
  
  ngOnInit() {
    this.showLoading = true
    this.serviceTipoEstudio.get().subscribe(x=>{
      this.tipoEstudios = x.data
      for (let id = 0; id < x.data.length; id++) {

        const control = this.fb.control(true);
        this.getTipoEstudios.push(control);
      }
      this.showLoading = false;
    });
  }

  get currentModel() {
    return this.myForm.value as TipoInformeOrden; 
  }

  get getTipoEstudios() {
    return this.myForm.get('tipoEstudios') as FormArray
  }
 

  submit() {

  
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return; 
    }
    
    this.showLoading = true; 

    this.currentModel.TipoEstudio = this.tipoEstudios.filter((x,i)=>this.getTipoEstudios.value[i])

    if (!this.currentModel.id) {
      

      this.service.add(this.currentModel).subscribe((resp) => {
        if(resp.state == 0){ 
          this.showLoading = false;
          this.alert.showAlert('¡Advertencia!', resp.message, 'warning');
          return;
        }
        this.showLoading = false;
        this.updateModelsEmit.emit();
        this.alert.showAlert('¡Éxito!', 'Se agregó correctamente', 'success');
        this.myForm.patchValue(TipoInformeOrdenInit);
        this.myForm.clearValidators()
        this.myForm.reset()
      });
    } else {
      this.service.update(this.currentModel.id, this.currentModel).subscribe((resp) => {
        if(resp.state == 0){ 
          this.showLoading = false;
          this.alert.showAlert('¡Advertencia!', resp.message, 'warning');
          return;
        }
        this.showLoading = false;
        this.updateModelsEmit.emit();
        this.myForm.reset()
        this.alert.showAlert('¡Éxito!', 'Se edito correctamente', 'success');
      });
    }
  }

  setModel(model: TipoInformeOrden) {
    
    this.myForm.patchValue(model);

    const editTipoEstudios = model.TipoEstudio;
    const arr:boolean[] = [];

    for (let i = 0; i < this.tipoEstudios.length; i++) {
      if(editTipoEstudios.find(x=>x.id == this.tipoEstudios[i].id)){
        arr.push(true);
      }else{
        arr.push(false);
      }
    }

    this.getTipoEstudios.patchValue(arr)
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

