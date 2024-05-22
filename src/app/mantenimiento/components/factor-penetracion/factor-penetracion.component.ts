import { Component, Input, SimpleChanges } from '@angular/core';
import { FactorPenetracion, FactorPenetracionInit } from '../../interface/factorPenetracion';
import { Categoria } from '../variedades/interfaces/categoria.interface';
import { Canal } from '../tablas/interfaces/canal.interface';
import { Zona } from '../tablas/interfaces/zona.interface';
import { Distrito } from '../tablas/ubigeo/interface/distrito.interface';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { FactorPenetracionService } from '../../service/factorPenetracion';
import { CategoriaService } from '../variedades/services/categoria.service';
import { CanalService } from '../tablas/service/canal.sevice';
import { ZonaService } from '../tablas/service/zona.service';
import { AlertService } from '../../../shared/services/alert.service';
import { forkJoin, lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-factor-penetracion',
  templateUrl: './factor-penetracion.component.html'
})
export class FactorPenetracionComponent {


  @Input()
  modelFactorPenetracion: FactorPenetracion = FactorPenetracionInit
  showLoading: boolean = false;

  FactorPenetracion:FactorPenetracion = FactorPenetracionInit;

  categorias:Categoria[] = []
  canals:Canal[] = []
  zonas: Zona[] = []
  

  models: FormGroup = this.fb.group({
    modelos: this.fb.array([]),
  });;

  constructor(
    private service: FactorPenetracionService,
    private serviceCategoria: CategoriaService,
    private serviceCanal: CanalService,
    private serviceZona: ZonaService,
    private fb: FormBuilder,
    private alert: AlertService
  ) {

  }

  ngOnInit(): void {
    this.loadModels();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['model']) {
      this.loadModels();
    }
  }

  loadModels(): void {
    this.showLoading = true;
    (this.models.get('modelos') as FormArray).clear();

    forkJoin( 
      {
        service  : this.service.get(),
        serviceCategoria  : this.serviceCategoria.get(),
        serviceCanal  : this.serviceCanal.get(),
        serviceZona  : this.serviceZona.get(),
      }
      ).subscribe({
        next:value => {

          const models = value.service.data;
          this.categorias = value.serviceCategoria.data
          this.canals = value.serviceCanal.data
          this.zonas = value.serviceZona.data

          models.forEach((model,index) => {

            const nuevoModelo = this.fb.group({
              id: [model.id],
              idCategoria: [model.idCategoria],
              idCanal: [model.idCanal],
              idZona: [model.idZona],
              valor: [model.valor],

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
    this.FactorPenetracion = (this.models.get('modelos') as FormArray).at(index).value;
  }

  add() {
    const nuevoModelo = this.fb.group({
      id: [0],
      idCategoria: [0],
      idCanal: [0],
      idZona: [0],
      idDistrito: [0],
      valor: [0],
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
