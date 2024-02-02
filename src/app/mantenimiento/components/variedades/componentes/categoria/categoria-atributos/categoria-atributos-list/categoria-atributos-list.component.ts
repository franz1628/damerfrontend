import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CategoriaAtributoTecnico } from '../../../../interfaces/categoriaAtributoTecnico';
import { CategoriaAtributoTecnicoService } from '../../../../services/categoriaAtributoTecnico.service';
import { AlertService } from '../../../../../../../shared/services/alert.service';

@Component({
  selector: 'app-categoria-atributos-list',
  templateUrl: './categoria-atributos-list.component.html'
}) 
export class CategoriaAtributosListComponent {
  public showLoading: boolean = false;
  constructor(public alert: AlertService, public service: CategoriaAtributoTecnicoService) { }

  @Input()
  public models: CategoriaAtributoTecnico[] = []

  @Output() editEmit: EventEmitter<CategoriaAtributoTecnico> = new EventEmitter()
  @Output() updateModelsEmit: EventEmitter<null> = new EventEmitter();

  editModel(model: CategoriaAtributoTecnico) {
    this.editEmit.emit(model)
  }

  delete(model: CategoriaAtributoTecnico) {
    this.showLoading = true
    this.service.delete(model).subscribe(() => {
      this.showLoading = false;
      this.alert.showAlert('¡Éxito!', 'Se eliminó correctamente', 'success');
      this.updateModelsEmit.emit()
    });
  }

}
