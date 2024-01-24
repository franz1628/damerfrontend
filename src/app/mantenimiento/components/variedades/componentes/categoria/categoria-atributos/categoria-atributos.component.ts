import { Component, Input, OnInit } from '@angular/core';
import { Categoria } from '../../../interfaces/categoria.interface';
import { CategoriaService } from '../../../services/categoria.service';
import { CategoriaAtributoTecnicoService } from '../../../services/categoriaAtributoTecnico.service';
import { CategoriaAtributoTecnico } from '../../../interfaces/categoriaAtributoTecnico';

@Component({
  selector: 'app-categoria-atributos',
  templateUrl: './categoria-atributos.component.html'
})
export class CategoriaAtributosComponent implements OnInit{
  models:CategoriaAtributoTecnico[] = [];
  @Input()
  codCategoria:number=0;

  idCategoriaAtributoTecnico :number = 0;

  constructor(
    private serviceCategoriaAtributoTecnico : CategoriaAtributoTecnicoService
  ){

  }

  ngOnInit(): void {
    if(this.codCategoria!=0){
      this.serviceCategoriaAtributoTecnico.postCodCategoria(this.codCategoria).subscribe(x=>{

        this.models = x;
      })
    }
    
  }

  get getIdCategoriaAtributoTecnico(){
    return this.idCategoriaAtributoTecnico
  }

  elegirAtributo(modelElegido:CategoriaAtributoTecnico){
    this.idCategoriaAtributoTecnico = modelElegido.id
  }

}
