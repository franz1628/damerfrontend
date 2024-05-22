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
  selectIndex: number=-1;
  constructor(public alert: AlertService, public service: CanastaService) { }

  @Input()
  public models: Canasta[] = []

  @Output() editEmit: EventEmitter<Canasta> = new EventEmitter()
  @Output() eligeModelEmit: EventEmitter<Canasta> = new EventEmitter()
  @Output() updateModelsEmit: EventEmitter<null> = new EventEmitter();

  editModel(model: Canasta) {
    this.editEmit.emit(model)
  }

  eligeModel(model: Canasta,index:number) {
    this.eligeModelEmit.emit(model)
    this.selectIndex=index
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
