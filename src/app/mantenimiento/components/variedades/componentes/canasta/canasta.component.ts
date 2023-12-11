import { Component, ContentChild, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { ValidFormService } from '../../../../../shared/services/validForm.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '../../../../../shared/services/alert.service';
import { Canasta, CanastaInit } from '../../interfaces/canasta.interface';
import { CanastaService } from '../../services/canasta.service';
import { CanastaFormComponent } from './canasta-form/canasta-form.component';
import { MegaCategoriaFormComponent } from '../mega-categoria/mega-categoria-form/mega-categoria-form.component';

@Component({
  selector: 'app-canasta',
  templateUrl: './canasta.component.html'
})
export class CanastaComponent {
  public modal: boolean = false
  public models: Canasta[] = [];
  public showLoading: boolean = false;
  public title: string = 'Canasta';

  public modelEdit: Canasta = CanastaInit;

  @ViewChild('canastaForm')
  canastaForm!: CanastaFormComponent;

  @Output() emitCodCanasta:EventEmitter<Canasta> = new EventEmitter();

  constructor(public service: CanastaService, public alert: AlertService) {
  }

  ngOnInit(): void {
    this.get();
  }

  get(): void {
    this.showLoading = true
    this.service.get().subscribe(response => { this.showLoading = false; this.models = response.data });
  }

  editModel(model: Canasta) {
    this.canastaForm.setModel(model)
    this.emitCodCanasta.emit(model)
  }
}
