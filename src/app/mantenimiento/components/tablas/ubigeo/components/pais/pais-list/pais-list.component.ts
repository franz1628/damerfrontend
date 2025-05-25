import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable,catchError,of,throwError  } from 'rxjs';
import { AlertService } from '../../../../../../../shared/services/alert.service';
import { Pais } from '../../../interface/pais.interface';
import { PaisService } from '../../../service/pais.service';
import { AuthService } from '../../../../../../../auth/auth.service';

@Component({
  selector: 'app-pais-list',
  templateUrl: './pais-list.component.html'
})
export class PaisListComponent {
  public showLoading: boolean = false;
  constructor(
    private alert: AlertService, 
    private service: PaisService,
    public authService: AuthService,
  ) { }

  @Input()
  public models: Pais[] = []

  @Output() editEmit: EventEmitter<Pais> = new EventEmitter()
  @Output() updateModelsEmit: EventEmitter<null> = new EventEmitter();

  editModel(model: Pais) {
    this.editEmit.emit(model)
  }

  delete(model: Pais) {
    this.showLoading = true
    this.service.delete(model).subscribe(() => {
      this.showLoading = false;
      this.alert.showAlert('¡Éxito!', 'Se eliminó correctamente', 'success');
      this.updateModelsEmit.emit()
    });
  }

}
