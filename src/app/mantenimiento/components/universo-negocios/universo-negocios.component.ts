import { Component, Input, SimpleChanges } from '@angular/core';
import { UniversoNegocios, UniversoNegociosInit } from '../../interface/universoNegocios';
import { AbstractControl, FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { UniversoNegociosService } from '../../service/universoNegocios';
import { CanalService } from '../tablas/service/canal.sevice';
import { ZonaService } from '../tablas/service/zona.service';
import { AlertService } from '../../../shared/services/alert.service';
import { Canal } from '../tablas/interfaces/canal.interface';
import { Zona } from '../tablas/interfaces/zona.interface';
import { forkJoin, lastValueFrom } from 'rxjs';
import { Distrito } from '../tablas/ubigeo/interface/distrito.interface';
import { DistritoService } from '../tablas/ubigeo/service/distrito.service';
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'app-universo-negocios',
  templateUrl: './universo-negocios.component.html'
})
export class UniversoNegociosComponent {


  @Input()
  modelUniversoNegocios: UniversoNegocios = UniversoNegociosInit
  showLoading: boolean = false;

  UniversoNegocios:UniversoNegocios = UniversoNegociosInit;

  
  canals:Canal[] = []
  zonas: Zona[] = []
  distritos:Distrito[] = []
  arrDistritos:Distrito[][]=[]

  models: FormGroup = this.fb.group({
    modelos: this.fb.array([]),
  });

  textoBuscar: string='';
  modelsFilter:UniversoNegocios[]=[]

  constructor(
    private service: UniversoNegociosService,
    private serviceCanal: CanalService,
    private serviceZona: ZonaService,
    private serviceDistrito: DistritoService,
    private fb: FormBuilder,
    private alert: AlertService,
    public authService: AuthService
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
        serviceCanal  : this.serviceCanal.get(),
        serviceZona  : this.serviceZona.get(),
        serviceDistrito  : this.serviceDistrito.get(),
        
      }
      ).subscribe({
        next:value => {

          this.modelsFilter = value.service.data;
          this.canals = value.serviceCanal.data
          this.zonas = value.serviceZona.data
          this.distritos = value.serviceDistrito.data

          this.modelsFilter.forEach((model,index) => {

            const miDistrito = this.distritos.find(y=>y.id == model.idDistrito)
            const nuevoModelo = this.fb.group({
              id: [model.id],
              idCanal: [model.idCanal],
              idZona: [model.idZona],
              idDistrito: [model.idDistrito],
              valor: [model.valor],
              fechaRegistro: [model.fechaRegistro],
              fechaModificacion: [model.fechaModificacion],

            });
  
            this.modelosArray.push(nuevoModelo);
            this.arrDistritos[index] = this.distritos.filter(x=>x.idZona == miDistrito?.idZona)
          });
  
          if(this.modelsFilter.length==0){
            this.add();
          }
  
          this.showLoading = false;
        }
      })
  }

  filtroBusqueda(model:UniversoNegocios):boolean {
    return this.canals.find(y=>y.id == model.idCanal)?.descripcion.includes(this.textoBuscar.toUpperCase()) 
      || this.zonas.find(y=>y.id == model.idZona)?.descripcion.includes(this.textoBuscar.toUpperCase()) 
      || this.distritos.find(y=>y.id == model.idDistrito)?.descripcion.includes(this.textoBuscar.toUpperCase()) 
      || model.valor.toString().includes(this.textoBuscar.toString().toUpperCase()) 
  }
 
  get modelosArray() {
    const arr_model = this.models.get('modelos') as FormArray;
    return arr_model;
  }

  cambiaZona(e:Event,index: number) {
    const valor = (e.target as HTMLInputElement).value
    this.arrDistritos[index] = this.distritos.filter(x=>x.idZona == parseInt(valor))
  }

  editModel(num: number) {

    const filas:UniversoNegocios[] = this.modelosArray.value;
    const modelo:UniversoNegocios = this.modelosArray.controls[num].getRawValue();

    if(modelo.idCanal==0 || modelo.idZona==0  ||  modelo.idDistrito==0){
      this.alert.showAlert('Advertencia','Debe llenar todos los campos','warning');
      return;
    }
    
    if (modelo.valor <= 0 || !Number.isInteger(modelo.valor)) {
      this.alert.showAlert('Advertencia','El valor debe ser un entero positivo mayor que 0', 'warning');
      return;
    }

    const exists = filas.some(fila => 
      fila.id != modelo.id &&
      fila.idCanal == modelo.idCanal && 
      fila.idZona == modelo.idZona && 
      fila.idDistrito == modelo.idDistrito
    );
    
    if (exists) {
      this.alert.showAlert('Advertencia', 'Ya existe un universo con las mismas características','warning');
      return;
    }


    this.alert.showAlertConfirm('Aviso', '¿Desea modificar?', 'warning', () => {

      this.service.update(modelo.id, modelo).subscribe(x => {

        this.alert.showAlert('Mensaje', 'Guardado correctamente', 'success');
      });
    })

  }

  selectAtributo(index: number) {
    console.log(index);
    
    this.UniversoNegocios = (this.models.get('modelos') as FormArray).at(index).value;
  }

  add() {
    const nuevoModelo = this.fb.group({
      id: [0],
      idCanal: [0],
      idZona: [0],
      idDistrito: [0],
      valor: [0],
    });

    this.modelosArray.push(nuevoModelo);
  }

  async save(num: number): Promise<void> {


    const filas:UniversoNegocios[] = this.modelosArray.value;
    const modelo:UniversoNegocios = this.modelosArray.controls[num].getRawValue();

    if(modelo.idCanal==0 || modelo.idZona==0  ||  modelo.idDistrito==0){
      this.alert.showAlert('Advertencia','Debe llenar todos los campos','warning');
      return;
    }

    if (modelo.valor <= 0 || !Number.isInteger(modelo.valor)) {
      this.alert.showAlert('Advertencia','El valor debe ser un entero positivo mayor que 0', 'warning');
      return;
    }

    const exists = filas.some(fila => 
      fila.id != modelo.id &&
      fila.idCanal == modelo.idCanal && 
      fila.idZona == modelo.idZona && 
      fila.idDistrito == modelo.idDistrito
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
