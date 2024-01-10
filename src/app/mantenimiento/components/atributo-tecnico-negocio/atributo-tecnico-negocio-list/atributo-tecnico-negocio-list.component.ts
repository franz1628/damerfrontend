import { Component, EventEmitter, Output } from '@angular/core';
import { AtributoTecnicoNegocio } from '../../../interface/atributoTecnicoNegocio';
import { AtributoTecnicoNegocioService } from '../../../service/atributoTecnicoNegocio';

@Component({
  selector: 'app-atributo-tecnico-negocio-list',
  templateUrl: './atributo-tecnico-negocio-list.component.html'
})
export class AtributoTecnicoNegocioListComponent {
  public models:AtributoTecnicoNegocio[] = [];
  public loading:boolean=false;
  @Output() selectEditEmit : EventEmitter<AtributoTecnicoNegocio> = new EventEmitter();

  constructor(public service : AtributoTecnicoNegocioService){ }

  ngOnInit(): void {
    this.actualizarList();
  }

  selectEdit(model:AtributoTecnicoNegocio){
    this.selectEditEmit.emit(model);
  }

  actualizarList(){
    this.loading=true;
    this.service.get().subscribe(resp => {
      this.models = resp.data;
      this.loading=false;
    })
  }
}
