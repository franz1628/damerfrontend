import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ValidFormService } from '../../../../shared/services/validForm.service';
import { ClienteService } from '../../../service/cliente';
import { RegexService } from '../../../../shared/services/regex.service';
import { Cliente, ClienteInit } from '../../../interface/cliente';

@Component({
  selector: 'app-cliente-form',
  templateUrl: './cliente-form.component.html'
})
export class ClienteFormComponent {
  public model = this.fb.group({
    id: [0],
    codigo: [0],
    idPais: [1],
    razonSocial: ['',Validators.required],
    razonSocialAbreviada: ['',Validators.required],
    razonSocialTip: ['',Validators.required],
    ruc: ['',Validators.required],
    razonSocialCorporativa: ['',Validators.required],
    codigoRubro: ['',Validators.required],
    idCategorizacionCliente:  [0, [Validators.required,Validators.pattern(this.regexService.regexCombo)]],
    aniversario: [new Date(), [Validators.required,Validators.pattern(this.regexService.regexFecha)]],
    web: ['',Validators.required],
    mesCierre: [0],
    alias1: ['',Validators.required],
    alias2: ['',Validators.required],
    alias3: ['',Validators.required],
  })

  @Output() actualizarListEmit: EventEmitter<null> = new EventEmitter();



  constructor(
    private fb: FormBuilder,
    private validForm: ValidFormService,
    private service: ClienteService,
    private regexService : RegexService
  ) {

  }

  ngOnInit(): void {

  }

  get getModel() {
    return this.model.value as Cliente
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

  selectEdit(model: Cliente) {
    this.model.patchValue(model);
  }

  nuevo() {
    this.model.patchValue(ClienteInit);
  }

  isValidField(field: string): boolean | null {
    return this.validForm.isValidField(field, this.model);
  }

  getFieldError(field: string): string | null {
    return this.validForm.getFieldError(field, this.model);
  }

}
