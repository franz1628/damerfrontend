import { Component,OnInit,ViewChild } from '@angular/core';
import { Departamento, DepartamentoInit } from '../../interface/departamento.interface';
import { AlertService } from '../../../../../../shared/services/alert.service';
import { DepartamentoService } from '../../service/departamento.service';
import { DepartamentoFormComponent } from './departamento-form/departamento-form.component';

@Component({
  selector: 'app-departamento',
  templateUrl: './departamento.component.html'
})
export class DepartamentoComponent implements OnInit{
  public modal: boolean = false
  public models: Departamento[] = [];
  public showLoading: boolean = false;
  public title: string = 'Departamento';

  public modelEdit: Departamento = DepartamentoInit;

  @ViewChild('departamentoForm')
  departamentoForm!: DepartamentoFormComponent;

  constructor(public service: DepartamentoService, public alert: AlertService) {
  }

  ngOnInit(): void { 
    this.get();
  }

  get(): void {
    this.showLoading = true
    this.service.get().subscribe(response => { this.showLoading = false; this.models = response.data });
  }

  editModel(model: Departamento) {
    this.departamentoForm.setModel(model)
  }
}
