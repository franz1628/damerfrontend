import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { UnidadMedida, UnidadMedidaInit } from '../../../interface/unidadMedida';
import { UnidadMedidaFormComponent } from './unidad-medida-form/unidad-medida-form.component';
import { UnidadMedidaService } from '../../../service/unidadMedida';


@Component({
  selector: 'app-unidad-medida',
  templateUrl: './unidad-medida.component.html'
})
export class UnidadMedidaComponent {
  public modal: boolean = false
  public models: UnidadMedida[] = [];
  public showLoading: boolean = false;
  public title: string = 'UnidadMedida';

  public modelEdit: UnidadMedida = UnidadMedidaInit;

  @ViewChild('unidadMedidaForm')
  unidadMedidaForm!: UnidadMedidaFormComponent;

  constructor(public service: UnidadMedidaService) {
  }

  ngOnInit(): void {
    this.get();
  }

  get(): void {
    this.showLoading = true
    this.service.get().subscribe(response => { this.showLoading = false; this.models = response.data });
  }

  editModel(model: UnidadMedida) {
    this.unidadMedidaForm.setModel(model)
  }
}
