import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { ValidFormService } from '../../../../../shared/services/validForm.service';
import { AlertService } from '../../../../../shared/services/alert.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MegaCategoria, MegaCategoriaInit } from '../../interfaces/megaCategoria.interface';
import { MegaCategoriaFormComponent } from './mega-categoria-form/mega-categoria-form.component';
import { MegaCategoriaService } from '../../services/megaCategoria.service';
import { Canasta, CanastaInit } from '../../interfaces/canasta.interface';
import { MegaCategoriaListComponent } from './mega-categoria-list/mega-categoria-list.component';


@Component({
  selector: 'app-mega-categoria',
  templateUrl: './mega-categoria.component.html'
})
export class MegaCategoriaComponent {
  public modal: boolean = false
  public models: MegaCategoria[] = [];
  public showLoading: boolean = false;
  public title: string = 'Mega Categoria';

  public modelEdit: MegaCategoria = MegaCategoriaInit;

  @Input() canasta:Canasta=CanastaInit;

  @ViewChild('megaCategoriaForm')
  megaCategoriaForm!: MegaCategoriaFormComponent;

  @ViewChild('megaCategoriaList')
  megaCategoriaList!: MegaCategoriaListComponent;

  @Output() emitCanastaMegaCategoria:EventEmitter<number[]> = new EventEmitter();

  constructor(public service: MegaCategoriaService, public alert: AlertService) {
  }

  ngOnInit(): void {
    //this.get();
  }
 
  get(id:number): void {
    this.showLoading = true
    this.service.getIdCanasta(id).subscribe(response => { this.showLoading = false; this.models = response.data });
  }

  editModel(model: MegaCategoria) {
    this.megaCategoriaForm.setModel(model)
    
    this.emitCanastaMegaCategoria.emit([model.idCanasta,model.id]);
  }

 
}
