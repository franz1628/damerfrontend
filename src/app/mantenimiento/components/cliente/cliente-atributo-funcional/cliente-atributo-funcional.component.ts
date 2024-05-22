import { Component, Input, SimpleChanges } from '@angular/core';
import { Cliente, ClienteInit } from '../../../interface/cliente';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { forkJoin, lastValueFrom } from 'rxjs';
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

@Component({
  selector: 'app-cliente-atributo-funcional',
  templateUrl: './cliente-atributo-funcional.component.html',
})
export class ClienteAtributoFuncionalComponent {

  @Input() modelCliente: Cliente = ClienteInit
  @Input() modelCategoria: Categoria = CategoriaInit
  @Input() clienteAgrupacionCategoria = ClienteAgrupacionCategoriaInit

  skus: Sku[] = [];

  atributoFuncionalVariedad = AtributoFuncionalVariedadInit;
  atributoFuncionalVariedadValor: AtributoFuncionalVariedadValor = AtributoFuncionalVariedadValorInit
  categoriaAtributoTecnicos: CategoriaAtributoTecnico[] = []
  arrayAtributos:string[] = []
  arrayVariables:string[] = []

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
    private serviceClienteConcatenacion:ClienteConcatenacionService,
    private fb: FormBuilder,
    private alert: AlertService
  ) { }

  ngOnInit(): void {
    this.loadModels();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['clienteAgrupacionCategoria']) {
      console.log('franz');
      
      this.loadModels();
    }
  }

  loadModels(): void {
    this.showLoading = true;
    (this.models.get('modelos') as FormArray).clear();

    forkJoin(
      {
        service: this.service.postIdClienteIdCategoria(this.modelCliente.id, this.modelCategoria.id),
        serviceTipoUnidadMedida: this.serviceTipoUnidadMedida.get(),
        serviceUnidadMedida: this.serviceUnidadMedida.get(),
        serviceCategoriaAtributoTecnico: this.serviceCategoriaAtributoTecnico.postIdCategoria(this.modelCategoria.id)
      }
    ).subscribe({
      next: value => {
        this.tipoUnidadMedidas = value.serviceTipoUnidadMedida.data
        this.unidadMedidas = value.serviceUnidadMedida.data
        this.categoriaAtributoTecnicos = value.serviceCategoriaAtributoTecnico

        const atributoFuncionales = value.service.data;


        atributoFuncionales.forEach(model => {
          const nuevoModelo = this.fb.group({
            id: [model.id],
            idCategoria: [this.modelCategoria.id],
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
        serviceSku: this.serviceSku.getByCategoriaAll(this.modelCategoria.id),
        serviceAtributoFuncionalVariedadValor: this.serviceAtributoFuncionalVariedadValor.postIdAtributoFuncionalVariedad(this.atributoFuncionalVariedad.id),

      }
    ).subscribe({
      next: value => {

        this.skus = value.serviceSku.data
        const atrisFunci = value.serviceAtributoFuncionalVariedadValor.data

        this.skusElegidos = new Array(this.skus.length).fill('');

        for (let i = 0; i < atrisFunci.length; i++) {
          const atrivalor = atrisFunci[i];
     
          
          if (atrivalor.idTipoAtributoFuncionalVariedadValor == 2) {//EQUIVALENCIA
            this.serviceClienteFormula.postIdAtributoFuncionalVariedadValor(atrivalor.id).subscribe(y => {
              const clienteFormulas: ClienteFormula = y.data
              this.serviceSkuAtributoTecnicoVariedadValor.postResultados(clienteFormulas.idAtributoTecnicoVariedadValors,this.modelCategoria.id).subscribe(x => {
                const arrayskus = x.data
               
                arrayskus.map(y => {
                  for (let k = 0; k < this.skus.length; k++) {
                    if (this.skus[k].id == y.Sku.id) {
                      this.skusElegidos[k] = y.AtributoTecnicoVariedadValor.valor
                    }
                  }
                  //skusElegidos.push(y.Sku)
                })
              })
            })
          }

          if (atrivalor.idTipoAtributoFuncionalVariedadValor == 3) {//FILTRO
            this.serviceClienteFiltro.postResultados(atrivalor.id).subscribe(x => {

              const arrayskus = x.data

              arrayskus.map(y => {
                for (let k = 0; k < this.skus.length; k++) {
                  if (this.skus[k].id == y.id) {
                    this.skusElegidos[k] =  atrivalor.descripcion
                  }

                }
              })

            })
          }

          if (atrivalor.idTipoAtributoFuncionalVariedadValor == 1) {//CONCATENACION
    
            
            this.serviceClienteConcatenacion.postIdAtributoFuncionalVariedadValor(atrivalor.id).subscribe(x => {
           
              this.arrayAtributos = x.data.idAtributoTecnicoVariedads!=''?x.data.idAtributoTecnicoVariedads.split(','):[]
              this.arrayVariables = x.data.variables!=''?x.data.variables.split(','):[]

              this.skusElegidos = [];


              this.skus.map(w=>{
                const valores = w.SkuAtributoTecnicoVariedadValor;
                let miString = ''
               
                for (let i = 0; i < this.arrayVariables.length; i++) {
                  const atr = this.arrayVariables[i];
                  if("1" == atr){
                    
                    miString = w.descripcion
                    
                  }
                  
                }
                
                
                valores.map(k=>{

                 
                  
                  for (let i = 0; i < this.arrayAtributos.length; i++) {
                    const atr = this.arrayAtributos[i];
                    if(k.idAtributoTecnicoVariedad.toString() == atr){
                      
                      
                      miString = miString + '-' + (k.AtributoTecnicoVariedadValor?.valor || '') 
                    }
                    
                  }
                }) 
                if(miString!="") {
                  this.skusElegidos.push(miString)
                }
                
                console.log(this.skusElegidos);
                
              })
             

            })

      
            
          }
        }


      }
    })

    this.serviceSku.getByCategoriaAll(this.modelCategoria.id).subscribe(x => {



    })
  }

  editModel(index: number) {
    this.alert.showAlertConfirm('Aviso', '¿Desea modificar?', 'warning', () => {
      const modelo = this.modelosArray.controls[index].getRawValue();
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
    this.atributoFuncionalVariedadValor=AtributoFuncionalVariedadValorInit
  }

  elegirAtributoFuncionalVariedadValor(atributoFuncionalVariedadValor: AtributoFuncionalVariedadValor) {
    this.atributoFuncionalVariedadValor = atributoFuncionalVariedadValor
  }

  add() {
    const nuevoModelo = this.fb.group({
      id: [0],
      idCliente: [this.modelCliente.id],
      idCategoria: [this.modelCategoria.id],
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
