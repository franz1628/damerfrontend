import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Cliente, ClienteInit } from '../../../interface/cliente';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { forkJoin, lastValueFrom, Subscription } from 'rxjs';
import { AtributoFuncionalVariedad, AtributoFuncionalVariedadInit } from '../../../interface/atributoFuncionalVariedad';
import { TipoUnidadMedidaService } from '../../../service/tipoUnidadMedida';
import { UnidadMedidaService } from '../../../service/unidadMedida';
import { AlertService } from '../../../../shared/services/alert.service';
import { AtributoFuncionalVariedadService } from '../../../service/atributoFuncionalVariedad';
import { TipoUnidadMedida } from '../../../interface/tipoUnidadMedida';
import { UnidadMedida } from '../../../interface/unidadMedida';
import { Categoria, CategoriaInit } from '../../variedades/interfaces/categoria.interface';
import { CategoriaAtributoTecnico, CategoriaAtributoTecnicoInit } from '../../variedades/interfaces/categoriaAtributoTecnico';
import { AtributoFuncionalVariedadValor, AtributoFuncionalVariedadValorInit } from '../../../interface/atributoFuncionalVariedadValor';
import { SkuService } from '../../variedades/services/sku.service';
import { Sku } from '../../variedades/interfaces/sku.interface';
import { CategoriaAtributoTecnicoService } from '../../variedades/services/categoriaAtributoTecnico.service';
import { AtributoFuncionalVariedadValorService } from '../../../service/atributoFuncionalVariedadValor';
import { ClienteFormulaService } from '../../../service/clienteFormula';
import { ClienteFormula } from '../../../interface/clienteFormula';
import { SkuAtributoTecnicoVariedadValorService } from '../../../service/skuAtributoTecnicoVariedadValor';
import { ClienteFiltroService } from '../../../service/clienteFiltro';
import { ClienteContactoService } from '../../../service/clienteContacto';
import { ClienteConcatenacionService } from '../../../service/clienteConcatenacion';
import { ClienteAgrupacionCategoriaInit } from '../../../interface/clienteAgrupacionCategoria';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-cliente-atributo-funcional',
  templateUrl: './cliente-atributo-funcional.component.html',
})
export class ClienteAtributoFuncionalComponent implements OnChanges {

  @Input() modelCliente: Cliente = ClienteInit
  @Input() modelCategoria: Categoria = CategoriaInit
  @Input() idClienteAgrupacionCategoria = 0

  skus: Sku[] = [];

  atributoFuncionalVariedad = AtributoFuncionalVariedadInit;
  atributoFuncionalVariedadValor: AtributoFuncionalVariedadValor = AtributoFuncionalVariedadValorInit
  categoriaAtributoTecnicos: CategoriaAtributoTecnico[] = []
  arrayAtributos: string[] = []
  arrayVariables: string[] = []
  unidadesMedidaSkus:UnidadMedida[] = []
  selectIndex: number = -1

  showLoading: boolean = false;
  //idCategoriaAtributoTecnico = 0;

  models: FormGroup = this.fb.group({
    modelos: this.fb.array([]),
  });;

  tipoUnidadMedidas: TipoUnidadMedida[] = [];
  unidadMedidas: UnidadMedida[] = [];

  idAtributoTecnicoVariedad: number = 0;
  skusElegidos: string[] = []
  private subscriptions: Subscription = new Subscription();

  constructor(
    private service: AtributoFuncionalVariedadService,
    private serviceTipoUnidadMedida: TipoUnidadMedidaService,
    private serviceUnidadMedida: UnidadMedidaService,
    private serviceSku: SkuService,
    private serviceCategoriaAtributoTecnico: CategoriaAtributoTecnicoService,
    private serviceAtributoFuncionalVariedadValor: AtributoFuncionalVariedadValorService,
    private serviceClienteFormula: ClienteFormulaService,
    private serviceSkuAtributoTecnicoVariedadValor: SkuAtributoTecnicoVariedadValorService,
    private serviceClienteFiltro: ClienteFiltroService,
    private serviceClienteConcatenacion: ClienteConcatenacionService,
    private fb: FormBuilder,
    private alert: AlertService
  ) { }

  ngOnInit(): void {
    this.loadModels();
  }

  ngOnChanges(changes: SimpleChanges): void {

    if (
      (changes['idClienteAgrupacionCategoria'] && !changes['idClienteAgrupacionCategoria'].isFirstChange())
    ) {


      this.loadModels();
    }
  }

  get getSkuElegidos() {
    return this.skusElegidos
  }

  loadModels(): void {
    this.showLoading = true;
    (this.models.get('modelos') as FormArray).clear();

    forkJoin(
      {
        service: this.service.postIdClienteAgrupacionCategoria(this.modelCliente.id, this.idClienteAgrupacionCategoria),
        serviceTipoUnidadMedida: this.serviceTipoUnidadMedida.get(),
        serviceUnidadMedida: this.serviceUnidadMedida.get(),
        serviceCategoriaAtributoTecnico: this.serviceCategoriaAtributoTecnico.postIdAgrupacionCategoria(this.idClienteAgrupacionCategoria)
      }
    ).subscribe({
      next: value => {
        this.tipoUnidadMedidas = value.serviceTipoUnidadMedida.data
        this.unidadMedidas = value.serviceUnidadMedida.data
        this.categoriaAtributoTecnicos = value.serviceCategoriaAtributoTecnico.data

        console.log(this.categoriaAtributoTecnicos);
        let arr:CategoriaAtributoTecnico[] = [];
        
        for (let i = 0; i < this.categoriaAtributoTecnicos.length; i++) {
          if (!arr.find(item => item.idAtributoTecnicoVariedad === this.categoriaAtributoTecnicos[i].idAtributoTecnicoVariedad) || this.categoriaAtributoTecnicos[i].idAtributoTecnicoVariedad == 4 ) {
            arr.push(this.categoriaAtributoTecnicos[i]); 
          }
        }

        this.categoriaAtributoTecnicos = arr;

        const atributoFuncionales = value.service.data;

        atributoFuncionales.forEach(model => {
          const nuevoModelo = this.fb.group({
            id: [model.id],
            idCategoria: [this.modelCategoria.id],
            idClienteAgrupacionCategoria: [this.idClienteAgrupacionCategoria],
            idCliente: [this.modelCliente.id],
            descripcion: [model.descripcion],
            descripcionResumida: [model.descripcionResumida],
            tip: [model.tip],
            idIndiceAtributo: [model.idIndiceAtributo],
            idTipoUnidadMedida: [model.idTipoUnidadMedida],
            idUnidadMedida: [model.idUnidadMedida],
            alias1: [model.alias1],
            alias2: [model.alias2],
            alias3: [model.alias3]
          });

          this.modelosArray.push(nuevoModelo);
        });

        if (atributoFuncionales.length == 0) {
          this.add();
        }

        this.showLoading = false;
      }
    })

  }

  get getModel() {
    return this.modelCliente;
  }

  get modelosArray() {
    return this.models.get('modelos') as FormArray;
  }

  verResultados() {
    forkJoin(
      {
        serviceSku: this.serviceSku.getByCategoriaAll(this.idClienteAgrupacionCategoria),
        serviceAtributoFuncionalVariedadValor: this.serviceAtributoFuncionalVariedadValor.postIdAtributoFuncionalVariedad(this.atributoFuncionalVariedad.id),

      }
    ).subscribe({
      next: value => {
        this.skus = value.serviceSku.data
        this.unidadesMedidaSkus = [];

        for (let i = 0; i < this.skus.length; i++) {
          const sku = this.skus[i];
          const atributos = sku.SkuAtributoTecnicoVariedadValor;
          for (let k = 0; k < atributos.length; k++) {
            const atributo = atributos[k];
 
            if(atributo.UnidadMedida && !this.unidadesMedidaSkus.find(x=>x.id == atributo.UnidadMedida.id)){
              this.unidadesMedidaSkus.push(atributo.UnidadMedida);
            }
            
          }
          
        }

        const atrisFunci = value.serviceAtributoFuncionalVariedadValor.data
        this.skusElegidos = new Array(this.skus.length).fill('');

        for (let i = 0; i < atrisFunci.length; i++) {
          const atrivalor = atrisFunci[i];
          if (atrivalor.idTipoAtributoFuncionalVariedadValor == 2) {//EQUIVALENCIA
            this.serviceClienteFormula.postIdAtributoFuncionalVariedadValor(atrivalor.id).subscribe(y => {
              const clienteFormulas: ClienteFormula = y.data
              if (clienteFormulas && clienteFormulas.idAtributoTecnicoVariedadValors) {
                this.serviceSkuAtributoTecnicoVariedadValor.postResultados(
                  clienteFormulas.idAtributoTecnicoVariedadValors,
                  this.idClienteAgrupacionCategoria
                ).subscribe(x => {
                  const arrayskus = x.data;
                  arrayskus.map(y => {
                    for (let k = 0; k < this.skus.length; k++) {
                      if (this.skus[k].id == y.Sku.id) {
                        this.skusElegidos[k] = y.AtributoTecnicoVariedadValor.valor;
                      }
                    }
                  });
                });
              }
            })
          }

          if (atrivalor.idTipoAtributoFuncionalVariedadValor == 3) {//FILTRO
            this.serviceClienteFiltro.postResultados(atrivalor.id).subscribe(x => {

              const arrayskus = x.data

              arrayskus.map(y => {
                for (let k = 0; k < this.skus.length; k++) {
                  if (this.skus[k].id == y.id) {
                    this.skusElegidos[k] = atrivalor.descripcion
                  }

                }
              })

            })
          }

          if (atrivalor.idTipoAtributoFuncionalVariedadValor == 1) {//CONCATENACION


            this.serviceClienteConcatenacion.postIdAtributoFuncionalVariedadValor(atrivalor.id).subscribe(x => {


              this.arrayAtributos = x.data.idAtributoTecnicoVariedads != '' ? x.data.idAtributoTecnicoVariedads.split(',') : []
              this.arrayVariables = x.data.variables != '' ? x.data.variables.split(',') : []

              //this.skusElegidos = [];


              this.skus.map((w, ind) => {
                const valores = w.SkuAtributoTecnicoVariedadValor;
                let miString = ''

                for (let i = 0; i < this.arrayVariables.length; i++) {
                  const atr = this.arrayVariables[i];
                  if ("1" == atr) {

                    miString = w.descripcion

                  }

                }


                valores.map(k => {



                  for (let i = 0; i < this.arrayAtributos.length; i++) {
                    const atr = this.arrayAtributos[i];
                    if (k.idAtributoTecnicoVariedad.toString() == atr) {


                      miString = miString + '-' + (k.AtributoTecnicoVariedadValor?.valor || '')
                    }

                  }
                })
                if (miString != "") {
                  this.skusElegidos[ind] = miString
                }



              })


            })



          }
        }


      }
    })
  }

  isUnidadMedidaPresent(sku: any, unidadId: number): boolean {
    return sku.SkuAtributoTecnicoVariedadValor.some(
      (x: any) => x && x.UnidadMedida && x.UnidadMedida.id === unidadId
    );
  }

  exportExcel() {
    //this.skus = this.filteredModels();  // Obtiene los SKUs filtrados
    const worksheet = this.skusToWorksheet(this.skus);  // Convierte los SKUs a hoja de trabajo
    const workbook = XLSX.utils.book_new();  // Crea un nuevo libro de trabajo (workbook)
    XLSX.utils.book_append_sheet(workbook, worksheet, 'SKUs');  // Añade la hoja al libro de trabajo

    // Exportar como archivo .xlsx
    XLSX.writeFile(workbook, 'skuCLiente.xlsx');
  }

  skusToWorksheet(skus: Sku[]): XLSX.WorkSheet {
    const data: any[] = [];

    const filaCabecera: string[] = [];
    filaCabecera.push('RESULTADO');
    filaCabecera.push('SKU');
    filaCabecera.push('DESCRIPCION');
    filaCabecera.push('CATEGORIA');

    for(const ind in this.categoriaAtributoTecnicos){
      const cat = this.categoriaAtributoTecnicos[ind]
      if(!cat.AtributoTecnicoVariedad.solicitarUnidad){
        filaCabecera.push(cat.AtributoTecnicoVariedad.descripcion)
      }
    }
    for(const ind in this.unidadesMedidaSkus){
      const unidad = this.unidadesMedidaSkus[ind];
      filaCabecera.push("GRAMAJE - " + unidad.descripcion);
      
    }

    filaCabecera.push('ESTADO');
    data.push(filaCabecera);

    for (const ind in skus) {
      const sku = skus[ind];
      let fila: string[] = [];

      if (this.getSkuElegidos[ind] != '') {
        fila.push(this.getSkuElegidos[ind])
      } else {
        fila.push('RESTO')
      }

      fila.push(sku.id.toString());
      fila.push(sku.descripcion);
      fila.push(sku.Categoria.descripcion);

      for(const cat of this.categoriaAtributoTecnicos){

        if(!cat.AtributoTecnicoVariedad.solicitarUnidad) {
          let a = 0;
          for (const atri of sku.SkuAtributoTecnicoVariedadValor ) { 
            if(atri.idCategoriaAtributoTecnico == cat.id && cat.idAtributoTecnicoVariedad == atri.idAtributoTecnicoVariedad){
              fila.push(atri?.AtributoTecnicoVariedadValor?.valor||" ");
              a = 1;
            } 
          }
          if(a==0){
            fila.push(" ")
          }
       
        } 
      }

      for(const unidad of this.unidadesMedidaSkus){
      
        for (const atri of sku.SkuAtributoTecnicoVariedadValor ) { 
          if(atri?.AtributoTecnicoVariedad?.solicitarUnidad && atri?.UnidadMedida?.id == unidad.id){
            fila.push(atri?.valor|| " ");
          }
        }
        if(!this.isUnidadMedidaPresent(sku, unidad.id)) {
          fila.push(" ");
        }
     
      }

      /*for (const ind2 in this.categoriaAtributoTecnicos) {
        const cat = this.categoriaAtributoTecnicos[ind2];
        let existe = 0;
        for (const ind3 in sku.SkuAtributoTecnicoVariedadValor) {
          const atri = sku.SkuAtributoTecnicoVariedadValor[ind3]
          if (atri.idAtributoTecnicoVariedad == cat.idAtributoTecnicoVariedad && cat.idAtributoTecnicoVariedad == atri.idAtributoTecnicoVariedad) {
            existe = 1;
            let valor = atri?.AtributoTecnicoVariedadValor?.valor || atri?.valor || ' ';
           

            fila.push(valor)
          }
        }

        if (!existe) {
          fila.push('')
        }
      }*/

      if (sku.estado == 1) {
        fila.push("ACTIVO");
      } else if (sku.estado == 0) {
        fila.push("ELIMINADO");
      } else {
        fila.push("SUSPENDIDO");
      }

      data.push(fila);
    }

    

    // Convierte los datos a una hoja de trabajo XLSX
    return XLSX.utils.aoa_to_sheet(data);
  }

  editModel(index: number) {
    const modelo = this.modelosArray.controls[index].getRawValue();

    if (modelo.descripcion == "") {
      this.alert.showAlert('Advertencia', 'Debe tener una descripción', 'warning');
      return;
    }

    this.alert.showAlertConfirm('Aviso', '¿Desea modificar?', 'warning', () => {
      this.atributoFuncionalVariedad = modelo;
      this.service.update(modelo.id, modelo).subscribe(x => {

        this.alert.showAlert('Mensaje', 'Guardado correctamente', 'success');
      });
    })

  }

  elegir(index: number) {
    const modelo = this.modelosArray.controls[index].getRawValue();
    this.selectIndex = index
    this.atributoFuncionalVariedad = modelo;
    this.atributoFuncionalVariedadValor = AtributoFuncionalVariedadValorInit
  }

  elegirAtributoFuncionalVariedadValor(atributoFuncionalVariedadValor: AtributoFuncionalVariedadValor) {
    this.atributoFuncionalVariedadValor = atributoFuncionalVariedadValor
  }

  add() {
    const nuevoModelo = this.fb.group({
      id: [0],
      idCliente: [this.modelCliente.id],
      idCategoria: [this.modelCategoria.id],
      idClienteAgrupacionCategoria: [this.idClienteAgrupacionCategoria],
      descripcion: [''],
      descripcionResumida: [''],
      tip: [''],
      idIndiceAtributo: [0],
      idTipoUnidadMedida: [0],
      idUnidadMedida: [0],
      alias1: [''],
      alias2: [''],
      alias3: ['']
    });

    this.modelosArray.push(nuevoModelo);
  }

  async save(num: number): Promise<void> {
    const modelo = this.modelosArray.at(num).value;

    if (modelo.descripcion == "") {
      this.alert.showAlert('Advertencia', 'Debe tener una descripción', 'warning');
      return;
    }

    this.showLoading = true;

    try {
      await lastValueFrom(this.service.add(modelo));
      this.alert.showAlert('Mensaje', 'Agregado correctamente', 'success');
      this.loadModels();
      this.showLoading = false;
    } catch (error) {
      this.alert.showAlert('Error', 'Hubo un problema en el servidor', 'error');
      this.showLoading = false;
    }
  }

  async delete(num: number) {
    this.alert.showAlertConfirm('Advertencia', '¿Está seguro de eliminar?', 'warning', async () => {
      const modelo = this.modelosArray.at(num).value;
      this.showLoading = true;

      try {
        await lastValueFrom(this.service.delete(modelo));
        this.alert.showAlert('Mensaje', 'Eliminado correctamente', 'success');
        this.loadModels();
        this.showLoading = false;
      } catch (error) {
        this.alert.showAlert('Error', 'Hubo un problema en el servidor', 'error');
        this.showLoading = false;
      }
    })


  }

}
