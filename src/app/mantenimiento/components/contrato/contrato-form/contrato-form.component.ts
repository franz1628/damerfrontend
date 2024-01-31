import { Component, OnInit, ViewChild } from '@angular/core';
import { ValidFormService } from '../../../../shared/services/validForm.service';
import { FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ClienteService } from '../../../service/cliente';
import { Cliente, ClienteInit } from '../../../interface/cliente';
import { ZonaService } from '../../tablas/service/zona.service';
import { Zona, ZonaInit } from '../../tablas/interfaces/zona.interface';
import { Canal, CanalInit } from '../../tablas/interfaces/canal.interface';
import { CanalService } from '../../tablas/service/canal.sevice';
import { Categoria, CategoriaInit } from '../../variedades/interfaces/categoria.interface';
import { CategoriaService } from '../../variedades/services/categoria.service';
import { Frecuencia } from '../../../interface/frecuencia';
import { FrecuenciaService } from '../../../service/frecuencia';
import { ClienteCategoriaService } from '../../../service/clienteCategoria';
import { TipoEstudioService } from '../../../service/tipoEstudio';
import { TipoEstudio, TipoEstudioInit } from '../../../interface/tipoEstudio';
import { AtributoFuncionalVariedad, AtributoFuncionalVariedadInit } from '../../../interface/atributoFuncionalVariedad';
import { AtributoFuncionalVariedadService } from '../../../service/atributoFuncionalVariedad';
import { ClienteZonaService } from '../../../service/clienteZona';
import { ClienteCanalService } from '../../../service/clienteCanal';
import { TipoInformeOrdenService } from '../../../service/tipoInformeOrden';
import { TipoInformeOrden } from '../../../interface/tipoInformeOrden';
import { ContratoArbolComponent } from '../contrato-arbol/contrato-arbol.component';
import { ContratoForm } from '../../../interface/contratoForm';
import { ClienteZona } from '../../../interface/clienteZona';
import { ClienteCanal } from '../../../interface/clienteCanal';



@Component({
  selector: 'app-contrato-form',
  templateUrl: './contrato-form.component.html'
})

export class ContratoFormComponent implements OnInit {
  public model = this.fb.group({
    id: [0],
    tipoEstudios: this.fb.array<number>([]),
    zonas: this.fb.array<number>([]),
    canals: this.fb.array<number>([]),
    atributoFuncionalVariedads: this.fb.array<number>([]),
    tipoInformeOrdens: this.fb.array<number>([]),
    fechaInicial: [''],
    fechaFinal: [''],
    diaEntrega: [1],
    frecuencias: [0],
    extension: [0],
  });

  public cliente: Cliente = ClienteInit;
  public categoria: Categoria = CategoriaInit;
  @ViewChild('contratoArbolComp')
  contratoArbolComp!: ContratoArbolComponent;

  clientes: Cliente[] = [];
  zonas: ClienteZona[] = [];
  canals: ClienteCanal[] = [];
  categorias: Categoria[] = [];
  frecuencias: Frecuencia[] = [];
  tipoEstudios: TipoEstudio[] = [];
  atributoFuncionalVariedads: AtributoFuncionalVariedad[] = [];
  tipoInformeOrdens: TipoInformeOrden[] = [];

  constructor(
    private fb: FormBuilder,
    private validForm: ValidFormService,
    private serviceCliente: ClienteService,
    private serviceZona: ZonaService,
    private serviceCanal: CanalService,
    private serviceCategoria: CategoriaService,
    private serviceFrecuencia: FrecuenciaService,
    private serviceClienteCategoria: ClienteCategoriaService,
    private serviceClienteZona: ClienteZonaService,
    private serviceClienteCanal: ClienteCanalService,
    private serviceTipoEstudio: TipoEstudioService,
    private serviceAtributoFuncionalVariedad: AtributoFuncionalVariedadService,
    private serviceTipoInformeOrden: TipoInformeOrdenService

  ) {

  }

  ngOnInit(): void {

    this.serviceCliente.get().subscribe((x) => {
      this.clientes = x.data;
    });

    this.serviceFrecuencia.get().subscribe((x) => {
      this.frecuencias = x.data;
    });

    this.serviceTipoEstudio.get().subscribe((x) => {
      this.tipoEstudios = x.data;

      const arr = this.model.get('tipoEstudios') as FormArray;
      for (let index = 0; index < x.data.length; index++) {
        const control = this.fb.control(true);
        arr.push(control);
      }
    });
    this.serviceTipoInformeOrden.get().subscribe((x) => {
      this.tipoInformeOrdens = x.data;

      const arr = this.model.get('tipoInformeOrdens') as FormArray;
      for (let index = 0; index < x.data.length; index++) {
        const control = this.fb.control(true);
        arr.push(control);
      }
    });

  }

  get getZonas(): FormArray {
    return this.model.get('zonas') as FormArray;
  }

  get getCanals(): FormArray {
    return this.model.get('canals') as FormArray;
  }

  get getTipoEstudios(): FormArray {
    return this.model.get('tipoEstudios') as FormArray;
  }

  get getAtributoFuncionalVariedads(): FormArray {
    return this.model.get('atributoFuncionalVariedads') as FormArray;
  }

  get getTipoInformeOrdens(): FormArray {
    return this.model.get('tipoInformeOrdens') as FormArray;
  }



  get getModel(): ContratoForm {
    return this.model.value as ContratoForm;
  }

  changeCliente(event: Event) {

    const a = event.target as HTMLInputElement

    this.serviceCliente.postCodigo(parseInt(a.value)).subscribe(x => {

      this.cliente = x
    });


    this.serviceClienteCategoria.getCodCliente(parseInt(a.value)).subscribe(x => {
      let arr_categorias = [];

      for (let index = 0; index < x.data.length; index++) {
        const element = x.data[index];
        arr_categorias.push(element.Categoria)
      }

      this.categorias = arr_categorias;
    })

  }

  changeCategoria(event: Event) {
    const a = event.target as HTMLInputElement
    this.serviceCategoria.postCodigo(parseInt(a.value)).subscribe(x => {
      this.categoria = x || CategoriaInit;

      if (parseInt(a.value) != 0) {
        this.serviceAtributoFuncionalVariedad.getCodClienteCodCategoria(this.cliente.codigo, this.categoria.codigo).subscribe((x) => {

          this.atributoFuncionalVariedads = x.data;

          const arr = this.model.get('atributoFuncionalVariedads') as FormArray;
          for (let index = 0; index < x.data.length; index++) {
            const control = this.fb.control(true);
            arr.push(control);
          }
        });

        this.serviceClienteZona.getCodCliente(this.cliente.codigo).subscribe((x) => {
          this.zonas = x.data;
 
          const arr = this.model.get('zonas') as FormArray;
          for (let index = 0; index < x.data.length; index++) {
            const control = this.fb.control(true);
            arr.push(control);
          }

        });

        this.serviceClienteCanal.getCodCliente(this.cliente.codigo).subscribe((x) => {
          this.canals = x.data;

          const arr = this.model.get('canals') as FormArray;
          for (let index = 0; index < x.data.length; index++) {
            const control = this.fb.control(true);
            arr.push(control);
          }

        });
      }

    });

  }

  actualizarEleccion() {
  

    this.contratoArbolComp.actualizarArbol(this.model.value as ContratoForm,this.canals,this.zonas,this.atributoFuncionalVariedads,this.tipoEstudios,this.tipoInformeOrdens);
  }

  toggleCheckbox(codigo: number): void {



    /*let atributoFuncionalVariedadsArray = this.getModel.atributoFuncionalVariedads;

    const index = atributoFuncionalVariedadsArray.indexOf(codigo);

    if (index !== -1) {
      atributoFuncionalVariedadsArray.splice(index, 1);
    } else {
      atributoFuncionalVariedadsArray.push(codigo);
    }

    this.model.patchValue({ atributoFuncionalVariedads: atributoFuncionalVariedadsArray });*/

  }

  isValidField(field: string): boolean | null {
    return this.validForm.isValidField(field, this.model);
  }

  getFieldError(field: string): string | null {
    return this.validForm.getFieldError(field, this.model);
  }
}
