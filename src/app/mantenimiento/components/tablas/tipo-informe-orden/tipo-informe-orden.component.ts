import { Component, ViewChild } from '@angular/core';
import { TipoInformeOrden, TipoInformeOrdenInit } from '../../../interface/tipoInformeOrden';
import { TipoInformeOrdenFormComponent } from './tipo-informe-orden-form/tipo-informe-orden-form.component';
import { TipoInformeOrdenService } from '../../../service/tipoInformeOrden';

@Component({
  selector: 'app-tipo-informe-orden',
  templateUrl: './tipo-informe-orden.component.html'
})
export class TipoInformeOrdenComponent {
  public modal: boolean = false
  public models: TipoInformeOrden[] = [];
  public showLoading: boolean = false;
  public title: string = 'Tipo Informe Orden';

  public modelEdit: TipoInformeOrden = TipoInformeOrdenInit;

  @ViewChild('tipoInformeOrdenForm')
  tipoInformeOrdenForm!: TipoInformeOrdenFormComponent;

  constructor(public service: TipoInformeOrdenService) {
  }

  ngOnInit(): void {
    this.get();
  }

  get(): void {
    this.showLoading = true
    this.service.get().subscribe(response => { this.showLoading = false; this.models = response.data });
  }

  editModel(model: TipoInformeOrden) {
    this.tipoInformeOrdenForm.setModel(model)
  }
}
