import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AlertService } from '../../../../../shared/services/alert.service';
import { UnidadMedidaService } from '../../../../service/unidadMedida';
import { UnidadMedida } from '../../../../interface/unidadMedida';

@Component({
  selector: 'app-unidad-medida-list',
  templateUrl: './unidad-medida-list.component.html'
})
export class UnidadMedidaListComponent {
  public showLoading: boolean = false;
  constructor(public alert: AlertService, public service: UnidadMedidaService) { }

  @Input()
  public models: UnidadMedida[] = []

  @Output() editEmit: EventEmitter<UnidadMedida> = new EventEmitter()
  @Output() updateModelsEmit: EventEmitter<null> = new EventEmitter();

  editModel(model: UnidadMedida) {
    this.editEmit.emit(model)
  }

  delete(model: UnidadMedida) {
    this.showLoading = true
    this.service.delete(model).subscribe(() => {
      this.showLoading = false;
      this.alert.showAlert('¡Éxito!', 'Se eliminó correctamente', 'success');
      this.updateModelsEmit.emit()
    });
  }
}
