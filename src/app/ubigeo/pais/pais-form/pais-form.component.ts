import { Component, EventEmitter, Output } from '@angular/core';
import { Pais } from '../../interface/pais.interface';
import { AlertService } from '../../../shared/services/alert.service';

@Component({
  selector: 'app-pais-form',
  templateUrl: './pais-form.component.html'
})
export class PaisFormComponent {
  public model: Pais = {
    id: 0,
    descripcion: '',
    estado: 1
  }

  constructor(public alert: AlertService){}

  @Output() submitEmit: EventEmitter<Pais> = new EventEmitter();

  submit() {
    if(this.model.descripcion==''){
      this.alert.showAlert('¡Atención!', 'La descripción es requerida', 'warning');
      return;
    }

    this.submitEmit.emit(this.model)
    this.model.descripcion=''
  }

}
