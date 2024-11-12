import { Component, ElementRef, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import { AlertService } from '../../../../shared/services/alert.service';
import { Cliente, ClienteInit } from '../../../interface/cliente';
import { AbstractControl, FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { catchError, forkJoin, lastValueFrom } from 'rxjs';
import { ClienteAgrupacionCanal } from '../../../interface/clienteAgrupacionCanal';
import { Canal, CanalInit } from '../../tablas/interfaces/canal.interface';
import { ClienteAgrupacionCanalService } from '../../../service/clienteAgrupacionCanal';
import { AgrupacionCanalCanalService } from '../../../service/agrupacionCanalCanal';
import { CanalService } from '../../tablas/service/canal.sevice';
import { ClienteCanalService } from '../../../service/clienteCanal';

@Component({
  selector: 'app-cliente-canal-list',
  templateUrl: './cliente-canal-list.component.html'
})
export class ClienteCanalListComponent implements OnChanges {



  @Input() cliente: Cliente = ClienteInit
  @Output() selectClienteAgrupacionCanal: EventEmitter<ClienteAgrupacionCanal> = new EventEmitter()

  @ViewChild('botonCerrarModalAgrupacion') botonCerrarModalAgrupacion!: ElementRef

  selectIndex: number = -1
  canals: Canal[] = []

  showLoading: boolean = false;

  clienteCanals: ClienteAgrupacionCanal[] = [];
  canalsAgrupacionTotal: Canal[] = []
  canalsAgrupacion: Canal[] = []

  canalElegidaAgrupacion: Canal = CanalInit
  idClienteAgrupacionCanal: number = 0

  models: FormGroup = this.fb.group({
    modelos: this.fb.array([]),
  });

  nombreAgrupacionCanal: string = '';

  constructor(
    private service: ClienteAgrupacionCanalService,
    private serviceAgrupacionCanalCanal: AgrupacionCanalCanalService,
    private serviceCanal: CanalService,
    private serviceClienteCanal: ClienteCanalService,
    private fb: FormBuilder,
    private alert: AlertService,
  ) { }

  ngOnInit(): void {
    //this.loadModels();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['cliente']) {
      //this.loadModels(this.cliente.id);
    }
  }

  async loadModels(idCliente:number): Promise<void> {
    this.showLoading = true;
    (this.models.get('modelos') as FormArray).clear();

    forkJoin(
      {
        service: this.service.postIdCliente(idCliente),
        serviceCanal: this.serviceClienteCanal.postIdCliente(idCliente)
      }
    ).subscribe({
      next: value => {
        this.clienteCanals = value.service.data
        const clienteCanals = value.serviceCanal.data
        this.canalsAgrupacionTotal = [];

        this.modelosArray.clear()

        for (let i = 0; i < clienteCanals.length; i++) {
          this.canalsAgrupacionTotal.push(clienteCanals[i].Canal);
        }
        this.canalsAgrupacionTotal = [...new Set(this.canalsAgrupacionTotal)];

        this.clienteCanals.forEach(model => {
          let canals: string[] = []
          model.AgrupacionCanalCanal.map(t => canals.push(t.Canal.descripcion))

          const s_canals = canals.join(' , ')

          const nuevoModelo = this.fb.group({
            id: [model.id],
            nombre: [model.nombre],
            canals: [s_canals]
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
    this.serviceClienteCanal.postIdCliente(this.cliente.id).subscribe(x => {
      const clienteCanals = x.data
      this.canalsAgrupacionTotal = [];

      for (let i = 0; i < clienteCanals.length; i++) {
        this.canalsAgrupacionTotal.push(clienteCanals[i].Canal);
      }
      this.canalsAgrupacionTotal = [...new Set(this.canalsAgrupacionTotal)];
    })



    const valor = this.modelosArray.at(index)
    this.idClienteAgrupacionCanal = valor.value.id

    this.canalsAgrupacion = []
    this.nombreAgrupacionCanal = valor.value.nombre


    this.clienteCanals[index]?.AgrupacionCanalCanal.map(x => {
      this.canalsAgrupacion.push(x.Canal)
    })

    this.canalsAgrupacion = [...new Set(this.canalsAgrupacion)];


  }

  elegir(index: number) {
    const modelo = this.modelosArray.controls[index].getRawValue();
    this.selectIndex = index
    this.selectClienteAgrupacionCanal.emit(this.clienteCanals[index])
  }

  comboEligeCanalAgrupacion(e: Event): void {
    const idCanal = (e.target as HTMLInputElement).value

    const canal = this.canalsAgrupacionTotal.filter(x => x.id == parseInt(idCanal));

    this.canalElegidaAgrupacion = canal[0]
  }

  agregarCanalAgrupacion(): void {
    if (this.canalElegidaAgrupacion.id == 0) {
      this.alert.showAlert('Mensaje', 'Debe escoger una canal', 'warning')
    } else {
      this.canalsAgrupacion.push(this.canalElegidaAgrupacion)


    }
  }

  guardarCanalAgrupacion(): void {
    if (this.canalsAgrupacion.length == 0) {
      this.alert.showAlert('Mensaje', 'Debe ingresar al menos una Canal', 'warning')
      return
    }

    this.showLoading = true

    if (this.idClienteAgrupacionCanal == 0) { //Nueva Agrupacion de Canal
      this.service.addCanalsNuevo(this.cliente.id, this.canalsAgrupacion, this.nombreAgrupacionCanal).subscribe(x => {
        this.alert.showAlert('Mensaje', 'Agregado correctament', 'success')
        this.botonCerrarModalAgrupacion.nativeElement.click()
        this.loadModels(this.cliente.id)
        this.showLoading = false
      })
    } else {
      this.service.editCanals(this.idClienteAgrupacionCanal, this.canalsAgrupacion, this.nombreAgrupacionCanal).subscribe(x => {

        this.alert.showAlert('Mensaje', 'Modificado correctament', 'success')
        this.botonCerrarModalAgrupacion.nativeElement.click()
        this.loadModels(this.cliente.id)
        this.showLoading = false
      })
    }


  }


  add() {
    const nuevoModelo = this.fb.group({
      id: [0],
      nombre: [''],
      canals: ['']
    });

    this.modelosArray.push(nuevoModelo);
    this.idClienteAgrupacionCanal = 0 //Para uno nuevo
  }

  async save(num: number): Promise<void> {
    const modelo = this.modelosArray.at(num).value;
    this.showLoading = true;

    try {
      await lastValueFrom(this.service.add(modelo));
      this.alert.showAlert('Mensaje', 'Agregado correctamente', 'success');
      this.loadModels(modelo.idCliente);
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
        this.loadModels(modelo.idCliente);
        this.showLoading = false;
      } catch (error) {
        this.alert.showAlert('Error', 'Hubo un problema en el servidor', 'error');
        this.showLoading = false;
      }
    })


  }
}
