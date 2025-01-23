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
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-muestra-ideal',
  templateUrl: './muestra-ideal.component.html'
})
export class MuestraIdealComponent {


  @Input()
  modelMuestraIdeal: MuestraIdeal = MuestraIdealInit
  showLoading: boolean = false;
  textoBuscar: string='';

  muestraIdeal:MuestraIdeal = MuestraIdealInit;

  categorias:Categoria[] = []
  canals:Canal[] = []
  zonas: Zona[] = []
  distritos:Distrito[] = []
  arrDistritos:Distrito[][]=[]

  buscarCategoria:string=''
  buscarCanal:string=''
  buscarZona:string=''
  buscarDistrito:string=''
  buscarValor:string=''
  muestras:MuestraIdeal[]=[]

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
          this.muestras = value.service.data;
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

  exportExcel() {
    this.service.get().subscribe(x=>{
      const models = x.data

      if(models.length==0){
        this.alert.showAlert("Advertencia","No muestra para exportar","warning");
        return
      }

      const worksheet = this.skusToWorksheet(models);  // Convierte los SKUs a hoja de trabajo
      const workbook = XLSX.utils.book_new();  // Crea un nuevo libro de trabajo (workbook)
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Muestra');  // Añade la hoja al libro de trabajo

      // Exportar como archivo .xlsx
      XLSX.writeFile(workbook, 'muestra_ideal.xlsx');
    })

    
  }

  skusToWorksheet(models: MuestraIdeal[]): XLSX.WorkSheet {
    const data: string[][] = [];  

    const filaCabecera: string[] = [];

    filaCabecera.push('Dirección');
    filaCabecera.push('Cod Categoria');
    filaCabecera.push('Categoria');
    filaCabecera.push('Cod Canal');
    filaCabecera.push('Canal');
    filaCabecera.push('Cod Ciudad');
    filaCabecera.push('Ciudad');
    filaCabecera.push('Cod Distrito');
    filaCabecera.push('Distrito');
    filaCabecera.push('Valor');
    filaCabecera.push('Fecha Creación');


    data.push(filaCabecera);

    for (const model of models) {
      const fila: string[] = [];

      fila.push(model.id.toString());
      fila.push(model.idCategoria.toString());
      fila.push(model.Categoria.descripcion);
      fila.push(model.idCanal.toString());
      fila.push(model.Canal.descripcion);
      fila.push(model.Distrito.idZona.toString());
      fila.push(model.Distrito.Zona.descripcion);
      fila.push(model.idDistrito.toString());
      fila.push(model.Distrito.descripcion);
      fila.push(model.valor.toString());
      fila.push(model.fechaRegistro.toString());
      

      data.push(fila);
    }

    return XLSX.utils.aoa_to_sheet(data);
  } 

  filtroBusqueda(model:MuestraIdeal):boolean|undefined {
    console.log(model);
    
    return this.canals.find(y=>y.id == model.idCanal)?.descripcion.includes(this.buscarCanal.toUpperCase()) 
      && this.categorias.find(y=>y.id == model.idCategoria)?.descripcion.includes(this.buscarCategoria.toUpperCase()) 
      && this.distritos.find(y=>y.id == model.idDistrito)?.descripcion.includes(this.buscarDistrito.toUpperCase()) 
      && this.distritos.find(y=>y.id == model.idDistrito)?.Zona.descripcion.includes(this.buscarZona.toUpperCase()) 
      && model.valor.toString().includes(this.buscarValor.toString().toUpperCase()) 
  }

  keyupCategoria(e:Event){
    this.buscarCategoria = (e.target as HTMLInputElement).value
  }

  keyupCanal(e:Event){
    this.buscarCanal = (e.target as HTMLInputElement).value
  }

  keyupZona(e:Event){
    this.buscarZona = (e.target as HTMLInputElement).value
  }

  keyupDistrito(e:Event){
    this.buscarDistrito = (e.target as HTMLInputElement).value
  }

  keyupValor(e:Event){
    this.buscarValor = (e.target as HTMLInputElement).value
  }

  get modelosArray() {
    return this.models.get('modelos') as FormArray;
  }

  cambiaZona(e:Event,index: number) {
    const valor = (e.target as HTMLInputElement).value
    this.arrDistritos[index] = this.distritos.filter(x=>x.idZona == parseInt(valor))
  }

  editModel(num: number) {
    const filas:MuestraIdeal[] = this.modelosArray.value;
    const modelo:MuestraIdeal = this.modelosArray.controls[num].getRawValue();

    if(modelo.idCanal==0 || modelo.idCategoria==0 ||  modelo.idDistrito==0){
      this.alert.showAlert('Advertencia','Debe llenar todos los campos','warning');
      return;
    }

    const exists = filas.some(fila => 
      fila.id != modelo.id &&
      fila.idCanal == modelo.idCanal && 
      fila.idCategoria == modelo.idCategoria && 
      fila.idDistrito == modelo.idDistrito
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
    const filas:MuestraIdeal[] = this.modelosArray.value;
    const modelo = this.modelosArray.at(num).value;

    if(modelo.idCanal==0 || modelo.idCategoria==0 ||  modelo.idDistrito==0){
      this.alert.showAlert('Advertencia','Debe llenar todos los campos','warning');
      return;
    }
    
    const exists = filas.some(fila => 
      fila.id != modelo.id &&
      fila.idCanal == modelo.idCanal && 
      fila.idCategoria == modelo.idCategoria && 
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
