import { Component, OnInit } from '@angular/core';
import { AgrupacionZonasService } from '../../service/agrupacionZonas';
import { AgrupacionZonasDetalleService } from '../../service/agrupacionZonasDetalle';
import { AgrupacionZonas, AgrupacionZonasInit } from '../../interface/agrupacionZonas';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { ValidFormService } from '../../../shared/services/validForm.service';
import { AlertService } from '../../../shared/services/alert.service';
import { lastValueFrom } from 'rxjs';
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'app-agrupacion-zonas',
  templateUrl: './agrupacion-zonas.component.html'
})
export class AgrupacionZonasComponent implements OnInit {
  title: string = 'AGRUPACIÓN DE ZONAS'
  showLoading: boolean = false
  selectedRowIndex: number = -1;
   
  agrupacionZonasAll: AgrupacionZonas[] = []
  agrupacionZonas: AgrupacionZonas = AgrupacionZonasInit

  public models = this.fb.group({
    modelos: this.fb.array([])
  })

  constructor(
    private fb: FormBuilder,
    private validForm: ValidFormService,
    private service: AgrupacionZonasService,
    private serviceAgrupacionZonasDetalle: AgrupacionZonasDetalleService,
    private alert: AlertService,
    public authService: AuthService
  ) { }

  ngOnInit(): void {
    this.loadModels()
  }

  loadModels(): void { 
    this.showLoading = true;
    (this.models.get('modelos') as FormArray).clear();

    this.service.get().subscribe(x => { 

      this.agrupacionZonasAll = x.data
 
      x.data.forEach(model => {
        const nuevoModelo = this.fb.group({
          id: [model.id], 
          descripcion: [model.descripcion],
          descripcionResumida: [model.descripcionResumida],
          tip: [model.tip],
          idTipoAgrupacion1: [model.idTipoAgrupacion1],
          idTipoAgrupacion2: [model.idTipoAgrupacion2],
          idTipoAgrupacion3: [model.idTipoAgrupacion3], 
          alias1: [model.alias1],
          alias2: [model.alias2],
          alias3: [model.alias3],
          fechaRegistro: [model.fechaRegistro],
          fechaModificacion: [model.fechaModificacion],
          estado: [model.estado],
        });

        this.modelosArray.push(nuevoModelo);
      });

      if (x.data.length == 0) {
        this.add();
      }
      this.showLoading = false;

    })
  }
   
  get getModel() {    
    return this.agrupacionZonas
  }

  get modelosArray() { 
    return this.models.get('modelos') as FormArray;
  }


 
  editModel(num: number) {
    this.alert.showAlertConfirm('Aviso', '¿Desea modificar?', 'warning', () => {
      const modelo = this.modelosArray.controls[num].getRawValue();

      if(modelo.descripcion==''){
        this.alert.showAlert('Advertencia', 'Debe llenar los campos', 'warning');
        return
      }

      this.service.update(modelo.id, modelo).subscribe(x => {

        this.alert.showAlert('Mensaje', 'Guardado correctamente', 'success');
      });
    })

  }

  selectAtributo(index: number) {
    this.agrupacionZonas = (this.models.get('modelos') as FormArray).at(index).value;
    this.selectedRowIndex = index;
  }

  add() {

    const nuevoModelo = this.fb.group({
      id: [0],
      descripcion: ['',Validators.required],
      descripcionResumida: [''],
      tip: [''],
      idTipoAgrupacion1: [0],
      idTipoAgrupacion2: [0],
      idTipoAgrupacion3: [0],
      alias1: [''],
      alias2: [''],
      alias3: [''],
    });

    this.modelosArray.push(nuevoModelo);
  }

  async save(num: number): Promise<void> {
    const modelo = this.modelosArray.at(num).value;

    if(modelo.descripcion==''){
      this.alert.showAlert('Advertencia', 'Debe llenar los campos', 'warning');
      return
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
