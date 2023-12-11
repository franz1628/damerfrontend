import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidFormService } from '../../../../../shared/services/validForm.service';
import { AlertService } from '../../../../../shared/services/alert.service';
import { Categoria, CategoriaInit } from '../../interfaces/categoria.interface';
import { CategoriaFormComponent } from './categoria-form/categoria-form.component';
import { CanastaService } from '../../services/canasta.service';
import { CanastaInit } from '../../interfaces/canasta.interface';
import { CategoriaService } from '../../services/categoria.service';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html'
})
export class CategoriaComponent {
  public modal: boolean = false
  public models: Categoria[] = [];
  public showLoading: boolean = false;
  public title: string = 'Categoria';

  public modelEdit: Categoria = CategoriaInit;

  @ViewChild('categoriaForm')
  categoriaForm!: CategoriaFormComponent;

  @Output() emitByCategoria:EventEmitter<number[]> = new EventEmitter();

  constructor(public service: CategoriaService, public alert: AlertService) {
  }

  ngOnInit(): void {
    //this.get(); 
  }

  get(codCanasta:number, codMegaCategoria:number): void {
    this.showLoading = true
    this.service.getCodigoCanastaMegaCategoria(codCanasta,codMegaCategoria).subscribe(response => { 
      this.showLoading = false; this.models = response.data;
    });
  }

  editModel(model: Categoria) {
    this.categoriaForm.setModel(model);
    this.emitByCategoria.emit([model.codCanasta,model.codMegaCategoria,model.codigo])
  }
}
