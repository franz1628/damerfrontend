import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AlertService } from '../../../../../../shared/services/alert.service';
import { CanastaService } from '../../../services/canasta.service';
import { Canasta } from '../../../interfaces/canasta.interface';

@Component({
  selector: 'app-canasta-list',
  templateUrl: './canasta-list.component.html'
})
export class CanastaListComponent {
  public showLoading: boolean = false;
  constructor(public alert: AlertService, public service: CanastaService) { }

  @Input()
  public models: Canasta[] = []

  @Output() editEmit: EventEmitter<Canasta> = new EventEmitter()
  @Output() updateModelsEmit: EventEmitter<null> = new EventEmitter();

  editModel(model: Canasta) {
    this.editEmit.emit(model)
  }

  delete(model: Canasta) {
    this.showLoading = true
    this.service.delete(model).subscribe(() => {
      this.showLoading = false;
      this.alert.showAlert('¡Éxito!', 'Se eliminó correctamente', 'success');
      this.updateModelsEmit.emit()
    });
  }
}
