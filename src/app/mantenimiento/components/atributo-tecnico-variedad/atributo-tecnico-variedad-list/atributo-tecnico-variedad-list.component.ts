import { Component, EventEmitter, Output } from '@angular/core';
import { AtributoTecnicoVariedad } from '../../../interface/atributoTecnicoVariedad';
import { AtributoTecnicoVariedadService } from '../../../service/atributoTecnicoVariedad';

@Component({
  selector: 'app-atributo-tecnico-variedad-list',
  templateUrl: './atributo-tecnico-variedad-list.component.html'
})
export class AtributoTecnicoVariedadListComponent {
  public models:AtributoTecnicoVariedad[] = [];
  public loading:boolean=false;
  @Output() selectEditEmit : EventEmitter<AtributoTecnicoVariedad> = new EventEmitter();

  constructor(public service : AtributoTecnicoVariedadService){ }

  ngOnInit(): void {
    this.actualizarList();
  }

  selectEdit(model:AtributoTecnicoVariedad){
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
