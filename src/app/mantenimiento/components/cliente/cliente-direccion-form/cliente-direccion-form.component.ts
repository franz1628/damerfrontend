import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ValidFormService } from '../../../../shared/services/validForm.service';
import { ClienteDireccionService } from '../../../service/clienteDireccion';
import { RegexService } from '../../../../shared/services/regex.service';
import { ClienteContacto } from '../../../interface/clienteContacto';
import { ClienteDireccion, ClienteDireccionInit } from '../../../interface/clienteDireccion';

@Component({
  selector: 'app-cliente-direccion-form',
  templateUrl: './cliente-direccion-form.component.html'
})
export class ClienteDireccionFormComponent {
  public model = this.fb.group({
    id:[0],
    codCliente: [0,Validators.required],
    idTipoDireccion: [0],
    codDistrito: [0],
    codUrbanizacion: [0],
    codVia: [0],
    numDomicilio: [0],
    interior: [0],
    manzana: [''],
    lote: [''],
    referencia: [''],

  })

  @Output() actualizarListEmit: EventEmitter<null> = new EventEmitter();



  constructor(
    private fb: FormBuilder,
    private validForm: ValidFormService,
    private service: ClienteDireccionService,
    private regexService : RegexService
  ) {

  }

  ngOnInit(): void {

  }

  get getModel() {
    return this.model.value as ClienteDireccion
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

  selectEdit(model: ClienteDireccion) {
    this.model.patchValue(model);
  }

  nuevo() {
    this.model.patchValue(ClienteDireccionInit);
  }

  isValidField(field: string): boolean | null {
    return this.validForm.isValidField(field, this.model);
  }

  getFieldError(field: string): string | null {
    return this.validForm.getFieldError(field, this.model);
  }

}
