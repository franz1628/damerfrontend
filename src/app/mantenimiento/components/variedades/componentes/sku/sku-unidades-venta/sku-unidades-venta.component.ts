import { Component, Input } from '@angular/core';
import { Sku, SkuInit } from '../../../interfaces/sku.interface';
import { SkuAtributoTecnicoVariedadValorService } from '../../../../../service/skuAtributoTecnicoVariedadValor';
import { TipoUnidadMedidaService } from '../../../../../service/tipoUnidadMedida';
import { UnidadMedidaService } from '../../../../../service/unidadMedida';
import { AlertService } from '../../../../../../shared/services/alert.service';
import { SkuAtributoTecnicoVariedadValor } from '../../../../../interface/skuAtributoTecnicoVariedadValor';

@Component({
  selector: 'app-sku-unidades-venta',
  templateUrl: './sku-unidades-venta.component.html'
})
export class SkuUnidadesVentaComponent {
  @Input() modelSku: Sku = SkuInit
  skuAtributoTecnicoVariedadValors:SkuAtributoTecnicoVariedadValor[] = []

  constructor(
    private service: SkuAtributoTecnicoVariedadValorService,
    private serviceTipoUnidadMedida : TipoUnidadMedidaService,
    private serviceUnidadMedida:UnidadMedidaService,
    private alert: AlertService
    
  ) {

  }


  ngOnInit(): void {
    this.loadModels();
  }

  loadModels(): void {
    this.service.postIdSku(this.modelSku.id).subscribe(x=>{
      this.skuAtributoTecnicoVariedadValors = x.data
     
      
    })
  }
}
