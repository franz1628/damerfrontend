import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Categoria } from '../../../interfaces/categoria.interface';
import { CategoriaService } from '../../../services/categoria.service';
import { CategoriaAtributoTecnicoService } from '../../../services/categoriaAtributoTecnico.service';
import { CategoriaAtributoTecnico, CategoriaAtributoTecnicoInit } from '../../../interfaces/categoriaAtributoTecnico';
import { CategoriaAtributosListComponent } from './categoria-atributos-list/categoria-atributos-list.component';
import { CategoriaAtributosFormComponent } from './categoria-atributos-form/categoria-atributos-form.component';

@Component({
  selector: 'app-categoria-atributos',
  templateUrl: './categoria-atributos.component.html'
})
export class CategoriaAtributosComponent implements OnInit{
  public modal: boolean = false
  public models: CategoriaAtributoTecnico[] = [];
  public showLoading: boolean = false;
  public title: string = 'Categoria ';

  public modelEdit: CategoriaAtributoTecnico = CategoriaAtributoTecnicoInit;
  @Input()
  codCategoria : number = 0
  @ViewChild('categoriaAtributoTecnicoForm')
  categoriaAtributoTecnicoForm!: CategoriaAtributosFormComponent;

  constructor(public service: CategoriaAtributoTecnicoService) {
  }

  ngOnInit(): void {
    this.get(); 
  }

  get(): void {
    if(this.codCategoria!=0){
      this.showLoading = true
      this.service.get().subscribe(response => { this.showLoading = false; this.models = response.data });
    }
  }

  editModel(model: CategoriaAtributoTecnico) {
    this.categoriaAtributoTecnicoForm.setModel(model)
  }

}
