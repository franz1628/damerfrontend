import { Component, ViewChild } from '@angular/core';
import { Provincia, ProvinciaInit } from '../../interface/provincia.interface';
import { ProvinciaFormComponent } from './provincia-form/provincia-form.component';
import { ProvinciaService } from '../../service/provincia.service';
import { AlertService } from '../../../../../../shared/services/alert.service';
import { AuthService } from '../../../../../../auth/auth.service';

@Component({
  selector: 'app-provincia',
  templateUrl: './provincia.component.html',
})
export class ProvinciaComponent {
  public modal: boolean = false
  public models: Provincia[] = [];
  public showLoading: boolean = false;
  public title: string = 'Provincia';

  public modelEdit: Provincia = ProvinciaInit;

  @ViewChild('provinciaForm')
  provinciaForm!: ProvinciaFormComponent;

  constructor(public service: ProvinciaService, public alert: AlertService, public authService: AuthService) {
    
  }

  ngOnInit(): void {
    this.get();
  }

  get(): void {
    this.showLoading = true
    this.service.get().subscribe(response => { this.showLoading = false; this.models = response.data });
  }

  editModel(model: Provincia) {
    this.provinciaForm.setModel(model)
  }
}
