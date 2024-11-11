import { Component, ElementRef, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import { ClienteCategoria } from '../../../interface/clienteCategoria';
import { ClienteCategoriaService } from '../../../service/clienteCategoria';
import { AlertService } from '../../../../shared/services/alert.service';
import { Cliente, ClienteInit } from '../../../interface/cliente';
import { Categoria, CategoriaInit } from '../../variedades/interfaces/categoria.interface';
import { AbstractControl, FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { AgrupacionCategoriaCategoriaService } from '../../../service/agrupacionCategoriaCategoria';
import { catchError, forkJoin, lastValueFrom } from 'rxjs';
import { ClienteAgrupacionCategoria } from '../../../interface/clienteAgrupacionCategoria';
import { ClienteAgrupacionCategoriaService } from '../../../service/clienteAgrupacionCategoria';
import { CategoriaService } from '../../variedades/services/categoria.service';

@Component({
  selector: 'app-cliente-categoria-list',
  templateUrl: './cliente-categoria-list.component.html'
})
export class ClienteCategoriaListComponent implements OnChanges {



  @Input() cliente: Cliente = ClienteInit
  @Output() selectClienteAgrupacionCategoria: EventEmitter<ClienteAgrupacionCategoria> = new EventEmitter()

  @ViewChild('botonCerrarModalAgrupacion') botonCerrarModalAgrupacion!: ElementRef

  selectIndex: number = -1
  categorias: Categoria[] = []

  showLoading: boolean = false;

  clienteCategorias: ClienteAgrupacionCategoria[] = [];
  categoriasAgrupacionTotal: Categoria[] = []
  categoriasAgrupacion: Categoria[] = []

  categoriaElegidaAgrupacion: Categoria = CategoriaInit
  idClienteAgrupacionCategoria: number = 0

  models: FormGroup = this.fb.group({
    modelos: this.fb.array([]),
  });

  nombreAgrupacionCategoria: string = '';

  constructor(
    private service: ClienteAgrupacionCategoriaService,
    private serviceAgrupacionCategoriaCategoria: AgrupacionCategoriaCategoriaService,
    private serviceCategoria: CategoriaService,
    private serviceClienteCategoria: ClienteCategoriaService,
    private fb: FormBuilder,
    private alert: AlertService,
  ) { }

  ngOnInit(): void {
    //this.loadModels();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['cliente']) {
      this.loadModels(this.cliente.id);
    }
  }

  async loadModels(idCliente:number): Promise<void> {
    this.showLoading = true;
    (this.models.get('modelos') as FormArray).clear();

    forkJoin(
      {
        service: this.service.postIdCliente(idCliente),
        serviceCategoria: this.serviceClienteCategoria.postIdCliente(idCliente)
      }
    ).subscribe({
      next: value => {
        this.clienteCategorias = value.service.data
        const clienteCategorias = value.serviceCategoria.data
        this.categoriasAgrupacionTotal = [];

        this.modelosArray.clear()

        for (let i = 0; i < clienteCategorias.length; i++) {
          this.categoriasAgrupacionTotal.push(clienteCategorias[i].Categoria);
          //const element = clienteCategorias[i];

        }
        this.categoriasAgrupacionTotal = [...new Set(this.categoriasAgrupacionTotal)];

        // this.categoriasAgrupacionTotal = value.serviceCategoria.data

        this.clienteCategorias.forEach(model => {
          let categorias: string[] = []
          model.AgrupacionCategoriaCategoria.map(t => categorias.push(t.Categoria.descripcion))

          const s_categorias = categorias.join(' , ')

          const nuevoModelo = this.fb.group({
            id: [model.id],
            nombre: [model.nombre],
            categorias: [s_categorias]
          });

          this.modelosArray.push(nuevoModelo);
        });

        if (this.clienteCategorias.length == 0) {
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
    this.serviceClienteCategoria.postIdCliente(this.cliente.id).subscribe(x => {
      const clienteCategorias = x.data
      this.categoriasAgrupacionTotal = [];

      for (let i = 0; i < clienteCategorias.length; i++) {
        this.categoriasAgrupacionTotal.push(clienteCategorias[i].Categoria);
      }
      this.categoriasAgrupacionTotal = [...new Set(this.categoriasAgrupacionTotal)];
    })



    const valor = this.modelosArray.at(index)
    this.idClienteAgrupacionCategoria = valor.value.id

    this.categoriasAgrupacion = []
    this.nombreAgrupacionCategoria = valor.value.nombre


    this.clienteCategorias[index]?.AgrupacionCategoriaCategoria.map(x => {
      this.categoriasAgrupacion.push(x.Categoria)
    })

    this.categoriasAgrupacion = [...new Set(this.categoriasAgrupacion)];


  }

  elegir(index: number) {
    const modelo = this.modelosArray.controls[index].getRawValue();
    this.selectIndex = index
    this.selectClienteAgrupacionCategoria.emit(this.clienteCategorias[index])
  }

  comboEligeCategoriaAgrupacion(e: Event): void {
    const idCategoria = (e.target as HTMLInputElement).value

    const categoria = this.categoriasAgrupacionTotal.filter(x => x.id == parseInt(idCategoria));

    this.categoriaElegidaAgrupacion = categoria[0]
  }

  agregarCategoriaAgrupacion(): void {
    if (this.categoriaElegidaAgrupacion.id == 0) {
      this.alert.showAlert('Mensaje', 'Debe escoger una categoria', 'warning')
    } else {
      this.categoriasAgrupacion.push(this.categoriaElegidaAgrupacion)


    }
  }

  guardarCategoriaAgrupacion(): void {
    if (this.categoriasAgrupacion.length == 0) {
      this.alert.showAlert('Mensaje', 'Debe ingresar al menos una caegoria', 'warning')
      return
    }

    this.showLoading = true

    if (this.idClienteAgrupacionCategoria == 0) { //Nueva Agrupacion de categoria
      this.service.addCategoriasNuevo(this.cliente.id, this.categoriasAgrupacion, this.nombreAgrupacionCategoria).subscribe(x => {
        this.alert.showAlert('Mensaje', 'Agregado correctament', 'success')
        this.botonCerrarModalAgrupacion.nativeElement.click()
        this.loadModels(this.cliente.id)
        this.showLoading = false
      })
    } else {
      this.service.editCategorias(this.idClienteAgrupacionCategoria, this.categoriasAgrupacion, this.nombreAgrupacionCategoria).subscribe(x => {

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
      categorias: ['']
    });

    this.modelosArray.push(nuevoModelo);
    this.idClienteAgrupacionCategoria = 0 //Para uno nuevo
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
