import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AlertService } from '../../../../../../../shared/services/alert.service';
import { DistritoService } from '../../../service/distrito.service';
import { Distrito } from '../../../interface/distrito.interface';

@Component({
  selector: 'app-distrito-list',
  templateUrl: './distrito-list.component.html'
})
export class DistritoListComponent {
  public showLoading: boolean = false;
  constructor(public alert: AlertService, public service: DistritoService) { }

  @Input()
  public models: Distrito[] = []

  @Output() editEmit: EventEmitter<Distrito> = new EventEmitter()
  @Output() updateModelsEmit: EventEmitter<null> = new EventEmitter();

  editModel(model: Distrito) {
    this.editEmit.emit(model)
  }

  delete(model: Distrito) {
    this.showLoading = true
    this.service.delete(model).subscribe(() => {
      this.showLoading = false;
      this.alert.showAlert('¡Éxito!', 'Se eliminó correctamente', 'success');
      this.updateModelsEmit.emit()
    });
  }
}
