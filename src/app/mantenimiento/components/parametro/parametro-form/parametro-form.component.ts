import { Component, EventEmitter, Input, Output, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { Parametro } from '../../../interface/parametro.interface';
import { AlertService } from '../../../../shared/services/alert.service';


@Component({
  selector: 'app-parametro-form',
  templateUrl: './parametro-form.component.html',
})
export class ParametroFormComponent {
  
  @Input()
  public modelo: Parametro = {
    id: 0,
    codigo: 0,
    descripcion: '',
    descripcionResumida: '',
    tip: '',
    idInputClasificado: 0,
    valorParametro1: 0,
    valorParametro2: 0,
    valorParametro3: 0,
    inicioVigencia: new Date(),
    alias1: '',
    alias2: '',
    alias3: '',
    idEstadoRegistro: 0
  };

  

  constructor(public alert: AlertService){

  }
  

  @Output() submitEmit: EventEmitter<Parametro> = new EventEmitter();

  submit() {

    if(this.modelo.descripcion==''){
      this.alert.showAlert('¡Atención!', 'La descripción es requerida', 'warning');
      return;
    }

    const miModel = this.modelo

    this.submitEmit.emit(miModel)
    this.modelo = {
      id: 0,
      codigo: 0,
      descripcion: '',
      descripcionResumida: '',
      tip: '',
      idInputClasificado: 0,
      valorParametro1: 0,
      valorParametro2: 0,
      valorParametro3: 0,
      inicioVigencia: new Date(),
      alias1: '',
      alias2: '',
      alias3: '',
      idEstadoRegistro: 0
    }
  }

}
