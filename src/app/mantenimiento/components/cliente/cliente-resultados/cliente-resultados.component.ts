import { Component, Input, SimpleChanges } from '@angular/core';
import { AtributoFuncionalVariedad, AtributoFuncionalVariedadInit } from '../../../interface/atributoFuncionalVariedad';
import { AtributoFuncionalVariedadValor, AtributoFuncionalVariedadValorInit } from '../../../interface/atributoFuncionalVariedadValor';
import { ClienteFormulaService } from '../../../service/clienteFormula';
import { SkuAtributoTecnicoVariedadValorService } from '../../../service/skuAtributoTecnicoVariedadValor';
import { ClienteFormula } from '../../../interface/clienteFormula';
import { Sku } from '../../variedades/interfaces/sku.interface';
import { ClienteFiltroService } from '../../../service/clienteFiltro';

@Component({
  selector: 'app-cliente-resultados',
  templateUrl: './cliente-resultados.component.html'
})
export class ClienteResultadosComponent {
  @Input() atributoFuncionalVariedad: AtributoFuncionalVariedad = AtributoFuncionalVariedadInit
  @Input() atributoFuncionalVariedadValor: AtributoFuncionalVariedadValor = AtributoFuncionalVariedadValorInit
  skus: Sku[] = []

  constructor(
    private serviceClienteFormula: ClienteFormulaService,
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
    console.log('eret');
    
    if (this.atributoFuncionalVariedadValor.idTipoAtributoFuncionalVariedadValor == 2) {
      this.serviceClienteFormula.postIdAtributoFuncionalVariedadValor(this.atributoFuncionalVariedadValor.id).subscribe(y => {
        const clienteFormulas: ClienteFormula = y.data
        this.serviceSkuAtributoTecnicoVariedadValor.postResultados(clienteFormulas.idAtributoTecnicoVariedadValors).subscribe(x => {
          const arrayskus = x.data
          this.skus = []
          arrayskus.map(y => {
            this.skus.push(y.Sku)
          })
        })
      })
    }

    // if (this.atributoFuncionalVariedadValor.idTipoAtributoFuncionalVariedadValor == 3) {
    //   this.serviceClienteFiltro.postResultados(this.atributoFuncionalVariedadValor.id).subscribe(y => {
    //   })
    // }
  }

}