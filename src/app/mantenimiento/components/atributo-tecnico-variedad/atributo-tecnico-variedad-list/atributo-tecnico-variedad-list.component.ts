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
    this.alert.showAlertConfirm('Mensaje','¿Desea eliminarr?','warning',()=>{
      this.showLoading = true;
      this.service.delete(model).subscribe((x)=>{
        if(x.state == 1){
        
          this.alert.showAlert('Exito','Eliminado correctamente','success');
          this.actualizarList();
        }else{
          this.alert.showAlert('Advertencia',x.message,'success');
        }
        this.showLoading = false;
        
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
