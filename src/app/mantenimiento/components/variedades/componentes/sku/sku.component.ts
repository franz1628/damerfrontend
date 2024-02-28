import { Component, Input, ViewChild } from '@angular/core';
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
export class SkuComponent {
  @Input() idCanasta:number=0;
  @Input() idMegaCategoria:number=0;
  @Input() idCategoria:number=0;
  @Input() idSku:number=0;

  public modal: boolean = false
  public models: Sku[] = [];
  public showLoading: boolean = false;
  public title: string = 'Sku';
  contenidoVisible: string = '';
  botonActivo: string = '';

  public modelEdit: Sku = SkuInit;

  @ViewChild('skuForm') 
  skuForm!: SkuFormComponent;

  constructor(public service: SkuService, public alert: AlertService) {
  }

  ngOnInit(): void {

  }

  get(idCanasta:number, idMegaCategoria:number, idCategoria:number): void {
    this.showLoading = true
    this.service.getByCategoria(idCanasta,idMegaCategoria,idCategoria).subscribe(response => { 
      console.log(response.data);
      
      this.showLoading = false; 
      this.models = response.data;
    });
  }

  editModel(model: Sku) {
    this.skuForm.setModel(model)
  }

  mostrarContenido(contenido: string): void {
    this.contenidoVisible = contenido;
    this.botonActivo = contenido;
  }

}
