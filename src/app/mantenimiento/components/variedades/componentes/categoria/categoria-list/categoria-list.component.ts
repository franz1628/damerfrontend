import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AlertService } from '../../../../../../shared/services/alert.service';
import { CategoriaService } from '../../../services/categoria.service';
import { Categoria } from '../../../interfaces/categoria.interface';
import { Canasta } from '../../../interfaces/canasta.interface';
import { MegaCategoria } from '../../../interfaces/megaCategoria.interface';

@Component({
  selector: 'app-categoria-list',
  templateUrl: './categoria-list.component.html'
})
export class CategoriaListComponent {
  
  showLoading: boolean = false;
  @Input()
  selectIndex: number=-1;
  searchText = '';
  listCategorias: Categoria[] = [];

  constructor(public alert: AlertService, public service: CategoriaService) {
   
  }

  @Input()
  public models: Categoria[] = []

  @Output() editEmit: EventEmitter<Categoria> = new EventEmitter()
  @Output() eligeModelEmit: EventEmitter<Categoria> = new EventEmitter()
  @Output() updateModelsEmit: EventEmitter<null> = new EventEmitter();

  filteredModels() {

    return this.models.filter(model => 
      model.id.toString().includes(this.searchText) ||
      model.descripcion.toLowerCase().includes(this.searchText.toLowerCase()) 
    );
  }
  

  editModel(model: Categoria) {
    this.editEmit.emit(model)
  }

  eligeModel(model: Categoria,index:number) {
    this.editEmit.emit(model)
    this.selectIndex=index

    
  }

  getCategoriaList(idCategoria:string){
    return this.models.find(x=>x.id==+idCategoria)?.descripcion
  }

  changeList(canasta:Canasta, megaCategoria: MegaCategoria){
    this.selectIndex=-1
    this.service.getIdCanastaMegaCategoria(megaCategoria.id).subscribe(resp=>{
      this.models = resp.data;
    })
  }

  delete(model: Categoria) {
    this.showLoading = true
    this.service.delete(model).subscribe((x) => {

      if(x.state==1){
        this.showLoading = false;
        this.alert.showAlert('¡Éxito!', 'Se eliminó correctamente', 'success');
        this.updateModelsEmit.emit()
      }else{
        this.showLoading = false;
        //this.updateModelsEmit.emit(+this.myForm.get('idMegaCategoria')?.value);
        this.alert.showAlert('¡Advertencia!', x.message, 'warning');
      }

    
    });
  }
}
