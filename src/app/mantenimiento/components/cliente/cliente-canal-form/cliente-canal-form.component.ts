import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { Cliente, ClienteInit } from '../../../interface/cliente';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidFormService } from '../../../../shared/services/validForm.service';
import { RegexService } from '../../../../shared/services/regex.service';
import { catchError, forkJoin, lastValueFrom, throwError } from 'rxjs';
import { AlertService } from '../../../../shared/services/alert.service';
import { Canal } from '../../tablas/interfaces/canal.interface';
import { ClienteCanal } from '../../../interface/clienteCanal';
import { ClienteCanalService } from '../../../service/clienteCanal';
import { CanalService } from '../../tablas/service/canal.sevice';

@Component({
  selector: 'app-cliente-canal-form',
  templateUrl: './cliente-canal-form.component.html' 
})
export class ClienteCanalFormComponent {
  @Input()
  cliente: Cliente = ClienteInit

  selectIndex: number = -1
  canals : Canal[] = []
  
  showLoading: boolean = false;

  clienteCanals: ClienteCanal[] = [];

  models: FormGroup = this.fb.group({
    modelos: this.fb.array([]),
  });

  constructor(
    private service: ClienteCanalService,
    private serviceCanal: CanalService,
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
        serviceCanal : this.serviceCanal.get()
      }
    ).subscribe({
      next: value => {
        this.clienteCanals = value.service.data
        this.canals = value.serviceCanal.data

        this.clienteCanals.forEach(model => {
          const nuevoModelo = this.fb.group({
            id: [model.id],
            idCanal: [model.idCanal],
            idCliente: [model.idCliente],
          });
          this.modelosArray.push(nuevoModelo);
        });

        if (this.clienteCanals.length == 0) {
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
    const filas:ClienteCanal[] = this.modelosArray.value.slice(0,-1);
    const modelo:ClienteCanal = this.modelosArray.at(index).value;
    
    if(filas.find(x=>x.idCanal == modelo.idCanal)){
      this.alert.showAlert("Advertencia","Esa Canal ya esta agregada","warning");
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
      idCanal: [0],

    });

    this.modelosArray.push(nuevoModelo);
  }

  async save(num: number): Promise<void> {
    const filas:ClienteCanal[] = this.modelosArray.value.slice(0,-1);
    const modelo:ClienteCanal = this.modelosArray.at(num).value;

    if(modelo.idCanal==0){
      this.alert.showAlert("Advertencia","Debe elegir una Canal","warning");
      return
    }

    if(filas.find(x=>x.idCanal == modelo.idCanal)){
      this.alert.showAlert("Advertencia","Ese Canal ya esta agregada","warning");
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
