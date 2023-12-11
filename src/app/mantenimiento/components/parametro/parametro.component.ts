import { Component, ViewChild } from '@angular/core';
import { Parametro, ParametroInit } from '../../interface/parametro.interface';
import { ParametroService } from '../../service/parametro.service';
import { AlertService } from '../../../shared/services/alert.service';
import { ParametroFormComponent } from './parametro-form/parametro-form.component';

@Component({
    selector: 'app-parametro',
    templateUrl: './parametro.component.html',
})
export class ParametroComponent {
    public modal: boolean = false
    public models: Parametro[] = [];
    public showLoading: boolean = false;
    public title: string = 'Parametro';
  
    public modelEdit: Parametro = ParametroInit;
  
    @ViewChild('parametroForm')
    parametroForm!: ParametroFormComponent;
  
    constructor(public service: ParametroService) {
    }
  
    ngOnInit(): void {
      this.get();
    }
  
    get(): void {
      this.showLoading = true
      this.service.get().subscribe(response => { this.showLoading = false; this.models = response.data });
    }
  
    editModel(model: Parametro) {
      this.parametroForm.setModel(model)
    }
}
