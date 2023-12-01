import { Component, ViewChild } from '@angular/core';
import { Zona, ZonaInit } from '../tablas/interfaces/zona.interface';
import { ZonaFormComponent } from './zona-form/zona-form.component';
import { ZonaService } from '../tablas/service/zona.service';

@Component({
  selector: 'app-zona',
  templateUrl: './zona.component.html'
})
export class ZonaComponent {
  public modal: boolean = false
  public models: Zona[] = [];
  public showLoading: boolean = false;
  public title: string = 'Zona';

  public modelEdit: Zona = ZonaInit;

  @ViewChild('zonaForm')
  zonaForm!: ZonaFormComponent;

  constructor(public service: ZonaService) {
  }

  ngOnInit(): void {
    this.get();
  }

  get(): void {
    this.showLoading = true
    this.service.get().subscribe(response => { this.showLoading = false; this.models = response.data });
  }

  editModel(model: Zona) {
    this.zonaForm.setModel(model)
  }
}
