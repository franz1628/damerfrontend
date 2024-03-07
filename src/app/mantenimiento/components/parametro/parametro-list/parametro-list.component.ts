import { Component, Input, Output, EventEmitter } from '@angular/core';
import { AlertService } from '../../../../shared/services/alert.service';
import { Parametro } from '../../../interface/parametro.interface';
import { ParametroService } from '../../../service/parametro.service';

@Component({
  selector: 'app-parametro-list',
  templateUrl: './parametro-list.component.html'
})
export class ParametroListComponent {
  public showLoading: boolean = true;
  constructor(public alert: AlertService, public service: ParametroService) { }

  @Input()
  public models: Parametro[] = []

  @Output() editEmit: EventEmitter<Parametro> = new EventEmitter()
  @Output() updateModelsEmit: EventEmitter<null> = new EventEmitter();

  selectedRowIndex: number = -1;

  editModel(model: Parametro) {
    this.editEmit.emit(model);
  } 

  elegirModel(model: any, index: number) {
    this.editEmit.emit(model);
    this.selectedRowIndex = index;
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
