import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { Cliente, ClienteInit } from '../../../interface/cliente';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidFormService } from '../../../../shared/services/validForm.service';
import { RegexService } from '../../../../shared/services/regex.service';
import { catchError, forkJoin, lastValueFrom, throwError } from 'rxjs';
import { AlertService } from '../../../../shared/services/alert.service';
import { ClienteZonaService } from '../../../service/clienteZona';
import { ZonaService } from '../../tablas/service/zona.service';
import { ClienteZona } from '../../../interface/clienteZona';
import { Zona } from '../../tablas/interfaces/zona.interface';
import { AgrupacionZonas } from '../../../interface/agrupacionZonas';
import { AgrupacionZonasService } from '../../../service/agrupacionZonas';
import { ClienteAgrupacionZona } from '../../../interface/clienteAgrupacionZona';
import { ClienteAgrupacionZonaService } from '../../../service/clienteAgrupacionZona';

@Component({
  selector: 'app-cliente-zona-form',
  templateUrl: './cliente-zona-form.component.html' 
})
export class ClienteZonaFormComponent {
  @Input()
  cliente: Cliente = ClienteInit

  selectIndex: number = -1
  agrupacionZonas : AgrupacionZonas[] = []
  
  showLoading: boolean = false;

  clienteAgrupacionZona: ClienteAgrupacionZona[] = [];

  models: FormGroup = this.fb.group({
    modelos: this.fb.array([]),
  });

  constructor(
    private service: ClienteAgrupacionZonaService,
    private serviceAgrupacionZonas: AgrupacionZonasService,
    private fb: FormBuilder,
    private alert: AlertService
  ) { }

  ngOnInit(): void {

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['cliente']) {
      this.loadModels();

    }
  }

  loadModels(): void {
    this.showLoading = true;
    (this.models.get('modelos') as FormArray).clear();

    forkJoin(
      {
        service: this.service.postIdCliente(this.cliente.id),
        serviceAgrupacionZonas : this.serviceAgrupacionZonas.get()
      }
    ).subscribe({
      next: value => {
        this.clienteAgrupacionZona = value.service.data
        this.agrupacionZonas = value.serviceAgrupacionZonas.data

        this.clienteAgrupacionZona.forEach(model => {
          const nuevoModelo = this.fb.group({
            id: [model.id],
            idAgrupacionZona: [model.idAgrupacionZona],
            idCliente: [model.idCliente],
          });
          this.modelosArray.push(nuevoModelo);
        });

        if (this.clienteAgrupacionZona.length == 0) {
          this.add();
        }

        this.showLoading = false;
      }
    })

  }

  get getModel() {
    return this.cliente;
  }

  get modelosArray() {
    return this.models.get('modelos') as FormArray;
  }

  editModel(index: number) {
    const filas:ClienteAgrupacionZona[] = this.modelosArray.value.slice(0,-1);
    const modelo:ClienteAgrupacionZona = this.modelosArray.at(index).value;
    
    if(filas.find((x,key)=>x.idAgrupacionZona == modelo.idAgrupacionZona && key != index)){
      this.alert.showAlert("Advertencia","Esa Agrupacion ya esta agregada","warning");
      return
    }

    this.alert.showAlertConfirm('Aviso', '¿Desea modificar?', 'warning', () => {
      const modelo = this.modelosArray.controls[index].getRawValue();
      //this.atributoFuncionalVariedad = modelo;
      this.service.update(modelo.id, modelo).subscribe(x => {
        this.alert.showAlert('Mensaje', 'Guardado correctamente', 'success');
      });
    })

  }

  elegir(index: number) {
    const modelo = this.modelosArray.controls[index].getRawValue();
    this.selectIndex = index
  }


  add() {

    const nuevoModelo = this.fb.group({
      id: [0],
      idCliente: [this.cliente.id],
      idAgrupacionZona: [0],

    });

    this.modelosArray.push(nuevoModelo);
  }

  async save(num: number): Promise<void> {
    const filas:ClienteAgrupacionZona[] = this.modelosArray.value.slice(0,-1);
    const modelo:ClienteAgrupacionZona = this.modelosArray.at(num).value;

    if(modelo.idAgrupacionZona==0){
      this.alert.showAlert("Advertencia","Debe elegir una Agrupacion","warning");
      return
    }

    if(filas.find(x=>x.idAgrupacionZona == modelo.idAgrupacionZona)){
      this.alert.showAlert("Advertencia","Esa agrupacion ya esta agregada","warning");
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
