import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ValidFormService } from '../../../../shared/services/validForm.service';
import { ClienteDireccionService } from '../../../service/clienteDireccion';
import { RegexService } from '../../../../shared/services/regex.service';
import { ClienteContacto } from '../../../interface/clienteContacto';
import { ClienteDireccion, ClienteDireccionInit } from '../../../interface/clienteDireccion';
import { Cliente, ClienteInit } from '../../../interface/cliente';
import { catchError, throwError } from 'rxjs';
import { AlertService } from '../../../../shared/services/alert.service';

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
  @Output() resetModelEmit: EventEmitter<null> = new EventEmitter();
  @Input()
  cliente : Cliente = ClienteInit;

  constructor(
    private fb: FormBuilder,
    private validForm: ValidFormService,
    private service: ClienteDireccionService,
    private regexService : RegexService,
    private alert : AlertService
  ) {

  }

  ngOnInit(): void {
    this.model.patchValue({codCliente:this.cliente.codigo});
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
      this.reset();
      this.actualizarList();
    })
   
  }

  selectEdit(model: ClienteDireccion) {
    this.model.patchValue(model);
  }

  nuevo() {
    this.model.patchValue(ClienteDireccionInit);
  }

  reset(){
    this.model.patchValue(ClienteDireccionInit);
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

  isValidField(field: string): boolean | null {
    return this.validForm.isValidField(field, this.model);
  }

  getFieldError(field: string): string | null {
    return this.validForm.getFieldError(field, this.model);
  }

}
