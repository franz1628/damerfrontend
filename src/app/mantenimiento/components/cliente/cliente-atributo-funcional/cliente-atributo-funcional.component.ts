import { Component, Input, SimpleChanges } from '@angular/core';
import { Cliente, ClienteInit } from '../../../interface/cliente';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { forkJoin, lastValueFrom } from 'rxjs';
import { AtributoFuncionalVariedad } from '../../../interface/atributoFuncionalVariedad';
import { TipoUnidadMedidaService } from '../../../service/tipoUnidadMedida';
import { UnidadMedidaService } from '../../../service/unidadMedida';
import { AlertService } from '../../../../shared/services/alert.service';
import { AtributoFuncionalVariedadService } from '../../../service/atributoFuncionalVariedad';
import { TipoUnidadMedida } from '../../../interface/tipoUnidadMedida';
import { UnidadMedida } from '../../../interface/unidadMedida';
import { Categoria, CategoriaInit } from '../../variedades/interfaces/categoria.interface';

@Component({
  selector: 'app-cliente-atributo-funcional',
  templateUrl: './cliente-atributo-funcional.component.html',
})
export class ClienteAtributoFuncionalComponent {

  @Input()
  modelCliente: Cliente = ClienteInit
  @Input()
  modelCategoria: Categoria = CategoriaInit

  showLoading: boolean = false;
  idCategoriaAtributoTecnico=0;

  models: FormGroup = this.fb.group({
    modelos: this.fb.array([]),
  });;

  tipoUnidadMedidas : TipoUnidadMedida[] = [];
  unidadMedidas : UnidadMedida[] = [];

  idAtributoTecnicoVariedad: number = 0;

  constructor(
    private service: AtributoFuncionalVariedadService,
    private serviceTipoUnidadMedida:TipoUnidadMedidaService,
    private serviceUnidadMedida:UnidadMedidaService,
    private fb: FormBuilder,
    private alert: AlertService
  ) {

  }

  ngOnInit(): void {
    this.loadModels();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['modelCliente'] && !changes['modelCliente'].firstChange) {
      this.loadModels();
    }
  }

  loadModels(): void {
    this.showLoading = true;
    (this.models.get('modelos') as FormArray).clear();

    forkJoin( 
      {
        service  : this.service.postIdClienteIdCategoria(this.modelCliente.id,this.modelCategoria.id),
        serviceTipoUnidadMedida : this.serviceTipoUnidadMedida.get(),
        serviceUnidadMedida :this.serviceUnidadMedida.get()
      }
      ).subscribe({
        next:value => {
          this.tipoUnidadMedidas = value.serviceTipoUnidadMedida.data
          this.unidadMedidas = value.serviceUnidadMedida.data

          const models = value.service.data;

          models.forEach(model => {
            const nuevoModelo = this.fb.group({
              id: [model.id],
              idCategoria:[this.modelCategoria.id],
              idCliente:[this.modelCliente.id],
              descripcion: [model.descripcion],
              descripcionResumida: [model.descripcionResumida],
              tip: [model.tip],
              idIndiceAtributo: [model.idIndiceAtributo],
              idTipoUnidadMedida: [model.idTipoUnidadMedida],
              idUnidadMedida: [model.idUnidadMedida],
              alias1: [model.alias1],
              alias2: [model.alias2],
              alias3: [model.alias3]
            });
  
            this.modelosArray.push(nuevoModelo);
          });
  
          if(models.length==0){
            this.add();
          }
  
          this.showLoading = false;
        }
      })

  }



  get getModel() {
    return this.modelCliente;
  }

  get modelosArray() {
    return this.models.get('modelos') as FormArray;
  }

  editModel(num: number) {
    this.alert.showAlertConfirm('Aviso', '¿Desea modificar?', 'warning', () => {
      const modelo = this.modelosArray.controls[num].getRawValue();

      this.service.update(modelo.id, modelo).subscribe(x => {

        this.alert.showAlert('Mensaje', 'Guardado correctamente', 'success');
      });
    })

  }


  add() {
    const nuevoModelo = this.fb.group({
      id: [0],
      idCliente:[this.modelCliente.id],
      idCategoria:[this.modelCategoria.id],
      descripcion: [''],
      descripcionResumida: [''],
      tip: [''],
      idIndiceAtributo: [0],
      idTipoUnidadMedida: [0],
      idUnidadMedida: [0],
      alias1: [''],
      alias2: [''],
      alias3: ['']
    });

    this.modelosArray.push(nuevoModelo);
  }

  async save(num: number): Promise<void> {
    const modelo = this.modelosArray.at(num).value;
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
