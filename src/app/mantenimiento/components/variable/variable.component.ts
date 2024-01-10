import { Component, ViewChild } from '@angular/core';
import { VariableListComponent } from './variable-list/variable-list.component';
import { VariableFormComponent } from './variable-form/variable-form.component';
import { Variable } from '../../interface/variable';

@Component({
  selector: 'app-variable',
  templateUrl: './variable.component.html'
})
export class VariableComponent {
  @ViewChild('variableListComp')
  variableListComp!: VariableListComponent;

  @ViewChild('variableFormComp')
  variableFormComp!: VariableFormComponent;

  actualizarList(){
    this.variableListComp.actualizarList();
  }

  selectEdit(model:Variable){
    this.variableFormComp.selectEdit(model);
  }

}
