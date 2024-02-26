import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { CategoriaAtributoTecnico, CategoriaAtributoTecnicoInit } from '../../../../interfaces/categoriaAtributoTecnico';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '../../../../../../../shared/services/alert.service';
import { ValidFormService } from '../../../../../../../shared/services/validForm.service';
import { CategoriaAtributoTecnicoService } from '../../../../services/categoriaAtributoTecnico.service';
import { lastValueFrom } from 'rxjs';
import { Categoria, CategoriaInit } from '../../../../interfaces/categoria.interface';

@Component({
  selector: 'app-categoria-atributos-form',
  templateUrl: './categoria-atributos-form.component.html'
})
export class CategoriaAtributosFormComponent  {
 
}
