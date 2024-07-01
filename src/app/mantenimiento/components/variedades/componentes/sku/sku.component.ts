import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidFormService } from '../../../../../shared/services/validForm.service';
import { AlertService } from '../../../../../shared/services/alert.service';
import { Sku, SkuInit } from '../../interfaces/sku.interface';
import { SkuFormComponent } from './sku-form/sku-form.component';
import { SkuService } from '../../services/sku.service';

@Component({
  selector: 'app-sku',
  templateUrl: './sku.component.html',
})
export class SkuComponent implements OnChanges{
  @Input() idCanasta:number=0;
  @Input() idMegaCategoria:number=0;
  @Input() idCategoria:number=0;
  @Input() idSku:number=0;
  @Output() SkuEmit:EventEmitter<Sku> = new EventEmitter();

  modal: boolean = false
  models: Sku[] = [];
  showLoading: boolean = false;
  title: string = 'Sku';
  contenidoVisible: string = '';
  botonActivo: string = '';

  modelEdit: Sku = SkuInit;

  @ViewChild('skuForm') 
  skuForm!: SkuFormComponent;

  constructor(public service: SkuService, public alert: AlertService) {
  }

  ngOnChanges(changes: SimpleChanges): void {

    if (changes['idCategoria'] || changes['idCategoria']) {
      this.get(this.idCategoria);
 
    }
  }

  get(idCategoria:number): void {
    this.showLoading = true
    this.service.getByCategoria(idCategoria).subscribe(response => { 
      this.showLoading = false; 
      this.models = response.data;
    });
  }

  editModel(model: Sku) {
   
    this.idSku = model.id
    this.skuForm.elegirSku(model)
    this.SkuEmit.emit(model);
    this.modelEdit = model;
  }

  mostrarContenido(contenido: string): void {
    this.contenidoVisible = contenido;
    this.botonActivo = contenido;
  }

}
