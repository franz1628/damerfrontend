import { Component, Input, SimpleChanges } from '@angular/core';
import { AgrupacionCanals, AgrupacionCanalsInit } from '../../../interface/agrupacionCanals';
import { AgrupacionCanalsDetalle, AgrupacionCanalsDetalleInit } from '../../../interface/agrupacionCanalsDetalle';
import { Canal, CanalInit } from '../../tablas/interfaces/canal.interface';
import { FormArray, FormBuilder } from '@angular/forms';
import { ValidFormService } from '../../../../shared/services/validForm.service';
import { AgrupacionCanalsDetalleService } from '../../../service/agrupacionCanalsDetalle';
import { AlertService } from '../../../../shared/services/alert.service';
import { CanalService } from '../../tablas/service/canal.sevice';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-agrupacion-canals-detalle',
  templateUrl: './agrupacion-canals-detalle.component.html'
})
export class AgrupacionCanalsDetalleComponent {
  @Input() agrupacionCanals: AgrupacionCanals = AgrupacionCanalsInit
  showLoading: boolean = false
  agrupacionCanalsDetalle:AgrupacionCanalsDetalle = AgrupacionCanalsDetalleInit 
  agrupacionCanalsDetalles:AgrupacionCanalsDetalle[] = []
  descripcionCanal :string = ''
  abrirModal=false
  resultCanals:Canal[] = []
  canalElegida:Canal=CanalInit
  selectIndex:number=0
  selectIndexModal:number=-1

  public models = this.fb.group({
    modelos: this.fb.array([])
  })

  constructor(
    private fb: FormBuilder,
    private validForm: ValidFormService, 
    private service: AgrupacionCanalsDetalleService,
    private alert: AlertService,
    private serviceCanal:CanalService
  ) { }

  ngOnInit(): void {
    this.loadModels() 
  } 
 
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['agrupacionCanals'] && !changes['agrupacionCanals'].firstChange) {
      this.loadModels();
    }
  }
 
  loadModels(): void { 
    if(this.agrupacionCanals.id==0) return
     
    this.showLoading = true;
    (this.models.get('modelos') as FormArray).clear();

    this.service.postIdAgrupacionCanals(this.agrupacionCanals.id).subscribe(x => { 
      this.agrupacionCanalsDetalles = x.data
      
      x.data.forEach(model => {

        
        const nuevoModelo = this.fb.group({
          id: [model.id], 
          idAgrupacionCanals:[model.idAgrupacionCanals],
          idCanal:[model.idCanal],
          descripcion:[model.Canal?.descripcion||''],
        });

        this.modelosArray.push(nuevoModelo);
      });

      if (x.data.length == 0) { 
        this.add();
      }
      this.showLoading = false;

    })
  }

  get getModels() {

    return
  }

  get modelosArray() {
    return this.models.get('modelos') as FormArray;
  }

  buscarCanal() {
    this.serviceCanal.postDescripcion(this.descripcionCanal).subscribe(x=>{
      this.resultCanals=x.data
    })
  }

  editModel(num: number) {

    const modelo = this.modelosArray.controls[num].getRawValue();
    if(modelo.descripcion==''){
      this.alert.showAlert('Advertencia','Debe terner una descripcion','warning');
      return;
    }
    this.alert.showAlertConfirm('Aviso', '¿Desea modificar?', 'warning', () => {

      this.service.update(modelo.id, modelo).subscribe(x => {

        this.alert.showAlert('Mensaje', 'Guardado correctamente', 'success');
      });
    })

  }

  selectAtributo(index: number) {
    this.agrupacionCanals = (this.models.get('modelos') as FormArray).at(index).value;
    this.selectIndex = index
  }

  elegirCanal(canal: Canal,index:number) {
   this.canalElegida = canal 
   this.selectIndexModal=index
  }

  agregarCanal() {

    if(this.canalElegida.id==0) return
    
   // this.editModel(this.selectIndex);
    (this.models.get('modelos') as FormArray).at(this.selectIndex).patchValue({idCanal:this.canalElegida.id,descripcion:this.canalElegida.descripcion});
  }

  add() {
    const nuevoModelo = this.fb.group({
      id: [0], 
      idAgrupacionCanals:[this.agrupacionCanals.id],
      idCanal:[0],
      descripcion:[''],
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
      this.alert.showAlert('Error', 'Hubo un problema en el servidor','error');
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
