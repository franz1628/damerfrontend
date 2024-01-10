import { Component } from '@angular/core';
import { Categoria } from '../../../interfaces/categoria.interface';
import { CategoriaService } from '../../../services/categoria.service';
import { CategoriaAtributoTecnicoService } from '../../../services/categoriaAtributoTecnico.service';
import { CategoriaAtributoTecnico } from '../../../interfaces/categoriaAtributoTecnico';

@Component({
  selector: 'app-categoria-atributos',
  templateUrl: './categoria-atributos.component.html'
})
export class CategoriaAtributosComponent {
  models:CategoriaAtributoTecnico[] = [];

  constructor(
    private serviceCategoriaAtributoTecnico : CategoriaAtributoTecnicoService
  ){

  }

  setCategoria(categoria:Categoria){
    this.serviceCategoriaAtributoTecnico.postCodCategoria(categoria.codigo).subscribe(x=>{
      this.models = x;
      
      
    })
  }
}
