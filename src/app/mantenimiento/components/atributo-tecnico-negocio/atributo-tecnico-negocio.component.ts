import { Component, ViewChild } from '@angular/core';
import { AtributoTecnicoNegocioListComponent } from './atributo-tecnico-negocio-list/atributo-tecnico-negocio-list.component';
import { AtributoTecnicoNegocioFormComponent } from './atributo-tecnico-negocio-form/atributo-tecnico-negocio-form.component';
import { AtributoTecnicoNegocio } from '../../interface/atributoTecnicoNegocio';

@Component({
  selector: 'app-atributo-tecnico-negocio',
  templateUrl: './atributo-tecnico-negocio.component.html'
})
export class AtributoTecnicoNegocioComponent {
  @ViewChild('atributoTecnicoNegocioListComp')
  atributoTecnicoNegocioListComp!: AtributoTecnicoNegocioListComponent;

  @ViewChild('atributoTecnicoNegocioFormComp')
  atributoTecnicoNegocioFormComp!: AtributoTecnicoNegocioFormComponent;



  actualizarList(){
    this.atributoTecnicoNegocioListComp.actualizarList();
  }

  selectEdit(model:AtributoTecnicoNegocio){
    this.atributoTecnicoNegocioFormComp.selectEdit(model);
  }
}
