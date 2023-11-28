import { Component, Input, Output, EventEmitter } from '@angular/core';
import { AlertService } from '../../../../shared/services/alert.service';
import { Parametro } from '../../../interface/parametro.interface';

@Component({
  selector: 'app-parametro-list',
  templateUrl: './parametro-list.component.html'
})
export class ParametroListComponent {
 
  constructor(public alert: AlertService) {

  }

  @Input()
  public models: Parametro[] = []

  @Output() editEmit: EventEmitter<Parametro> = new EventEmitter()
  /*editModel(model: Parametro) {
    this.editEmit.emit(model)
  }*/
  
  getModels(){
    return [...this.models]
  }

  @Output() deleteEmit: EventEmitter<Parametro> = new EventEmitter()
  delete(model: Parametro) {
    this.alert.showAlertConfirm('¡Advertencia!', '¿Está seguro de eliminar?', 'info', () => this.deleteEmit.emit(model));

  }

  ver(model: Parametro) {

    this.editEmit.emit(model)
  }
}
