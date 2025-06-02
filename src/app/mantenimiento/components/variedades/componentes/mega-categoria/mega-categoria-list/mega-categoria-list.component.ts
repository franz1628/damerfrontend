import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AlertService } from '../../../../../../shared/services/alert.service';
import { MegaCategoriaService } from '../../../services/megaCategoria.service';
import { MegaCategoria } from '../../../interfaces/megaCategoria.interface';
import { Canasta } from '../../../interfaces/canasta.interface';
import { AuthService } from '../../../../../../auth/auth.service';

@Component({
  selector: 'app-mega-categoria-list',
  templateUrl: './mega-categoria-list.component.html'
})
export class MegaCategoriaListComponent {
  public showLoading: boolean = false;
  selectIndex: number=-1;
  constructor(
    public alert: AlertService, 
    public service: MegaCategoriaService,
    public authService: AuthService
  ) { }

  @Input()
  public models: MegaCategoria[] = []

  @Output() editEmit: EventEmitter<MegaCategoria> = new EventEmitter()
  @Output() eligeModelEmit: EventEmitter<MegaCategoria> = new EventEmitter()
  @Output() updateModelsEmit: EventEmitter<number> = new EventEmitter();

  editModel(model: MegaCategoria) {
    this.editEmit.emit(model)
  }

  eligeModel(model: MegaCategoria,index:number) {
    this.eligeModelEmit.emit(model)
    this.selectIndex=index
  }

  changeList(canasta:Canasta){
    this.selectIndex=-1
    this.service.getIdCanasta(canasta.id).subscribe(resp=>{
      this.models = resp.data;
    })
  }

  delete(model: MegaCategoria) {
    this.showLoading = true
    this.service.delete(model).subscribe(() => {
      this.showLoading = false;
      this.alert.showAlert('¡Éxito!', 'Se eliminó correctamente', 'success');
      this.updateModelsEmit.emit(model.idCanasta)
    });
  }
}
