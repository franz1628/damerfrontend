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


@Component({
  selector: 'app-negocio-form',
  templateUrl: './negocio-form.component.html'
})
export class NegocioFormComponent {


  @Input()
  public model: Negocio = NegocioInit;
  public showLoading: boolean = false;
  @Output() updateModelsEmit: EventEmitter<null> = new EventEmitter();
  public myForm: FormGroup = this.fb.group({
    id: [0, Validators.required],
    codigo: [2, Validators.required],
    ruc: ['', Validators.required],
    nombreComercial: ['', Validators.required],
    nombreResumido: [''],
    nombreTip: [''],
    codCanal: [0, Validators.required],
    direccion: ['', Validators.required],
    codDistrito: [0, Validators.required],
    codUrb: [0, Validators.required],
    codRuta: [0, Validators.required],
    lat: ['', Validators.required],
    lgn: ['', Validators.required],
    entregaFactura: [1, Validators.required],
    levantarNegocio: [1, Validators.required],
    negocioEquivalente: [1, Validators.required],
    telefono: ['', Validators.required],
    fax: ['', Validators.required],
    referencia: ['', Validators.required],
    zonaAccidentada: [1, Validators.required],
    zonaRiesgo: [1, Validators.required],
    aceptaProductos: [1, Validators.required],
    tipoHorario: [1, Validators.required],
    codVia: [1, Validators.required],
    numeroDomicilio: [1, Validators.required],
    interior: ['', Validators.required],
    manzana: ['', Validators.required],
    lote: ['', Validators.required],
  })

  public listCanal : Canal[] = [];
  public listDistrito : Distrito[] = [];
  public listUrbanizacion : Urbanizacion[] = [];

  constructor(
    public alert: AlertService,
    public fb: FormBuilder,
    public validForm: ValidFormService,
    private service: NegocioService,
    private canalService : CanalService,
    private distritoService: DistritoService,
    private urbanizacionService: UrbanizacionService
    ) {
  }

  ngOnInit() {
    this.showLoading = true
    this.canalService.get().subscribe(response => { this.showLoading = false; this.listCanal = response.data });
    this.distritoService.get().subscribe(response => { this.showLoading = false; this.listDistrito = response.data });
    this.urbanizacionService.get().subscribe(response => { this.showLoading = false; this.listUrbanizacion = response.data });
  }

  get currentModel() {
    return this.myForm.value as Negocio;
  }

  buscarNegocio($event: Event) {
    const codigo = ($event.target as HTMLInputElement).value;
    this.showLoading = true;
    this.service.getCodigo(parseInt(codigo)).subscribe(resp => {
      
      const negocio = resp.data;

      if(negocio){
        this.setModel(negocio)
      }else{
        this.alert.showAlert('¡Mensaje!', 'No existe un negocio con ese código', 'warning');
        this.myForm.reset();
        this.myForm.patchValue({codigo});
      }
      this.showLoading = false;
      
    });

    return false;
  }

  submit() {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }

    if (!this.currentModel.id) {
      this.service.add(this.currentModel).subscribe(() => {
        this.showLoading = false;
        this.updateModelsEmit.emit();
        this.alert.showAlert('¡Éxito!', 'Se agregó correctamente', 'success');
        this.myForm.patchValue(NegocioInit);
        this.myForm.clearValidators();
        this.myForm.reset();
      });
    } else {
      this.service.update(this.currentModel.id, this.currentModel).subscribe(() => {
        this.showLoading = false;
        this.updateModelsEmit.emit();
        this.alert.showAlert('¡Éxito!', 'Se edito correctamente', 'success');
      });
    }
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
