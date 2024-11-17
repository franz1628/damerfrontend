import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { TipoEstudioService } from '../../../service/tipoEstudio';
import { ClienteZona } from '../../../interface/clienteZona';
import { ClienteCanal } from '../../../interface/clienteCanal';
import { TipoEstudio, TipoEstudioInit } from '../../../interface/tipoEstudio';
import { AtributoFuncionalVariedad } from '../../../interface/atributoFuncionalVariedad';
import { TipoInformeOrden } from '../../../interface/tipoInformeOrden';
import { AlertService } from '../../../../shared/services/alert.service';
import { ClienteZonaService } from '../../../service/clienteZona';
import { ClienteCanalService } from '../../../service/clienteCanal';
import { ContratoForm, ContratoFormInit } from '../../../interface/contratoForm';
import { AtributoFuncionalVariedadService } from '../../../service/atributoFuncionalVariedad';
import { ClienteAgrupacionZona } from '../../../interface/clienteAgrupacionZona';
import { ClienteAgrupacionCanal } from '../../../interface/clienteAgrupacionCanal';
import { ClienteAgrupacionZonaService } from '../../../service/clienteAgrupacionZona';
import { ClienteAgrupacionCanalService } from '../../../service/clienteAgrupacionCanal';

@Component({
  selector: 'app-contrato-etiquetas',
  templateUrl: './contrato-etiquetas.component.html'
})
export class ContratoEtiquetasComponent implements OnInit { 
  @Output() actualizarArbol:EventEmitter<ContratoForm> = new EventEmitter();

  public model = this.fb.group({
    id: [0],
    tipoEstudios: [0],
    zonas: this.fb.array<number>([]),
    canals: this.fb.array<number>([]),
    atributoFuncionalVariedads: this.fb.array<number>([]),
    tipoInformeOrdens: this.fb.array<number>([]),
  });

  zonas: ClienteAgrupacionZona[] = [];
  canals: ClienteAgrupacionCanal[] = [];
  tipoEstudios: TipoEstudio[] = [];
  atributoFuncionalVariedads: AtributoFuncionalVariedad[] = [];
  tipoInformeOrdens: TipoInformeOrden[] = [];
  contratoForm:ContratoForm = ContratoFormInit;


  constructor(
    private fb:FormBuilder,
    private serviceTipoEstudio : TipoEstudioService,
    private alert:AlertService,
    private serviceClienteAgrupacionZona:ClienteAgrupacionZonaService,
    private serviceClienteAgrupacionCanal:ClienteAgrupacionCanalService,
    private serviceAtributoFuncionalVariedad: AtributoFuncionalVariedadService

  ){}

  ngOnInit(): void {
    this.serviceTipoEstudio.get().subscribe((x) => {
      this.tipoEstudios = x.data;
    });
  }

  get getZonas(): FormArray {
    return this.model.get('zonas') as FormArray;
  }

  get getCanals(): FormArray {
    return this.model.get('canals') as FormArray;
  }

  get getAtributoFuncionalVariedads(): FormArray {
    return this.model.get('atributoFuncionalVariedads') as FormArray;
  }

  get getTipoInformeOrdens(): FormArray {
    return this.model.get('tipoInformeOrdens') as FormArray;
  }

  actualizarEleccion(){
    //const contratoForm = ContratoFormInit;
    this.contratoForm.zonas = [];
    const arr_zonas = (this.model.get('zonas') as FormArray).value;
    for (let i = 0; i < arr_zonas.length; i++) {
      if(arr_zonas[i]){
        this.contratoForm.zonas.push(this.zonas[i]);
      }
    }

    this.contratoForm.canals = [];
    const arr_canals = (this.model.get('canals') as FormArray).value;
    for (let i = 0; i < arr_canals.length; i++) {
      if(arr_canals[i]){
        this.contratoForm.canals.push(this.canals[i]);
      }
    }

    this.contratoForm.tipoInformeOrdens = [];
    const arr_tipoInformeOrdens = (this.model.get('tipoInformeOrdens') as FormArray).value;
    for (let i = 0; i < arr_tipoInformeOrdens.length; i++) {
      if(arr_tipoInformeOrdens[i]){
        this.contratoForm.tipoInformeOrdens.push(this.tipoInformeOrdens[i]);
      }
    }

    this.contratoForm.atributoFuncionalVariedads = []; 
    const arr_atributoFuncionalVariedads = (this.model.get('atributoFuncionalVariedads') as FormArray).value;
    for (let i = 0; i < arr_atributoFuncionalVariedads.length; i++) {
      if(arr_atributoFuncionalVariedads[i]){
        this.contratoForm.atributoFuncionalVariedads.push(this.atributoFuncionalVariedads[i]);
      }
    }

    this.contratoForm.tipoEstudios = this.model.get('tipoEstudios')?.value||0;
    


  


    this.actualizarArbol.emit(this.contratoForm);
  }

  changeTipoEstudio(e:Event):void{
    
    const value = (e.target as HTMLInputElement).value;

    this.contratoForm.tipoInformeOrdens = [];
    (this.model.get('tipoInformeOrdens') as FormArray).clear();

    this.serviceTipoEstudio.getId(+value).subscribe(x=>{
      this.tipoInformeOrdens = x.data.TipoInformeOrden;
      if(!x.data.TipoInformeOrden.length){
        this.alert.showAlert('Mensaje','El tipo de estudio no tiene asignado tipos de informes','warning');
        return;
      }
      
      this.contratoForm.tipoInformeOrdens = x.data.TipoInformeOrden;
      
      const arr = this.model.get('tipoInformeOrdens') as FormArray;
      for (let index = 0; index < x.data.TipoInformeOrden.length; index++) {
        const control = this.fb.control(true);
        arr.push(control);

       
      }
    })
  }

  actualizarEtiquetas(idCliente:number,idCategoria:number):void{
   // this.tipoEstudios = [TipoEstudioInit]
    this.serviceClienteAgrupacionZona.postIdCliente(idCliente).subscribe((x) => {
      this.zonas = x.data;
      this.contratoForm.zonas = [];

      const arr = this.model.get('zonas') as FormArray;
      arr.clear()
      for (let index = 0; index < x.data.length; index++) {
        const control = this.fb.control(true);
        arr.push(control);

        this.contratoForm.zonas.push(x.data[index]);
      }

    });

    this.serviceClienteAgrupacionCanal.postIdCliente(idCliente).subscribe((x) => {
      this.canals = x.data;
      this.contratoForm.canals = [];

      const arr = this.model.get('canals') as FormArray;
      arr.clear()
      for (let index = 0; index < x.data.length; index++) {
        const control = this.fb.control(true);
        arr.push(control);

        this.contratoForm.canals.push(x.data[index]);
      } 
 
    }); 

    this.serviceAtributoFuncionalVariedad.postIdClienteIdCategoria(idCliente, idCategoria).subscribe((x) => {

      this.atributoFuncionalVariedads = x.data;
      this.contratoForm.atributoFuncionalVariedads = [];

      const arr = this.model.get('atributoFuncionalVariedads') as FormArray;
      arr.clear()
      for (let index = 0; index < x.data.length; index++) {
        const control = this.fb.control(true);
        arr.push(control);

        this.contratoForm.atributoFuncionalVariedads.push(x.data[index]);
      }
    });
  }

}
