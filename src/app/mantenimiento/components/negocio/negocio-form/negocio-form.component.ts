import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Negocio, NegocioInit } from '../../../interface/negocio.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '../../../../shared/services/alert.service';
import { ValidFormService } from '../../../../shared/services/validForm.service';
import { NegocioService } from '../../../service/negocio.service';


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
    codigo: [0, Validators.required],
    ruc: ['', Validators.required],
    nombreComercial: ['', Validators.required],
    nombreResumido: ['', Validators.required],
    nombreTip: ['', Validators.required],
    codCanal: [0, Validators.required],
    codZona: [0, Validators.required],
    direccion: ['', Validators.required],
    codDistrito: [0, Validators.required],
    codUrb: [0, Validators.required],
    codRuta: [0, Validators.required],
    lat: ['', Validators.required],
    lgn: ['', Validators.required],
    estado: [0, Validators.required],
    fechaRegistro: Date,
    fechaActualiza: Date,
    entregaFactura: [0, Validators.required],
    levantarNegocio: [0, Validators.required],
    negocioEquivalente: [0, Validators.required],
    telefono: ['', Validators.required],
    fax: ['', Validators.required],
    referencia: ['', Validators.required],
    zonaAccidentada: [0, Validators.required],
    zonaRiesgo: [0, Validators.required],
    aceptaProductos: [0, Validators.required],
    tipoHorario: [0, Validators.required],
    codVia: [0, Validators.required],
    numeroDomicilio: [0, Validators.required],
    interior: ['', Validators.required],
    manzana: ['', Validators.required],
    lote: ['', Validators.required],
  })

  //public listInputClasificado : Provincia[] = [];

  constructor(public alert: AlertService, public fb: FormBuilder, public validForm: ValidFormService, public service: NegocioService) {

  }

  ngOnInit() {
    this.showLoading = true
    //this.provinciaService.get().subscribe(response => { this.showLoading = false; this.listProvincia = response.data });
  }

  get currentModel() {
    return this.myForm.value as Negocio;
  }

  buscarNegocio($event: Event) {
    const codigo = ($event.target as HTMLInputElement).value;
    this.service.getId(parseInt(codigo)).subscribe(resp => {
      const negocio = resp.data;
    });
    
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
