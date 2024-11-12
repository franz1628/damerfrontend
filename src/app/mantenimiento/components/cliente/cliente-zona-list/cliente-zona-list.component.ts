import { Component, ElementRef, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import { AlertService } from '../../../../shared/services/alert.service';
import { Cliente, ClienteInit } from '../../../interface/cliente';
import { AbstractControl, FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { catchError, forkJoin, lastValueFrom } from 'rxjs';
import { ClienteAgrupacionZona } from '../../../interface/clienteAgrupacionZona';
import { Zona, ZonaInit } from '../../tablas/interfaces/zona.interface';
import { ClienteAgrupacionZonaService } from '../../../service/clienteAgrupacionZona';
import { AgrupacionZonaZonaService } from '../../../service/agrupacionZonaZona';
import { ZonaService } from '../../tablas/service/zona.service';
import { ClienteZonaService } from '../../../service/clienteZona';

@Component({
  selector: 'app-cliente-zona-list',
  templateUrl: './cliente-zona-list.component.html'
})
export class ClienteZonaListComponent implements OnChanges {



  @Input() cliente: Cliente = ClienteInit
  @Output() selectClienteAgrupacionZona: EventEmitter<ClienteAgrupacionZona> = new EventEmitter()

  @ViewChild('botonCerrarModalAgrupacion') botonCerrarModalAgrupacion!: ElementRef

  selectIndex: number = -1
  zonas: Zona[] = []

  showLoading: boolean = false;

  clienteZonas: ClienteAgrupacionZona[] = [];
  zonasAgrupacionTotal: Zona[] = []
  zonasAgrupacion: Zona[] = []

  zonaElegidaAgrupacion: Zona = ZonaInit
  idClienteAgrupacionZona: number = 0

  models: FormGroup = this.fb.group({
    modelos: this.fb.array([]),
  });

  nombreAgrupacionZona: string = '';

  constructor(
    private service: ClienteAgrupacionZonaService,
    private serviceAgrupacionZonaZona: AgrupacionZonaZonaService,
    private serviceZona: ZonaService,
    private serviceClienteZona: ClienteZonaService,
    private fb: FormBuilder,
    private alert: AlertService,
  ) { }

  ngOnInit(): void {
    //this.loadModels();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['cliente']) {
     // this.loadModels(this.cliente.id);
    }
  }

  async loadModels(idCliente:number): Promise<void> {
    this.showLoading = true;
    (this.models.get('modelos') as FormArray).clear();

    forkJoin(
      {
        service: this.service.postIdCliente(idCliente),
        serviceZona: this.serviceClienteZona.postIdCliente(idCliente)
      }
    ).subscribe({
      next: value => {
        this.clienteZonas = value.service.data
        const clienteZonas = value.serviceZona.data
        this.zonasAgrupacionTotal = [];

        this.modelosArray.clear()

        for (let i = 0; i < clienteZonas.length; i++) {
          this.zonasAgrupacionTotal.push(clienteZonas[i].Zona);
        }
        this.zonasAgrupacionTotal = [...new Set(this.zonasAgrupacionTotal)];

        this.clienteZonas.forEach(model => {
          let zonas: string[] = []
          model.AgrupacionZonaZona.map(t => zonas.push(t.Zona.descripcion))

          const s_zonas = zonas.join(' , ')

          const nuevoModelo = this.fb.group({
            id: [model.id],
            nombre: [model.nombre],
            zonas: [s_zonas]
          });

          this.modelosArray.push(nuevoModelo);
        });

        if (this.clienteZonas.length == 0) {
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
    this.serviceClienteZona.postIdCliente(this.cliente.id).subscribe(x => {
      const clienteZonas = x.data
      this.zonasAgrupacionTotal = [];

      for (let i = 0; i < clienteZonas.length; i++) {
        this.zonasAgrupacionTotal.push(clienteZonas[i].Zona);
      }
      this.zonasAgrupacionTotal = [...new Set(this.zonasAgrupacionTotal)];
    })



    const valor = this.modelosArray.at(index)
    this.idClienteAgrupacionZona = valor.value.id

    this.zonasAgrupacion = []
    this.nombreAgrupacionZona = valor.value.nombre


    this.clienteZonas[index]?.AgrupacionZonaZona.map(x => {
      this.zonasAgrupacion.push(x.Zona)
    })

    this.zonasAgrupacion = [...new Set(this.zonasAgrupacion)];


  }

  elegir(index: number) {
    const modelo = this.modelosArray.controls[index].getRawValue();
    this.selectIndex = index 
    this.selectClienteAgrupacionZona.emit(this.clienteZonas[index])
  }

  comboEligeZonaAgrupacion(e: Event): void {
    const idZona = (e.target as HTMLInputElement).value

    const zona = this.zonasAgrupacionTotal.filter(x => x.id == parseInt(idZona));

    this.zonaElegidaAgrupacion = zona[0]
  }

  agregarZonaAgrupacion(): void {
    if (this.zonaElegidaAgrupacion.id == 0) {
      this.alert.showAlert('Mensaje', 'Debe escoger una zona', 'warning')
    } else {
      this.zonasAgrupacion.push(this.zonaElegidaAgrupacion)


    }
  }

  guardarZonaAgrupacion(): void {
    if (this.zonasAgrupacion.length == 0) {
      this.alert.showAlert('Mensaje', 'Debe ingresar al menos una zona', 'warning')
      return
    }

    this.showLoading = true

    if (this.idClienteAgrupacionZona == 0) { //Nueva Agrupacion de Zona
      this.service.addZonasNuevo(this.cliente.id, this.zonasAgrupacion, this.nombreAgrupacionZona).subscribe(x => {
        this.alert.showAlert('Mensaje', 'Agregado correctament', 'success')
        this.botonCerrarModalAgrupacion.nativeElement.click()
        this.loadModels(this.cliente.id)
        this.showLoading = false
      })
    } else {
      this.service.editZonas(this.idClienteAgrupacionZona, this.zonasAgrupacion, this.nombreAgrupacionZona).subscribe(x => {

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
      zonas: ['']
    });

    this.modelosArray.push(nuevoModelo);
    this.idClienteAgrupacionZona = 0 //Para uno nuevo
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
