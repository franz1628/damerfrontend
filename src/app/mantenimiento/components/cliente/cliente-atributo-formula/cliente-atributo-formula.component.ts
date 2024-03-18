import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AtributoFuncionalVariedad, AtributoFuncionalVariedadInit } from '../../../interface/atributoFuncionalVariedad';
import { CategoriaAtributoTecnicoService } from '../../variedades/services/categoriaAtributoTecnico.service';
import { CategoriaAtributoTecnico, CategoriaAtributoTecnicoInit } from '../../variedades/interfaces/categoriaAtributoTecnico';
import { CategoriaAtributoTecnicoValor } from '../../variedades/interfaces/categoriaAtributoTecnicoValor';
import { CategoriaAtributoTecnicoValorService } from '../../variedades/services/categoriaAtributoTecnicoValor.service';
import { AtributoFuncionalVariedadValor, AtributoFuncionalVariedadValorInit } from '../../../interface/atributoFuncionalVariedadValor';
import { AtributoFuncionalVariedadValorValorService } from '../../../service/atributoFuncionalVariedadValorValor';

@Component({
  selector: 'app-cliente-atributo-formula',
  templateUrl: './cliente-atributo-formula.component.html'
})
export class ClienteAtributoFormulaComponent implements OnChanges,OnInit{


  @Input() atributoFuncionalVariedad:AtributoFuncionalVariedad=AtributoFuncionalVariedadInit
  @Input() atributoFuncionalVariedadValor:AtributoFuncionalVariedadValor=AtributoFuncionalVariedadValorInit
  categoriaAtributoTecnicos:CategoriaAtributoTecnico[] = []
  categoriaAtributoTecnicoValors:CategoriaAtributoTecnicoValor[] = []
  checkboxSeleccionados: number[] = []; 


  constructor(
    private serviceCategoriaAtributoTecnico:CategoriaAtributoTecnicoService,
    private serviceCategoriaAtributoTecnicoValors : CategoriaAtributoTecnicoValorService,
    private serviceAtributoFuncionalVariedadValorValor:AtributoFuncionalVariedadValorValorService
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

  enviar() {
    this.serviceAtributoFuncionalVariedadValorValor.postEnviarAtributos(this.atributoFuncionalVariedadValor.id,this.checkboxSeleccionados).subscribe(x=>{
      console.log(x);
      
    })
  }

  onCheckboxChange(value: number, event: Event) {
    const isChecked = (event.target as HTMLInputElement).checked
    if (isChecked) {
      const index = this.checkboxSeleccionados.indexOf(value);
      if (index == -1) {
        this.checkboxSeleccionados.push(value);
      }
    } else {
      const index = this.checkboxSeleccionados.indexOf(value);

      if (index >= 0) {
            this.checkboxSeleccionados.splice(index, 1);
      }
    }
  }

}
 