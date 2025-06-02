import { Component, Input, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Pais, PaisInit } from '../../interface/pais.interface';
import { PaisService } from '../../service/pais.service';
import { AlertService } from '../../../../../../shared/services/alert.service';
import { PaisFormComponent } from './pais-form/pais-form.component';
import { AuthService } from '../../../../../../auth/auth.service';

@Component({
  selector: 'app-pais',
  templateUrl: './pais.component.html'
})
export class PaisComponent {
  public modal: boolean = false
  public models: Pais[] = [];
  public showLoading: boolean = false;
  public title: string = 'PaÍs';
  canEdit: boolean = false;

  public modelEdit: Pais = PaisInit;

  @ViewChild('paisForm')
  paisForm!: PaisFormComponent;

  constructor(
    private service: PaisService, 
    private alert: AlertService,
    public authService: AuthService,
  ) {
  }

  ngOnInit(): void {
    this.get();
  }

  get(): void {
    this.showLoading = true
    this.service.get().subscribe(response => { this.showLoading = false; this.models = response.data });
  }

  editModel(model: Pais) {
    this.paisForm.setModel(model)
  }

}
