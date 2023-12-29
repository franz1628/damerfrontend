import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ValidFormService } from '../../../../shared/services/validForm.service';
import { RegexService } from '../../../../shared/services/regex.service';
import { ClienteContactoService } from '../../../service/clienteContacto';
import { ClienteContacto, ClienteContactoInit } from '../../../interface/clienteContacto';

@Component({
  selector: 'app-cliente-contacto-form',
  templateUrl: './cliente-contacto-form.component.html'
})
export class ClienteContactoFormComponent {
  public model = this.fb.group({
    id:[0],
    codCliente: [0,Validators.required],
    nombreCompleto: ['',Validators.required],
    cargo: [0,Validators.required],
    correo: ['',Validators.required],
  })

  @Output() actualizarListEmit: EventEmitter<null> = new EventEmitter();

  constructor(
    private fb: FormBuilder,
    private validForm: ValidFormService,
    private service: ClienteContactoService,
    private regexService : RegexService
  ) {

  }

  ngOnInit(): void {

  }

  get getModel() {
    return this.model.value as ClienteContacto
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

  selectEdit(model: ClienteContacto) {
    this.model.patchValue(model);
  }

  nuevo() {
    this.model.patchValue(ClienteContactoInit);
  }

  isValidField(field: string): boolean | null {
    return this.validForm.isValidField(field, this.model);
  }

  getFieldError(field: string): string | null {
    return this.validForm.getFieldError(field, this.model);
  }

}
