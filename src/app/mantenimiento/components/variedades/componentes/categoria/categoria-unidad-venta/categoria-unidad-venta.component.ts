import { Component, Input, SimpleChanges } from '@angular/core';
import { Categoria, CategoriaInit } from '../../../interfaces/categoria.interface';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { CategoriaUnidadVentaService } from '../../../../../service/categoriaUnidadVenta';
import { AlertService } from '../../../../../../shared/services/alert.service';
import { forkJoin, lastValueFrom } from 'rxjs';
import { TipoUnidadMedidaService } from '../../../../../service/tipoUnidadMedida';
import { UnidadMedidaService } from '../../../../../service/unidadMedida';
import { TipoUnidadMedida } from '../../../../../interface/tipoUnidadMedida';
import { UnidadMedida } from '../../../../../interface/unidadMedida';
import { UnidadVenta } from '../../../../../interface/unidadVenta';
import { UnidadVentaService } from '../../../../../service/unidadVenta';

@Component({
  selector: 'app-categoria-unidad-venta',
  templateUrl: './categoria-unidad-venta.component.html'
})
export class CategoriaUnidadVentaComponent {


  @Input()
  modelCategoria: Categoria = CategoriaInit
  showLoading: boolean = false;
  idCategoriaAtributoTecnico=0;

  models: FormGroup = this.fb.group({
    modelos: this.fb.array([]),
  });;

  tipoUnidadMedidas : TipoUnidadMedida[] = [];
  unidadMedidas : UnidadMedida[] = [];
  unidadVentas:UnidadVenta[] = [];

  idAtributoTecnicoVariedad: number = 0;

  constructor(
    private service: CategoriaUnidadVentaService,
    private serviceTipoUnidadMedida:TipoUnidadMedidaService,
    private serviceUnidadMedida:UnidadMedidaService,
    private serviceUnidadVenta:UnidadVentaService,
    private fb: FormBuilder,
    private alert: AlertService
  ) {

  }

  ngOnInit(): void {
    this.loadModels();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['modelCategoria'] && !changes['modelCategoria'].firstChange) {
      this.loadModels();
    }
  }

  loadModels(): void {
    this.showLoading = true;
    (this.models.get('modelos') as FormArray).clear();

    forkJoin( 
      {
        service  : this.service.postIdCategoria(this.modelCategoria.id),
        serviceTipoUnidadMedida : this.serviceTipoUnidadMedida.postTipoMedidaxCategoria(this.modelCategoria.id),
        serviceUnidadMedida :this.serviceUnidadMedida.get(),
        serviceUnidadVenta : this.serviceUnidadVenta.get()
      }
      ).subscribe({
        next:value => {
          this.tipoUnidadMedidas = value.serviceTipoUnidadMedida.data
          this.unidadMedidas = value.serviceUnidadMedida.data
          this.unidadVentas = value.serviceUnidadVenta.data


          
          const models = value.service.data;
          
          console.log(models);
          models.forEach(model => {
            const nuevoModelo = this.fb.group({
              id: [model.id],
              idCategoria: [model.idCategoria],
              idTipoUnidadMedida: [model.idTipoUnidadMedida],
              idUnidadMedida: [model.idUnidadMedida],
              idUnidadVenta:[model.idUnidadVenta],
              default:[model.default],
            });
  
            this.modelosArray.push(nuevoModelo);
          });
  
          if(models.length==0){
            this.add();
          }
  
          this.showLoading = false;
        }
      })

  }



  get getModel() {
    return this.modelCategoria;
  }

  get modelosArray() {
    return this.models.get('modelos') as FormArray;
  }

  editModel(num: number) {
    this.alert.showAlertConfirm('Aviso', '¿Desea modificar?', 'warning', () => {
      const modelo = this.modelosArray.controls[num].getRawValue();

      this.service.update(modelo.id, modelo).subscribe(x => {

        this.alert.showAlert('Mensaje', 'Guardado correctamente', 'success');
      });
    })

  }


  eligeCheck(e: Event,i:number) {
    const valor = (e.target as HTMLInputElement).checked;

    if(valor){
      this.modelosArray.controls.map(x=>x.patchValue({default:0}));
    }
     
    this.modelosArray.at(i).patchValue({default:1})
  }


  add() {
    const nuevoModelo = this.fb.group({
      id: [0],
      idCategoria: [this.modelCategoria.id],
      idTipoUnidadMedida: [0],
      idUnidadMedida: [0],
      idUnidadVenta:[0],
      default : [0]
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
