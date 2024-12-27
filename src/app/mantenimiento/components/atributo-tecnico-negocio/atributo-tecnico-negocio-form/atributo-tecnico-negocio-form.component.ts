import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ValidFormService } from '../../../../shared/services/validForm.service';
import { AtributoTecnicoNegocioService } from '../../../service/atributoTecnicoNegocio';
import { RegexService } from '../../../../shared/services/regex.service';
import { AtributoTecnicoNegocio, AtributoTecnicoNegocioInit } from '../../../interface/atributoTecnicoNegocio';
import { catchError, throwError } from 'rxjs';
import { AlertService } from '../../../../shared/services/alert.service';

@Component({
  selector: 'app-atributo-tecnico-negocio-form',
  templateUrl: './atributo-tecnico-negocio-form.component.html'
})
export class AtributoTecnicoNegocioFormComponent {
  public model = this.fb.group({
    id: [0],
    idPais: [1],
    codigo: [0,Validators.required],
    descripcion: ['',Validators.required],
    descripcionResumida: [''],
    tip: [''],
    posiblesValores: [0],
    idInputClasificado: [0],
    alias1: [''],
    alias2: [''],
    alias3: [''],
  })

  @Output() actualizarListEmit: EventEmitter<null> = new EventEmitter();



  constructor(
    private fb: FormBuilder,
    private validForm: ValidFormService,
    private service: AtributoTecnicoNegocioService,
    private regexService : RegexService,
    private alert:AlertService
  ) {

  }

  ngOnInit(): void {

  }

  get getModel() {
    return this.model.value as AtributoTecnicoNegocio
  }

  actualizarList() {
    this.actualizarListEmit.emit();
  }

  agregar() {
    if (this.model.invalid) {
      this.model.markAllAsTouched();
      return;
    }

    if(this.getModel.descripcion==''){
      this.alert.showAlert('Advertencia','Falta la descripcion','warning');
      return
    }

    this.service.add(this.getModel).subscribe(resp => {
      this.model.reset();
      this.actualizarList();
    })

  }

  selectEdit(model: AtributoTecnicoNegocio) {
    this.model.patchValue(model);
  }

  nuevo() {
    this.model.patchValue(AtributoTecnicoNegocioInit);
  }

  reset(){
    this.model.patchValue(AtributoTecnicoNegocioInit);
    //this.resetModelEmit.emit();
  }

  editar(){
    if(this.getModel.descripcion==''){
      this.alert.showAlert('Advertencia','Falta la descripcion','warning');
      return
    }
    
    this.service.update(this.getModel.id,this.getModel).pipe(
      catchError(error => {
        this.alert.showAlert('Mensaje',error.error.message,'warning');
        return throwError(()=>error);
      })
    ).subscribe(x=>{
        this.alert.showAlert('Mensaje','Guardado correctamente','success');
        this.actualizarList();
        this.reset();
    });
  } 

  isValidField(field: string): boolean | null {
    return this.validForm.isValidField(field, this.model);
  }

  getFieldError(field: string): string | null {
    return this.validForm.getFieldError(field, this.model);
  }
}
