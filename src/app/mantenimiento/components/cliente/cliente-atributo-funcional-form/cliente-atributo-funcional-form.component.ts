import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Categoria, CategoriaInit } from '../../variedades/interfaces/categoria.interface';
import { Cliente, ClienteInit } from '../../../interface/cliente';
import { AtributoFuncionalVariedad, AtributoFuncionalVariedadInit } from '../../../interface/atributoFuncionalVariedad';
import { FormBuilder, Validators } from '@angular/forms';
import { ValidFormService } from '../../../../shared/services/validForm.service';
import { ClienteCategoriaService } from '../../../service/clienteCategoria';
import { CategoriaService } from '../../variedades/services/categoria.service';
import { RegexService } from '../../../../shared/services/regex.service';
import { AlertService } from '../../../../shared/services/alert.service';
import { AtributoFuncionalVariedadService } from '../../../service/atributoFuncionalVariedad';
import { catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-cliente-atributo-funcional-form',
  templateUrl: './cliente-atributo-funcional-form.component.html'
})
export class ClienteAtributoFuncionalFormComponent {
  @Output() actualizarListEmit: EventEmitter<null> = new EventEmitter();
  @Input() 
  cliente :Cliente = ClienteInit; 
  @Input()
  categoria :Categoria = CategoriaInit; 
  atributoFuncionalVariedads:AtributoFuncionalVariedad[] = [];

  public model = this.fb.group({
    id:[0],
    codCliente: [0,Validators.required],
    codCategoria: [0,Validators.required],
    codigo: [0,Validators.required],
    descripcion: ['',Validators.required],
    descripcionResumida: ['',Validators.required],
    tip: ['',Validators.required],
    idIndiceAtributo: [0,Validators.required],
    idTipoUnidadMedida: [0,Validators.required],
    idUnidadMedida: [0,Validators.required],
    alias1: ['',Validators.required],
    alias2: ['',Validators.required],
    alias3: ['',Validators.required]
  }) 

  constructor(
    private fb: FormBuilder,
    private validForm: ValidFormService,
    private service: AtributoFuncionalVariedadService,
    private serviceCategoria : CategoriaService,
    private regexService : RegexService,
    private alert : AlertService,
  ) {

  }

  ngOnInit(): void {
    this.model.patchValue({codCliente:this.cliente.codigo,codCategoria:this.categoria.codigo});

    this.serviceCategoria.get().subscribe(x=>{
      this.atributoFuncionalVariedads = x.data;
    })
  }

  get getModel() {
    return this.model.value as AtributoFuncionalVariedad
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

  reset(){
    
    this.model.patchValue(AtributoFuncionalVariedadInit);
    this.model.patchValue({codCliente:this.cliente.codigo,codCategoria:this.categoria.codigo});
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

  selectEdit(model: AtributoFuncionalVariedad) {
    this.model.patchValue(model);
  } 

  nuevo() {
    this.model.patchValue(AtributoFuncionalVariedadInit);
  }

  isValidField(field: string): boolean | null {
    return this.validForm.isValidField(field, this.model);
  }

  getFieldError(field: string): string | null {
    return this.validForm.getFieldError(field, this.model);
  }
}