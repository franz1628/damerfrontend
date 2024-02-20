import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ValidFormService } from '../../../../shared/services/validForm.service';
import { FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ClienteService } from '../../../service/cliente';
import { Cliente, ClienteInit } from '../../../interface/cliente';
import { ZonaService } from '../../tablas/service/zona.service';
import { CanalService } from '../../tablas/service/canal.sevice';
import { Categoria, CategoriaInit } from '../../variedades/interfaces/categoria.interface';
import { CategoriaService } from '../../variedades/services/categoria.service';
import { Frecuencia, FrecuenciaInit } from '../../../interface/frecuencia';
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
import { ContratoForm, ContratoFormInit } from '../../../interface/contratoForm';
import { ClienteZona } from '../../../interface/clienteZona';
import { ClienteCanal } from '../../../interface/clienteCanal';
import { CategoriaUnidadVenta } from '../../../interface/categoriaUnidadVenta';
import { CategoriaUnidadVentaService } from '../../../service/categoriaUnidadVenta';
import { ContratoDetalle } from '../../../interface/contratoDetalle';
import { Contrato } from '../../../interface/contrato';
import { ContratoService } from '../../../service/contrato';
import { ContratoDetalleService } from '../../../service/contratoDetalle';
import { VariableService } from '../../../service/Variable';
import { Variable } from '../../../interface/variable';
import { AlertService } from '../../../../shared/services/alert.service';
import { Location } from '@angular/common';
import { EstadoContratoInit } from '../../../interface/estadoContrato';
import { ContratoEdicionComponent } from '../contrato-edicion/contrato-edicion.component';
import { UnidadMedidaService } from '../../../service/unidadMedida';
import { ContratoVariableService } from '../../../service/contratoVariable';
import { ContratoUnidadVentaService } from '../../../service/contratoUnidadVenta';
import { ContratoMesService } from '../../../service/contratoMes';
import { ContratoEtiquetasComponent } from '../contrato-etiquetas/contrato-etiquetas.component';

@Component({
  selector: 'app-contrato-form',
  templateUrl: './contrato-form.component.html'
})

export class ContratoFormComponent implements OnInit {
  public model = this.fb.group({
    id: [0],

    categoriaUnidadVentas: this.fb.array<number>([]),
    fechaInicio: ['', Validators.required],
    fechaFin: ['', Validators.required],
    diaEntrega: [1],
    idFrecuencia: [0],
    shot: [0],
    extension: [0],
    variables: this.fb.array<number>([]),
    meses: this.fb.array<Date>([]),
    idCliente : [0],
    idCategoria: [0]
  });

  public cliente: Cliente = ClienteInit;
  public categoria: Categoria = CategoriaInit;
  @ViewChild('contratoArbolComp')
  contratoArbolComp!: ContratoArbolComponent;

  @ViewChild('edicionComp')
  edicionComp!: ContratoEdicionComponent;

  @ViewChild('contratoEtiquetas')
  contratoEtiquetas!: ContratoEtiquetasComponent;

  @ViewChild('botonEdicion') botonEdicion!: ElementRef;
  @ViewChild('botonContrato') botonContrato!: ElementRef;

  clientes: Cliente[] = [];
  zonas: ClienteZona[] = [];
  canals: ClienteCanal[] = [];
  categorias: Categoria[] = [];
  frecuencias: Frecuencia[] = [];
  tipoEstudios: TipoEstudio[] = [];
  atributoFuncionalVariedads: AtributoFuncionalVariedad[] = [];
  tipoInformeOrdens: TipoInformeOrden[] = [];
  categoriaUnidadVentas: CategoriaUnidadVenta[] = [];
  variables: Variable[] = [];

  months: string[] = [];
  showLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private validForm: ValidFormService,
    private serviceCliente: ClienteService,
    private serviceCategoria: CategoriaService,
    private serviceFrecuencia: FrecuenciaService,
    private serviceClienteCategoria: ClienteCategoriaService,
    private serviceClienteZona: ClienteZonaService,
    private serviceClienteCanal: ClienteCanalService,
    private serviceTipoEstudio: TipoEstudioService,
    private serviceAtributoFuncionalVariedad: AtributoFuncionalVariedadService,
    private serviceTipoInformeOrden: TipoInformeOrdenService,
    private serviceCategoriaUnidadVenta: CategoriaUnidadVentaService,
    private serviceContrato: ContratoService,
    private serviceContratoDetalle: ContratoDetalleService,
    private serviceVariable: VariableService,
    private serviceContratoVariable:ContratoVariableService,
    private serviceContratoUnidadVenta : ContratoUnidadVentaService,
    private serviceContratoMes : ContratoMesService,

    private alert: AlertService,

  ) {

  }

  ngOnInit(): void {
    this.showLoading = true;
    this.serviceCliente.get().subscribe((x) => {
      this.clientes = x.data;
    });

    this.serviceFrecuencia.get().subscribe((x) => {
      this.frecuencias = x.data;
    });

    // this.serviceTipoEstudio.get().subscribe((x) => {
    //   this.tipoEstudios = x.data;
    // });

    this.serviceVariable.get().subscribe(x => {
      this.variables = x.data;

      const arr = this.model.get('variables') as FormArray;
      for (let index = 0; index < x.data.length; index++) {
        const control = this.fb.control(true);
        arr.push(control);
      }
      this.showLoading = false;
    })
  }

  

  // changeTipoEstudio(e:Event):void{
  //   const value = (e.target as HTMLInputElement).value;
    
  //   this.tipoInformeOrdens = [];
  //   (this.model.get('tipoInformeOrdens') as FormArray).clear();

  //   this.serviceTipoEstudio.getId(+value).subscribe(x=>{
  //     console.log(x.data);
      
  //     if(!x.data.TipoInformeOrden.length){
  //       this.alert.showAlert('Mensaje','El tipo de estudio no tiene asignado tipos de informes','warning');
  //       return;
  //     }
      
  //     this.tipoInformeOrdens = x.data.TipoInformeOrden;

  //     const arr = this.model.get('tipoInformeOrdens') as FormArray;
  //     for (let index = 0; index < x.data.TipoInformeOrden.length; index++) {
  //       const control = this.fb.control(true);
  //       arr.push(control);
  //     }
  //   })
    
  // }

  // get getZonas(): FormArray {
  //   return this.model.get('zonas') as FormArray;
  // }

  // get getCanals(): FormArray {
  //   return this.model.get('canals') as FormArray;
  // }

  // get getAtributoFuncionalVariedads(): FormArray {
  //   return this.model.get('atributoFuncionalVariedads') as FormArray;
  // }

  // get getTipoInformeOrdens(): FormArray {
  //   return this.model.get('tipoInformeOrdens') as FormArray;
  // }

  get getCategoriaUnidadVentas(): FormArray {
    return this.model.get('categoriaUnidadVentas') as FormArray;
  }

  get getVariables(): FormArray {
    return this.model.get('variables') as FormArray;
  }

  get getModel(): ContratoForm {
    //return this.model.value as ContratoForm;
    return ContratoFormInit;
  }

  changeCliente(event: Event) {
    this.showLoading = true;
    const a = event.target as HTMLInputElement
    this.serviceCliente.postId(parseInt(a.value)).subscribe(x => {

      this.cliente = x
    });

    this.serviceClienteCategoria.postIdCliente(parseInt(a.value)).subscribe(x => {
      let arr_categorias = [];

      for (let index = 0; index < x.data.length; index++) {
        const element = x.data[index];
        arr_categorias.push(element.Categoria)
      }
      this.categorias = arr_categorias;
      this.showLoading = false;
    })
  }

  changeCategoria(event: Event) {
    this.showLoading = true;
    const a = event.target as HTMLInputElement
    this.serviceCategoria.postCodigo(parseInt(a.value)).subscribe(x => {
      this.categoria = x || CategoriaInit;
      this.model.patchValue({idCategoria : this.categoria.id,idCliente:this.cliente.id})

      if (parseInt(a.value) != 0) {
        // this.serviceAtributoFuncionalVariedad.getCodClienteCodCategoria(this.cliente.codigo, this.categoria.codigo).subscribe((x) => {

        //   this.atributoFuncionalVariedads = x.data;

        //   const arr = this.model.get('atributoFuncionalVariedads') as FormArray;
        //   arr.clear()
        //   for (let index = 0; index < x.data.length; index++) {
        //     const control = this.fb.control(true);
        //     arr.push(control);
        //   }
        // });

        this.contratoEtiquetas.actualizarEtiquetas(this.cliente.id,this.categoria.id)

        // this.serviceClienteZona.postIdCliente(this.cliente.id).subscribe((x) => {
        //   this.zonas = x.data;

        //   const arr = this.model.get('zonas') as FormArray;
        //   arr.clear()
        //   for (let index = 0; index < x.data.length; index++) {
        //     const control = this.fb.control(true);
        //     arr.push(control);
        //   }

        // });

        // this.serviceClienteCanal.postIdCliente(this.cliente.id).subscribe((x) => {
        //   this.canals = x.data;

        //   const arr = this.model.get('canals') as FormArray;
        //   arr.clear()
        //   for (let index = 0; index < x.data.length; index++) {
        //     const control = this.fb.control(true);
        //     arr.push(control);
        //   }

        // });

        this.serviceCategoriaUnidadVenta.postIdCategoria(this.categoria.id).subscribe(x => {
          this.categoriaUnidadVentas = x.data

          const arr = this.model.get('categoriaUnidadVentas') as FormArray;
          arr.clear()
          for (let index = 0; index < x.data.length; index++) {
            const control = this.fb.control(true);
            arr.push(control);
          }

          this.botonContrato.nativeElement.click()
          this.showLoading = false;
        });
      }

    });

  }

  generateMonths() {
    this.months = [];
    let currentDate = new Date(this.model.get('fechaInicio')?.value||'');
    let arr_meses : Date[] = []
    let meses = this.model.get('meses') as FormArray;
    meses.clear()

    const bi = parseInt(this.model.get('idFrecuencia')?.value?.toString() || '1');
    let i=1;
    
    while (currentDate <= new Date(this.model.get('fechaFin')?.value||'')) {
      i++
      if(i%2==0 && bi==2) {
  
      }else{
        const control = this.fb.control(currentDate);
        meses.push(control)
        this.months.push(currentDate.toLocaleString('es-PE', { month: 'long' }));
      }
      currentDate.setMonth(currentDate.getMonth() + 1);
    }
  }

  get getMeses(){
    return this.model.get('meses') as FormArray
  }

  actualizarEleccion(contrato:ContratoForm) {
    contrato.idCategoria=this.categoria.id;
    contrato.idCliente=this.cliente.id;
    this.contratoArbolComp.actualizarArbol(contrato);
  }

  guardarContrato(contratoDetalles: ContratoDetalle[]) {
    const model = this.model.value;

    if (model.fechaInicio == "" || model.fechaFin == "") {
      this.alert.showAlert("Mensaje", "Debe elegir fechas", "warning");
      return;
    }
    this.showLoading = true;
    

    const contrato: Contrato = {
      id: 0,
      idCliente: this.cliente.id,
      idCategoria: this.categoria.id,
      diaEntrega: model.diaEntrega || 0,
      extension: model.extension || 0,
      fechaInicio: model.fechaInicio || '',
      fechaFin: model.fechaFin || '',
      idFrecuencia: model.idFrecuencia || 1,
      shot: model.shot || 0,
      estado: 1,
      version:1,
      idEstadoContrato: 1,
      Categoria: CategoriaInit,
      Cliente: ClienteInit,
      EstadoContrato: EstadoContratoInit,
      Frecuencia: FrecuenciaInit,
      fechaAprobacion:new Date(),
      fechaModificacion:new Date(),
    };

    this.serviceContrato.add(contrato).subscribe(x => {


      contratoDetalles.forEach(y => y.idContrato = x.data.id);

      this.serviceContratoDetalle.addAll(contratoDetalles).subscribe(y => {
        const variables = this.model.get('variables')?.value||[];

        for (let i = 0; i < variables.length; i++) {  
          variables[i] && this.serviceContratoVariable.add({id:0,idContrato:x.data.id,idVariable:this.variables[i].id||0}).subscribe(x=>{})
        }

        const unidadVentas = this.model.get('categoriaUnidadVentas')?.value||[];

        for (let i = 0; i < unidadVentas.length; i++) {
          unidadVentas[i] && this.serviceContratoUnidadVenta.add({id:0,idContrato:x.data.id,idUnidadVenta:this.categoriaUnidadVentas[i].id||0}).subscribe(x=>{})
        }

        const meses = this.model.get('meses')?.value||[];
    
        for (let i = 0; i < meses.length; i++) {
          meses[i] && this.serviceContratoMes.add({id:0,idContrato:x.data.id,mes:meses[i]||new Date()}).subscribe(x=>{})
        }

      
        setTimeout(()=>{window.location.reload()},2000)
      });
    });


  }

  editarContrato(contrato:Contrato){
    this.edicionComp.actualizarArbol(contrato,{...ContratoFormInit,zonas:[]});
    this.botonEdicion.nativeElement.click()
  }

  isValidField(field: string): boolean | null {
    return this.validForm.isValidField(field, this.model);
  }

  getFieldError(field: string): string | null {
    return this.validForm.getFieldError(field, this.model);
  }
}
