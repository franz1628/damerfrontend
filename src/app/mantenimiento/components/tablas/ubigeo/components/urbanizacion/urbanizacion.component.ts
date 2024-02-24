import { Component, ViewChild } from '@angular/core';
import { Urbanizacion, UrbanizacionInit } from '../../../interfaces/urbanizacion.interface';
import { UrbanizacionFormComponent } from './urbanizacion-form/urbanizacion-form.component';
import { UrbanizacionService } from '../../../service/urbanizacion.service';
import { AlertService } from '../../../../../../shared/services/alert.service';

@Component({
  selector: 'app-urbanizacion',
  templateUrl: './urbanizacion.component.html'
})
export class UrbanizacionComponent {
  public modal: boolean = false
  public models: Urbanizacion[] = [];
  public showLoading: boolean = false;
  public title: string = 'Urbanizacion';

  public modelEdit: Urbanizacion = UrbanizacionInit;

  @ViewChild('urbanizacionForm')
  urbanizacionForm!: UrbanizacionFormComponent;

  constructor(public service: UrbanizacionService, public alert: AlertService) {
  }

  ngOnInit(): void { 
    this.get();
  }

  get(): void {
    this.showLoading = true
    this.service.get().subscribe(response => { this.showLoading = false; this.models = response.data });
  }

  editModel(model: Urbanizacion) {
    this.urbanizacionForm.setModel(model)
  }
}
