import { Component } from '@angular/core';
import { AgrupacionCanals, AgrupacionCanalsInit } from '../../interface/agrupacionCanals';
import { FormArray, FormBuilder } from '@angular/forms';
import { ValidFormService } from '../../../shared/services/validForm.service';
import { AgrupacionCanalsService } from '../../service/agrupacionCanals';
import { AgrupacionCanalsDetalleService } from '../../service/agrupacionCanalsDetalle';
import { AlertService } from '../../../shared/services/alert.service';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-agrupacion-canals',
  templateUrl: './agrupacion-canals.component.html'
})
export class AgrupacionCanalsComponent {
  title: string = 'AGRUPACIÓN DE CANALES'
  showLoading: boolean = false
  selectedRowIndex: number = -1;
   
  agrupacionCanalsAll: AgrupacionCanals[] = []
  agrupacionCanals: AgrupacionCanals = AgrupacionCanalsInit

  public models = this.fb.group({
    modelos: this.fb.array([])
  })

  constructor(
    private fb: FormBuilder,
    private validForm: ValidFormService,
    private service: AgrupacionCanalsService,
    private serviceAgrupacionCanalsDetalle: AgrupacionCanalsDetalleService,
    private alert: AlertService
  ) { }

  ngOnInit(): void {
    this.loadModels()
  }

  loadModels(): void { 
    this.showLoading = true;
    (this.models.get('modelos') as FormArray).clear();

    this.service.get().subscribe(x => { 
      this.agrupacionCanalsAll = x.data
 
      x.data.forEach(model => {
        const nuevoModelo = this.fb.group({
          id: [model.id], 
          descripcion: [model.descripcion],
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
    return this.agrupacionCanals
  }

  get modelosArray() { 
    return this.models.get('modelos') as FormArray;
  }


 
  editModel(num: number) {

    const modelo = this.modelosArray.controls[num].getRawValue();
    if(modelo.descripcion==''){
      this.alert.showAlert('Advertencia','Debe terner una descripcion','warning');
      return;
    }

    this.alert.showAlertConfirm('Aviso', '¿Desea modificar?', 'warning', () => {

      this.service.update(modelo.id, modelo).subscribe(x => {
        this.loadModels();
        this.alert.showAlert('Mensaje', 'Guardado correctamente', 'success');
      });
    })

  }

  selectAtributo(index: number) {
    this.agrupacionCanals = (this.models.get('modelos') as FormArray).at(index).value;
    this.selectedRowIndex = index;
  }

  add() {
    const nuevoModelo = this.fb.group({
      id: [0],
      descripcion: [''],
    });

    this.modelosArray.push(nuevoModelo);
  }

  async save(num: number): Promise<void> {
    const modelo = this.modelosArray.at(num).value;
    if(modelo.descripcion==''){
      this.alert.showAlert('Advertencia','Debe terner una descripcion','warning');
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
