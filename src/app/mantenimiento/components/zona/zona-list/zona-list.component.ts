import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AlertService } from '../../../../shared/services/alert.service';
import { ZonaService } from '../../tablas/service/zona.service';
import { Zona } from '../../tablas/interfaces/zona.interface';
import { AuthService } from '../../../../auth/auth.service';

@Component({
  selector: 'app-zona-list',
  templateUrl: './zona-list.component.html'
})
export class ZonaListComponent {
  showLoading: boolean = false;
  selectIndex:number=-1

  constructor(
    public alert: AlertService, 
    public service: ZonaService,
    public authService: AuthService
  ) { }

  @Input()
  models: Zona[] = []

  @Output() editEmit: EventEmitter<Zona> = new EventEmitter()
  @Output() eligeModelEmit: EventEmitter<Zona> = new EventEmitter()
  @Output() updateModelsEmit: EventEmitter<null> = new EventEmitter();

  editModel(model: Zona) {
    this.editEmit.emit(model)
  }

  elegir(model: Zona,index: number) {
    this.selectIndex=index
    this.eligeModelEmit.emit(model)
  }

  delete(model: Zona) {
    this.alert.showAlertConfirm('Advertencia',model.estado?'¿Está seguro que desea desactivar?':'¿Está seguro que desea activar?','warning',() => {
      this.showLoading = true
      this.service.delete(model).subscribe(() => {
        this.showLoading = false;
        this.alert.showAlert('¡Éxito!', model.estado?'Se desactivó correctamente':'Se activo correctamente', 'success');
        this.updateModelsEmit.emit()
      });
      
    })
    
  }
}
