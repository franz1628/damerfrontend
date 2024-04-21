import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { AtributoFuncionalVariedad, AtributoFuncionalVariedadInit } from '../../../interface/atributoFuncionalVariedad';
import { AtributoFuncionalVariedadValor, AtributoFuncionalVariedadValorInit } from '../../../interface/atributoFuncionalVariedadValor';
import { AtributoTecnicoVariedadValor } from '../../../interface/atributoTecnicoVariedadValor';
import { Sku } from '../../variedades/interfaces/sku.interface';
import { SkuService } from '../../variedades/services/sku.service';
import { AtributoTecnicoVariedadValorService } from '../../../service/atributoTecnicoVariedadValor';
import { CategoriaAtributoTecnicoService } from '../../variedades/services/categoriaAtributoTecnico.service';
import { CategoriaAtributoTecnico } from '../../variedades/interfaces/categoriaAtributoTecnico';

@Component({
  selector: 'app-cliente-concatenacion',
  templateUrl: './cliente-concatenacion.component.html'
})
export class ClienteConcatenacionComponent implements OnInit{
  @Input() atributoFuncionalVariedad:AtributoFuncionalVariedad=AtributoFuncionalVariedadInit
  @Input() atributoFuncionalVariedadValor:AtributoFuncionalVariedadValor=AtributoFuncionalVariedadValorInit
  categoriaAtributoTecnicos:CategoriaAtributoTecnico[] = []


  constructor(    
    private serviceCategoriaAtributoTecnico : CategoriaAtributoTecnicoService
    ){

  }
  ngOnInit(): void {

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['atributoFuncionalVariedadValor'] && !changes['atributoFuncionalVariedadValor'].firstChange) {
      this.loadModels();
    }

    if (changes['atributoFuncionalVariedad'] && !changes['atributoFuncionalVariedad'].firstChange) {
      this.loadModels();
    }
  }


  loadModels(): void { 

    
    this.serviceCategoriaAtributoTecnico.postIdCategoria(this.atributoFuncionalVariedad.idCategoria).subscribe(x=>{
   
      this.categoriaAtributoTecnicos = x
    })
  }
 
}
