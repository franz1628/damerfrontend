import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ContratoDetalle, ContratoDetalleInit } from '../../../interface/contratoDetalle';
import { Zona, ZonaInit } from '../../tablas/interfaces/zona.interface';
import { Canal, CanalInit } from '../../tablas/interfaces/canal.interface';
import { TipoEstudio, TipoEstudioInit } from '../../../interface/tipoEstudio';
import { AtributoFuncionalVariedad, AtributoFuncionalVariedadInit } from '../../../interface/atributoFuncionalVariedad';
import { ContratoForm, ContratoFormInit } from '../../../interface/contratoForm';
import { TipoInformeOrden, TipoInformeOrdenInit } from '../../../interface/tipoInformeOrden';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ContratoService } from '../../../service/contrato';
import { ContratoDetalleService } from '../../../service/contratoDetalle';
import { ClienteCanal } from '../../../interface/clienteCanal';
import { ClienteZona } from '../../../interface/clienteZona';
import { Contrato, ContratoInit } from '../../../interface/contrato';
import { ClienteZonaService } from '../../../service/clienteZona';
import { ClienteCanalService } from '../../../service/clienteCanal';
import { TipoEstudioService } from '../../../service/tipoEstudio';
import { AtributoFuncionalVariedadService } from '../../../service/atributoFuncionalVariedad';
import { TipoInformeOrdenService } from '../../../service/tipoInformeOrden';
import { AtributoTecnicoNegocioInit } from '../../../interface/atributoTecnicoNegocio';
import { AlertService } from '../../../../shared/services/alert.service';
import { ContratoEtiquetasComponent } from '../contrato-etiquetas/contrato-etiquetas.component';


@Component({
  selector: 'app-contrato-edicion',
  templateUrl: './contrato-edicion.component.html'
})
export class ContratoEdicionComponent implements OnInit {
  @Output() guardarEmit: EventEmitter<ContratoDetalle[]> = new EventEmitter();
  @Input()
  contratoForm!: ContratoForm

  @ViewChild('contratoEtiquetas')
  contratoEtiquetas!: ContratoEtiquetasComponent;

  zonas_M: Zona[] = [];
  canals_M: Canal[] = [];
  tipoEstudios_M: TipoEstudio[] = [];
  atributoFuncionalVariedads_M: AtributoFuncionalVariedad[] = [];
  tipoInformeOrdens_M: TipoInformeOrden[] = [];

  idCliente:number=0;
  idCategoria:number=0;

  zonas: Zona[] = [];
  canals: Canal[] = [];
  tipoEstudios: TipoEstudio[] = [];
  atributoFuncionalVariedads: AtributoFuncionalVariedad[] = [];
  tipoInformeOrdens: TipoInformeOrden[] = [];

  zonasf!: FormGroup;
  model!: FormGroup;
  arr_detalles: ContratoDetalle[][][][][] = []
  contrato: Contrato = ContratoInit

  checkTipoEstudios: boolean[] = [];
  checkZonas: boolean[][] = [];
  checkCanals: boolean[][][] = [];
  checkTipoInformeOrdens: boolean[][][][] = [];


  constructor(
    private fb: FormBuilder,
    private serviceContrato: ContratoService,
    private servicieContratoDetalle: ContratoDetalleService,
    private serviceClienteZona: ClienteZonaService,
    private serviceClienteCanal: ClienteCanalService,
    private serviceTipoEstudio: TipoEstudioService,
    private serviceAtributoFuncionalVariedad: AtributoFuncionalVariedadService,
    private serviceTipoInformeOrden: TipoInformeOrdenService,
    private alert:AlertService
  ) {

  }

  ngOnInit(): void {

    this.serviceTipoEstudio.get().subscribe(x => {
      this.tipoEstudios_M = x.data;
    })

    this.serviceTipoInformeOrden.get().subscribe((x) => {
      this.tipoInformeOrdens_M = x.data;
    });

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

  get getCheckCanals(){
    return this.checkCanals
  }
  get getCheckZonas(){
    return this.checkZonas
  }

  actualizarEleccion(contratoForm:ContratoForm) {
   
    
    contratoForm.idCategoria=this.idCategoria;
    contratoForm.idCliente=this.idCliente;
    this.actualizarArbol(this.contrato,contratoForm);
  }

  actualizarArbol(
    contrato: Contrato,contratoForm:ContratoForm=ContratoFormInit): void {
    this.contrato = contrato;
    this.arr_detalles = [];
    this.checkTipoEstudios = [];
    this.checkZonas= [];
    this.checkCanals= [];
    this.checkTipoInformeOrdens= [];
  
    
    if(contratoForm.zonas.length==0){
     
      
      this.servicieContratoDetalle.getIdContrato(contrato.id).subscribe(x => {
        this.serviceClienteZona.postIdCliente(contrato.idCliente).subscribe(y => {
  
  
          const clienteZonas = y.data
          for (let id = 0; id < clienteZonas.length; id++) {
            this.zonas_M.push(clienteZonas[id].Zona);
          }
  
          this.serviceClienteCanal.postIdCliente(contrato.idCliente).subscribe(z => {
  
            this.contratoEtiquetas.actualizarEtiquetas(contrato.idCliente,contrato.idCategoria);
  
            const clienteCanals = z.data
            for (let id = 0; id < clienteCanals.length; id++) {
              this.canals_M.push(clienteCanals[id].Canal);
            }
  
            this.serviceAtributoFuncionalVariedad.postIdClienteIdCategoria(contrato.idCliente, contrato.idCategoria).subscribe(a => {
              const clienteAtributos = a.data
              for (let id = 0; id < clienteAtributos.length; id++) {
                this.atributoFuncionalVariedads_M.push(clienteAtributos[id]);
              }
              this.tipoEstudios= [];
              this.zonas= [];
              this.canals= [];
              this.tipoInformeOrdens= [];
              this.atributoFuncionalVariedads= [];
  
  
              for (let b = 0; b < x.data.length; b++) {
  
                const contratoDetalleData = x.data[b];
  
                if (!this.tipoEstudios.find(x => x.id == contratoDetalleData.idTipoEstudio)) {
                  this.tipoEstudios.push(this.tipoEstudios_M.find(x => x.id == contratoDetalleData.idTipoEstudio) || TipoEstudioInit)
                }
  
                if (!this.zonas.find(x => x.id == contratoDetalleData.idZona)) {
                  this.zonas.push(this.zonas_M.find(x => x.id == contratoDetalleData.idZona) || ZonaInit)
                }
  
                if (!this.canals.find(x => x.id == contratoDetalleData.idCanal)) {
                  this.canals.push(this.canals_M.find(x => x.id == contratoDetalleData.idCanal) || CanalInit)
                }
  
                if (!this.tipoInformeOrdens.find(x => x.id == contratoDetalleData.idTipoInforme)) {
                  this.tipoInformeOrdens.push(this.tipoInformeOrdens_M.find(x => x.id == contratoDetalleData.idTipoInforme) || TipoInformeOrdenInit)
                }
  
                if (!this.atributoFuncionalVariedads.find(x => x.id == contratoDetalleData.idAtributoFuncionalVariedad)) {
                  this.atributoFuncionalVariedads.push(this.atributoFuncionalVariedads_M.find(x => x.id == contratoDetalleData.idAtributoFuncionalVariedad) || AtributoFuncionalVariedadInit)
                }
              }
  
              const detalles: ContratoDetalle[][][][][] = []
              for (let index = 0; index < this.tipoEstudios.length; index++) {
                const arr_tipoEstudios: ContratoDetalle[][][][] = []
                if (!this.tipoEstudios[index]) continue;
                this.checkTipoEstudios[index] = true;
                this.checkZonas[index]=[];
                this.checkCanals[index]=[];
                this.checkTipoInformeOrdens[index]=[];
  
                for (let j = 0; j < this.zonas.length; j++) {
                  const arr_canals: ContratoDetalle[][][] = []
                  this.checkZonas[index][j] = false;
                  this.checkCanals[index][j] = []
                  this.checkTipoInformeOrdens[index][j] = []
  
                  if (!this.zonas[index]) continue;
                  for (let k = 0; k < this.canals.length; k++) {
                    const arr_tipoInforme: ContratoDetalle[][] = []
                    this.checkCanals[index][j][k]=false
                    this.checkTipoInformeOrdens[index][j][k]=[]
  
                    if (!this.canals[index]) continue;
                    for (let m = 0; m < this.tipoInformeOrdens.length; m++) {
                      const atri: ContratoDetalle[] = []
                      this.checkTipoInformeOrdens[index][j][k][m]=false
                    
                      if (!this.tipoInformeOrdens[index]) continue;
                      for (let q = 0; q < this.atributoFuncionalVariedads.length; q++) {
                        if (!this.atributoFuncionalVariedads[index]) continue;
  
                        const contratoDetalleSea: ContratoDetalle = x.data.find(o => o.idZona == this.zonas[j].id && o.idCanal == this.canals[k].id && o.idTipoInforme == this.tipoInformeOrdens[m].id && o.idTipoEstudio == this.tipoEstudios[index].id && o.idAtributoFuncionalVariedad == this.atributoFuncionalVariedads[q].id) || ContratoDetalleInit;
  
  
                        const control: ContratoDetalle = {
                          idTipoEstudio: this.tipoEstudios[index].id,
                          idZona: this.zonas[j].id,
                          idCanal: this.canals[k].id,
                          idTipoInforme: this.tipoInformeOrdens[m].id,
                          idAtributoFuncionalVariedad: this.atributoFuncionalVariedads[q].id,
                          estado: 1,
                          id: 0,
                          idContrato: 0,
                          valor: contratoDetalleSea?.valor || 1
                        };
                        
                        if(contratoDetalleSea?.valor==1) {
                          this.checkTipoInformeOrdens[index][j][k][m]=true
                          this.checkCanals[index][j][k]=true
                          this.checkZonas[index][j]=true
                        }
                        
  
                        atri.push(contratoDetalleSea);
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
  
            })
          })
        })
  
  
      })
    }else{
     
      
      this.zonas = contratoForm.zonas;
      this.canals = contratoForm.canals;
      this.atributoFuncionalVariedads = contratoForm.atributoFuncionalVariedads;
      this.tipoInformeOrdens = contratoForm.tipoInformeOrdens;


      const detalles: ContratoDetalle[][][][][] = []
    
      for (let index = 0; index < [contratoForm.tipoEstudios].length; index++) {
        const arr_tipoEstudios: ContratoDetalle[][][][] = []
        if(!contratoForm.tipoEstudios)continue;
        this.checkTipoEstudios[index] = true;
        this.checkZonas[index]=[];
        this.checkCanals[index]=[];
        this.checkTipoInformeOrdens[index]=[];
        for (let j = 0; j < contratoForm.zonas.length; j++) {
          const arr_canals: ContratoDetalle[][][] = []
          if(!contratoForm.zonas[j])continue;
          this.checkZonas[index][j] = true;
          this.checkCanals[index][j] = []
          this.checkTipoInformeOrdens[index][j] = []

          for (let k = 0; k < contratoForm.canals.length; k++) {
            const arr_tipoInforme: ContratoDetalle[][] = []
            if(!contratoForm.canals[k])continue;
            this.checkCanals[index][j][k]=true
            this.checkTipoInformeOrdens[index][j][k]=[]
        

            for (let z = 0; z < contratoForm.tipoInformeOrdens.length; z++) {
              const atri: ContratoDetalle[] = []
              if(!contratoForm.tipoInformeOrdens[z])continue;
              this.checkTipoInformeOrdens[index][j][k][z]=true
          

              for (let q = 0; q < contratoForm.atributoFuncionalVariedads.length; q++) {
                if(!contratoForm.atributoFuncionalVariedads[q])continue;
            

                const control: ContratoDetalle = {
                  idTipoEstudio: [contratoForm.tipoEstudios][index],
                  idZona: contratoForm.zonas[j].id,
                  idCanal: contratoForm.canals[k].id,
                  idTipoInforme: contratoForm.tipoInformeOrdens[z].id,
                  idAtributoFuncionalVariedad: contratoForm.atributoFuncionalVariedads[q].id,
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
    }

  }

  toggleCheckbox(item: ContratoDetalle, lugar:string) {
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


    const contratoDetalles: ContratoDetalle[] = [];

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
              contratoDetalles.push(contratoDetalleRow);

            })
          })
        })
      })
    });


    this.serviceContrato.addVersion(this.contrato.id).subscribe(x => {

      this.servicieContratoDetalle.borrarDetalle(this.contrato.id).subscribe(y => {
        contratoDetalles.forEach(y => y.idContrato = x.data.id);

        this.servicieContratoDetalle.addAll(contratoDetalles).subscribe(z => {
          this.alert.showAlert('Mensaje','Guardado correctamente','success');
          window.location.reload()

        });

      });
    });



  }
}
