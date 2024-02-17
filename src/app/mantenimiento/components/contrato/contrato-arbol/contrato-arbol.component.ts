import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Zona } from '../../tablas/interfaces/zona.interface';
import { Canal } from '../../tablas/interfaces/canal.interface';
import { TipoEstudio } from '../../../interface/tipoEstudio';
import { AtributoFuncionalVariedad } from '../../../interface/atributoFuncionalVariedad';
import { TipoInformeOrden } from '../../../interface/tipoInformeOrden';
import { ClienteZonaService } from '../../../service/clienteZona';
import { ClienteCanalService } from '../../../service/clienteCanal';
import { TipoEstudioService } from '../../../service/tipoEstudio';
import { AtributoFuncionalVariedadService } from '../../../service/atributoFuncionalVariedad';
import { TipoInformeOrdenService } from '../../../service/tipoInformeOrden';
import { ClienteCanal } from '../../../interface/clienteCanal';
import { ClienteZona } from '../../../interface/clienteZona';
import { ContratoForm } from '../../../interface/contratoForm';
import { Form, FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ContratoService } from '../../../service/contrato';
import { Contrato, ContratoInit } from '../../../interface/contrato';
import { ContratoDetalleService } from '../../../service/contratoDetalle';
import { ContratoDetalle } from '../../../interface/contratoDetalle';

@Component({
  selector: 'app-contrato-arbol',
  templateUrl: './contrato-arbol.component.html'
})
export class ContratoArbolComponent implements OnInit {
  @Output() guardarEmit: EventEmitter<ContratoDetalle[]> = new EventEmitter();
  @Input()
  contratoForm!: ContratoForm

  zonas: Zona[] = [];
  canals: Canal[] = [];
  tipoEstudios: TipoEstudio[] = [];
  atributoFuncionalVariedads: AtributoFuncionalVariedad[] = [];
  tipoInformeOrdens: TipoInformeOrden[] = [];

  zonasf!: FormGroup;
  model!: FormGroup;
  arr_detalles: ContratoDetalle[][][][][] = []

  checkTipoEstudios: boolean[] = [];
  checkZonas: boolean[][] = [];
  checkCanals: boolean[][][] = [];
  checkTipoInformeOrdens: boolean[][][][] = [];
  


  constructor(
    private fb: FormBuilder,
    private service: ContratoService,
    private servicioContratoDetalle: ContratoDetalleService
  ) {

  }

  ngOnInit(): void {
    this.model = this.fb.group({
      atributoFuncionalVariedads: this.fb.array
    });
  }

  changeTipoEstudio(event:Event,lugar:string){
    const check = event.target as HTMLInputElement;
    const arrUbi = lugar.split("-");
    const arrUbiEnt = arrUbi.map(numero => parseInt(numero));
    const cDetalle:ContratoDetalle[][][][] = this.arr_detalles[arrUbiEnt[0]];

    this.checkTipoEstudios[arrUbiEnt[0]] = check.checked?true:false;

    for (let i = 0; i < cDetalle.length; i++) {
      for (let j = 0; j < cDetalle[i].length; j++){
        for (let k = 0; k < cDetalle[i][j].length; k++){
          for (let z = 0; z < cDetalle[i][j][k].length; z++){
            cDetalle[i][j][k][z].valor = check.checked?1:0;
          } 
        }
      }
    }

    for(let a=0;a<this.checkZonas[arrUbiEnt[0]].length;a++){
      this.checkZonas[arrUbiEnt[0]][a] = check.checked?true:false;
      for(let i=0;i<this.checkCanals[arrUbiEnt[0]][a].length;i++){
        this.checkCanals[arrUbiEnt[0]][a][i] = check.checked?true:false;
  
        for(let k=0;k<this.checkTipoInformeOrdens[arrUbiEnt[0]][a][i].length;k++){
          this.checkTipoInformeOrdens[arrUbiEnt[0]][a][i][k] = check.checked?true:false;
        }
      }
    }
  }

  changeZona(event:Event,lugar:string){
    const check = event.target as HTMLInputElement;
    const arrUbi = lugar.split("-");
    const arrUbiEnt = arrUbi.map(numero => parseInt(numero));
    const cDetalle:ContratoDetalle[][][] = this.arr_detalles[arrUbiEnt[0]][arrUbiEnt[1]];

    this.checkZonas[arrUbiEnt[0]][arrUbiEnt[1]] = check.checked?true:false;

    for (let i = 0; i < cDetalle.length; i++) {
      for (let j = 0; j < cDetalle[i].length; j++){
        for (let k = 0; k < cDetalle[i][j].length; k++){
          cDetalle[i][j][k].valor = check.checked?1:0;
        }
      }
    }

    for(let i=0;i<this.checkCanals[arrUbiEnt[0]][arrUbiEnt[1]].length;i++){
      this.checkCanals[arrUbiEnt[0]][arrUbiEnt[1]][i] = check.checked?true:false;

      for(let k=0;k<this.checkTipoInformeOrdens[arrUbiEnt[0]][arrUbiEnt[1]][i].length;k++){
        this.checkTipoInformeOrdens[arrUbiEnt[0]][arrUbiEnt[1]][i][k] = check.checked?true:false;
      }
    }

    if(check.checked){
      this.checkTipoEstudios[arrUbiEnt[0]] = true;
    }
  }

  changeCanal(event:Event,lugar:string){
    const check = event.target as HTMLInputElement;
    const arrUbi = lugar.split("-");
    const arrUbiEnt = arrUbi.map(numero => parseInt(numero));
    const cDetalle:ContratoDetalle[][] = this.arr_detalles[arrUbiEnt[0]][arrUbiEnt[1]][arrUbiEnt[2]];

    this.checkCanals[arrUbiEnt[0]][arrUbiEnt[1]][arrUbiEnt[2]] = check.checked?true:false;

    for (let i = 0; i < cDetalle.length; i++) {
      for (let j = 0; j < cDetalle[i].length; j++){
        cDetalle[i][j].valor = check.checked?1:0;
      }
    }

    for(let i=0;i<this.checkTipoInformeOrdens[arrUbiEnt[0]][arrUbiEnt[1]][arrUbiEnt[2]].length;i++){
      this.checkTipoInformeOrdens[arrUbiEnt[0]][arrUbiEnt[1]][arrUbiEnt[2]][i] = check.checked?true:false;
    }

    if(check.checked){
      this.checkTipoEstudios[arrUbiEnt[0]] = true;
      this.checkZonas[arrUbiEnt[0]][arrUbiEnt[1]] = true;
    }
  }

  changeTipoInformeOrden(event:Event,lugar:string){
    const check = event.target as HTMLInputElement;
    const arrUbi = lugar.split("-");
    const arrUbiEnt = arrUbi.map(numero => parseInt(numero));
    const cDetalle:ContratoDetalle[] = this.arr_detalles[arrUbiEnt[0]][arrUbiEnt[1]][arrUbiEnt[2]][arrUbiEnt[3]];
    this.checkTipoInformeOrdens[arrUbiEnt[0]][arrUbiEnt[1]][arrUbiEnt[2]][arrUbiEnt[3]] = check.checked?true:false;

    for (let i = 0; i < cDetalle.length; i++) {
      cDetalle[i].valor = check.checked?1:0;
    }

    if(check.checked){
      this.checkTipoEstudios[arrUbiEnt[0]] = true;
      this.checkZonas[arrUbiEnt[0]][arrUbiEnt[1]] = true;
      this.checkCanals[arrUbiEnt[0]][arrUbiEnt[1]][arrUbiEnt[2]] = true;
     // this.checkTipoInformeOrdens[arrUbiEnt[0]][arrUbiEnt[1]][arrUbiEnt[2]][arrUbiEnt[3]] = true;
    }
  }

  actualizarArbol(
    contrato: ContratoForm,
    canals: ClienteCanal[],
    zonas: ClienteZona[],
    atributoFuncionalVariedads: AtributoFuncionalVariedad[],
    tipoEstudios: TipoEstudio[],
    tipoInformeOrdens: TipoInformeOrden[]): void {

    this.canals = [];
    this.zonas = [];
    this.tipoEstudios = [];
    this.tipoInformeOrdens = [];
    this.atributoFuncionalVariedads = [];


    const detalles: ContratoDetalle[][][][][] = []
    for (let index = 0; index < [contrato.tipoEstudio].length; index++) {
      const arr_tipoEstudios: ContratoDetalle[][][][] = []
      if(!contrato.tipoEstudio)continue;
      this.checkTipoEstudios[index] = true;
      this.checkZonas[index]=[];
      this.checkCanals[index]=[];
      this.checkTipoInformeOrdens[index]=[];
      for (let j = 0; j < contrato.zonas.length; j++) {
        const arr_canals: ContratoDetalle[][][] = []
        if(!contrato.zonas[j])continue;
        this.checkZonas[index][j] = true;
        this.checkCanals[index][j] = []
        this.checkTipoInformeOrdens[index][j] = []

        for (let k = 0; k < contrato.canals.length; k++) {
          const arr_tipoInforme: ContratoDetalle[][] = []
          if(!contrato.canals[k])continue;
          this.checkCanals[index][j][k]=true
          this.checkTipoInformeOrdens[index][j][k]=[]
       

          for (let z = 0; z < contrato.tipoInformeOrdens.length; z++) {
            const atri: ContratoDetalle[] = []
            if(!contrato.tipoInformeOrdens[z])continue;
            this.checkTipoInformeOrdens[index][j][k][z]=true
         

            for (let q = 0; q < contrato.atributoFuncionalVariedads.length; q++) {
              const resp = contrato.atributoFuncionalVariedads[q];
              if(!contrato.atributoFuncionalVariedads[q])continue;
           

              const control: ContratoDetalle = {
                idTipoEstudio: tipoEstudios[index].id,
                idZona: zonas[j].Zona.id,
                idCanal: canals[k].Canal.id,
                idTipoInforme: tipoInformeOrdens[z].id,
                idAtributoFuncionalVariedad: atributoFuncionalVariedads[q].id,
                estado: 1,
                id: 0,
                idContrato: 0,
                valor: 1
              };
              atri.push(control);
            }
            arr_tipoInforme.push(atri);
          }
          arr_canals.push(arr_tipoInforme)
        }
        arr_tipoEstudios.push(arr_canals)
      }
      detalles.push(arr_tipoEstudios);
    }

    this.arr_detalles = detalles


    for (let index = 0; index < [contrato.tipoEstudio].length; index++) {
      const resp = contrato.tipoEstudio;

      this.tipoEstudios.push(tipoEstudios[index]);

    }

    for (let index = 0; index < contrato.canals.length; index++) {
      const resp = contrato.canals[index];

      this.canals.push(canals[index].Canal);

    }


    for (let index = 0; index < contrato.zonas.length; index++) {
      const resp = contrato.zonas[index];

      this.zonas.push(zonas[index].Zona);

    }

    for (let index = 0; index < contrato.tipoInformeOrdens.length; index++) {
      const resp = contrato.tipoInformeOrdens[index];

      this.tipoInformeOrdens.push(tipoInformeOrdens[index]);

    }

    for (let index = 0; index < contrato.atributoFuncionalVariedads.length; index++) {
      const resp = contrato.atributoFuncionalVariedads[index];

      this.atributoFuncionalVariedads.push(atributoFuncionalVariedads[index]);

    }
  }

  toggleCheckbox(item: ContratoDetalle,lugar:string) {
    const arrUbi = lugar.split("-");
    const arrUbiEnt = arrUbi.map(numero => parseInt(numero));

    if(item.valor==0){//Pintando a los padres
      this.checkTipoEstudios[arrUbiEnt[0]] = true;
      this.checkZonas[arrUbiEnt[0]][arrUbiEnt[1]] = true;
      this.checkCanals[arrUbiEnt[0]][arrUbiEnt[1]][arrUbiEnt[2]] = true;
      this.checkTipoInformeOrdens[arrUbiEnt[0]][arrUbiEnt[1]][arrUbiEnt[2]][arrUbiEnt[3]] = true;
    }

    item.valor = item.valor == 0 ? 1 : 0;

 
  }

  get getTipoEstudios(): FormArray<FormArray<FormArray<FormArray<FormArray>>>> {
    return this.model.get('tipoEstudios') as FormArray<FormArray<FormArray>>;
  }

  getZonas(index: number) {
    return this.getTipoEstudios.at(index) as FormArray;
  }

  getCanals(index: number, index2: number) {
    return (this.getTipoEstudios.at(index) as FormArray).at(index2) as FormArray;
  }

  getTipoInformes(index: number, index2: number, index3: number) {
    return ((this.getTipoEstudios.at(index) as FormArray).at(index2) as FormArray).at(index3) as FormArray;
  }

  get getAtributoFuncionalVariedads(): FormArray<FormArray> {
    return this.model.get('atributoFuncionalVariedads') as FormArray;
    // return (((this.getTipoEstudios.at(index) as FormArray).at(index2) as FormArray).at(index3) as FormArray).at(index4) as FormArray;
  }

  get getModel() {
    return this.model
  }

  guardar() {
    /* console.log(this.arr_detalles);
      return;
  */


      // const contrato:Contrato = {
      //   id:0,
      //   idCliente:1,
      //   idCategoria:1,
      //   diaEntrega:15,
      //   extension:1,
      //   fechaInicio:'2024-01-01',
      //   fechaFin:'2024-12-31',
      //   idFrecuencia:1,
      //   shot:1,
      //   estado:1 
      // };

    const contratoDetalle: ContratoDetalle[] = [];


    this.arr_detalles.forEach(tipoEstudio => {
      tipoEstudio.forEach(zona => {
        zona.forEach(canal => {
          canal.forEach(tipoInformeOrden => {
            tipoInformeOrden.forEach(contrato => {

              const contratoDetalleRow: ContratoDetalle = {
                id: 0,
                idContrato: 0,
                idTipoEstudio: contrato.idTipoEstudio,
                idZona: contrato.idZona,
                idCanal: contrato.idCanal,
                idTipoInforme: contrato.idTipoInforme,
                idAtributoFuncionalVariedad: contrato.idAtributoFuncionalVariedad,
                valor: contrato.valor,
                estado: 1
              }
              contratoDetalle.push(contratoDetalleRow);

              // this.servicioContratoDetalle.add(contratoDetalle).subscribe(x=>{
              //   console.log('Correcto');

              // })
            })
          })
        })
      })
    });

    this.guardarEmit.emit(contratoDetalle);





  }
}
