import { Component, EventEmitter, Output } from '@angular/core';
import { AtributoTecnicoVariedad } from '../../../interface/atributoTecnicoVariedad';
import { AtributoTecnicoVariedadService } from '../../../service/atributoTecnicoVariedad';
import { AlertService } from '../../../../shared/services/alert.service';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-atributo-tecnico-variedad-list',
  templateUrl: './atributo-tecnico-variedad-list.component.html'
})
export class AtributoTecnicoVariedadListComponent {
  public models:AtributoTecnicoVariedad[] = [];
  public loading:boolean=false;
  showLoading : boolean=false; 
  selectedRowIndex: number = -1;

  @Output() selectEditEmit : EventEmitter<AtributoTecnicoVariedad> = new EventEmitter();

  constructor(
    public service : AtributoTecnicoVariedadService,
    private alert:AlertService,
    
    ){ }

  ngOnInit(): void {
    this.actualizarList();
  }

  selectEdit(model:AtributoTecnicoVariedad, index:number){
    this.selectEditEmit.emit(model);
    this.selectedRowIndex = index;
  }

  delete(model:AtributoTecnicoVariedad){
    this.alert.showAlertConfirm('Mensaje','¿Desea eliminar?','warning',()=>{
      this.showLoading = true;
      this.service.delete(model).subscribe(()=>{
        this.showLoading = false;
        this.actualizarList();
      });
    });
  }

  actualizarList(){
    this.loading=true;
    this.service.get().subscribe(resp => {
      this.models = resp.data;
      this.loading=false;
    })
  }
}
