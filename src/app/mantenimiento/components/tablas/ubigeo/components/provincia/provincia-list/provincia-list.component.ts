import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AlertService } from '../../../../../../../shared/services/alert.service';
import { DepartamentoService } from '../../../service/departamento.service';
import { ProvinciaService } from '../../../service/provincia.service';
import { Provincia } from '../../../interface/provincia.interface';

@Component({
  selector: 'app-provincia-list',
  templateUrl: './provincia-list.component.html'
})
export class ProvinciaListComponent {
  public showLoading: boolean = false;
  constructor(public alert: AlertService, public service: ProvinciaService) { }

  @Input()
  public models: Provincia[] = []

  @Output() editEmit: EventEmitter<Provincia> = new EventEmitter()
  @Output() updateModelsEmit: EventEmitter<null> = new EventEmitter();

  editModel(model: Provincia) {
    this.editEmit.emit(model)
  }

  delete(model: Provincia) {
    this.showLoading = true
    this.service.delete(model).subscribe(() => {
      this.showLoading = false;
      this.alert.showAlert('¡Éxito!', 'Se eliminó correctamente', 'success');
      this.updateModelsEmit.emit()
    });
  }
}
