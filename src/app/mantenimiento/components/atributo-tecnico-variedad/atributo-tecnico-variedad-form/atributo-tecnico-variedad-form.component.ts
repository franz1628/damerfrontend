import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ValidFormService } from '../../../../shared/services/validForm.service';
import { AtributoTecnicoVariedadService } from '../../../service/atributoTecnicoVariedad';
import { RegexService } from '../../../../shared/services/regex.service';
import { AtributoTecnicoVariedad, AtributoTecnicoVariedadInit } from '../../../interface/atributoTecnicoVariedad';

@Component({
  selector: 'app-atributo-tecnico-variedad-form',
  templateUrl: './atributo-tecnico-variedad-form.component.html'
})
export class AtributoTecnicoVariedadFormComponent {
  public model = this.fb.group({
    id: [0],
    idPais: [0],
    codigo: [0,Validators.required],
    descripcion: [''],
    descripcionResumida: [''],
    tip: [''],
    posiblesValores: [0],
    solicitarUnidad: [0],
    variosValores: [0],
    idInputClasificado: [0],
    alias1: [''],
    alias2: [''],
    alias3: [''],
  })

  @Output() actualizarListEmit: EventEmitter<null> = new EventEmitter();



  constructor(
    private fb: FormBuilder,
    private validForm: ValidFormService,
    private service: AtributoTecnicoVariedadService,
    private regexService : RegexService
  ) {

  }

  ngOnInit(): void {

  }

  get getModel() {
    return this.model.value as AtributoTecnicoVariedad
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

  }

  selectEdit(model: AtributoTecnicoVariedad) {
    this.model.patchValue(model);
  }

  nuevo() {
    this.model.patchValue(AtributoTecnicoVariedadInit);
  }

  isValidField(field: string): boolean | null {
    return this.validForm.isValidField(field, this.model);
  }

  getFieldError(field: string): string | null {
    return this.validForm.getFieldError(field, this.model);
  }
}
