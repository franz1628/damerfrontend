import { Component, Input, Output, EventEmitter } from '@angular/core';
import { AlertService } from '../../../../shared/services/alert.service';
import { Parametro } from '../../../interface/parametro.interface';
import { ParametroService } from '../../../service/parametro.service';

@Component({
  selector: 'app-parametro-list',
  templateUrl: './parametro-list.component.html'
})
export class ParametroListComponent {
  public showLoading: boolean = false;
  constructor(public alert: AlertService, public service: ParametroService) { }

  @Input()
  public models: Parametro[] = []

  @Output() editEmit: EventEmitter<Parametro> = new EventEmitter()
  @Output() updateModelsEmit: EventEmitter<null> = new EventEmitter();

  editModel(model: Parametro) {
    this.editEmit.emit(model)
  }

  delete(model: Parametro) {
    this.showLoading = true
    this.service.delete(model).subscribe(() => {
      this.showLoading = false;
      this.alert.showAlert('¡Éxito!', 'Se eliminó correctamente', 'success');
      this.updateModelsEmit.emit()
    });
  }
}
