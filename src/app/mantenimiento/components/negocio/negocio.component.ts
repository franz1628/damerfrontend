import { Component, ViewChild } from '@angular/core';
import { Negocio, NegocioInit } from '../../interface/negocio.interface';
import { NegocioFormComponent } from './negocio-form/negocio-form.component';
import { NegocioService } from '../../service/negocio.service';

@Component({
  selector: 'app-negocio',
  templateUrl: './negocio.component.html'
})
export class NegocioComponent {
  public modal: boolean = false
  public models: Negocio[] = [];
  public showLoading: boolean = false;
  public title: string = 'NEGOCIO';

  public modelEdit: Negocio = NegocioInit;

  @ViewChild('negocioForm')
  negocioForm!: NegocioFormComponent;

  constructor(public service: NegocioService) {
  }

  ngOnInit(): void {
    this.get();
  }

  get(): void {
    this.showLoading = true
    this.service.get().subscribe(response => { this.showLoading = false; this.models = response.data });
  }

  editModel(model: Negocio) {
    this.negocioForm.setModel(model)
  }
}
