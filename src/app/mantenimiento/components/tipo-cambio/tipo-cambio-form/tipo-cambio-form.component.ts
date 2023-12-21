import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { TipoCambio, TipoCambioInit } from '../../../interface/tipoCambio.interface';
import { ValidFormService } from '../../../../shared/services/validForm.service';
import { TipoTipoCambioService } from '../../../service/tipoTipoCambio';
import { TipoTipoCambio } from '../../../interface/tipoTipoCambio.interface';
import { TipoCambioService } from '../../../service/tipoCambio.service';
import { Moneda } from '../../../interface/moneda';
import { MonedaService } from '../../../service/moneda';
import { RegexService } from '../../../../shared/services/regex.service';

@Component({
  selector: 'app-tipo-cambio-form',
  templateUrl: './tipo-cambio-form.component.html'
})
export class TipoCambioFormComponent implements OnInit {
  public model = this.fb.group({
    id: [0],
    fecha: [new Date(), [Validators.required,Validators.pattern(this.regexService.regexFecha)]],
    idMoneda: [0, [Validators.required,Validators.pattern(this.regexService.regexCombo)]],
    idTipoTipoCambio: [0, [Validators.required,Validators.pattern(this.regexService.regexCombo)]],
    valor: [0, [Validators.required,Validators.pattern(this.regexService.regexFloat)]]
  })

  @Output() actualizarListEmit: EventEmitter<null> = new EventEmitter();

  public listTipoTipoCambio: TipoTipoCambio[] = []
  public listMoneda: Moneda[] = []

  constructor(
    private fb: FormBuilder,
    private validForm: ValidFormService,
    private tipoTipoCambioService: TipoTipoCambioService,
    private service: TipoCambioService,
    private monedaService: MonedaService,
    private regexService:RegexService
  ) {

  }

  ngOnInit(): void {
    this.tipoTipoCambioService.get().subscribe(resp => {
      this.listTipoTipoCambio = resp.data;
    })

    this.monedaService.get().subscribe(resp => {
      this.listMoneda = resp.data;
    })
  }

  get getModel() {
    return this.model.value as TipoCambio
  }

  actualizarList() {
    this.actualizarListEmit.emit();
  }

  agregar() {
    if (this.model.invalid) {
      this.model.markAllAsTouched();
      return;
    }

    this.service.add(this.getModel).subscribe(resp => {
      this.model.reset();
      this.actualizarList();
    })

  }

  selectEdit(model: TipoCambio) {
    this.model.patchValue(model);
  }

  nuevo() {
    this.model.patchValue(TipoCambioInit);
  }

  isValidField(field: string): boolean | null {
    return this.validForm.isValidField(field, this.model);
  }

  getFieldError(field: string): string | null {
    return this.validForm.getFieldError(field, this.model);
  }

}
