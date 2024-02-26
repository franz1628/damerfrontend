import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AlertService } from '../../../../../../shared/services/alert.service';
import { CategoriaService } from '../../../services/categoria.service';
import { Categoria } from '../../../interfaces/categoria.interface';
import { Canasta } from '../../../interfaces/canasta.interface';
import { MegaCategoria } from '../../../interfaces/megaCategoria.interface';

@Component({
  selector: 'app-categoria-list',
  templateUrl: './categoria-list.component.html'
})
export class CategoriaListComponent {
  public showLoading: boolean = false;
  constructor(public alert: AlertService, public service: CategoriaService) {
    
  }

  @Input()
  public models: Categoria[] = []

  @Output() editEmit: EventEmitter<Categoria> = new EventEmitter()
  @Output() updateModelsEmit: EventEmitter<null> = new EventEmitter();

  

  editModel(model: Categoria) {
    this.editEmit.emit(model)
  }

  changeList(canasta:Canasta, megaCategoria: MegaCategoria){
    this.service.getIdCanastaMegaCategoria(canasta.id,megaCategoria.id).subscribe(resp=>{
      this.models = resp.data;
    })
  }

  delete(model: Categoria) {
    this.showLoading = true
    this.service.delete(model).subscribe(() => {
      this.showLoading = false;
      this.alert.showAlert('¡Éxito!', 'Se eliminó correctamente', 'success');
      this.updateModelsEmit.emit()
    });
  }
}
