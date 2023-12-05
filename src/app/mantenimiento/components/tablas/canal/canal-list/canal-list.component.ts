import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AlertService } from '../../../../../shared/services/alert.service';
import { CanalService } from '../../service/canal.sevice';
import { Canal } from '../../interfaces/canal.interface';

@Component({
  selector: 'app-canal-list',
  templateUrl: './canal-list.component.html'
})
export class CanalListComponent {
  public showLoading: boolean = false;
  constructor(public alert: AlertService, public service: CanalService) { }

  @Input()
  public models: Canal[] = []

  @Output() editEmit: EventEmitter<Canal> = new EventEmitter()
  @Output() updateModelsEmit: EventEmitter<null> = new EventEmitter();

  editModel(model: Canal) {
    this.editEmit.emit(model)
  }

  delete(model: Canal) {
    this.showLoading = true
    this.service.delete(model).subscribe(() => {
      this.showLoading = false;
      this.alert.showAlert('¡Éxito!', 'Se eliminó correctamente', 'success');
      this.updateModelsEmit.emit()
    });
  }
}
