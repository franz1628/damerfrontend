import { Component, OnInit } from '@angular/core';
import { AtributoTecnicoVariedad } from '../../../interface/atributoTecnicoVariedad';
import { AtributoFuncionalVariedadService } from '../../../service/atributoFuncionalVariedad';
import { AtributoTecnicoVariedadService } from '../../../service/atributoTecnicoVariedad';
import { CategoriaAtributoTecnicoService } from '../../variedades/services/categoriaAtributoTecnico.service';
import { Categoria } from '../../variedades/interfaces/categoria.interface';
import { CategoriaAtributoTecnico } from '../../variedades/interfaces/categoriaAtributoTecnico';
import { FormBuilder, Validators } from '@angular/forms';
import { ValidFormService } from '../../../../shared/services/validForm.service';
import { CategoriaAtributoTecnicoValorService } from '../../variedades/services/categoriaAtributoTecnicoValor.service';
import { CategoriaAtributoTecnicoValor } from '../../variedades/interfaces/categoriaAtributoTecnicoValor';

@Component({
  selector: 'app-cliente-formula',
  templateUrl: './cliente-formula.component.html'
})
export class ClienteFormulaComponent implements OnInit {
  checkFormula: boolean[] = [];

  public categoriaAtributoTecnicos : CategoriaAtributoTecnico[] = [];
  public categoriaAtributoTecnicoValors : CategoriaAtributoTecnicoValor[] = [];

  public model = this.fb.group({
    id:[0],
    idAtributoTecnicoVariedad: [0,Validators.required],
    idAtributoTecnicoVariedadValor: [[],Validators.required],
  })

  constructor(
    private fb: FormBuilder,
    private validForm: ValidFormService,
    private service: CategoriaAtributoTecnicoService,
    private serviceValor : CategoriaAtributoTecnicoValorService
  ){

  } 
 
  ngOnInit(): void {
    
  } 

  cargaAtributosValores(categoria:Categoria):void{
    this.service.postIdCategoria(categoria.id).subscribe(x=>{
      this.categoriaAtributoTecnicos = x.data;
    });
  }

  checkAllFormula() {
    for (let i = 0; i < this.categoriaAtributoTecnicoValors.length; i++) {
      this.checkFormula[i] = true;
    }
  } 

  changeAtributo(e:Event){
    const valor = e.target as HTMLInputElement;
 
    //Listando valores de la categoria atributotecnico
    this.serviceValor.postIdCategoriaAtributoTecnico(parseInt(valor.value)).subscribe(x=>{
      this.categoriaAtributoTecnicoValors = x;
      for (let i = 0; i < this.categoriaAtributoTecnicoValors.length; i++) {
        this.checkFormula.push(false)
      }
      
    });
    
  }


  isValidField(field: string): boolean | null {
    return this.validForm.isValidField(field, this.model);
  }

  getFieldError(field: string): string | null {
    return this.validForm.getFieldError(field, this.model);
  }

}
