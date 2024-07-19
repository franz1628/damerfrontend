import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ValidFormService } from '../../../../shared/services/validForm.service';
import { VariableService } from '../../../service/Variable';
import { RegexService } from '../../../../shared/services/regex.service';
import { Variable, VariableInit } from '../../../interface/variable';
import { AlertService } from '../../../../shared/services/alert.service';

@Component({
  selector: 'app-variable-form',
  templateUrl: './variable-form.component.html'
})
export class VariableFormComponent {
  public model = this.fb.group({
    id:[0],
    codigo: [0,Validators.required],
    idTipoVariable: [0],
    idGrupoVariable: [0],
    descripcion: [''],
    descripcionResumida: [''],
    tip: [''],
    codAtributoTecnicoVariedad: [0],
    idCliente: [0],
    indicadorFotografia: [0],
    numFotos: [0],
    idInputClasificado: [0],
    usaPosible: [0],
    variasRespuestas: [0],
    rangoMinimo: [0],
    rangoMaximo: [0],
    manejoRangos: [0],
    forzarMinimo: [0],
    redondeoMaximo: [0],
    cantidadDecimalesMaximo: [0],
    redondeoMinimo: [0],
    cantidadDecimalesMinimo: [0],
    pesoExtra: [0],
    varEstratificacion: [0],
    tiempoRespuesta: [0],
    usoCalculadora: [0],
    reqUndVta: [0],
    respuestaAfecta: [0],
    funcionResult: [0],
    numeroOrden: [0],
    respuestaObligatoria: [0],
    observaciones: [''],
    explicacionFuncionamiento: [''],
    alias1: [''],
    alias2: [''],
    alias3: [''],
    estado: [0],
  })

  @Output() actualizarListEmit: EventEmitter<null> = new EventEmitter();

  constructor(
    private fb: FormBuilder,
    private validForm: ValidFormService,
    private service: VariableService,
    private regexService : RegexService,
    public alert: AlertService,
  ) {

  }

  ngOnInit(): void {

  }

  get getModel() {
    return this.model.value as Variable
  }

  actualizarList() {
    this.actualizarListEmit.emit();
  }

  agregar() {
    if (this.model.invalid) {
      this.model.markAllAsTouched();
      return;
    }

    this.service.add(this.getModel).subscribe(resp => {
      this.model.reset();
      this.actualizarList();
    })

    if(!this.getModel.id){
      this.service.add(this.getModel).subscribe(() => {
        this.actualizarList(); 
        this.alert.showAlert('¡Éxito!', 'Se agregó correctamente', 'success');
        this.model.reset();
        this.actualizarList();
      });
    }else{
      this.service.update(this.getModel.id,this.getModel).subscribe(() => {
        this.actualizarList(); 
        this.alert.showAlert('¡Éxito!', 'Se edito correctamente', 'success');
      });
    }

  }

  selectEdit(model: Variable) {
    this.model.patchValue(model);
  }

  nuevo() {
    this.model.patchValue(VariableInit);
  }

  isValidField(field: string): boolean | null {
    return this.validForm.isValidField(field, this.model);
  }

  getFieldError(field: string): string | null {
    return this.validForm.getFieldError(field, this.model);
  }
}
