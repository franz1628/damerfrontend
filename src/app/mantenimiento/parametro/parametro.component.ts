import { Component } from '@angular/core';
import { Parametro } from '../interface/parametro.interface';
import { ParametroService } from '../service/parametro.service';
import { AlertService } from '../../shared/services/alert.service';

@Component({
  selector: 'app-parametro',
  templateUrl: './parametro.component.html'
})
export class ParametroComponent {
  private models: Parametro[] = [];
  public showLoading: boolean = false;
  public title: string = 'PARAMETRO';
  private modelEdit: Parametro = {
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

  constructor(public service: ParametroService, public alert: AlertService) {
  }

  ngOnInit(): void {
    this.get();
  }

  get(): void {
    this.showLoading = true
    this.service.get().subscribe(response => { this.showLoading = false; this.models = response.data });
  }

  get getModels(){
    return [...this.models]
  }

  get getModelEdit(){
    const aot = this.modelEdit
    return aot
  }

  add(model: Parametro) {
    if(model.id==0){
      this.service.add(model).subscribe(() => {
        this.showLoading = false;
        this.get();
        this.alert.showAlert('¡Éxito!', 'Se agregó correctamente', 'success');
      });
    }else{
      this.update(model)
    }
    /*this.showLoading = true
    */
  }

  update(model: Parametro) {
    this.showLoading = true
    this.service.update(model.id, model).subscribe(() => {
      this.showLoading = false;
      this.get();
      this.alert.showAlert('¡Éxito!', 'Se actualizó correctamente', 'success');
    });
  }


  delete(model: Parametro) {
    this.showLoading = true
    this.service.delete(model).subscribe(() => {
      this.showLoading = false;
      this.get();
      this.alert.showAlert('¡Éxito!', 'Se eliminó correctamente', 'success');
    });

  }

  editModel(model: Parametro) {
    this.showLoading = true
    this.service.getId(model.id).subscribe(response => { this.showLoading = false; this.modelEdit = response.data });
    
  }
}
