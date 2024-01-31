import { Component, EventEmitter, Input, Output } from "@angular/core";
import { AlertService } from "../../../../../shared/services/alert.service";
import { TipoInformeOrden } from "../../../../interface/tipoInformeOrden";
import { TipoInformeOrdenService } from "../../../../service/tipoInformeOrden";


@Component({
  selector: 'app-tipo-informe-orden-list',
  templateUrl: './tipo-informe-orden-list.component.html'
})
export class TipoInformeOrdenListComponent {
  public showLoading: boolean = false;
  constructor(public alert: AlertService, public service: TipoInformeOrdenService) { }

  @Input()
  public models: TipoInformeOrden[] = []

  @Output() editEmit: EventEmitter<TipoInformeOrden> = new EventEmitter()
  @Output() updateModelsEmit: EventEmitter<null> = new EventEmitter();

  editModel(model: TipoInformeOrden) {
    this.editEmit.emit(model)
  }

  delete(model: TipoInformeOrden) {
    this.showLoading = true
    this.service.delete(model).subscribe(() => {
      this.showLoading = false;
      this.alert.showAlert('¡Éxito!', 'Se eliminó correctamente', 'success');
      this.updateModelsEmit.emit()
    });
  }
}
  
