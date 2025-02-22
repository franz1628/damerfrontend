import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AtributoFuncionalVariedad, AtributoFuncionalVariedadInit } from '../../../interface/atributoFuncionalVariedad';
import { CategoriaAtributoTecnicoService } from '../../variedades/services/categoriaAtributoTecnico.service';
import { CategoriaAtributoTecnico, CategoriaAtributoTecnicoInit } from '../../variedades/interfaces/categoriaAtributoTecnico';
import { CategoriaAtributoTecnicoValor } from '../../variedades/interfaces/categoriaAtributoTecnicoValor';
import { CategoriaAtributoTecnicoValorService } from '../../variedades/services/categoriaAtributoTecnicoValor.service';
import { AtributoFuncionalVariedadValor, AtributoFuncionalVariedadValorInit } from '../../../interface/atributoFuncionalVariedadValor';
import { AtributoFuncionalVariedadValorValorService } from '../../../service/atributoFuncionalVariedadValorValor';
import { ClienteFormulaService } from '../../../service/clienteFormula';
import { AlertService } from '../../../../shared/services/alert.service';
import { ClienteFormula } from '../../../interface/clienteFormula';

@Component({
  selector: 'app-cliente-atributo-formula',
  templateUrl: './cliente-atributo-formula.component.html'
})
export class ClienteAtributoFormulaComponent implements OnChanges, OnInit {


  @Input() atributoFuncionalVariedad: AtributoFuncionalVariedad = AtributoFuncionalVariedadInit
  @Input() atributoFuncionalVariedadValor: AtributoFuncionalVariedadValor = AtributoFuncionalVariedadValorInit
  categoriaAtributoTecnicos: CategoriaAtributoTecnico[] = []
  categoriaAtributoTecnicoValors: CategoriaAtributoTecnicoValor[] = []
  checkboxSeleccionados: number[] = [];
  idAtributoTecnicoVariedad: number = 0
  idCategoriaAtributoTecnico:number=0
  valors:string[] = []
  checkAll:boolean = false

  constructor(
    private serviceCategoriaAtributoTecnico: CategoriaAtributoTecnicoService,
    private serviceCategoriaAtributoTecnicoValors: CategoriaAtributoTecnicoValorService,
    private serviceAtributoFuncionalVariedadValorValor: AtributoFuncionalVariedadValorValorService,
    private serviceClienteFormula: ClienteFormulaService,
    private alert: AlertService
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['atributoFuncionalVariedad']) {
      this.loadChanges();
    }
  }
  ngOnInit(): void {
    //this.loadChanges()
  }

  loadChanges(): void {

    this.serviceCategoriaAtributoTecnico.postIdAgrupacionCategoria(this.atributoFuncionalVariedad.idClienteAgrupacionCategoria).subscribe(x => {
      this.categoriaAtributoTecnicos = x.data
       this.loadCategoriasAtributos();
    })

  }

  loadCategoriasAtributos(){
    this.serviceClienteFormula.postIdAtributoFuncionalVariedadValor(this.atributoFuncionalVariedadValor.id).subscribe(y => {
      
      const clienteFormulas: ClienteFormula = y.data
      
      if(clienteFormulas!=null){
        this.valors = clienteFormulas.idAtributoTecnicoVariedadValors?.split(',')||[];
      }else{
        this.valors = []
      }
      this.checkboxSeleccionados = []

      this.checkboxSeleccionados = this.valors.map(x=>parseInt(x));
      
      this.idAtributoTecnicoVariedad = this.idAtributoTecnicoVariedad || y.data.idAtributoTecnicoVariedad


    
      this.categoriaAtributoTecnicos.map(x=>{
        if(x.idAtributoTecnicoVariedad == this.idAtributoTecnicoVariedad){
          this.categoriaAtributoTecnicoValors = []
          this.serviceCategoriaAtributoTecnicoValors.postIdCategoriaAtributoTecnico(x.id).subscribe(x => {
            this.categoriaAtributoTecnicoValors = this.categoriaAtributoTecnicoValors.concat(x)
            
            this.categoriaAtributoTecnicoValors = Array.from(
              new Map(this.categoriaAtributoTecnicoValors.map(item => [item.idAtributoTecnicoVariedadValor, item])).values()
            );

          })
        }
      })
      

     
    })
  }

  get getCategoriasAtributos(){
      const uniqueArray = Array.from(
        new Map(this.categoriaAtributoTecnicos.map(item => [item.idAtributoTecnicoVariedad, item])).values()
      );

      return uniqueArray;
  }

  checkAllFormula() {

    this.checkboxSeleccionados = [];

    if(!this.checkAll){
      for (let i = 0; i < this.categoriaAtributoTecnicoValors.length; i++) {
      
        this.checkboxSeleccionados.push(this.categoriaAtributoTecnicoValors[i].idAtributoTecnicoVariedadValor);
      
      }
    }
    this.checkAll = !this.checkAll
  } 

  changeAtributo(e: Event) {
    const idAtributoTecnicoVariedad = +(e.target as HTMLInputElement).value
    this.idAtributoTecnicoVariedad = idAtributoTecnicoVariedad

    this.loadCategoriasAtributos();

   

  }

  enviar() {
    if(this.checkboxSeleccionados.length==0){
      this.alert.showAlert('Advertencia', 'Debe elegir al menos un valor', 'warning');
      return;
    }

    this.serviceClienteFormula.asignarFormula({
      id: 0,
      idAtributoFuncionalVariedadValor: this.atributoFuncionalVariedadValor.id,
      idAtributoTecnicoVariedad: this.idAtributoTecnicoVariedad,
      idAtributoTecnicoVariedadValors: this.checkboxSeleccionados.join(','),
      estado: 1
    }).subscribe(x => {
      if (x.state == 1) {
        this.alert.showAlert('Mensaje', 'Guardado correctamente', 'success')
      } else {
        this.alert.showAlert('Mensaje', 'Hubo un error, intentelo más tarde', 'warning')
      }

    })
  }

  onCheckboxChange(value: number, event: Event) {
    const isChecked = (event.target as HTMLInputElement).checked
    if (isChecked) {
      const index = this.checkboxSeleccionados.indexOf(value);
      if (index == -1) {
        this.checkboxSeleccionados.push(value);
      }
    } else {
      const index = this.checkboxSeleccionados.indexOf(value);

      if (index >= 0) {
        this.checkboxSeleccionados.splice(index, 1);
      }
    }
  }

}
