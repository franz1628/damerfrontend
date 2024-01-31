import { Component, Input, OnInit } from '@angular/core';
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

@Component({
  selector: 'app-contrato-arbol',
  templateUrl: './contrato-arbol.component.html'
})
export class ContratoArbolComponent implements OnInit{
  @Input()
  contratoForm! : ContratoForm

  zonas:Zona[] = [];
  canals:Canal[] = [];
  tipoEstudios:TipoEstudio[] = [];
  atributoFuncionalVariedads:AtributoFuncionalVariedad[] = [];
  tipoInformeOrdens:TipoInformeOrden[] = [];

  constructor(
    private serviceClienteZona : ClienteZonaService,
    private serviceClienteCanal : ClienteCanalService,
    private serviceTipoEstudio: TipoEstudioService,
    private serviceAtributoFuncionalVariedad: AtributoFuncionalVariedadService,
    private serviceTipoInformeOrden: TipoInformeOrdenService 
  ){

  }

  ngOnInit(): void {
    this.serviceTipoEstudio.get().subscribe((x)=>{
      this.tipoEstudios = x.data;
    });
    this.serviceTipoInformeOrden.get().subscribe((x)=>{
      this.tipoInformeOrdens = x.data;
    });
  }

  actualizarArbol(
    contrato:ContratoForm,
    canals:ClienteCanal[],
    zonas:ClienteZona[],
    atributoFuncionalVariedads:AtributoFuncionalVariedad[],
    tipoEstudios:TipoEstudio[],
    tipoInformeOrdens:TipoInformeOrden[]):void{
    
    this.canals = [];
    this.zonas = [];
    this.tipoEstudios = [];
    this.tipoInformeOrdens = [];
    this.atributoFuncionalVariedads = [];
    
    for (let index = 0; index < contrato.canals.length; index++) {
      const resp = contrato.canals[index];
      if(resp){
        this.canals.push(canals[index].Canal);
      }
    }

    for (let index = 0; index < contrato.zonas.length; index++) {
      const resp = contrato.zonas[index];
      if(resp){
        this.zonas.push(zonas[index].Zona);
      }
    }

    for (let index = 0; index < contrato.tipoEstudios.length; index++) {
      const resp = contrato.tipoEstudios[index];
      if(resp){
        this.tipoEstudios.push(tipoEstudios[index]);
      }
    }

    for (let index = 0; index < contrato.tipoInformeOrdens.length; index++) {
      const resp = contrato.tipoInformeOrdens[index];
      if(resp){
        this.tipoInformeOrdens.push(tipoInformeOrdens[index]);
      }
    }

    for (let index = 0; index < contrato.atributoFuncionalVariedads.length; index++) {
      const resp = contrato.atributoFuncionalVariedads[index];
      if(resp){
        this.atributoFuncionalVariedads.push(atributoFuncionalVariedads[index]);
      }
    }
    
    
    
  }
}
