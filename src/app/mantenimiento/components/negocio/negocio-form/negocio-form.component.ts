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
import { Via } from '../../../interface/via';
import { ViaService } from '../../../service/via';
import * as XLSX from 'xlsx';


@Component({
  selector: 'app-negocio-form',
  templateUrl: './negocio-form.component.html'
})
export class NegocioFormComponent {
  @Input()
  model: Negocio = NegocioInit;
  showLoading: boolean = false;
  @Output() updateModelsEmit: EventEmitter<null> = new EventEmitter();

  buscaNegocioZona = ''

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
    fax: [''],
    referencia: ['',Validators.required],
    zonaAccidentada: ['',Validators.required],
    zonaRiesgo: ['',Validators.required],
    aceptaProductos: [1],
    tipoHorario: [1],
    idVia: [1],
    numeroDomicilio: [1],
    interior: [''],
    manzana: [''],
    lote: [''],
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
  listVias : Via[] = [];
  misVias : Via[] = [];

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
    private zonaService:ZonaService,
    private viaService:ViaService
  ) {
  }

  ngOnInit() {
    this.showLoading = true
    this.canalService.get().subscribe(response => { this.showLoading = false; this.listCanal = response.data });
    this.distritoService.get().subscribe(response => { this.showLoading = false; this.listDistrito = response.data });
    this.urbanizacionService.get().subscribe(response => { this.showLoading = false; this.listUrbanizacion = response.data });
    this.departamentoService.get().subscribe(response => { this.showLoading = false; this.departamentos = response.data });
    this.provinciaService.get().subscribe(response => { this.showLoading = false; this.provincias = response.data });
    this.zonaService.getPlanificador().subscribe(response => {this.showLoading = false; this.listZonas = response.data })
    this.viaService.get().subscribe(response => {this.showLoading = false; this.listVias = response.data })
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
   this.myForm.patchValue({
    idDepartamento:miNegocio.Distrito.Provincia.idDepartamento,
    idProvincia : miNegocio.Distrito.idProvincia,
    idDistrito: miNegocio.idDistrito
   })
  }

  changeZona($event: Event) {
    this.showLoading=true;
    const valor = ($event.target as HTMLInputElement).value;

    this.service.negocioXZona(+valor).subscribe(response => {
      this.negocios_x_zona = response.data
      this.showLoading=false;
    })
    
  }

  changeDistrito($event: Event) {
    const valor = ($event.target as HTMLInputElement).value;

    const distrito = this.listDistrito.find(x=>x.id == +valor)
    this.miZona = distrito?.Zona || ZonaInit

    this.misVias = this.listVias.filter(x=>x.idDistrito == +valor)

  }

    exportExcel() {
      if(this.negocios_x_zona.length==0){
        this.alert.showAlert("Advertencia","No hay negocios para exportar","warning");
        return
      }

      const worksheet = this.skusToWorksheet(this.negocios_x_zona);  // Convierte los SKUs a hoja de trabajo
      const workbook = XLSX.utils.book_new();  // Crea un nuevo libro de trabajo (workbook)
      XLSX.utils.book_append_sheet(workbook, worksheet, 'SKUs');  // Añade la hoja al libro de trabajo
  
      // Exportar como archivo .xlsx
      XLSX.writeFile(workbook, 'negocios_ciudad.xlsx');
    }
  
    skusToWorksheet(negocios: Negocio[]): XLSX.WorkSheet {
      const data: any[] = [];  
  
      const filaCabecera: string[] = [];

      filaCabecera.push('Dirección');
      filaCabecera.push('Canal');
      filaCabecera.push('Ciudad');
      filaCabecera.push('Distrito');
      filaCabecera.push('Estado');
      filaCabecera.push('Latitud');
      filaCabecera.push('Longitud');
      filaCabecera.push('Fecha Creación');
      filaCabecera.push('Fecha Modificación');


      data.push(filaCabecera);
  
      for (const negocio of negocios) {
        const fila: string[] = [];

        fila.push(negocio.direccion);
        fila.push(negocio.Canal.descripcion);
        fila.push(negocio.Distrito.Zona.descripcion);
        fila.push(negocio.Distrito.descripcion);
        fila.push(negocio.estado?"ACTIVO":"INACTIVO");
        fila.push(negocio.lat);
        fila.push(negocio.lgn);
        fila.push(negocio.fechaRegistro);
        fila.push(negocio.fechaModificacion);
  
        data.push(fila);
      }

      return XLSX.utils.aoa_to_sheet(data);
    }
 
  submit() {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();

      Object.keys(this.myForm.controls).forEach(field => {
        const control = this.myForm.get(field);
  
        if (control?.invalid) {
          // Obtén los errores del campo
          const errors = control.errors;
          console.log(`El campo ${field} tiene los siguientes errores:`, errors);
        }
      });

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
    const a = this.validForm.isValidField(field, this.myForm)
    return this.validForm.isValidField(field, this.myForm);
  }

  getFieldError(field: string): string | null {
    return this.validForm.getFieldError(field, this.myForm);
  }
}
