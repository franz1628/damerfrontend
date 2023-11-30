import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AlertService } from '../../../../../../../shared/services/alert.service';
import { Departamento } from '../../../interface/departamento.interface';
import { DepartamentoService } from '../../../service/departamento.service';

@Component({
  selector: 'app-departamento-list',
  templateUrl: './departamento-list.component.html'
})
export class DepartamentoListComponent {
  public showLoading: boolean = false;
  constructor(public alert: AlertService, public service: DepartamentoService) { }

  @Input()
  public models: Departamento[] = []

  @Output() editEmit: EventEmitter<Departamento> = new EventEmitter()
  @Output() updateModelsEmit: EventEmitter<null> = new EventEmitter();

  editModel(model: Departamento) {
    this.editEmit.emit(model)
  }

  delete(model: Departamento) {
    this.showLoading = true
    this.service.delete(model).subscribe(() => {
      this.showLoading = false;
      this.alert.showAlert('¡Éxito!', 'Se eliminó correctamente', 'success');
      this.updateModelsEmit.emit()
    });
  }

}
