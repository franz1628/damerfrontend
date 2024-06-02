import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AtributoFuncionalVariedad, AtributoFuncionalVariedadInit } from '../../../interface/atributoFuncionalVariedad';
import { AtributoFuncionalVariedadValor, AtributoFuncionalVariedadValorInit } from '../../../interface/atributoFuncionalVariedadValor';
import { Sku } from '../../variedades/interfaces/sku.interface';
import { ClienteFiltroService } from '../../../service/clienteFiltro';
import { SkuAtributoTecnicoVariedadValorService } from '../../../service/skuAtributoTecnicoVariedadValor';

@Component({
  selector: 'app-cliente-resultados-filtro',
  templateUrl: './cliente-resultados-filtro.component.html'
})
export class ClienteResultadosFiltroComponent implements OnInit, OnChanges {
  @Input() atributoFuncionalVariedad: AtributoFuncionalVariedad = AtributoFuncionalVariedadInit
  @Input() atributoFuncionalVariedadValor: AtributoFuncionalVariedadValor = AtributoFuncionalVariedadValorInit
  skus: Sku[] = []

  constructor(
    private serviceClienteFiltro: ClienteFiltroService,
    private serviceSkuAtributoTecnicoVariedadValor: SkuAtributoTecnicoVariedadValorService
  ) {

  }

  ngOnInit(): void {

  }

  ngOnChanges(changes: SimpleChanges): void {

    if (changes['atributoFuncionalVariedadValor'] || changes['atributoFuncionalVariedad']) {
      this.loadModels();
    }
 

  }

  loadModels() {

    if (this.atributoFuncionalVariedadValor.idTipoAtributoFuncionalVariedadValor == 3) {
      this.serviceClienteFiltro.postResultados(this.atributoFuncionalVariedadValor.id).subscribe(x => {

        const arrayskus = x.data
        this.skus = []
        arrayskus.map(y => {
          this.skus.push(y)
        })

      })
    }
  }
}
