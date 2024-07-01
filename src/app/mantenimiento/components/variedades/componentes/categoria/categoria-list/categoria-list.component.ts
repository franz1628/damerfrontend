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
  selectIndex: number=-1;
  constructor(public alert: AlertService, public service: CategoriaService) {
    
  }

  @Input()
  public models: Categoria[] = []

  @Output() editEmit: EventEmitter<Categoria> = new EventEmitter()
  @Output() eligeModelEmit: EventEmitter<Categoria> = new EventEmitter()
  @Output() updateModelsEmit: EventEmitter<null> = new EventEmitter();

  

  editModel(model: Categoria) {
    this.editEmit.emit(model)
  }

  eligeModel(model: Categoria,index:number) {
    this.editEmit.emit(model)
    this.selectIndex=index
  }

  changeList(canasta:Canasta, megaCategoria: MegaCategoria){
    this.selectIndex=-1
    this.service.getIdCanastaMegaCategoria(megaCategoria.id).subscribe(resp=>{
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
