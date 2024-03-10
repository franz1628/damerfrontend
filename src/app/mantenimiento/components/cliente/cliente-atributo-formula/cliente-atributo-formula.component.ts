import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AtributoFuncionalVariedad, AtributoFuncionalVariedadInit } from '../../../interface/atributoFuncionalVariedad';
import { CategoriaAtributoTecnicoService } from '../../variedades/services/categoriaAtributoTecnico.service';
import { CategoriaAtributoTecnico, CategoriaAtributoTecnicoInit } from '../../variedades/interfaces/categoriaAtributoTecnico';
import { CategoriaAtributoTecnicoValor } from '../../variedades/interfaces/categoriaAtributoTecnicoValor';
import { CategoriaAtributoTecnicoValorService } from '../../variedades/services/categoriaAtributoTecnicoValor.service';

@Component({
  selector: 'app-cliente-atributo-formula',
  templateUrl: './cliente-atributo-formula.component.html'
})
export class ClienteAtributoFormulaComponent implements OnChanges,OnInit{

  @Input() atributoFuncionalVariedad:AtributoFuncionalVariedad=AtributoFuncionalVariedadInit
  categoriaAtributoTecnicos:CategoriaAtributoTecnico[] = []
  categoriaAtributoTecnicoValors:CategoriaAtributoTecnicoValor[] = []
 

  constructor(
    private serviceCategoriaAtributoTecnico:CategoriaAtributoTecnicoService,
    private serviceCategoriaAtributoTecnicoValors : CategoriaAtributoTecnicoValorService
  ){}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['atributoFuncionalVariedad'] && !changes['atributoFuncionalVariedad'].firstChange) {
      this.loadChanges();
    }
  } 
  ngOnInit(): void {
    this.loadChanges()
  } 

  loadChanges(): void{
    console.log(this.atributoFuncionalVariedad);
    
    this.serviceCategoriaAtributoTecnico.postIdCategoria(this.atributoFuncionalVariedad.idCategoria).subscribe(x=>{
      this.categoriaAtributoTecnicos = x

    })

  }

  changeAtributo(e: Event) {
    const idCategoriaAtributoTecnico = +(e.target as HTMLInputElement).value
    this.serviceCategoriaAtributoTecnicoValors.postIdCategoriaAtributoTecnico(idCategoriaAtributoTecnico).subscribe(x=>{
      this.categoriaAtributoTecnicoValors = x
      
    })
    
  }

}
 