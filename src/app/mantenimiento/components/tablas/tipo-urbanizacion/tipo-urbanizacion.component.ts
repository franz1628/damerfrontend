import { Component, ViewChild } from '@angular/core';
import { TipoUrbanizacion, TipoUrbanizacionInit } from '../ubigeo/interface/tipoUrbzanizacion.interface';
import { TipoUrbanizacionService } from '../ubigeo/service/tipoUrbanizacion.service';
import { AlertService } from '../../../../shared/services/alert.service';
import { TipoUrbanizacionFormComponent } from './tipo-urbanizacion-form/tipo-urbanizacion-form.component';

@Component({
  selector: 'app-tipo-urbanizacion',
  templateUrl: './tipo-urbanizacion.component.html'
})
export class TipoUrbanizacionComponent {
  public modal: boolean = false
  public models: TipoUrbanizacion[] = [];
  public showLoading: boolean = false;
  public title: string = 'Tipo de Urbanización';

  public modelEdit: TipoUrbanizacion = TipoUrbanizacionInit;

  @ViewChild('tipoUrbanizacionForm')
  tipoUrbanizacionForm!: TipoUrbanizacionFormComponent;

  constructor(public service: TipoUrbanizacionService, public alert: AlertService) {
  }

  ngOnInit(): void {
    this.get();
  }

  get(): void {
    this.showLoading = true
    this.service.get().subscribe(response => { this.showLoading = false; this.models = response.data });
  }

  editModel(model: TipoUrbanizacion) {
    this.tipoUrbanizacionForm.setModel(model)
  }
}
