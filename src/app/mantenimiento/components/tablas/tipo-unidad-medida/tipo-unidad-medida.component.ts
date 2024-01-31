import { Component, ViewChild } from '@angular/core';
import { TipoUnidadMedida, TipoUnidadMedidaInit } from '../../../interface/tipoUnidadMedida';
import { TipoUnidadMedidaFormComponent } from './tipo-unidad-medida-form/tipo-unidad-medida-form.component';
import { TipoUnidadMedidaService } from '../../../service/tipoUnidadMedida';


@Component({
  selector: 'app-tipo-unidad-medida',
  templateUrl: './tipo-unidad-medida.component.html'
})
export class TipoUnidadMedidaComponent {
  public modal: boolean = false
  public models: TipoUnidadMedida[] = [];
  public showLoading: boolean = false;
  public title: string = 'TipoUnidadMedida';

  public modelEdit: TipoUnidadMedida = TipoUnidadMedidaInit;

  @ViewChild('tipoUnidadMedidaForm')
  tipoUnidadMedidaForm!: TipoUnidadMedidaFormComponent;

  constructor(public service: TipoUnidadMedidaService) {
  }

  ngOnInit(): void {
    this.get();
  }

  get(): void {
    this.showLoading = true
    this.service.get().subscribe(response => { this.showLoading = false; this.models = response.data });
  }

  editModel(model: TipoUnidadMedida) {
    this.tipoUnidadMedidaForm.setModel(model)
  }
}
