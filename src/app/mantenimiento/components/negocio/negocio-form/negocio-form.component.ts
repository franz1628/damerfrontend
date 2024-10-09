import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Negocio, NegocioInit } from '../../../interface/negocio.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '../../../../shared/services/alert.service';
import { ValidFormService } from '../../../../shared/services/validForm.service';
import { NegocioService } from '../../../service/negocio.service';
import { CanalService } from '../../tablas/service/canal.sevice';
import { Canal } from '../../tablas/interfaces/canal.interface';
import { ZonaService } from '../../tablas/service/zona.service';
import { DistritoService } from '../../tablas/ubigeo/service/distrito.service';
import { Urbanizacion } from '../../tablas/interfaces/urbanizacion.interface';
import { UrbanizacionService } from '../../tablas/service/urbanizacion.service';
import { Distrito } from '../../tablas/ubigeo/interface/distrito.interface';
import { DepartamentoService } from '../../tablas/ubigeo/service/departamento.service';
import { ProvinciaService } from '../../tablas/ubigeo/service/provincia.service';
import { Departamento } from '../../tablas/ubigeo/interface/departamento.interface';
import { Provincia } from '../../tablas/ubigeo/interface/provincia.interface';
import { RegexService } from '../../../../shared/services/regex.service';
import { Zona, ZonaInit } from '../../tablas/interfaces/zona.interface';


@Component({
  selector: 'app-negocio-form',
  templateUrl: './negocio-form.component.html'
})
export class NegocioFormComponent {
  @Input()
  model: Negocio = NegocioInit;
  showLoading: boolean = false;
  @Output() updateModelsEmit: EventEmitter<null> = new EventEmitter();

  myForm: FormGroup = this.fb.group({
    id: [0, Validators.required],
    ruc: ['', Validators.required],
    nombreComercial: ['', Validators.required], 
    nombreResumido: [''],
    nombreTip: [''],
    idCanal: [0, Validators.required],
    direccion: ['', Validators.required],
    idDepartamento: [0],
    idProvincia: [0],
    idDistrito: [0, [Validators.required,Validators.pattern(this.regexService.regexCombo)]],
    idUrbanizacion: [0],
    idRuta: [0],
    lat: [''],
    lgn: [''],
    entregaFactura: ['',Validators.required],
    levantarNegocio: ['',Validators.required],
    negocioEquivalente: ['',Validators.required],
    telefono: ['',Validators.required],
    fax: ['',Validators.required],
    referencia: ['',Validators.required],
    zonaAccidentada: ['',Validators.required],
    zonaRiesgo: ['',Validators.required],
    aceptaProductos: [1],
    tipoHorario: [1],
    idVia: [1],
    numeroDomicilio: [1],
    interior: ['',Validators.required],
    manzana: ['',Validators.required],
    lote: ['',Validators.required],
    estado : [1]
  })

  listCanal: Canal[] = [];
  listDistrito: Distrito[] = [];
  listUrbanizacion: Urbanizacion[] = [];
  negocioDescripcion: string = '';
  negociosEncontrados: Negocio[] = [];
  selectedRowIndex: number = -1;
  listZonas : Zona[] = [];
  negocios_x_zona : Negocio[] = [];
  miZona:Zona = ZonaInit

  departamentos:Departamento[] = [];
  provincias:Provincia[] = [];

  idDepartamento:number=0;
  idProvincia:number=0;

  constructor(
    private alert: AlertService,
    private fb: FormBuilder,
    private validForm: ValidFormService,
    private service: NegocioService,
    private canalService: CanalService,
    private departamentoService: DepartamentoService,
    private provinciaService: ProvinciaService,
    private distritoService: DistritoService,
    private urbanizacionService: UrbanizacionService,
    private regexService:RegexService,
    private zonaService:ZonaService
  ) {
  }

  ngOnInit() {
    this.showLoading = true
    this.canalService.get().subscribe(response => { this.showLoading = false; this.listCanal = response.data });
    this.distritoService.get().subscribe(response => { this.showLoading = false; this.listDistrito = response.data });
    this.urbanizacionService.get().subscribe(response => { this.showLoading = false; this.listUrbanizacion = response.data });
    this.departamentoService.get().subscribe(response => { this.showLoading = false; this.departamentos = response.data });
    this.provinciaService.get().subscribe(response => { this.showLoading = false; this.provincias = response.data });
    this.zonaService.get().subscribe(response => {this.showLoading = false; this.listZonas = response.data })
  }

  get currentModel() {
    return this.myForm.value as Negocio;
  }

  buscarNegocio(texto: string) {
    if (texto.length < 3) {
      this.alert.showAlert('Mensaje', 'Debe tener más de 3 caracteres', "warning");
      return;
    } 

    this.showLoading = true;
    this.selectedRowIndex = -1;
    this.service.postDescripcion(texto).subscribe(x => {
      if (x.data.length == 0) {
        this.alert.showAlert('Mensaje', 'No se encontraron resultados', "warning");
        this.showLoading = false;
        return;
      }

      this.negociosEncontrados = x.data;
      this.showLoading = false;

    });
  }

  elegirNegocio(miNegocio: Negocio, index: number):void {
   this.myForm.patchValue(miNegocio);
   this.miZona = miNegocio.Distrito?.Zona;
   this.selectedRowIndex = index;
  }

  changeZona($event: Event) {
    const valor = ($event.target as HTMLInputElement).value;

    this.service.negocioXZona(+valor).subscribe(response => {
      this.negocios_x_zona = response.data
      
    })
    
  }

  changeDistrito($event: Event) {
    const valor = ($event.target as HTMLInputElement).value;

    const distrito = this.listDistrito.find(x=>x.id == +valor)

    this.miZona = distrito?.Zona || ZonaInit
  }
 
  submit() {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }

    this.negociosEncontrados = [];
    this.selectedRowIndex = -1;
    this.negocioDescripcion = '';
    this.showLoading = true;

    if (!this.currentModel.id) {
      this.service.add(this.currentModel).subscribe(() => {
        this.showLoading = false;
        this.updateModelsEmit.emit();
        this.alert.showAlert('¡Éxito!', 'Se agregó correctamente', 'success');
        this.myForm.patchValue(NegocioInit);
        this.myForm.clearValidators();
        this.showLoading = false;

      }); 
    } else {
      this.service.update(this.currentModel.id, this.currentModel).subscribe(() => {
        this.showLoading = false;
        this.updateModelsEmit.emit();
        this.alert.showAlert('¡Éxito!', 'Se edito correctamente', 'success');
        this.myForm.patchValue(NegocioInit);
        this.myForm.clearValidators();
        this.showLoading = false; 
      });
    }
  }

  get getProvincias(){
    return this.provincias.filter(x=>x.idDepartamento==this.myForm.value.idDepartamento);
  }

  get getDistritos(){
    return this.listDistrito.filter(x=>x.idProvincia==this.myForm.value.idProvincia);
  }

  get getUrbanizacions(){
    return this.listUrbanizacion.filter(x=>x.idDistrito==this.myForm.value.idDistrito);
  }

  setModel(model: Negocio) {
    this.myForm.patchValue(model);
  }

  nuevo() {
    this.myForm.patchValue(NegocioInit);
    this.myForm.clearValidators()
  }

  isValidField(field: string): boolean | null {
    return this.validForm.isValidField(field, this.myForm);
  }

  getFieldError(field: string): string | null {
    return this.validForm.getFieldError(field, this.myForm);
  }
}
