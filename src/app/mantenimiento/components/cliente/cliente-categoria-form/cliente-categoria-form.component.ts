import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Cliente, ClienteInit } from '../../../interface/cliente';
import { FormBuilder, Validators } from '@angular/forms';
import { ValidFormService } from '../../../../shared/services/validForm.service';
import { ClienteCategoriaService } from '../../../service/clienteCategoria';
import { RegexService } from '../../../../shared/services/regex.service';
import { ClienteCategoria, ClienteCategoriaInit } from '../../../interface/clienteCategoria';
import { catchError, throwError } from 'rxjs';
import { AlertService } from '../../../../shared/services/alert.service';
import { Categoria } from '../../variedades/interfaces/categoria.interface';
import { CategoriaService } from '../../variedades/services/categoria.service';

@Component({
  selector: 'app-cliente-categoria-form',
  templateUrl: './cliente-categoria-form.component.html' 
})
export class ClienteCategoriaFormComponent {
  @Output() actualizarListEmit: EventEmitter<null> = new EventEmitter();
  @Input() 
  cliente :Cliente = ClienteInit; 
  categorias:Categoria[] = [];

  public model = this.fb.group({
    id:[0],
    codCliente: [0,Validators.required],
    codCategoria: [0,Validators.required],
    nombreAgrupacion: ['',Validators.required],
  })

  constructor(
    private fb: FormBuilder,
    private validForm: ValidFormService,
    private service: ClienteCategoriaService,
    private serviceCategoria : CategoriaService,
    private regexService : RegexService,
    private alert : AlertService,
  ) {

  }

  ngOnInit(): void {
    this.model.patchValue({codCliente:this.cliente.codigo});

    this.serviceCategoria.get().subscribe(x=>{
      this.categorias = x.data;
    })
  }

  get getModel() {
    return this.model.value as ClienteCategoria
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

  selectEdit(model: ClienteCategoria) {
    this.model.patchValue(model);
  } 

  nuevo() {
    this.model.patchValue(ClienteCategoriaInit);
  }

  isValidField(field: string): boolean | null {
    return this.validForm.isValidField(field, this.model);
  }

  getFieldError(field: string): string | null {
    return this.validForm.getFieldError(field, this.model);
  }
}
