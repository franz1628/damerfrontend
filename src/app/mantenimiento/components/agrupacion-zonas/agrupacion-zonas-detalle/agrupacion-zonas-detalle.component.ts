import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AgrupacionZonas, AgrupacionZonasInit } from '../../../interface/agrupacionZonas';
import { FormArray, FormBuilder } from '@angular/forms';
import { ValidFormService } from '../../../../shared/services/validForm.service';
import { AgrupacionZonasDetalleService } from '../../../service/agrupacionZonasDetalle';
import { AlertService } from '../../../../shared/services/alert.service';
import { AgrupacionZonasDetalle, AgrupacionZonasDetalleInit } from '../../../interface/agrupacionZonasDetalle';
import { lastValueFrom } from 'rxjs';
import { ZonaService } from '../../tablas/service/zona.service';
import { Zona, ZonaInit } from '../../tablas/interfaces/zona.interface';

@Component({
  selector: 'app-agrupacion-zonas-detalle',
  templateUrl: './agrupacion-zonas-detalle.component.html'
})
export class AgrupacionZonasDetalleComponent implements OnInit,OnChanges{

  @Input() agrupacionZonas: AgrupacionZonas = AgrupacionZonasInit
  showLoading: boolean = false
  agrupacionZonasDetalle:AgrupacionZonasDetalle = AgrupacionZonasDetalleInit 
  agrupacionZonasDetalles:AgrupacionZonasDetalle[] = []
  descripcionZona :string = ''
  abrirModal=false
  resultZonas:Zona[] = []
  zonaElegida:Zona=ZonaInit
  selectIndex:number=0
  selectIndexModal:number=-1

  public models = this.fb.group({
    modelos: this.fb.array([])
  })

  constructor(
    private fb: FormBuilder,
    private validForm: ValidFormService, 
    private service: AgrupacionZonasDetalleService,
    private alert: AlertService,
    private serviceZona:ZonaService
  ) { }

  ngOnInit(): void {
    this.loadModels() 
  } 
 
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['agrupacionZonas']) {
      this.loadModels();
    }
  }
 
  loadModels(): void { 
    if(this.agrupacionZonas.id==0) return
     
    this.showLoading = true;
    (this.models.get('modelos') as FormArray).clear();

    this.service.postIdAgrupacionZonas(this.agrupacionZonas.id).subscribe(x => { 
      this.agrupacionZonasDetalles = x.data
      
      x.data.forEach(model => {

        
        const nuevoModelo = this.fb.group({
          id: [model.id], 
          idAgrupacionZonas:[model.idAgrupacionZonas],
          idZona:[model.idZona || 0],
          descripcion:[model.Zona?.descripcion||''],
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

  buscarZona() {
    this.serviceZona.postDescripcion(this.descripcionZona).subscribe(x=>{
      this.resultZonas=x.data
    })
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
    this.agrupacionZonasDetalles = (this.models.get('modelos') as FormArray).at(index).value;
    this.selectIndex = index
  }

  elegirZona(zona: Zona,index:number) {
   this.zonaElegida = zona 
   this.selectIndexModal=index
  }

  agregarZona() {

    if(this.zonaElegida.id==0) return
    
   // this.editModel(this.selectIndex);
    (this.models.get('modelos') as FormArray).at(this.selectIndex).patchValue({idZona:this.zonaElegida.id,descripcion:this.zonaElegida.descripcion});
  }

  add() {
    const nuevoModelo = this.fb.group({
      id: [0], 
      idAgrupacionZonas:[this.agrupacionZonas.id],
      idZona:[0],
      descripcion:[''],
    });

    this.modelosArray.push(nuevoModelo);
  }

  async save(num: number): Promise<void> {
    const modelo:AgrupacionZonasDetalle = this.modelosArray.at(num).value;
   

    if(modelo.idZona==0){
      this.alert.showAlert('Advertencia','Debe elegir un Zona','warning');
      return;
    }

    this.showLoading = true;

    try {
      const resp = await lastValueFrom(this.service.postIdAgrupacionZonas(this.agrupacionZonas.id))
      const agrupaciones = resp.data

      if(agrupaciones.find(x=>x.idZona==modelo.idZona)){
        this.alert.showAlert('Advertencia', 'Zona ya registrado en la agrupacion', 'warning');
        this.showLoading = false;
        return;
      }

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
