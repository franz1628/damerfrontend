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
    XLSX.writeFile(workbook, 'table-export.xlsx');
  }

  skusToWorksheet(skus: Sku[]): XLSX.WorkSheet {
    const data: any[] = [];
    
    // Añadir el encabezado
    data.push([
      'Codigo categoria',
      'Categoria',
      'Codigo Sku',
      'Sku',
      'Atributo',
      'Tipo Unidad',
      'Unidad Medida',
      'Tipo Sku',
      'Factor',
      'Fecha Creacion'
    ]);

    // Añadir las filas de datos
    for (let i = 0; i < skus.length; i++) {
      if (skus[i].SkuAtributoTecnicoVariedadValor.length == 0) {
        data.push([
          skus[i].idCategoria,
          skus[i].Categoria.descripcion,
          skus[i].id,
          skus[i].descripcion,
          '', '', '', '', '', ''  // Campos vacíos si no hay atributos
        ]);
      }

      for (let k = 0; k < skus[i].SkuAtributoTecnicoVariedadValor.length; k++) {
        const skuAtri = skus[i].SkuAtributoTecnicoVariedadValor[k];
        data.push([
          skus[i].idCategoria,
          skus[i].Categoria.descripcion,
          skus[i].id,
          skus[i].descripcion,
          skuAtri.AtributoTecnicoVariedad?.descripcion || '',
          skuAtri.TipoUnidadMedida?.descripcion || '',
          skuAtri.UnidadMedida?.descripcion || '',
          skus[i].tipoSku || '',
          skuAtri.valor || '',
          skus[i].fechaRegistro || ''
        ]);
      }
    }

    // Convierte los datos a una hoja de trabajo XLSX
    return XLSX.utils.aoa_to_sheet(data);
  }

}
