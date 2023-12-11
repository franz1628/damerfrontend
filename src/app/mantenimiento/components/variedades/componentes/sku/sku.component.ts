import { Component, ViewChild } from '@angular/core';
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
  public modal: boolean = false
  public models: Sku[] = [];
  public showLoading: boolean = false;
  public title: string = 'Sku';

  public modelEdit: Sku = SkuInit;

  @ViewChild('skuForm')
  skuForm!: SkuFormComponent;

  constructor(public service: SkuService, public alert: AlertService) {
  }

  ngOnInit(): void {
    //this.get(); 
  }

  get(codCanasta:number, codMegaCategoria:number, codCategoria:number): void {
    this.showLoading = true
    this.service.getByCategoria(codCanasta,codMegaCategoria,codCategoria).subscribe(response => { 
      this.showLoading = false; this.models = response.data;
    });
  }

  editModel(model: Sku) {
    this.skuForm.setModel(model)
  }
}
