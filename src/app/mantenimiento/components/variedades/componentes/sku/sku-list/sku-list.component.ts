import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { AlertService } from '../../../../../../shared/services/alert.service';
import { SkuService } from '../../../services/sku.service';
import { Sku } from '../../../interfaces/sku.interface';
import { MegaCategoria } from '../../../interfaces/megaCategoria.interface';
import { Canasta } from '../../../interfaces/canasta.interface';
import { CategoriaService } from '../../../services/categoria.service';
import * as XLSX from 'xlsx';
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

  exportExcel() {
    this.skuExport = this.filteredModels();  // Obtiene los SKUs filtrados
    const worksheet = this.skusToWorksheet(this.skuExport);  // Convierte los SKUs a hoja de trabajo
    const workbook = XLSX.utils.book_new();  // Crea un nuevo libro de trabajo (workbook)
    XLSX.utils.book_append_sheet(workbook, worksheet, 'SKUs');  // Añade la hoja al libro de trabajo
    
    // Exportar como archivo .xlsx
    XLSX.writeFile(workbook, 'skus.xlsx');
  }

  skusToWorksheet(skus: Sku[]): XLSX.WorkSheet {
    const data: any[] = [];
    
    // Añadir el encabezado
   
    const titulos :string[] = []
    titulos.push('Codigo categoria')
    titulos.push( 'Categoria')
    titulos.push('Codigo Sku')
    titulos.push( 'Sku')
    titulos.push('Tipo SKU')
    titulos.push('Fecha Registro')

    for (let k = 0; k < skus[0].SkuAtributoTecnicoVariedadValor.length; k++) {
      const skuAtri = skus[0].SkuAtributoTecnicoVariedadValor[k];
      titulos.push(skuAtri.AtributoTecnicoVariedad?.descripcion || '')
    }

    data.push(titulos)

    // Añadir las filas de datos
    for (let i = 0; i < skus.length; i++) {
      const arr : string[] = []
      arr.push(skus[i].idCategoria.toString());
      arr.push(skus[i].Categoria.descripcion.toString());
      arr.push(skus[i].id.toString());
      arr.push(skus[i].descripcion.toString());

      if(skus[i].tipoSku==1){
        arr.push('REGULAR');
      }else if(skus[i].tipoSku==2){
        arr.push('PACK');
      }else{
        arr.push('COMBO');
      }
  
      arr.push(skus[i].fechaRegistro.toString()|| '');

      for (let k = 0; k < skus[i].SkuAtributoTecnicoVariedadValor.length; k++) {
        const skuAtri = skus[i].SkuAtributoTecnicoVariedadValor[k];
        arr.push(skuAtri.AtributoTecnicoVariedadValor?.valor || skuAtri.valor ||'')
      }
      data.push(arr);
    }

    // Convierte los datos a una hoja de trabajo XLSX
    return XLSX.utils.aoa_to_sheet(data);
  }

}
