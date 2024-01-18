import { Component, OnInit } from '@angular/core';
import { ValidFormService } from '../../../../shared/services/validForm.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ClienteService } from '../../../service/cliente';
import { Cliente } from '../../../interface/cliente';
import { ZonaService } from '../../tablas/service/zona.service';
import { Zona } from '../../tablas/interfaces/zona.interface';
import { Canal } from '../../tablas/interfaces/canal.interface';
import { CanalService } from '../../tablas/service/canal.sevice';
import { Categoria } from '../../variedades/interfaces/categoria.interface';
import { CategoriaService } from '../../variedades/services/categoria.service';
import { Frecuencia } from '../../../interface/frecuencia';
import { FrecuenciaService } from '../../../service/frecuencia';

@Component({
  selector: 'app-contrato-form',
  templateUrl: './contrato-form.component.html'
})
export class ContratoFormComponent implements OnInit{
  public model = this.fb.group({
    id: [0],
    clientes: [0],
    zonas: [0],
    canals: [0],
    categorias: [0],
    fechaInicial: [''],
    fechaFinal: [''],
    diaEntrega: [1],
    frecuencias: [0],
    extension: [0],
  })

  clientes:Cliente[] = [];
  zonas:Zona[] = [];
  canals:Canal[] = [];
  categorias:Categoria[] = [];
  frecuencias:Frecuencia[] = [];

  constructor(
    private fb: FormBuilder,
    private validForm: ValidFormService,
    private serviceCliente : ClienteService,
    private serviceZona : ZonaService,
    private serviceCanal : CanalService,
    private serviceCategoria : CategoriaService,
    private serviceFrecuencia : FrecuenciaService,

  ) {

  }

  ngOnInit(): void {
    this.serviceCliente.get().subscribe((x)=>{
      this.clientes = x.data;
    });

    this.serviceZona.get().subscribe((x)=>{
      this.zonas = x.data;
    });

    this.serviceCanal.get().subscribe((x)=>{
      this.canals = x.data;
    });

    this.serviceCategoria.get().subscribe((x)=>{
      this.categorias = x.data;
    });

    this.serviceFrecuencia.get().subscribe((x)=>{
      this.frecuencias = x.data;
    });
  }

  isValidField(field: string): boolean | null {
    return this.validForm.isValidField(field, this.model);
  }

  getFieldError(field: string): string | null {
    return this.validForm.getFieldError(field, this.model);
  }
}
