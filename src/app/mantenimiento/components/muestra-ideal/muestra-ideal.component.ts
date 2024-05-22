import { Component, Input, SimpleChanges } from '@angular/core';
import { MuestraIdeal, MuestraIdealInit } from '../../interface/muestraIdeal';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { MuestraIdealService } from '../../service/muestraIdeal';
import { AlertService } from '../../../shared/services/alert.service';
import { forkJoin, lastValueFrom } from 'rxjs';
import { CategoriaService } from '../variedades/services/categoria.service';
import { CanalService } from '../tablas/service/canal.sevice';
import { ZonaService } from '../tablas/service/zona.service';
import { DistritoService } from '../tablas/ubigeo/service/distrito.service';
import { Categoria } from '../variedades/interfaces/categoria.interface';
import { Canal } from '../tablas/interfaces/canal.interface';
import { Zona } from '../tablas/interfaces/zona.interface';
import { Distrito } from '../tablas/ubigeo/interface/distrito.interface';

@Component({
  selector: 'app-muestra-ideal',
  templateUrl: './muestra-ideal.component.html'
})
export class MuestraIdealComponent {


  @Input()
  modelMuestraIdeal: MuestraIdeal = MuestraIdealInit
  showLoading: boolean = false;

  muestraIdeal:MuestraIdeal = MuestraIdealInit;

  categorias:Categoria[] = []
  canals:Canal[] = []
  zonas: Zona[] = []
  distritos:Distrito[] = []
  arrDistritos:Distrito[][]=[]

  models: FormGroup = this.fb.group({
    modelos: this.fb.array([]),
  });;

  constructor(
    private service: MuestraIdealService,
    private serviceCategoria: CategoriaService,
    private serviceCanal: CanalService,
    private serviceZona: ZonaService,
    private serviceDistrito: DistritoService,
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
        serviceDistrito  : this.serviceDistrito.get(),
      }
      ).subscribe({
        next:value => {

          const models = value.service.data;
          this.categorias = value.serviceCategoria.data
          this.canals = value.serviceCanal.data
          this.zonas = value.serviceZona.data
          this.distritos = value.serviceDistrito.data

         

          models.forEach((model,index) => {

            const miDistrito = this.distritos.find(y=>y.id == model.idDistrito)
            

            const nuevoModelo = this.fb.group({
              id: [model.id],
              idCategoria: [model.idCategoria],
              idCanal: [model.idCanal],
              idZona: [miDistrito?.idZona],
              idDistrito: [model.idDistrito],
              valor: [model.valor],

            });
  
            this.modelosArray.push(nuevoModelo);
            this.arrDistritos[index] = this.distritos.filter(x=>x.idZona == miDistrito?.idZona)
            //this.arrDistritos[index] = []
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

  cambiaZona(e:Event,index: number) {
    const valor = (e.target as HTMLInputElement).value
    this.arrDistritos[index] = this.distritos.filter(x=>x.idZona == parseInt(valor))
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
    this.muestraIdeal = (this.models.get('modelos') as FormArray).at(index).value;
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
