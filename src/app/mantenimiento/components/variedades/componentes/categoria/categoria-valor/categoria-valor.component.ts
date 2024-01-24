import { Component, Input, OnInit } from '@angular/core';
import { CategoriaAtributoTecnicoValorService } from '../../../services/categoriaAtributoTecnicoValor.service';
import { CategoriaAtributoTecnicoValor } from '../../../interfaces/categoriaAtributoTecnicoValor';

@Component({
  selector: 'app-categoria-valor',
  templateUrl: './categoria-valor.component.html'
})
export class CategoriaValorComponent implements OnInit{
  @Input()
  idCategoriaAtributoTecnico=0;

  models : CategoriaAtributoTecnicoValor[] = [];

  constructor(private service : CategoriaAtributoTecnicoValorService){
   
  }

  ngOnInit(): void {
    if(this.idCategoriaAtributoTecnico != 0){
      this.service.postIdCategoriaAtributoTecnico(this.idCategoriaAtributoTecnico).subscribe(x=>{
        this.models = x;
      });
    }
  }
}
