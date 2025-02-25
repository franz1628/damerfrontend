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
import { MedicionService } from '../../service/medicion.service';
import { Medicion } from '../../interface/medicion';
import { AgrupacionCanalsService } from '../../service/agrupacionCanals';
import { AgrupacionCanals } from '../../interface/agrupacionCanals';

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
  canals:AgrupacionCanals[] = []
  zonas: Zona[] = []
  medicions:Medicion[] = []
  factores:FactorPenetracion[] = []

  models: FormGroup = this.fb.group({
    modelos: this.fb.array([]),
  });;

  constructor(
    private service: FactorPenetracionService,
    private serviceCategoria: CategoriaService,
    private serviceCanal: AgrupacionCanalsService,
    private serviceZona: ZonaService,
    private serviceMedicion:MedicionService,
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
        serviceZona  : this.serviceZona.getProyectada(),
        serviceMedicion: this.serviceMedicion.get()
      }
      ).subscribe({
        next:value => {

          this.factores = value.service.data;
          this.categorias = value.serviceCategoria.data
          this.canals = value.serviceCanal.data
          this.zonas = value.serviceZona.data
          this.medicions = value.serviceMedicion.data

          this.factores.forEach((model,index) => {

            const nuevoModelo = this.fb.group({
              id: [model.id],
              idCategoria: [model.idCategoria],
              idAgrupacionCanals: [model.idAgrupacionCanals],
              idZona: [model.idZona],
              valor: [model.valor],
              idMedicion: [model.idMedicion],

            });
  
            this.modelosArray.push(nuevoModelo);
          });
  
          if(this.factores.length==0){
            this.add();
          }
  
          this.showLoading = false;
        }
      })
  }

  get modelosArray() {
    return this.models.get('modelos') as FormArray;
  }

  getMedicion(idMedicion:number) {
    return this.medicions.find(x => x.id == idMedicion)?.medicion;
  }

  editModel(num: number) {

    const filas:FactorPenetracion[] = this.modelosArray.value;
    const modelo:FactorPenetracion = this.modelosArray.controls[num].getRawValue();

    if(modelo.idCategoria==0 || modelo.idAgrupacionCanals==0 || modelo.idZona==0 ){
      this.alert.showAlert('Advertencia','Debe llenar todos los campos','warning');
      return;
    }
    
    if (modelo.valor <= 0 || !Number.isInteger(modelo.valor)) {
      this.alert.showAlert('Advertencia','El valor debe ser un entero positivo mayor que 0', 'warning');
      return;
    }

    const exists = filas.some(fila => 
      fila.id != modelo.id &&
      fila.idAgrupacionCanals == modelo.idAgrupacionCanals && 
      fila.idCategoria == modelo.idCategoria && 
      fila.idZona == modelo.idZona 
    );
    
    if (exists) {
      this.alert.showAlert('Advertencia', 'Ya existe una muestra ideal con las mismas características','warning');
      return;
    }


    this.alert.showAlertConfirm('Aviso', '¿Desea modificar?', 'warning', () => {
  

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
      idAgrupacionCanals: [0],
      idZona: [0],
      idDistrito: [0],
      valor: [0],
      idMedicion: [localStorage.getItem('medicion')],
    });

    this.modelosArray.push(nuevoModelo);
  }

  async save(num: number): Promise<void> {
    const filas:FactorPenetracion[] = this.modelosArray.value;
    const modelo:FactorPenetracion = this.modelosArray.controls[num].getRawValue();

    if(modelo.idCategoria==0 || modelo.idAgrupacionCanals==0 || modelo.idZona==0 ){
      this.alert.showAlert('Advertencia','Debe llenar todos los campos','warning');
      return;
    }
    
    if (modelo.valor <= 0 || !Number.isInteger(modelo.valor)) {
      this.alert.showAlert('Advertencia','El valor debe ser un entero positivo mayor que 0', 'warning');
      return;
    }

    const exists = filas.some(fila => 
      fila.id != modelo.id &&
      fila.idAgrupacionCanals == modelo.idAgrupacionCanals && 
      fila.idCategoria == modelo.idCategoria && 
      fila.idZona == modelo.idZona 
    );
    
    if (exists) {
      this.alert.showAlert('Advertencia', 'Ya existe una muestra ideal con las mismas características','warning');
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
