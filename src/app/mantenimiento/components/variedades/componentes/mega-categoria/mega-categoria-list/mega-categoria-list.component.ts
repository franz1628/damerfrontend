import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AlertService } from '../../../../../../shared/services/alert.service';
import { MegaCategoriaService } from '../../../services/megaCategoria.service';
import { MegaCategoria } from '../../../interfaces/megaCategoria.interface';
import { Canasta } from '../../../interfaces/canasta.interface';

@Component({
  selector: 'app-mega-categoria-list',
  templateUrl: './mega-categoria-list.component.html'
})
export class MegaCategoriaListComponent {
  public showLoading: boolean = false;
  constructor(public alert: AlertService, public service: MegaCategoriaService) { }

  @Input()
  public models: MegaCategoria[] = []

  @Output() editEmit: EventEmitter<MegaCategoria> = new EventEmitter()
  @Output() updateModelsEmit: EventEmitter<number> = new EventEmitter();

  editModel(model: MegaCategoria) {
    this.editEmit.emit(model)
  }

  changeList(canasta:Canasta){
    this.service.getCodigoCanasta(canasta.codigo).subscribe(resp=>{
      this.models = resp.data;
    })
  }

  delete(model: MegaCategoria) {
    this.showLoading = true
    this.service.delete(model).subscribe(() => {
      this.showLoading = false;
      this.alert.showAlert('¡Éxito!', 'Se eliminó correctamente', 'success');
      this.updateModelsEmit.emit(model.codCanasta)
    });
  }
}
