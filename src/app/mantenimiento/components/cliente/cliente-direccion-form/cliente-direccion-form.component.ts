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
import { TipoDireccion } from '../../variedades/interfaces/tipoDireccion';
import { TipoDireccionService } from '../../../service/tipoDireccion';
import { Distrito } from '../../tablas/ubigeo/interface/distrito.interface';
import { Urbanizacion } from '../../tablas/interfaces/urbanizacion.interface';
import { Departamento } from '../../tablas/ubigeo/interface/departamento.interface';
import { Provincia } from '../../tablas/ubigeo/interface/provincia.interface';
import { DepartamentoService } from '../../tablas/ubigeo/service/departamento.service';
import { ProvinciaService } from '../../tablas/ubigeo/service/provincia.service';
import { DistritoService } from '../../tablas/ubigeo/service/distrito.service';
import { UrbanizacionService } from '../../tablas/service/urbanizacion.service';

@Component({
  selector: 'app-cliente-direccion-form',
  templateUrl: './cliente-direccion-form.component.html'
})
export class ClienteDireccionFormComponent {
  public model = this.fb.group({
    id:[0],
    idCliente: [0,Validators.required],
    idTipoDireccion: [0],
    idDepartamento: [0],
    idProvincia: [0],
    idDistrito: [0, [Validators.required,Validators.pattern(this.regexService.regexCombo)]],
    idUrbanizacion: [0],
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
  tipoDireccions:TipoDireccion[] = []


  listDistrito: Distrito[] = [];
  listUrbanizacion: Urbanizacion[] = [];

  departamentos:Departamento[] = [];
  provincias:Provincia[] = [];

  idDepartamento:number=0;
  idProvincia:number=0;
  showLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private validForm: ValidFormService,
    private service: ClienteDireccionService,
    private regexService : RegexService,
    private alert : AlertService,
    private serviceTipoDireccion:TipoDireccionService,
    private departamentoService: DepartamentoService,
    private provinciaService: ProvinciaService,
    private distritoService: DistritoService,
    private urbanizacionService: UrbanizacionService,
  ) {

  }

  ngOnInit(): void {
    this.model.patchValue({idCliente:this.cliente.id});
    this.serviceTipoDireccion.get().subscribe(x=>{
      this.tipoDireccions = x.data
    })

    this.distritoService.get().subscribe(response => { this.showLoading = false; this.listDistrito = response.data });
    this.urbanizacionService.get().subscribe(response => { this.showLoading = false; this.listUrbanizacion = response.data });
    this.departamentoService.get().subscribe(response => { this.showLoading = false; this.departamentos = response.data });
    this.provinciaService.get().subscribe(response => { this.showLoading = false; this.provincias = response.data });
  }

  get getModel() {
    return this.model.value as ClienteDireccion
  }

  get getProvincias(){
    return this.provincias.filter(x=>x.idDepartamento==this.model.value.idDepartamento);
  }

  get getDistritos(){
    return this.listDistrito.filter(x=>x.idProvincia==this.model.value.idProvincia);
  }

  get getUrbanizacions(){
    return this.listUrbanizacion.filter(x=>x.idDistrito==this.model.value.idDistrito);
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
