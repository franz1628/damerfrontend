import { Component, Input, SimpleChanges } from '@angular/core';
import { UnidadVenta, UnidadVentaInit } from '../../../interface/unidadVenta';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { AlertService } from '../../../../shared/services/alert.service';
import { UnidadVentaService } from '../../../service/unidadVenta';
import { forkJoin, lastValueFrom } from 'rxjs';
import { TipoUnidadMedidaService } from '../../../service/tipoUnidadMedida';
import { UnidadMedidaService } from '../../../service/unidadMedida';
import { TipoUnidadMedida } from '../../../interface/tipoUnidadMedida';
import { UnidadMedida } from '../../../interface/unidadMedida';

@Component({
  selector: 'app-unidad-venta',
  templateUrl: './unidad-venta.component.html'
})
export class UnidadVentaComponent {

  @Input()
  modelUnidadVenta: UnidadVenta = UnidadVentaInit
  showLoading: boolean = false;
  
  tipoUnidadMedidas : TipoUnidadMedida[] = [];
  unidadMedidas : UnidadMedida[] = [];
  unidadVenta:UnidadVenta = UnidadVentaInit;

  models: FormGroup = this.fb.group({
    modelos: this.fb.array([]),
  });;

  idAtributoTecnicoVariedad: number = 0;

  constructor(
    private service: UnidadVentaService,
    private serviceTipoUnidadMedida:TipoUnidadMedidaService,
    private serviceUnidadMedida:UnidadMedidaService,
    private fb: FormBuilder,
    private alert: AlertService
  ) {

  }

  ngOnInit(): void {
    this.loadModels();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['model'] && !changes['model'].firstChange) {
      this.loadModels();
    }
  }

  loadModels(): void {
    this.showLoading = true;
    (this.models.get('modelos') as FormArray).clear();

    forkJoin( 
      {
        service  : this.service.get(),
        serviceTipoUnidadMedida : this.serviceTipoUnidadMedida.get(),
        serviceUnidadMedida :this.serviceUnidadMedida.get()
      }
      ).subscribe({
        next:value => {
          this.tipoUnidadMedidas = value.serviceTipoUnidadMedida.data
          this.unidadMedidas = value.serviceUnidadMedida.data

          const models = value.service.data;

          models.forEach(model => {
            const nuevoModelo = this.fb.group({
              id: [model.id],
              descripcion:[model.descripcion],
              descripcionResumida:[model.descripcionResumida],
              tip:[model.tip],
              formaUso:[model.formaUso],
              idTipoUnidadMedida:[model.idTipoUnidadMedida],
              idUnidadMedida:[model.idUnidadMedida],
              alias1:[model.alias1],
              alias2:[model.alias2],
              alias3:[model.alias3],
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

  selectAtributo(index: number) {
    this.unidadVenta = (this.models.get('modelos') as FormArray).at(index).value;
  }

  add() {
    const nuevoModelo = this.fb.group({
      id: [0],
      descripcion:[''],
      descripcionResumida:[''],
      tip:[''],
      formaUso:[0],
      idTipoUnidadMedida:[0],
      unidadMedida:[0],
      alias1:[''],
      alias2:[''],
      alias3:[''],
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
