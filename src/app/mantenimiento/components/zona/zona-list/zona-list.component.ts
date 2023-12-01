import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AlertService } from '../../../../shared/services/alert.service';
import { ZonaService } from '../../tablas/service/zona.service';
import { Zona } from '../../tablas/interfaces/zona.interface';

@Component({
  selector: 'app-zona-list',
  templateUrl: './zona-list.component.html'
})
export class ZonaListComponent {
  public showLoading: boolean = false;
  constructor(public alert: AlertService, public service: ZonaService) { }

  @Input()
  public models: Zona[] = []

  @Output() editEmit: EventEmitter<Zona> = new EventEmitter()
  @Output() updateModelsEmit: EventEmitter<null> = new EventEmitter();

  editModel(model: Zona) {
    this.editEmit.emit(model)
  }

  delete(model: Zona) {
    this.showLoading = true
    this.service.delete(model).subscribe(() => {
      this.showLoading = false;
      this.alert.showAlert('¡Éxito!', 'Se eliminó correctamente', 'success');
      this.updateModelsEmit.emit()
    });
  }
}
