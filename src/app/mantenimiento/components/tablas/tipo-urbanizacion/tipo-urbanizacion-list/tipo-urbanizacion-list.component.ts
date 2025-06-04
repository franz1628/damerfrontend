import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AlertService } from '../../../../../shared/services/alert.service';
import { TipoUrbanizacionService } from '../../ubigeo/service/tipoUrbanizacion.service';
import { TipoUrbanizacion } from '../../ubigeo/interface/tipoUrbzanizacion.interface';
import { AuthService } from '../../../../../auth/auth.service';

@Component({
  selector: 'app-tipo-urbanizacion-list',
  templateUrl: './tipo-urbanizacion-list.component.html'
})
export class TipoUrbanizacionListComponent {
  public showLoading: boolean = false;
  constructor(
    public alert: AlertService, 
    public service: TipoUrbanizacionService,
    public authService: AuthService
  ) { }

  @Input()
  public models: TipoUrbanizacion[] = []

  @Output() editEmit: EventEmitter<TipoUrbanizacion> = new EventEmitter()
  @Output() updateModelsEmit: EventEmitter<null> = new EventEmitter();

  editModel(model: TipoUrbanizacion) {
    this.editEmit.emit(model)
  }

  delete(model: TipoUrbanizacion) {
    this.showLoading = true
    this.service.delete(model).subscribe(() => {
      this.showLoading = false;
      this.alert.showAlert('¡Éxito!', 'Se eliminó correctamente', 'success');
      this.updateModelsEmit.emit()
    });
  }
}
