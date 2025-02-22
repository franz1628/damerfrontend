import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidFormService } from '../../../../../shared/services/validForm.service';
import { AlertService } from '../../../../../shared/services/alert.service';
import { Categoria, CategoriaInit } from '../../interfaces/categoria.interface';
import { CategoriaFormComponent } from './categoria-form/categoria-form.component';
import { CanastaService } from '../../services/canasta.service';
import { CanastaInit } from '../../interfaces/canasta.interface';
import { CategoriaService } from '../../services/categoria.service';
import { CategoriaAtributosComponent } from './categoria-atributos/categoria-atributos.component';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html'
})
export class CategoriaComponent {
  public modal: boolean = false
  public models: Categoria[] = [];
  public showLoading: boolean = false;
  public title: string = 'Categoria';
  contenidoVisible: string = '';
  botonActivo: string = '';

  public modelEdit: Categoria = CategoriaInit;

  @ViewChild('categoriaForm')
  categoriaForm!: CategoriaFormComponent;

  @Output() emitByCategoria:EventEmitter<number[]> = new EventEmitter();
  @Output() selectCategoriaEmit:EventEmitter<Categoria> = new EventEmitter();

  constructor(public service: CategoriaService, public alert: AlertService) {
  }

  ngOnInit(): void {
    //this.get();  
  }

  get(idMegaCategoria:number): void {
    this.showLoading = true
    this.service.getIdCanastaMegaCategoriaAll(idMegaCategoria).subscribe(response => { 
      this.showLoading = false; this.models = response.data;
    });
  } 

  get getIndex(){
    let index = -1;
    const cate = this.models.find((x,i)=>{index=i;return x.id == this.modelEdit.id});

    if(!cate) index=-1 //Para que no se quede marcado el ultimo
  
    return index;
  }

  editModel(model: Categoria) {
    this.modelEdit = model;
    this.categoriaForm.setModel(model);
    this.emitByCategoria.emit([model.idCanasta,model.idMegaCategoria,model.id])
  }

  eligeModel(model: Categoria) {
    this.emitByCategoria.emit([model.idCanasta,model.idMegaCategoria,model.id])
  }

  selectCategoria(categoria : Categoria){
    this.selectCategoriaEmit.emit(categoria);
  }

  mostrarContenido(contenido: string): void {
    this.contenidoVisible = contenido;
    this.botonActivo = contenido;
  }
}
