import { Component, Input } from '@angular/core';
import { Pais } from '../interface/pais.interface';
import { PaisService } from '../service/pais.service';
import { AlertService } from '../../shared/services/alert.service';

@Component({
  selector: 'app-pais',
  templateUrl: './pais.component.html'
})
export class PaisComponent {

  public modal: boolean = false
  public models: Pais[] = [];
  public showLoading: boolean = false;
  public title: string = 'País';
  public modelEdit: Pais = {
    id: 0,
    descripcion: '',
    estado: 1
  }

  constructor(public service: PaisService, public alert: AlertService) {
  }

  ngOnInit(): void {
    this.get();
  }

  get(): void {
    this.showLoading = true
    this.service.get().subscribe(response => { this.showLoading = false; this.models = response.data });
  }

  add(model: Pais) {
    this.showLoading = true
    this.service.add(model).subscribe(() => {
      this.showLoading = false;
      this.get();
      this.alert.showAlert('¡Éxito!', 'Se agregó correctamente', 'success');
    });
  }

  update(model: Pais) {
    this.showLoading = true
    this.service.update(model.id, model).subscribe(() => {
      this.showLoading = false;
      this.get();
      this.alert.showAlert('¡Éxito!', 'Se actualizó correctamente', 'success');
      this.modal = false
    });
  }


  delete(model: Pais) {
    this.showLoading = true
    this.service.delete(model).subscribe(() => {
      this.showLoading = false;
      this.get();
      this.alert.showAlert('¡Éxito!', 'Se eliminó correctamente', 'success');
    });

  }

  editMotel(model: Pais) {
    this.modelEdit = model
    this.modal = true
  }
}
