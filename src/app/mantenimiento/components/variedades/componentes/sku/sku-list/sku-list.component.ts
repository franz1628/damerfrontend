import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { AlertService } from '../../../../../../shared/services/alert.service';
import { SkuService } from '../../../services/sku.service';
import { Sku } from '../../../interfaces/sku.interface';
import { MegaCategoria } from '../../../interfaces/megaCategoria.interface';
import { Canasta } from '../../../interfaces/canasta.interface';
import { CategoriaService } from '../../../services/categoria.service';

@Component({
  selector: 'app-sku-list',
  templateUrl: './sku-list.component.html'
})
export class SkuListComponent implements OnChanges{


  public showLoading: boolean = false;
  @Input() idCategoria=0
  selectIndex: number=-1;



  constructor(
    private alert: AlertService, 
    private service: SkuService,
    private serviceCategoria : CategoriaService
    ) {
    
  }
  searchText = '';

  filteredModels() {
    return this.models.filter(model => 
      model.id.toString().includes(this.searchText) ||
      model.descripcion.toLowerCase().includes(this.searchText.toLowerCase()) 
    );
  }

  ngOnChanges(changes: SimpleChanges): void {

    if(changes["idCategoria"]){
      this.load()    
    }
  }

  load(){
    /*this.service.getByCategoria(this.idCategoria).subscribe(resp=>{
      this.models = resp.data;
    })*/
  }

  @Input()
  public models: Sku[] = []

  @Output() editEmit: EventEmitter<Sku> = new EventEmitter()
  @Output() updateModelsEmit: EventEmitter<null> = new EventEmitter();

  

  editModel(model: Sku) {
    this.editEmit.emit(model)
  }

  eligeModel(model: Sku,index: number) {
    this.editEmit.emit(model)
    this.selectIndex=index
  }

  changeList(canasta:Canasta, megaCategoria: MegaCategoria,sku:Sku){

  }

  delete(model: Sku) {

    this.alert.showAlertConfirm('Advertencia','¿Desea Eliminar?','warning', () => {
      this.showLoading = true
      this.service.delete(model).subscribe(() => {
        this.showLoading = false;
        this.alert.showAlert('¡Éxito!', 'Se eliminó correctamente', 'success');
        this.updateModelsEmit.emit()
      });
    })
  }

  suspender(model: Sku) {
    const titulo = model.estado==1?'¿Desea Suspender?':'¿Desea Activar?';
    const texto = model.estado==1?'Se suspendió correctamente':'Se activo correctamente';
    this.alert.showAlertConfirm('Advertencia', titulo,'warning', () => {
      this.showLoading = true
      this.service.suspender(model).subscribe(() => {
        this.showLoading = false;
        this.alert.showAlert('¡Éxito!', texto, 'success');
        this.updateModelsEmit.emit()
      });
    })
  }

}
