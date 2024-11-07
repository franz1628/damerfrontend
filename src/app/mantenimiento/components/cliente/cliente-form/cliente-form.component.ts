import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ValidFormService } from '../../../../shared/services/validForm.service';
import { ClienteService } from '../../../service/cliente';
import { RegexService } from '../../../../shared/services/regex.service';
import { Cliente, ClienteInit } from '../../../interface/cliente';
import { AlertService } from '../../../../shared/services/alert.service';
import { catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-cliente-form',
  templateUrl: './cliente-form.component.html'
})
export class ClienteFormComponent {
  public model = this.fb.group({
    id: [0],
    codigo: [0],
    idPais: [1],
    area: [''],
    razonSocial: ['',Validators.required],
    razonSocialAbreviada: [''],
    razonSocialTip: [''],
    ruc: ['', [Validators.pattern(/^\d{1,11}$/)]],
    razonSocialCorporativa: [''],
    codigoRubro: [''],
    idCategorizacionCliente:  [0],
    aniversario: [new Date()],
    web: [''],
    mesCierre: [0],
    alias1: [''],
    alias2: [''], 
    alias3: [''],
    idUsuario:[0]
  })

  @Output() actualizarListEmit: EventEmitter<null> = new EventEmitter();
  @Output() resetModelEmit: EventEmitter<null> = new EventEmitter();



  constructor(
    private fb: FormBuilder,
    private validForm: ValidFormService,
    private service: ClienteService,
    private regexService : RegexService,
    private alert: AlertService
  ) {

  }

  ngOnInit(): void {
    this.reset();
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

    this.model.patchValue({idUsuario:JSON.parse(localStorage.getItem('usuario')||'').id})

    this.service.add(this.getModel).subscribe(resp => {
      this.reset();
      this.actualizarList();
    })

  }

  selectEdit(model: Cliente) {
    this.model.patchValue(model);
  }

  nuevo() {
    this.reset();
  }

  reset(){
    this.model.patchValue(ClienteInit);
    this.resetModelEmit.emit();
  }

  editar(){
    this.service.update(this.getModel.id,this.getModel).pipe(
      catchError(error => {
        this.alert.showAlert('Mensaje',error.error.message,'warning');
        return throwError(()=>error);
      })
    ).subscribe(x=>{
        this.alert.showAlert('Mensaje',x.message,'success');
        this.actualizarList();
        this.reset();
    });
  } 

  borrar(){
    this.service.delete(this.getModel).subscribe(x=>{
      this.alert.showAlert('Mensaje','Suspendido correctamente','success');
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
