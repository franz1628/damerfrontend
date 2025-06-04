import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AlertService } from '../../../../../shared/services/alert.service';
import { TipoUnidadMedidaService } from '../../../../service/tipoUnidadMedida';
import { TipoUnidadMedida } from '../../../../interface/tipoUnidadMedida';
import { AuthService } from '../../../../../auth/auth.service';


@Component({
  selector: 'app-tipo-unidad-medida-list',
  templateUrl: './tipo-unidad-medida-list.component.html'
})
export class TipoUnidadMedidaListComponent {
  public showLoading: boolean = false;
  constructor(public alert: AlertService, public service: TipoUnidadMedidaService, public authService:AuthService) { }

  @Input()
  public models: TipoUnidadMedida[] = []

  @Output() editEmit: EventEmitter<TipoUnidadMedida> = new EventEmitter()
  @Output() updateModelsEmit: EventEmitter<null> = new EventEmitter();

  editModel(model: TipoUnidadMedida) {
    this.editEmit.emit(model)
  }

  delete(model: TipoUnidadMedida) {
    this.showLoading = true
    this.service.delete(model).subscribe(() => {
      this.showLoading = false;
      this.alert.showAlert('¡Éxito!', 'Se eliminó correctamente', 'success');
      this.updateModelsEmit.emit()
    });
  }
}
