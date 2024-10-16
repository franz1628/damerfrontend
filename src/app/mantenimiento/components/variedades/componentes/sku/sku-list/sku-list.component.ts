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
  skuExport:Sku[] = []



  constructor(
    private alert: AlertService, 
    private service: SkuService,
    private serviceCategoria : CategoriaService
    ) {
    
  }
  searchText = '';

  filteredModels():Sku[] {
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

  emitBusqueda(texto:string){
    this.searchText = texto
  }

  exportExcel(){
    this.skuExport = this.filteredModels()
    const csvData = this.tableToCSV(this.skuExport);
    this.downloadCSV(csvData, 'table-export.csv');
  }

  tableToCSV(skus: Sku[]): string {
    console.log(skus);
    
    const header = 'Codigo categoria;Categoria;Codigo Sku;Sku;Atributo;Tipo Unidad;Unidad Medida\n';
    let excel = '';

    for (let i = 0; i < skus.length; i++) {
      

      if(skus[i].SkuAtributoTecnicoVariedadValor.length==0){
        excel += `${skus[i].idCategoria};${skus[i].Categoria.descripcion};${skus[i].id};${skus[i].descripcion}`;
      }

      for (let k = 0; k < skus[i].SkuAtributoTecnicoVariedadValor.length; k++) {
        const skuAtri = skus[i].SkuAtributoTecnicoVariedadValor[k];
        excel += `${skus[i].idCategoria};${skus[i].Categoria.descripcion};${skus[i].id};${skus[i].descripcion};${skuAtri.AtributoTecnicoVariedad?.descripcion || ''};${skuAtri.TipoUnidadMedida?.descripcion || ''};${skuAtri.UnidadMedida?.descripcion || '' }\n`;
      }
      excel += '\n';
    }
   /* const rows = skus.map(sku => 
      sku.SkuAtributoTecnicoVariedadValor.map(atr => 
        `${sku.idCategoria};${sku.Categoria.descripcion};${sku.id};${sku.descripcion};${atr.AtributoTecnicoVariedad?.descripcion || ''};${atr.TipoUnidadMedida?.descripcion || ''};${atr.UnidadMedida?.descripcion || ''}`
      ).join('\n')
    ).join('\n');*/
    
    return header + excel;
  }

  downloadCSV(csv: string, filename: string): void {
    const csvFile = new Blob([csv], { type: 'text/csv' });
    const downloadLink = document.createElement('a');
    downloadLink.href = window.URL.createObjectURL(csvFile);
    downloadLink.download = filename;
    downloadLink.click();
  }

}
