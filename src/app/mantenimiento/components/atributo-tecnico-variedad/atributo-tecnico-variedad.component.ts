import { Component, ViewChild } from '@angular/core';
import { AtributoTecnicoVariedadListComponent } from './atributo-tecnico-variedad-list/atributo-tecnico-variedad-list.component';
import { AtributoTecnicoVariedadFormComponent } from './atributo-tecnico-variedad-form/atributo-tecnico-variedad-form.component';
import { AtributoTecnicoVariedad, AtributoTecnicoVariedadInit } from '../../interface/atributoTecnicoVariedad';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-atributo-tecnico-variedad',
  templateUrl: './atributo-tecnico-variedad.component.html'
})
export class AtributoTecnicoVariedadComponent {
  contenidoVisible: string = '';
  botonActivo: string = '';
  model : AtributoTecnicoVariedad = AtributoTecnicoVariedadInit;
 
  
  @ViewChild('atributoTecnicoVariedadListComp')
  atributoTecnicoVariedadListComp!: AtributoTecnicoVariedadListComponent;

  @ViewChild('atributoTecnicoVariedadFormComp')
  atributoTecnicoVariedadFormComp!: AtributoTecnicoVariedadFormComponent;

  

  actualizarList(){
    this.atributoTecnicoVariedadListComp.actualizarList();
  }

  selectEdit(model:AtributoTecnicoVariedad){
    this.model = model;   
    this.atributoTecnicoVariedadFormComp.selectEdit(model);
  }

  mostrarContenido(contenido: string): void {
    this.contenidoVisible = contenido;
    this.botonActivo = contenido;
  }
}
