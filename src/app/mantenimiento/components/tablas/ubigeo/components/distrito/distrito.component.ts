import { Component, ViewChild } from '@angular/core';
import { Distrito, DistritoInit } from '../../interface/distrito.interface';
import { AlertService } from '../../../../../../shared/services/alert.service';
import { DistritoFormComponent } from './distrito-form/distrito-form.component';
import { DistritoService } from '../../service/distrito.service';
import { AuthService } from '../../../../../../auth/auth.service';

@Component({
  selector: 'app-distrito',
  templateUrl: './distrito.component.html'
})
export class DistritoComponent {
  public modal: boolean = false
  public models: Distrito[] = [];
  public showLoading: boolean = false;
  public title: string = 'Distrito';

  public modelEdit: Distrito = DistritoInit;

  @ViewChild('distritoForm')
  distritoForm!: DistritoFormComponent;

  constructor(public service: DistritoService, public alert: AlertService, public authService: AuthService) {
    // 
  }

  ngOnInit(): void {
    this.get();
  }

  get(): void {
    this.showLoading = true
    this.service.get().subscribe(response => { this.showLoading = false; this.models = response.data });
  }

  editModel(model: Distrito) {
    this.distritoForm.setModel(model)
  }
}
