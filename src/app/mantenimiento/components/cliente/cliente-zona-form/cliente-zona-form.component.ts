import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Cliente, ClienteInit } from '../../../interface/cliente';
import { FormBuilder, Validators } from '@angular/forms';
import { ValidFormService } from '../../../../shared/services/validForm.service';
import { ClienteZonaService } from '../../../service/clienteZona';
import { RegexService } from '../../../../shared/services/regex.service';
import { ClienteZona, ClienteZonaInit } from '../../../interface/clienteZona';
import { catchError, throwError } from 'rxjs';
import { AlertService } from '../../../../shared/services/alert.service';
import { Zona } from '../../tablas/interfaces/zona.interface';
import { ZonaService } from '../../tablas/service/zona.service';

@Component({
  selector: 'app-cliente-zona-form', 
  templateUrl: './cliente-zona-form.component.html'
})
export class ClienteZonaFormComponent {
  @Output() actualizarListEmit: EventEmitter<null> = new EventEmitter();
  @Input() 
  cliente :Cliente = ClienteInit; 
  zonas:Zona[] = [];

  public model = this.fb.group({
    id:[0],
    codCliente: [0],
    codZona: [0],
    idZona: [0],
    idCliente: [0],
    nombreAgrupacion: ['',Validators.required],
  })

  constructor(
    private fb: FormBuilder,
    private validForm: ValidFormService,
    private service: ClienteZonaService,
    private serviceZona : ZonaService,
    private regexService : RegexService,
    private alert : AlertService,
  ) {

  }

  ngOnInit(): void {
    this.model.patchValue({idCliente:this.cliente.id});

    this.serviceZona.get().subscribe(x=>{
      this.zonas = x.data;
    })
  }

  get getModel() {
    return this.model.value as ClienteZona
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

  reset(){
    this.model.patchValue(ClienteInit);
    //this.resetModelEmit.emit();
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

  selectEdit(model: ClienteZona) {
    this.model.patchValue(model);
  } 

  nuevo() {
    this.model.patchValue(ClienteZonaInit);
  }

  isValidField(field: string): boolean | null {
    return this.validForm.isValidField(field, this.model);
  }

  getFieldError(field: string): string | null {
    return this.validForm.getFieldError(field, this.model);
  }
}
