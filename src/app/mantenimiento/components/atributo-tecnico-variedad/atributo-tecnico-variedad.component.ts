import { Component, ViewChild } from '@angular/core';
import { AtributoTecnicoVariedadListComponent } from './atributo-tecnico-variedad-list/atributo-tecnico-variedad-list.component';
import { AtributoTecnicoVariedadFormComponent } from './atributo-tecnico-variedad-form/atributo-tecnico-variedad-form.component';
import { AtributoTecnicoVariedad } from '../../interface/atributoTecnicoVariedad';

@Component({
  selector: 'app-atributo-tecnico-variedad',
  templateUrl: './atributo-tecnico-variedad.component.html'
})
export class AtributoTecnicoVariedadComponent {
  @ViewChild('atributoTecnicoVariedadListComp')
  atributoTecnicoVariedadListComp!: AtributoTecnicoVariedadListComponent;

  @ViewChild('atributoTecnicoVariedadFormComp')
  atributoTecnicoVariedadFormComp!: AtributoTecnicoVariedadFormComponent;



  actualizarList(){
    this.atributoTecnicoVariedadListComp.actualizarList();
  }

  selectEdit(model:AtributoTecnicoVariedad){
    this.atributoTecnicoVariedadFormComp.selectEdit(model);
  }


}
