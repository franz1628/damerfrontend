import { Component, EventEmitter, Output } from '@angular/core';
import { Variable } from '../../../interface/variable';
import { VariableService } from '../../../service/Variable';

@Component({
  selector: 'app-variable-list',
  templateUrl: './variable-list.component.html'
})
export class VariableListComponent {
  public models:Variable[] = [];
  public loading:boolean=false;
  @Output() selectEditEmit : EventEmitter<Variable> = new EventEmitter();

  constructor(public service : VariableService){ }

  ngOnInit(): void {
    this.actualizarList();
  }

  selectEdit(model:Variable){
    this.selectEditEmit.emit(model);
  }

  actualizarList(){
    this.loading=true;
    this.service.get().subscribe(resp => {
      this.models = resp.data;
      this.loading=false;
    })
  }
}
