import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AlertService } from '../../../../../../../shared/services/alert.service';
import { UrbanizacionService } from '../../../../service/urbanizacion.service';
import { Urbanizacion } from '../../../../interfaces/urbanizacion.interface';
import { AuthService } from '../../../../../../../auth/auth.service';

@Component({
  selector: 'app-urbanizacion-list',
  templateUrl: './urbanizacion-list.component.html'
})
export class UrbanizacionListComponent {
  public showLoading: boolean = false;
  constructor(public alert: AlertService, public service: UrbanizacionService, public authService: AuthService) { }

  @Input()
  public models: Urbanizacion[] = []

  @Output() editEmit: EventEmitter<Urbanizacion> = new EventEmitter()
  @Output() updateModelsEmit: EventEmitter<null> = new EventEmitter();

  editModel(model: Urbanizacion) {
    this.editEmit.emit(model)
  }

  delete(model: Urbanizacion) {
    this.showLoading = true
    this.service.delete(model).subscribe(() => {
      this.showLoading = false;
      this.alert.showAlert('¡Éxito!', 'Se eliminó correctamente', 'success');
      this.updateModelsEmit.emit()
    });
  }
}
