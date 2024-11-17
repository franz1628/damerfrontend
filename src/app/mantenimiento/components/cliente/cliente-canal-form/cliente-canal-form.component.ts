import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { Cliente, ClienteInit } from '../../../interface/cliente';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { catchError, forkJoin, lastValueFrom, throwError } from 'rxjs';
import { AlertService } from '../../../../shared/services/alert.service';
import { Canal } from '../../tablas/interfaces/canal.interface';
import { CanalService } from '../../tablas/service/canal.sevice';
import { AgrupacionCanalsService } from '../../../service/agrupacionCanals';
import { AgrupacionCanals } from '../../../interface/agrupacionCanals';
import { ClienteAgrupacionCanalService } from '../../../service/clienteAgrupacionCanal';
import { ClienteAgrupacionCanal } from '../../../interface/clienteAgrupacionCanal';

@Component({
  selector: 'app-cliente-canal-form',
  templateUrl: './cliente-canal-form.component.html'
})
export class ClienteCanalFormComponent {
  @Input()
  cliente: Cliente = ClienteInit

  selectIndex: number = -1
  agrupacionCanals : AgrupacionCanals[] = []
  
  showLoading: boolean = false;

  clienteAgrupacionCanal: ClienteAgrupacionCanal[] = [];

  models: FormGroup = this.fb.group({
    modelos: this.fb.array([]),
  });

  constructor(
    private service: ClienteAgrupacionCanalService,
    private serviceAgrupacionCanals : AgrupacionCanalsService,
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
        serviceAgrupacionCanals : this.serviceAgrupacionCanals.get(),
      }
    ).subscribe({
      next: value => {
        this.clienteAgrupacionCanal = value.service.data
        this.agrupacionCanals = value.serviceAgrupacionCanals.data

        this.clienteAgrupacionCanal.forEach(model => {
          const nuevoModelo = this.fb.group({
            id: [model.id],
            idAgrupacionCanal: [model.idAgrupacionCanal],
            idCliente: [model.idCliente],
          });
          this.modelosArray.push(nuevoModelo);
        }); 

        if (this.clienteAgrupacionCanal.length == 0) {
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
    const filas:ClienteAgrupacionCanal[] = this.modelosArray.value.slice(0,-1);
    const modelo:ClienteAgrupacionCanal = this.modelosArray.at(index).value;
    
    if(filas.find((x,key)=>x.idAgrupacionCanal == modelo.idAgrupacionCanal && key != index)){
      this.alert.showAlert("Advertencia","Esta agrupacion ya esta agregada","warning");
      return
    }

    this.alert.showAlertConfirm('Aviso', '¿Desea modificar?', 'warning', () => {
      const modelo = this.modelosArray.controls[index].getRawValue();
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
      idAgrupacionCanal: [0],

    });

    this.modelosArray.push(nuevoModelo);
  }

  async save(num: number): Promise<void> {
    const filas:ClienteAgrupacionCanal[] = this.modelosArray.value.slice(0,-1);
    const modelo:ClienteAgrupacionCanal = this.modelosArray.at(num).value;
    
    if(modelo.idAgrupacionCanal==0){
      this.alert.showAlert("Advertencia","Debe elegir una Agrupacion","warning");
      return
    }

    if(filas.find(x=>x.idAgrupacionCanal == modelo.idAgrupacionCanal)){
      this.alert.showAlert("Advertencia","Esa Agrupacion ya esta agregada","warning");
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
