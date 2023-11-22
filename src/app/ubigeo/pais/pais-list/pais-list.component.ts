import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Pais } from '../../interface/pais.interface';
import { Observable,catchError,of,throwError  } from 'rxjs';
import { AlertService } from '../../../shared/services/alert.service';

@Component({
  selector: 'app-pais-list',
  templateUrl: './pais-list.component.html'
})
export class PaisListComponent {
  constructor(public alert: AlertService){

  }

  @Input()
  public models: Pais[] = []

  @Output() editEmit: EventEmitter<Pais> = new EventEmitter()
  editModel(model: Pais) {
    this.editEmit.emit(model)
  }


  @Output() deleteEmit: EventEmitter<Pais> = new EventEmitter()
  delete(model: Pais) {
    this.alert.showAlertConfirm('¡Advertencia!','¿Está seguro de eliminar?','info',()=>this.deleteEmit.emit(model));
    
  }

}
