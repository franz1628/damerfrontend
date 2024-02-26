import { Component, OnInit, ViewChild } from '@angular/core';
import { AtributoTecnicoVariedadListComponent } from './atributo-tecnico-variedad-list/atributo-tecnico-variedad-list.component';
import { AtributoTecnicoVariedadFormComponent } from './atributo-tecnico-variedad-form/atributo-tecnico-variedad-form.component';
import { AtributoTecnicoVariedad, AtributoTecnicoVariedadInit } from '../../interface/atributoTecnicoVariedad';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AtributoTecnicoVariedadValoresComponent } from './atributo-tecnico-variedad-valores/atributo-tecnico-variedad-valores.component';

@Component({
  selector: 'app-atributo-tecnico-variedad',
  templateUrl: './atributo-tecnico-variedad.component.html'
})
export class AtributoTecnicoVariedadComponent implements OnInit{
  contenidoVisible: string = '';
  botonActivo: string = 'registrados';
  model : AtributoTecnicoVariedad = AtributoTecnicoVariedadInit;
 
  
  @ViewChild('atributoTecnicoVariedadListComp')
  atributoTecnicoVariedadListComp!: AtributoTecnicoVariedadListComponent;

  @ViewChild('atributoTecnicoVariedadFormComp')
  atributoTecnicoVariedadFormComp!: AtributoTecnicoVariedadFormComponent;
  
  @ViewChild('atributoTecnicoVariedadValoresComp')
  atributoTecnicoVariedadValoresComp!: AtributoTecnicoVariedadValoresComponent;

  ngOnInit(): void {
    this.mostrarContenido('registrados');
  }

  actualizarList(){
    this.atributoTecnicoVariedadListComp.actualizarList();
  }

  selectEdit(model:AtributoTecnicoVariedad){
    this.model = model;   
    // this.botonActivo=='registrados' && this.atributoTecnicoVariedadFormComp.selectEdit(model);
    // this.botonActivo=='valores' && this.atributoTecnicoVariedadValoresComp.cargaModels(this.getModel.id);
   
  }

  mostrarContenido(contenido: string): void {
    this.contenidoVisible = contenido;
    this.botonActivo = contenido;
  }

  get getModel(){
    return this.model;
  }
}
