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

  constructor(
    private alert: AlertService, 
    private service: SkuService,
    private serviceCategoria : CategoriaService
    ) {
    
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    
    if(changes["idCategoria"]){
      this.load()    
    }
  }

  load(){
    this.service.getByCategoria(this.idCategoria).subscribe(resp=>{
      this.models = resp.data;
    })
  }

  @Input()
  public models: Sku[] = []

  @Output() editEmit: EventEmitter<Sku> = new EventEmitter()
  @Output() updateModelsEmit: EventEmitter<null> = new EventEmitter();

  

  editModel(model: Sku) {
    this.editEmit.emit(model)
  }

  changeList(canasta:Canasta, megaCategoria: MegaCategoria,sku:Sku){
   /* this.service.getByCategoria(canasta.id,megaCategoria.id,sku.id).subscribe(resp=>{
      this.models = resp.data;
    })*/
  }

  delete(model: Sku) {
    this.showLoading = true
    this.service.delete(model).subscribe(() => {
      this.showLoading = false;
      this.alert.showAlert('¡Éxito!', 'Se eliminó correctamente', 'success');
      this.updateModelsEmit.emit()
    });
  }
}
