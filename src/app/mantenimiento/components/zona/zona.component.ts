import { Component, ViewChild } from '@angular/core';
import { Zona, ZonaInit } from '../tablas/interfaces/zona.interface';
import { ZonaFormComponent } from './zona-form/zona-form.component';
import { ZonaService } from '../tablas/service/zona.service';
import { Distrito } from '../tablas/ubigeo/interface/distrito.interface';
import { DistritoService } from '../tablas/ubigeo/service/distrito.service';
import { Departamento } from '../tablas/ubigeo/interface/departamento.interface';
import { Provincia } from '../tablas/ubigeo/interface/provincia.interface';
import { DepartamentoService } from '../tablas/ubigeo/service/departamento.service';
import { ProvinciaService } from '../tablas/ubigeo/service/provincia.service';
import { AlertService } from '../../../shared/services/alert.service';

@Component({
  selector: 'app-zona',
  templateUrl: './zona.component.html'
})
export class ZonaComponent {




  modal: boolean = false
  models: Zona[] = [];
  showLoading: boolean = false;
  title: string = 'Zona';

  modelEdit: Zona = ZonaInit;
  model:Zona= ZonaInit

  departamentos:Departamento[] = [];
  provincias:Provincia[] = [];
  distritos: Distrito[] = [];

  idDepartamentoDistrito:number=0
  idProvinciaDistrito:number=0
  idDistritoDistrito:number=0

  @ViewChild('zonaForm')
  zonaForm!: ZonaFormComponent;
  distritosZonas:Distrito[] = []

  constructor(
    private service: ZonaService,
    private serviceDistrito : DistritoService,
    private serviceDepartamento:DepartamentoService,
    private serviceProvincia:ProvinciaService,
    private alert:AlertService
    
    ) {
  }

  ngOnInit(): void {
    this.get();

    this.serviceDistrito.get().subscribe(response => { this.showLoading = false; this.distritos = response.data });
    this.serviceDepartamento.get().subscribe(response => { this.showLoading = false; this.departamentos = response.data });
    this.serviceProvincia.get().subscribe(response => { this.showLoading = false; this.provincias = response.data });
  }

  get(): void {
    this.showLoading = true
    this.service.get().subscribe(response => { this.showLoading = false; this.models = response.data });
  }

  get getProvincias(){
    return this.provincias.filter(x=>x.idDepartamento==this.idDepartamentoDistrito);
  }

  get getDistritos(){
    return this.distritos.filter(x=>x.idProvincia==this.idProvinciaDistrito);
  }

  eligeDepartamento(e: Event) {
    const valor = (e.target as HTMLInputElement).value
    this.idDepartamentoDistrito = parseInt(valor)
    this.idProvinciaDistrito=0
    this.idDistritoDistrito=0
  }

  eligeProvincia(e: Event) {
    const valor = (e.target as HTMLInputElement).value
    this.idProvinciaDistrito = parseInt(valor)
    this.idDistritoDistrito=0
  }

  eligeDistrito(e: Event) {
    const valor = (e.target as HTMLInputElement).value
    this.idDistritoDistrito = parseInt(valor)
  }

  editModel(model: Zona) {
    this.zonaForm.setModel(model)
  }

  eligeModel(model: Zona) {
    this.model = model

    this.serviceDistrito.postByZona(model).subscribe(x=>{
      this.distritosZonas = x.data
      
      
      
    })
  }

  eliminarDistritoZona(distrito: Distrito,zona: Zona) {
    this.alert.showAlertConfirm('Mensaje','Desea sacar el distrito de la zona','warning',()=>{
      distrito.idZona=0
  
      this.serviceDistrito.update(distrito.id,distrito).subscribe(x=>{
        this.alert.showAlert('Mensaje','Eliminado correctamente','success')     
        this.eligeModel(this.model)
      })
    })
    
  }

  agregarDistrito() {
    if(this.idDistritoDistrito==0){
      this.alert.showAlert('Mensaje','Debe elegir un distrito','warning')    
      return 
    }

    this.serviceDistrito.getId(this.idDistritoDistrito).subscribe(z=>{

      
      if(z.data.idZona==0){
        let miDistrito = this.distritos.filter(x=>x.id == this.idDistritoDistrito)[0]
        miDistrito.idZona = this.model.id
    
        this.serviceDistrito.update(this.idDistritoDistrito,miDistrito).subscribe(x=>{
          this.alert.showAlert('Mensaje','Agregado correctamente','success')     
          this.eligeModel(this.model)
        })
      }else{
        this.alert.showAlert('Mensaje','Este distrito ya tiene una zona asignada','warning')     
      }
    })
    
   
  }

}
