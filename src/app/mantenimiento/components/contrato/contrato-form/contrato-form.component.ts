import { Component, OnInit } from '@angular/core';
import { ValidFormService } from '../../../../shared/services/validForm.service';
import { FormBuilder, Validators } from '@angular/forms';
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

interface contratoForm {
  id: number,
  tipoEstudios: number[],
  zonas: number[],
  canals: number[],
  atributoFuncionalVariedads: number[],
}

@Component({
  selector: 'app-contrato-form',
  templateUrl: './contrato-form.component.html'
})

export class ContratoFormComponent implements OnInit{
  public model = this.fb.group({
    id: [0],
    tipoEstudios: [[0]],
    zonas: [[0]],
    canals: [[0]],
    atributoFuncionalVariedads: [[0]],
    fechaInicial: [''],
    fechaFinal: [''],
    diaEntrega: [1],
    frecuencias: [0],
    extension: [0],
  })

  public cliente : Cliente = ClienteInit;
  public categoria : Categoria = CategoriaInit;

  clientes:Cliente[] = [];
  zonas:Zona[] = [];
  canals:Canal[] = [];
  categorias:Categoria[] = [];
  frecuencias:Frecuencia[] = [];
  tipoEstudios:TipoEstudio[] = [];
  atributoFuncionalVariedads:AtributoFuncionalVariedad[] = [];

  constructor(
    private fb: FormBuilder,
    private validForm: ValidFormService,
    private serviceCliente : ClienteService,
    private serviceZona : ZonaService,
    private serviceCanal : CanalService,
    private serviceCategoria : CategoriaService,
    private serviceFrecuencia : FrecuenciaService,
    private serviceClienteCategoria : ClienteCategoriaService,
    private serviceClienteZona : ClienteZonaService,
    private serviceClienteCanal : ClienteCanalService,
    private serviceTipoEstudio: TipoEstudioService,
    private serviceAtributoFuncionalVariedad: AtributoFuncionalVariedadService,

  ) {

  }

  ngOnInit(): void {
    
    this.serviceCliente.get().subscribe((x)=>{
      this.clientes = x.data;
    });

    this.serviceFrecuencia.get().subscribe((x)=>{
      this.frecuencias = x.data;
    });

    this.serviceTipoEstudio.get().subscribe((x)=>{
      this.tipoEstudios = x.data;
    });
    
  }

  get getModel(){
    return this.model.value as contratoForm
  }

  changeCliente(event:Event){
    
    const a = event.target as HTMLInputElement

    this.serviceCliente.postCodigo(parseInt(a.value)).subscribe(x=>{
      
      this.cliente = x
    });


    this.serviceClienteCategoria.getCodCliente(parseInt(a.value)).subscribe(x=>{
      let arr_categorias = [];
      
      for (let index = 0; index < x.data.length; index++) {
        const element = x.data[index];
        arr_categorias.push(element.Categoria)
      }
      
      this.categorias = arr_categorias;
    })
    
  }

  changeCategoria(event:Event){ 
    const a = event.target as HTMLInputElement
    this.serviceCategoria.postCodigo(parseInt(a.value)).subscribe(x=>{
      this.categoria = x || CategoriaInit;

      if(parseInt(a.value)!=0){
        this.serviceAtributoFuncionalVariedad.getCodClienteCodCategoria(this.cliente.codigo,this.categoria.codigo).subscribe((x)=>{
          console.log(x);
          this.atributoFuncionalVariedads = x.data;
        });

        this.serviceClienteZona.getCodCliente(this.cliente.codigo).subscribe((x)=>{
          let arr_zonas = [];
      
          for (let index = 0; index < x.data.length; index++) {
            const element = x.data[index];
            arr_zonas.push(element.Zona)
          }
          
          this.zonas = arr_zonas;
        });
    
        this.serviceClienteCanal.getCodCliente(this.cliente.codigo).subscribe((x)=>{
          let arr_canals = [];
      
          for (let index = 0; index < x.data.length; index++) {
            const element = x.data[index];
            arr_canals.push(element.Canal)
          }
          
          this.canals = arr_canals;
        });
      }

    });

  }

  actualizarEleccion(){
    console.log(this.getModel);
    
  }

  toggleCheckbox(codigo: number): void {
    const atributoFuncionalVariedadsArray = this.model.get('atributoFuncionalVariedads')?.value || [];

    // Verificar si el código ya está presente en el array
    const index = atributoFuncionalVariedadsArray.indexOf(codigo);

    if (index !== -1) {
      // Si está presente, quitarlo del array
      atributoFuncionalVariedadsArray.splice(index, 1);
    } else {
      // Si no está presente, agregarlo al array
      atributoFuncionalVariedadsArray.push(codigo);
    }

    // Actualizar el valor del formulario con el nuevo array
    this.model.patchValue({ atributoFuncionalVariedads: atributoFuncionalVariedadsArray });
  }

  isValidField(field: string): boolean | null {
    return this.validForm.isValidField(field, this.model);
  }

  getFieldError(field: string): string | null {
    return this.validForm.getFieldError(field, this.model);
  }
}
